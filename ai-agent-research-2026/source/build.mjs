import fs from 'node:fs';
import path from 'node:path';
const root=path.dirname(new URL(import.meta.url).pathname);
const data={cutoff:'2026-11-02',edition:'expert-v2',expert:{}};
for(const chapter of ['overview','models','agents','harness','evolution','cases','impact']){
 const file=path.join(root,'source-data/expert-'+chapter+'.json');
 if(!fs.existsSync(file))throw Error('Missing independent chapter '+chapter);
 data.expert[chapter]=JSON.parse(fs.readFileSync(file,'utf8'));
}
data.principles=fs.readFileSync(path.join(root,'RESEARCH-PRINCIPLES.md'),'utf8');
data.models=data.expert.models.events;data.agents=data.expert.agents.events;data.cases=data.expert.cases.cases;
for(const events of [data.models,data.agents])events.sort((a,b)=>a.month.localeCompare(b.month)||(a.date||a.month).localeCompare(b.date||b.month)||a.name.localeCompare(b.name));
for(const type of ['models','agents'])for(const event of data[type]){
 if(!/^2026-(0[1-9]|10|11)$/.test(event.month))throw Error('Invalid event month '+event.name);
 if(!event.source?.startsWith('https://'))throw Error('Missing source '+event.name);
 if(event.date&&/^\\d{4}-\\d{2}-\\d{2}$/.test(event.date)&&event.date>'2026-11-02')throw Error('Future fact '+event.name);
}
fs.mkdirSync(path.join(root,'dist'),{recursive:true});
for(const file of ['index.html','style.css','enhancements.css','metrics.css','expert.css','app-expert.js'])fs.copyFileSync(path.join(root,file),path.join(root,'dist',file));
fs.writeFileSync(path.join(root,'dist/data.json'),JSON.stringify(data,null,2));
let offline=fs.readFileSync(path.join(root,'index.html'),'utf8');
for(const css of ['style.css','enhancements.css','metrics.css','expert.css'])offline=offline.replace('<link rel="stylesheet" href="'+css+'">',()=>'<style>'+fs.readFileSync(path.join(root,css),'utf8')+'</style>');
let js=fs.readFileSync(path.join(root,'app-expert.js'),'utf8');
offline=offline.replace('<script src="app-expert.js"></script>',()=>'<script type="application/json" id="research-data">'+JSON.stringify(data).replace(/</g,'\\u003c')+'</script><script>'+js+'</script>');
fs.writeFileSync(path.join(root,'dist/offline.html'),offline);
fs.writeFileSync(path.join(root,'dist/index.html'),offline);
console.log(JSON.stringify({models:data.models.length,agents:data.agents.length,cases:data.cases.length,chapters:Object.keys(data.expert)}));
