const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 try{
  const page=await browser.newPage({viewport:{width:1000,height:1100},locale:'fr-FR',reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(pathToFileURL(path.resolve(__dirname,'../index.html')).href);
  await page.evaluate(()=>{setLanguage('fr');openPage('apps')});
  assert.equal(await page.locator('[data-rail-step]').count(),0);
  assert.equal(await page.locator('.native-header:not(.ui-navigation-bar)').count(),0);
  const styles=await page.locator('.home-section-heading h2,#apps-my-title').evaluateAll(nodes=>nodes.map(el=>{const s=getComputedStyle(el);return [s.fontSize,s.fontWeight,s.lineHeight,s.letterSpacing]}));
  assert.deepEqual(styles[0],styles[1]);
  assert.equal(styles[0][0],'20px');
  assert.equal(await page.locator('#appsPage h1').evaluate(el=>getComputedStyle(el).fontSize),'34px');
  const back=await page.locator('#appsPage .native-back').boundingBox();assert.equal(Math.round(back.width),44);assert.equal(Math.round(back.height),44);
  assert.equal(await page.locator('#apps-my .app-section-card').first().evaluate(el=>getComputedStyle(el).boxShadow),'none');
  await page.screenshot({path:'/tmp/ios-apps-refined.png'});
  const rail=await page.locator('#apps-my .app-section-rail').boundingBox();
  await page.mouse.move(rail.x+230,rail.y+70);await page.mouse.down();await page.mouse.move(rail.x+35,rail.y+70,{steps:8});await page.mouse.up();
  assert(await page.locator('#apps-my .app-section-rail').evaluate(el=>el.scrollLeft)>100);
  await page.evaluate(()=>{openPage('about');document.querySelector('#aboutPage .page-body').scrollTop=160});
  await page.waitForFunction(()=>document.querySelector('#aboutPage .native-header').style.getPropertyValue('--collapse')==='1');
  const compact=await page.locator('#aboutPage .ui-nav-compact-title').evaluate(el=>({font:getComputedStyle(el).fontSize,opacity:getComputedStyle(el).opacity,center:el.getBoundingClientRect().y+el.getBoundingClientRect().height/2}));
  const button=await page.locator('#aboutPage .native-back').boundingBox();assert.equal(compact.font,'17px');assert.equal(compact.opacity,'1');assert(Math.abs(compact.center-button.y-button.height/2)<1);
  await page.evaluate(()=>{setTheme('dark');setLanguage('en');openPage('apps')});
  assert.deepEqual(await page.locator('#appPortfolioSections h2').allTextContents(),['My Apps','Client Apps']);
  assert(!(await page.locator('#appPortfolioSections').textContent()).includes('Voir'));
  assert(!(await page.locator('#apps-client').textContent()).includes('et crypto'));
  await page.screenshot({path:'/tmp/ios-apps-refined-dark.png'});
  await page.evaluate(()=>openProject('nanapay'));
  assert.equal(await page.locator('#projectPageHeader').textContent(),'NanaPay');
  assert.equal(await page.locator('#projectPage .native-header').getAttribute('data-large-title'),'false');
  assert.deepEqual(errors,[]);
  console.log('Shared navigation, matching headings, slide-only rails, card material, compact alignment and FR/EN: OK');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
