from pathlib import Path
import json,html,re,shutil,sys
import markdown
from bs4 import BeautifulSoup
SRC=Path(__file__).parent
ROOT=SRC.parent.parent
OUT=ROOT/'catalogue'
DATA=SRC/'data'
OUT.mkdir(exist_ok=True);(OUT/'items').mkdir(exist_ok=True);(OUT/'library').mkdir(exist_ok=True)
E=lambda x:html.escape(str(x),quote=True)
CATS={'vps':'VPS / 服务器','cloud':'云服务 / 存储','software':'软件 / 订阅','hardware':'数码 / 家电','retail':'零售 / 平台','travel':'旅行 / 体验','lifestyle':'日用 / 生活'}
VERDICTS={'worth':'值得关注','conditional':'有条件划算','skip':'不建议追','watch':'先观望'}
STATUS={'live':'当前可用','upcoming':'即将开始','regular':'常规方案','expired':'已结束','unverified':'待核实'}
EVIDENCE={'official-body':'已读官方原文','official-search':'官方检索摘要','media':'媒体报道','unverified':'未能核实'}
DATE='2026-11-11'
ARROW='<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'
SEARCH='<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="6.5" stroke="currentColor" stroke-width="1.5"/><path d="m15 15 5 5" stroke="currentColor" stroke-width="1.5"/></svg>'
def page(title,body,kind='home',prefix='',scope='all'):
 nav=[('index.html','活动目录','home'),('vps.html','VPS 与云','vps'),('recent.html','近期活动','recent'),('guide.html','选购方法','guide'),('library.html','详版资料库','library')]
 n=''.join(f'<a href="{prefix}{u}" '+('aria-current="page"' if k==kind else '')+f'>{label}</a>' for u,label,k in nav)
 return f'''<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="color-scheme" content="light"><meta name="description" content="全球双十一、黑五、VPS、软件订阅与近期活动目录。标出真实价格、续费条件、适用范围与购买建议。"><title>{E(title)} · 十一购物索引</title><link rel="stylesheet" href="{prefix}assets/style.css?v=3"><script src="{prefix}assets/catalogue-data.js?v=3" defer></script><script src="{prefix}assets/app.js?v=3" defer></script></head><body data-page="{kind}" data-scope="{scope}" data-prefix="{prefix}"><a class="skip-link" href="#main">跳到正文</a><div class="edition"><div>十一 / 2026 · 全球购物索引</div><a href="{prefix}guide.html#evidence">标价与活动均需下单前复核 ↗</a></div><header class="header wrap"><a class="brand" href="{prefix}index.html" aria-label="十一购物索引首页"><span class="mark">11</span><span>购物索引<small>THE BUYING INDEX</small></span></a><nav class="desktop-nav" aria-label="主要导航">{n}</nav><button id="menu" class="menu" aria-label="展开导航" aria-expanded="false" aria-controls="mobile-nav"><span></span><span></span></button></header><nav class="mobile-nav wrap" id="mobile-nav" aria-label="手机导航" hidden>{n}</nav><main id="main">{body}</main><footer class="footer wrap"><div class="footer-logo">BUY LESS.<br>CHOOSE WELL.</div><div><strong>把选择看清楚，再决定下一单。</strong><p>更新于 {DATE} · 页面为核验时点快照，并非实时库存。</p><p>证据等级和购买建议是两回事；未核到，不等于活动不存在。</p></div><a href="{prefix}guide.html#evidence">阅读判断标准 ↗</a></footer><div id="toast" role="status" aria-live="polite"></div></body></html>'''

