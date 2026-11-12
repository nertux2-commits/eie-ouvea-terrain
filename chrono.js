// v2.2 – Chronomètres intégrés : barre de chrono toujours visible, temps noté à chaque observation, fin de parcours
(function(){
const el=s=>s.run||s.acc?((s.acc||0)+(s.run?Date.now()-Date.parse(s.run):0)):0;
const mmss=ms=>{ms=Math.max(0,ms);const s=Math.floor(ms/1000);return `${pad(Math.floor(s/60),2)}:${pad(s%60,2)}`};
const since=t=>t?Date.now()-Date.parse(t):0;
const today=x=>x&&x.date===new Date().toLocaleDateString('fr-FR');

/* ---------- temps du chrono enregistré à chaque observation ---------- */
const _p=put;put=function(rec){if(rec&&!rec.deleted&&rec.t_chrono==null){
 if(rec.type==='rep_obs'){const s=R[rec.session];if(s)rec.t_chrono=mmss(el(s))}
 if(rec.type==='oi_contact'){const s=R[rec.session];if(s&&s.t0)rec.t_chrono=mmss(since(s.t0))}
 if(rec.type==='fo_obs'){const s=R[rec.session];if(s){if(s.vue_t0&&!s.vue_fin)rec.t_chrono='vue '+mmss(since(s.vue_t0));else if(s.t0)rec.t_chrono=mmss(since(s.t0))}}}
 return _p(rec)};
const _rf=rowsFor;rowsFor=function(t){const rows=_rf(t);if(!['rep_obs','oi_contact','fo_obs'].includes(t)||!rows.length)return rows;
 return [rows[0].concat(['t_chrono']),...rows.slice(1).map(r=>Object.assign(r,{t_chrono:(R[r.id]||{}).t_chrono||''}))]};
if(SESS.oi_session)SESS.oi_session.f=SESS.oi_session.f||[];

/* ---------- barre de chrono (visible sur tous les écrans) ---------- */
const bar=h('div',{id:'chronobar'});document.querySelector('header').after(bar);
function active(){const a=[];
 for(const s of live('rep_session'))if(s.run||(s.debut&&!s.fin&&today(s)))a.push({k:'rep',s});
 for(const s of live('oi_session'))if(s.t0&&!s.fin&&since(s.t0)<35*60000)a.push({k:'oi',s});
 for(const s of live('fo_poste')){if(s.vue_t0&&!s.vue_fin&&since(s.vue_t0)<20*60000)a.push({k:'vue',s});else if(s.t0&&!s.lecture&&since(s.t0)<3*3600000)a.push({k:'fo',s})}
 return a}
const alerted={};
function beepOnce(key,msg){if(alerted[key])return;alerted[key]=1;vibrate();beep();toast(msg)}
function draw(){const a=active();bar.innerHTML='';bar.style.display=a.length?'':'none';
 for(const {k,s} of a){let txt,lab,btns=[];
  if(k==='rep'){lab=`🦎 Reptiles ${s.jour_nuit||''}`;txt=mmss(el(s));const run=!!s.run;
   btns.push(h('button',{onclick:e=>{e.stopPropagation();chrono(s,run?'pause':'resume');draw();if(S.tab==='reptiles')render()}},run?'⏸':'▶'),h('button',{onclick:e=>{e.stopPropagation();if(confirm('Fin du parcours : arrêter le chrono ?')){chrono(s,'stop');draw();render()}}},'⏹'));
   if(!run)txt+=' (pause)'}
  if(k==='oi'){const e=since(s.t0);lab=`🐦 Oiseaux passage ${s.passage||''}`;
   if(e<600000)txt='Écoute '+mmss(600000-e);else if(e<1800000){txt='Parcours '+mmss(1800000-e);beepOnce('oi1'+s.id,'Fin des 10 min d’écoute : parcours 20 min')}else{txt='Terminé';beepOnce('oi2'+s.id,'Fin du parcours (30 min)')}
   btns.push(h('button',{onclick:e=>{e.stopPropagation();if(confirm('Terminer le relevé oiseaux maintenant ?')){s.fin=hhmm();s.duree_min=Math.round(since(s.t0)/60000);put(s);draw();render()}}},'⏹'))}
  if(k==='fo'){const e=since(s.t0);lab=`🐜 Fourmis ${s.poste}`;txt=e<3600000?'Lecture dans '+mmss(3600000-e):'À LIRE ('+mmss(e-3600000)+' de retard)';if(e>=3600000)beepOnce('fo'+s.id,`Poste ${s.poste} : 1 heure écoulée, lire les appâts`)}
  if(k==='vue'){const e=since(s.vue_t0);lab=`🔎 Recherche à vue ${s.poste}`;txt=e<900000?mmss(900000-e):'Terminé';if(e>=900000)beepOnce('vue'+s.id,`Poste ${s.poste} : 15 min de recherche à vue terminées`);
   btns.push(h('button',{onclick:e=>{e.stopPropagation();s.vue_fin=hhmm();put(s);draw();render()}},'⏹'))}
  const go={rep:'reptiles',oi:'oiseaux',fo:'fourmis',vue:'fourmis'}[k];
  bar.append(h('div',{class:'chb '+k,onclick:()=>{S.tab=go;if(k==='rep')S.rep=s.id;if(k==='oi')S.oi=s.id;if(k!=='rep'&&k!=='oi'){S.fo=s.id;S.poste=s.poste}saveS();render()}},h('span',{class:'cl'},lab),h('span',{class:'ct'},txt),...btns))}}
setInterval(draw,1000);draw();



/* ---------- photo : appareil photo OU galerie du téléphone ---------- */
addPhoto=function(rec,label){if(window.RO&&RO()){toast('Consultation seule',true);return Promise.resolve(null)}
 return new Promise(ok=>{let done=false;const fin=v=>{if(done)return;done=true;sh.remove();ok(v)};
  const pickF=cap=>{const inp=h('input',{type:'file',accept:'image/*',style:'display:none'});if(cap)inp.setAttribute('capture','environment');document.body.append(inp);
   inp.onchange=async()=>{const f=inp.files[0];inp.remove();if(!f)return fin(null);try{const data=await compress(f);const id=uid();await pPut({id,rec:rec.id,label,data,ts:now(),obs:S.obs,dev:S.dev,synced:false,src:cap?'appareil':'galerie',nom_fichier:f.name||''});fin(id)}catch(e){toast('Photo illisible : '+(e&&e.message||'')+'. Réessayer avec « Choisir dans la galerie ».',true);fin(null)}};inp.click()};
  const sh=h('div',{class:'phsheet',onclick:e=>{if(e.target===sh)fin(null)}},h('div',{class:'phbox'},h('b',{},'Ajouter une photo'),
   h('button',{class:'btn',onclick:()=>pickF(true)},'📷 Prendre une photo'),h('button',{class:'btn2',onclick:()=>pickF(false)},'🖼 Choisir dans la galerie'),h('button',{class:'linkb',onclick:()=>fin(null)},'Annuler')));
  document.body.append(sh)})};
/* ---------- corriger une saisie, même longtemps après ---------- */
const ETYPES=[['rep_obs','Reptiles'],['oi_contact','Oiseaux (contacts)'],['oi_nid','Nids et cavités'],['fo_obs','Fourmis'],['espece','Plantes – espèces'],['arbre','Arbres'],['jeunes','Jeunes plants'],['herbier','Herbier'],['carre','Description des carrés'],['note','Carnet de notes']];
function editModal(id,done){const r=R[id];if(!r||!SCH[r.type])return;const m=h('div',{class:'emod'});const close=()=>{m.remove();done&&done()};
 const f=form(r.type,{},id,close);m.append(h('div',{class:'ebox'},h('div',{class:'ehd'},h('b',{},'✏ Corriger'),h('button',{class:'linkb',onclick:close},'✕ Fermer')),f));document.body.append(m)}
window.eieEdit=editModal;
function editCard(){const ty=S.etype||'rep_obs';const mine=S.emine!==0;
 const sel=h('select',{onchange:e=>{S.etype=e.target.value;saveS();render()}},ETYPES.map(([k,l])=>h('option',{value:k,selected:k===ty},`${l} (${live(k).length})`)));
 const tog=h('label',{class:'row chk'},h('input',{type:'checkbox',checked:mine,onchange:e=>{S.emine=e.target.checked?1:0;saveS();render()}}),h('span',{class:'lab'},'Seulement mes saisies'));
 const rows=live(ty).filter(r=>!mine||r.obs===S.obs).sort((a,b)=>a.ts<b.ts?1:-1).slice(0,80);
 const list=h('div',{},rows.length?rows.map(r=>h('div',{class:'li',onclick:()=>editModal(r.id,render)},h('span',{},`${r.date||''} ${hhmm(r.ts)} – `+SCH[ty].lab(r)),h('span',{class:'who'},(r.obs||'').split(' ')[0]+' ✏'))):h('p',{class:'muted'},'Aucune saisie.'));
 return h('div',{class:'card'},h('h3',{},'✏ Corriger une saisie'),h('p',{class:'muted'},'Toucher une ligne pour la modifier ou la supprimer, à tout moment. Les collègues reçoivent la correction à la synchronisation.'),h('div',{class:'row'},sel),tog,list)}
/* ---------- compléments dans les écrans ---------- */
const _r=render;render=function(){_r();draw();
 // Oiseaux : bouton de fin
 if(S.tab==='oiseaux'&&(S.oisub||'point')==='point'){const s=R[S.oi];const card=[...V.querySelectorAll('.card')].find(c=>/Passage/.test(c.querySelector('h3')?.textContent||''));
  if(s&&card&&s.t0){const a=card.querySelector('.actions');if(a&&!s.fin)a.append(h('button',{class:'btn3',onclick:()=>{if(confirm('Terminer le relevé maintenant ?')){s.fin=hhmm();s.duree_min=Math.round(since(s.t0)/60000);put(s);render()}}},'⏹ Terminer'));
   if(s.fin)card.append(h('p',{class:'muted'},`Début ${s.debut||''} – fin ${s.fin} (${s.duree_min||''} min)`))}}
 // Fourmis : recherche à vue chronométrée
 if(S.tab==='fourmis'){const s=R[S.fo];const card=[...V.querySelectorAll('.card')].find(c=>/^Poste/.test(c.querySelector('h3')?.textContent||''));
  if(s&&card){const a=card.querySelector('.actions');
   if(s.pose&&!s.vue_t0)a.append(h('button',{class:'btn2',onclick:()=>{s.vue_t0=now();s.vue_debut=hhmm();put(s);render()}},'🔎 Démarrer la recherche à vue (15 min)'));
   if(s.vue_t0)card.append(h('p',{class:'muted'},`Recherche à vue : début ${s.vue_debut||''}${s.vue_fin?' – fin '+s.vue_fin:' (en cours)'}`));
   if(s.vue_t0&&!s.vue_fin){const sel=V.querySelectorAll('.card.form select');sel.forEach(x=>{if([...x.options].some(o=>o.value==='Recherche à vue'))x.value='Recherche à vue'})}}}
 if(S.tab==='donnees'){const c=editCard();const ex=[...V.querySelectorAll('.card')].find(x=>/Exporter/.test(x.querySelector('h3')?.textContent||''));ex?ex.before(c):V.append(c)}
 // Reptiles : rappel
 if(S.tab==='reptiles'){const c=[...V.querySelectorAll('.card')].find(x=>/Temps de recherche/.test(x.textContent));if(c&&!c.querySelector('.cnote'))c.append(h('p',{class:'muted cnote'},'Le temps du chrono est noté tout seul sur chaque reptile. ⏹ Terminer à la fin du parcours.'))}
};
document.head.append(h('style',{},`.phsheet{position:fixed;inset:0;z-index:90;background:rgba(0,0,0,.45);display:flex;align-items:flex-end;justify-content:center}.phbox{background:#fff;width:100%;max-width:520px;border-radius:16px 16px 0 0;padding:16px 16px calc(16px + env(safe-area-inset-bottom));display:flex;flex-direction:column;gap:10px}.phbox b{font-size:17px;color:#1F4D33}
.emod{position:fixed;inset:0;z-index:65;background:rgba(0,0,0,.55);overflow:auto;padding:12px}.ebox{background:#F4F7F5;border-radius:14px;padding:10px;max-width:640px;margin:0 auto}.ehd{display:flex;justify-content:space-between;align-items:center;padding:4px 4px 8px}.emod .form .actions{position:static!important;margin:0!important}
#chronobar{position:sticky;top:var(--hh,108px);z-index:6;display:flex;flex-direction:column;gap:2px;background:#102A1C;padding:4px 8px}
#chronobar .chb{display:flex;align-items:center;gap:8px;color:#fff;font-size:14px;padding:4px 2px;cursor:pointer}.chb .cl{flex:1;font-weight:600}.chb .ct{font-variant-numeric:tabular-nums;font-weight:800;font-size:18px;color:#FFE082}
#chronobar button{background:rgba(255,255,255,.18);border:0;color:#fff;border-radius:8px;width:40px;height:34px;font-size:16px}`));
const setH=()=>{const hh=document.querySelector('header');if(hh)document.documentElement.style.setProperty('--hh',hh.offsetHeight+'px')};setH();addEventListener('resize',setH);

/* ---------- v2.3.5 : chrono vraiment arrêté à la fin ---------- */
const _ch=chrono;chrono=function(s,act){if(!s)return;
 if(s.fin&&act==='resume')return;           // une session terminée ne redémarre plus quand on enregistre/corrige un reptile
 if(s.fin&&act==='start'){if(!confirm(`Session terminée à ${s.fin}. La rouvrir et relancer le chrono ?`))return;s.fin=null;s.temps_min=null}
 if(s.fin&&act==='stop')return;
 return _ch(s,act)};
function repairRep(){for(const s of live('rep_session')){if(s.fin&&s.temps_min!=null&&(s.run||Math.abs((s.acc||0)/60000-s.temps_min)>1)){s.acc=s.temps_min*60000;s.run=null;put(s)}}}
function autoEnd(){const hm=t=>new Date(t).toTimeString().slice(0,5);
 for(const s of live('oi_session'))if(s.t0&&!s.fin&&since(s.t0)>=1800000&&since(s.t0)<6*3600000){s.fin=hm(Date.parse(s.t0)+1800000);s.duree_min=30;put(s)}
 for(const s of live('fo_poste'))if(s.vue_t0&&!s.vue_fin&&since(s.vue_t0)>=900000){s.vue_fin=hm(Date.parse(s.vue_t0)+900000);put(s)}}
setInterval(()=>{try{repairRep();autoEnd()}catch(e){}},5000);try{repairRep();autoEnd()}catch(e){}

/* ---------- v2.3.5 : photos visibles sur tous les téléphones ---------- */
const PH_MEM={};
async function getPh(id){let p=null;try{p=await pGet(id)}catch(e){}if(p&&p.data)return p;
 if(!navigator.onLine||!S.team)return null;
 if(!PH_MEM[id])PH_MEM[id]=api(`photos?id=eq.${encodeURIComponent(id)}&select=id,rec_id,label,data,obs,dev,ts`).then(async r=>{const x=r&&r[0];if(!x)return null;
   const q={id:x.id,rec:x.rec_id,label:x.label,data:x.data,obs:x.obs,dev:x.dev,ts:x.ts,synced:true,distant:true};try{await pPut(q)}catch(e){}return q}).catch(()=>{delete PH_MEM[id];return null});
 return PH_MEM[id]}
window.eieGetPh=getPh;
const PHOLD='data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="80" height="80" fill="#E3EAE6"/><text x="40" y="47" font-size="26" text-anchor="middle">📷</text></svg>');
function zoomSrc(src){const w=h('div',{class:'zoom',onclick:()=>w.remove()},h('img',{src}));document.body.append(w)}
function lazyThumb(id,eager){const img=h('img',{class:'th',alt:'photo',src:PHOLD});let p=null,busy=false;
 const load=async()=>{if(busy||p)return;busy=true;p=await getPh(id);busy=false;if(p)img.src=p.data;else img.title='Photo pas encore disponible (réseau ?)'};
 img.onclick=async()=>{if(!p)await load();if(p)zoomSrc(p.data);else toast('Photo indisponible pour l’instant (réseau ?)',true)};
 if(eager||!('IntersectionObserver' in window))load();else{const io=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){io.disconnect();load()}},{rootMargin:'200px'});io.observe(img)}
 return img}
