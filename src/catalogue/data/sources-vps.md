# VPS / 云主机 / 独服 / 存储 / 域名 / CDN 核验记录

- 研究基准：用户指定 2026-11-11 13:38 UTC+8；实际抓取从约13:39开始，逐批更新。
- 仅读取指定 schema；未读取或采信旧 Agent 报告的日期、价格、券码。
- 方法：curl 直接抓官方网页；保留 `/tmp/vps-research/` 下 HTML 与去标签文本用于本次复核。遇到403、脚本渲染或跳转，将明确标记边界。没有注册、登录、购买或性能测试。
- 第一批已写入 `vps.json`：8条，均是现行常规价格，不宣称2026双十一/黑五已确认。
- `price_value` 是 `price` 中首个主要单位价格；存储按GB-month/TB计价不能与VPS月费直接排序比较。未核到价格则写“未公布”、数值null，不引用第三方传闻填价。
- 活动判断只依据本次取得的官方正文；页脚2026、资源文件时间戳和历史活动URL均不证明本届促销。未证实本届活动的条目使用regular或unverified。

## 第一批路径

|官方路径|核到内容|边界|
|---|---|---|
|https://www.digitalocean.com/pricing/droplets|Basic 512MiB US$4/月；CPU Optimized 4GiB/2vCPU US$42/月；2026按秒计费说明|共享与独享CPU分开；未核性能与税后总价|
|https://aws.amazon.com/lightsail/pricing/|IPv4 1GB US$7/月；IPv6-only 512MB US$3.50/月；地区流量减半|页面后部旧示例存在差异，采用当前套餐表；不承诺两核持续算力|
|https://www.hetzner.com/storage/storage-box/|BX11 €3.20未税、1TB、10连接、100子账户、10快照、德国/芬兰|不是S3或通用VPS；官网称数据未镜像至另一服务器|
|https://www.backblaze.com/cloud-storage/pricing|现价US$6.95/TB/30天、3倍平均存储免费出站、超出US$0.01/GB|不可沿用旧US$6/TB；合作方免费出站有路径条件|
|https://developers.cloudflare.com/r2/pricing/|Standard US$0.015/GB-month、IA US$0.01；请求/取回/免费额度|正文标注2026-10-30更新；免出站不等于无请求费；IA最低30天、不享免费层|

## 完成交付与口径

- 最终31条；27条regular、4条unverified。可靠确认的2026双十一/黑五/网一活动：0条。未把日常促销或PROMO名称当作本届活动。
- 分批落盘顺序：8 → 20 → 30 → 31。约13:49停止扩展检索，随后只合并已获取的最后一项、补来源和校验。
- 30条具备官方正文金额；Cloudflare Registrar只有成本价机制，价格未公布、price_value=null。部分金额是续费价、试用额度或起价，必须结合price和conditions读取。Contabo/腾讯/阿里虽有官方可见金额，资格或完整价格关系仍标unverified。
- 适用的退款细则多数未核到，已逐条说明；不主张任何平台稳定、最快或保证大陆速度。通用云机的公网IP、税费和超额计费不从记忆填值。
- 使用curl和公开官方正文/JSON，全程未使用browser，因此没有操作主代理标签；没有账号操作、注册、下单或修改其他报告。

## 每条记录的核验路径

### do-basic-512m

- 官方页：https://www.digitalocean.com/pricing/droplets
- 核到价格：US$4/月
- 核到/适用规格：512 MiB RAM；1 vCPU（Basic 共享 CPU）；10 GiB SSD；500 GiB 月传输额度；2026-01-01起按秒计费，最低60秒或US$0.01（取较高）
- 证据边界：本次实时读取官方正文，核到所列价格和规格；无性能实测，未确认2026节庆优惠。
- 续费边界：当前常规标价；未核到长期锁价承诺，未来调价及税费以账单为准。

### do-cpu-optimized-2vcpu

- 官方页：https://www.digitalocean.com/pricing/droplets
- 核到价格：US$42/月
- 核到/适用规格：4 GiB RAM；2个 dedicated vCPU；25 GiB SSD；4,000 GiB 月传输额度；常规档；不能套用 Premium 档最高10Gbps与NVMe宣传
- 证据边界：本次实时读取官方正文，核到所列价格和规格；无性能实测，未确认2026节庆优惠。
- 续费边界：当前常规标价；未核到长期锁价承诺，未来调价及税费以账单为准。

