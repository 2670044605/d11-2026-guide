# 发布记录 · 2026 年末大促指南（感恩节 + 黑五 + 年末生活 + 归档）

## 线上地址

**https://tsurezure.jerrylabs.dev/d11-2026-guide/**

- 仓库：https://github.com/2670044605/d11-2026-guide
- 托管：GitHub Pages（legacy 构建，main 分支根目录，`.nojekyll` 关闭 Jekyll 处理）
- 证书：HTTPS 已强制，HTTP 301 → HTTPS
- 当前工作区版本：**v15**（2026-11-20）
- 公网状态：**已发布 v15**（2026-11-20，发布提交 `f967ed8`）

## v15 变更（2026-11-20）

| 项目 | 内容 |
|---|---|
| 新指南 | `pages/thanksgiving.html`：11/26 营业、梅西第 100 届游行、火鸡/剩菜安全、出行、黑五边界 |
| 新指南 | `pages/gifts.html`：预算分层、收礼人、gift receipt、礼卡、寄送、包装、办公室与回礼 |
| 新指南 | `pages/travel.html`：感恩节/圣诞/新年高峰、机票火车酒店退改、机场、自驾、延误、跨境、宠物与无障碍 |
| UI | 黑五封面从棕黑+橙光改为浅色暖纸/深松绿；KPI、边框、次要文字对比度调整 |
| 导航 | 当前活动 / 长期指南 / 维护三组，扩展到 9 份当前指南；首页入口同步 |
| 检索 | 索引重建为 1850 条；新页名/锚点加入；同页同节去重 |
| 资源版本 | 全站统一 `?v=15` |

## v14 变更（2026-11-20）

| 项目 | 内容 |
|---|---|
| 新指南 | `pages/calendar.html`：2026–2027 年末日历、时区、送达截止、买/等/不买 |
| 新指南 | `pages/december.html`：圣诞、节礼日、新年、日本福袋、礼物、退货、骗局 |
| 新指南 | `pages/method.html`：到手价、30/90 天历史价、证据分级、AI 软文、预算 |
| 新指南 | `pages/shipping.html`：直邮/转运/保税、DDP/DDU、税费、禁限运、退运 |
| 新指南 | `pages/protection.html`：价保、法定退货权、保修、chargeback、礼卡、话术 |
| 归档中心 | `archive.html` 从「双十一归档」扩为「内容归档中心」：当前/长期/历史、8 份旧文、11/10 快照、v11–v14、复审日期 |
| 黑五状态 | `pages/bf.html` 增加 12/3「转复盘」横幅；12/3 后停止实时建议 |
| 首页 | 首页切为「黑五 → 圣诞 → 新年」；12/3 自动把黑五行动表切为 12 月清单 |
| 检索 | `search-index.js` 重建为 1595 条；建议词加入圣诞/节礼日/比价；页面名加新指南 |
| 资源版本 | 全站统一 `?v=14` |
| UI | 新增归档状态卡、过期横幅、12 月清单样式；复用原有时间轴/表格/清单组件 |

## 当前目录结构

```
/
├── index.html            年末仪表盘（感恩节 / 黑五倒计时 + 12 月切换 + 9 份指南入口）
├── archive.html          内容归档中心（当前/长期/历史 + 双十一 8 份 + 11/10 快照 + 版本）
├── updates.html          更新日志（v15 / v14 / v13 / v12 / v11 + 复审日期 + 缺口）
├── 404.html              年末站点 404
├── pages/
│   ├── thanksgiving.html 2026 感恩节指南（11/26，活动/营业/餐桌/出行）
│   ├── bf.html           2026 黑五网一完全指南（当前，12/3 转复盘）
│   ├── calendar.html     2026–2027 年末大促日历
│   ├── december.html     圣诞、节礼日与新年
│   ├── method.html       比价、证据与预算
│   ├── shipping.html     跨境物流、税费与清关
│   ├── protection.html   价保、退货、保修与支付
│   ├── gifts.html         礼物、预算与送礼（长期）
│   ├── travel.html        年末出行与住宿（长期）
│   ├── p00.html … p41.html  8 份双十一归档文档（noindex，保留原 URL）
├── site.css              共享样式（阅读 + 黑五 + 长期指南 + 归档状态）
├── site.js               共享交互（主题/密度/字号/目录/倒计时/清单/到期切换）
├── search.js             共享检索（索引懒加载 / 键盘 / 跨页高亮）
├── search-index.js       检索索引（1850 条：旧 1595 + v15 255）
├── sitemap.xml           只列当前有效页面（首页 / 9 份指南 / updates / archive，共 12 URL）
├── robots.txt  favicon.svg  .nojekyll
```

