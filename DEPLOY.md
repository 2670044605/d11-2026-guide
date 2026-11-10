# 发布记录 · 2026 全球双十一完全指南

## 线上地址

**https://tsurezure.jerrylabs.dev/d11-2026-guide/**

- 仓库：https://github.com/2670044605/d11-2026-guide （public）
- 托管：GitHub Pages（legacy 构建，main 分支根目录，`.nojekyll` 关闭 Jekyll 处理）
- 证书：HTTPS 证书 approved，`https_enforced=true`（HTTP 301 → HTTPS）
- 标准 GitHub Pages 地址 `<user>.github.io/d11-2026-guide/` 会 301 到上述自定义域名

## 发布前核验（全部通过）

| 项目 | 结果 |
|---|---|
| 结构与链接 | 9 页 / 120 个站内引用 / **0 失效**（含重复 id、锚点可达、索引锚点） |
| 敏感信息 | 密钥、token、邮箱、手机号、内网地址、`minis://` 残留 **均为 0** |
| 外部请求面 | 仅正文内容链接，无外部 CSS/JS/字体/埋点，离线可用 |
| 首页体积 | 13 KB（检索索引 216 KB 外置 + 懒加载） |
| 单页最大 | 92 KB（跨境详版） |
| 桌面端 | 首页/文档页/检索/跨页跳转/锚点定位/折叠/深浅色/密度字号 全部实测通过 |
| 移动端 | 390px 下**无横向溢出**、抽屉侧栏、表格独立横向滚动、顶栏 85px |
| 跨页检索 | 首页命中 62 条 → 跳转文档页锚点定位（距顶 70px）+ 命中词高亮 17 处 |
| 同页检索 | 就地高亮 72 处，不重新导航 |
| 外部来源抽查 | 商务部原文 / PRNewswire / 新浪财经 三个链接均 200 |

## 目录结构

```
publish/
├── index.html          首页仪表盘（KPI + 此刻该做什么 + 8 份文档入口）
├── pages/p00..p41.html 8 份文档页
├── site.css            共享样式（浅/深色 + 4 个响应式断点 + 打印样式）
├── site.js             共享脚本（主题/密度/字号/折叠/抽屉/目录高亮）
├── search-index.js     全局检索索引（949 条，懒加载）
├── favicon.svg  robots.txt  sitemap.xml  404.html  .nojekyll
```

## 重新发布

```sh
sh /var/minis/workspace/双十一2026/web/package.sh   # 构建 + 注入 meta + 自检
cd /var/minis/workspace/双十一2026/publish
git add -A && git commit -m "..." && git push origin main
```

`package.sh` 会自动跑链接自检与敏感信息扫描，任一失败即中止。
Pages 构建约需 1–3 分钟，可用 `gh api repos/<user>/d11-2026-guide/pages --jq .status` 查询。

## 已知取舍

- 跨页跳转后**保留命中词高亮**（通过 localStorage 传递搜索词）；若浏览器禁用 localStorage 则仅跳转不高亮
- 检索索引外置为 216 KB 的 JS，首次聚焦搜索框时才加载
- `backdrop-filter` 毛玻璃未使用：iOS WebKit 多实例合成会导致渲染卡死
