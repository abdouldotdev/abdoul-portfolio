const endpoint='https://jeli.abdoul.dev/portfolio-resources';
const fallback={
 id:'guide-motion-design-publicitaire',
 title:'Guide motion design publicitaire',
 description:'60 secondes qui vendent : style, copywriting, voix et effets sonores.',
 cover:'https://jeli.abdoul.dev/portfolio-resources/assets/guide-motion-design-cover-sans-texte.webp',
 coverMimeType:'image/webp'
};
const escapeHTML=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

module.exports=async function resourcePreview(req,res){
 const id=req.query?.resource;
 if(typeof id!=='string'||!/^[a-z0-9-]{1,100}$/.test(id))return res.status(404).send('Resource not found');
 let resource;
 try{
  const response=await fetch(endpoint,{signal:AbortSignal.timeout(5000)});
  if(response.ok)resource=(await response.json()).resources?.find(item=>item.id===id);
 }catch{}
 resource??=id===fallback.id?fallback:null;
 if(!resource)return res.status(404).send('Resource not found');
 const shared=`https://www.abdoul.dev/resources/${id}`;
 const reader=`https://www.abdoul.dev/?resource=${id}`;
 const title=escapeHTML(resource.title),description=escapeHTML(resource.description||'');
 let cover='';
 try{const url=new URL(resource.cover);if(url.protocol==='https:'&&!url.username&&!url.password)cover=url.href}catch{}
 const image=cover?`<meta property="og:image" content="${escapeHTML(cover)}"><meta property="og:image:secure_url" content="${escapeHTML(cover)}"><meta property="og:image:type" content="${escapeHTML(resource.coverMimeType||'image/webp')}"><meta name="twitter:image" content="${escapeHTML(cover)}">`:'';
 res.setHeader('Content-Type','text/html; charset=utf-8');
 res.setHeader('Cache-Control','public, s-maxage=300, stale-while-revalidate=3600');
 res.send(`<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>${title} — Abdoul</title><meta name="description" content="${description}"><meta property="og:type" content="article"><meta property="og:locale" content="fr_FR"><meta property="og:url" content="${shared}"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}">${image}<meta name="twitter:card" content="summary_large_image"><link rel="canonical" href="${shared}"><script>location.replace(${JSON.stringify(reader)})</script></head><body><a href="${reader}">Lire la ressource</a></body></html>`);
};
