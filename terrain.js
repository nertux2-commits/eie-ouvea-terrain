// v1.9 – Zéro papier : carnet de terrain (texte, dictée, mémo vocal, photo, GPS), préparation du téléphone, écran allumé pendant les chronos
(function(){
const LIEUX=['','M1','M2','M3','P1','O1','F1','F2','F3','F4','Hors placette'];
const PROTS=['','Plantes','Reptiles','Fourmis','Oiseaux','Général'];
const TB=()=>S.tab==='carnet'?(S.prevTab||''):S.tab;
const curProt=()=>({plantes:'Plantes',florule:'Plantes',reptiles:'Reptiles',fourmis:'Fourmis',oiseaux:'Oiseaux'})[TB()]||'Général';
const curLieu=()=>TB()==='fourmis'?(S.poste||''):TB()==='oiseaux'?'O1':(['plantes','florule'].includes(TB())?S.carre:'');

/* ---------- Carnet de terrain ---------- */
SCH.note={titre:'Note de terrain',ctx:[],f:[
 ['texte','Note (astuce : touchez le micro du clavier pour dicter)','area',null,true],
 ['protocole','Protocole','sel',PROTS],['lieu','Lieu','sel',LIEUX],
 ['gps','Point GPS','gps'],['photos','Photos et mémos vocaux','photo']],
 lab:r=>`${r.date||''} ${hhmm(r.ts)} – ${r.protocole||''} ${r.lieu||''} – ${String(r.texte||'').slice(0,70)}`};
if(!SHEETS.some(x=>x[0]==='note'))SHEETS.push(['note','Carnet_notes']);

// vignette : image ou lecteur audio
const _thumb=thumb;thumb=async function(id){const p=await pGet(id);if(p&&/^data:audio/.test(p.data||''))return h('audio',{controls:true,src:p.data,class:'aud'});return _thumb(id)};

// enregistrement vocal
let REC=null;
async function recordVoice(onDone){
 if(!navigator.mediaDevices||!window.MediaRecorder){toast('Enregistrement audio non disponible sur ce téléphone',true);return}
 let stream;try{stream=await navigator.mediaDevices.getUserMedia({audio:true})}catch(e){toast('Micro refusé : autorisez le micro pour cette appli',true);return}
 const mime=['audio/webm;codecs=opus','audio/mp4','audio/webm'].find(m=>MediaRecorder.isTypeSupported&&MediaRecorder.isTypeSupported(m))||'';
 const mr=new MediaRecorder(stream,mime?{mimeType:mime,audioBitsPerSecond:32000}:undefined);const ch=[];let t0=Date.now();
 const lab=h('span',{},'00:00');const stop=()=>{if(mr.state!=='inactive')mr.stop()};
 const ov=h('div',{class:'recov'},h('div',{class:'recdot'}),h('div',{style:'font-size:20px;font-weight:700'},'Enregistrement… ',lab),h('div',{class:'muted',style:'color:#fff'},'2 minutes maximum'),h('button',{class:'btn',onclick:stop},'■ Arrêter et garder'));
 document.body.append(ov);const iv=setInterval(()=>{const s=Math.floor((Date.now()-t0)/1000);lab.textContent=`${pad(Math.floor(s/60),2)}:${pad(s%60,2)}`;if(s>=120)stop()},250);
 mr.ondataavailable=e=>{if(e.data.size)ch.push(e.data)};
 mr.onstop=async()=>{clearInterval(iv);stream.getTracks().forEach(t=>t.stop());ov.remove();REC=null;
  const blob=new Blob(ch,{type:mr.mimeType||mime||'audio/webm'});if(blob.size<500){toast('Enregistrement vide',true);return}
  const data=await new Promise(ok=>{const fr=new FileReader();fr.onload=()=>ok(fr.result);fr.readAsDataURL(blob)});
  const id=uid();await pPut({id,rec:null,label:'memo_vocal',data,ts:now(),obs:S.obs,dev:S.dev,synced:false});onDone(id,Math.round((Date.now()-t0)/1000))};
 REC=mr;mr.start(1000);
}
async function quickVoice(){recordVoice(async(id,sec)=>{const rec=newRec('note',{protocole:curProt(),lieu:curLieu()});rec.texte=`Mémo vocal (${sec} s)`;rec.photos=[id];
 const g=await quietGPS();if(g)Object.assign(rec,g);put(rec);toast('Mémo vocal enregistré ✔');if(S.tab==='carnet')render()})}
function quietGPS(){return new Promise(ok=>{if(!navigator.geolocation)return ok(null);navigator.geolocation.getCurrentPosition(p=>ok({lat:+p.coords.latitude.toFixed(6),lon:+p.coords.longitude.toFixed(6),prec:Math.round(p.coords.accuracy)}),()=>ok(null),{enableHighAccuracy:true,timeout:8000,maximumAge:30000})})}

function vCarnet(){
 V.append(h('div',{class:'card'},h('h3',{},'📝 Carnet de terrain'),h('p',{class:'muted'},'Tout ce qu’on noterait sur un carnet : observations libres, doutes d’identification, incidents, météo, idées. Le lieu, l’heure et votre nom sont ajoutés tout seuls.'),
  h('div',{class:'actions'},h('button',{class:'btn',onclick:quickVoice},'🎙 Mémo vocal'),h('button',{class:'btn2',onclick:()=>{S.noteEdit='new';saveS();render()}},'✏ Note écrite / photo'))));
 const draw=edit=>{V.querySelectorAll('.dyn').forEach(e=>e.remove());
  if(edit||S.noteEdit){const ed=edit||(S.noteEdit==='new'?null:S.noteEdit);const f=form('note',{},ed,()=>{S.noteEdit='';saveS();draw()});
   if(!ed){const sel=f.querySelectorAll('select');if(sel[0])sel[0].value=curProt();if(sel[1])sel[1].value=S.lastLieu||curLieu();}
   f.classList.add('dyn');V.append(f)}
  const l=listView('note',null,id=>{S.noteEdit=id;saveS();draw(id)});l.classList.add('dyn');V.append(l)};
 draw()}

/* ---------- Bouton Note partout (en-tête) ---------- */
const top=document.querySelector('header .top');
if(top&&!top.querySelector('.notebtn')){const st=$('#st');const b=h('button',{class:'notebtn',title:'Carnet de terrain',onclick:()=>{S.prevTab=S.tab!=='carnet'?S.tab:S.prevTab;S.tab='carnet';saveS();render()}},'📝');
 const m=h('button',{class:'notebtn',title:'Mémo vocal rapide',onclick:()=>{if(S.tab!=='carnet')S.prevTab=S.tab;quickVoice()}},'🎙');const w=h('span',{class:'hbtns'},m,b);st.after(w)}

/* ---------- Préparation du téléphone ---------- */
const NEED=['index.html','app.js','prot.js','patch.js','photos.js','ui.js','extra.js','flore.js','florule.js','saisie.js','terrain.js','guide.js','gps.js','chrono.js','carte_ortho.jpg','carte_A3.pdf','ill_perruche.jpg',...[0,1,2,3,4,5,6].map(i=>'florule/f'+i+'.jpg')];
let DEFER=null;window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();DEFER=e;if(S.tab==='accueil')render()});
const standalone=()=>matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
const isIOS=/iPhone|iPad|iPod/.test(navigator.userAgent);
window.eieChecks=()=>checks();
async function checks(){const r={};
 r.nom=!!S.obs;r.code=!!S.team;r.app=standalone();
 try{let n=0;for(const f of NEED){if(await caches.match(f,{ignoreSearch:true}))n++}r.cache=[n,NEED.length]}catch(e){r.cache=[0,NEED.length]}
 try{r.persist=navigator.storage&&navigator.storage.persisted?await navigator.storage.persisted():null}catch(e){r.persist=null}
 try{const q=await navigator.permissions.query({name:'geolocation'});r.gps=q.state}catch(e){r.gps=S.gpsOK?'granted':'prompt'}
 r.pend=Object.values(R).filter(x=>x.dirty).length;try{const e=await navigator.storage.estimate();r.free=e.quota&&e.usage!=null?Math.round((e.quota-e.usage)/1048576):null}catch(e){}
 return r}