thumb=async function(id){return lazyThumb(id,true)};

/* photos plus légères : 1280 px, qualité 0,6 (≈ 250 Ko au lieu de ≈ 600 Ko) */
compress=async function(file){const M=1280,Q=0.6;
 const draw=(src,w0,h0)=>{const k=Math.min(1,M/Math.max(w0,h0));const w=Math.max(1,Math.round(w0*k)),hh=Math.max(1,Math.round(h0*k));const c=document.createElement('canvas');c.width=w;c.height=hh;c.getContext('2d').drawImage(src,0,0,w,hh);const d=c.toDataURL('image/jpeg',Q);if(!d||d.length<200)throw new Error('canvas');return d};
 // 1) décodage direct (le plus robuste sur Android, gère les très grandes photos)
 try{if(window.createImageBitmap){const b=await createImageBitmap(file,{imageOrientation:'from-image'});const d=draw(b,b.width,b.height);b.close&&b.close();return d}}catch(e){}
 // 2) méthode classique
 try{return await new Promise((ok,ko)=>{const img=new Image();const url=URL.createObjectURL(file);img.onload=()=>{try{const d=draw(img,img.naturalWidth,img.naturalHeight);URL.revokeObjectURL(url);ok(d)}catch(e){ko(e)}};img.onerror=()=>{URL.revokeObjectURL(url);ko(new Error('decode'))};img.src=url})}catch(e){}
 // 3) dernier recours : on garde la photo telle quelle (rien n'est perdu)
 if(file.size&&file.size<9e6){const d=await new Promise((ok,ko)=>{const r=new FileReader();r.onload=()=>ok(r.result);r.onerror=()=>ko(r.error);r.readAsDataURL(file)});toast('Photo gardée telle quelle'+(/hei[cf]/i.test(file.type+file.name)?' (format HEIC)':''));return d}
 throw new Error(`format ${file.type||'?'} ${(file.size/1e6).toFixed(1)} Mo`)};