def badge(item):return f'<span class="status s-{E(item["status"])}">{STATUS.get(item["status"],item["status"])}</span>'
def list_filter(scope):
 cats=''.join(f'<button data-category="{k}" aria-pressed="false"><span>{v}</span><b data-count="{k}">—</b></button>' for k,v in CATS.items())
 return f'''<div class="catalogue-layout wrap" id="catalogue"><aside class="directory"><div class="directory-label">BROWSE / 分类</div><button data-category="all" class="selected" aria-pressed="true"><span>全部内容</span><b data-count="all">—</b></button>{cats}<div class="side-note"><span>WHAT TO CHECK</span><p>先看总价。<br>再看续费、退换和使用限制。</p><a href="guide.html">完整选购清单 ↗</a></div></aside><section class="catalogue-main"><div class="search-area"><label class="search-field">{SEARCH}<input id="query" type="search" placeholder="搜索品牌、商品、机房、预算关键词…" aria-label="搜索全部活动内容"><kbd>/</kbd></label><div class="quick-search"><span>试试</span><button data-query="续费">续费</button><button data-query="黑五">黑五</button><button data-query="Mac">Mac</button><button data-query="退款">退款</button><button data-query="流量">流量</button></div></div><div class="filters"><label>参与状态<select id="status"><option value="all">全部状态</option>'''+''.join(f'<option value="{k}">{v}</option>' for k,v in STATUS.items())+'''</select></label><label>购买建议<select id="verdict"><option value="all">全部建议</option>'''+''.join(f'<option value="{k}">{v}</option>' for k,v in VERDICTS.items())+'''</select></label><label>地区<select id="region"><option value="all">全部地区</option></select></label><label>活动窗口<select id="event"><option value="all">全部活动</option></select></label></div><div class="result-bar"><p id="result-count" aria-live="polite">正在读取目录…</p><button id="reset">重置筛选</button><button id="saved-filter" aria-pressed="false">只看收藏 <span id="saved-count">0</span></button></div><div class="offer-list" id="offers"></div><div id="empty" class="empty" hidden><b>没有符合这组条件的条目。</b><p>换个关键词，或清除地区、状态筛选再试。</p><button id="clear-empty">清除筛选</button></div><button id="more" class="more" hidden>继续查看</button><noscript>互动目录需要 JavaScript。<a href="all.html">打开无脚本完整条目列表</a>。</noscript></section></div>'''

def hero(scope,items):
 total=len(items);verified=sum(i['evidence']=='official-body' for i in items);live=sum(i['status']=='live' for i in items);nots=sum(i['verdict'] in ['skip','watch'] for i in items)
 if scope=='all':
  return f'''<section class="hero wrap"><div><span class="eyebrow">A CALMER WAY TO FIND A GOOD DEAL</span><h1>值得与不值得，<br>都替你摆清楚。</h1><p>双十一、黑五、VPS、软件订阅与旅行体验。<br>不只收录折扣，也写下首期、续费和不适合买的人。</p></div><div class="hero-index"><span>本次更新 / NOVEMBER 11</span><div><b>{total}</b><p>条活动与方案<br>逐条说明条件和来源</p></div><a href="#catalogue">开始看目录 {ARROW}</a></div></section><div class="numbers wrap"><div><b>{live}</b><span>当前可用条目</span></div><div><b>{verified}</b><span>读到官方原文</span></div><div><b>{nots}</b><span>观望或不建议追</span></div><a href="recent.html"><span>NEXT WINDOW</span><strong>11.27 黑五 → 11.30 网一</strong><small>日历时间；各商家档期单独核对 ↗</small></a></div>'''
 if scope=='vps':
  return '''<section class="hero wrap compact"><div><span class="eyebrow">VPS / CLOUD / STORAGE</span><h1>服务器便宜，<br>不等于总成本低。</h1><p>把首期、续费、流量、机房、IPv4 和退款放到同一张清单里。<br>没有实际测速，就不写“稳”或“最快”。</p></div><div class="hero-note"><b>先想清楚用途</b><p>练手 / 博客 / 开发 / 备份<br>生产业务更看重恢复、支持与备份。</p><a href="guide.html#vps">VPS 选购检查表 ↗</a></div></section><div class="callout wrap"><b>先说清楚：这些是常规套餐基线</b><p>本轮核验<strong>没有找到任何服务商已确认的 2026 双十一／黑五 VPS 促销</strong>，所以这里收录的是各官网当前可买的常规方案与历史促销入口（状态标为“常规方案”或“待核实”）。拿它比较总价与条款，而不是当成正在进行的促销。</p></div>'''
 return '''<section class="hero wrap compact"><div><span class="eyebrow">WHAT'S NEXT / RECENT EVENTS</span><h1>双十一之后，<br>还有哪些新活动？</h1><p>黑五、网一、平台提前场与旅行季。<br>已经开始、尚未开始、没有公告，各自写清楚。</p></div><div class="hero-note"><b>跟进，不催单</b><p>“近期”按本轮核验时间收录，<br>不会把未公布的活动包装成倒计时。</p><a href="#catalogue">筛选活动与地区 ↗</a></div></section><section class="calendar wrap"><article><span>11.11 / WED</span><h2>双十一</h2><p>当地时区、商品库存、用户资格分别确认。</p></article><article><span>11.27 / FRI</span><h2>Black Friday</h2><p>提前场可能更早开卖；没有官网公告就先观望。</p></article><article><span>11.30 / MON</span><h2>Cyber Monday</h2><p>续费型服务仍要看下一期价格，不靠折扣百分比选。</p></article></section>'''

