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
    if result.returncode != 0:
        print(f"pip install failed: {result.stderr}")
        sys.exit(1)
    from qcloud_cos import CosConfig, CosS3Client

print("Creating COS client...")
config = CosConfig(Region=region, SecretId=sec_id, SecretKey=sec_key)
client = CosS3Client(config)

MIME_TYPES = {
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
    ".woff": "font/woff",
    ".woff2": "font/woff2",
    ".ttf": "font/ttf",
    ".eot": "application/vnd.ms-fontobject",
    ".map": "application/json",
}

# Step 1: Delete ALL old files
print("Step 1: Cleaning old files from bucket...")
deleted = 0
try:
    marker = ""
    while True:
        resp = client.list_objects(Bucket=bucket, Marker=marker)
        contents = resp.get("Contents") or []
        if not contents:
            break
        keys = [o["Key"] for o in contents]
        # Delete in batches of 100 (COS limit)
        for i in range(0, len(keys), 100):
            batch = keys[i:i+100]
            to_delete = {"Object": [{"Key": k} for k in batch]}
            client.delete_objects(Bucket=bucket, Delete=to_delete)
            deleted += len(batch)
        if resp.get("IsTruncated") != "true":
            break
        marker = resp.get("NextMarker", "")
    print(f"  Deleted {deleted} old objects")
except Exception as e:
    print(f"  Clean error (non-fatal): {e}")
    traceback.print_exc()

# Step 2: Upload dist/ with correct headers
# Use put_object_from_local_file with explicit ContentDisposition parameter
# This is the COS SDK's native way to set the header
print("Step 2: Uploading files...")
dist_dir = "dist"
uploaded = 0
failed = 0

for root, _, files in os.walk(dist_dir):
    for fname in files:
        local = os.path.join(root, fname)
        key = os.path.relpath(local, dist_dir)
        ext = os.path.splitext(fname)[1].lower()
        content_type = MIME_TYPES.get(ext, "application/octet-stream")

        try:
            # Use put_object_from_local_file with ContentDisposition='inline'
            # This explicitly tells the browser to display, not download
            extra_args = {
                "ContentType": content_type,
                "ContentDisposition": "inline",
            }
            # HTML: no cache; assets: long cache
            if ext == ".html":
                extra_args["CacheControl"] = "no-cache, no-store, must-revalidate"
            else:
                extra_args["CacheControl"] = "public, max-age=31536000, immutable"

            client.put_object_from_local_file(
                Bucket=bucket,
                LocalFilePath=local,
                Key=key,
                **extra_args
            )
            uploaded += 1
            if uploaded % 20 == 0:
                print(f"  Uploaded {uploaded} files...")
        except Exception as e:
            print(f"  FAILED: {key}: {e}")
            traceback.print_exc()
            failed += 1

print(f"Upload complete: {uploaded} succeeded, {failed} failed")
if failed > 0:
    sys.exit(1)

print("Done! All files uploaded with Content-Disposition: inline")
