try{document.getElementById("lg").src=LOGO_PIL}catch(e){}
const U='https://bdpbsdqxrrtvzdocezzy.supabase.co/rest/v1/',H={apikey:'sb_publishable_wS72835MaYCHp0BqBrR0Nw_FG8a7CbN','x-team-key':'PHOTOTHEQUE-PUB26'};
const log=t=>{document.getElementById('log').textContent=t},bar=p=>{document.querySelector('#bar div').style.width=(100*p).toFixed(1)+'%'};
async function get(path){const r=await fetch(U+path,{headers:H});if(!r.ok)throw new Error(r.status+' '+await r.text());return r.json()}
async function all(table,sel){let out=[],o=0;for(;;){const b=await get(`${table}?select=${sel}&order=id&limit=500&offset=${o}`);out=out.concat(b);if(b.length<500)break;o+=500}return out}
const slug=s=>(s||'').toString().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^A-Za-z0-9.]+/g,'-').replace(/^-+|-+$/g,'').slice(0,60);
const G={espece:['Flore','FLO'],eee:['Flore','FLO'],protegee:['Flore','FLO'],arbre:['Arbres','ARB'],jeunes:['Regeneration','REG'],herbier:['Herbier','HER'],
 rep_obs:['Reptiles','REP'],rep_session:['Reptiles','REP'],oi_contact:['Oiseaux','OIS'],oi_session:['Oiseaux','OIS'],oi_nid:['Oiseaux','OIS'],
 fo_poste:['Fourmis','FOU'],fo_obs:['Fourmis','FOU'],carre:['Milieux','MIL']};
function describe(t,d){
 const cq=(d.carre||'')+(d.quart||'');
 switch(t){
  case 'espece':case 'eee':case 'protegee':return{cq,taxon:d.espece,num:'',leg:`${d.espece||''} – relevé ${cq}`};
  case 'arbre':return{cq,taxon:d.espece,num:'Arbre '+d.num,leg:`${d.espece||''} – arbre n° ${d.num} (${cq}), circonférence ${d.tour} cm`};
  case 'jeunes':return{cq:d.carre||'',taxon:d.espece,num:'',leg:`${d.espece||''} – régénération ${d.carre||''}`};
  case 'herbier':return{cq,taxon:d.nom,num:d.num||'sans n°',leg:`Herbier ${d.num||'sans n°'} – ${d.nom||''}`};
  case 'rep_obs':return{cq:d.lieu||'',taxon:d.espece,num:'',leg:`${d.espece||''} – ${d.date||''}`};
  case 'rep_session':return{cq:d.lieu||'',taxon:'',num:'',leg:`Session reptiles ${d.date||''} ${d.debut||''}`};
  case 'oi_contact':return{cq:'',taxon:d.espece,num:'',leg:`${d.espece||''} – ${d.date||''}`};
  case 'oi_session':return{cq:d.lieu||'',taxon:'',num:'',leg:`Passage oiseaux ${d.date||''} ${d.debut||''} ${d.lieu||''}`};
  case 'oi_nid':return{cq:'',taxon:d.oiseau,num:'',leg:`Nid de ${d.oiseau||''} dans ${d.espece_arbre||''}`};
  case 'fo_poste':return{cq:d.carre||'',taxon:'',num:d.poste||'',leg:`Poste fourmis ${d.poste||''} (${d.carre||''})`};
  case 'fo_obs':return{cq:d.carre||'',taxon:d.sorte,num:d.tube||'',leg:`${d.sorte||''} – ${d.poste||''} ${d.appat||''} – ${d.tube||''}`};
  case 'carre':return{cq:d.carre,taxon:'',num:'',leg:`Milieu – carré ${d.carre}`};
  case 'note':return{cq:'',taxon:'',num:'',leg:(d.texte||'').slice(0,120)};
 }return{cq:'',taxon:'',num:'',leg:''}}

