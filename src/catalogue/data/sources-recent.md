# 近期零售与旅行来源核验

基准：2026-11-11 13:38 UTC+8；本轮实际抓取稍晚，抓取时间保存在 evidence-recent/*.json。11/27、11/30只是黑五/网一日历，不自动成为商家活动起止。未使用旧目录优惠。

证据等级：official-body 为官方正文实际可读；official-search 仅限官方结果摘要；unverified 为阻断/空壳/无有效活动正文。HTTP 200、页脚年份、搜索标题均不能单独证明2026活动。价格是访问时页面展示，未下单验证。start/end 留空表示未核到，不用日历补齐。

## amazon-us-early-bf-ring-blink

- Amazon 美国｜live / conditional｜official-body
- 官方来源：[Black Friday Deals 2026 | Amazon.com](https://www.amazon.com/blackfriday)
- 价格：Ring Battery Doorbell 2K USD 39.99（页面 Typical 99.99）；Blink Outdoor 4 加购机 USD 23.99
- 核到与缺口：正文核到型号、三档价格、Prime 标签及 Sync Module 不含；浏览器正文有 Black Friday deals start Nov 19，但未见同句年份和截止时区，保守不填起止；价格不是历史最低证明。
- 限制：当前展示配送位置 Los Angeles 90001；跨境运费、税费未含核算；Ring 39.99 卡片未标 Prime 限定；149.99 的型号明确限 Prime；退换期限、价保和录像订阅费用本页未核到；按具体卖家商品页确认
- 取舍：已有兼容系统可看 Blink；新用户买加购机后还需 Sync Module，不能把 USD 23.99 当完整监控套装成本。Ring 39.99 是可比较的当前单机价。

## amazon-uk-early-bf-gillette

- Amazon 英国｜live / worth｜official-body
- 官方来源：[Black Friday Week 2026 | Amazon.co.uk](https://www.amazon.co.uk/blackfriday)
- 价格：GBP 14.25；页面 RRP GBP 22.49，标示 37% off
- 核到与缺口：正文核到 GBP 14.25、11 Count、RRP 22.49、37% 与 Early Black Friday；未核到2026起止，不承诺历史最低。
- 限制：未核到会员限定或结束时间；RRP 为建议零售价，不代表昨日成交价；配送、跨境税费、开封卫生用品退货及价保需商品页确认
- 取舍：十一枚包装的实付总价明确，已有兼容刀柄时易比较每枚成本；本地采购比跨境运送低客单耗材更合理。

## amazon-de-early-bf-bulk-paper

- Amazon 德国｜live / skip｜official-body
- 官方来源：[Amazon.de | Black Friday Woche 2026](https://www.amazon.de/blackfriday)
- 价格：EUR 16.55；页面 Statt EUR 19.46，15% Rabatt
- 核到与缺口：正文核到16.55、19.46、15%与48卷规格；仅当前站点价，未核到活动起止和配送成本。
- 限制：德国站欧元价格；非其他 Amazon 站通用价；会员限定、退换及运费门槛未核到；不据德国站价格推算全球含税到手价
- 取舍：整单相比页面比较价仅省 EUR 2.91；48卷体积大，任何转运体积费都可能超过节省额。德国本地有需求可另比较超市单卷价。

## apple-us-certified-refurbished

- Apple 美国｜regular / conditional｜official-body
- 官方来源：[Certified Refurbished Products - Apple](https://www.apple.com/shop/refurbished)
- 价格：iPhone 16 128GB 无锁版 USD 659；页面官翻最高省15%
- 核到与缺口：正文核到659美元、128GB无锁、一年保修、最高15%及完整2026/2027延长退货日期；不将这段退货日期当黑五售卖日期。
- 限制：正文：符合条件且于2026-11-06至2026-12-25收到的商品，可至2027-01-08发起退货；这组日期是退货资格窗口，不是折扣活动起止；当地销售税、跨境维修/运费及具体货源另核；未核到黑五额外价保
- 取舍：一年官方保修和明确无锁规格比仅看第三方翻新低价更易评估；如全新机促销接近659美元，官翻的价格优势就有限。

## klook-vietnam-esim-cap

- Klook｜live / skip｜official-body
- 官方来源：[Klook Deals - Exclusive Promo Codes and Offers - Klook USA](https://www.klook.com/en-US/deals/)
- 价格：ESIMNEWUSER1USD：99% off，最高减 USD 1，无最低消费
- 核到与缺口：正文逐字显示99% off cap 1 USD、No min. spend及券码；未显示起止日期、库存和完整资格，2026出现在另一个券码内不构成日期证据。
- 限制：新客具体定义、领取名额、有效期、支付渠道和可叠加未核到；eSIM 的流量/天数/覆盖与设备兼容要按产品确认；旅行体验需预约时段；取消、不可退、最迟预约时间本汇总页未说明
- 取舍：即使订单很大也最多省1美元；不值得为99%广告更换原本更便宜或更合适的eSIM。只有本就适用的微额产品才可能合算。

## ikea-au-bf-billy

- IKEA 澳大利亚｜live / worth｜official-body
- 官方来源：[IKEA Sale, Clearance and Latest Offers  - IKEA Australia](https://www.ikea.com/au/en/offers/)
- 价格：BILLY 白色80×28×202 cm：AUD 116.10，原展示 AUD 129，省 AUD 12.90
- 核到与缺口：正文核到Black Friday、九折、BILLY两档AUD价格、2026-11-30有效期与排除项；未核到起始日。region使用schema多地区枚举，实际销售区域为澳大利亚。
- 限制：商品卡写价格有效至2026-11-30或售完；未标截止时刻；Family会员有免费Click and collect提示；不可据此假设折扣仅会员可用；配送与组装费用另计；退货、价保及全量排除项须查看T&C
- 取舍：当前明确九折与原展示价差，适合原本计划买标准书柜并能自提的人；服务费不打折，配送安装需合算。

## lazada-sg-redmart-local-flash

- Lazada / RedMart 新加坡｜live / conditional｜official-body
- 官方来源：[Lazada Singapore | Always The Better Price & Free Shipping](https://www.lazada.sg/)
- 价格：Dove 1L SGD 4.97（展示9.89）；Dasani 24×600ml SGD 9.60（展示12.00）
- 核到与缺口：正文核到两件商品价格、规格与Flash Sale状态；页尾含2021旧宣传，未将其认作2026双十一证据。
- 限制：新加坡站价格；页面符号$按站点记SGD，不与USD混算；倒计时会动态变动，未据此推定固定结束日期；LazMall介绍有15天退货宣传，不能外推为每件RedMart生鲜/卫生用品均可退；运费与起送额另核
- 取舍：本地刚需补货有明确可比价；整箱水的低价不适合转运，配送费可吞掉整单省下的SGD 2.40。

## playstation-us-accessory-offers

- PlayStation Direct 美国｜unverified / watch｜official-body
- 官方来源：[Shop PlayStation Deals on Hardware, Accessories, Games and Services | PlayStation®](https://direct.playstation.com/en-us/deals)
- 价格：G29 方向盘+踏板 USD 229.99（展示299.99）；G923 USD 299.99（展示349.99）
- 核到与缺口：正文有完整UTC起止和两档套装价格，日期已转换为PST；无实际结账核验，重复隐藏状态使库存/PS Plus资格不明确，因此status=unverified。
- 限制：页面公共说明：超过USD 40免运、免费30天退货，Conditions apply；两套件正文有效期均为2026-11-06T08:00Z至2026-11-16T07:59:59Z；会员限制与实时库存须进商品页确认；未确认为所有商品需要PS Plus
- 取舍：适合赛车游戏用户继续追踪；降价幅度明确但可售状态不清，不能按宣传价视为立即可买，也不能把方向盘套装误当PS5主机套装。

## ebay-us-select-codes

- eBay 美国｜live / conditional｜official-body
- 官方来源：[Daily Deals on eBay | Best deals and Free Shipping](https://www.ebay.com/deals)
- 价格：SHOPBRANDS20：指定货品20% off；PARTSAVE10：指定汽车零件10% off
- 核到与缺口：官方Deals正文明确三个券码与折扣范围；未核到2026起止及封顶。
- 限制：最低消费、封顶、次数、到期时区未核到；需确认卖家、适配车型与单件退货条款；平台券不等于所有卖家可用；未核到价保
- 取舍：对本来要买且在券池中的商品有比较价值；汽配错型号的退运成本可能超过10%优惠。

## roborock-us-bf-published

- Roborock 美国｜live / conditional｜official-body
- 官方来源：[Roborock 2026 Black Friday Deal – Save Up to $1650 | Roborock US Official Store](https://us.roborock.com/pages/deals)
- 价格：Qrevo S Pro USD 379.99；Saros 20 USD 989.99；主场价格是否相同待确认
- 核到与缺口：正文有完整2026主场倒计时，紧邻两阶段月日与当前产品价；没有结账或未来价格保证。
- 限制：活动页倒计时写2026-11-19 00:00:00，未标时区；游客结账不享Roborock积分；ID.me额外10%需资格核验且叠加未核；美国配送、税费、退货和价保待单品条款确认
- 取舍：主场时间有正文证据；当前价格可用于比价，但尚不能保证主场更低或额外会员折扣能叠加。

## insta360-us-camera-baseline

- Insta360 美国展示商店｜regular / conditional｜official-body
- 官方来源：[Insta360 Official Store](https://store.insta360.com/)
- 价格：Ace Pro 2 USD 369.99起；X4 USD 424.99起；GO 3S USD 299.99起
- 核到与缺口：官方正文核到三个起价及产品描述；币种按美国美元展示环境记录，区域切换后须重核。
- 限制：具体套装、电池、自拍杆、存储卡是否包含须逐项核；页面超过$129免运；适用收货区域需确认；Prime快速配送有会员条件；常规退换期限和价保未核
- 取舍：可建立不同拍摄用途的价格基线；8K运动相机与8K全景相机并非可直接替代，按用途比较更有价值。

## marriott-direct-member-rate

- Marriott Bonvoy｜regular / conditional｜official-body
- 官方来源：[Membership Levels & Benefits](https://www.marriott.com/loyalty/member-benefits.mi)
- 价格：会员加入免费；住宿价格随酒店与日期变化
- 核到与缺口：正文确认免费注册、专享价、积兑权益；未核到11月活动价、折扣比例或住宿期限。
- 限制：本次未注册会员；比较同房型、早餐、税费与取消条款；会员价不自动等于可退价；积分房供应、兑换门槛与OTA订单是否积点未核
- 取舍：原本常住万豪时直订权益值得计入总价；为一次低价房买积分没有本页兑换价值支撑。

## cathay-hk-flight-experience-bonus

- Cathay Pacific 国泰航空｜live / conditional｜official-body
- 官方来源：[Elevate your next flight with Cathay Pacific](https://www.cathaypacific.com/cx/en_US/offers.html)
- 价格：山顶指定套票15% off；城巴HK Dayrider最高50% off
- 核到与缺口：正文明确山顶15%和2026-12-31、城巴最高50%和2027-02-28；end仅对应主推山顶，城巴另见specs。
- 限制：需要符合官网线上订票条件；不得理解为任何访港旅客通用券；预约、票券兑换、适用班次、不可退与名额未在汇总页展示；两种体验不是同一套装；页面没有具体票价或叠加规则
- 取舍：对已准备在官网买机票且会乘城巴/上山顶者可能有净节省；不应为少量体验折扣接受更贵的机票。

## cathay-east-hongkong-stay

- Cathay Pacific / EAST Hong Kong｜live / conditional｜official-body
- 官方来源：[Elevate your next flight with Cathay Pacific](https://www.cathaypacific.com/cx/en_US/offers.html)
- 价格：指定客房预订22% off；实际房价未公布
- 核到与缺口：官方正文显示EAST Hong Kong 22%与截止2026-12-31；未核到现金价和入住窗口。
- 限制：需国泰线上订机票资格；住宿日期、排除日、税费、服务费和最低连住未核到；不可退、取消扣费和预约条款须到酒店报价页确认
- 取舍：折扣可供有固定赴港行程的人比价；如果基准是高于其他渠道的弹性价，22%未必便宜。

## cathay-airport-express-expired

- Cathay Pacific / 港铁｜expired / skip｜official-body
- 官方来源：[Elevate your next flight with Cathay Pacific](https://www.cathaypacific.com/cx/en_US/offers.html)
- 价格：机场快线20% off（已过期）
- 核到与缺口：官网正文明确2026-10-31截止，按当前2026-11-11标expired。
- 限制：不把旧页面展示当活动延续；未核到延期公告；票价及退款政策未取得
- 取舍：2026-10-31已经过去，不能将其计入11月香港行程预算；需要重新找当前有效票价。