/* galerie : toutes les photos de l'équipe */
const TLAB={rep_obs:'🦎 Reptile',oi_contact:'🐦 Oiseau',oi_nid:'🐦 Nid',fo_obs:'🐜 Fourmis',espece:'🌿 Espèce',arbre:'🌳 Arbre',jeunes:'🌱 Jeunes plants',herbier:'📚 Herbier',carre:'▦ Carré',note:'📝 Note',eee:'⚠ Envahissante'};
function recTxt(rid){const r=R[rid];if(!r)return '';let t=TLAB[r.type]||r.type;try{if(SCH[r.type]&&SCH[r.type].lab)t+=' – '+SCH[r.type].lab(r)}catch(e){}return t}
function galleryCard(){const box=h('div',{class:'gal'});const st=h('p',{class:'muted'},'');let off=0;const N=30;const seen=new Set();
 const filt=S.galf||'tout';
 const sel=h('select',{onchange:e=>{S.galf=e.target.value;saveS();render()}},[['tout','Toutes les photos'],['moi','Mes photos'],['rep_obs','Reptiles'],['oi','Oiseaux'],['fo_obs','Fourmis'],['pl','Plantes']].map(([k,l])=>h('option',{value:k,selected:k===filt},l)));
 const okT=rid=>{const r=R[rid];const t=r&&r.type;if(filt==='tout'||filt==='moi')return true;if(filt==='oi')return /^oi_/.test(t||'');if(filt==='pl')return ['espece','arbre','jeunes','herbier','carre','eee'].includes(t);return t===filt};
 const add=x=>{if(seen.has(x.id))return;if(filt==='moi'&&x.obs!==S.obs)return;if(!okT(x.rec))return;seen.add(x.id);
  box.append(h('div',{class:'gi'},lazyThumb(x.id),h('div',{class:'gt'},h('b',{},recTxt(x.rec)||x.label||'Photo'),h('span',{},`${(x.obs||'').split(' ')[0]} · ${x.ts?new Date(x.ts).toLocaleString('fr-FR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'}):''}${x.label?' · '+x.label:''}`),
   R[x.rec]&&SCH[R[x.rec].type]?h('button',{class:'linkb',onclick:()=>editModal(x.rec,render)},'Voir la fiche ✏'):'')))};
 const more=h('button',{class:'btn2',onclick:()=>page()},'Afficher plus');
 async function page(){more.disabled=true;st.textContent='Chargement…';
  try{if(off===0){(await pAll()).filter(p=>!p.synced).sort((a,b)=>a.ts<b.ts?1:-1).forEach(p=>add({id:p.id,rec:p.rec,label:p.label,obs:p.obs,ts:p.ts}))}
   if(navigator.onLine&&S.team){const rows=await api(`photos?select=id,rec_id,label,obs,ts&order=ts.desc&limit=${N}&offset=${off}`);off+=rows.length;rows.forEach(x=>add({id:x.id,rec:x.rec_id,label:x.label,obs:x.obs,ts:x.ts}));more.style.display=rows.length<N?'none':''}
   else{(await pAll()).sort((a,b)=>a.ts<b.ts?1:-1).forEach(p=>add({id:p.id,rec:p.rec,label:p.label,obs:p.obs,ts:p.ts}));more.style.display='none'}
   st.textContent=seen.size?`${seen.size} photo(s) affichée(s). Toucher une photo pour l’agrandir.`:'Aucune photo.';
  }catch(e){st.textContent='Pas de réseau : seules les photos de ce téléphone sont visibles.';(await pAll()).forEach(p=>add({id:p.id,rec:p.rec,label:p.label,obs:p.obs,ts:p.ts}))}
  more.disabled=false}
 const open=h('button',{class:'btn',onclick:()=>{open.remove();sel.style.display='';page()}},'📷 Voir toutes les photos');sel.style.display='none';
 return h('div',{class:'card'},h('h3',{},'📷 Photos de l’équipe'),h('p',{class:'muted'},'Toutes les photos prises par l’équipe, sur tous les téléphones. Elles se chargent au fur et à mesure (réseau nécessaire pour celles des collègues).'),open,h('div',{class:'row'},sel),st,box,more)}
