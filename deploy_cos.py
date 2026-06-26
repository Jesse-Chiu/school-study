#!/usr/bin/env python3
"""Deploy dist/ to Tencent COS bucket. Triggers via GitHub Actions."""
import os
import sys
import traceback

# Debug: print env var presence (not values for security)
sec_id = os.environ.get("TENCENT_SECRET_ID", "")
sec_key = os.environ.get("TENCENT_SECRET_KEY", "")
bucket = os.environ.get("COS_BUCKET", "")
region = os.environ.get("COS_REGION", "")

print(f"COS_BUCKET = '{bucket}'")
print(f"COS_REGION = '{region}'")
print(f"TENCENT_SECRET_ID length = {len(sec_id)}")
print(f"TENCENT_SECRET_KEY length = {len(sec_key)}")

if not all([sec_id, sec_key, bucket, region]):
    print("ERROR: Missing required environment variables!")
    sys.exit(1)

try:
    from qcloud_cos import CosConfig, CosS3Client
except ImportError:
    print("Installing cos-python-sdk-v5 via pip...")
    import subprocess
    result = subprocess.run(
        [sys.executable, "-m", "pip", "install", "cos-python-sdk-v5"],
        capture_output=True, text=True
    )
    print(result.stdout[-500:] if result.stdout else "No stdout")
    if result.returncode != 0:
        print(f"pip install failed: {result.stderr}")
        sys.exit(1)
    from qcloud_cos import CosConfig, CosS3Client

print("Creating COS client...")
config = CosConfig(Region=region, SecretId=sec_id, SecretKey=sec_key)
client = CosS3Client(config)

CONTENT_TYPES = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".ico": "image/x-icon",
}

# Clean old files
print("Cleaning old files from bucket...")
deleted = 0
try:
    marker = ""
    while True:
        resp = client.list_objects(Bucket=bucket, Marker=marker)
        contents = resp.get("Contents") or []
        if not contents:
            break
        to_delete = {"Object": [{"Key": o["Key"]} for o in contents]}
        client.delete_objects(Bucket=bucket, Delete=to_delete)
        deleted += len(contents)
        print(f"  Deleted batch of {len(contents)} objects...")
        if resp.get("IsTruncated") != "true":
            break
        marker = resp.get("NextMarker", "")
    print(f"  Total deleted: {deleted}")
except Exception as e:
    print(f"  Clean error (non-fatal): {e}")
    traceback.print_exc()

# Upload dist/
dist_dir = "dist"
uploaded = 0
failed = 0
print("Uploading files...")
for root, _, files in os.walk(dist_dir):
    for fname in files:
        local = os.path.join(root, fname)
        key = os.path.relpath(local, dist_dir)
        ext = os.path.splitext(fname)[1].lower()
        ct = CONTENT_TYPES.get(ext, "application/octet-stream")
        try:
            client.put_object_from_local_file(
                Bucket=bucket,
                LocalFilePath=local,
                Key=key,
                ContentType=ct,
            )
            uploaded += 1
        except Exception as e:
            print(f"  FAILED: {key}: {e}")
            failed += 1

print(f"Upload complete: {uploaded} succeeded, {failed} failed")
if failed > 0:
    sys.exit(1)
print("Done!")
