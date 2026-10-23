// UI localization is separate from canonical research data and stable field IDs.
// Imported and authored text is retained as entered; only known baseline copy is localized.
let dictionary={},keys=[],current='zh';
const textRecords=new WeakMap(),attributeRecords=new WeakMap();
const storageKey='agent-atlas.language.v1';
export const language=()=>current;
function dynamicEnglish(s){return s
.replace(/已选\s*(\d+)\s*个/g,'$1 selected')
.replace(/显示\s*(\d+)\s*\/\s*(\d+)\s*项能力\s*·\s*(\d+)\s*个产品/g,'Showing $1 / $2 capabilities · $3 products')
.replace(/覆盖\s*(\d+)\s*个模块/g,'Across $1 modules')
.replace(/(\d+)\s*项能力/g,'$1 capabilities')
.replace(/(\d+)\s*个产品/g,'$1 products')
.replace(/(\d+)\s*个模块/g,'$1 modules')
.replace(/(\d+)\s*个字段/g,'$1 fields')
.replace(/(\d+)\s*字段/g,'$1 fields')
.replace(/(\d+)\s*条解析记录/g,'$1 parsed records')
.replace(/(\d+)\s*项/g,'$1 items')
.replace(/查看 (.+) 详情/g,'View $1 details')
.replace(/应用第 (\d+) 条记录/g,'Apply record $1')
.replace(/第 (\d+) 条目标字段/g,'Target field for record $1')
.replace(/模块仍有 (\d+) 个字段，请先移动或删除字段/g,'This module has $1 fields. Move or delete them first.')
.replace(/将删除“(.+)”及所有产品的对应结论。/g,'Delete “$1” and its findings for every product.')
.replace(/将移除空模块“(.+)”。/g,'Remove the empty module “$1”.')
.replace(/包含 (\d+) 个产品、(\d+) 个模块、(\d+) 个字段。/g,'Contains $1 products, $2 modules and $3 fields.')
.replace(/本地草稿基于旧版数据。请先导出备份，再到变更记录恢复初始数据以加载新基线。/g,'This local draft uses an older baseline. Export a backup, then restore the baseline in Change history.')
.replace(/本地存储不可用或草稿格式不兼容，已载入网站初始数据。编辑后请检查保存提示。/g,'Local storage is unavailable or the draft is incompatible. The initial dataset was loaded. Check save messages after editing.')
.replace(/看板加载失败：/g,'Dashboard failed to load: ')
.replace(/。请刷新页面或检查数据文件。/g,'. Refresh the page or check the data file.')
.replace(/第 (\d+) 条不是能力对象/g,'Record $1 is not a capability object')
.replace(/第 (\d+) 条缺少功能名/g,'Record $1 is missing a capability name')
.replace(/第 (\d+) 条来源必须是 http\(s\) 链接/g,'Record $1 needs an HTTP(S) source URL')
.replace(/第 (\d+) 条日期需为 YYYY-MM-DD/g,'Record $1 date must use YYYY-MM-DD')
.replace(/第 (\d+) 行列数与表头不一致/g,'Row $1 has a different column count from the header')
.replace(/无法识别状态“(.+)”。请使用 有、无、条件支持 或 待核实。/g,'Unrecognized status “$1”. Use yes, no, partial or unknown.')
.replace(/报告中同一功能重复：/g,'Duplicate capability in report: ')
.replace(/新增功能“(.+)”缺少 module/g,'New capability “$1” is missing module')
.replace(/未知 featureId：(.+)。新增字段请只填写 module 与 feature。/g,'Unknown featureId: $1. For new fields, provide module and feature only.')
.replace(/导入报告中的“后续接入”/g,'Future integration in Report import');}
export function english(value){const source=String(value??'');let trimmed=source.trim();if(Object.hasOwn(dictionary,trimmed))return source.replace(trimmed,dictionary[trimmed]);let out=dynamicEnglish(source);for(let key of keys)if(out.includes(key))out=out.split(key).join(dictionary[key]);return out}
export const translate=value=>current==='en'?english(value):String(value??'');
export function canonicalQuery(q,data){if(!q.trim())return q;let query=q.toLowerCase();let pool=[...data.features.flatMap(f=>[f.name,f.description]),...data.modules.map(m=>m.name),...Object.values(data.capabilities).flatMap(cs=>Object.values(cs).flatMap(c=>[c.summary,c.detail]))];let matches=pool.filter(s=>english(s).toLowerCase().includes(query));return matches.length?{query,matches}:q}
export function canonicalReport(report,data){if(!report.capabilities)return report;return {...report,capabilities:report.capabilities.map(r=>{let f=data.features.find(f=>english(f.name).toLowerCase()===r.feature.toLowerCase());let m=data.modules.find(m=>english(m.name).toLowerCase()===r.module.toLowerCase());return {...r,feature:f?.name||r.feature,module:m?.name||r.module}})}}
function processText(node){if(node.parentElement?.closest('script,style,textarea,pre,code,[data-no-translate]'))return;let source=node.nodeValue,record=textRecords.get(node);if(record&&(source===record.output||source===record.source))source=record.source;else if(!/[\u3400-\u9fff]/.test(source))return;let output=current==='en'?english(source):source;if(output!==node.nodeValue)node.nodeValue=output;textRecords.set(node,{source,output})}
function processAttributes(el){if(el.closest?.('[data-no-translate]'))return;let records=attributeRecords.get(el)||{};for(let name of ['title','aria-label','placeholder','alt']){let value=el.getAttribute(name);if(value===null)continue;let record=records[name],source=value;if(record&&(value===record.output||value===record.source))source=record.source;let output=current==='en'?english(source):source;if(output!==value)el.setAttribute(name,output);records[name]={source,output}}attributeRecords.set(el,records)}
export function localize(root=document){let walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;while(n=walker.nextNode())processText(n);root.querySelectorAll?.('[title],[aria-label],[placeholder],[alt]').forEach(processAttributes);document.documentElement.lang=current==='en'?'en':'zh-CN';document.querySelectorAll('a[href="framework.html"],a[href="framework-en.html"]').forEach(a=>a.setAttribute('href',current==='en'?'framework-en.html':'framework.html'));document.querySelectorAll('a[href="integration.md"],a[href="integration-en.md"]').forEach(a=>a.setAttribute('href',current==='en'?'integration-en.md':'integration.md'));document.querySelectorAll('[data-language]').forEach(b=>{b.classList.toggle('selected',b.dataset.language===current);b.setAttribute('aria-pressed',String(b.dataset.language===current))});}
export function setLanguage(lang){current=lang==='en'?'en':'zh';try{localStorage.setItem(storageKey,current)}catch{}localize();window.dispatchEvent(new CustomEvent('atlas-language-change',{detail:current}));}
export async function initLocale(){const response=await fetch('./en.json');if(!response.ok)throw Error('Could not load language resources');dictionary=await response.json();keys=Object.keys(dictionary).filter(k=>k.length>=2).sort((a,b)=>b.length-a.length);try{current=localStorage.getItem(storageKey)==='en'?'en':'zh'}catch{}let mount=document.querySelector('.top-actions');if(mount){let control=document.createElement('div');control.className='language-switch';control.setAttribute('role','group');control.setAttribute('aria-label','界面语言');control.setAttribute('data-no-translate','');control.innerHTML='<button type="button" data-language="zh" aria-label="切换为中文 / Switch to Chinese">ZH</button><button type="button" data-language="en" aria-label="Switch to English / 切换为英文">EN</button>';mount.prepend(control)}document.addEventListener('click',e=>{let b=e.target.closest('[data-language]');if(b)setLanguage(b.dataset.language)});let queued=false;new MutationObserver(()=>{if(!queued){queued=true;queueMicrotask(()=>{queued=false;localize()})}}).observe(document.documentElement,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['title','aria-label','placeholder','alt']});window.addEventListener('storage',e=>{if(e.key===storageKey)setLanguage(e.newValue)});localize();}