### aws-lightsail-ipv4-1g

- 官方页：https://aws.amazon.com/lightsail/pricing/
- 核到价格：US$7/月
- 核到/适用规格：1 GB RAM；2 vCPU；40 GB SSD；标称2 TB月传输；套餐包含公网IPv4；孟买、悉尼、雅加达、马来西亚、香港、圣保罗等列明区域的流量额度减半
- 证据边界：核到当前IPv4套餐表US$7、1GB、2vCPU、40GB、2TB；未沿用页面后部旧US$5示例。
- 续费边界：当前常规标价；未核到长期锁价承诺，未来调价及税费以账单为准。

### aws-lightsail-ipv6-512m

- 官方页：https://aws.amazon.com/lightsail/pricing/
- 核到价格：US$3.50/月
- 核到/适用规格：512 MB RAM；2 vCPU；20 GB SSD；标称1 TB月传输；仅IPv6套餐，不含公网IPv4；部分亚太及南美区域传输额度减半
- 证据边界：本次实时读取官方正文，核到所列价格和规格；无性能实测，未确认2026节庆优惠。
- 续费边界：当前常规标价；未核到长期锁价承诺，未来调价及税费以账单为准。

### hetzner-storage-box-bx11

- 官方页：https://www.hetzner.com/storage/storage-box/
- 核到价格：€3.20/月封顶；€0.0051/小时，未含VAT
- 核到/适用规格：1 TB容量；不限流量；10并发连接；100子账户；10个快照；SFTP、BorgBackup、Restic、rsync等协议；德国或芬兰；没有最低合同期，可立即取消
- 证据边界：本次实时读取官方正文，核到所列价格和规格；无性能实测，未确认2026节庆优惠。
- 续费边界：当前常规标价；未核到长期锁价承诺，未来调价及税费以账单为准。

### backblaze-b2-payg

- 官方页：https://www.backblaze.com/cloud-storage/pricing
- 核到价格：US$6.95/TB/30天；前10 GB存储免费
- 核到/适用规格：按byte-hour累计存储计费；每月免费出站额度为平均存储量3倍；其后US$0.01/GB；无最小文件大小或最低存储时长费；Class A/B/C API免费；Class D US$0.004/万次，每天前2,500次免费
- 证据边界：当前官网FAQ明确US$6.95/TB/30-days、3倍平均存储免费出站、API分类；并未证实2026促销。
- 续费边界：当前常规标价；未核到长期锁价承诺，未来调价及税费以账单为准。

### cloudflare-r2-standard

- 官方页：https://developers.cloudflare.com/r2/pricing/
- 核到价格：US$0.015/GB-month；每月前10 GB-month免费
- 核到/适用规格：出站带宽费US$0；Class A US$4.50/百万次；Class B US$0.36/百万次；标准档免费额度：每月100万Class A、1,000万Class B请求；无取回处理费；S3兼容对象存储
- 证据边界：本次实时读取官方正文，核到所列价格和规格；无性能实测，未确认2026节庆优惠。
- 续费边界：当前常规标价；未核到长期锁价承诺，未来调价及税费以账单为准。

### cloudflare-r2-infrequent

- 官方页：https://developers.cloudflare.com/r2/pricing/
- 核到价格：US$0.01/GB-month；取回US$0.01/GB
- 核到/适用规格：出站带宽费US$0，但另收取回处理费；Class A US$9/百万次；Class B US$0.90/百万次；最低存储时长30天；免费层只适用于Standard，不适用此档
- 证据边界：官方表格核到存储、请求及取回价格；skip针对频繁访问场景，冷数据仍可比较成本。
- 续费边界：当前常规标价；未核到长期锁价承诺，未来调价及税费以账单为准。

### racknerd-1g-special

- 官方页：https://www.racknerd.com/specials/
- 核到价格：US$21.99/年
- 核到/适用规格：1GB RAM；1 vCPU；20GB SSD；3TB月流量；1Gbps端口；1个IPv4；KVM、root权限；多机房可选
- 证据边界：本次实时读取官方正文，核到所列价格和规格；无性能实测，未确认2026节庆优惠。
- 续费边界：核到年付US$21.99；续费是否同价未在本次正文确认。

### buyvm-slice-1024