async function prepare(btn){btn.disabled=true;btn.textContent='Préparation…';
 try{if(navigator.storage&&navigator.storage.persist)await navigator.storage.persist()}catch(e){}
 if(navigator.onLine){try{const c=await caches.open((await caches.keys()).find(k=>k.startsWith('eieterrain-v'))||'eieterrain-manuel');let i=0;for(const f of NEED){btn.textContent=`Téléchargement ${++i}/${NEED.length}…`;try{const r=await fetch(f,{cache:'reload'});if(r.ok)await c.put(f,r)}catch(e){}}}catch(e){}}
 btn.textContent='Autorisation GPS…';const g=await quietGPS();if(g){S.gpsOK=1;saveS()}
 if(navigator.onLine&&S.team)try{await sync(false)}catch(e){}
 toast('Téléphone préparé');render()}
async function readyCard(){
 const c=h('div',{class:'card ready'},h('h3',{},'📱 Prêt pour le terrain ?'),h('p',{class:'muted'},'Vérification…'));const an=V.querySelector('.hero');an?an.after(c):V.prepend(c);
 const r=await checks();const ok=(b,t,hint)=>h('div',{class:'chk '+(b?'ok':'ko')},h('span',{},b?'✔':'✖'),h('div',{},t,hint&&!b?h('div',{class:'muted'},hint):null));
 const items=[ok(r.nom&&r.code,'Nom et code équipe','Onglet Données › Réglages.'),
  ok(r.app,'Appli installée sur l’écran d’accueil',isIOS?'Safari › bouton Partager › « Sur l’écran d’accueil ».':'Bouton ci-dessous, ou menu ⋮ de Chrome › « Installer l’application ».'),
  ok(r.cache[0]===r.cache[1],`Fonctionne sans réseau (${r.cache[0]}/${r.cache[1]} fichiers, carte et florule comprises)`,'Toucher « Tout préparer » avec du réseau (wifi conseillé, ≈ 7 Mo).'),
  ok(r.persist!==false,'Données protégées (le téléphone ne les effacera pas)','Toucher « Tout préparer ».'),
  ok(r.gps==='granted','GPS autorisé','Toucher « Tout préparer » puis « Autoriser ».'),
  ok(r.pend===0,r.pend?`${r.pend} ligne(s) pas encore envoyée(s)`:'Toutes les saisies sont envoyées','Elles partiront seules dès qu’il y aura du réseau.')];
 const allok=r.nom&&r.code&&r.cache[0]===r.cache[1]&&r.persist!==false&&r.gps==='granted';
 c.innerHTML='';c.append(h('h3',{},allok?'✔ Téléphone prêt pour le terrain':'📱 Prêt pour le terrain ?'));
 const box=h('div',{},items,r.free!=null?h('p',{class:'muted'},`Espace libre pour l’appli : ${r.free>2048?Math.round(r.free/1024)+' Go':r.free+' Mo'}`):null);
 if(allok){const d=h('details',{},h('summary',{},'Voir le détail'),box);c.append(d)}else c.append(box);
 const bt=h('div',{class:'actions'});const pb=h('button',{class:'btn',onclick:()=>prepare(pb)},'⚙ Tout préparer');bt.append(pb);
 if(DEFER&&!r.app)bt.append(h('button',{class:'btn2',onclick:async()=>{DEFER.prompt();await DEFER.userChoice;DEFER=null;render()}},'⬇ Installer l’appli'));
 if(!allok||DEFER)c.append(bt);
 c.append(h('p',{class:'muted',style:'margin-top:8px'},'Sur le terrain : 📝 en haut pour une note, 🎙 pour un mémo vocal. Plus besoin de carnet papier – seules les étiquettes d’herbier et des tubes à fourmis restent au crayon.'))}

