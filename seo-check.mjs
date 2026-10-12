import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const site=(process.env.SITE_URL||'https://shoxil.com').replace(/^http:/,'https:').replace(/\/$/,'');
const titles=new Set(),descriptions=new Set(),canonicals=new Set(),indexable=[];
let count=0;
function check(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
 const file=path.join(dir,entry.name);if(entry.isDirectory()){check(file);continue;}if(!file.endsWith('.html'))continue;
 const html=fs.readFileSync(file,'utf8');count++;
 const title=html.match(/<title>(.*?)<\/title>/)[1],description=html.match(/name="description" content="([^"]+)"/)[1],canonical=html.match(/rel="canonical" href="([^"]+)"/)[1];
 assert.match(title,/shoxil/i);assert(!titles.has(title),'Duplicate title');assert(!descriptions.has(description),'Duplicate description');assert(!canonicals.has(canonical),'Duplicate canonical');
 titles.add(title);descriptions.add(description);canonicals.add(canonical);assert(canonical.startsWith(site+'/'),'Canonical uses wrong host');assert(html.includes('og:site_name" content="shoxil"'));
 if(!html.includes('noindex,follow'))indexable.push(canonical);
 const graph=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
 const org=graph.find(n=>n['@type']==='Organization');assert.equal(org['@id'],site+'/#organization');assert.equal(org.email,'ysj3337139@126.com');
 if(path.relative('dist',file)==='index.html'){const websites=graph.filter(n=>n['@type']==='WebSite');assert.equal(websites.length,1);assert.equal(websites[0].url,site+'/');assert.equal(websites[0].publisher['@id'],org['@id']);assert(!html.includes('noindex'));}
}}
check('dist');
const sitemap=fs.readFileSync('dist/sitemap.xml','utf8');const urls=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);assert.deepEqual(urls.sort(),indexable.sort());assert.equal(new Set(urls).size,urls.length);
assert(fs.readFileSync('dist/robots.txt','utf8').includes(`Sitemap: ${site}/sitemap.xml`));
console.log(`PASS: ${count} unique brand titles, descriptions and canonicals; linked brand schema; crawlable homepage; sitemap matches indexable pages.`);
