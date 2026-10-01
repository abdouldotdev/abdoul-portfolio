// Reusable UI components. Shared geometry is in components.css; optics in liquid-glass.js.
const UIComponents = (() => {
 const components={
  textButton:'.home-section-heading button',
  button:'.resource-action,.open-pill,.get-pill,.contact-continue,.contact-linkedin,.sheet-actions > *,.about-actions button,.cancel-search',
  iconButton:'.native-back,.glass-circle,.app-icon',
  card:'.resource-card,.intro-widget,.now-widget,.app-section-card,.search-column,.sheet-card,.store-sheet-card,.settings-group,.about-focus,.about-process > div,.lab-project,.sheet-list',
  navigation:'.home-dock,.store-tabs',
  navigationBar:'.native-header',
  choice:'.portfolio-tab,.store-tab,.contact-option,.social-link,.share-action,.resource-categories button',
  field:'.spotlight-search,.contact-form textarea',
  select:'.contact-form select,.language-select',
  switchThumb:'.settings-toggle i',
  badge:'.contact-option b,.focus-icon,.resource-stack,.share-action span,.store-toast,.meta'
 };
 function navigationBar(title,{titleId='',backAttribute='data-back',large=true}={}){
  const header=document.createElement('header');header.className='native-header ui-navigation-bar';header.dataset.largeTitle=String(large);
  header.innerHTML='<button type="button" class="native-back" aria-label="Back"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="m14.5 5-7 7 7 7"/></svg></button><h1></h1>';
  header.querySelector('button').setAttribute(backAttribute,'');
  const heading=header.querySelector('h1');heading.textContent=title;if(titleId)heading.id=titleId;
  if(large){const compact=document.createElement('span');compact.className='ui-nav-compact-title';compact.setAttribute('aria-hidden','true');compact.textContent=title;header.append(compact)}
  return header.outerHTML;
 }
 const enhancedSelects=new WeakMap();
 const nativePicker=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
 let menuId=0;
 function enhanceSelect(select){
  if(nativePicker)return;
  if(enhancedSelects.has(select)){
   const {text}=enhancedSelects.get(select),value=select.selectedOptions[0]?.textContent||'';
   if(text.textContent!==value)text.textContent=value;
   return;
  }
  const wrapper=document.createElement('div');wrapper.className='ui-select-control';
  select.before(wrapper);wrapper.append(select);select.classList.add('ui-native-select');
  select.tabIndex=-1;select.setAttribute('aria-hidden','true');
  const trigger=document.createElement('button');trigger.type='button';trigger.className='ui-select-trigger glass-surface';
  trigger.dataset.ui='select';trigger.setAttribute('role','combobox');trigger.setAttribute('aria-haspopup','listbox');trigger.setAttribute('aria-expanded','false');
  const text=document.createElement('span');text.id=`ui-select-value-${++menuId}`;
  text.textContent=select.selectedOptions[0]?.textContent||'';
  const arrow=document.createElement('span');arrow.className='ui-select-chevron';arrow.setAttribute('aria-hidden','true');arrow.textContent='⌃';
  trigger.append(text,arrow);wrapper.append(trigger);
  const menu=document.createElement('div');menu.className='ui-select-menu glass-surface';menu.dataset.ui='menu';
  menu.id=`ui-select-menu-${menuId}`;menu.setAttribute('role','listbox');menu.setAttribute('popover','auto');
  trigger.setAttribute('aria-controls',menu.id);wrapper.append(menu);
  const label=document.querySelector(`label[for="${select.id}"]`);
  if(label){if(!label.id)label.id=`ui-select-label-${menuId}`;trigger.setAttribute('aria-labelledby',`${label.id} ${text.id}`);menu.setAttribute('aria-labelledby',label.id);label.addEventListener('click',e=>{e.preventDefault();trigger.click()})}
  const state={text,trigger,menu};enhancedSelects.set(select,state);
  const close=()=>{if(menu.matches(':popover-open'))menu.hidePopover();trigger.setAttribute('aria-expanded','false')};
  function choose(option){select.value=option.value;select.dispatchEvent(new Event('change',{bubbles:true}));text.textContent=option.textContent;close();trigger.focus({preventScroll:true})}
  function open(){
   menu.replaceChildren();
   [...select.options].filter(option=>option.value&&!option.disabled).forEach(option=>{
    const item=document.createElement('button');item.type='button';item.className='ui-select-option';item.setAttribute('role','option');
    item.setAttribute('aria-selected',String(option.selected));item.tabIndex=-1;
    const title=document.createElement('span');title.textContent=option.textContent;
    const check=document.createElement('span');check.className='ui-select-check';check.setAttribute('aria-hidden','true');check.textContent=option.selected?'✓':'';
    item.append(title,check);item.addEventListener('click',()=>choose(option));menu.append(item);
   });
   const bounds=document.getElementById('screen').getBoundingClientRect(),rect=trigger.getBoundingClientRect();
   const width=Math.min(Math.max(rect.width,230),bounds.width-28);
   const spaceAbove=rect.top-bounds.top-12,spaceBelow=bounds.bottom-rect.bottom-12;
   const above=spaceAbove>spaceBelow;
   menu.style.width=`${width}px`;menu.style.maxHeight=`${Math.max(100,Math.min(330,above?spaceAbove:spaceBelow))}px`;
   menu.style.left=`${Math.max(bounds.left+14,Math.min(rect.left,bounds.right-width-14))}px`;
   menu.showPopover();
   menu.style.top=`${above?rect.top-menu.offsetHeight-6:rect.bottom+6}px`;
   trigger.setAttribute('aria-expanded','true');
   (menu.querySelector('[aria-selected="true"]')||menu.firstElementChild)?.focus({preventScroll:true});
  }
  trigger.addEventListener('click',()=>menu.matches(':popover-open')?close():open());
  trigger.addEventListener('keydown',e=>{if(['ArrowDown','ArrowUp'].includes(e.key)){e.preventDefault();open()}});
  menu.addEventListener('toggle',()=>trigger.setAttribute('aria-expanded',String(menu.matches(':popover-open'))));
  let typed='',typeTimer;
  menu.addEventListener('keydown',e=>{
   const options=[...menu.children],index=options.indexOf(document.activeElement);
   if(e.key==='Escape'){e.preventDefault();e.stopPropagation();close();trigger.focus();return}
   if(['ArrowDown','ArrowUp','Home','End'].includes(e.key)){
    e.preventDefault();e.stopPropagation();const next=e.key==='Home'?0:e.key==='End'?options.length-1:(index+(e.key==='ArrowDown'?1:-1)+options.length)%options.length;options[next]?.focus();
   }else if(e.key.length===1&&e.key!==' '){
    typed+=e.key.toLocaleLowerCase();clearTimeout(typeTimer);typeTimer=setTimeout(()=>typed='',600);
    options.find(option=>option.textContent.toLocaleLowerCase().startsWith(typed))?.focus();
   }else if(e.key==='Tab'){close();trigger.focus()}
  });
  select.addEventListener('change',()=>{text.textContent=select.selectedOptions[0]?.textContent||''});
  select.addEventListener('invalid',e=>{e.preventDefault();trigger.focus();trigger.setAttribute('aria-invalid','true')});
  select.addEventListener('change',()=>trigger.removeAttribute('aria-invalid'));
 }
 function mountNavbar(nav){
  if(!nav.classList.contains('ui-navbar'))nav.classList.add('ui-navbar');
  const buttons=[...nav.children].filter(el=>el.tagName==='BUTTON');
  const selected=buttons.findIndex(el=>el.getAttribute('aria-selected')==='true'||el.classList.contains('selected'));
  if(selected<0)return;
  if(!nav.classList.contains('ui-tabbar'))nav.classList.add('ui-tabbar');
  if(nav.style.getPropertyValue('--nav-count')!==String(buttons.length))nav.style.setProperty('--nav-count',buttons.length);
  if(nav.style.getPropertyValue('--nav-index')!==String(selected))nav.style.setProperty('--nav-index',selected);
  if(!nav.querySelector('.ui-nav-indicator')){
   const indicator=document.createElement('span');indicator.className='ui-nav-indicator glass-surface';indicator.dataset.ui='navigation';indicator.setAttribute('aria-hidden','true');nav.prepend(indicator);
  }
 }
 function mount(){
  document.querySelectorAll('.portfolio-tabbar,.store-tabs,.home-dock').forEach(mountNavbar);
  for(const [type,selector] of Object.entries(components))document.querySelectorAll(selector).forEach(el=>{
   if(el.dataset.ui!==type)el.dataset.ui=type;
   const contentCard=el.matches('.app-section-card,.search-column,.resource-card');
   if(contentCard&&!el.classList.contains('ui-content-card'))el.classList.add('ui-content-card');
   if(type==='textButton'||type==='navigationBar'||contentCard){if(el.classList.contains('glass-surface'))el.classList.remove('glass-surface')}else if(!el.classList.contains('glass-surface'))el.classList.add('glass-surface');
   if(type==='select')enhanceSelect(el);
  });
  document.querySelectorAll('.settings-toggle').forEach(el=>{if(!el.classList.contains('ui-switch'))el.classList.add('ui-switch')});
  document.querySelectorAll('.portfolio-app-row,.search-result,.dev-app-row').forEach(el=>{if(!el.classList.contains('ui-list-row'))el.classList.add('ui-list-row')});
 }
 return {mount,navigationBar};
})();
