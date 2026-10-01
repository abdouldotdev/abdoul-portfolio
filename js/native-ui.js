// Shared navigation, gestures and accessibility for the simulated phone and real devices.
window.NativeUI = (() => {
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const origins=new WeakMap(),animations=new WeakMap();
 let launch=null,scope=null,returnFocus=null,gesture=null,syncFrame=0;
 const motion={duration:420,easing:'cubic-bezier(.2,.85,.2,1)'};
 const scale=()=>screenEl.getBoundingClientRect().width/screenEl.offsetWidth||1;
 const focusable=root=>[...root.querySelectorAll('button,a[href],input,textarea,select,[tabindex="0"]')].filter(el=>!el.disabled&&!el.closest('[inert]')&&el.getAttribute('aria-hidden')!=='true'&&el.getClientRects().length&&getComputedStyle(el).visibility!=='hidden');
 function cancel(el){const running=animations.get(el);if(running){running.cancel();animations.delete(el)}}
 function animate(el,frames,options={}){
  cancel(el);
  const a=el.animate(frames,{...motion,...options,duration:reduced.matches?0:(options.duration??motion.duration)});
  animations.set(el,a);a.finished.then(()=>{if(animations.get(el)===a)animations.delete(el)}).catch(()=>{});
  return a;
 }
 document.addEventListener('click',e=>{
  const button=e.target.closest('[data-page],[data-project],[data-contact],[data-settings],[data-developer-open]');
  if(button)launch=button;
 },true);
 function originTransform(el,origin){
  const target=el.getBoundingClientRect(),from=(origin.querySelector('.app-icon,.row-icon')||origin).getBoundingClientRect(),s=scale();
  return `translate(${(from.left-target.left)/s}px,${(from.top-target.top)/s}px) scale(${Math.max(.06,from.width/target.width)},${Math.max(.06,from.height/target.height)})`;
 }
 function enter(el){
  if(!el)return;
  const origin=launch;launch=null;
  if(origin)origins.set(el,origin);
  el.classList.remove('is-closing');
  const morph=origin&&(el.matches('.ios-page,.store-page')||origin.hasAttribute('data-project'));
  const from=morph?originTransform(el,origin):el.matches('.sheet-card,.store-sheet-card')?'translateY(105%)':'translateX(100%)';
  el.style.transformOrigin='0 0';
  animate(el,[{transform:from,opacity:morph?.2:1,borderRadius:morph?'30px':getComputedStyle(el).borderRadius},{transform:'none',opacity:1,borderRadius:getComputedStyle(el).borderRadius}]);
  if(el.matches('.ios-page,.store-page')){
   const heading=el.querySelector('h1,h2');if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true})}
  }
 }
 function exit(el){
  if(!el||el.dataset.gestureDismiss==='true'){if(el)delete el.dataset.gestureDismiss;return}
  const origin=origins.get(el),from=getComputedStyle(el).transform;
  const to=origin&&origin.getClientRects().length?originTransform(el,origin):el.matches('.sheet-card,.store-sheet-card')?'translateY(105%)':'translateX(100%)';
  el.classList.add('is-closing');
  animate(el,[{transform:from,opacity:1},{transform:to,opacity:origin?0:1}],{duration:300}).finished.then(()=>{
   el.classList.remove('is-closing');
   if(origin&&!origin.closest('[inert]'))origin.focus({preventScroll:true});
  }).catch(()=>el.classList.remove('is-closing'));
 }
 function topModal(){return screenshotViewer.classList.contains('open')?screenshotViewer:activeStoreSheet||activeSheet||(spotlight.classList.contains('open')?spotlight:null)}
 function sync(){
  syncFrame=0;const modal=topModal();
  for(const el of screenEl.children){
   const isLayer=el.matches('.ios-page,.store-page,.sheet-layer,.store-sheet-layer,.spotlight,.screenshot-viewer,.home,.island,.store-tabs');
   if(!isLayer)continue;
   const visible=el.matches('.home')?!activePage&&!activeStorePage:el.matches('.island')?true:el.classList.contains('active')||el.classList.contains('open');
   const inert=!visible||!!(modal&&el!==modal);if(el.inert!==inert)el.inert=inert;
  }
  if(modal!==scope){
   const previous=scope;scope=modal;
   if(modal){returnFocus=document.activeElement;if(!modal.contains(document.activeElement))(focusable(modal)[0]||modal).focus({preventScroll:true})}
   else if(previous&&returnFocus?.isConnected&&!returnFocus.closest('[inert]'))returnFocus.focus({preventScroll:true});
  }
  document.querySelectorAll('.sheet-layer,.store-sheet-layer,.screenshot-viewer,.spotlight').forEach(layer=>{
   const dialog=layer.querySelector('.sheet-card,.store-sheet-card,.spotlight-inner')||layer;
   if(dialog.getAttribute('role')!=='dialog')dialog.setAttribute('role','dialog');
   if(dialog.getAttribute('aria-modal')!=='true')dialog.setAttribute('aria-modal','true');
   const title=dialog.querySelector('h2');
   if(!title){const label=layer.getAttribute('aria-label')||(locale==='fr'?'Fenêtre':'Dialog');if(dialog.getAttribute('aria-label')!==label)dialog.setAttribute('aria-label',label)}
   if(title){if(!title.id)title.id=`${layer.id}-title`;if(dialog.getAttribute('aria-labelledby')!==title.id)dialog.setAttribute('aria-labelledby',title.id)}
  });
 }
 function scheduleSync(){if(!syncFrame)syncFrame=requestAnimationFrame(sync)}
 new MutationObserver(records=>{if(records.some(record=>record.target.matches('.ios-page,.store-page,.sheet-layer,.store-sheet-layer,.spotlight,.screenshot-viewer')))scheduleSync()}).observe(screenEl,{subtree:true,attributes:true,attributeFilter:['class']});
 document.addEventListener('keydown',e=>{
  if(e.key==='Tab'&&scope){
   const items=focusable(scope);if(!items.length)return;
   const first=items[0],last=items.at(-1);
   if(e.shiftKey&&(document.activeElement===first||!scope.contains(document.activeElement))){e.preventDefault();last.focus()}
   else if(!e.shiftKey&&(document.activeElement===last||!scope.contains(document.activeElement))){e.preventDefault();first.focus()}
  }
 });

 // One visible title: its size and position collapse with the scroll container.
 document.querySelectorAll('.ios-page').forEach(page=>{
  const body=page.querySelector('.apps-page-body,.page-body'),header=page.querySelector('.native-header');
  if(!body||!header||header.dataset.largeTitle==='false')return;
  header.classList.add('collapsing-header');
  let frame=0;
  const update=()=>{frame=0;const p=Math.min(1,body.scrollTop/64);if(header.style.getPropertyValue('--collapse')!==String(p))header.style.setProperty('--collapse',p);if(page.classList.contains('content-scrolled')!==(p>.5))page.classList.toggle('content-scrolled',p>.5)};
  body.addEventListener('scroll',()=>{if(!frame)frame=requestAnimationFrame(update)},{passive:true});update();
 });

 const edge=document.createElement('div');edge.className='edge-back-zone';edge.setAttribute('aria-hidden','true');screenEl.append(edge);
 function backTarget(){return topModal()?null:activeStorePage||activePage}
 function closeBack(){if(activeStorePage===developerStore)closeDeveloper();else if(activeStorePage)closeStoreFlow(true);else if(activePage?.id==='readerPage')openPage('resources');else closePages()}
 edge.addEventListener('pointerdown',e=>{
  const target=backTarget();if(!target||e.button>0)return;
  gesture={kind:'back',target,handle:edge,id:e.pointerId,x:e.clientX,y:e.clientY,last:e.clientX,time:e.timeStamp,velocity:0,delta:0,started:false};
  edge.setPointerCapture(e.pointerId);
 });
 document.querySelectorAll('.sheet-card,.store-sheet-card').forEach(card=>{
  card.style.touchAction='pan-y';
  const grabber=card.querySelector('.grabber');if(!grabber)return;
  grabber.setAttribute('role','button');grabber.tabIndex=0;grabber.setAttribute('aria-label',locale==='fr'?'Fermer la fenêtre':'Dismiss sheet');
  const dismiss=()=>card.closest('.store-sheet-layer')?closeStoreSheets():closeSheets();
  grabber.addEventListener('keydown',e=>{if(['Enter',' '].includes(e.key)){e.preventDefault();dismiss()}});
  grabber.addEventListener('pointerdown',e=>{
   if(e.button>0)return;
   const matrix=new DOMMatrixReadOnly(getComputedStyle(card).transform);cancel(card);
   gesture={kind:'sheet',target:card,handle:grabber,id:e.pointerId,x:e.clientX,y:e.clientY,last:e.clientY,time:e.timeStamp,velocity:0,delta:Math.max(0,matrix.m42),started:false,dismiss};
   grabber.setPointerCapture(e.pointerId);
  });
 });
 document.addEventListener('pointermove',e=>{
  const g=gesture;if(!g||g.id!==e.pointerId)return;
  const dx=e.clientX-g.x,dy=e.clientY-g.y,primary=g.kind==='back'?dx:dy;
  if(!g.started){
   if(g.kind==='back'&&Math.abs(dy)>Math.abs(dx)+8){gesture=null;return}
   if(Math.abs(primary)<3)return;
   g.started=true;cancel(g.target);g.target.style.transition='none';
   if(g.kind==='back'){
    screenEl.classList.add('back-gesture');
    const preview=activeStorePage===developerStore?faithStore:activeStorePage?storeReturnPage:null;
    if(preview){preview.classList.add('back-preview');g.preview=preview}
   }
  }
  e.preventDefault();
  const position=g.kind==='back'?e.clientX:e.clientY;
  g.velocity=(position-g.last)/Math.max(1,e.timeStamp-g.time);g.last=position;g.time=e.timeStamp;
  g.delta=Math.max(0,primary/scale());
  g.target.style.transform=g.kind==='back'?`translateX(${g.delta}px)`:`translateY(${g.delta}px)`;
 });
 function finishGesture(e){
  const g=gesture;if(!g||g.id!==e.pointerId)return;gesture=null;
  const velocity=e.timeStamp-g.time<100?g.velocity:0;
  const threshold=g.kind==='back'?screenEl.clientWidth*.32:Math.min(160,g.target.clientHeight*.25);
  const dismiss=e.type!=='pointercancel'&&g.started&&(g.delta>threshold||(g.delta>22&&velocity>.55));
  const end=g.kind==='back'?`translateX(${screenEl.clientWidth}px)`:`translateY(${g.target.clientHeight+30}px)`;
  const from=getComputedStyle(g.target).transform;
  const cleanup=()=>{g.target.style.transform='';g.target.style.transition='';g.preview?.classList.remove('back-preview');screenEl.classList.remove('back-gesture')};
  if(!g.started){cleanup();return}
  animate(g.target,[{transform:from},{transform:dismiss?end:'none'}],{duration:dismiss?180:280}).finished.then(()=>{
   if(dismiss){g.target.dataset.gestureDismiss='true';g.kind==='back'?closeBack():g.dismiss()}
   cleanup();
  }).catch(cleanup);
 }
 document.addEventListener('pointerup',finishGesture);document.addEventListener('pointercancel',finishGesture);

 // visualViewport drives the phone height; only scroll its inner container to reveal a field.
 function revealField(){
  const field=document.activeElement;if(!field?.matches('input,textarea,select'))return;
  const container=field.closest('.sheet-card,.store-sheet-card,.spotlight,.page-body');if(!container)return;
  const r=field.getBoundingClientRect(),c=container.getBoundingClientRect();
  const bottom=Math.min(c.bottom,(visualViewport?.height||innerHeight)+(visualViewport?.offsetTop||0))-16;
  if(r.bottom>bottom)container.scrollTop+=(r.bottom-bottom)/scale();
  else if(r.top<c.top+16)container.scrollTop-=(c.top+16-r.top)/scale();
 }
 document.addEventListener('focusin',()=>requestAnimationFrame(revealField));
 new ResizeObserver(()=>requestAnimationFrame(revealField)).observe(screenEl);
 visualViewport?.addEventListener('resize',()=>requestAnimationFrame(revealField),{passive:true});
 const sizeSelect=document.getElementById('textSizeSelect');
 function setTextSize(value){
  if(!['1','1.15','1.3'].includes(value))return;
  screenEl.style.setProperty('--text-scale',value);sizeSelect.value=value;
  screenEl.classList.toggle('large-text',value!=='1');
  try{localStorage.setItem('abdoul-portfolio-text-size',value)}catch{}
 }
 try{setTextSize(localStorage.getItem('abdoul-portfolio-text-size')||'1')}catch{setTextSize('1')}
 sizeSelect.addEventListener('change',()=>setTextSize(sizeSelect.value));
 reduced.addEventListener('change',()=>{if(reduced.matches)document.getAnimations().forEach(animation=>animation.cancel())});
 sync();return {enter,exit};
})();