const _r2=render;render=function(){_r2();
 if(S.tab==='donnees'){const c=galleryCard();const ed=[...V.querySelectorAll('.card')].find(x=>/Corriger une saisie/.test(x.querySelector('h3')?.textContent||''));ed?ed.before(c):V.append(c)}
 if(S.tab==='reptiles'){const s=R[S.rep];if(s&&s.fin){V.querySelectorAll('.card .actions button').forEach(b=>{if(/Reprendre/.test(b.textContent))b.textContent='↺ Rouvrir la session';if(/Terminer/.test(b.textContent))b.style.display='none'})}}};
document.head.append(h('style',{},`.gal{display:flex;flex-direction:column;gap:8px;margin:8px 0}.gi{display:flex;gap:10px;align-items:center;background:#fff;border-radius:10px;padding:6px}.gi .th{width:84px;height:84px;object-fit:cover;border-radius:8px;flex:none}.gt{display:flex;flex-direction:column;gap:2px;font-size:14px;min-width:0}.gt span{color:#5b6b62;font-size:12.5px}.gt .linkb{align-self:flex-start;padding:2px 0}`));

/* ---------- v2.3.7 : volet HERBIER guidé (priorités, méthode, photos) ---------- */
const HPH=[['port','1. Port de la plante','La plante entière, en reculant de 3 à 5 m, avec une personne ou le jalon à côté pour l’échelle.',true],
 ['fdessus','2. Feuille – dessus','Une feuille posée à plat sur le carnet (fond clair), face du dessus, avec la règle ou le mètre.',true],
 ['fdessous','3. Feuille – dessous','La même feuille retournée : nervures, poils, glandes. Bien net, de près.',true],
 ['fleurs','4. Fleurs ou fruits','Gros plan (mode macro). Si ni fleurs ni fruits : passer.',false],
 ['ecorce','5. Tronc / écorce','L’écorce à hauteur de poitrine. Si latex, odeur ou couleur sous l’écorce : le noter en remarque.',false],
 ['etiq','6. Échantillon + étiquette','Le rameau coupé posé sur fond clair, avec l’étiquette du n° LOY bien lisible.',true]];
