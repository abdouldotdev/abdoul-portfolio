// All PostHog requests are intercepted; no production events or recordings are sent.
const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
const {chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'chrome'});
 try{
  const page=await browser.newPage();let requests=0;
  await page.route('**/*posthog.com/**',async route=>{
   requests++;
   if(!route.request().url().endsWith('/static/array.js'))throw new Error('Unexpected network request');
   await route.fulfill({contentType:'application/javascript',body:`const pending=window.posthog._i;window.analyticsEvents=[];window.posthog={init(token,options){window.analyticsOptions=options;window.analyticsToken=token;options.loaded(this)},register(){},startSessionRecording(options){window.recordingOptions=options},capture(event,properties){window.analyticsEvents.push(window.analyticsOptions.before_send({event,properties}))}};for(const args of pending)posthog.init(...args);`});
  });
  const url=pathToFileURL(path.resolve(__dirname,'../index.html')).href;
  await page.goto(url,{waitUntil:'domcontentloaded'});
  assert.equal(requests,0,'Local and automated browsing is excluded by default');
  await page.goto(url+'?analytics=debug',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>window.analyticsEvents?.length);
  assert.equal(requests,1);
  assert.equal(await page.evaluate(()=>analyticsOptions.session_recording.maskAllInputs),true);
  assert.match(await page.evaluate(()=>analyticsOptions.session_recording.blockSelector),/#contactDraft/);
  assert.deepEqual(await page.evaluate(()=>recordingOptions),{sampling:true,linked_flag:true});
  await page.evaluate(()=>openPage('apps','client'));
  await page.waitForFunction(()=>analyticsEvents.some(e=>e.event==='$pageview'&&e.properties.view==='apps'));
  await page.evaluate(()=>{openSpotlight();searchInput.value='sensitive@example.com';searchInput.dispatchEvent(new Event('input',{bubbles:true}))});
  await page.waitForFunction(()=>analyticsEvents.some(e=>e.event==='search_performed'));
  await page.evaluate(()=>{openContact();document.querySelector('[data-contact-channel="linkedin"]').click();contactReason.value='project';contactReason.dispatchEvent(new Event('change',{bubbles:true}));contactBrief.value='PRIVATE CLIENT PROJECT';contactBrief.dispatchEvent(new Event('input',{bubbles:true}));contactBrief.dispatchEvent(new FocusEvent('focusout',{bubbles:true}));contactForm.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));});
  await page.evaluate(()=>setLanguage(document.documentElement.lang==='en'?'fr':'en'));
  await page.waitForFunction(()=>analyticsEvents.some(e=>e.event==='setting_changed'));
  const events=await page.evaluate(()=>analyticsEvents);
  assert(events.some(e=>e.event==='contact_handoff_requested'&&e.properties.reason==='project'));
  assert(events.some(e=>e.event==='contact_field_completed'&&e.properties.length===22));
  assert(!JSON.stringify(events).includes('PRIVATE CLIENT'));
  assert(!JSON.stringify(events).includes('sensitive@example'));
  const cleaned=await page.evaluate(()=>analyticsOptions.before_send({event:'test',properties:{$current_url:'https://abdoul.dev/?email=secret#private',$set_once:{$initial_referrer:'https://example.com/?secret=1'}}}));
  assert.equal(cleaned.properties.$current_url,'https://abdoul.dev/');
  assert.equal(cleaned.properties.$set_once.$initial_referrer,'https://example.com/');
  await page.addInitScript(()=>Object.defineProperty(navigator,'doNotTrack',{value:'1'}));
  await page.reload({waitUntil:'domcontentloaded'});
  assert.equal(requests,1,'DNT prevents SDK loading even in debug');
  console.log('Analytics: privacy, replay config, navigation, contact, search, DNT and local exclusion OK; zero telemetry sent.');
 }finally{await browser.close()}
})().catch(error=>{console.error(error);process.exitCode=1});
