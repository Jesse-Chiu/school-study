#!/bin/bash
# =============================================
# 腾讯云 COS 静态托管 - 本地手动部署脚本
# =============================================
# 前置条件：
#   1. pip3 install coscmd
#   2. 运行 coscmd config 配置密钥
#   3. 设置环境变量或修改下方变量
# =============================================

set -e

# ====== 配置区域 ======
# 方法1: 设置环境变量 (推荐)
# export COS_BUCKET="your-bucket-1234567890"
# export COS_REGION="ap-guangzhou"

# 方法2: 直接修改这里
COS_BUCKET="${COS_BUCKET:-your-bucket-appid}"
COS_REGION="${COS_REGION:-ap-guangzhou}"
# ======================

echo "📦 Building project..."
npm run build

echo ""
echo "🚀 Deploying to COS..."
echo "   Bucket: ${COS_BUCKET}"
echo "   Region: ${COS_REGION}"
echo ""

# 上传 dist 目录到 COS 根路径，--delete 删除远程多余文件
coscmd upload -r --delete ./dist/ / \
  -b "${COS_BUCKET}" \
  -r "${COS_REGION}"

echo ""
echo "✅ Deploy complete!"
echo ""
echo "🔗 访问地址: https://${COS_BUCKET}.cos.${COS_REGION}.myqcloud.com/index.html"
echo ""
echo "💡 如果配置了自定义域名 + CDN，请使用你的自定义域名访问"