- 官方页：https://buyvm.net/kvm-dedicated-server-slices/
- 核到价格：US$3.5/月
- 核到/适用规格：1024MB内存；1核3.50+GHz；Fair Share共享CPU；20GB SSD；1个IPv4；官网标称不限流量；Las Vegas/New York/Luxembourg机房目录
- 证据边界：核到各档内存、SSD、CPU使用方式、IPv4和价格；未登录FranTech确认各机房库存。
- 续费边界：当前常规标价；未核到长期锁价承诺，未来调价及税费以账单为准。

### buyvm-slice-4096

- 官方页：https://buyvm.net/kvm-dedicated-server-slices/
- 核到价格：US$15/月
- 核到/适用规格：4096MB内存；1核3.50+GHz；Dedicated CPU Usage；80GB SSD；1个IPv4；官网标称不限流量；Las Vegas/New York/Luxembourg机房目录
- 证据边界：核到各档内存、SSD、CPU使用方式、IPv4和价格；未登录FranTech确认各机房库存。
- 续费边界：当前常规标价；未核到长期锁价承诺，未来调价及税费以账单为准。

### bandwagon-basic

- 官方页：https://bandwagonhost.com/order/catalog.json
- 核到价格：US$99.99/年
- 核到/适用规格：2048MB RAM；3vCPU；40GB磁盘；2000GB/月；1000Mbps端口；KVM；机房Los Angeles USCA_2；抓取时available=true
- 证据边界：由官网订单入口链接到catalog.json，价格单位为整账期美元分；SLA档ram_mb原样为2092，不擅自改写为2048。PROMO名称不证明2026促销。
- 续费边界：当前常规标价；未核到长期锁价承诺，未来调价及税费以账单为准。
- 补充路径：https://bandwagonhost.com/vps-hosting.php

### bandwagon-sla-gia-cmin2

- 官方页：https://bandwagonhost.com/order/catalog.json
- 核到价格：US$399.99/年
- 核到/适用规格：2092MB RAM；3vCPU；40GB磁盘；2000GB/月；2500Mbps端口；KVM；机房Los Angeles USCA_5；抓取时available=true；官网列CN2 GIA/CTGNet、联通Premium、移动CMIN2；1独立IPv4、IPv6 /64；99.99% SLA仅USCA_5
- 证据边界：由官网订单入口链接到catalog.json，价格单位为整账期美元分；SLA档ram_mb原样为2092，不擅自改写为2048。PROMO名称不证明2026促销。
- 续费边界：当前常规标价；未核到长期锁价承诺，未来调价及税费以账单为准。
- 补充路径：https://bandwagonhost.com/vps-hosting.php

### bandwagon-hk-gia

- 官方页：https://bandwagonhost.com/order/catalog.json
- 核到价格：US$89.99/月
- 核到/适用规格：2048MB RAM；2vCPU；40GB磁盘；500GB/月；1000Mbps端口；KVM；机房Hong Kong HK_8；抓取时available=true；HK_8 Equinix HK2；官网列CN2 GIA互联
- 证据边界：由官网订单入口链接到catalog.json，价格单位为整账期美元分；SLA档ram_mb原样为2092，不擅自改写为2048。PROMO名称不证明2026促销。
- 续费边界：当前常规标价；未核到长期锁价承诺，未来调价及税费以账单为准。
- 补充路径：https://bandwagonhost.com/vps-hosting.php

### netcup-vps500-g125

- 官方页：https://www.netcup.com/en/server/vps
- 核到价格：页面列€9.50/月（含19%VAT）；另显示€8.26
- 核到/适用规格：2 vCore x86；4GB RAM；64GB SSD；Traffic included；快照、远程控制台；正文默认12个月合同；另有1个月和24个月选择
- 证据边界：核到配置和含VAT标签价格；两个价格的计算关系未确认，不擅自把€8.26称为未税价。
- 续费边界：当前常规标价；未核到长期锁价承诺，未来调价及税费以账单为准。

### ovh-vps1

- 官方页：https://www.ovhcloud.com/en/vps/
- 核到价格：US$4.54/月起
- 核到/适用规格：2 vCore；4GB RAM；40GB NVMe SSD；无限流量；500Mbps公网带宽；含前24小时每日备份与anti-DDoS
- 证据边界：官网当前正文显示US$4.54起及VPS 2027标签；只记录当前公开套餐，不推断活动年份。
- 续费边界：当前常规标价；未核到长期锁价承诺，未来调价及税费以账单为准。

### virmach-nvme1g