def item_page(d):
 cat=CATS.get(d['category'],d['category']);stat=STATUS.get(d['status']);ver=VERDICTS.get(d['verdict']);ev=EVIDENCE.get(d['evidence'],d['evidence'])
 specs=''.join('<li>'+E(x)+'</li>' for x in d['specs']);conditions=''.join('<li>'+E(x)+'</li>' for x in d['conditions'])
 timing=(d.get('start')or'开始时间未明确')+' → '+(d.get('end')or'截止时间未明确')
 extra=''
 for x in d.get('extra_sources',[]):
  u=x.get('url','') if isinstance(x,dict) else str(x)
  if u.startswith('https://'):extra+=f'<a href="{E(u)}" target="_blank" rel="noopener">补充来源 ↗</a>'
 body=f'''<div class="detail wrap"><a class="back" href="../index.html#catalogue">← 返回活动目录</a><div class="detail-meta"><span>{E(cat)} / {E(d['region'])}</span>{badge(d)}<span>{E(d['event'])}</span></div><header class="detail-heading"><span class="vendor">{E(d['vendor'])}</span><h1>{E(d['title'])}</h1><p>{E(d['summary'])}</p></header><div class="detail-grid"><article><section class="verdict-block"><span>我们的判断 / {E(ver)}</span><h2>{E(d['why'])}</h2><p>{E(d['avoid'])}</p></section><section class="body-section"><h2>规格与内容</h2><ul>{specs}</ul></section><section class="body-section"><h2>参与条件与容易忽略的限制</h2><ul>{conditions}</ul></section><section class="body-section source-note"><h2>来源与核验范围</h2><p><b>{E(ev)}</b> · 核验 {E(d['verified_at'])}</p><p>{E(d['confidence_note'])}</p><a href="{E(d['source_url'])}" target="_blank" rel="noopener">{E(d['source_title'])} ↗</a>{extra}<p class="fine">页面日期：{E(d.get('source_date')or'未标注')}。核验日可见不代表价格永久有效；宣传中的“最高”不等于每件商品的权益。</p></section></article><aside class="price-sheet"><span>AT A GLANCE / 一眼看清</span><h2>{E(d['price'])}</h2><dl><dt>付款周期</dt><dd>{E({'monthly':'按月','annual':'按年','one-time':'一次性购买','varies':'随方案变化','unknown':'未核清'}.get(d['billing'],d['billing']))}</dd><dt>续费 / 后续成本</dt><dd>{E(d['renewal'])}</dd><dt>活动时间</dt><dd>{E(timing)}</dd><dt>时区</dt><dd>{E(d['timezone'])}</dd><dt>适用地区</dt><dd>{E(d['region'])}</dd></dl><a class="primary" href="{E(d['source_url'])}" target="_blank" rel="noopener">到官方页核对 {ARROW}</a><button class="save" data-save="{E(d['id'])}" aria-pressed="false">收藏这条</button><p>保留原币种，不将月均价当月付价。<br>没有最低价证据，就不写“史低”。</p></aside></div></div>'''
 return page(d['title'],body,'detail','../')

