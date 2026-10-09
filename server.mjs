import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const base=path.resolve('dist');
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.avif':'image/avif','.jpg':'image/jpeg','.woff2':'font/woff2','.xml':'application/xml','.txt':'text/plain'};
http.createServer((req,res)=>{let file;try{file=path.resolve(base,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(file!==base&&!file.startsWith(base+path.sep))throw Error();if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');if(!fs.existsSync(file)){res.statusCode=404;file=path.join(base,'404.html');}res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');fs.createReadStream(file).pipe(res);}catch{res.statusCode=400;res.end('Bad request');}}).listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173'));
