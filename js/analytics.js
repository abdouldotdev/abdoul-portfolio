// PostHog is optional: loading failures never block the portfolio.
(() => {
 'use strict';
 const config=window.analyticsConfig;
 const debug=new URLSearchParams(location.search).get('analytics')==='debug';
 const local=location.protocol==='file:'||/^(localhost|127\.|0\.0\.0\.0|\[::1\])/.test(location.hostname)||/\.(local|test)$/.test(location.hostname);
 const dnt=String(navigator.doNotTrack||window.doNotTrack)==='1'||navigator.globalPrivacyControl===true;
 if(!config?.enabled||dnt||(!debug&&(local||navigator.webdriver)))return;
 let sdk=null,queue=[],currentView='',viewStarted=performance.now(),searchTimer,lastSearch='',errorCount=0;
 const root=document.documentElement;
 const $=selector=>document.querySelector(selector);
 const surfaceSelector='.ios-page,.store-page,.developer-page,.sheet-layer,.store-sheet-layer,#spotlight,#screenshotViewer';
 const railSelector='.app-section-rail,.search-rail,.store-rail,.store-facts,.developer-pages,.device-sheet-rail';
 const opened=new Set(),scrollSeen=new WeakMap();
 const cleanURL=value=>{try{const u=new URL(value,location.href);return /^https?:$/.test(u.protocol)?u.origin+u.pathname:u.protocol}catch{return ''}};
 function properties(){return {app:'abdoul-portfolio',analytics_version:1,view:currentView||'home',language:root.lang,theme:root.dataset.theme,environment:debug?'debug':'production'}}
 function track(event,props={}){
  const payload={...properties(),...props};
  if(sdk){try{sdk.capture(event,payload)}catch{}}else if(queue.length<200)queue.push([event,payload]);
 }
 // Strip URL queries/referral parameters before sending any SDK event.
 function scrub(event){
  if(!event)return event;
  const sanitize=object=>{
   if(!object||typeof object!=='object')return;
   for(const key of Object.keys(object)){
    if(/^(\$?(initial_)?(current_url|referrer|referring_domain)|href|attr__href)$/i.test(key)&&typeof object[key]==='string')object[key]=cleanURL(object[key]);
    else if(/^(\$?utm_|\$?(initial_)?(gclid|fbclid|msclkid)|\$search_engine|\$initial_search_keyword)/.test(key))delete object[key];
   }
  };
  sanitize(event.properties);sanitize(event.properties?.$set);sanitize(event.properties?.$set_once);
  return event;
 }
 const options={
  api_host:config.apiHost,defaults:config.defaults,person_profiles:'identified_only',
  capture_pageview:false,capture_pageleave:false,respect_dnt:true,
  autocapture:{dom_event_allowlist:['click','submit','change'],mask_all_text:true,mask_all_element_attributes:true,css_selector_ignorelist:['.ph-no-autocapture','[data-ph-no-autocapture]','input','textarea','select','[contenteditable]','#contactForm']},
  rageclick:true,capture_dead_clicks:true,capture_heatmaps:true,
  capture_performance:{web_vitals:true},capture_exceptions:false,
  disable_session_recording:false,enable_recording_console_log:false,
  session_recording:{maskAllInputs:true,maskTextSelector:'input,textarea,select,[contenteditable],#contactForm',blockSelector:'.ph-no-capture,[data-ph-no-capture],#contactBrief,#contactDraft',recordCrossOriginIframes:false,recordCanvas:false,recordHeaders:false,recordBody:false},
  before_send:scrub,
  loaded(instance){
   sdk=instance;
   try{instance.register({app:'abdoul-portfolio',analytics_version:1,environment:debug?'debug':'production'});instance.startSessionRecording({sampling:true,linked_flag:true})}catch{}
   for(const [event,props] of queue)try{instance.capture(event,props)}catch{}
   queue=[];
  }
 };
 // Official snippet bootstrap: array.js consumes the pre-existing _i init queue.
 // Our own bounded event queue is flushed by the SDK's loaded callback above.
 if(!window.posthog?.__loaded&&!window.posthog?.__SV){
  const stub=window.posthog=window.posthog||[];stub._i=[];stub.__SV=1;stub.people=stub.people||[];
  for(const method of ['capture','register','startSessionRecording','stopSessionRecording','opt_in_capturing','opt_out_capturing'])stub[method]=function(){stub.push([method,...arguments])};
  stub.init=(token,settings,name)=>stub._i.push([token,settings,name]);
  const script=document.createElement('script');script.async=true;script.crossOrigin='anonymous';
  script.src=config.apiHost.replace('.i.posthog.com','-assets.i.posthog.com')+'/static/array.js';
  script.onerror=()=>{queue=[]};document.head.append(script);
 }
 try{window.posthog.init(config.token,options)}catch{queue=[]}

 function activeView(){return $('#developerStore.active')?'developer':$('#faithStore.active')?'faithlock':$('.ios-page.active')?.id.replace(/Page$/,'')||'home'}
 function endView(){const seconds=Math.round((performance.now()-viewStarted)/1000);if(seconds>0)track('view_engagement',{duration_seconds:seconds});viewStarted=performance.now()}
 function syncViews(){
  const next=activeView();
  if(next!==currentView){if(currentView)endView();const previous=currentView;currentView=next;viewStarted=performance.now();track('$pageview',{$current_url:cleanURL(location.href)+'#'+next,$pathname:'/'+next,previous_view:previous||null})}
  document.querySelectorAll(surfaceSelector).forEach(el=>{
   const visible=el.classList.contains('open')||el.classList.contains('active');
   if(visible!==opened.has(el.id)){visible?opened.add(el.id):opened.delete(el.id);track(visible?'surface_opened':'surface_closed',{surface:el.id})}
  });
 }
 syncViews();
 // Only observe navigation containers, never the animated SVG/clock subtree.
 const observer=new MutationObserver(syncViews);
 document.querySelectorAll(surfaceSelector).forEach(el=>observer.observe(el,{attributes:true,attributeFilter:['class']}));
 let settings={language:root.lang,theme:root.dataset.theme};
 new MutationObserver(()=>{for(const [key,value] of Object.entries({language:root.lang,theme:root.dataset.theme})){if(value!==settings[key]){track('setting_changed',{setting:key,value,previous_value:settings[key]});settings[key]=value}}}).observe(root,{attributes:true,attributeFilter:['lang','data-theme']});
 function contactProperties(){return {channel:$('#contactSheet [aria-pressed="true"]')?.dataset.contactChannel||'',reason:$('#contactReason')?.value||'',brief_length:$('#contactBrief')?.value.length||0,message_length:$('#contactDraft')?.value.length||0}}
 function search(){
  clearTimeout(searchTimer);const input=$('#searchInput'),value=input?.value||'';
  if(value===lastSearch)return;
  lastSearch=value;
  track('search_performed',{query_length:value.length,result_count:document.querySelectorAll('#searchResults .search-result').length});
 }
 document.addEventListener('input',e=>{if(e.target.id==='searchInput'){clearTimeout(searchTimer);searchTimer=setTimeout(search,600)}});
 document.addEventListener('change',e=>{
  if(e.target.id==='contactReason')track('contact_reason_selected',contactProperties());
  else if(e.target.id==='textSizeSelect')track('setting_changed',{setting:'text_size',value:e.target.value});
 });
 document.addEventListener('focusout',e=>{if(['contactBrief','contactDraft'].includes(e.target.id))track('contact_field_completed',{field:e.target.id,length:e.target.value.length,filled:!!e.target.value.trim()})});
 document.addEventListener('invalid',e=>{if(e.target.closest('#contactForm'))track('contact_validation_failed',{field:e.target.id,...contactProperties()})},true);
 document.addEventListener('submit',e=>{if(e.target.id==='contactForm'&&e.target.checkValidity())track('contact_handoff_requested',contactProperties())},true);
 document.addEventListener('copy',e=>{if(e.target.closest?.('#contactForm'))track('contact_message_copy_requested',contactProperties())});
 const linkedIn=$('#contactLinkedIn');
 if(linkedIn)new MutationObserver(()=>{if(!linkedIn.hidden)track('contact_linkedin_ready',contactProperties())}).observe(linkedIn,{attributes:true,attributeFilter:['hidden']});
 document.addEventListener('click',e=>{
  const button=e.target.closest('button,a');if(!button)return;
  if(button.closest('#searchResults')){search();track('search_result_selected',{project:button.dataset.project||button.dataset.source||null,page:button.dataset.page||null,app_id:button.dataset.externalApp||null})}
  if(button.dataset.contactChannel)track('contact_channel_selected',{channel:button.dataset.contactChannel});
  if(button.dataset.project)track('project_selected',{project:button.dataset.project});
  if(button.dataset.source)track('open_source_selected',{project:button.dataset.source});
  if(button.hasAttribute('data-shot'))track('screenshot_opened',{index:Number(button.dataset.shot)});
  if(button.dataset.previewDevice)track('preview_device_selected',{device:button.dataset.previewDevice});
  if(button.hasAttribute('data-copy-link')||button.hasAttribute('data-native-share'))track('project_share_requested',{method:button.hasAttribute('data-copy-link')?'clipboard':'native'});
  if(button.id==='island')track('dynamic_island_used',{expanded:button.getAttribute('aria-expanded')==='true'});
  const url=button.getAttribute('href')||button.dataset.url;
  if(url&&!url.startsWith('#'))track('outbound_link_clicked',{destination:cleanURL(url),placement:button.closest('[id]')?.id||'',social:button.classList.contains('social-link')?button.getAttribute('aria-label'):null});
  if(button.dataset.externalApp||button.hasAttribute('data-faith-open'))track('app_store_open_requested',{app_id:button.dataset.externalApp||'faithlock'});
  if(e.target.closest('.island-project-cta'))track('project_outbound_requested',{project:'cutiz',placement:'dynamic_island'});
 });
 document.addEventListener('scroll',e=>{
  const el=e.target;if(!(el instanceof Element))return;
  const horizontal=el.matches(railSelector),range=horizontal?el.scrollWidth-el.clientWidth:el.scrollHeight-el.clientHeight;
  if(range<=0)return;
  const percent=Math.min(100,Math.round(100*(horizontal?el.scrollLeft:el.scrollTop)/range));
  let seen=scrollSeen.get(el);if(!seen){seen=new Set();scrollSeen.set(el,seen)}
  for(const milestone of [25,50,75,100])if(percent>=milestone&&!seen.has(milestone)){seen.add(milestone);track(horizontal?'carousel_progress':'scroll_depth',{surface:el.id||el.classList[0],milestone,collection:el.closest('[data-app-group]')?.dataset.appGroup||null})}
 },{capture:true,passive:true});
 addEventListener('error',e=>{if(errorCount++<10)track('runtime_error',{kind:e.error?.name||'resource_error',file:cleanURL(e.filename||e.target?.src||''),line:e.lineno||0,column:e.colno||0})},true);
 addEventListener('unhandledrejection',e=>{if(errorCount++<10)track('runtime_error',{kind:'unhandled_rejection',error_type:e.reason instanceof Error?e.reason.name:'unknown'})});
 document.addEventListener('visibilitychange',()=>{if(document.hidden){search();endView();track('page_visibility_changed',{visible:false})}else{viewStarted=performance.now();track('page_visibility_changed',{visible:true})}});
 addEventListener('pagehide',()=>{endView();track('$pageleave',{$current_url:cleanURL(location.href)+'#'+currentView})});
})();
