# 软件、订阅、AI与生产力核验说明

研究基准：2026-11-11 13:38 UTC+8；本轮实际读取约13:39–13:52 UTC+8。约11分钟时停止扩展页面，最后阶段只读已保存材料、纠错并落盘。结果为28个有区分的服务；Microsoft 365与Copilot合并，Affinity与Canva关系写在同条，没有用同一服务的多个档位凑数。无VPS、未修改站点、Git或发布。

## 方法与可复核范围

先生成并落盘8条，再依次落盘14、21、28条，最终修正容量标题矛盾等问题。software.json是最终交付，以该文件为准；build-software.py是中间构建脚本，之后的finalize-software.py实施最终审校，不建议单独重跑前者覆盖审校结果。

优先并行GET官方价格、产品、公告与条款正文，HTML、解析文本和HTTP/标题/最终URL元数据保存于software-evidence/。仅OpenAI使用独立浏览器标签2补读：curl返回403，浏览器加载到官方中文套餐正文但金额为空，因此未填写习惯性旧价。没有搜索摘要作为事实来源；official-search本轮为0。

“official-body”只表示实际读到所引用页面的正文，不表示所有价格、地区、税和续费均完整验证。某项未显示时，在price、conditions或confidence_note明确列为未核到。Adobe 403、JetBrains仅加载占位，均为unverified；1Password虽读到企业正文，个人价格仍为unverified状态。没有登录账户、兑换学生资格、输入支付信息或完成结账，live表示网页当前展示，不能保证每位用户可下单。

全球/多地区仅指服务覆盖参考，不承诺中国大陆注册、付款、AI访问或网络可达。美元网页报价不视为人民币含税售价。只有明确写明含VAT/不含税的页面才作肯定描述，其余以结账为准。数值price_value选本条代表性金额，不宜跨月付、年付、一次付费直接排序；price与billing为解释依据。学生及家庭资格必须合法真实，无共享账号黑车建议。Lifetime仅指相关产品/账户生命周期权益，不保证永久运营。

## 最值得关注的变化与争议

- Affinity个人版已免费，官网已列iPad；Canva premium AI与企业SSO是另行条件。VMware官方2024公告已对个人、教育、商业全部免费，不能包装成2026新优惠。
- Resolve Studio 21官网295→236美元、减20%，未列活动截止；不能凭划线价声称史低。
- Bitwarden Premium已为19.80美元/年，Families47.88美元/年；CleanShot Basic35美元、可选后续更新19美元/年。不能用旧攻略的10美元/29美元代填。
- Icedrive为具名2026黑五，12月5日23:59:59英国时间截止；首年80%优惠。但官网显示Checkout is temporarily unavailable，且1.80/月、21.58首年卡片的容量标题与选项不一致。最终JSON已取消“21.58肯定购买2TB”的断言。顶部“Grab Pro FREE”没有配套免费资格证据，不录为免费一年。
- Coursera239美元首年、399续年，11月30日23:59 UTC截止，仅新订阅，排除印度、英国、澳大利亚；已有专项订阅不会自动取消。
- Proton Unlimited77.88首年→119.88续年；微软30%只限首个账期，Family的AI仅订阅所有者。Surfshark先付27个月后转按年续订，当前页面未列续年总额。
- Google专门学生条款（2026-08-19更新）写12个月免费、2026-12-31前兑换、18岁与SheerID、合格付款方式，排除家庭组及若干现有订阅情形、香港/澳门/突尼斯；不能把首页“最多4年”的概述写成免费4年。当前Pro页面列5TB。
- Claude当前Max/Ultra正文列条件性API credits，OpenAI Pro也出现条件性API credits；不沿用“所有聊天订阅都完全没有API”的旧结论，也不将额度面值当现金返还。
- Mullvad固定5欧元含VAT且声明不做节日促销；Obsidian本体商用免费，其40%教育/非营利优惠为长期资格价。Setapp与Notion列出具体不划算场景；看不到价格的条目保留watch，不虚构优惠。
- 本轮未找到并完整验证的已结束2026优惠，故没有为了覆盖expired而编造一条。也没有发现可证实的通用双十一官方活动，不能把所有regular条目称作双十一优惠。