const nrm=x=>String(x||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/\s+/g,' ').trim();
const UNK=/(\bsp\b\.?|\bspp\b|indet|indét|inconnu|\?|provisoire|^plante |^arbre |^liane |^herbe )/i;
const STN={L:'Endémique des Loyauté',N:'Endémique de Nouvelle-Calédonie',I:'Indigène',A:'Introduite ancienne',M:'Introduite moderne'};
let BIN=null;function info2(n){let I=window.eieInfo&&eieInfo(n);if(I)return I;const w=nrm(n).replace(/[^a-z ]/g,' ').split(' ').filter(Boolean);if(w.length<2||/^(sp|spp)$/.test(w[1]))return null;
 if(!BIN){BIN=new Map();(window.FLORE||[]).forEach(f=>{const k=nrm(f[0]).split(' ').slice(0,2).join(' ');if(!BIN.has(k))BIN.set(k,{st:f[2],ab:f[5],fam:f[1]})})}
 return BIN.get(w[0]+' '+w[1])||null}
function herbPriorities(){const sp={};
 const addN=(n,r)=>{n=String(n||'').trim();if(!n)return;const k=nrm(n);const o=sp[k]||(sp[k]={n,car:new Set(),nb:0,hnum:''});o.car.add(r.carre||'?');o.nb++;if(r.herbier||r.n_herbier)o.hnum=o.hnum||r.herbier||r.n_herbier};
 live('espece').forEach(r=>addN(r.espece,r));live('arbre').forEach(r=>addN(r.espece,r));live('jeunes').forEach(r=>addN(r.espece,r));
 const done={};live('herbier').forEach(r=>{done[nrm(r.nom)]=r.num});
 const out=[];for(const [k,o] of Object.entries(sp)){const I=info2(o.n),P=window.eieProt&&eieProt(o.n),E=window.eieEnvOf&&eieEnvOf(o.n);
  let p=0,why='';
  if(P){p=9;why='🛡 Protégée : photos seulement, PAS de prélèvement'}
  else if(UNK.test(o.n)||(!I&&!E)){p=1;why='🌿 Non identifiée : échantillon obligatoire'}
  else if(I&&I.st==='L'){p=2;why='⭐ '+STN.L}
  else if(I&&I.st==='N'&&/rare/i.test(I.ab||'')){p=2;why='⭐ Endémique NC, rare à Ouvéa'}
  else if(I&&I.st==='N'){p=3;why='⭐ '+STN.N+' (au choix de Jean-Marie)'}
  else if(I&&I.st==='I'&&/rare/i.test(I.ab||'')){p=3;why='Indigène rare à Ouvéa (au choix de Jean-Marie)'}
  else continue;
  out.push({...o,p,why,car:[...o.car].sort().join(' '),fait:done[k]||o.hnum||''})}
 return out.sort((a,b)=>(!!a.fait-!!b.fait)||a.p-b.p||b.nb-a.nb)}