- 官方页：https://virmach.com/cheap-kvm-linux-vps-windows-vps/
- 核到价格：US$3.50/月（页面星号价）
- 核到/适用规格：1GB DDR4；1 Ryzen vCPU；30GB NVMe；2TB月流量；1Gbps端口；页面星号注明30% recurring折扣与自动应用条件
- 证据边界：本次实时读取官方正文，核到所列价格和规格；无性能实测，未确认2026节庆优惠。
- 续费边界：正文注明30% off recurring，但US$3.50与折扣的关系未核清；未执行或拼接券码。

### cloudflare-cdn-free

- 官方页：https://www.cloudflare.com/plans/
- 核到价格：US$0/月
- 核到/适用规格：CDN、DNS、Universal SSL；不计量DDoS防护；Free Managed Ruleset；适用个人或非关键爱好项目
- 证据边界：本次实时读取官方正文，核到所列价格和规格；无性能实测，未确认2026节庆优惠。
- 续费边界：当前常规标价；未核到长期锁价承诺，未来调价及税费以账单为准。

### cloudflare-cdn-pro

- 官方页：https://www.cloudflare.com/plans/
- 核到价格：US$25/月；年付折合US$20/月
- 核到/适用规格：Pro网站计划；年付和月付两种价格；提供CDN、DNS、SSL与网站防护功能；官网定位为非业务关键的专业网站
- 证据边界：本次实时读取官方正文，核到所列价格和规格；无性能实测，未确认2026节庆优惠。
- 续费边界：按选定账期常规续费；未核到首年特价。

### bunny-standard-cdn

- 官方页：https://bunny.net/pricing/cdn/
- 核到价格：欧美US$0.01/GB；亚太US$0.03/GB；最低US$1/月
- 核到/适用规格：南美US$0.045/GB；中东非洲US$0.06/GB；按流量目的区域计价；官网提供14天试用入口；本次未开通
- 证据边界：本次实时读取官方正文，核到所列价格和规格；无性能实测，未确认2026节庆优惠。
- 续费边界：当前常规标价；未核到长期锁价承诺，未来调价及税费以账单为准。

### aws-free-plan

- 官方页：https://aws.amazon.com/free/
- 核到价格：US$0起；立即US$100信用额，完成条件最多再获US$100
- 核到/适用规格：仅新AWS Free Tier账号；最多6个月；90+可试用服务；并非所有实例型号永久免费；免费计划到期或额度用完自动关闭；转Paid后可产生费用
- 证据边界：本次实时读取官方正文，核到所列价格和规格；无性能实测，未确认2026节庆优惠。
- 续费边界：无自动续赠信用额；升级Paid Plan后按实际服务计价。

### gcp-e2-micro-free

- 官方页：https://cloud.google.com/free/docs/free-cloud-features
- 核到价格：合资格资源额度内US$0；不表示完整公网实例账单为零
- 核到/适用规格：每月一台非抢占e2-micro等量小时，跨实例/区域合计；仅us-west1、us-central1、us-east1；30GB-month标准持久盘；每月1GB北美出站，排除中国和澳大利亚目的地；外部IPv4、超额流量及其他资源应单独核费
- 证据边界：本次实时读取官方正文，核到所列价格和规格；无性能实测，未确认2026节庆优惠。
- 续费边界：月度免费额度不结转；超额按正常费率收取。
- 补充路径：https://cloud.google.com/vpc/network-pricing

### azure-free-trial

- 官方页：https://azure.microsoft.com/en-us/free/
- 核到价格：US$0开通试用；新用户获US$200信用额，30天内使用
- 核到/适用规格：仅新Azure用户；提供消费保护；20+服务有12个月月度免费量；65+服务长期有额度；超过30天或信用额用完需转按量付费继续使用
- 证据边界：核到US$200/30天和新客条件；未把信用额当现金折扣或2026节庆促销。
- 续费边界：无续赠US$200；继续使用须转按量付费。

### oracle-a1-always-free

- 官方页：https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier_topic-Always_Free_Resources.htm
- 核到价格：额度内US$0
- 核到/适用规格：Arm A1每月前1,500 OCPU小时、9,000 GB小时免费；官网等效2 OCPU与12GB内存；不能套用旧4核24GB；启动盘与块存储共享200GB免费量；本地区限制；每月10TB出站免费额度；可因库存不足无法创建；符合官网7天低利用率条件的空闲计算实例可能被回收
- 证据边界：本次官方正文明确1500/9000与2 OCPU/12GB；存储段对默认启动盘另有47/50GB不一致，故只写200GB合计，不硬编码可建实例数。
- 续费边界：免费额度内按Always Free政策；超过额度或选择非免费资源会计费。

