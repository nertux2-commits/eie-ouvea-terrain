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
 // Reptiles : rappel
 if(S.tab==='reptiles'){const c=[...V.querySelectorAll('.card')].find(x=>/Temps de recherche/.test(x.textContent));if(c&&!c.querySelector('.cnote'))c.append(h('p',{class:'muted cnote'},'Le temps du chrono est noté tout seul sur chaque reptile. ⏹ Terminer à la fin du parcours.'))}
};
document.head.append(h('style',{},`#chronobar{position:sticky;top:var(--hh,108px);z-index:6;display:flex;flex-direction:column;gap:2px;background:#102A1C;padding:4px 8px}
#chronobar .chb{display:flex;align-items:center;gap:8px;color:#fff;font-size:14px;padding:4px 2px;cursor:pointer}.chb .cl{flex:1;font-weight:600}.chb .ct{font-variant-numeric:tabular-nums;font-weight:800;font-size:18px;color:#FFE082}
#chronobar button{background:rgba(255,255,255,.18);border:0;color:#fff;border-radius:8px;width:40px;height:34px;font-size:16px}`));
const setH=()=>{const hh=document.querySelector('header');if(hh)document.documentElement.style.setProperty('--hh',hh.offsetHeight+'px')};setH();addEventListener('resize',setH);
render();
})();
