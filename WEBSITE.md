# shoxil — GitHub Pages

英文品牌展示官网：四个系列、六个产品详情页、品牌理念、销售渠道、邮箱联系、FAQ 和隐私政策草案。无购物车、支付、库存、订单或用户账号系统。

## 首次部署

1. 在你的 GitHub 账号创建仓库，例如 `shoxil-website`。GitHub Free 使用公开仓库；私有仓库 Pages 支持取决于付费计划。
2. 将本目录完整上传到仓库根目录，包含 `.github/workflows/pages.yml`。不要上传 ZIP 本身，也不要只上传一个外层目录。
3. 仓库 Settings → Pages → Build and deployment → Source 选择 **GitHub Actions**。
4. Actions → Deploy shoxil to GitHub Pages → Run workflow，选择 `main`。
5. 等待 build 和 deploy 都成功，在 Pages 设置页查看发布网址。

## 绑定 shoxil.com

先在 GitHub 个人 Settings → Pages 添加并验证 `shoxil.com`（验证 TXT 值由账号生成），然后在仓库 Settings → Pages → Custom domain 输入 `shoxil.com` 并保存。完成后再修改阿里云 DNS。

将旧的 `@` A 记录 `162.159.143.30` 和 `172.66.3.26` 替换为以下四条 A 记录（主机记录均为 `@`）：

- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

TTL 使用默认值。若存在同一主机名的旧 AAAA/CNAME/ALIAS 记录，需要确认并移除冲突记录。若需 `www.shoxil.com`，设置主机记录 `www` 的 CNAME 到真实 GitHub 用户名对应的 `用户名.github.io`，不要填仓库名或网址路径。

在 GitHub Pages 域名检查通过、HTTPS 证书就绪后，启用 **Enforce HTTPS**。Custom domain 保存后重新运行工作流，使 canonical、图片路径和 sitemap 与 Pages 返回的正式域名保持一致。GitHub Actions 发布时 CNAME 文件不负责绑定，必须在 Pages 设置中保存域名。

旧 Sites 的两个 TXT 验证记录不会阻止 GitHub 的 A 记录解析；确认迁移完成后可清理不用的记录。

## 本地编辑

Node.js 24，无依赖安装。

```text
node build.mjs
node check.mjs
node server.mjs
```

打开 `http://127.0.0.1:4173`。默认 SEO 地址为 `https://shoxil.com`；`SITE_URL` 环境变量可设置为 GitHub Pages 根网址或包含仓库子路径的网址。CI 从 configure-pages 的 base_url 自动读取。

- `build.mjs`：页面、产品、邮箱、购买链接与 SEO。
- `styles.css`：手机与桌面样式，构建时自动写入 dist 并适配网址路径。
- `dist/site.js`：导航、分类筛选和图库。
- `dist/assets`：图片和自托管字体。

发布前仍需确认产品参数及完善隐私政策（目前明确标注草案，noindex）。

## 官方参考

- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
