import fs from 'node:fs/promises';
import {chromium,webkit,devices} from 'playwright';
const engine=process.env.BROWSER_ENGINE||'webkit';
const browser=await({chromium,webkit}[engine]).launch({headless:true});
const device=engine==='webkit'?'iPhone 13':'Pixel 7';
const output={engine,version:browser.version(),device,scenarios:[]};
await fs.mkdir('qa-results',{recursive:true});
for(const history of ['clean-toggle','settings-then-toggle']){
 const context=await browser.newContext({...devices[device],locale:'zh-CN',colorScheme:'light',reducedMotion:'reduce'});
 const page=await context.newPage();const result={history,states:[]};output.scenarios.push(result);
 async function sample(name){
  const state=await page.evaluate(()=>({theme:document.documentElement.dataset.theme,ua:navigator.userAgent,styles:['html','body','.bt','.topbar','.entries','.entry','.grp'].map(selector=>{const el=document.querySelector(selector);if(!el)return{selector};const c=getComputedStyle(el);return{selector,fg:c.color,bg:c.backgroundColor,ink:c.getPropertyValue('--ink'),panel:c.getPropertyValue('--panel')}})}));
  result.states.push({name,...state});await page.screenshot({path:`qa-results/${engine}-${history}-${name}.png`});
 }
 try{
  await page.goto('http://127.0.0.1:4173/',{waitUntil:'load'});await sample('initial');
  if(history==='settings-then-toggle'){
   await page.locator('#toolsBtn').tap();await page.locator('[data-pref="font"] [data-val="l"]').tap();await page.locator('[data-pref="density"] [data-val="relaxed"]').tap();await page.locator('#toolsClose').tap();await page.reload({waitUntil:'load'});
   await page.locator('#toolsBtn').tap();await page.locator('[data-pref="font"] [data-val="m"]').tap();await page.locator('[data-pref="density"] [data-val="normal"]').tap();await page.locator('#toolsClose').tap();
  }
  await page.locator('#themeBtn').tap();await page.waitForTimeout(500);await sample('dark-500ms');await page.waitForTimeout(1500);await sample('dark-2000ms');
  await page.reload({waitUntil:'load'});await page.waitForTimeout(250);await sample('dark-reload');
  await page.locator('#themeBtn').tap();await page.waitForTimeout(500);await sample('light-return');
 }catch(e){result.error=String(e)}
 await context.close();
}
await browser.close();await fs.writeFile(`qa-results/${engine}-theme-probe.json`,JSON.stringify(output,null,2));
for(const s of output.scenarios)for(const state of s.states)console.log(engine,s.history,state.name,JSON.stringify(state.styles.filter(x=>x.selector==='body'||x.selector==='.bt'||x.selector==='.entries')));