/* ---------- Écran allumé pendant les chronos (écoute oiseaux, reptiles, fourmis) ---------- */
let WL=null;const anyRun=()=>Object.values(R).some(r=>r.run&&!r.deleted);
async function wake(){try{if(anyRun()&&!WL&&navigator.wakeLock){WL=await navigator.wakeLock.request('screen');WL.addEventListener('release',()=>{WL=null})}if(!anyRun()&&WL){await WL.release();WL=null}}catch(e){}}
const _ch=chrono;chrono=function(s,act){_ch(s,act);wake()};
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')wake()});

/* ---------- Export photos : bonne extension pour les mémos vocaux ---------- */
const ext=d=>/^data:audio\/mp4/.test(d)?'m4a':/^data:audio/.test(d)?'webm':'jpg';
exportPhotos=async function(){let ph=await pAll();if(S.team&&navigator.onLine&&confirm('Télécharger aussi les photos et mémos des collègues depuis le serveur ?')){try{toast('Téléchargement…');const rows=await api('photos?select=id,label,data,ts');const ids=new Set(ph.map(p=>p.id));rows.forEach(r=>{if(!ids.has(r.id))ph.push({id:r.id,label:r.label,data:r.data,ts:r.ts})})}catch(e){toast('Serveur : '+e.message,true)}}
 if(!ph.length){toast('Aucune photo');return}
 const nm=p=>`${(p.label||'photo').replace(/[^\w.-]+/g,'_')}_${p.id}.${ext(p.data||'')}`;
 const files=ph.map(p=>{const b=atob(String(p.data).split(',')[1]||'');const u=new Uint8Array(b.length);for(let i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return[nm(p),u]});
 files.push(['photos_index.csv','﻿fichier;fiche_liee;etiquette;date\n'+ph.map(p=>`${nm(p)};${p.rec||''};${p.label||''};${p.ts||''}`).join('\n')]);
 await shareOrDownload(zip(files),`EIE_Ouvea_photos_${stamp()}.zip`)};

/* ---------- Rendu ---------- */
const _r=render;render=function(){
 if(S.tab==='carnet'){clearInterval(TICK);V.innerHTML='';document.querySelectorAll('nav.tabs button').forEach(b=>b.classList.remove('on'));vCarnet();renderStatus();window.scrollTo(0,0);return}
 _r();if(S.tab==='donnees')readyCard()};
document.head.append(h('style',{},`.hbtns{display:flex;gap:6px;margin-left:6px}.notebtn{background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.35);color:#fff;border-radius:10px;font-size:20px;width:42px;height:38px}
header .top{flex-wrap:nowrap}#st{flex:1}
.recov{position:fixed;inset:0;z-index:50;background:rgba(20,30,25,.92);color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px}
.recdot{width:28px;height:28px;border-radius:50%;background:#E53935;animation:bl 1s infinite}@keyframes bl{50%{opacity:.25}}
.aud{width:100%;max-width:320px;margin:4px 0}
.ready .chk{display:flex;gap:10px;align-items:flex-start;padding:6px 0;border-bottom:1px solid #EEF2EF;font-size:15px}.ready .chk>span{font-weight:800;width:20px}.chk.ok>span{color:#2E7D4F}.chk.ko>span{color:#C62828}
.ready summary{cursor:pointer;color:#2E7D4F;font-weight:600;padding:4px 0}`));
render();
})();