function newHerb(o){const r=newRec('herbier');r.nom=o?o.n:'';r.carre=(o&&o.car.split(' ')[0])||S.carre;r.quart=S.quart||'a';r.num=nextHerb();r.photos=[];r.phg={};
 try{window.eieFix&&eieFix.startFix()}catch(e){}put(r);S.herbSel=r.id;saveS();toast('N° '+r.num+' – écrire ce numéro sur l’étiquette');render();setTimeout(()=>document.querySelector('.hguide')?.scrollIntoView({behavior:'smooth'}),100)}
async function shoot(r,k,lab){const id=await addPhoto(r,`${r.num} ${lab}`);if(!id)return;r.photos=r.photos||[];r.photos.push(id);r.phg=r.phg||{};r.phg[k]=id;put(r);toast('Photo enregistrée – envoyée au serveur à la prochaine synchro');render();if(navigator.onLine)setTimeout(()=>sync(false),800)}
function guideCard(r){const g=r.phg||{};const need=HPH.filter(x=>x[3]);const ok=need.filter(x=>g[x[0]]).length;
 return h('div',{class:'card hguide'},h('h3',{},`📷 ${r.num} – ${r.nom||'nom provisoire ?'}`),
  h('p',{class:'muted'},`Carré ${r.carre||''}${r.quart||''} · ${ok}/${need.length} photos obligatoires · ${r.lat?'📍 GPS pris':'📍 GPS en cours…'}`),
  ...HPH.map(([k,t,x,req])=>h('div',{class:'hph'+(g[k]?' ok':'')},g[k]?lazyThumb(g[k]):h('div',{class:'hnum'},g[k]?'✔':(req?'●':'○')),
   h('div',{class:'htx'},h('b',{},t+(req?'':' (si possible)')),h('span',{},x)),
   h('button',{class:g[k]?'btn2':'btn',onclick:()=>shoot(r,k,t.replace(/^\d\. /,''))},g[k]?'Refaire':'📷'))),
  h('div',{class:'actions'},h('button',{class:'btn2',onclick:()=>editModal(r.id,render)},'✏ Fleurs / fruits / remarque'),h('button',{class:'linkb',onclick:()=>{S.herbSel='';saveS();render()}},'Fermer')))}
