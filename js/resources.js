// Resources are loaded on demand; PDF.js is imported only when opening a document.
window.ResourceLibrary = (() => {
 const list=document.getElementById('resourceList'),status=document.getElementById('resourceStatus'),categoryNav=document.getElementById('resourceCategories');
 const retry=document.getElementById('resourceRetry'),scroll=document.getElementById('pdfScroll');
 const pages=document.getElementById('pdfPages'),pdfStatus=document.getElementById('pdfStatus');
 let download=document.getElementById('pdfDownload');
 const zoomButton=document.getElementById('pdfZoom'),shareButton=document.getElementById('pdfShare');
 const progress=document.getElementById('pdfProgress');
 let items=[],categories=[],activeCategory='',state='idle',loading=false,loaded=false,loadPromise=null,current=null,loadingTask=null,pdf=null;
 let generation=0,layoutPass=0,observer=null,zoom=1,blobURL='',pdfModule=null,renderQueue=Promise.resolve();
 const labels={
  fr:{loading:'Chargement des ressources…',empty:'De nouvelles ressources arrivent bientôt.',emptyCategory:'Aucune ressource dans cette catégorie pour le moment.',all:'Tout',categories:'Catégories',error:'Impossible de charger la collection.',saved:'Collection enregistrée',retry:'Actualiser',read:'Lire le guide',open:'Ouvrir la ressource',download:'Télécharger',share:'Partager',copied:'Lien copié',reader:'Lecture',pages:'pages',pdfLoading:'Ouverture du document…',pdfError:'Le document ne peut pas être affiché. Vous pouvez le télécharger ou réessayer.',zoom:'Agrandir le document',original:'Document original en français'},
  en:{loading:'Loading resources…',empty:'New resources are coming soon.',emptyCategory:'No resources in this category yet.',all:'All',categories:'Categories',error:'Unable to load the collection.',saved:'Saved collection',retry:'Refresh',read:'Read the guide',open:'Open resource',download:'Download',share:'Share',copied:'Link copied',reader:'Reader',pages:'pages',pdfLoading:'Opening document…',pdfError:'This document could not be displayed. You can download it or try again.',zoom:'Zoom document',original:'Original document in French'}
 };
 const copy=()=>labels[locale];
 function node(tag,className,text){const el=document.createElement(tag);if(className)el.className=className;if(text)el.textContent=text;return el}
 function safeURL(value){try{const url=new URL(value);return url.protocol==='https:'&&!url.username&&!url.password?url.href:''}catch{return ''}}
 function validate(data){
  if(data?.version!==1||!Array.isArray(data.resources))throw Error('Invalid resource collection');
  categories=Array.isArray(data.categories)?data.categories.filter(c=>c&&typeof c.id==='string'&&typeof c.name==='string'):[];
  return data.resources.filter(r=>r&&typeof r.id==='string'&&typeof r.title==='string'&&r.title.trim()&&safeURL(r.link)).map(r=>({...r,link:safeURL(r.link),download:safeURL(r.download),cover:safeURL(r.cover),description:typeof r.description==='string'?r.description:'',categoryIds:Array.isArray(r.categoryIds)?r.categoryIds.filter(id=>typeof id==='string'):[],pages:Number.isSafeInteger(r.pages)&&r.pages>0?r.pages:null}));
 }
 function titleFor(r){return resourceData.translations[r.id]?.[locale]?.title||r.title}
 function shareURL(r){return new URL(`resources/${encodeURIComponent(r.id)}`,resourceData.shareBase).href}
 function render(){
  list.replaceChildren();const c=copy();
  const visible=activeCategory?items.filter(r=>r.categoryIds.includes(activeCategory)):items;
  status.textContent=state==='loading'?c.loading:state==='error'?c.error:state==='saved'?c.saved:loaded&&!items.length?c.empty:activeCategory&&!visible.length?c.emptyCategory:'';
  retry.hidden=!['error','saved'].includes(state);retry.textContent=c.retry;
  categoryNav.replaceChildren();categoryNav.hidden=!categories.length;categoryNav.setAttribute('aria-label',c.categories);
  for(const category of [{id:'',name:c.all},...categories]){
   const button=node('button','resource-category',resourceData.categoryTranslations?.[category.id]?.[locale]||category.name);button.type='button';button.setAttribute('aria-pressed',String(activeCategory===category.id));button.addEventListener('click',()=>{activeCategory=category.id;render()});categoryNav.append(button);
  }
  for(const r of visible){
   const text={...r,...resourceData.translations[r.id]?.[locale]};
   const card=node('article','resource-card ui-content-card');
   const readCard=()=>r.mimeType==='application/pdf'?open(r):window.open(r.link,'_blank','noopener,noreferrer');
   card.addEventListener('click',event=>{if(!event.target.closest('button,a'))readCard()});
   if(r.cover){const image=node('img','resource-cover');image.src=r.cover;image.alt='';image.loading='lazy';image.decoding='async';image.addEventListener('error',()=>image.remove(),{once:true});card.append(image)}
   const body=node('div','resource-copy');
   body.append(node('h2','',text.title),node('p','resource-description',text.description));
   if(r.id==='guide-motion-design-publicitaire')body.append(node('p','resource-language',c.original));
   const actions=node('div','resource-actions');
   if(r.mimeType==='application/pdf'){
    const read=node('button','resource-action',c.read);read.type='button';read.addEventListener('click',()=>open(r));actions.append(read);
    const save=node('a','resource-action resource-download',c.download);configureDownload(save,r);actions.append(save);
   }else{const link=node('a','resource-action',c.open);link.href=r.link;link.target='_blank';link.rel='noopener noreferrer';actions.append(link)}
   body.append(actions);card.append(body);list.append(card);
  }
  UIComponents.mount();
 }
 function load(){
  if(loaded)return Promise.resolve();
  if(loadPromise)return loadPromise;
  loading=true;state='loading';render();
  loadPromise=(async()=>{
   try{
    const response=await fetch(resourceData.endpoint,{credentials:'omit',signal:AbortSignal.timeout(10000)});
    if(!response.ok)throw Error('Resource request failed');
    items=validate(await response.json());loaded=true;state='ready';
   }catch{
    items=validate({version:1,resources:resourceData.fallback,categories:resourceData.categories});state=items.length?'saved':'error';
   }finally{loading=false;loadPromise=null;render()}
  })();
  return loadPromise;
 }
 async function openShared(id){
  openPage('resources');
  await load();
  if(!document.getElementById('resourcesPage').classList.contains('active'))return;
  const resource=items.find(item=>item.id===id);
  if(resource&&resource.mimeType==='application/pdf')open(resource);
 }
 function configureDownload(link,r){
  link.href=r.download||r.link;link.download=r.id+'.pdf';
  link.addEventListener('click',async event=>{
   if(r.download&&!link.href.startsWith('blob:'))return;
   // Same-origin files and object URLs support the browser's native download.
   if(new URL(link.href,location.href).origin===location.origin||link.href.startsWith('blob:'))return;
   event.preventDefault();link.setAttribute('aria-busy','true');
   try{
    const response=await fetch(r.link,{credentials:'omit',signal:AbortSignal.timeout(20000)});if(!response.ok)throw Error('Download failed');
    const url=URL.createObjectURL(await response.blob()),a=node('a');a.href=url;a.download=r.id+'.pdf';a.click();setTimeout(()=>URL.revokeObjectURL(url),60000);
   }catch{if(resourceData.local[r.link]){const a=node('a');a.href=resourceData.local[r.link];a.download=r.id+'.pdf';a.click()}else window.open(r.link,'_blank','noopener,noreferrer')}
   finally{link.removeAttribute('aria-busy')}
  });
 }
 function localize(){
  render();document.getElementById('readerPage').setAttribute('aria-label',copy().reader);
  download.textContent=copy().download;shareButton.textContent=copy().share;zoomButton.setAttribute('aria-label',copy().zoom);
  if(current){document.getElementById('readerTitle').textContent=titleFor(current);if(!pdf)pdfStatus.textContent=copy()[pdfStatus.dataset.state||'pdfLoading']}
 }
 function closeReader(){
  generation++;layoutPass++;observer?.disconnect();observer=null;loadingTask?.destroy();loadingTask=null;pdf=null;current=null;
  if(blobURL)URL.revokeObjectURL(blobURL);blobURL='';pages.replaceChildren();pages.classList.remove('pdf-native');renderQueue=Promise.resolve();
 }
 async function open(resource){
  openPage('reader');current=resource;const token=generation;zoom=1;zoomButton.textContent='100%';zoomButton.hidden=true;shareButton.textContent=copy().share;progress.textContent='';
  document.getElementById('readerNativeHeader').innerHTML=UIComponents.navigationBar(titleFor(resource),{titleId:'readerTitle',backAttribute:'data-resource-back',large:false});
  // Replace the link to avoid retaining a previous document's click handler.
  const fresh=download.cloneNode(false);download.replaceWith(fresh);download=fresh;
  configureDownload(fresh,resource);fresh.textContent=copy().download;
  pdfStatus.dataset.state='pdfLoading';pdfStatus.textContent=copy().pdfLoading;document.getElementById('pdfRetry').hidden=true;scroll.scrollTop=0;
  UIComponents.mount();
  try{
   if(location.protocol==='file:'){
    const response=await fetch(resource.link,{credentials:'omit',signal:AbortSignal.timeout(10000)});if(!response.ok)throw Error('PDF request failed');
    blobURL=URL.createObjectURL(await response.blob());if(token!==generation)return;
    fresh.href=blobURL;const frame=node('iframe');frame.src=blobURL;frame.title=titleFor(resource);pages.classList.add('pdf-native');pages.replaceChildren(frame);pdfStatus.textContent='';return;
   }
   if(!document.getElementById('pdfTextStyles')){const css=node('link');css.id='pdfTextStyles';css.rel='stylesheet';css.href='assets/vendor/pdfjs/pdf_viewer.css';document.head.append(css)}
   pdfModule??=import('../assets/vendor/pdfjs/pdf.min.mjs');
   const [engine,response]=await Promise.all([pdfModule,fetch(resource.link,{credentials:'omit',signal:AbortSignal.timeout(8000)}).then(response=>{if(!response.ok)throw Error('PDF request failed');return response}).catch(error=>{if(resourceData.local[resource.link])return fetch(resourceData.local[resource.link]);throw error})]);
   if(token!==generation)return;
   if(!response.ok)throw Error('PDF request failed');
   const bytes=await response.arrayBuffer();if(token!==generation)return;
   blobURL=URL.createObjectURL(new Blob([bytes],{type:'application/pdf'}));fresh.href=blobURL;
   engine.GlobalWorkerOptions.workerSrc=new URL('assets/vendor/pdfjs/pdf.worker.min.mjs',location.href).href;
   loadingTask=engine.getDocument({data:new Uint8Array(bytes),isEvalSupported:false});
   pdf=await loadingTask.promise;if(token!==generation)return;
   pdfStatus.textContent='';await layout(engine,token);zoomButton.hidden=false;
  }catch(error){if(token===generation){pdfStatus.dataset.state='pdfError';pdfStatus.textContent=copy().pdfError;document.getElementById('pdfRetry').hidden=false}}
 }
 async function layout(engine,token){
  const pass=++layoutPass,position=scroll.scrollTop/(parseFloat(pages.style.width)||1);
  observer?.disconnect();pages.replaceChildren();
  const first=await pdf.getPage(1);if(token!==generation||pass!==layoutPass)return;
  const size=first.getViewport({scale:1}),width=Math.max(240,scroll.clientWidth-24)*zoom;
  pages.style.width=width+'px';
  const pageCount=pdf.numPages;
  observer=new IntersectionObserver(entries=>{
   for(const entry of entries){
    if(!entry.isIntersecting)continue;
    const sheet=entry.target;observer?.unobserve(sheet);
    renderQueue=renderQueue.then(async()=>{
     if(token!==generation||!sheet.isConnected)return;
     const number=Number(sheet.dataset.page),page=await pdf.getPage(number);
     if(token!==generation||!sheet.isConnected)return;
     const viewport=page.getViewport({scale:width/page.getViewport({scale:1}).width});
     sheet.style.height=viewport.height+'px';sheet.style.setProperty('--scale-factor',viewport.scale);
     const canvas=node('canvas'),ratio=Math.min(devicePixelRatio||1,2);canvas.width=Math.ceil(viewport.width*ratio);canvas.height=Math.ceil(viewport.height*ratio);canvas.setAttribute('aria-hidden','true');
     sheet.append(canvas);
     await page.render({canvasContext:canvas.getContext('2d'),viewport,transform:[ratio,0,0,ratio,0,0]}).promise;
     if(token!==generation||!sheet.isConnected)return;
     const text=node('div','textLayer');sheet.append(text);
     await new engine.TextLayer({textContentSource:page.streamTextContent(),container:text,viewport}).render();
     sheet.dataset.rendered='true';
    }).catch(()=>{if(token===generation&&sheet.isConnected)sheet.textContent=copy().pdfError});
   }
  },{root:scroll,rootMargin:'400px 0px'});
  for(let number=1;number<=pageCount;number++){
   const sheet=node('section','pdf-page');sheet.dataset.page=number;sheet.setAttribute('aria-label',`Page ${number}`);sheet.style.height=width*size.height/size.width+'px';pages.append(sheet);observer.observe(sheet);
  }
  scroll.scrollTop=position*width;updateProgress();
 }
 function updateProgress(){if(!pdf)return;const center=scroll.scrollTop+scroll.clientHeight/2;const visible=[...pages.children].find(el=>el.offsetTop+el.offsetHeight>center)||pages.lastElementChild;progress.textContent=`${visible?.dataset.page||1} / ${pdf.numPages}`}
 let scrollFrame=0;
 scroll.addEventListener('scroll',()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(()=>{scrollFrame=0;updateProgress()})},{passive:true});
 zoomButton.addEventListener('click',async()=>{if(!pdf)return;zoom=zoom===1?1.5:zoom===1.5?2:1;zoomButton.textContent=Math.round(zoom*100)+'%';await layout(await pdfModule,generation)});
 shareButton.addEventListener('click',async()=>{
  if(!current)return;
  const url=shareURL(current);
  if(navigator.share){try{await navigator.share({title:titleFor(current),url});return}catch(error){if(error.name==='AbortError')return}}
  try{await navigator.clipboard.writeText(url);shareButton.textContent=copy().copied;setTimeout(()=>shareButton.textContent=copy().share,2200)}
  catch{window.open(url,'_blank','noopener,noreferrer')}
 });
  retry.addEventListener('click',()=>{loaded=false;load()});
 document.getElementById('pdfRetry').addEventListener('click',()=>{if(current)open(current)});
 let resizeTimer=0,lastWidth=0;
 new ResizeObserver(()=>{const width=scroll.clientWidth;if(!pdf||!width||width===lastWidth)return;lastWidth=width;clearTimeout(resizeTimer);resizeTimer=setTimeout(async()=>{if(pdf)await layout(await pdfModule,generation)},180)}).observe(scroll);
 document.getElementById('readerPage').addEventListener('click',event=>{if(event.target.closest('[data-resource-back]'))openPage('resources')});
 return {load,localize,closeReader,openShared};
})();
const sharedResourceId=new URLSearchParams(location.search).get('resource');
if(sharedResourceId)setTimeout(()=>window.ResourceLibrary.openShared(sharedResourceId),0);
