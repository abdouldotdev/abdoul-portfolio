const assert=require('node:assert/strict');
const preview=require('../api/resource-preview.js');

(async()=>{
 const originalFetch=global.fetch;
 global.fetch=async()=>({ok:true,json:async()=>({resources:[{
  id:'guide-motion-design-publicitaire',title:'Guide motion design publicitaire',description:'Un guide utile',
  cover:'https://jeli.abdoul.dev/cover.webp',coverMimeType:'image/webp'
 }]})});
 const res={headers:{},setHeader(key,value){this.headers[key]=value},status(code){this.statusCode=code;return this},send(body){this.body=body;return this}};
 try{await preview({query:{resource:'guide-motion-design-publicitaire'}},res)}finally{global.fetch=originalFetch}
 assert.match(res.body,/og:image" content="https:\/\/jeli\.abdoul\.dev\/cover\.webp"/);
 assert.match(res.body,/og:url" content="https:\/\/www\.abdoul\.dev\/resources\/guide-motion-design-publicitaire"/);
 assert.match(res.body,/location\.replace\("https:\/\/www\.abdoul\.dev\/\?resource=guide-motion-design-publicitaire"\)/);
 console.log('Resource preview metadata: OK');
})().catch(error=>{console.error(error);process.exitCode=1});
