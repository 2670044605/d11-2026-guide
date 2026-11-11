import fs from 'node:fs/promises';import {chromium,devices} from 'playwright';import AxeBuilder from '@axe-core/playwright';
await fs.mkdir('design-evidence',{recursive:true});const browser=await chromium.launch();const results=[];let fatal=0;
const require=(c,m)=>{if(!c)throw Error(m)};
for(const code of ['b']){
 const result={code,desktop:{},phone:{},errors:[]};results.push(result);
 for(const mode of ['desktop','phone']){
  const context=await browser.newContext(mode==='desktop'?{viewport:{width:1440,height:1000},deviceScaleFactor:1,locale:'zh-CN',colorScheme:'light'}:{...devices['iPhone 13'],viewport:{width:390,height:844},deviceScaleFactor:2,locale:'zh-CN',colorScheme:'light'});const page=await context.newPage();page.setDefaultTimeout(6000);page.on('pageerror',e=>result.errors.push(String(e)));
  try{
   await page.goto(`http://127.0.0.1:4180/${code}.html`,{waitUntil:'networkidle'});await page.locator('.hero-art img').evaluate(i=>i.decode());await page.screenshot({path:`design-evidence/${mode}-${code}.jpg`,type:'jpeg',quality:90});
   const layout=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,h1:document.querySelector('h1').textContent,loaded:[...document.images].every(i=>i.complete&&i.naturalWidth>0)}));result[mode].layout=layout;require(layout.scrollWidth<=layout.width+1,'horizontal overflow');require(layout.loaded,'image not loaded');
   const ax=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();result[mode].a11y=ax.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}));
   if(mode==='phone'){
    result.phone.widths=[];for(const w of [360,390,412]){await page.setViewportSize({width:w,height:844});const info=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));result.phone.widths.push(info);require(info.scroll<=info.width+1,'phone overflow at '+w)}await page.setViewportSize({width:390,height:844});
    await page.locator('.mobile-menu').tap();require(await page.locator('.mobile-menu').getAttribute('aria-expanded')==='true','menu not open');await page.locator('.mobile-links a').first().tap();require(await page.locator('.mobile-links').evaluate(x=>x.hidden),'menu not closed');
   }
   await page.locator('.search-open').first().click();await page.locator('.search-line input').fill('手机');await page.locator('.search-results a').first().click();require(await page.locator('.search-layer').evaluate(e=>e.hidden),'search not closed');
   await page.locator('#sources summary').click();require(await page.locator('#sources details').evaluate(e=>e.open),'source not expanded');
   await page.locator('#reading').scrollIntoViewIfNeeded();await page.screenshot({path:`design-evidence/${mode}-${code}-reading.jpg`,type:'jpeg',quality:88});
   if(code==='a'||code==='c'){
    await page.locator('[data-filter="cn"]').click();require(await page.locator('[data-region]:visible').count()===1,'filter broken');await page.locator('[data-filter="all"]').click();
   }
   result[mode].interaction='pass';
  }catch(e){result[mode].failure=String(e);fatal++}
  await context.close();
 }
}
await browser.close();await fs.writeFile('design-evidence/results.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));if(fatal)process.exitCode=1;