### hetzner-cpx02-helsinki

- 官方页：https://www.hetzner.com/cloud/regular-performance/
- 核到价格：€5.49/月封顶，未含VAT
- 核到/适用规格：1 AMD vCPU；1GB RAM；20GB NVMe；芬兰HEL1；20TB包含流量；共享CPU；按小时累计至月封顶，删除实例才停止实例计费；页面Create旁出现currently unavailable，不能保证可订购
- 证据边界：核到CPX02、HEL1月价€5.49和20TB；不采用德国€6.49或新加坡€7.99混搭；库存不可确认。
- 续费边界：当前常规标价；未核到长期锁价承诺，未来调价及税费以账单为准。

### hetzner-ax42-dedicated

- 官方页：https://www.hetzner.com/dedicated-rootserver/ax42/
- 核到价格：€99/月＋一次性€49安装费，均未含VAT
- 核到/适用规格：AMD Ryzen 7 PRO 8700GE，8核SMT；64GB DDR5 ECC；2×512GB NVMe；1Gbps端口；官网标不限流量（带星号条件）；HEL1/FSN1；IPv6 /64；独立IPv4为可选项
- 证据边界：本次实时读取官方正文，核到所列价格和规格；无性能实测，未确认2026节庆优惠。
- 续费边界：€99/月常规标价；一次性€49安装费；未核锁价或退款。

### contabo-vps4-intro

- 官方页：https://contabo.com/en/vps/
- 核到价格：€4.40/月（前24个月）；页面另列€5.50
- 核到/适用规格：4 vCPU；8GB RAM；100GB SSD；1快照；200Mbit/s端口；标称不限流量，附星号条件；税费切换状态未确认
- 证据边界：页面数字拆为4与40，结合€/month读为4.40；规格卡逐项核到；资格、税费、续费未核清，非2026活动确认。
- 续费边界：正文写前24个月€4.40并另列€5.50；第25个月账单及税制尚未订单核验。

### tencent-lighthouse-4g-new

- 官方页：https://cloud.tencent.com/act/pro/lighthouse
- 核到价格：CNY109/首年
- 核到/适用规格：4核；4GB RAM；3Mbps带宽；正文称支持IPv6、免费独立公网IP；新用户专享；磁盘与月流量卡片未完整回传
- 证据边界：官方入口跳转当前lhsale页，正文反复列109元/年和4核4G3M；未核本届活动期限与动态配置价格卡。
- 续费边界：核到首年109元；具体续费原价未核到。
- 补充路径：https://cloud.tencent.com/act/pro/lhsale

### aliyun-ecs-99-renewal

- 官方页：https://www.aliyun.com/daily-act/ecs/activity_selection
- 核到价格：CNY99/年（仅核到续费价，首购价未核到）
- 核到/适用规格：2核2GB；3Mbps固定带宽；40GB ESSD Entry盘；限购1台；官方写持续低价、续费99元1年；新购价格位置Loading
- 证据边界：只引用续费99元及其相邻2核2G3M/40G参数，不用动态未加载的首购价推算折扣。
- 续费边界：官方正文明确续费99元/年；首购价与资格须动态页面复核。

### cloudflare-registrar-watch

- 官方页：https://www.cloudflare.com/products/registrar/
- 核到价格：未公布（本次公开正文未取得具体域名/TLD报价）
- 核到/适用规格：注册、转入、续费按注册局及ICANN成本定价；免费WHOIS隐私遮蔽、DNSSEC、域名锁；公开页称支持430+后缀；实际域名可用性需查询；使用Registrar必须保留Cloudflare nameservers，不能改用其他DNS提供商的NS
- 证据边界：已核功能与定价机制，未登录或输入域名查询，没有编造.com价格；不计为价格完整套餐。
- 续费边界：官网明确注册/转入/续费成本价机制；实际后缀金额未核到。
- 补充路径：https://developers.cloudflare.com/registrar/get-started/register-domain/

### greencloud-budget-kvm1