def guide():
 return '''<div class="document wrap"><span class="eyebrow">HOW WE CHOOSE</span><h1>用少一点时间，<br>做清楚一点的判断。</h1><p class="lead">折扣不是结论。使用需求、总成本与退出成本，才决定一件东西是否值得。</p><nav class="toc"><a href="#evidence">证据标准</a><a href="#money">总价与续费</a><a href="#vps">VPS检查表</a><a href="#risk">不建议追的情形</a></nav><section id="evidence"><h2>01 / 先分清证据，再看购买建议</h2><p>“值得关注”是对适用场景的判断；“已读官方原文”只表示正文中的数字、条件得到核对。它们不能互相替代。</p><ul><li><b>官方正文：</b>读到实际活动页、价目表、政策或产品页；仍不能保证所有地区和账户同价。</li><li><b>官方检索摘要：</b>只见索引文字，未读到完整细则；购买前必须到原页面核对。</li><li><b>媒体报道：</b>由具名媒体转述，不提升成官方已核实。</li><li><b>未能核实：</b>页面阻挡、规则缺失或尚未公布；作为待查条目收纳。</li></ul><p>状态另分当前可用、即将开始、全年常规、已结束、待核实。按2026-11-11快照整理，没有证据不写2026黑五活动已开始。</p></section><section id="money"><h2>02 / 到手价与一年后的账单</h2><div class="formula">首期总成本 = 商品价 − 实际生效优惠 + 运费 + 税费 + 必需配件</div><p>订阅或VPS再补算：第二年续费 + IPv4 + 超额流量 + 备份 + 支持费用。价格标成“$2/月，年付”时，通常意味着一次付款约$24，不代表能每个月付$2。</p><ul><li>同款同容量、同保修、同配送范围才可直接比较。</li><li>“最高省80%”要看比较的是原价、套餐价还是多年总价。</li><li>新客、学生、区域账户、支付卡要求不符合，就不能把优惠算进预算。</li><li>年付和多年付前先看取消、退款、自动续费和迁移难度。</li></ul></section><section id="vps"><h2>03 / VPS、云主机与存储怎么选</h2><div class="guide-table"><table><thead><tr><th>用途</th><th>优先看</th><th>需要避开</th></tr></thead><tbody><tr><td>学习 / 轻量博客</td><td>可月付、快照、文档、基础资源</td><td>只为促销年付闲置多台</td></tr><tr><td>大陆访问</td><td>目标运营商晚高峰实测、延迟/丢包</td><td>用CN2/CMIN2名字代替实际测试</td></tr><tr><td>生产业务</td><td>可恢复备份、支持、故障策略、资源稳定</td><td>只因低价选无SLA小商多年付</td></tr><tr><td>冷备份</td><td>容量、取回、下载流量、版本控制</td><td>把对象存储当成实时文件系统</td></tr><tr><td>域名 / 邮件</td><td>续费、转出、恢复期、邮件可投递性</td><td>只看第一年注册价</td></tr></tbody></table></div><p>核对：vCPU是共享还是专用、RAM是否真实保证、SSD/NVMe容量、流量按单向还是双向计算、端口速率与公平使用、IPv4是否另收、IPv6/NAT限制、机房、退款窗口、税、付款周期、续费价、商业使用许可。</p><p>线路名称、标称1Gbps和“无限流量”都不能代替性能测量。此目录没有做跨运营商全天测速，因此不替任何商家承诺“最稳/最快”。</p></section><section id="risk"><h2>04 / 这些情况，列进“不建议追”</h2><ul><li>相对常态价只便宜一点，却要求凑单、多年预付或牺牲退货权。</li><li>低价首期后续费暴涨，且数据迁移成本很高。</li><li>所谓终身订阅没有明确服务生命周期和数据导出途径。</li><li>型号相似但配置缩水，套装附赠物并不是你需要的。</li><li>酒店房券不能预约目标日期，热门日加价后比直接预订更贵。</li><li>账号共享、虚假学生认证、来历不明的软件序列号或充值卡。</li></ul><p>不建议追不等于产品一定差；它表示在本条描述的价格、条件和使用需求下，不足以构成购买理由。</p></section></div>'''

def library_page():
 titles={'p00':'一页速查','p10':'总纲与政策依据','p20':'中国大陆详版','p21':'汽车、旅行、线下与防坑','p30':'跨境速读','p31':'跨境电商详版','p40':'区域市场速读','p41':'区域市场详版'}
 cards=[]
 for pid,title in titles.items():
  src=ROOT/'pages'/f'{pid}.html'
  if not src.exists():continue
  soup=BeautifulSoup(src.read_text(),'html.parser');body=soup.select_one('.doc-body')
  if not body:continue
  for x in body.select('script,style'):x.decompose()
  for a in body.select('a[href]'):
   u=a['href']
   if u.startswith(('http','#')):continue
   fn=u.split('/')[-1].split('?')[0]
   if fn in [k+'.html' for k in titles]:a['href']=fn
  for table in body.select('table'):
   if 'tw' not in table.parent.get('class',[]):
    wrap=soup.new_tag('div');wrap['class']='tw';table.wrap(wrap)
  notice='<aside class="archive-notice"><b>既有资料存档</b><p>这份资料保留此前的研究内容与原始表述，本轮没有逐条重新核对其中所有价格和日期。当前目录中有重新核验条目的，以条目核验日与原始来源为准。</p><a href="../index.html">返回本轮活动目录 ↗</a></aside>'
  rendered=page(title,f'<div class="document wrap library-doc"><a class="back" href="../library.html">← 详版资料库</a><h1>{E(title)}</h1>{notice}<div class="prose">{body.decode_contents()}</div></div>','library','../')
  (OUT/'library'/f'{pid}.html').write_text(rendered)
  cards.append(f'<a href="library/{pid}.html"><span>{pid[1:]}</span><div><h2>{E(title)}</h2><p>保留完整正文、表格与来源；沿用新黑白排版。</p></div>{ARROW}</a>')
 return '<div class="document wrap"><span class="eyebrow">THE RESEARCH LIBRARY</span><h1>想多看一点，<br>这里保留完整资料。</h1><p class="lead">八份既有研究文档继续收纳。新增活动与价格快照在活动目录；旧资料作为背景与追溯入口。</p><div class="archive-notice"><b>阅读时请看核验日期</b><p>旧版资料不是本轮实时价格承诺。尚未重新核到的内容，不因保留在这里就自动升级成已确认优惠。</p></div><div class="library-list">'+''.join(cards)+'</div></div>'

