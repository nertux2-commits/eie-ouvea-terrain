// v2.2 – GPS du téléphone : points calés sur le GPS Garmin, GPS automatique sur les saisies, export GPX/CSV ; fiches enrichies ; herbier LOY
(function(){
/* ---------- numéro d'herbier standard : LOY-OUV26-001 ---------- */
const HPRE='LOY-OUV26-';
nextHerb=function(){const ns=live('herbier').map(r=>String(r.num||'')).filter(n=>n.startsWith(HPRE)).map(n=>+n.slice(HPRE.length)||0);
 const used=Object.values(R).filter(r=>!r.deleted&&r.herbier&&String(r.herbier).startsWith(HPRE)).map(r=>+String(r.herbier).slice(HPRE.length)||0);
 return HPRE+pad(Math.max(0,...ns,...used)+1,3)};

/* ---------- position GPS en continu (moyenne des meilleures mesures) ---------- */
let WID=null,FIX=[],idle=null;
function startFix(){if(!navigator.geolocation)return;clearTimeout(idle);idle=setTimeout(stopFix,180000);if(WID!=null)return;
 WID=navigator.geolocation.watchPosition(p=>{FIX.push({t:Date.now(),la:p.coords.latitude,lo:p.coords.longitude,a:p.coords.accuracy});FIX=FIX.filter(f=>Date.now()-f.t<60000)},()=>{},{enableHighAccuracy:true,maximumAge:0,timeout:30000});PV=setInterval(()=>navigator.geolocation.getCurrentPosition(p=>{FIX.push({t:Date.now(),la:p.coords.latitude,lo:p.coords.longitude,a:p.coords.accuracy});FIX=FIX.filter(f=>Date.now()-f.t<60000)},()=>{},{enableHighAccuracy:true,maximumAge:0,timeout:5000}),5000)}
let PV=null;function stopFix(){if(WID!=null)navigator.geolocation.clearWatch(WID);WID=null;clearInterval(PV);PV=null}
function bestFix(win){const now=Date.now();const fs=FIX.filter(f=>now-f.t<(win||30000));if(!fs.length)return null;const amin=Math.min(...fs.map(f=>f.a));const g=fs.filter(f=>f.a<=Math.max(amin*1.5,amin+3));
 let w=0,la=0,lo=0;for(const f of g){const k=1/(f.a*f.a);w+=k;la+=f.la*k;lo+=f.lo*k}return{lat:+(la/w).toFixed(6),lon:+(lo/w).toFixed(6),prec:Math.max(1,Math.round(amin/Math.sqrt(g.length)*10)/10),n:g.length}}
window.eieFix={startFix,bestFix};

/* GPS automatique sur les fiches où la position compte */
const AUTO=['arbre','espece','herbier','rep_obs','oi_nid','oi_contact','note','fo_obs'];
const _f=form;form=function(type,ctx,editId,after){if(AUTO.includes(type))startFix();return _f(type,ctx,editId,after)};
const _p=put;put=function(rec){if(rec&&AUTO.includes(rec.type)&&!rec.deleted&&rec.lat==null&&!(rec.type==='espece'&&!window.eieProt?.(rec.espece))){const b=bestFix(45000);if(b){rec.lat=b.lat;rec.lon=b.lon;rec.prec=b.prec;rec.gps_auto=true}}
 enrich(rec);return _p(rec)};

/* ---------- infos espèce rapatriées automatiquement dans chaque ligne ---------- */
const STL={L:'Endémique Loyauté',N:'Endémique NC',I:'Indigène',A:'Introduite ancienne',M:'Introduite moderne'};
const PLANT={espece:'espece',arbre:'espece',jeunes:'espece',herbier:'nom',protegee:'espece',eee:'espece',oi_nid:'espece_arbre'};
function enrich(rec){if(!rec||!PLANT[rec.type])return;const n=rec[PLANT[rec.type]];if(!n)return;
 const I=window.eieInfo&&eieInfo(n),P=window.eieProt&&eieProt(n),E=window.eieEnvOf&&eieEnvOf(n);
 rec.famille=(I&&I.fam)||(P&&P[1])||(E&&E[1])||'';rec.endemisme=I&&I.st?STL[I.st]:(E?'Introduite':'');
 rec.protection=P?`Protégée G${P[2]} – ${GROUPES[P[2]]}`:'';rec.envahissante=E?`Impact ${E[3]}`:'';rec.abondance_ouvea=(I&&I.ab)||'';
 if(rec.type==='herbier'&&rec.num)rec.etiquette=`${rec.num} · Ouvéa, Fajawe ${rec.carre||''}${rec.quart||''} · ${rec.date||''} · ${rec.obs||''}`}
const EXTRA=['famille','endemisme','protection','envahissante','abondance_ouvea'];
const _rf=rowsFor;rowsFor=function(t){const rows=_rf(t);if(!PLANT[t]||!rows.length)return rows;const head=rows[0];const idi=head.indexOf('id');
 const add=t==='herbier'?[...EXTRA,'etiquette']:EXTRA;
 return [head.concat(add),...rows.slice(1).map(r=>{const rec=R[Array.isArray(r)?r[idi]:r.id]||{};if(!rec.famille)enrich(rec);return Array.isArray(r)?r.concat(add.map(k=>rec[k]??'')):Object.assign(r,Object.fromEntries(add.map(k=>[k,rec[k]??''])))})]};

/* ---------- confirmer au téléphone les points posés au GPS Garmin ---------- */
SCH.ptconf={titre:'Point GPS confirmé au téléphone',ctx:[],f:[['pt','Point','text'],['x_lambert','X Lambert NC','num'],['y_lambert','Y Lambert NC','num'],['ecart_m','Écart au point prévu (m)','num'],['gps','GPS','gps']],lab:r=>`${r.pt} – écart ${r.ecart_m} m (±${r.prec} m)`};
if(!SHEETS.some(x=>x[0]==='ptconf'))SHEETS.push(['ptconf','Points_GPS_confirmes']);
const push=p=>{FIX.push({t:Date.now(),la:p.coords.latitude,lo:p.coords.longitude,a:p.coords.accuracy})};
function poll(){navigator.geolocation&&navigator.geolocation.getCurrentPosition(push,()=>{},{enableHighAccuracy:true,maximumAge:0,timeout:4000})}
function measure(pt){startFix();FIX=[];poll();const pv=setInterval(poll,2000);const t0=Date.now();const lab=h('div',{style:'font-size:22px;font-weight:800'},'0 / 20 s');const acc=h('div',{},'Recherche des satellites…');
 const ov=h('div',{class:'recov'},h('div',{style:'font-size:18px'},`📍 Mesure au piquet ${pt.n}`),lab,acc,h('div',{class:'muted',style:'color:#fff'},'Rester immobile, téléphone à plat au-dessus du piquet.'),h('button',{class:'btn3',onclick:()=>{clearInterval(iv);clearInterval(pv);ov.remove()}},'Annuler'));document.body.append(ov);
 const iv=setInterval(()=>{const s=Math.floor((Date.now()-t0)/1000);lab.textContent=`${s} / 20 s`;const b=bestFix(25000);if(b)acc.textContent=`Précision ±${b.prec} m (${b.n} mesures)`;
  if(s>=20){clearInterval(iv);clearInterval(pv);ov.remove();if(!b){toast('Pas de signal GPS : réessayer à découvert',true);return}
   const [x,y]=window.lambertNC(b.lat,b.lon);const ec=Math.round(Math.hypot(x-pt.x,y-pt.y)*10)/10;
   let rec=live('ptconf').find(r=>r.pt==='OUV-'+pt.n);if(!rec)rec=newRec('ptconf',{});Object.assign(rec,{pt:'OUV-'+pt.n,lat:b.lat,lon:b.lon,prec:b.prec,x_lambert:Math.round(x*10)/10,y_lambert:Math.round(y*10)/10,ecart_m:ec,gps_auto:true});
   put(rec);toast(ec<=Math.max(8,b.prec*2)?`✔ OUV-${pt.n} confirmé : écart ${ec} m`:`⚠ Écart de ${ec} m : vérifier le piquet`,ec>Math.max(8,b.prec*2));render()}},500)}
function confirmCard(){const P=(window.EIE_CARTE&&window.EIE_CARTE.pts)||[];
 const rows=P.map(pt=>{const c=live('ptconf').find(r=>r.pt==='OUV-'+pt.n);const ok=c&&c.ecart_m<=Math.max(8,(c.prec||5)*2);
  return h('div',{class:'pcr'},h('div',{},h('b',{},'OUV-'+pt.n),h('div',{class:'muted',style:'font-size:12px'},pt.d)),h('div',{class:'pcs '+(c?ok?'ok':'ko':'')},c?`${ok?'✔':'⚠'} ${c.ecart_m} m`:'à faire'),h('button',{class:'btn2',onclick:()=>measure(pt)},c?'Refaire':'📍 J’y suis'))});
 const n=live('ptconf').length;
 return h('div',{class:'card'},h('h3',{},`📍 Caler le téléphone sur les points du GPS (${n}/${P.length})`),
  h('p',{class:'muted'},'1. Les piquets sont posés avec le GPS Garmin. 2. Debout au-dessus de chaque piquet, toucher « J’y suis » : le téléphone mesure 20 s et calcule l’écart avec le point prévu. Écart ≤ 8 m = ✔. Ensuite, toutes les saisies prennent le GPS du téléphone tout seul.'),rows)}

/* ---------- export GPS : GPX (SIG, Garmin) et CSV en Lambert NC ---------- */
function geoRecs(){return Object.values(R).filter(r=>!r.deleted&&r.lat!=null&&r.lon!=null&&r.type!=='etape')}
function nameOf(r){return r.type==='arbre'?`ARB-${r.carre}-${pad(r.num||0)}${r.tige||''}`:r.type==='herbier'?r.num:r.type==='ptconf'?r.pt+'-tel':r.type==='rep_obs'?'REP-'+(r.espece||'').split(' ')[0]:r.type==='oi_nid'?'NID-'+(r.arbre||''):r.type==='note'?'NOTE':r.type==='espece'?'PROT-'+(r.espece||'').split(' ')[0]:r.type.toUpperCase()}
const xe=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
async function exportGPS(){const rs=geoRecs();if(!rs.length){toast('Aucun point GPS pour l’instant',true);return}
 const gpx=`<?xml version="1.0" encoding="UTF-8"?>\n<gpx version="1.1" creator="EIE Ouvea terrain" xmlns="http://www.topografix.com/GPX/1/1">\n`+rs.map(r=>`<wpt lat="${r.lat}" lon="${r.lon}"><time>${r.ts||''}</time><name>${xe(nameOf(r))}</name><desc>${xe([SCH[r.type]?.lab?.(r)||r.type,r.obs,'±'+(r.prec||'?')+' m'].join(' | '))}</desc></wpt>`).join('\n')+'\n</gpx>';
 const csv='﻿nom;type;x_lambert_nc;y_lambert_nc;latitude;longitude;precision_m;date;heure;observateur;description\n'+rs.map(r=>{const [x,y]=window.lambertNC(r.lat,r.lon);return [nameOf(r),r.type,x.toFixed(1),y.toFixed(1),r.lat,r.lon,r.prec||'',r.date||'',hhmm(r.ts),r.obs||'',(SCH[r.type]?.lab?.(r)||'').replace(/;/g,',')].join(';')}).join('\n');
 await shareOrDownload(zip([['points_terrain_telephones.gpx',gpx],['points_terrain_telephones_LambertNC.csv',csv]]),`EIE_Ouvea_GPS_${stamp()}.zip`)}

/* ---------- rendu ---------- */
const _r=render;render=function(){_r();
 if(S.tab==='carte'){const c=confirmCard();const info=V.querySelector('.mapinfo');(info||V.firstChild)?.after(c)}
 if(S.tab==='donnees'){const exp=[...V.querySelectorAll('.card')].find(c=>/Exporter/.test(c.querySelector('h3')?.textContent||''));const b=h('button',{class:'btn2',onclick:exportGPS},'🗺 Points GPS (GPX + Lambert NC)');exp?exp.querySelector('.actions')?.append(b):V.append(b)}};
document.head.append(h('style',{},`.pcr{display:grid;grid-template-columns:1fr auto auto;gap:8px;align-items:center;padding:8px 0;border-bottom:1px solid #EEF2EF}.pcr .btn2{padding:8px 10px!important;font-size:14px!important;min-height:0!important}
.pcs{font-weight:800;font-size:13px;color:#90A4AE}.pcs.ok{color:#2E7D4F}.pcs.ko{color:#E65100}`));
})();
