# 2026-11-11 · 内容扩展与黑白目录

本分支 `agent/catalogue-v3` 在既有站点之外新增 `/catalogue/`，不替换首页或旧页面。用户选择黑白 A 方向后，进一步要求扩充双十一、黑五、VPS、软件及近期活动，并同时收录不值得的条目。

- 结构化源：`src/catalogue/data/*.json`，来源核验日志在同目录 `sources-*.md`。
- 构建器：`src/catalogue/build.py`，资源源文件：`style.css`、`app.js`。
- 构建：`python3 src/catalogue/build.py`；Python 依赖 markdown、beautifulsoup4。
- 产物：`catalogue/index.html`、`vps.html`、`recent.html`、`guide.html`、`library.html`，以及每条独立详情页。
- 旧八份文档以“既有资料存档”保留；不自动把其中旧日期与价格升级为本轮已核实。

判断分两条轴：`status` 描述当前可用/待核/常规/即将开始/结束；`verdict` 描述值得/有条件/不建议/观望。证据类型另列，不把官网页面存在等同所有活动已核实。

价格保持币种与账期；年付折算价不当月付价，续费无法确定时明确未核到。仅做目录和评价，不替用户购买、注册或领取。

这版用于用户查看进一步优化后的 A 设计与扩充内容，未合并到 main。
