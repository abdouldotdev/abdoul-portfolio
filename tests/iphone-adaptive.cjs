// Browser emulation, not physical-device certification. Screenshots/report go to /tmp.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const http=require('node:http');
const {chromium,webkit,devices}=require('playwright');
const root=path.resolve(__dirname,'..'),output='/tmp/portfolio-iphone-audit';
fs.mkdirSync(output,{recursive:true});
const types={'.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.pdf':'application/pdf'};
const server=http.createServer((req,res)=>{const pathname=new URL(req.url,'http://localhost').pathname;const file=path.join(root,pathname==='/'?'index.html':pathname);fs.readFile(file,(error,data)=>{res.writeHead(error?404:200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});res.end(error?'Not found':data)})});
const models=process.env.MODELS?.split('|')||['iPhone SE','iPhone SE (3rd gen)','iPhone 13 Mini','iPhone 13','iPhone 15 Pro','iPhone 16 Pro','iPhone 15 Pro Max','iPhone 17 Pro Max','iPhone Air','iPhone SE (3rd gen) landscape','iPhone 13 landscape','iPhone 17 Pro Max landscape'];
const engine=process.env.ENGINE==='webkit'?'webkit':'chromium';
const report={engine,emulated:true,cases:[],errors:[]};
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const browser=await (engine==='webkit'?webkit:chromium).launch(engine==='chromium'?{channel:'chrome',headless:true}:{headless:true});
 try{
  for(const [index,model] of models.entries()){
   const context=await browser.newContext({...devices[model],locale:index%2?'en-US':'fr-FR',reducedMotion:'reduce'});
   const page=await context.newPage();page.setDefaultTimeout(12000);
   const entry={model,viewport:devices[model].viewport,language:index%2?'en':'fr',theme:index%2?'dark':'light',issues:[],views:[]};report.cases.push(entry);
   page.on('pageerror',e=>entry.issues.push('JS: '+e.message));
   const base=`http://127.0.0.1:${server.address().port}`;
   await page.route('https://jeli.abdoul.dev/portfolio-resources',async route=>route.fulfill({json:{version:1,resources:[{id:'guide-motion-design-publicitaire',type:'document',mimeType:'application/pdf',title:'Guide motion design publicitaire',description:'60 secondes qui vendent : style, copywriting, voix et effets sonores.',link:'https://jeli.abdoul.dev/portfolio-resources/files/guide-motion-design-claude.pdf',cover:'',pages:5}]}}));
   await page.route('https://jeli.abdoul.dev/portfolio-resources/files/**',route=>route.fulfill({path:path.join(root,'assets/resources/guide-motion-design-publicitaire.pdf'),contentType:'application/pdf'}));
   const screenshot=async name=>page.screenshot({path:path.join(output,`${engine}-${model.replaceAll(/[^a-zA-Z0-9]/g,'-')}-${name}.png`)});
   async function audit(name,selector){
    await page.waitForTimeout(100);
    const result=await page.locator(selector).evaluate(el=>{
     const r=el.getBoundingClientRect(),screen=document.getElementById('screen').getBoundingClientRect();
     return {width:el.clientWidth,scrollWidth:el.scrollWidth,height:el.clientHeight,scrollHeight:el.scrollHeight,left:r.left,right:r.right,top:r.top,bottom:r.bottom,screen:{left:screen.left,right:screen.right,top:screen.top,bottom:screen.bottom}};
    });
    entry.views.push({name,...result});
    if(result.scrollWidth>result.width+2)entry.issues.push(`${name}: horizontal overflow ${result.scrollWidth-result.width}px`);
    if(result.left<result.screen.left-2||result.right>result.screen.right+2)entry.issues.push(`${name}: exceeds screen horizontally`);
    if(result.top<result.screen.top-2||result.bottom>result.screen.bottom+2)entry.issues.push(`${name}: exceeds screen vertically`);
    if(result.height<44)entry.issues.push(`${name}: no usable content height`);
   }
   try{
    await page.goto(base,{waitUntil:'domcontentloaded'});
    await page.evaluate(theme=>setTheme(theme),entry.theme);
    await page.waitForTimeout(250);
    assert.equal(await page.locator('.statusbar').isVisible(),false);
    await audit('home','#homeView');
    assert.equal(await page.locator('#homeView').evaluate(el=>getComputedStyle(el).paddingTop),'18px');
    // Asymmetric notch/home-indicator insets must offset, not merely shrink, the screen.
    await page.evaluate(()=>{document.querySelector('.device-stage').style.padding='59px 0px 34px';fitDevice()});
    const insetScreen=await page.locator('#screen').boundingBox();
    assert(Math.abs(insetScreen.y-59)<1,'Screen must start below the top safe area');
    assert(Math.abs(insetScreen.y+insetScreen.height-(devices[model].viewport.height-34))<1,'Screen must clear the home indicator');
    await page.evaluate(()=>{document.querySelector('.device-stage').style.padding='';fitDevice()});
    // Emulate the viewport geometry of native pinch zoom without resizing the page layout.
    const beforeZoom=await page.locator('.phone-wrap').boundingBox();
    await page.evaluate(()=>{Object.defineProperty(visualViewport,'scale',{configurable:true,value:2});Object.defineProperty(visualViewport,'width',{configurable:true,value:innerWidth/2});fitDevice()});
    assert.deepEqual(await page.locator('.phone-wrap').boundingBox(),beforeZoom);
    await page.evaluate(()=>{delete visualViewport.scale;delete visualViewport.width;fitDevice()});
    if([0,1,7,9].includes(index))await screenshot('home');
    await page.locator('#homeView').evaluate(el=>el.scrollTop=el.scrollHeight);
    await page.locator('.home-dock [data-settings]').tap();
    await audit('settings','#settingsSheet .sheet-card');
    await page.locator('#languageSelect').selectOption(entry.language==='fr'?'en':'fr');
    await page.locator('#textSizeSelect').selectOption('1.3');
    await audit('settings-large','#settingsSheet .sheet-card');
    await page.locator('#settingsSheet [data-close-sheet]').tap();
    await page.evaluate(()=>openPage('apps'));
    await audit('apps-large','#appsPage .apps-page-body');
    const rail=page.locator('#apps-my .app-section-rail');
    await rail.evaluate(el=>el.scrollLeft=el.scrollWidth);
    assert(await rail.evaluate(el=>el.scrollLeft)>0);
    if([0,7,9].includes(index))await screenshot('apps-large');
    await page.evaluate(()=>{document.getElementById('textSizeSelect').value='1';document.getElementById('textSizeSelect').dispatchEvent(new Event('change'));openPage('about')});
    await audit('about','#aboutPage .page-body');
    await page.evaluate(()=>openSpotlight());
    await page.locator('#searchInput').fill('Cutiz');
    await audit('search','.spotlight');
    assert.equal(await page.locator('#searchInput').evaluate(el=>getComputedStyle(el).fontSize),'16px');
    await page.locator('#cancelSearch').tap();
    await page.evaluate(()=>openContact());
    await page.locator('[data-contact-channel="email"]').tap();await page.locator('#contactReason').selectOption('project');
    await page.locator('#contactBrief').fill('Une application de réservation pour mon équipe.');
    await audit('contact','#contactSheet .sheet-card');
    // Simulated software-keyboard footprint; actual Safari keyboard remains a physical-device check.
    await page.evaluate(()=>{Object.defineProperty(visualViewport,'height',{configurable:true,value:Math.max(220,innerHeight-300)});visualViewport.dispatchEvent(new Event('resize'));document.getElementById('contactBrief').focus()});
    await page.waitForTimeout(400);await audit('keyboard','#contactSheet .sheet-card');
    const field=await page.locator('#contactBrief').boundingBox(),screen=await page.locator('#screen').boundingBox();
    if(field.y<screen.y-2||field.y+field.height>screen.y+screen.height+2)entry.issues.push('Keyboard: active brief is clipped');
    if([0,7,9].includes(index))await screenshot('keyboard');
    await page.evaluate(()=>{delete visualViewport.height;visualViewport.dispatchEvent(new Event('resize'));closeSheets();openPage('resources')});
    await page.waitForSelector('.resource-card');await audit('resources','#resourcesPage .page-body');
    // PDF rendering on the smallest, largest and landscape classes in both engines.
    if([0,7,9].includes(index)){
     await page.locator('.resource-actions button').tap();
     await page.waitForSelector('.pdf-page[data-rendered="true"]',{timeout:30000});
     await audit('pdf','#pdfScroll');
     assert(await page.locator('#pdfDownload').isVisible());
     const save=page.waitForEvent('download');await page.locator('#pdfDownload').tap();await save;
     await screenshot('pdf');
    }
   }catch(error){entry.issues.push(error.message)}
   console.log(model,entry.issues.length?JSON.stringify(entry.issues):'OK');
   await context.close();
  }
 }finally{await browser.close();server.close();fs.writeFileSync(path.join(output,`${engine}-report.json`),JSON.stringify(report,null,2))}
 assert.equal(report.cases.reduce((sum,c)=>sum+c.issues.length,0),0,`See ${output}/${engine}-report.json`);
})().catch(error=>{console.error(error.message);server.close();process.exitCode=1});
