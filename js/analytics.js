// PostHog is optional: loading failures never block the portfolio.
(() => {
 'use strict';
 const config=window.analyticsConfig;
 const debug=new URLSearchParams(location.search).get('analytics')==='debug';
 const local=location.protocol==='file:'||/^(localhost|127\.|0\.0\.0\.0|\[::1\])/.test(location.hostname)||/\.(local|test)$/.test(location.hostname);
 const dnt=String(navigator.doNotTrack||window.doNotTrack)==='1'||navigator.globalPrivacyControl===true;
 if(!config?.enabled||dnt||(!debug&&(local||navigator.webdriver)))return;
 let sdk=null,queue=[],currentView='',searchTimer,lastSearch='';
 const root=document.documentElement;
 const $=selector=>document.querySelector(selector);
 const sectionNames={home:'Accueil',apps:'Projets',about:'À propos',resources:'Ressources',reader:'Document',lab:'Cutiz',project:'Projet',source:'Open source',faithlock:'FaithLock',developer:'Appbiz Studio'};
 const groupNames={all:'Projets',my:'Mes projets',client:'Projets clients','open-source':'Open source'};
 const overlayNames={contactSheet:'Contact',settingsSheet:'Réglages',projectSheet:'Projet',spotlight:'Recherche',screenshotViewer:'Capture',shareSheet:'Partage',deviceSheet:'Appareils',purchasesSheet:'Achats intégrés',privacySheet:'Confidentialité'};
 const overlayKeys={contactSheet:'contact',settingsSheet:'settings',spotlight:'search'};
 const cleanURL=value=>{try{const u=new URL(value,location.href);return /^https?:$/.test(u.protocol)?u.origin+u.pathname:u.protocol}catch{return ''}};
 function activeView(){
  if($('#developerStore.active'))return {key:'developer',name:'Appbiz Studio'};
  if($('#faithStore.active'))return {key:'faithlock',name:'FaithLock'};
  const page=$('.ios-page.active');if(!page)return {key:'home',name:'Accueil'};
  const view=page.id.replace(/Page$/,'');
  if(view==='apps'){const group=page.dataset.activeGroup||'all';return {key:group==='all'?'apps':`apps:${group}`,name:groupNames[group]||'Projets'}}
  if(view==='project')return {key:`project:${activeProjectKey||'unknown'}`,name:$('#projectPageTitle')?.textContent?.trim()||'Projet'};
  if(view==='source')return {key:`source:${activeSourceId||'unknown'}`,name:$('#sourceTitle')?.textContent?.trim()||'Open source'};
  if(view==='reader')return {key:'reader',name:$('#readerTitle')?.textContent?.trim()||'Document'};
  return {key:view,name:sectionNames[view]||view};
 }
 function sectionURL(key){
  const names={home:'accueil',apps:'projets','apps:my':'mes-projets','apps:client':'projets-clients','apps:open-source':'open-source',about:'a-propos',resources:'ressources',reader:'document',lab:'cutiz',faithlock:'faithlock',developer:'appbiz-studio',contact:'contact',settings:'reglages',search:'recherche'};
  const slug=names[key]||(key.startsWith('project:')?`projet-${key.slice(8)}`:key.startsWith('source:')?`open-source-${key.slice(7)}`:key);
  return `${cleanURL(location.href)}#section=${encodeURIComponent(slug)}`;
 }
 function properties(){
  const view=activeView(),overlay=Object.keys(overlayNames).find(id=>document.getElementById(id)?.classList.contains('open'));
  const section=overlay?overlayNames[overlay]:view.name,key=overlayKeys[overlay]||view.key;
  return {app:'abdoul-portfolio',analytics_version:2,section,section_key:key,language:root.lang,environment:debug?'debug':'production',$title:`${section} — Abdoul`,$current_url:sectionURL(key)};
 }
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
    if(/^(\$?(initial_)?(current_url|referrer|referring_domain)|href|attr__href)$/i.test(key)&&typeof object[key]==='string')object[key]=key==='$current_url'&&object.section_key&&object[key]===sectionURL(object.section_key)?sectionURL(object.section_key):cleanURL(object[key]);
    else if(/^(\$?utm_|\$?(initial_)?(gclid|fbclid|msclkid)|\$search_engine|\$initial_search_keyword)/.test(key))delete object[key];
   }
  };
  sanitize(event.properties);sanitize(event.properties?.$set);sanitize(event.properties?.$set_once);
  return event;
 }
 const options={
  api_host:config.apiHost,defaults:config.defaults,person_profiles:'always',
  capture_pageview:false,capture_pageleave:false,respect_dnt:true,
  autocapture:false,rageclick:false,capture_dead_clicks:false,capture_heatmaps:false,
  capture_performance:false,capture_exceptions:false,
  disable_session_recording:false,enable_recording_console_log:false,
  session_recording:{maskAllInputs:true,maskTextSelector:'input,textarea,select,[contenteditable],#contactForm',blockSelector:'.ph-no-capture,[data-ph-no-capture],#contactBrief,#contactDraft',recordCrossOriginIframes:false,recordCanvas:false,recordHeaders:false,recordBody:false},
  before_send:scrub,
  loaded(instance){
   sdk=instance;
   try{instance.register({app:'abdoul-portfolio',analytics_version:2,environment:debug?'debug':'production'});instance.startSessionRecording({sampling:true,linked_flag:true})}catch{}
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

 function syncViews(){
  const next=activeView();
  if(next.key===currentView)return;
  const previous=currentView;currentView=next.key;
  track('$pageview',{section:next.name,section_key:next.key,$title:`${next.name} — Abdoul`,$current_url:sectionURL(next.key),previous_section:previous||null});
 }
 syncViews();
 const observer=new MutationObserver(syncViews);
 document.querySelectorAll('.ios-page,.store-page').forEach(el=>observer.observe(el,{attributes:true,attributeFilter:['class','data-active-group']}));
 let settings={language:root.lang,theme:root.dataset.theme};
 new MutationObserver(()=>{for(const [key,value] of Object.entries({language:root.lang,theme:root.dataset.theme})){if(value!==settings[key]){track('Réglage modifié',{setting:key,value});settings[key]=value}}}).observe(root,{attributes:true,attributeFilter:['lang','data-theme']});
 function search(){
  clearTimeout(searchTimer);const input=$('#searchInput'),value=input?.value||'';
  if(!value||value===lastSearch)return;
  lastSearch=value;
  track('Recherche effectuée',{result_count:document.querySelectorAll('#searchResults .search-result').length});
 }
 document.addEventListener('input',e=>{if(e.target.id==='searchInput'){clearTimeout(searchTimer);searchTimer=setTimeout(search,600)}});
 document.addEventListener('change',e=>{
  if(e.target.id==='textSizeSelect')track('Réglage modifié',{setting:'text_size',value:e.target.value});
 });
 document.addEventListener('submit',e=>{if(e.target.id==='contactForm'&&e.target.checkValidity())track('Demande de contact',{channel:$('#contactSheet [aria-pressed="true"]')?.dataset.contactChannel||'',reason:$('#contactReason')?.value||''})},true);
 document.addEventListener('click',e=>{
  const button=e.target.closest('button,a');if(!button)return;
  if(button.closest('#searchResults')){search();track('Résultat sélectionné',{project:button.dataset.project||button.dataset.source||null,page:button.dataset.page||null})}
  if(button.dataset.contactChannel)track('Canal de contact choisi',{channel:button.dataset.contactChannel});
  if(button.dataset.project)track('Projet consulté',{project:button.dataset.project,project_name:projects[button.dataset.project]?.name||button.dataset.project});
  if(button.dataset.source)track('Projet open source consulté',{project:button.dataset.source,project_name:openSourceProjects.find(project=>project.id===button.dataset.source)?.name||button.dataset.source});
  if(button.hasAttribute('data-shot')||button.hasAttribute('data-project-shot'))track('Capture consultée',{index:Number(button.dataset.shot??button.dataset.projectShot)+1});
  if(button.hasAttribute('data-copy-link')||button.hasAttribute('data-native-share')||button.hasAttribute('data-share-portfolio'))track('Partage demandé',{method:button.hasAttribute('data-copy-link')?'clipboard':button.hasAttribute('data-native-share')?'native':'portfolio'});
  if(button.hasAttribute('data-contact'))track('Contact ouvert');
  if(button.hasAttribute('data-settings'))track('Réglages ouverts');
  if(button.id==='searchTrigger')track('Recherche ouverte');
  const url=button.getAttribute('href')||button.dataset.url;
  if(url&&!url.startsWith('#'))track('Lien externe ouvert',{destination:cleanURL(url),label:button.getAttribute('aria-label')||button.textContent.trim().slice(0,80)});
  if(button.dataset.externalApp||button.hasAttribute('data-faith-open'))track('App Store ouvert',{app_id:button.dataset.externalApp||'faithlock'});
  if(e.target.closest('.island-project-cta'))track('Site Cutiz ouvert');
 });
})();
