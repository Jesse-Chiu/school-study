#!/usr/bin/env python3
"""Deploy dist/ to Tencent COS bucket."""
import os
import sys

sec_id = os.environ.get("TENCENT_SECRET_ID", "")
sec_key = os.environ.get("TENCENT_SECRET_KEY", "")
bucket = os.environ.get("COS_BUCKET", "")
region = os.environ.get("COS_REGION", "")

print(f"Bucket: {bucket}, Region: {region}")
if not all([sec_id, sec_key, bucket, region]):
    print("ERROR: Missing env vars")
    sys.exit(1)

try:
    from qcloud_cos import CosConfig, CosS3Client
except ImportError:
    import subprocess
    subprocess.run([sys.executable, "-m", "pip", "install", "cos-python-sdk-v5"], check=True)
    from qcloud_cos import CosConfig, CosS3Client

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
}

# Step 1: Delete old files
print("Cleaning old files...")
marker = ""
while True:
    resp = client.list_objects(Bucket=bucket, Marker=marker)
    contents = resp.get("Contents") or []
    if not contents:
        break
    keys = [o["Key"] for o in contents]
    for i in range(0, len(keys), 100):
        batch = keys[i:i+100]
        client.delete_objects(Bucket=bucket, Delete={"Object": [{"Key": k} for k in batch]})
    if resp.get("IsTruncated") != "true":
        break
    marker = resp.get("NextMarker", "")
print("Clean complete")

# Step 2: Upload with correct parameters
# Key: Use ContentDisposition (CamelCase) - this is the SDK's parameter name
# maplist maps: ContentDisposition -> Content-Disposition header
print("Uploading files...")
dist_dir = "dist"
uploaded = 0
for root, _, files in os.walk(dist_dir):
    for fname in files:
        local = os.path.join(root, fname)
        key = os.path.relpath(local, dist_dir)
        ext = os.path.splitext(fname)[1].lower()
        content_type = MIME_TYPES.get(ext, "application/octet-stream")

        try:
            client.put_object_from_local_file(
                Bucket=bucket,
                LocalFilePath=local,
                Key=key,
                ContentType=content_type,
                ContentDisposition="inline",  # This sets the response header
                CacheControl="no-cache" if ext == ".html" else "public, max-age=31536000, immutable",
            )
            uploaded += 1
            if uploaded % 20 == 0:
                print(f"  Uploaded {uploaded}...")
        except Exception as e:
            print(f"  FAILED {key}: {e}")
            sys.exit(1)

print(f"Upload complete: {uploaded} files")

# Step 3: Verify
print("\nVerifying Content-Disposition header...")
for key in ["index.html"]:
    try:
        resp = client.head_object(Bucket=bucket, Key=key)
        cd = resp.get("Content-Disposition", "")
        ct = resp.get("Content-Type", "")
        print(f"  {key}: Content-Type={ct}, Content-Disposition={cd}")
        if "inline" not in cd:
            print(f"  ⚠️  WARNING: Content-Disposition missing or not 'inline'!")
    except Exception as e:
        print(f"  {key}: ERROR {e}")

print(f"\nDone! Visit: http://{bucket}.cos-website.{region}.myqcloud.com/")
print("IMPORTANT: Use http:// NOT https://")
