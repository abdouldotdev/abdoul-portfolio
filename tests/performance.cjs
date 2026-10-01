const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 try{
  const page=await browser.newPage({viewport:{width:1000,height:1100},locale:'fr-FR'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>{
   window.perfCheck={walks:0,resized:new Set()};
   const walk=document.createTreeWalker.bind(document);document.createTreeWalker=(...args)=>{perfCheck.walks++;return walk(...args)};
   const Original=ResizeObserver;window.ResizeObserver=class extends Original{observe(el,...args){perfCheck.resized.add(el);return super.observe(el,...args)}unobserve(el){perfCheck.resized.delete(el);return super.unobserve(el)}};
  });
  const cdp=await page.context().newCDPSession(page);await cdp.send('Performance.enable');
  await page.goto(pathToFileURL(path.resolve(__dirname,'../index.html')).href);
  await page.waitForTimeout(2000);
  const start=await page.evaluate(()=>perfCheck.walks);
  await page.waitForTimeout(700);
  assert.equal(await page.evaluate(()=>perfCheck.walks),start,'No repeated translation scans at rest');
  const mutations=await page.evaluate(()=>{const ob=new MutationObserver(()=>{});ob.observe(screenEl,{subtree:true,attributes:true,childList:true});UIComponents.mount();const count=ob.takeRecords().length;ob.disconnect();return count});
  assert.equal(mutations,0,'Mounting components twice must not mutate the DOM');
  assert.equal(await page.locator('.home-dock .dock-icon.glass-surface').count(),0);
  await page.screenshot({path:'/tmp/optimized-home.png'});
  for(const query of ['faith','glowe','cutiz','']){
   await page.evaluate(()=>openSpotlight());await page.locator('#searchInput').fill(query);await page.waitForTimeout(150);
   assert.equal(await page.evaluate(()=>[...perfCheck.resized].filter(el=>!el.isConnected).length),0,'Detached search results must be unobserved');
  }
  await page.evaluate(()=>{closeSpotlight();openSettings()});await page.waitForTimeout(600);
  const margins=await page.locator('.settings-row .ui-select-control').evaluateAll(nodes=>nodes.map(el=>{const row=el.closest('.settings-row').getBoundingClientRect(),control=el.getBoundingClientRect();return [control.top-row.top,row.bottom-control.bottom]}));
  assert(margins.every(pair=>pair.every(space=>space>=11)),'Dropdown chips keep space above and below');
  const off=await page.locator('#themeToggle').getAttribute('aria-checked');await page.locator('#themeToggle').click();assert.notEqual(await page.locator('#themeToggle').getAttribute('aria-checked'),off);
  const switchSize=await page.locator('#themeToggle').evaluate(el=>[el.offsetWidth,el.offsetHeight,el.querySelector('i').offsetWidth]);assert.deepEqual(switchSize,[51,44,27]);
  await page.screenshot({path:'/tmp/optimized-settings.png'});
  assert.equal(await page.evaluate(()=>performance.getEntriesByType('resource').some(e=>e.name.endsWith('/sf-pro.ttf'))),false,'macOS uses its installed system font');
  assert.deepEqual(errors,[]);
  const metrics=(await cdp.send('Performance.getMetrics')).metrics.filter(m=>['ScriptDuration','LayoutCount','RecalcStyleCount','TaskDuration'].includes(m.name));
  console.log(JSON.stringify({checks:'idle stability, idempotent mount, resize cleanup, font loading, dock, switch and dropdown spacing OK',metrics}));
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
