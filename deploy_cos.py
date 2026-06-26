#!/usr/bin/env python3
"""Deploy dist/ to Tencent COS bucket."""
import os
import sys

try:
    from qcloud_cos import CosConfig, CosS3Client
except ImportError:
    print("Installing cos-python-sdk-v5...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "cos-python-sdk-v5", "-q"])
    from qcloud_cos import CosConfig, CosS3Client

SECRET_ID = os.environ["TENCENT_SECRET_ID"]
SECRET_KEY = os.environ["TENCENT_SECRET_KEY"]
REGION = os.environ["COS_REGION"]
BUCKET = os.environ["COS_BUCKET"]

config = CosConfig(Region=REGION, SecretId=SECRET_ID, SecretKey=SECRET_KEY)
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
print("Cleaning old files...")
deleted = 0
try:
    marker = ""
    while True:
        resp = client.list_objects(
            Bucket=BUCKET,
            Marker=marker,
        )
        contents = resp.get("Contents") or []
        if not contents:
            break
        to_delete = {"Object": [{"Key": o["Key"]} for o in contents]}
        client.delete_objects(Bucket=BUCKET, Delete=to_delete)
        deleted += len(contents)
        if resp.get("IsTruncated") == "false":
            break
        marker = resp.get("NextMarker", "")
except Exception as e:
    print(f"  Clean: {e} (continuing...)")
print(f"  Deleted {deleted} old objects")

# Upload dist/
dist_dir = "dist"
uploaded = 0
for root, _, files in os.walk(dist_dir):
    for fname in files:
        local = os.path.join(root, fname)
        key = os.path.relpath(local, dist_dir)
        ext = os.path.splitext(fname)[1].lower()
        ct = CONTENT_TYPES.get(ext, "application/octet-stream")
        client.put_object_from_local_file(
            Bucket=BUCKET,
            LocalFilePath=local,
            Key=key,
            ContentType=ct,
        )
        uploaded += 1

print(f"Uploaded {uploaded} files to {BUCKET}")
print("Done!")