## 内容状态规则

| 状态 | 页面 | 处理 |
|---|---|---|
| 当前活动 | 首页、`thanksgiving.html`、`bf.html`、`calendar.html` | 感恩节 11/26；黑五只到 2026-12-02；12/3 起自动显示复盘横幅、撤实时建议 |
| 长期指南 | `december`、`gifts`、`travel`、`method`、`shipping`、`protection` | 按季度/年度复审；不写未核实折扣 |
| 历史归档 | `p00`–`p41`、11/10 快照、v11–v14 | 保留原文/URL；加归档横幅、`noindex,follow`；撤出 sitemap/主入口 |
| 记录 | `updates.html` | 只追加变更，不改写历史 |

## 发布前核验

| 项目 | 结果 |
|---|---|
| 站内链接 | 全部 HTML 交叉检查，无断链；归档旧 URL 仍可达 |
| 锚点 | 所有 `id` 唯一；目录/搜索索引锚点可达 |
| 检索索引 | 1850 条；新页条目全部指向存在的页面与锚点 |
| 资源版本 | 全站统一 `?v=15`，无 v14/v13 资源残留 |
| 外部请求 | 仅正文内容链接；无外部 CSS/JS/字体/埋点，离线可读 |
| 移动端 | 需在 368–390px 复核：无横向溢出、抽屉目录、表格滑动、清单可点 |
| 桌面端 | 需在 1440px 复核：三栏布局、目录、阅读进度、主题切换 |
| 归档策略 | 旧页保留、加横幅、撤出主入口/sitemap、`noindex` |
| 时效切换 | 2026-12-03 后首页/黑五页显示复盘状态；需在浏览器改系统日期或用 JS 模拟验证 |

## 重新发布

```sh
# 在仓库根目录
node --check site.js
node --check search.js
node --check search-index.js
python3 -m http.server 3000 --bind 0.0.0.0
# 打开 http://localhost:3000/ 做最终检查

git add -A
git commit -m "新增年末长期指南与归档中心"
git push origin main
```

GitHub Pages 构建约 1–3 分钟；发布后检查：

```sh
curl -s -o /dev/null -w '%{http_code}\n' https://tsurezure.jerrylabs.dev/d11-2026-guide/
curl -s https://tsurezure.jerrylabs.dev/d11-2026-guide/ | grep -o 'site.css?v=[0-9]*'
curl -s -o /dev/null -w '%{http_code}\n' https://tsurezure.jerrylabs.dev/d11-2026-guide/pages/calendar.html
```

## 已知取舍 / 缺口

- 归档旧页保留原 `/pages/` URL，避免外链失效；已 `noindex`，不再进入 sitemap。
- 站内搜索仍能检索归档内容，结果带「归档 ·」前缀；这是有意保留的历史可查性。
- Amazon US、Target、Costco 的 2026 官方活动页未取得，正文标为「媒体」；Best Buy 价保完整条款以官方页面为准。
- 2027 年零售档期尚未公布；日历只写公共假日/日历节点，不写具体折扣承诺。
- 节礼日门店营业时间、承运商 2026 具体 cutoff 未逐家回读；正文只给规划缓冲。
- 法定权利部分是购物指南，不是法律意见；个案请咨询当地消费者机构/律师。
- 12/3 后应把 `bf.html` 从 sitemap 移除，并按归档中心的状态表更新。
