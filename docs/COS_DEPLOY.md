# 腾讯云 COS 静态托管部署指南

## 📋 总览

| 项目 | 说明 |
|------|------|
| 托管方式 | 腾讯云 COS（对象存储）静态网站 |
| 自动部署 | GitHub Actions，push 到 main 分支自动触发 |
| 国内访问 | ✅ 速度快，无需备案（使用 COS 默认域名） |
| 成本 | COS 免费额度：50GB 存储 + 10GB/月 CDN 流量 |

---

## 🚀 第一步：创建 COS 存储桶

1. 登录 [腾讯云 COS 控制台](https://console.cloud.tencent.com/cos5)
2. 点击「创建存储桶」
3. 配置：
   - **名称**：随意（如 `school-study`）
   - **所属地域**：选离用户最近的（如 `ap-guangzhou` 广州）
   - **访问权限**：**公有读私有写** ⚠️ 重要！
   - 其他保持默认，点击创建

> 📝 记录你的 `存储桶名称` 和 `所属地域`，后面要用。

---

## 🔧 第二步：开启静态网站托管

1. 进入刚创建的存储桶
2. 左侧菜单 → **基础配置** → **静态网站**
3. 开启静态网站托管
4. 设置：
   - **索引文档**：`index.html`
   - **错误文档**：`index.html`（用于 SPA 路由）
5. 保存

---

## 🔑 第三步：获取 API 密钥

1. 访问 [腾讯云 API 密钥管理](https://console.cloud.tencent.com/cam/capi)
2. 点击「新建密钥」
3. 记录 **SecretId** 和 **SecretKey**（⚠️ 密钥只显示一次！）

---

## 🔐 第四步：配置 GitHub Secrets

1. 进入你的 GitHub 仓库 → **Settings** → **Secrets and variables** → **Actions**
2. 添加以下 **Repository secrets**：

| 名称 | 值 | 说明 |
|------|-----|------|
| `TENCENT_SECRET_ID` | 你的 SecretId | 第三步获取 |
| `TENCENT_SECRET_KEY` | 你的 SecretKey | 第三步获取 |

3. 切换到 **Variables** 标签，添加 **Repository variables**：

| 名称 | 值 | 示例 |
|------|-----|------|
| `COS_BUCKET` | 存储桶名称（含 APPID） | `school-study-1234567890` |
| `COS_REGION` | 地域代码 | `ap-guangzhou` |

---

## 📤 第五步：推送代码触发部署

```bash
git add .
git commit -m "切换到腾讯云 COS 部署"
git push origin main
```

推送后，GitHub Actions 会自动：
1. 拉取代码 → 安装依赖 → 构建项目
2. 上传 `dist/` 到 COS
3. 完成后网站即可访问

---

## 🔗 访问地址

部署成功后，访问：
```
https://{存储桶名称}.cos.{地域}.myqcloud.com/index.html
```

示例：`https://school-study-1234567890.cos.ap-guangzhou.myqcloud.com/index.html`

### 可选：绑定自定义域名 + CDN 加速

1. COS 控制台 → **域名与传输管理** → **自定义源站域名**
2. 绑定你自己的域名（需要备案）
3. 开启 CDN 加速，国内访问速度更快

---

## 🛠️ 本地手动部署（测试用）

```bash
# 1. 安装 coscmd
pip3 install coscmd

# 2. 配置密钥（仅首次）
coscmd config -a <SecretId> -s <SecretKey> -b <存储桶名称> -r <地域>

# 3. 构建并部署
npm run build
coscmd upload -r --delete ./dist/ /
```

或直接用脚本：
```bash
# 先设置环境变量
export COS_BUCKET="你的存储桶"
export COS_REGION="ap-guangzhou"

# 运行部署
bash deploy-cos.sh
```

---

## 💡 常见问题

**Q: 页面刷新后 404？**
A: 检查 COS 静态网站配置中「错误文档」是否设为 `index.html`。

**Q: GitHub Actions 部署失败？**
A: 检查 Secrets 和 Variables 名称是否完全一致（区分大小写）。

**Q: 更新后看不到新内容？**
A: COS 默认缓存，可在 CDN 控制台手动刷新，或等几分钟自动刷新。
