// Local SVG symbols, animated with CSS. No icon library or network request.
const iconPaths = {
 apps: '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
 resources: '<path d="M3 7a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2ZM3 11h18"/>',
 work: '<rect x="3" y="7" width="18" height="14" rx="3"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12c5 4 13 4 18 0M10 13h4"/>',
 code: '<path d="m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18"/>',
 lab: '<path d="M9 3h6M10 3v7L4.5 18.2A1.8 1.8 0 0 0 6 21h12a1.8 1.8 0 0 0 1.5-2.8L14 10V3M7 15h10"/><circle cx="10" cy="18" r=".65" fill="currentColor" stroke="none"/>',
 about: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>',
 mail: '<rect x="2" y="5" width="20" height="15" rx="3"/><path d="m3 7 9 7 9-7"/>',
 search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
 settings: '<path d="m10 3-.7 2.4-2 .9L5 5.6 2.8 9.4l1.7 1.8v2L2.8 15 5 18.8l2.3-.7 2 .9.7 2.4h4l.7-2.4 2-.9 2.3.7 2.2-3.8-1.7-1.8v-2l1.7-1.8L19 5.6l-2.3.7-2-.9L14 3z"/><circle cx="12" cy="12.2" r="3.2"/>',
 arrow: '<path d="M6 18 18 6M6 6h12v12"/>',
 chevron: '<path d="m9 5 7 7-7 7"/>',
 globe: '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
 copy: '<rect x="8" y="8" width="13" height="13" rx="3"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
 share: '<path d="M12 15V2m-4 4 4-4 4 4M7 9H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-2"/>',
 spark: '<path d="m12 2 2.7 7.3L22 12l-7.3 2.7L12 22l-2.7-7.3L2 12l7.3-2.7Z"/>',
 check: '<path d="m5 12 4.5 4.5L19 7"/>',
 heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/>',
 play: '<path d="m9 5 11 7-11 7Z" fill="currentColor" stroke="none"/>',
 nana: '<path d="m12 3 7 7a5 5 0 0 1 0 7l-3 3a5 5 0 0 1-7 0l-6-6" stroke-width="3"/>',
 wallet: '<path d="M20 7V5a2 2 0 0 0-2-2H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h14a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H6a3 3 0 0 1-3-3"/><path d="M16 14h5"/><circle cx="15" cy="14" r=".8" fill="currentColor" stroke="none"/>',
 message: '<path d="M21 11.5a9 9 0 0 1-9 8.5 10 10 0 0 1-4-.8L3 21l1.4-4.7A8 8 0 0 1 3 11.5a9 9 0 0 1 18 0Z"/><path d="M8 11h8M8 14h5"/>',
 whatsapp: '<path d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.4-4.8a8.5 8.5 0 1 1 16.1-4.1Z"/><path d="m8 7 1.4 2.7-1 1.1a8 8 0 0 0 3.8 3.8l1.1-1 2.7 1.4c-.5 3-3.4 2.1-5.5.8-2.2-1.4-5.2-5.8-2.5-8.8Z"/>',
 linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7.5 10v7M11.5 17v-7m0 3a3 3 0 0 1 6 0v4"/><circle cx="7.5" cy="7" r="1" fill="currentColor" stroke="none"/>',
 facebook: '<path d="M14.5 22V13h3l.5-4h-3.5V6.5c0-1 .4-1.5 1.7-1.5H18V1.5A20 20 0 0 0 15.4 1C12.6 1 11 2.7 11 5.8V9H8v4h3v9" fill="currentColor" stroke="none"/>',
 tiktok: '<path d="M14 3h3c.3 2.5 1.8 4 4 4.3v3a9 9 0 0 1-4-1.1V16a6 6 0 1 1-6-6v3a3 3 0 1 0 3 3Z" fill="currentColor" stroke="none"/>',
 x: '<path d="m4 3 16 18h-4L0 3h4Z" transform="translate(2)"/><path d="M20 3 4 21"/>'
};
function uiIcon(name) {
 return `<svg class="ui-icon symbol-${name}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${iconPaths[name] || iconPaths.spark}</svg>`;
}
document.querySelectorAll('[data-icon]').forEach(el => { el.innerHTML = uiIcon(el.dataset.icon); });

let locale = /^fr\b/i.test(navigator.language) ? 'fr' : 'en';
try { const saved=localStorage.getItem('abdoul-portfolio-language'); if(['fr','en'].includes(saved))locale=saved; } catch {}
document.documentElement.lang = locale;
let copy=copyByLanguage[locale];
const socialNav=document.getElementById('aboutSocials');
profileData.socials.forEach(social=>{
 const enabled=/^https:\/\//.test(social.url);
 const item=document.createElement(enabled?'a':'span');
 item.className='social-link';
 if(enabled){item.href=social.url;item.target='_blank';item.rel='noopener noreferrer'}
 else{item.setAttribute('aria-disabled','true');item.title=locale==='fr'?'Lien à venir':'Link coming soon'}
 item.innerHTML=uiIcon(social.key);
 const label=document.createElement('span');label.textContent=social.label;item.append(label);socialNav.append(item);
});
const PROFILE_DATA=profileData.avatar;
function hydrateProfiles(root=document){root.querySelectorAll('img[data-profile]').forEach(img=>{if(img.src!==PROFILE_DATA)img.src=PROFILE_DATA})}
hydrateProfiles();
const myApps=appbizApps.filter(app=>app.group==='my');
const clientApps=appbizApps.filter(app=>app.group==='client');
const iconHTML=p=>p.image?`<img src="${p.image}" alt="">`:({cutiz:'<img src="assets/logos/cutiz.png" alt="">',fluenzy:'<img src="assets/logos/fluenzy.jpg" alt="">',glowe:'<img src="assets/logos/glowe.jpg" alt="">'}[p.icon]||uiIcon('spark'));
const iconClass=p=>p.image?'real-icon':({cutiz:'icon-cutiz real-icon',fluenzy:'icon-fluenzy real-icon',glowe:'icon-glowe real-icon'}[p.icon]||'icon-lab');
const featuredApps=document.getElementById('featuredApps');
Object.entries(projects).filter(([,project])=>project.tags?.includes('top')).forEach(([key,project])=>{
 const button=document.createElement('button');button.className='app';button.dataset.project=key;button.setAttribute('aria-label',project.name);
 const icon=document.createElement('span');icon.className='app-icon real-icon';
 const image=document.createElement('img');image.src=project.image;image.alt='';icon.append(image);
 const label=document.createElement('span');label.className='app-label';label.textContent=project.name;
 button.append(icon,label);featuredApps.append(button);
});
const appsPage=document.getElementById('appsPage'),aboutPage=document.getElementById('aboutPage'),sheet=document.getElementById('projectSheet'),sheetCard=document.getElementById('projectSheetCard'),sheetContent=document.getElementById('sheetProjectContent'),contactSheet=document.getElementById('contactSheet'),settingsSheet=document.getElementById('settingsSheet'),themeToggle=document.getElementById('themeToggle'),themeStatus=document.getElementById('themeStatus'),spotlight=document.getElementById('spotlight'),searchInput=document.getElementById('searchInput'),searchResults=document.getElementById('searchResults'),island=document.getElementById('island');
const screenEl=document.getElementById('screen'),faithStore=document.getElementById('faithStore'),faithStoreScroll=document.getElementById('faithStoreScroll'),faithCompact=document.getElementById('faithCompact'),developerStore=document.getElementById('developerStore'),developerPages=document.getElementById('developerPages'),developerDots=document.getElementById('developerDots'),storeTabs=document.getElementById('storeTabs'),screenshotViewer=document.getElementById('screenshotViewer'),viewerImage=document.getElementById('viewerImage'),viewerCount=document.getElementById('viewerCount'),deviceSheetRail=document.getElementById('deviceSheetRail'),storeToast=document.getElementById('storeToast');
const storeSheets=[...document.querySelectorAll('.store-sheet-layer')];
const iphoneShots=['assets/screenshots/faithlock/iphone-01.jpg','assets/screenshots/faithlock/iphone-02.jpg','assets/screenshots/faithlock/iphone-03.jpg','assets/screenshots/faithlock/iphone-04.jpg','assets/screenshots/faithlock/iphone-05.jpg','assets/screenshots/faithlock/iphone-06.jpg','assets/screenshots/faithlock/iphone-07.jpg','assets/screenshots/faithlock/iphone-08.jpg'];
const ipadShots=['assets/screenshots/faithlock/ipad-01.jpg','assets/screenshots/faithlock/ipad-02.jpg','assets/screenshots/faithlock/ipad-03.jpg'];
const faithStoreURL=projects.faithlock.url;
let activePage=null,activeSheet=null,activeStorePage=null,activeStoreSheet=null,storeReturnPage=null,projectReturnPage=null,sourceReturnPage=null,activeProjectKey=null,activeSourceId=null,activeShot=0,activeViewerShots=iphoneShots,toastTimer=0;