let IDX=null;
async function buildIndex(){
  const R=await all('releves','id,type,data,deleted');
  const rec={};for(const r of R){const d=r.data||{};if(r.deleted||d.deleted)continue;rec[r.id]={t:r.type,d}}
  const P=await all('photos','id,rec_id,label,obs,ts');
  const rows=[];
  for(const p of P){const r=rec[p.rec_id];if(!r)continue;let g=G[r.t];
   if(r.t==='note'){const pr=(r.d.protocole||'');g=pr==='Fourmis'?G.fo_obs:pr==='Reptiles'?G.rep_obs:G.carre}
   if(!g)continue;const ds=describe(r.t,r.d);rows.push({p,r,g,ds})}
  const key=x=>[x.g[1],x.ds.cq||'',x.ds.taxon||'',x.ds.num||'',x.p.ts||'',x.p.id].join('|');
  rows.sort((a,b)=>key(a)<key(b)?-1:1);
  const cnt={},idx=[];
  for(const x of rows){cnt[x.g[1]]=(cnt[x.g[1]]||0)+1;const ref=x.g[1]+'-'+String(cnt[x.g[1]]).padStart(4,'0');
   const parts=[ref,x.ds.cq,x.ds.num,x.ds.taxon].filter(Boolean).map(slug).filter(Boolean);
   idx.push({ref,groupe:x.g[0],fichier:x.g[0]+'/'+parts.join('_')+'.jpg',lieu:x.ds.cq||'',taxon:x.ds.taxon||'',numero:x.ds.num||'',date:x.r.d.date||'',auteur:x.p.obs||x.r.d.obs||'',legende:x.ds.leg||'',_id:x.p.id})}
  return idx}
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function render(){const q=document.getElementById('q').value.toLowerCase(),gv=document.getElementById('gf').value;
 const L=IDX.filter(o=>(!gv||o.groupe===gv)&&(!q||[o.ref,o.groupe,o.lieu,o.taxon,o.numero,o.date,o.auteur,o.legende].join(' ').toLowerCase().includes(q)));
 document.getElementById('n').textContent=L.length+' photo(s)';
 document.getElementById('t').innerHTML=L.slice(0,400).map(o=>`<tr><td>${o.ref}</td><td>${o.groupe}</td><td>${esc(o.lieu)}</td><td><i>${esc(o.taxon)}</i></td><td>${esc(o.numero)}</td><td>${esc(o.date)}</td><td>${esc(o.auteur)}</td><td>${esc(o.legende)}</td><td><button class="v" data-id="${o._id}">Voir</button></td></tr>`).join('')+(L.length>400?'<tr><td colspan="9">… affiner la recherche pour voir la suite</td></tr>':'')}
document.getElementById('t').onclick=async e=>{const b=e.target.closest('button.v');if(!b)return;b.textContent='…';
 try{const r=await get(`photos?select=data&id=eq.${encodeURIComponent(b.dataset.id)}`);const s=r[0].data;const bin=atob(s.slice(s.indexOf(',')+1));const a=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)a[i]=bin.charCodeAt(i);
 window.open(URL.createObjectURL(new Blob([a],{type:'image/jpeg'})),'_blank')}catch(err){alert('Photo indisponible')}b.textContent='Voir'};
(async()=>{try{IDX=await buildIndex();const gf=document.getElementById('gf');[...new Set(IDX.map(o=>o.groupe))].forEach(x=>gf.add(new Option(x,x)));
 document.getElementById('q').oninput=render;gf.onchange=render;render()}catch(e){document.getElementById('n').textContent='Index indisponible : '+e.message}})();
async function notifier(nom,org,mail){
 try{await fetch(U+'telechargements',{method:'POST',headers:{...H,'Content-Type':'application/json',Prefer:'return=minimal'},body:JSON.stringify({nom,organisme:org,email:mail,objet:'Photothèque BESS Fajawe',navigateur:navigator.userAgent.slice(0,180)})})}catch(e){}
}
document.getElementById('go').onclick=async()=>{
 const nom=document.getElementById('nom').value.trim(),org=document.getElementById('org').value.trim(),mail=document.getElementById('mail').value.trim();
 if(!nom||!org){log('Merci d’indiquer votre nom et votre organisme.');return}
 const btn=document.getElementById('go');btn.disabled=true;notifier(nom,org,mail);
 try{if(!IDX){log('Chargement de l’index…');IDX=await buildIndex()}
  const zip=new JSZip(),n=IDX.length;
  for(let i=0;i<n;i+=8){const ids=IDX.slice(i,i+8);
   const b=await get(`photos?select=id,data&id=in.(${ids.map(x=>'"'+x._id+'"').join(',')})`);const m={};b.forEach(o=>m[o.id]=o.data);
   for(const x of ids){const s=m[x._id];if(!s)continue;zip.file('Phototheque_BESS_Fajawe_Ouvea/'+x.fichier,s.slice(s.indexOf(',')+1),{base64:true,binary:true})}
   bar((i+8)/n*0.9);log(`Photos : ${Math.min(i+8,n)} / ${n}`)}
  const clean=IDX.map(({_id,...k})=>k);
  zip.file('Phototheque_BESS_Fajawe_Ouvea/index.html',indexHtml(clean));
  const csv=['Réf;Groupe;Fichier;Lieu;Taxon;Numéro;Date;Auteur;Légende'].concat(clean.map(o=>[o.ref,o.groupe,o.fichier,o.lieu,o.taxon,o.numero,o.date,o.auteur,o.legende].map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(';'))).join('\r\n');
  zip.file('Phototheque_BESS_Fajawe_Ouvea/index_photos.csv','﻿'+csv);
  log('Création du fichier ZIP…');
  const blob=await zip.generateAsync({type:'blob',compression:'STORE',streamFiles:true},m=>bar(0.9+m.percent/1000));
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='Phototheque_BESS_Fajawe_Ouvea.zip';document.body.appendChild(a);a.click();
  bar(1);log('Téléchargement lancé : Phototheque_BESS_Fajawe_Ouvea.zip. Après décompression, ouvrir index.html pour rechercher une photo.');
 }catch(e){log('Erreur : '+e.message+' – réessayer.');btn.disabled=false}};