- 官方页：https://greencloudvps.com/budget-kvm-vps.php
- 核到价格：US$6/月
- 核到/适用规格：1 core；1GB RAM；15GB SSD；1.5TB月流量；10Gbps共享端口；KVM；Linux；免费1个Backup/Snapshot；目录列美国/欧洲/亚太，实际机房库存需核对
- 证据边界：本次实时读取官方正文，核到所列价格和规格；无性能实测，未确认2026节庆优惠。
- 续费边界：当前常规标价；未核到长期锁价承诺，未来调价及税费以账单为准。

## 已尝试但未扩成独立报价条目的来源

|对象|实际尝试官方路径|结果及边界|
|---|---|---|
|Vultr|https://www.vultr.com/pricing/ ; https://www.vultr.com/products/cloud-compute/ ; https://docs.vultr.com/products/compute/cloud-compute/plans|定价/产品403，所试文档404；不填常见的US$2.50或US$5记忆价。|
|Akamai / Linode|https://www.linode.com/pricing/ ; https://www.akamai.com/products/cloud-computing/pricing ; https://www.linode.com/products/nanode/|403；未取得可核价正文。|
|DMIT|https://www.dmit.io/ ; https://www.dmit.io/cart.php?gid=1|403拦截；未抄第三方线路套餐、节日价或券码。|
|Crunchbits|https://crunchbits.com/ ; https://my.crunchbits.com/store/vps|主页HTTP403且正文为访问保护；备用商店TLS失败。|
|HostHatch|https://hosthatch.com/cloud ; https://hosthatch.com/|返回HTTP200但仅735字节挑战/空壳，去标签后没有可核价正文。|
|NerdRack|https://nerdrack.com/|返回RackNerd页面，未找到独立套餐证据；避免重复计数。|
|Hetzner Server Auction|https://www.hetzner.com/sb/ ; https://www.hetzner.com/_resources/app/jsondata/live_data_sb.json|竞拍页200但实例列表动态加载；所试旧数据路径404。导航from价不与未知CPU/硬盘拼接；改收可核完整配置的AX42。|
|Namecheap|https://www.namecheap.com/domains/ ; https://www.namecheap.com/domains/registration/gtld/com/|403，未核到.com首年/续费对照。|
|NameSilo|https://www.namesilo.com/pricing ; https://www.namesilo.com/domain/search-domains ; https://www.namesilo.com/domain/com|pricing仅26字节空内容；搜索页能读但报价动态加载；所试.com入口404。不填传闻价格。|
|华为云|https://activity.huaweicloud.com/discount_area_v5/index.html|200活动聚合页，正文有2026及2019-11-11、2024-11-14、2024-11-21等多份模板时间，并有0元默认占位；无法可靠绑定单款价格/资格/期限，故不误收为2026双十一。|
|GreenCloud 黑五专页|https://greencloudvps.com/vps-black-friday|404；官网预算KVM页200且有完整US$6套餐，收常规套餐。|
|腾讯旧路径|https://cloud.tencent.com/act/pro/lighthouse2025|404；改从无年份官方入口核到当前活动正文，路径/模板年份不当作本届活动证据。|

## 关键价格和年份冲突的处理

- Backblaze当前正文是US$6.95/TB/30天，不能套用旧US$6；Oracle A1当前官方文档是1,500 OCPU小时/9,000 GB小时，等效2核12GB，不抄旧4核24GB。
- AWS Lightsail采用前部当前套餐表：IPv4 1GB US$7/月；页面后部旧示例US$5未采信。
- 搬瓦工使用官网链接的catalog.json读取整数美分、账期、机房和available；2092MB RAM原样保留。API的PROMO名称不是活动年份证据。
- OVH当前正文写VPS 2027，只登记当前套餐可见标价，不宣称2026活动；netcup并列€8.26/€9.50，不臆断未税和含税计算关系；Hetzner CPX02不同区域价格分别列出，未跨区拼凑。
- R2 Standard免费层不适用于IA；免费出站仍可能产生请求费、取回费与单位向上取整。B2合作伙伴出站路径、共享CPU公平使用、年付预付款、IPv4附费、合约期和税费均是比较时的限制。

## 文件校验

- vps.json可被Python标准JSON解析；31个id唯一，字段与schema-example.json完全一致。
- 枚举、核验日期、至少3项specs及2项conditions已校验；没有affiliate/ref/utm跟踪链接。
- 正式交付仅本目录vps.json与sources-vps.md。原始抓取在临时目录/tmp/vps-research供当前会话复核，非永久证据归档。
