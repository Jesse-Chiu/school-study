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

# MIME types for Content-Type
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

# Step 1: Delete ALL old files (clean deploy)
print("Step 1: Cleaning old files from bucket...")
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
        if resp.get("IsTruncated") != "true":
            break
        marker = resp.get("NextMarker", "")
    print(f"  Deleted {deleted} old objects")
except Exception as e:
    print(f"  Clean error (non-fatal): {e}")

# Step 2: Upload dist/ with correct headers
# Use put_object with Headers dict for reliable header control
print("Step 2: Uploading files with correct headers...")
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
            with open(local, 'rb') as f:
                body = f.read()

            # Set headers: Content-Disposition: inline (prevents forced download)
            # Cache-Control: no-cache for HTML, long cache for assets
            headers = {
                "Content-Type": content_type,
                "Content-Disposition": "inline",
            }
            # HTML files: no cache (always fresh)
            if ext == ".html":
                headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
            # Assets: long cache (1 year)
            else:
                headers["Cache-Control"] = "public, max-age=31536000, immutable"

            client.put_object(
                Bucket=bucket,
                Key=key,
                Body=body,
                Headers=headers,
            )
            uploaded += 1
            if uploaded % 20 == 0:
                print(f"  Uploaded {uploaded} files...")
        except Exception as e:
            print(f"  FAILED: {key}: {e}")
            failed += 1

print(f"Upload complete: {uploaded} succeeded, {failed} failed")
if failed > 0:
    sys.exit(1)

print("Done! All files uploaded with Content-Disposition: inline")
