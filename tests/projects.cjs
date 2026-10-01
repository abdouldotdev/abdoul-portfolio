const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const context=vm.createContext({});
for(const file of ['data/projects.js','data/store-listings.js','data/translations.js'])
 vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context,{filename:file});
const {projects,apps,listings,copy}=vm.runInContext('({projects,apps:appbizApps,listings:storeListings,copy:copyByLanguage})',context);
const expected={
 my:['currenciespro','airpad','jeli','lisiere'],
 client:['fastcash','yorochange','tenbo','burkinarapid','securephone','fastream']
};
for(const [group,keys] of Object.entries(expected))for(const key of keys){
 const app=apps.find(item=>item.key===key);
 assert(app,`${key} missing from app list`);
 assert.equal(app.group,group);
 if(key==='tenbo')continue;
 assert.equal(projects[key]?.group,group);
 assert(fs.existsSync(path.join(root,projects[key].image)),`${key} icon missing`);
 if(listings[key])for(const language of ['fr','en']){
  assert(listings[key].subtitle[language]);
  assert(listings[key].description[language]);
 }
}
assert.equal(copy.fr.client,'Apps clients');
assert.equal(copy.en.client,'Client Apps');
const appScript=fs.readFileSync(path.join(root,'js/app.js'),'utf8');
assert(appScript.includes("appSectionComponent(copy.client,clientApps,'client')"));
console.log('Projects: groups, bilingual details, icons and client section: OK');