function closePages(){window.ResourceLibrary?.closeReader();document.querySelectorAll('.ios-page.active').forEach(p=>{window.NativeUI?.exit(p);p.classList.remove('active')});activePage=null}
function syncAppsIntro(){const intro=document.getElementById('appsIntro');intro.hidden=appsPage.dataset.activeGroup!=='open-source';intro.textContent=locale==='fr'?'Je crée et partage les outils que j’aurais aimé avoir sous la main.':'I build and share the tools I wish I’d had at hand.'}
function openPage(name, group = 'all') {
 const page = document.getElementById(`${name}Page`);
 if (!page?.classList.contains('ios-page')) return;
 const showPage = () => {
  closeStoreFlow(); closeSheets(); closeSpotlight(); closePages();
  page.classList.add('active');
  const body=page.querySelector('.apps-page-body,.page-body');
  if(name==='apps'){page.dataset.activeGroup=group;renderAppSections(group);document.getElementById('appsPageTitle').textContent=group==='my'?copy.my:group==='client'?copy.client:group==='open-source'?'Open source':copy.app;syncAppsIntro()}
  if(body)body.scrollTop=0;
  page.scrollTop=0;
  activePage = page;
  window.NativeUI?.enter(page);
 };
 showPage();
 if(name==='resources')window.ResourceLibrary?.load();
}