## 条目核验索引

每条以下记录实际查看URL及本次限制；日期以条目source_date为准，未标注不由网页版权年份推断发布日期。

状态统计：{'regular': 13, 'live': 9, 'unverified': 5, 'upcoming': 1}；证据统计：{'official-body': 26, 'unverified': 2}。

### 1. Bitwarden — regular / worth

- 主来源：[ Bitwarden Password Manager Pricing & Plans | Bitwarden ](https://bitwarden.com/pricing/)
- 证据：official-body；页面日期：未标注
- 核到的价格：Premium US$19.80/年（页面折算 US$1.65/月）；Families US$47.88/年（折算 US$3.99/月，最多6人）；基础版免费。
- 续费：当前常规年付 Premium US$19.80、Families US$47.88；不是首年促销，未承诺未来续费永远同价。
- 限制：正文明确列出19.80/47.88美元年价、6人上限和不含税；未核到2026节日折扣。
- 保存正文：[software-evidence/bitwarden.txt](software-evidence/bitwarden.txt)

### 2. Mullvad — regular / worth

- 主来源：[ Pricing ](https://mullvad.net/en/pricing)
- 证据：official-body；页面日期：未标注
- 核到的价格：€5/月，含VAT；买1个月、1年或更长的月单价均为€5；可接受的加密货币付款常规优惠10%。
- 续费：长期充值不降月单价，仍按€5/月；不承诺未来政策不变。
- 限制：正文核到€5含VAT、5设备、14天退费与现金例外、加密货币10%及不做节日促销声明。
- 保存正文：[software-evidence/mullvad.txt](software-evidence/mullvad.txt)

### 3. Affinity / Canva — regular / worth

- 主来源：[ Professional Creative Software | Craft In Affinity, Scale In Canva ](https://www.affinity.studio/)
- 证据：official-body；页面日期：未标注
- 核到的价格：个人版免费（0）；Canva premium AI 与企业方案金额本次未核到。
- 续费：个人免费版无订阅续费；Canva premium为独立条件，价格及续费须另查。
- 限制：当前首页正文明确“free for individuals”，Mac/Windows/iPad及付费Canva AI条件；不将免费理解为对企业、AI或永久运营的承诺。
- 保存正文：[software-evidence/affinity.txt](software-evidence/affinity.txt)

### 4. VMware / Broadcom — regular / worth

- 主来源：[ VMware Fusion and Workstation are Now Free for All Users - VMware Cloud Foundation (VCF) Blog ](https://blogs.vmware.com/cloud-foundation/2024/11/11/vmware-fusion-and-workstation-are-now-free-for-all-users/)
- 证据：official-body；页面日期：2024-11-11
- 核到的价格：免费；官方公告称付费 Workstation Pro／Fusion Pro 已停止销售。
- 续费：免费桌面产品无授权续费；历史商业合同及其支持仅按原合同期限。
- 限制：已读2024-11-11官方公告全文；这是既有政策参考，不冒称2026黑五活动，也未全面测试2026各平台兼容性。
- 保存正文：[software-evidence/vmware.txt](software-evidence/vmware.txt)

### 5. Obsidian — regular / worth

- 主来源：[ Pricing - Obsidian ](https://obsidian.md/pricing)
- 证据：official-body；页面日期：未标注
- 核到的价格：本体免费；Sync US$4/用户/月（年付）或US$5月付；Publish US$8/站点/月（年付）或US$10月付；合资格教育及非营利用户附加服务减40%。
- 续费：Sync／Publish为持续订阅；年付月价是折算值。40%资格优惠的后续资格复核及锁价未核到。
- 限制：正文核到免费商用、Sync/Publish两种账期、40%资格优惠及退款区别。
- 保存正文：[software-evidence/obsidian.txt](software-evidence/obsidian.txt)

### 6. Alfred — live / conditional

- 主来源：[ Alfred Powerpack - Take Control of Your Mac and macOS ](https://www.alfredapp.com/powerpack/)
- 证据：official-body；页面日期：未标注
- 核到的价格：Single License £34；Mega Supporter £59；页面写购买现版可免费升级Alfred 6。
- 续费：一次性许可证无自动续费；Single除页面承诺的Alfred 6外，不保证其他未来大版免费；Mega按其生命周期升级权益。
- 限制：已读正文£34/£59、Single v5、Mega终身升级及免费升Alfred 6；未见促销截止时间或史低依据。
- 保存正文：[software-evidence/alfred.txt](software-evidence/alfred.txt)

### 7. Blackmagic Design — live / worth

- 主来源：[ DaVinci Resolve | Blackmagic Design ](https://www.blackmagicdesign.com/products/davinciresolve)
- 证据：official-body；页面日期：未标注
- 核到的价格：官方当前页面 Studio 21 Was US$295 / Now US$236，标注Save 20%；免费版0。
- 续费：当前为一次性购买，不是按月订阅；未核到永久免费升级合同承诺，云服务费用不含在此判断。
- 限制：正文明确Studio 21、Save 20%、Was $295/Now $236；未见具名2026黑五标题及截止时间。
- 保存正文：[software-evidence/blackmagic.txt](software-evidence/blackmagic.txt)

### 8. Backblaze — regular / conditional

- 主来源：[ Unlimited Cloud Backup for Mac & PC | Backblaze — $9/Month ](https://www.backblaze.com/cloud-backup/personal)
- 证据：official-body；页面日期：未标注
- 核到的价格：US$9/月；年付折算US$8.25/月即US$99/年；两年US$189，页面折算US$7.88/月。
- 续费：列出的9/月、99/年、189/两年为常规账期价格，未见首期优惠；续期以账户当时价为准。
- 限制：正文核到9美元月付、8.25年付折算、189两年总价和15天试用；未核到2026黑五价及税。
- 保存正文：[software-evidence/backblaze.txt](software-evidence/backblaze.txt)

### 9. Icedrive — live / watch

- 主来源：[ Black Friday Cloud Storage Offers 2026 - Icedrive ](https://icedrive.net/offers/black-friday-2026)
- 证据：official-body；页面日期：未标注
- 核到的价格：页面年付卡片显示首年US$21.58、折算US$1.80/月，但容量标题与2TB选项对应关系不一致，套餐容量未可靠确认；1TB Lifetime为US$299一次性。
- 续费：首年80%优惠，后续恢复对应套餐标准年费；当前选项与卡片标题不一致且具体续年总额未显示，须恢复结账后确认。Lifetime无周期续费。
- 限制：核到80%首年、21.58美元年卡片、299美元Lifetime及12月5日截止；2TB选项的1.80/月与卡片“Pro 1TB”标题冲突，无法可靠绑定容量。
- 实际访问补充来源：https://icedrive.net/plans
- 保存正文：[software-evidence/icedrive-bf.txt](software-evidence/icedrive-bf.txt)

### 10. pCloud — live / conditional

- 主来源：[ pCloud Pricing | Lifetime & Subscription Plans ](https://www.pcloud.com/cloud-storage-pricing-plans.html)
- 证据：official-body；页面日期：未标注
- 核到的价格：500GB US$159；2TB US$379；10TB US$1,099；3TB三合一套装US$579，均一次性。
- 续费：对应Lifetime存储配额一次付费，无常规周期续费；独立Encryption、Pass及升级权益按实际套餐。
- 限制：正文可核159/379/1099/579美元及功能排除项；当前页面标BLACK FRIDAY，未标活动年份和截止，不据此补造。
- 保存正文：[software-evidence/pcloud.txt](software-evidence/pcloud.txt)

### 11. CleanShot — regular / conditional

- 主来源：[ CleanShot X â Pricing ](https://cleanshot.com/pricing)
- 证据：official-body；页面日期：未标注
- 核到的价格：Basic US$35一次付费；可选更新续费US$19/年；Pro US$10/用户/月按年付（US$120/年）；学生减30%，PixelSnap 2用户减20%。
- 续费：Basic更新第一年包含，后续19美元/年可选；Pro年付持续续期，具体取消路径结账前核实。
- 限制：已查看官网正文；未见明确的2026双十一或黑五活动起止时间，不据此声称史低。
- 实际访问补充来源：https://cleanshot.com/
- 保存正文：[software-evidence/cleanshot-pricing.txt](software-evidence/cleanshot-pricing.txt)

### 12. Coursera — live / conditional

- 主来源：[ Coursera Plus | Unlimited Access to 10,000+ Online Courses ](https://www.coursera.org/courseraplus)
- 证据：official-body；页面日期：未标注
- 核到的价格：US$239/首年（常规US$399/年）；月付US$59，7天试用后收费。
- 续费：首年239美元，随后每年自动续费399美元另加适用税；账户设置取消。
- 限制：正文核到2026-11-30截止、新客、三国排除、239首付399续费及退款/原订阅不自动取消。
- 保存正文：[software-evidence/coursera.txt](software-evidence/coursera.txt)

### 13. Microsoft — live / conditional

- 主来源：[ Compare Microsoft 365 Plans & Pricing (Formerly Office 365) - Microsoft Store ](https://www.microsoft.com/en-us/microsoft-365/buy/compare-all-microsoft-365-products)
- 证据：official-body；页面日期：未标注
- 核到的价格：Personal首月US$6.99或首年US$69.99；之后9.99/月或99.99/年。Premium首月13.99或首年139.99；之后19.99/月或199.99/年。Family常规129.99/年。
- 续费：Personal首年69.99→99.99美元/年，Premium139.99→199.99美元/年；首月方案分别6.99→9.99、13.99→19.99；税以结账为准。
- 限制：官方对比及Copilot页同时核到30%首账期价、试用排除、自动续费和Family AI所有者限制；不重复拆成两家凑数量。
- 实际访问补充来源：https://www.microsoft.com/en-us/copilot/pricing/individuals
- 保存正文：[software-evidence/microsoft365.txt](software-evidence/microsoft365.txt)

### 14. Proton — live / conditional

- 主来源：[ Proton Pricing Plans - Free & Paid Plans | Proton ](https://proton.me/pricing)
- 证据：official-body；页面日期：未标注
- 核到的价格：Mail Plus首年US$29.88（2.49/月折算），续年47.88；Unlimited首年US$77.88（6.49/月折算），续年119.88。
- 续费：Mail Plus29.88首年→47.88/年；Unlimited77.88首年→119.88/年，明确是不同的首期与续期。
- 限制：当前价格正文核到50%、两档首12个月总额与续12个月金额；未见具体2026黑五日期。 正文FAQ同时核到自动续订和dashboard→Downgrade取消方法。
- 保存正文：[software-evidence/proton.txt](software-evidence/proton.txt)

### 15. Setapp — regular / skip

- 主来源：[ Setapp pricing: Save on apps with Setapp membership | Setapp ](https://setapp.com/pricing)
- 证据：official-body；页面日期：未标注
- 核到的价格：Mac US$14.99/月；Mac+iOS US$18.99/月；Power User US$22.99/月，均另加税。
- 续费：月付常规价格，未核到2026首期折扣；年付宣传不代表逐月扣费。
- 限制：已查看官网正文；未见明确的2026双十一或黑五活动起止时间，不据此声称史低。
- 保存正文：[software-evidence/setapp.txt](software-evidence/setapp.txt)

### 16. Raycast — regular / conditional

- 主来源：[ Raycast Pricing: Free and Pro Plans with AI ](https://www.raycast.com/pricing)
- 证据：official-body；页面日期：未标注
- 核到的价格：个人Pro US$10/月或US$96/年；Plus US$20/月或US$192/年；Max US$50/月或US$480/年；经验证学生Pro减50%。
- 续费：年付是常规账期优惠；学生续年资格与税需核验，未见2026黑五承诺。
- 限制：核到个人三档月/年价格、免费商用、50%学生限定及60天/月度、12个月充值额度有效期。
- 保存正文：[software-evidence/raycast.txt](software-evidence/raycast.txt)

### 17. Parallels — unverified / watch

- 主来源：[ Buy Parallels Desktop for Mac | Standard, Pro & Business ](https://www.parallels.com/products/desktop/buy/)
- 证据：official-body；页面日期：未标注
- 核到的价格：当前购买页正文未显示可复核金额；2026双十一/黑五价格未核到。
- 续费：订阅/一次性授权并存；未核到金额及首期续费差异，需在登录结账页确认。
- 限制：官方购买页正文有功能和退费条款，但无可复核价格；仅将已读的功能条款标正文证据。
- 保存正文：[software-evidence/parallels.txt](software-evidence/parallels.txt)

### 18. Notion — regular / skip

- 主来源：[ Notion Pricing Plans: Free, Plus, Business, & Enterprise. ](https://www.notion.com/pricing)
- 证据：official-body；页面日期：未标注
- 核到的价格：页面Plus展示US$10/成员/月、Business US$20/成员/月；抓取正文无法确认所选账期，全年总价不推断；Custom Agents为US$10/1000 credits。
- 续费：月/年订阅自动续费，续费按当时成员数及方案计算；主价格账期未确证，未称黑五优惠。
- 限制：已查看官网正文；未见明确的2026双十一或黑五活动起止时间，不据此声称史低。
- 保存正文：[software-evidence/notion.txt](software-evidence/notion.txt)

### 19. Todoist — regular / conditional

- 主来源：[ Pricing | Todoist ](https://www.todoist.com/pricing)
- 证据：official-body；页面日期：未标注
- 核到的价格：Pro US$60/年（折算5/月）或US$7月付；Business US$96/人/年（折算8/月）或US$10/人月付。
- 续费：列出的是当前常规年/月价，未承诺存量或未来续费锁定同价。
- 限制：已查看官网正文；未见明确的2026双十一或黑五活动起止时间，不据此声称史低。
- 保存正文：[software-evidence/todoist.txt](software-evidence/todoist.txt)

### 20. Readwise — regular / conditional

- 主来源：[ Pricing | Readwise ](https://readwise.io/pricing)
- 证据：official-body；页面日期：未标注
- 核到的价格：Full Readwise US$9.99/月按年付（折算年总额119.88）；Highlights与Reader单项各7.99/月按年付；Lite 5.59/月按年付。
- 续费：常规年订阅；取消不等同于退还本年未用部分，本次未核到按比例退款承诺。
- 限制：正文核到四档年付月折算与功能排除、30天试用、取消入口；未核到本期黑五或明确续年锁价。 页面也出现early access锁定价格的宣传，但适用范围及合同条件未核清，未泛化为所有新用户终身锁价。
- 保存正文：[software-evidence/readwise.txt](software-evidence/readwise.txt)

### 21. Surfshark — live / conditional

- 主来源：[ How much does Surfshark cost? Check the pricing - Surfshark ](https://surfshark.com/pricing)
- 证据：official-body；页面日期：未标注
- 核到的价格：Starter与One首27个月总额US$67.23（折算2.49/月）；One+总额US$107.73（折算3.99/月），VAT可能另计。
- 续费：前27个月67.23/107.73美元；之后按年续订，具体年费未核到，必须付款前核实。
- 限制：已查看官网正文；未见明确的2026双十一或黑五活动起止时间，不据此声称史低。
- 保存正文：[software-evidence/surfshark.txt](software-evidence/surfshark.txt)

### 22. Anthropic / Claude — regular / conditional

- 主来源：[ Plans & pricing | Claude by Anthropic ](https://claude.com/pricing)
- 证据：official-body；页面日期：未标注
- 核到的价格：Pro US$20/月或US$200/年（页面显示约17/月，精确年折算16.67）；Max US$100/月；Ultra US$200/月。
- 续费：常规Pro200美元年付或20美元月付，Max100、Ultra200月付；未核到2026节日首期优惠。
- 限制：正文核到当前四档、Pro200年总价、Max/Ultra API credits和税；credits具体资格附注未完整展开，不保证所有账户可用。
- 保存正文：[software-evidence/claude.txt](software-evidence/claude.txt)

### 23. Google / Gemini — live / conditional

- 主来源：[ Google AI plans with Cloud Storage - Google One ](https://one.google.com/about/google-ai-plans/)
- 证据：official-body；页面日期：学生条款更新2026-08-19
- 核到的价格：合资格学生AI计划12个月免费；美国美元页面AI Pro常规19.99/月或199.99/年，Ultra起99.99/月。
- 续费：学生免费12个月后自动续当地对应计划标准月价；19.99美元仅美元页面AI Pro参考，不保证每个地区学生最终获同一套餐。
- 限制：首页核到5TB与美元常规价；专门学生条款核到12个月、兑换截止及排除条件。首页另有“最多4年”概述，与具体免费期不混同。
- 实际访问补充来源：https://one.google.com/offer/studentoffer8
- 保存正文：[software-evidence/gemini.txt](software-evidence/gemini.txt)

### 24. OpenAI / ChatGPT — unverified / watch

- 主来源：[ 套餐和价格 | ChatGPT（独立浏览器标签实际读取） ](https://openai.com/chatgpt/pricing/)
- 证据：official-body；页面日期：未标注
- 核到的价格：免费版可确认；Go／Plus／Pro的当前金额及2026黑五价格未核到。
- 续费：金额未加载，未核到首期与续费价格；以官方账户账单为准。
- 限制：curl价格页及帮助页403；独立浏览器标签2成功读到官方中文正文，但所有金额为空，因此仅功能证据为official-body，价格未验证。
- 实际访问补充来源：https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus
- 保存正文：[software-evidence/openai.txt](software-evidence/openai.txt)
- 浏览器补读记录：独立标签2，标题“套餐和价格 | ChatGPT”，金额节点为空；正文功能提取见JSON的specs与confidence_note，curl空正文不作为价格证据。

### 25. Valve / Steam — upcoming / watch

- 主来源：[ Upcoming Steam Events (Steamworks Documentation) ](https://partner.steamgames.com/doc/marketing/upcoming_events)
- 证据：official-body；页面日期：未标注
- 核到的价格：具体游戏价格与折扣未公布，不把季节促销日程当作所有游戏都会打折。
- 续费：游戏常见为一次性购买，个别游戏或服务订阅需单独确认；本条仅活动日程。
- 限制：官方开发者文档核到Winter Sale 2026日期；游戏价格、参与范围和具体时区未公布/未核到。
- 保存正文：[software-evidence/steam.txt](software-evidence/steam.txt)

### 26. Adobe — unverified / watch

- 主来源：[ Access Denied ](https://www.adobe.com/creativecloud/plans.html)
- 证据：unverified；页面日期：未标注
- 核到的价格：未核到；官方价格页返回403。
- 续费：首付、续费和账期均未核到。
- 限制：实际请求官方plans页被403拒绝；没有正文或官方搜索摘要可支持金额，故明确unverified。
- 保存正文：[software-evidence/adobe.txt](software-evidence/adobe.txt)

### 27. JetBrains — unverified / watch

- 主来源：[ Monthly and yearly plans with JetBrains Toolbox ](https://www.jetbrains.com/store/)
- 证据：unverified；页面日期：未标注
- 核到的价格：未核到当前商业订阅金额或2026黑五折扣。
- 续费：本次未核到订阅续费阶梯与回退许可证细则。
- 限制：商店200但正文仅加载占位；教育页重定向后也仅标题，无法据此验证完整政策或价格。
- 实际访问补充来源：https://www.jetbrains.com/academy/student-pack/
- 保存正文：[software-evidence/jetbrains.txt](software-evidence/jetbrains.txt)

### 28. 1Password — unverified / watch

- 主来源：[ 1Password Pricing and Plans | 1Password ](https://1password.com/pricing)
- 证据：official-body；页面日期：未标注
- 核到的价格：个人及家庭方案当前金额、2026黑五优惠未核到；企业页面要求联系销售。
- 续费：未核到个人/家庭当前首期和续费，不能声称终身折扣。
- 限制：官方pricing正文真实读取，但内容为企业Unified Access与销售询价；个人价格与促销未验证。
- 保存正文：[software-evidence/1password.txt](software-evidence/1password.txt)

## 最终校验

JSON已重新解析；28个唯一id；所有schema字段齐全；每条至少2项specs与conditions（本轮均4项）；状态、结论和证据枚举合法。未做购买验证，未检查历史成交价格，因此没有任何“史低”结论。
