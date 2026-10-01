const assert=require('node:assert/strict');
const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg'};
const server=http.createServer((req,res)=>{
 const file=path.join(root,new URL(req.url,'http://localhost').pathname==='/'?'index.html':new URL(req.url,'http://localhost').pathname);
 fs.readFile(file,(error,data)=>{res.writeHead(error?404:200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});res.end(error?'Not found':data)});
});
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const browser=await chromium.launch({channel:'chrome',headless:true});
 try{
  const page=await browser.newPage({viewport:{width:1000,height:1100},locale:'fr-FR',reducedMotion:'reduce'}),errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto(`http://127.0.0.1:${server.address().port}`);
  await page.locator('.home .app[data-page="apps"][data-app-group="all"]').click();
  assert(await page.locator('#apps-my').isVisible());
  assert(await page.locator('#apps-client').isVisible());
  assert.equal(await page.locator('#apps-client .portfolio-app-row').count(),6);
  await page.evaluate(()=>goHome());
  await page.locator('.home-section-heading [data-page="apps"]').click();
  assert(await page.locator('#apps-my').isVisible());
  assert(await page.locator('#apps-client').isVisible());
  await page.locator('#apps-client .portfolio-app-row',{hasText:'Burkina Rapid'}).click();
  assert.equal(await page.locator('#projectPageTitle').textContent(),'Burkina Rapid');
  assert(await page.locator('#projectPageLink').isVisible());
  await page.evaluate(()=>setLanguage('en'));
  assert.equal(await page.locator('#projectPageTagline').textContent(),'Parcel delivery');
  assert.deepEqual(errors,[]);
  console.log('Navigation: home Apps and See all share both sections; client details and EN: OK');
 }finally{await browser.close();server.close()}
})().catch(error=>{console.error(error);server.close();process.exitCode=1});