const introCard = document.querySelector('.intro-widget');
if (introCard && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
 let introPointerFrame = 0;
 introCard.addEventListener('pointermove', event => {
  if (introPointerFrame) cancelAnimationFrame(introPointerFrame);
  introPointerFrame = requestAnimationFrame(() => {
   const bounds = introCard.getBoundingClientRect();
   introCard.style.setProperty('--intro-x', `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
   introCard.style.setProperty('--intro-y', `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
   introPointerFrame = 0;
  });
 });
 introCard.addEventListener('pointerleave', () => {
  introCard.style.removeProperty('--intro-x');
  introCard.style.removeProperty('--intro-y');
 });
}
function setIslandExpanded(expanded){island.classList.toggle('open',expanded);screenEl.classList.toggle('island-expanded',expanded);screenEl.classList.toggle('island-compact',!expanded);island.setAttribute('aria-expanded',String(expanded));island.querySelector('.island-idle').setAttribute('aria-hidden',String(expanded));island.querySelector('.island-expanded-card').setAttribute('aria-hidden',String(!expanded))}
function goHome(){closeStoreFlow();closePages();closeSheets();closeSpotlight();setIslandExpanded(false)}
function closeSheets(){const wasContact=contactSheet.classList.contains('open');document.querySelectorAll('.sheet-layer.open').forEach(s=>{if(s.classList.contains('open'))window.NativeUI?.exit(s.querySelector('.sheet-card,.store-sheet-card'));s.classList.remove('open');s.setAttribute('aria-hidden','true')});activeSheet=null;if(wasContact)contactReturnFocus?.focus({preventScroll:true})}
function closeStoreSheets(){storeSheets.forEach(s=>{if(s.classList.contains('open'))window.NativeUI?.exit(s.querySelector('.sheet-card,.store-sheet-card'));s.classList.remove('open');s.setAttribute('aria-hidden','true')});activeStoreSheet=null}
function openStoreSheet(id){closeStoreSheets();const target=document.getElementById(id);if(!target)return;target.classList.add('open');target.setAttribute('aria-hidden','false');activeStoreSheet=target;window.NativeUI?.enter(target.querySelector('.store-sheet-card'))}
function closeViewer(){screenshotViewer.classList.remove('open');screenshotViewer.setAttribute('aria-hidden','true')}
function closeDeveloper(){window.NativeUI?.exit(developerStore);developerStore.classList.remove('active');developerStore.setAttribute('aria-hidden','true');activeStorePage=faithStore}
function closeStoreFlow(restoreOrigin=false){closeStoreSheets();closeViewer();developerStore.classList.remove('active');developerStore.setAttribute('aria-hidden','true');if(faithStore.classList.contains('active'))window.NativeUI?.exit(faithStore);faithStore.classList.remove('active');faithStore.setAttribute('aria-hidden','true');faithCompact.classList.remove('visible');screenEl.classList.remove('store-mode');storeTabs.classList.remove('active');activeStorePage=null;const returnPage=storeReturnPage;storeReturnPage=null;if(restoreOrigin&&returnPage){returnPage.classList.add('active');activePage=returnPage}}
function setStoreGroup(group){document.querySelectorAll('[data-store-group]').forEach(button=>{const selected=button.dataset.storeGroup===group;button.classList.toggle('selected',selected);button.setAttribute('aria-current',selected?'page':'false')})}
function openFaithStore(){const origin=activePage||storeReturnPage;closePages();closeSheets();closeSpotlight();closeStoreFlow();storeReturnPage=origin;screenEl.classList.add('store-mode');faithStore.classList.add('active');faithStore.setAttribute('aria-hidden','false');storeTabs.classList.add('active');setStoreGroup('my');activeStorePage=faithStore;faithStoreScroll.scrollTop=0;window.NativeUI?.enter(faithStore)}
function openDeveloper(){closeStoreSheets();developerStore.classList.add('active');developerStore.setAttribute('aria-hidden','false');activeStorePage=developerStore;document.getElementById('developerScroll').scrollTop=0;window.NativeUI?.enter(developerStore)}
function renderProject(key){
 const p=projects[key],listing=storeListings[key],fr=locale==='fr';
 document.getElementById('projectPageHeader').textContent=p.name;
 document.getElementById('projectPageIcon').src=p.image;
 document.getElementById('projectPageIcon').alt=`${p.name} ${fr?'icône':'icon'}`;
 document.getElementById('projectPageTitle').textContent=p.name;
 document.getElementById('projectPageTagline').textContent=listing?.subtitle?.[locale]||p.tagline;
 document.getElementById('projectPageDescription').textContent=listing?.description?.[locale]||p.description||'';
 document.getElementById('projectPageFeatures').replaceChildren(...(listing?.features?.[locale]||[]).map(feature=>{const li=document.createElement('li');li.textContent=feature;return li}));
 document.getElementById('projectPageAboutLabel').textContent=fr?'À propos de cette app':'About this app';
 document.getElementById('projectPageInfoLabel').textContent=fr?'Informations':'Information';
 document.getElementById('projectPagePreviewLabel').textContent=fr?'Aperçu':'Preview';
 const link=document.getElementById('projectPageLink'),url=listing?.url||p.url;link.hidden=!url;if(url)link.href=url;else link.removeAttribute('href');link.textContent=(listing?.cta?.[locale]||(fr?'Découvrir':'Explore'))+' ↗';
 const platform=listing?.platform||(p.meta.includes('iOS')?'iOS':'Web');
 const release=listing?.releaseDate;
 const releaseValue=release?new Intl.DateTimeFormat(fr?'fr-FR':'en-US',{day:'numeric',month:'short',timeZone:'UTC'}).format(new Date(`${release}T12:00:00Z`)):(key==='cutiz'?(fr?'À venir':'Coming soon'):'—');
 const facts=[];
 if(listing?.users)facts.push([fr?'Utilisateurs':'Users',`${new Intl.NumberFormat(fr?'fr-FR':'en-US').format(listing.users)}+`,'']);
 if(Number.isFinite(listing?.ratings?.score)){
  const value=`${new Intl.NumberFormat(fr?'fr-FR':'en-US',{minimumFractionDigits:1,maximumFractionDigits:1}).format(listing.ratings.score)} ★`;
  facts.push([fr?'Note':'Rating',value,'']);
 }
 facts.push([fr?'Date de sortie':'Release date',releaseValue,release?release.slice(0,4):(key==='cutiz'?'':fr?'Non vérifiée':'Unverified')]);
 facts.push([fr?'Catégorie':'Category',listing?.category?.[locale]||p.category,'']);
 const factWrap=document.getElementById('projectPageFacts');factWrap.style.setProperty('--facts-count',facts.length);
 factWrap.replaceChildren(...facts.map(([label,value,detail])=>{const item=document.createElement('div');item.className='project-store-fact';const small=document.createElement('small'),strong=document.createElement('strong'),span=document.createElement('span');small.textContent=label;strong.textContent=value;span.textContent=detail;item.append(small,strong,span);return item}));
 const preview=document.getElementById('projectPagePreview'),shots=listing?.screenshots||[];preview.hidden=!shots.length;
 document.getElementById('projectPageShots').replaceChildren(...shots.map((src,index)=>{const button=document.createElement('button'),img=document.createElement('img');button.type='button';button.dataset.projectShot=String(index);button.setAttribute('aria-label',`${fr?'Ouvrir la capture':'Open screenshot'} ${index+1}`);img.src=src;img.alt=`${p.name} ${fr?'aperçu':'preview'} ${index+1}`;img.loading='lazy';button.append(img);return button}));
 const dl=document.createElement('dl');
 [[fr?'Catégorie':'Category',listing?.category?.[locale]||p.category],[fr?'Plateforme':'Platform',platform],[fr?'Source':'Source',listing?.source==='Projet local'?(fr?'Projet local':'Local project'):listing?.source||'Portfolio']].forEach(([label,value])=>{const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=label;dd.textContent=value;dl.append(dt,dd)});document.getElementById('projectPageMeta').replaceChildren(dl);
}
function openProject(key){
 const p=projects[key];if(!p)return;
 if(key==='faithlock'){openFaithStore();return}
 projectReturnPage=activePage;activeProjectKey=key;renderProject(key);
 openPage('project');document.getElementById('projectPage').scrollTop=0;screenEl.classList.add('store-mode');storeTabs.classList.add('active');setStoreGroup(p.group);
}
function closeProjectPage(){const origin=projectReturnPage;projectReturnPage=null;storeTabs.classList.remove('active');screenEl.classList.remove('store-mode');closePages();if(origin){origin.classList.add('active');activePage=origin;window.NativeUI?.enter(origin)}}
function renderSourceProject(id){
 const repo=openSourceProjects.find(item=>item.id===id);if(!repo)return;
 const fr=locale==='fr',page=document.getElementById('sourcePage');
 page.setAttribute('aria-label',fr?'Détails du projet open source':'Open source project details');
 page.style.setProperty('--source-accent',repo.color);
 document.getElementById('sourceMark').src=repo.image;
 document.getElementById('sourceCategory').textContent=repo.category[locale];
 document.getElementById('sourceTitle').textContent=repo.name;
 document.getElementById('sourceSubtitle').textContent=repo.subtitle[locale];
 document.getElementById('sourceDescription').textContent=repo.description[locale];
 document.getElementById('sourceAboutLabel').textContent=fr?'Le projet':'The project';
 document.getElementById('sourceHighlightsLabel').textContent=fr?'Ce que ça permet':'What it does';
 document.getElementById('sourceStackLabel').textContent=fr?'Technos & domaines':'Tech & topics';
 document.getElementById('sourceGithubLabel').textContent=fr?'Voir le code sur GitHub':'View code on GitHub';
 const link=document.getElementById('sourceGithubLink');link.href=repo.url;link.setAttribute('aria-label',`${fr?'Voir le code de':'View code for'} ${repo.name} ${fr?'sur GitHub':'on GitHub'}`);
 document.getElementById('sourceHighlights').replaceChildren(...repo.highlights[locale].map((value,index)=>{const item=document.createElement('li'),number=document.createElement('span'),copy=document.createElement('p');number.textContent=String(index+1).padStart(2,'0');copy.textContent=value;item.append(number,copy);return item}));
 document.getElementById('sourceStack').replaceChildren(...repo.stack.map(value=>{const tag=document.createElement('span');tag.textContent=value;return tag}));
}
function openSourceProject(id){
 if(!openSourceProjects.some(repo=>repo.id===id))return;
 sourceReturnPage=activePage;activeSourceId=id;renderSourceProject(id);
 openPage('source');storeTabs.classList.add('active');screenEl.classList.add('store-mode');setStoreGroup('open-source');
}
function closeSourceProject(){
 const origin=sourceReturnPage;sourceReturnPage=null;activeSourceId=null;
 storeTabs.classList.remove('active');screenEl.classList.remove('store-mode');closePages();
 if(origin){origin.classList.add('active');activePage=origin;window.NativeUI?.enter(origin)}
}
function openContact(){contactReturnFocus=document.activeElement;closeStoreFlow();closeSpotlight();contactSheet.classList.add('open');contactSheet.setAttribute('aria-hidden','false');activeSheet=contactSheet;window.NativeUI?.enter(contactSheet.querySelector('.sheet-card'));contactSheet.querySelector('[data-contact-channel]').focus({preventScroll:true})}

// Native select opens the system picker on iOS; the closed field uses our glass material.
function buildContactDraft(reason, brief, language) {
 const topic=contactReasons[reason]?.[language];
 if(!topic) return {subject:'',message:''};
 const project=reason==='project'&&brief.trim()?`\n\n${language==='fr'?'Mon projet':'My project'} :\n${brief.trim()}`:'';
 return {subject:topic[0],message:`${language==='fr'?'Bonjour Abdoul,':'Hi Abdoul,'}\n\n${topic[1]}${project}\n\n${language==='fr'?'Merci et à bientôt !':'Thank you, and speak soon!'}`};
}
function contactURL(channel, subject, message) {
 if(channel==='email') return `mailto:${profileData.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
 if(channel==='whatsapp') return `https://wa.me/${profileData.contact.whatsapp}?text=${encodeURIComponent(message)}`;
 return profileData.contact.linkedin;
}
const contactForm=document.getElementById('contactForm'),contactReason=document.getElementById('contactReason'),contactBrief=document.getElementById('contactBrief'),contactDraft=document.getElementById('contactDraft'),contactContinue=document.getElementById('contactContinue'),contactHint=document.getElementById('contactHint'),contactLinkedIn=document.getElementById('contactLinkedIn');
let contactChannel='',contactReturnFocus=null;
function getContactText(){return contactCopy[locale]}
let contactText=getContactText();
function localizeContact(){
contactText=getContactText();
const reason=contactReason.value;
contactReason.replaceChildren();
document.getElementById('contactTitle').textContent=contactText.title;
document.getElementById('contactIntro').textContent=contactText.intro;
document.getElementById('contactReasonLabel').textContent=contactText.reason;
document.getElementById('contactBriefLabel').textContent=contactText.brief;
document.getElementById('contactDraftLabel').textContent=contactText.draft;
contactBrief.placeholder=contactText.briefPlaceholder;
contactLinkedIn.textContent=contactText.openLinkedIn;
contactLinkedIn.href=profileData.contact.linkedin;
contactSheet.querySelector('[data-close-sheet]').textContent=contactText.close;
contactSheet.querySelector('.contact-options').setAttribute('aria-label',locale==='fr'?'Canal de contact':'Contact channel');
contactReason.add(new Option(contactText.placeholder,''));
Object.entries(contactReasons).forEach(([key,text])=>contactReason.add(new Option(text[locale][0],key)));
contactReason.value=reason;
contactContinue.textContent=contactText[contactChannel]||contactText.email;
updateContactDraft();
}
localizeContact();
function updateContactDraft() {
 const project=contactReason.value==='project';
 document.getElementById('contactProjectField').hidden=!project;
 contactBrief.required=project;
 contactBrief.setCustomValidity(project&&!contactBrief.value.trim()?contactText.briefError:'');
 document.getElementById('contactDraftField').hidden=!contactReason.value;
 contactDraft.value=buildContactDraft(contactReason.value,contactBrief.value,locale).message;
 contactDraft.setCustomValidity('');
 contactContinue.disabled=!contactReason.value;
 contactHint.textContent=contactChannel==='linkedin'?contactText.hint:'';
 contactLinkedIn.hidden=true;contactContinue.hidden=false;
}
contactSheet.querySelectorAll('[data-contact-channel]').forEach(button=>button.addEventListener('click',()=>{
 contactChannel=button.dataset.contactChannel;
 contactSheet.querySelectorAll('[data-contact-channel]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
 contactForm.hidden=false;
 contactContinue.textContent=contactText[contactChannel];
 contactHint.textContent=contactChannel==='linkedin'?contactText.hint:'';
 contactLinkedIn.hidden=true;contactContinue.hidden=false;
 contactReason.focus({preventScroll:true});
}));
contactReason.addEventListener('change',updateContactDraft);
contactBrief.addEventListener('input',updateContactDraft);
contactDraft.addEventListener('input',()=>{contactDraft.setCustomValidity(contactDraft.value.trim()?'':contactText.messageError);contactLinkedIn.hidden=true;contactContinue.hidden=false});
contactForm.addEventListener('submit',async e=>{
 e.preventDefault();
 contactDraft.setCustomValidity(contactDraft.value.trim()?'':contactText.messageError);
 if(!contactChannel||!contactForm.reportValidity()) return;
 const subject=buildContactDraft(contactReason.value,contactBrief.value,locale).subject;
 if(contactChannel==='linkedin'){
  try {await navigator.clipboard.writeText(contactDraft.value);contactHint.textContent=contactText.copied}
  catch {contactDraft.focus();contactDraft.select();contactHint.textContent=contactText.copyFailed}
  contactLinkedIn.hidden=false;
  contactContinue.hidden=true;
 }else if(contactChannel==='email') location.href=contactURL(contactChannel,subject,contactDraft.value);
 else window.open(contactURL(contactChannel,subject,contactDraft.value),'_blank','noopener,noreferrer');
});
const themeStorageKey='abdoul-portfolio-theme';
function syncThemeControls(){const dark=document.documentElement.dataset.theme==='dark';themeToggle.setAttribute('aria-checked',String(dark));themeStatus.textContent=dark?'On':'Off'}
function setTheme(theme){document.documentElement.dataset.theme=theme;try{localStorage.setItem(themeStorageKey,theme)}catch{}syncThemeControls()}
function toggleTheme(){setTheme(document.documentElement.dataset.theme==='dark'?'light':'dark')}
function openSettings(){closeStoreFlow();closeSpotlight();syncThemeControls();settingsSheet.classList.add('open');settingsSheet.setAttribute('aria-hidden','false');activeSheet=settingsSheet;window.NativeUI?.enter(settingsSheet.querySelector('.sheet-card'))}
function appActionAttributes(app){return projects[app.key]?`data-project="${app.key}"`:app.appId?`data-external-app="${app.appId}"`:`data-url="${app.url}"`}
function portfolioAppRowComponent(app){const action=projects[app.key]?(locale==='fr'?'Voir':'View'):app.appId?copy[app.action.toLowerCase()]:app.internal?copy.development:copy.visit;return `<button class="portfolio-app-row" ${appActionAttributes(app)} aria-label="${action} ${app.name}"><img class="row-icon" src="${app.icon}" alt="${app.name}"><span class="row-copy"><strong>${app.name}</strong><small>${locale==='fr'?app.localizedSubtitle||app.subtitle:app.subtitle}</small></span><span class="get-pill">${action}</span></button>`}
function openSourceRowComponent(repo){return `<button class="portfolio-app-row" data-source="${repo.id}" aria-label="${locale==='fr'?'Voir la fiche de':'View details for'} ${repo.name}"><img class="row-icon oss-icon" src="${repo.image}" alt="" loading="lazy"><span class="row-copy"><strong>${repo.name}</strong><small>${repo.subtitle[locale]}</small></span><span class="get-pill">${locale==='fr'?'Voir':'View'}</span></button>`}
function chunkItems(items,size=3){const chunks=[];for(let i=0;i<items.length;i+=size)chunks.push(items.slice(i,i+size));return chunks}
function appSectionComponent(title,apps,group,row=portfolioAppRowComponent){return `<section class="app-section" id="apps-${group}" data-app-group="${group}" aria-labelledby="apps-${group}-title"><header class="app-section-head"><h2 id="apps-${group}-title">${title}</h2></header><div class="app-section-rail">${chunkItems(apps,group==='open-source'?apps.length:3).map(chunk=>`<div class="app-section-card">${chunk.map(row).join('')}</div>`).join('')}</div></section>`}
function renderAppSections(group='all'){document.getElementById('appPortfolioSections').innerHTML=group==='open-source'?appSectionComponent('Open source',openSourceProjects,'open-source',openSourceRowComponent):group==='my'?appSectionComponent(copy.my,myApps,'my'):group==='client'?appSectionComponent(copy.client,clientApps,'client'):appSectionComponent(copy.my,myApps,'my')+appSectionComponent(copy.client,clientApps,'client')}
function developerAppRowComponent(app){return `<button class="dev-app-row" ${appActionAttributes(app)}><img class="dev-art" src="${app.icon}" alt="${app.name} icon"><span class="dev-copy"><strong>${app.name}</strong><small>${app.subtitle}</small></span><span class="get-pill">${projects[app.key]?(locale==='fr'?'Voir':'View'):app.action}</span></button>`}
function developerColumnComponent(apps){return `<div class="developer-column">${apps.map(developerAppRowComponent).join('')}</div>`}
function renderPortfolioComponents(){
 document.getElementById('appsNativeHeader').innerHTML=UIComponents.navigationBar(copy.app,{titleId:'appsPageTitle'});
 document.getElementById('aboutNativeHeader').innerHTML=UIComponents.navigationBar('About');
 document.getElementById('labNativeHeader').innerHTML=UIComponents.navigationBar('Cutiz');
 document.getElementById('resourcesNativeHeader').innerHTML=UIComponents.navigationBar('Resources');
 document.getElementById('developerNativeHeader').innerHTML=UIComponents.navigationBar('Appbiz Studio, LLC',{large:false,backAttribute:'data-developer-back'});
 document.getElementById('projectNativeHeader').innerHTML=UIComponents.navigationBar('',{large:false,titleId:'projectPageHeader',backAttribute:'data-project-back'});
 document.getElementById('sourceNativeHeader').innerHTML=UIComponents.navigationBar('Open source',{large:false,backAttribute:'data-source-back'});
 renderAppSections();
 document.getElementById('latestRelease').innerHTML=`<img class="dev-art" src="${appbizApps[0].icon}" alt="${appbizApps[0].name} icon"><div class="dev-copy"><strong>${appbizApps[0].name}</strong><small>${appbizApps[0].subtitle}</small></div><button class="get-pill" data-external-app="${appbizApps[0].appId}">${appbizApps[0].action}</button>`;
 document.getElementById('developerPages').innerHTML=developerColumnComponent(appbizApps.slice(0,3))+developerColumnComponent(appbizApps.slice(3,6))+developerColumnComponent(appbizApps.slice(6,9));
}
const siteSearchContext='Abdoul Appbiz Studio portfolio mobile apps products projects builder mode currently shipping contact profile developer';
function searchDatabase(){
 const appRecords=appbizApps.map(app=>{
   const project=projects[app.key];
   return {section:app.group==='client'?copy.client:copy.my,key:app.key,name:app.name,subtitle:locale==='fr'?app.localizedSubtitle||app.subtitle:app.subtitle,icon:app.icon,project,action:project?'project':'external',appId:app.appId,searchText:[siteSearchContext,app.name,app.subtitle,app.localizedSubtitle,project?.category,project?.tagline,project?.description,...(project?.meta||[])].filter(Boolean).join(' ')};
 });
 const sourceRecords=openSourceProjects.map(repo=>({section:'Open source',key:repo.id,name:repo.name,subtitle:repo.subtitle[locale],source:repo,action:'source',searchText:[repo.name,repo.subtitle.fr,repo.subtitle.en,repo.description.fr,repo.description.en,...repo.stack,'github open source code'].join(' ')}));
 const pageRecords=[
   {section:'Pages & Actions',key:'apps',name:locale==='fr'?'Apps et code':'Apps & code',subtitle:locale==='fr'?'Mes apps · Apps clients · Open source':'My apps · Client apps · Open source',action:'page',page:'apps',searchText:`${siteSearchContext} apps code my apps mes apps apps clients open source github appbiz studio`},
   {section:'Pages & Actions',key:'resources',name:copy.resource,subtitle:locale==='fr'?'Guides, outils et idées':'Guides, tools & ideas',action:'page',page:'resources',searchText:'resources ressources links tools liens outils ideas bibliothèque library'},
   {section:'Pages & Actions',key:'lab',name:locale==='fr'?'Labo':'Lab',subtitle:locale==='fr'?'Cutiz · En développement':'Cutiz · Work in progress',action:'page',page:'lab',searchText:'lab labo workbench atelier experiments expériences cutiz video vidéo editing montage'},
   {section:'Pages & Actions',key:'about',name:`${copy.about} Abdoul`,subtitle:locale==='fr'?'Profil · créateur de produits':'Profile · product builder',action:'page',page:'about',searchText:`${siteSearchContext} about à propos abdoul profile profil product builder créateur`},
   {section:'Pages & Actions',key:'settings',name:copy.settings,subtitle:locale==='fr'?'Apparence · Mode sombre':'Appearance · Dark Mode',action:'settings',searchText:`${siteSearchContext} settings réglages appearance apparence dark sombre light clair mode theme thème`},
   {section:'Pages & Actions',key:'contact',name:copy.contact,subtitle:locale==='fr'?'E-mail · WhatsApp · LinkedIn':'Email · WhatsApp · LinkedIn',action:'contact',searchText:`${siteSearchContext} contact e-mail email dm web hello`}
 ];
 return [...appRecords,...sourceRecords,...pageRecords];
}
function searchResultMarkup(item){
 const action=item.action==='project'?`data-project="${item.key}"`:item.action==='source'?`data-source="${item.key}"`:item.action==='page'?`data-page="${item.page}"`:item.action==='url'?`data-url="${item.url}"`:item.action==='settings'?'data-settings':item.action==='contact'?'data-contact':`data-external-app="${item.appId}"`;
 const symbol=item.action==='source'||item.action==='url'?'code':({apps:'apps',about:'about',lab:'lab',resources:'resources',settings:'settings',contact:'mail'}[item.key]||'apps');
 const fallbackIcon=`<span class="app-icon icon-${symbol}">${uiIcon(symbol)}</span>`;
 const icon=item.icon?`<span class="app-icon real-icon"><img src="${item.icon}" alt=""></span>`:item.source?`<span class="app-icon real-icon"><img src="${item.source.image}" alt=""></span>`:item.project?`<span class="app-icon ${iconClass(item.project)}">${iconHTML(item.project)}</span>`:fallbackIcon;
 return `<button class="search-result" ${action}><span class="result-icon">${icon}</span><span><strong>${item.name}</strong><small>${item.subtitle}</small></span><span class="result-chevron">${uiIcon('chevron')}</span></button>`;
}
function renderSearch(q=''){
 const normalized=q.trim().toLowerCase();
 const records=searchDatabase().filter(item=>!normalized||[item.searchText,translatedText(item.name),translatedText(item.subtitle)].join(' ').toLowerCase().includes(normalized));
 const order=[copy.my,copy.client,'Open source','Pages & Actions'];
 const sections=order.map(section=>({section,items:records.filter(item=>item.section===section)})).filter(group=>group.items.length);
 if(!sections.length){searchResults.innerHTML='<div class="search-empty"><strong>No results</strong><span>Try another app, project, page or keyword.</span></div>';return}
 searchResults.innerHTML=sections.map(group=>`<section class="search-section" aria-label="${group.section}"><div class="search-section-heading"><span>${group.section}</span></div><div class="search-rail">${chunkItems(group.items).map(chunk=>`<div class="search-column">${chunk.map(searchResultMarkup).join('')}</div>`).join('')}</div></section>`).join('');
 hydrateProfiles(searchResults);
}
function openSpotlight(){closeSheets();spotlight.classList.add('open');renderSearch('');setTimeout(()=>searchInput.focus(),120)}function closeSpotlight(){spotlight.classList.remove('open');searchInput.value=''}
function showStoreToast(message){storeToast.textContent=message;storeToast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>storeToast.classList.remove('show'),1500)}
function openShot(index,shots=activeViewerShots){activeViewerShots=shots;activeShot=Math.max(0,Math.min(shots.length-1,index));viewerImage.src=shots[activeShot];viewerCount.textContent=`${activeShot+1} of ${shots.length}`;screenshotViewer.classList.add('open');screenshotViewer.setAttribute('aria-hidden','false')}
function stepShot(direction){openShot((activeShot+direction+activeViewerShots.length)%activeViewerShots.length)}
function renderDeviceRail(device){const shots=device==='ipad'?ipadShots:iphoneShots;deviceSheetRail.classList.toggle('ipad',device==='ipad');deviceSheetRail.innerHTML=shots.map((src,i)=>`<img src="${src}" alt="${device} preview ${i+1}">`).join('');document.querySelectorAll('[data-preview-device]').forEach(b=>b.classList.toggle('active',b.dataset.previewDevice===device));deviceSheetRail.scrollLeft=0}
async function copyFaithLink(){try{await navigator.clipboard.writeText(faithStoreURL)}catch{const t=document.createElement('textarea');t.value=faithStoreURL;document.body.appendChild(t);t.select();document.execCommand('copy');t.remove()}showStoreToast('Link copied');closeStoreSheets()}
async function sharePortfolio(){
 const url=location.href.split('#')[0];
 if(navigator.share){try{await navigator.share({title:document.title,url});return}catch(error){if(error.name==='AbortError')return}}
 try{await navigator.clipboard.writeText(url)}catch{
  const input=document.createElement('textarea');input.value=url;document.body.append(input);input.select();document.execCommand('copy');input.remove();
 }
 showStoreToast(locale==='fr'?'Lien copié':'Link copied');
}

document.addEventListener('click',e=>{
  if(e.target.closest('[data-store-back]')){closeStoreFlow(true);return}
  if(e.target.closest('[data-developer-open]')){openDeveloper();return}
  if(e.target.closest('[data-developer-back]')){closeDeveloper();return}
  if(e.target.closest('[data-share-open]')){openStoreSheet('shareSheet');return}
  if(e.target.closest('[data-device-open]')){renderDeviceRail('iphone');openStoreSheet('deviceSheet');return}
  if(e.target.closest('[data-purchases-open]')){openStoreSheet('purchasesSheet');return}
  if(e.target.closest('[data-privacy-open]')){openStoreSheet('privacySheet');return}
  if(e.target.closest('[data-sheet-close]')){closeStoreSheets();return}
  if(e.target.closest('[data-viewer-close]')){closeViewer();return}
  const projectShot=e.target.closest('[data-project-shot]');if(projectShot){openShot(Number(projectShot.dataset.projectShot),storeListings[activeProjectKey].screenshots);return}
  const shot=e.target.closest('[data-shot]');if(shot){openShot(Number(shot.dataset.shot),iphoneShots);return}
  const device=e.target.closest('[data-preview-device]');if(device){renderDeviceRail(device.dataset.previewDevice);return}
  if(e.target.closest('[data-copy-link]')){copyFaithLink();return}
  if(e.target.closest('[data-native-share]')){navigator.share?navigator.share({title:'Faith Lock: Bible Prayer Focus',text:'Stop Scrolling. Start Scripture.',url:faithStoreURL}).catch(()=>{}):copyFaithLink();return}
  if(e.target.closest('[data-faith-open]')){closeStoreSheets();window.open(faithStoreURL,'_blank','noopener');return}
  const external=e.target.closest('[data-external-app]');if(external){window.open(`https://apps.apple.com/app/id${external.dataset.externalApp}`,'_blank','noopener');return}
  const storeGroup=e.target.closest('[data-store-group]');if(storeGroup){projectReturnPage=null;sourceReturnPage=null;openPage('apps',storeGroup.dataset.storeGroup);return}
  if(e.target.closest('[data-store-search]')){if(activePage?.id==='projectPage')closeProjectPage();else if(activePage?.id==='sourcePage')closeSourceProject();else closeStoreFlow();setTimeout(openSpotlight,280);return}
  if(e.target.closest('#faithDescriptionMore')){const wrap=document.getElementById('faithDescriptionWrap'),description=document.getElementById('faithDescription'),button=document.getElementById('faithDescriptionMore'),expanded=!description.classList.contains('expanded');description.classList.toggle('expanded',expanded);wrap.classList.toggle('expanded',expanded);button.textContent=expanded?'less':'more';button.setAttribute('aria-expanded',String(expanded));return}
  const project=e.target.closest('[data-project]');if(project){openProject(project.dataset.project);return}
  const source=e.target.closest('[data-source]');if(source){openSourceProject(source.dataset.source);return}
  const pg=e.target.closest('[data-page]');if(pg){openPage(pg.dataset.page,pg.dataset.appGroup);return}
  if(e.target.closest('[data-project-back]')){closeProjectPage();return}
  if(e.target.closest('[data-source-back]')){closeSourceProject();return}
  if(e.target.closest('[data-back]')){closePages();return}
  if(e.target.closest('[data-settings]')){openSettings();return}
  if(e.target.closest('[data-contact]')){openContact();return}
  if(e.target.closest('[data-share-portfolio]')){sharePortfolio();return}
  if(e.target.closest('[data-close-sheet]')){closeSheets();return}
  const url=e.target.closest('[data-url]');if(url){window.open(url.dataset.url,'_blank','noopener');return}
  const site=e.target.closest('[data-site]');if(site){const action=site.dataset.site;if(action==='apps'){openPage('apps')}else if(action==='about'){openPage('about')}else if(action==='contact'){document.getElementById('phoneWrap').scrollIntoView({behavior:'smooth',block:'center'});openContact()}else goHome()}
});
document.getElementById('searchTrigger').addEventListener('click',openSpotlight);document.getElementById('closeSearch').addEventListener('click',closeSpotlight);searchInput.addEventListener('input',e=>renderSearch(e.target.value));themeToggle.addEventListener('click',toggleTheme);spotlight.addEventListener('click',e=>{if(e.target===spotlight||e.target===spotlight.firstElementChild)closeSpotlight()});[sheet,contactSheet,settingsSheet].forEach(s=>s.addEventListener('click',e=>{if(e.target===s)closeSheets()}));storeSheets.forEach(s=>s.addEventListener('click',e=>{if(e.target===s)closeStoreSheets()}));island.addEventListener('click',e=>{if(e.target.closest('.island-project-cta')){setIslandExpanded(false);window.open(projects.cutiz.url,'_blank','noopener');return}setIslandExpanded(!island.classList.contains('open'))});
faithStoreScroll.addEventListener('scroll',()=>faithCompact.classList.toggle('visible',faithStoreScroll.scrollTop>150),{passive:true});
developerPages.addEventListener('scroll',()=>{const index=Math.max(0,Math.min(2,Math.round(developerPages.scrollLeft/374)));[...developerDots.children].forEach((dot,i)=>dot.classList.toggle('active',i===index))},{passive:true});
let viewerStartX=0;screenshotViewer.addEventListener('pointerdown',e=>{viewerStartX=e.clientX});screenshotViewer.addEventListener('pointerup',e=>{const dx=e.clientX-viewerStartX;if(Math.abs(dx)>55)stepShot(dx<0?1:-1)});
document.addEventListener('keydown',e=>{if(e.key==='ArrowRight'&&screenshotViewer.classList.contains('open'))stepShot(1);else if(e.key==='ArrowLeft'&&screenshotViewer.classList.contains('open'))stepShot(-1);else if(e.key==='Escape'){if(screenshotViewer.classList.contains('open'))closeViewer();else if(activeStoreSheet)closeStoreSheets();else if(activeStorePage===developerStore)closeDeveloper();else if(activeStorePage)closeStoreFlow();else if(spotlight.classList.contains('open'))closeSpotlight();else if(activeSheet)closeSheets();else if(activePage?.id==='readerPage')openPage('resources');else if(activePage)closePages();else setIslandExpanded(false)}});
const deviceStage=document.querySelector('.device-stage'),phoneWrap=document.getElementById('phoneWrap');
const presentationRoot=document.documentElement;
const presentationUA=navigator.userAgent||'';
const presentationPlatform=navigator.platform||'';
const presentationTouchPoints=navigator.maxTouchPoints||0;
const presentationPreview=location.hostname==='terminal.local'?new URLSearchParams(location.search).get('platform'):null;
const presentationIOS=presentationPreview==='ios'||/iPhone|iPod/i.test(presentationUA)||(/Mac/i.test(presentationPlatform)&&presentationTouchPoints>1&&Math.min(innerWidth,innerHeight)<600);
const presentationAndroid=presentationPreview==='android'||(/Android/i.test(presentationUA)&&/Mobile/i.test(presentationUA));
const presentationPhone=presentationIOS||presentationAndroid;
presentationRoot.classList.toggle('platform-ios-phone',presentationIOS);
presentationRoot.classList.toggle('platform-android-phone',presentationAndroid);
presentationRoot.classList.toggle('platform-phone',presentationPhone);
let fitFrame=0;
function fitDevice(){
  const viewport=window.visualViewport;
  // Native pinch zoom must magnify the existing layout, not shrink it to the zoomed viewport.
  if(presentationPhone&&viewport?.scale>1)return;
  const viewportWidth=Math.max(1,viewport?.width||document.documentElement.clientWidth||innerWidth);
  const viewportHeight=Math.max(1,viewport?.height||document.documentElement.clientHeight||innerHeight);
  const viewportLeft=Math.max(0,viewport?.offsetLeft||0);
  const viewportTop=Math.max(0,viewport?.offsetTop||0);
  const root=presentationRoot;
  root.style.setProperty('--viewport-left',`${viewportLeft}px`);
  root.style.setProperty('--viewport-top',`${viewportTop}px`);
  root.style.setProperty('--viewport-width',`${viewportWidth}px`);
  root.style.setProperty('--viewport-height',`${viewportHeight}px`);
  const phonePortrait=presentationPhone&&(presentationIOS||innerHeight>innerWidth);
  root.classList.toggle('phone-portrait',phonePortrait);
  const stageStyle=getComputedStyle(deviceStage);
  const horizontalInset=(parseFloat(stageStyle.paddingLeft)||0)+(parseFloat(stageStyle.paddingRight)||0);
  const verticalInset=(parseFloat(stageStyle.paddingTop)||0)+(parseFloat(stageStyle.paddingBottom)||0);
  const availableWidth=Math.max(1,viewportWidth-horizontalInset);
  const availableHeight=Math.max(1,viewportHeight-verticalInset);
  root.classList.toggle('phone-short',phonePortrait&&availableHeight<690);
  root.classList.toggle('keyboard-open',presentationPhone&&innerHeight-viewportHeight>120);
  root.style.setProperty('--keyboard-inset',`${Math.max(0,innerHeight-viewportHeight)}px`);
  root.classList.toggle('phone-very-short',phonePortrait&&availableHeight<590);
  if(phonePortrait){
    phoneWrap.style.width=`${availableWidth}px`;
    phoneWrap.style.height=`${availableHeight}px`;
    phoneWrap.style.setProperty('--device-scale','1');
    return;
  }
  phoneWrap.style.width='402px';
  phoneWrap.style.height='874px';
  const scale=Math.max(.05,Math.min(1,availableWidth/402,availableHeight/874));
  phoneWrap.style.setProperty('--device-scale',scale.toFixed(6));
}
function scheduleDeviceFit(){cancelAnimationFrame(fitFrame);fitFrame=requestAnimationFrame(fitDevice)}
const horizontalRails='.app-section-rail,.search-rail,.store-rail,.store-facts,.developer-pages,.device-sheet-rail';
function prepareHorizontalScroll(root=document){
 const rails=[...(root.matches?.(horizontalRails)?[root]:[]),...root.querySelectorAll(horizontalRails)];
 rails.forEach(rail=>{
  if(!rail.classList.contains('horizontal-scroll'))rail.classList.add('horizontal-scroll');if(rail.tabIndex!==0)rail.tabIndex=0;
  if(!rail.hasAttribute('aria-label'))rail.setAttribute('aria-label',locale==='fr'?'Défilement horizontal':'Horizontal scrolling');
 });
}
let railDrag=null,suppressRailClick=null;
document.addEventListener('pointerdown',e=>{
 const rail=e.target.closest(horizontalRails);
 if(e.pointerType!=='mouse'||e.button!==0||!rail||rail.scrollWidth<=rail.clientWidth)return;
 railDrag={rail,startX:e.clientX,startY:e.clientY,startScroll:rail.scrollLeft,id:e.pointerId,moved:false,lastX:e.clientX,time:e.timeStamp,velocity:0};
});
document.addEventListener('pointermove',e=>{
 if(!railDrag||e.pointerId!==railDrag.id)return;
 const d=railDrag,dx=e.clientX-d.startX;
 if(!d.moved){
  if(Math.abs(e.clientY-d.startY)>Math.abs(dx)+6){railDrag=null;return}
  if(Math.abs(dx)<6)return;
  d.moved=true;d.rail.setPointerCapture(e.pointerId);d.rail.classList.add('is-dragging');
 }
 e.preventDefault();
 const scale=d.rail.getBoundingClientRect().width/d.rail.offsetWidth||1;
 d.velocity=(d.lastX-e.clientX)/Math.max(1,e.timeStamp-d.time)/scale;d.lastX=e.clientX;d.time=e.timeStamp;
 d.rail.scrollLeft=d.startScroll-dx/scale;
});
function endRailDrag(event){
 if(!railDrag)return;
 const d=railDrag;railDrag=null;
 if(d.moved){suppressRailClick=d.rail;setTimeout(()=>{suppressRailClick=null},200)}
 d.rail.classList.remove('is-dragging');
 if(d.moved&&event.type!=='pointercancel'&&event.timeStamp-d.time<100&&!matchMedia('(prefers-reduced-motion: reduce)').matches)d.rail.scrollBy({left:Math.max(-d.rail.clientWidth,Math.min(d.rail.clientWidth,d.velocity*180)),behavior:'smooth'});
 if(d.rail.hasPointerCapture(d.id))d.rail.releasePointerCapture(d.id);
}
document.addEventListener('pointerup',endRailDrag);
document.addEventListener('pointercancel',endRailDrag);
document.addEventListener('click',e=>{if(suppressRailClick?.contains(e.target)){e.preventDefault();e.stopImmediatePropagation();suppressRailClick=null}},true);
document.addEventListener('dragstart',e=>{if(e.target.closest(horizontalRails))e.preventDefault()});
document.addEventListener('keydown',e=>{
 const rail=e.target.closest(horizontalRails);
 if(!rail||!['ArrowLeft','ArrowRight'].includes(e.key)||e.target.closest('input,textarea,select'))return;
 e.preventDefault();rail.scrollBy({left:(e.key==='ArrowRight'?1:-1)*rail.clientWidth*.85,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
});
const translationLookup=new Map();
const normalizeTranslation=text=>text.trim().replace(/\s+/g,' ');
translationPairs.forEach(pair=>pair.forEach(text=>translationLookup.set(normalizeTranslation(text),pair)));
function translatedText(text){const pair=translationLookup.get(normalizeTranslation(text||''));return pair?pair[locale==='fr'?1:0]:text}
let translationObserver=null,translationFrame=0;
const translationRoots=new Set();
const translationOptions={childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['aria-label','placeholder','title']};
function translatePage(root=document.body){
 translationObserver?.disconnect();
 prepareHorizontalScroll(root);
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
 while(walker.nextNode()){
  const node=walker.currentNode;
  if(node.parentElement?.closest('script,style,svg,textarea,.pdf-page'))continue;
  const original=node.nodeValue,trimmed=original.trim(),translated=translatedText(trimmed);
  if(translated!==trimmed)node.nodeValue=original.replace(trimmed,translated);
 }
 const attrSelector='[aria-label],[placeholder],[title]';
 [...(root.matches?.(attrSelector)?[root]:[]),...root.querySelectorAll(attrSelector)].forEach(el=>{
  for(const attr of ['aria-label','placeholder','title']){
   const original=el.getAttribute(attr);if(!original)continue;
   const translated=translatedText(original);if(translated!==original)el.setAttribute(attr,translated);
  }
 });
 root.querySelectorAll('.portfolio-app-row').forEach(row=>{
  const label=`${row.querySelector('.get-pill').textContent} ${row.querySelector('.row-copy strong').textContent}`;
  if(row.getAttribute('aria-label')!==label)row.setAttribute('aria-label',label);
 });
 if(document.documentElement.lang!==locale)document.documentElement.lang=locale;
 if(document.title!=='Abdoul — I Build Useful Products')document.title='Abdoul — I Build Useful Products';
 translationObserver?.observe(screenEl,translationOptions);
}
const languageSelect=document.getElementById('languageSelect');
languageSelect.value=locale;
function setLanguage(language){
 if(!['fr','en'].includes(language))return;
 locale=language;copy=copyByLanguage[locale];languageSelect.value=locale;
 try{localStorage.setItem('abdoul-portfolio-language',locale)}catch{}
 localizeContact();syncThemeControls();renderAppSections(appsPage.dataset.activeGroup||'all');document.getElementById('appsPageTitle').textContent=appsPage.dataset.activeGroup==='my'?copy.my:appsPage.dataset.activeGroup==='client'?copy.client:appsPage.dataset.activeGroup==='open-source'?'Open source':copy.app;syncAppsIntro();renderSearch(searchInput.value);if(activeProjectKey&&activePage?.id==='projectPage')renderProject(activeProjectKey);if(activeSourceId&&activePage?.id==='sourcePage')renderSourceProject(activeSourceId);window.ResourceLibrary?.localize();translatePage();
}
languageSelect.addEventListener('change',()=>setLanguage(languageSelect.value));
function tick(){const d=new Date();document.getElementById('clock').textContent=d.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit',hour12:false})}
renderPortfolioComponents();hydrateProfiles();syncThemeControls();scheduleDeviceFit();
if(navigator.maxTouchPoints>0&&matchMedia('(max-width:600px)').matches)setTimeout(()=>{
 const home=document.getElementById('homeView'),dock=home?.querySelector('.home-dock');
 if(!home||!dock||!home.getClientRects().length||getComputedStyle(home).visibility==='hidden')return;
 const viewport=window.visualViewport,visibleBottom=(viewport?.offsetTop||0)+(viewport?.height||innerHeight);
 if(dock.getBoundingClientRect().bottom>visibleBottom-12)home.scrollTo({top:home.scrollHeight,behavior:'smooth'});
},3000);
addEventListener('resize',scheduleDeviceFit,{passive:true});
addEventListener('orientationchange',scheduleDeviceFit,{passive:true});
addEventListener('pageshow',scheduleDeviceFit,{passive:true});
if(window.visualViewport){visualViewport.addEventListener('resize',scheduleDeviceFit,{passive:true});visualViewport.addEventListener('scroll',scheduleDeviceFit,{passive:true})}
if(document.fonts?.ready)document.fonts.ready.then(scheduleDeviceFit);
setTimeout(scheduleDeviceFit,120);setTimeout(scheduleDeviceFit,500);
tick();setInterval(()=>{if(!document.hidden)tick()},30000);renderSearch();
document.addEventListener('visibilitychange',()=>{document.documentElement.classList.toggle('document-hidden',document.hidden);if(!document.hidden)tick()});

translatePage();
translationObserver=new MutationObserver(records=>{
 for(const record of records){
  const root=record.target.nodeType===Node.TEXT_NODE?record.target.parentElement:record.target;
  if(root?.closest('svg,script,style,textarea,#clock'))continue;
  translationRoots.add(root);
 }
 if(translationRoots.size&&!translationFrame)translationFrame=requestAnimationFrame(()=>{
  translationFrame=0;
  const roots=[...translationRoots].filter(root=>root?.isConnected);translationRoots.clear();
  roots.filter(root=>!roots.some(parent=>parent!==root&&parent.contains(root))).forEach(translatePage);
 });
});
translationObserver.observe(screenEl,translationOptions);