function herbView(){const pr=herbPriorities();const todo=pr.filter(x=>!x.fait&&x.p<9),prot=pr.filter(x=>x.p===9),fait=pr.filter(x=>x.fait&&x.p<9);
 const meth=h('details',{class:'card hmeth',open:!live('herbier').length},h('summary',{},'📚 Comment faire un échantillon (6 étapes)'),h('ol',{},
  h('li',{},h('b',{},'Choisir le pied : '),'sain, typique, si possible avec fleurs ou fruits (fertile).'),
  h('li',{},h('b',{},'Toucher « Récolter » : '),'l’appli donne le n° LOY-OUV26-… et prend le point GPS.'),
  h('li',{},h('b',{},'Photos AVANT de couper : '),'suivre la liste (port, feuille dessus/dessous, fleurs-fruits, écorce).'),
  h('li',{},h('b',{},'Couper un rameau de 30 à 40 cm '),'(la taille d’une page de journal) avec feuilles + fleurs/fruits. 2 ou 3 parts si la plante est abondante.'),
  h('li',{},h('b',{},'Étiquette au crayon '),'avec le n° LOY attachée au rameau → dernière photo « échantillon + étiquette ».'),
  h('li',{},h('b',{},'Sac fermé à l’ombre, '),'puis presse le soir même entre papier journal (Jean-Marie). Changer le papier chaque jour.')),
  h('p',{class:'muted'},'🛡 Espèces protégées : jamais de prélèvement sans autorisation → photos seulement (même liste de photos, sans couper). Les photos partent sur le serveur (Supabase) à la synchro, avec le n° LOY dans leur nom.'));
 const row=(o,act)=>h('div',{class:'hli'},h('div',{class:'htx'},h('b',{},o.n),h('span',{},`${o.why} · ${o.car}${o.fait?' · ✔ '+o.fait:''}`)),act);
 const recBtn=o=>h('button',{class:'btn',onclick:()=>newHerb(o)},'Récolter');
 const phBtn=o=>h('button',{class:'btn2',onclick:()=>newHerb(o)},'📷 Photos');
 const box=[meth];
 const sel=R[S.herbSel];if(sel&&!sel.deleted&&sel.type==='herbier')box.unshift(guideCard(sel));
 box.push(h('div',{class:'card'},h('h3',{},`🎯 À récolter en priorité (${todo.length})`),
  h('p',{class:'muted'},'Liste faite automatiquement à partir des espèces déjà notées dans les carrés. En haut : les non identifiées, puis les endémiques.'),
  todo.length?h('div',{},todo.map(o=>row(o,recBtn(o)))):h('p',{class:'muted'},'Rien à récolter pour l’instant.'),
  h('button',{class:'btn2',onclick:()=>newHerb(null)},'+ Autre échantillon (espèce hors liste)')));
 if(prot.length)box.push(h('div',{class:'card'},h('h3',{},`🛡 Protégées : photos seulement (${prot.length})`),prot.map(o=>row(o,phBtn(o)))));
 const hs=live('herbier').sort((a,b)=>String(a.num)<String(b.num)?1:-1);
 box.push(h('div',{class:'card'},h('h3',{},`✔ Échantillons déjà faits (${hs.length})`),hs.length?hs.map(r=>{const n=HPH.filter(x=>x[3]&&(r.phg||{})[x[0]]).length;
  return h('div',{class:'hli',onclick:()=>{S.herbSel=r.id;saveS();render();setTimeout(()=>document.querySelector('.hguide')?.scrollIntoView(),50)}},h('div',{class:'htx'},h('b',{},`${r.num} – ${r.nom||'?'}`),h('span',{},`${r.carre||''}${r.quart||''} · ${(r.obs||'').split(' ')[0]} · photos guidées ${n}/4 ${n<4?'⚠':'✔'} · ${(r.photos||[]).length} photo(s)`)),h('span',{},'›'))}):h('p',{class:'muted'},'Aucun.')));
 return box}
