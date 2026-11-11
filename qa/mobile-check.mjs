import fs from 'node:fs/promises';
import path from 'node:path';
import {chromium, webkit, devices} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
const engine=process.env.BROWSER_ENGINE||'chromium';
const browser=await ({chromium,webkit}[engine]).launch({headless:true});
const profile=engine==='chromium'?'Pixel 7':'iPhone 13';
const options={...devices[profile],locale:'zh-CN',colorScheme:'light',reducedMotion:'reduce'};
const out='qa-results';await fs.mkdir(out,{recursive:true});
const report={time:new Date().toISOString(),engine,browserVersion:browser.version(),profile,runtime:process.platform,scope:'Cloud browser with phone emulation; not a physical Android/iPhone device.',main:'25aa986460556e49108473a3f4751b5d538d6b1a',candidate:'2e5fd3aaf2416d039a5a0385ece2c03509c57bf1',scenarios:[]};
const assert=(value,message)=>{if(!value)throw new Error(message)};
async function scenario(label,base,full=true){
 const context=await browser.newContext(options),page=await context.newPage();
 page.setDefaultTimeout(7000);page.setDefaultNavigationTimeout(30000);
 const s={label,base,steps:[],errors:[],badResponses:[]};report.scenarios.push(s);
 page.on('pageerror',e=>s.errors.push(String(e)));
 page.on('response',r=>{if(r.status()>=400)s.badResponses.push({url:r.url(),status:r.status()})});
 async function step(name,fn){let start=Date.now();try{s.steps.push({name,status:'pass',details:await fn(),ms:Date.now()-start})}catch(e){s.steps.push({name,status:'fail',error:String(e),ms:Date.now()-start})}}
 async function navigate(url){await page.goto(url,{waitUntil:'load'});await page.waitForFunction(()=>!!window.D11);}
 async function results(){await page.waitForFunction(()=>/条命中/.test(document.querySelector('#searchcount').textContent),{},{timeout:5000});return await page.locator('#searchcount').textContent()}
 async function noOverflow(){return await page.evaluate(()=>({viewport:innerWidth,width:document.documentElement.scrollWidth,overflow:document.documentElement.scrollWidth>innerWidth+1}))}
 await step('home_load_and_environment',async()=>{await navigate(base);const data=await page.evaluate(()=>({ua:navigator.userAgent,platform:navigator.platform,touch:navigator.maxTouchPoints,width:innerWidth,dpr:devicePixelRatio,entries:document.querySelectorAll('.entry').length}));assert(data.entries===8,'Eight document entrances required');s.environment=data;return data});
 await step('phone_widths_360_390_412',async()=>{const a=[];for(const w of [360,390,412]){await page.setViewportSize({width:w,height:844});await page.waitForTimeout(180);const x=await noOverflow();assert(!x.overflow,JSON.stringify(x));a.push(x)}await page.setViewportSize(options.viewport);return a});
 await step('drawer_open_close_escape_focus',async()=>{await page.locator('#menuBtn').tap();await page.waitForFunction(()=>document.querySelector('#sidebar').classList.contains('open'));assert(await page.locator('#menuBtn').getAttribute('aria-expanded')==='true','aria-expanded');await page.locator('#sideClose').tap();await page.waitForFunction(()=>!document.querySelector('#sidebar').classList.contains('open'));await page.locator('#menuBtn').tap();await page.keyboard.press('Escape');await page.waitForFunction(()=>!document.querySelector('#sidebar').classList.contains('open'));return {focus:await page.evaluate(()=>document.activeElement.id)}});
 await step('reading_settings_persist_no_overflow',async()=>{await page.locator('#toolsBtn').tap();await page.locator('[data-pref="font"] [data-val="l"]').tap();await page.locator('[data-pref="density"] [data-val="relaxed"]').tap();await page.locator('#toolsClose').tap();await page.reload({waitUntil:'load'});const pref=await page.evaluate(()=>({font:document.documentElement.dataset.fontscale,density:document.documentElement.dataset.density}));assert(pref.font==='l'&&pref.density==='relaxed','preferences did not persist');assert(!(await noOverflow()).overflow,'large text overflows');await page.locator('#toolsBtn').tap();await page.locator('[data-pref="font"] [data-val="m"]').tap();await page.locator('[data-pref="density"] [data-val="normal"]').tap();await page.locator('#toolsClose').tap();return pref});
 await step('light_dark_and_home_screenshots',async()=>{await page.screenshot({path:path.join(out,`${engine}-${label}-home-light.png`)});await page.locator('#themeBtn').tap();await page.waitForFunction(()=>document.documentElement.dataset.theme==='dark');await page.screenshot({path:path.join(out,`${engine}-${label}-home-dark.png`)});await page.reload({waitUntil:'load'});assert(await page.locator('html').getAttribute('data-theme')==='dark','dark preference persistence');await page.locator('#themeBtn').tap();return {bothThemes:true}});
 await step('first_search_typical_focus_input',async()=>{await page.locator('#q').fill('国补');return {count:await results()}});
 await step('keyboard_search_navigation_and_highlight',async()=>{if(!/条命中/.test(await page.locator('#searchcount').textContent())){await page.locator('#q').fill('');await page.locator('#q').fill('国补');await results()}await page.locator('#q').press('ArrowDown');await page.locator('#q').press('Enter');await page.waitForFunction(()=>location.pathname.includes('/pages/')&&location.hash.length>1);await page.waitForFunction(()=>document.querySelectorAll('mark').length>0);const pos=await page.evaluate(()=>{const t=document.getElementById(decodeURIComponent(location.hash.slice(1)));return {anchor:!!t,top:t?.getBoundingClientRect().top,marks:document.querySelectorAll('mark').length,header:document.querySelector('.topbar').getBoundingClientRect().bottom}});assert(pos.anchor,'missing destination anchor');return pos});
 if(full){
 await step('long_document_tables_toc_collapse',async()=>{await navigate(new URL('pages/p31.html',base).href);assert(!(await noOverflow()).overflow,'long document overflow');const data=await page.evaluate(()=>({tables:document.querySelectorAll('.prose table').length,toc:document.querySelectorAll('#sideTocList a').length,badges:document.querySelectorAll('.badge').length}));assert(data.tables>0&&data.toc>0,'missing table/toc');const scroll=await page.locator('.tw').first().evaluate(e=>{e.scrollLeft=100;return {max:e.scrollWidth-e.clientWidth,left:e.scrollLeft}});assert(scroll.max<=0||scroll.left>0,'table cannot scroll');await page.locator('.doc-head').tap();assert(await page.locator('.doc').evaluate(e=>e.classList.contains('collapsed')),'document not collapsed');await page.locator('.doc-head').tap();await page.locator('#menuBtn').tap();const links=page.locator('#sideTocList a');await links.nth(Math.min(3,(await links.count())-1)).tap();await page.waitForFunction(()=>scrollY>50);assert(!await page.locator('#sidebar').evaluate(e=>e.classList.contains('open')),'drawer did not close');await page.screenshot({path:path.join(out,`${engine}-${label}-longdoc.png`)});return {...data,tableScroll:scroll}});
 await step('accessibility_light_and_dark',async()=>{await navigate(base);const scans=[];for(const theme of ['light','dark']){if(await page.locator('html').getAttribute('data-theme')!==theme)await page.locator('#themeBtn').tap();const a=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();const data={theme,url:page.url(),violations:a.violations,incomplete:a.incomplete.map(i=>({id:i.id,impact:i.impact,nodes:i.nodes.length})),passes:a.passes.length};await fs.writeFile(path.join(out,`${engine}-${label}-axe-${theme}.json`),JSON.stringify(data,null,2));scans.push({theme,violations:a.violations.map(v=>({id:v.id,impact:v.impact,count:v.nodes.length}))})}return scans});
 }
 await step('no_uncaught_page_errors',async()=>{assert(s.errors.length===0,s.errors.join('\n'));return {errors:s.errors,responses:s.badResponses}});
 await context.close();
}
async function callbackCases(label,base){
 const s={label:`${label}-callback-cases`,base,steps:[]};report.scenarios.push(s);
 for(const testCase of ['input_without_focus','network_failure_then_retry','concurrent_queries_slow_index']){
  const c=await browser.newContext(options),p=await c.newPage();p.setDefaultTimeout(6000);
  const entry={name:testCase};let start=Date.now();
  try{
   if(testCase==='network_failure_then_retry')await p.route('**/search-index.js*',r=>r.abort('failed'));
   if(testCase==='concurrent_queries_slow_index')await p.route('**/search-index.js*',async r=>{await new Promise(a=>setTimeout(a,450));await r.continue()});
   await p.goto(base,{waitUntil:'load'});
   // Input events without focus model autofill/IME restoration, not an ordinary tap.
   await p.locator('#q').evaluate(q=>{q.value='国补';q.dispatchEvent(new Event('input',{bubbles:true}))});
   if(testCase==='network_failure_then_retry'){
    await p.waitForFunction(()=>/失败|无法|重试/.test(document.querySelector('#results').textContent),{},{timeout:3500});
    entry.failureMessage=await p.locator('#results').textContent();await p.unroute('**/search-index.js*');await p.locator('#q').fill('价保');
   }
   if(testCase==='concurrent_queries_slow_index'){await p.waitForTimeout(160);await p.locator('#q').fill('智能眼镜');}
   await p.waitForFunction(()=>/条命中/.test(document.querySelector('#searchcount').textContent),{},{timeout:3500});
   entry.status='pass';entry.count=await p.locator('#searchcount').textContent();entry.markers=await p.locator('#results .res-i').count();
  }catch(e){entry.status='fail';entry.error=String(e);entry.visibleState=await p.locator('#searchcount').textContent().catch(()=>null);entry.indexLoaded=await p.evaluate(()=>window.D11_IDX?.length||0).catch(()=>null)}
  entry.ms=Date.now()-start;s.steps.push(entry);await c.close();
 }
}
try{
 await scenario('main','http://127.0.0.1:4173/');
 await scenario('fixed','http://127.0.0.1:4174/');
 await callbackCases('main','http://127.0.0.1:4173/');
 await callbackCases('fixed','http://127.0.0.1:4174/');
 await scenario('public',process.env.LIVE_BASE,false);
}finally{
 await browser.close();
 await fs.writeFile(path.join(out,`${engine}-report.json`),JSON.stringify(report,null,2));
 for(const s of report.scenarios)for(const t of s.steps)console.log(s.label,t.name,t.status,t.error||JSON.stringify(t.details||t.count||''));
 const fixedFailures=report.scenarios.filter(s=>s.label.startsWith('fixed')).flatMap(s=>s.steps.filter(t=>t.status==='fail'));
 if(fixedFailures.length)process.exitCode=1;
}