def validate(items):
 ids=set()
 for d in items:
  required=['id','vendor','title','category','region','event','status','verdict','summary','price','billing','renewal','specs','conditions','why','avoid','source_url','source_title','evidence','verified_at','confidence_note']
  missing=[k for k in required if k not in d]
  if missing:raise ValueError(f'{d.get("id")}: missing {missing}')
  if d['id'] in ids:raise ValueError('Duplicate id '+d['id'])
  ids.add(d['id'])
  if not re.fullmatch('[a-z0-9][a-z0-9-]+',d['id']):raise ValueError('Unsafe id '+d['id'])
  if not d['source_url'].startswith(('https://','http://')):raise ValueError('Unsafe source '+d['id'])
  if d['evidence']=='unverified' and d['status']=='live':d['status']='unverified'
  if d['evidence']=='unverified' and d['verdict']=='worth':d['verdict']='watch'
 return items

def build():
 files=['mainland.json','vps.json','software.json','recent-retail.json']
 items=[]
 for fn in files:
  if (DATA/fn).exists():items.extend(json.loads((DATA/fn).read_text()))
 edits=json.loads((DATA/'editor-overrides.json').read_text()) if (DATA/'editor-overrides.json').exists() else {}
 for d in items:
  if d['id'] in edits:d.update(edits[d['id']])
 items=validate(items)
 assets=OUT/'assets';assets.mkdir(exist_ok=True)
 for fn in ['style.css','app.js']:shutil.copy2(SRC/fn,assets/fn)
 (assets/'catalogue-data.js').write_text('window.CATALOGUE_DATA='+json.dumps(items,ensure_ascii=False,separators=(',',':'))+';')
 for d in items:(OUT/'items'/f'{d["id"]}.html').write_text(item_page(d))
 for fn,scope,kind,title in [('index.html','all','home','全球活动目录'),('vps.html','vps','vps','VPS 与云服务'),('recent.html','recent','recent','黑五与近期新活动')]:
  (OUT/fn).write_text(page(title,hero(scope,items)+list_filter(scope),kind,scope=scope))
 (OUT/'guide.html').write_text(page('选购与判断方法',guide(),'guide'))
 (OUT/'library.html').write_text(page('详版资料库',library_page(),'library'))
 allbody='<div class="document wrap"><h1>全部条目 · 可直接阅读</h1><div class="library-list">'+''.join(f'<a href="items/{E(d["id"])}.html"><div><span>{E(CATS.get(d["category"]))} / {E(STATUS[d["status"]])}</span><h2>{E(d["vendor"])} · {E(d["title"])}</h2><p>{E(d["price"])} — {E(d["why"])}</p></div>{ARROW}</a>' for d in items)+'</div></div>'
 (OUT/'all.html').write_text(page('全部条目',allbody))
 counts={'total':len(items),'categories':{k:sum(d['category']==k for d in items)for k in CATS},'statuses':{k:sum(d['status']==k for d in items)for k in STATUS},'verdicts':{k:sum(d['verdict']==k for d in items)for k in VERDICTS},'evidence':{k:sum(d['evidence']==k for d in items)for k in EVIDENCE}}
 (OUT/'data-summary.json').write_text(json.dumps(counts,ensure_ascii=False,indent=2))
 print(json.dumps(counts,ensure_ascii=False,indent=2))
if __name__=='__main__':build()