const _r3=render;render=function(){_r3();if(S.tab!=='plantes')return;
 if(S.herb){V.innerHTML='';V.append(h('button',{class:'btn2 hback',onclick:()=>{S.herb=0;saveS();render()}},'← Retour aux carrés'),h('h2',{class:'htitle'},'📚 Herbier'));herbView().forEach(c=>V.append(c));return}
 const n=herbPriorities().filter(x=>!x.fait&&x.p<9).length;
 V.prepend(h('button',{class:'btn herbgo',onclick:()=>{S.herb=1;saveS();render();scrollTo(0,0)}},`📚 Herbier – ${n} espèce(s) à récolter · ${live('herbier').length} fait(s)`))};
document.head.append(h('style',{},`.hmeth summary{font-weight:700;color:#1F4D33;cursor:pointer}.hmeth ol{padding-left:20px;margin:8px 0}.hmeth li{margin:4px 0}
.hli{display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid #E3EAE6}.hli .btn,.hli .btn2{flex:none;padding:8px 12px;min-height:0;width:auto}
.htx{flex:1;display:flex;flex-direction:column;min-width:0}.htx span{font-size:12.5px;color:#5b6b62}
.hph{display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid #E3EAE6}.hph .th{width:56px;height:56px;object-fit:cover;border-radius:8px;flex:none}
.hph .hnum{width:56px;height:56px;border-radius:8px;background:#E3EAE6;display:flex;align-items:center;justify-content:center;color:#C0392B;flex:none}.hph.ok .htx b{color:#1F4D33}
.hph .btn,.hph .btn2{flex:none;width:auto;min-height:0;padding:10px 14px}.hguide{border:2px solid #2E7D4F}.herbgo{margin:8px 0 10px;background:#5D4037}.hback{width:auto;margin:6px 0}.htitle{margin:6px 2px;color:#1F4D33}`));
render();
})();
