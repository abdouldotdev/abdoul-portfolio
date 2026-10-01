// Refraction strategy: https://kube.io/blog/liquid-glass-css-svg/
// Snell refraction -> normalized RG displacement map + specular rim -> SVG backdrop.
// Original implementation below; no library or remote runtime dependency.
(() => {
 const selector='.glass-surface';
 const supportsSVG=/Chrome|Chromium|Edg\//.test(navigator.userAgent)&&CSS.supports('backdrop-filter','url(#glass)');
 document.documentElement.classList.toggle('svg-glass',supportsSVG);
 const ns='http://www.w3.org/2000/svg';
 const svg=document.createElementNS(ns,'svg');
 svg.setAttribute('aria-hidden','true');svg.classList.add('glass-filter-definitions');
 const defs=document.createElementNS(ns,'defs');svg.append(defs);document.body.append(svg);
 const filters=new Map(),observed=new Set(),dirty=new Set();
 let nextId=0,frame=0,needsMount=true,allDirty=true;
 const clamp=x=>Math.max(0,Math.min(1,x));
 const squircle=t=>Math.pow(1-Math.pow(1-clamp(t),4),.25);
 const lip=t=>{const x=clamp(t),blend=x*x*x*(x*(x*6-15)+10);return squircle(x)*(1-blend)+(1-squircle(x))*blend};

 function createFilter(width,height,radius,profile){
  const key=[width,height,radius,profile].join(':');
  if(filters.has(key))return filters.get(key);
  const bezel=Math.max(2,Math.min(radius*.6,profile==='lip'?7:14));
  const thickness=profile==='lip'?7:12,surface=profile==='lip'?lip:squircle;
  const samples=new Float32Array(128),eta=1/1.5;
  let maximum=0;
  for(let i=0;i<samples.length;i++){
   const t=(i+.5)/samples.length,delta=.001;
   const derivative=(surface(t+delta)-surface(t-delta))/(2*delta);
   const length=Math.hypot(derivative,1),nx=-derivative/length,nz=1/length;
   const refracted=eta*nz-Math.sqrt(1-eta*eta*(1-nz*nz));
   const rx=refracted*nx,rz=-eta+refracted*nz;
   samples[i]=rx/-rz*(thickness+surface(t)*bezel);
   maximum=Math.max(maximum,Math.abs(samples[i]));
  }
  const map=document.createElement('canvas'),shine=document.createElement('canvas');
  // Sample the same optical profile at bounded resolution, then scale in feImage.
  const resolution=Math.min(1,256/Math.max(width,height));
  const mapWidth=Math.ceil(width*resolution),mapHeight=Math.ceil(height*resolution);
  map.width=shine.width=mapWidth;map.height=shine.height=mapHeight;
  const ctx=map.getContext('2d',{willReadFrequently:true}),specCtx=shine.getContext('2d',{willReadFrequently:true});
  const pixels=ctx.createImageData(mapWidth,mapHeight),spec=specCtx.createImageData(mapWidth,mapHeight);
  const lightX=Math.cos(-Math.PI/3),lightY=Math.sin(-Math.PI/3);
  for(let y=0;y<mapHeight;y++)for(let x=0;x<mapWidth;x++){
   const at=(y*mapWidth+x)*4,px=(x+.5)/resolution-width/2,py=(y+.5)/resolution-height/2;
   const qx=Math.abs(px)-(width/2-radius),qy=Math.abs(py)-(height/2-radius);
   const cx=Math.max(qx,0),cy=Math.max(qy,0),corner=Math.hypot(cx,cy);
   const distance=radius-corner-Math.min(Math.max(qx,qy),0);
   pixels.data[at]=pixels.data[at+1]=128;pixels.data[at+2]=128;pixels.data[at+3]=255;
   if(distance<0||distance>bezel)continue;
   const nx=corner?cx/corner*Math.sign(px):qx>qy?Math.sign(px):0;
   const ny=corner?cy/corner*Math.sign(py):qx>qy?0:Math.sign(py);
   const t=clamp(distance/bezel),m=samples[Math.min(127,Math.floor(t*128))]/(maximum||1);
   pixels.data[at]=128-nx*m*127;pixels.data[at+1]=128-ny*m*127;
   const lit=Math.pow(Math.abs(nx*lightX+ny*lightY),5);
   const rim=Math.pow(1-t,3)*(.2+.8*lit)*Math.min(1,distance+.25);
   spec.data[at]=spec.data[at+1]=spec.data[at+2]=255;
   spec.data[at+3]=Math.round(rim*(profile==='lip'?155:100));
  }
  ctx.putImageData(pixels,0,0);specCtx.putImageData(spec,0,0);
  const id=`liquid-glass-${++nextId}`,filter=document.createElementNS(ns,'filter');
  for(const [name,value] of Object.entries({id,x:0,y:0,width,height,filterUnits:'userSpaceOnUse','color-interpolation-filters':'sRGB'}))filter.setAttribute(name,value);
  const add=(name,attrs)=>{const node=document.createElementNS(ns,name);for(const [k,v]of Object.entries(attrs))node.setAttribute(k,v);filter.append(node)};
  add('feGaussianBlur',{in:'SourceGraphic',stdDeviation:profile==='lip'?.2:.65,result:'soft'});
  add('feImage',{href:map.toDataURL(),x:0,y:0,width,height,preserveAspectRatio:'none',result:'displacement'});
  // SVG channels span [-.5,.5], so double the normalized physical displacement.
  add('feDisplacementMap',{in:'soft',in2:'displacement',scale:maximum*2*.7,xChannelSelector:'R',yChannelSelector:'G',result:'refracted'});
  add('feImage',{href:shine.toDataURL(),x:0,y:0,width,height,preserveAspectRatio:'none',result:'specular'});
  add('feComposite',{in:'refracted',in2:'specular',operator:'in',result:'rimColor'});
  add('feColorMatrix',{in:'rimColor',type:'saturate',values:4,result:'saturatedRim'});
  add('feBlend',{in:'refracted',in2:'saturatedRim',mode:'screen',result:'lit'});
  add('feBlend',{in:'lit',in2:'specular',mode:'screen'});
  defs.append(filter);filters.set(key,id);return id;
 }
 function refresh(){
  frame=0;
  if(needsMount){
   needsMount=false;UIComponents.mount();
   for(const el of observed)if(!el.isConnected||!el.matches(selector)){resize.unobserve(el);observed.delete(el);dirty.delete(el)}
   document.querySelectorAll(selector).forEach(el=>{if(!observed.has(el)){observed.add(el);resize.observe(el);dirty.add(el)}});
  }
  const candidates=allDirty?[...observed]:[...dirty];allDirty=false;dirty.clear();
  if(!supportsSVG)return;
  // Finish all layout reads before changing styles or adding SVG definitions.
  const measurements=[];
  for(const el of candidates){
   if(!el.isConnected)continue;
   const style=getComputedStyle(el),width=el.offsetWidth,height=el.offsetHeight;
   if(style.visibility==='hidden'||style.display==='none'||!width||!height)continue;
   const cssRadius=style.borderTopLeftRadius;
   const radius=Math.round(Math.min(width/2,height/2,parseFloat(cssRadius)*(cssRadius.includes('%')?Math.min(width,height)/100:1)||1));
   const profile=el.matches('.settings-toggle i')?'lip':'convex';
   const key=[width,height,radius,profile].join(':');
   if(el.dataset.glassSize!==key)measurements.push({el,width,height,radius,profile,key});
  }
  let created=0;
  for(const {el,width,height,radius,profile,key} of measurements){
   // Keep input responsive while first-time maps are built; CSS blur is the fallback.
   if(!filters.has(key)&&created>=1){dirty.add(el);continue}
   if(!filters.has(key))created++;
   el.style.setProperty('--glass-filter',`url(#${createFilter(width,height,radius,profile)})`);
   el.dataset.glassSize=key;
  }
  if(dirty.size)schedule();
 }
 function schedule(){if(!frame)frame=requestAnimationFrame(refresh)}
 const resize=new ResizeObserver(entries=>{for(const {target}of entries)dirty.add(target);schedule()});
 new MutationObserver(records=>{
  for(const record of records){
   if(record.type==='childList'&&[...record.addedNodes,...record.removedNodes].some(node=>node.nodeType===Node.ELEMENT_NODE)){needsMount=true;allDirty=true}
   else if(record.type==='attributes'&&(record.attributeName!=='class'||record.target.matches('.ios-page,.store-page,.sheet-layer,.store-sheet-layer,.spotlight,.screenshot-viewer,.island,.store-tabs'))){
    allDirty=true;
    if(record.attributeName==='aria-selected')needsMount=true;
   }
  }
  if(needsMount||allDirty)schedule();
 }).observe(document.getElementById('screen'),{childList:true,subtree:true,attributes:true,attributeFilter:['class','hidden','aria-hidden','aria-selected']});
 schedule();
})();
