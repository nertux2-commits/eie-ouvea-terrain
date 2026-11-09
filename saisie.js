// v1.6 – Saisie rapide : suggestions d'espèces (flore Butaud 2014), statut automatique, formulaires allégés, synchro automatique
(function(){
const FL=window.FLORE||[];
const ST={L:'Endémique Loyauté',N:'Endémique NC',I:'Indigène',A:'Introduite ancienne',M:'Introduite moderne'};
const STC={L:'#1B7F3B',N:'#2E7D4F',I:'#1565C0',A:'#7B6A4E',M:'#757575'};
const STATS=['',ST.L,ST.N,ST.I,ST.A,ST.M,'Inconnu (?)'];
const TYP=t=>/^Arbre/.test(t)?'Arbre':/Arbuste|Arbrisseau/.test(t)?'Arbuste':/Liane|Sarmenteux/.test(t)?'Liane':/Herbac/.test(t)?'Herbe':/Fougère/.test(t)?'Fougère':/piphyte/.test(t)?'Épiphyte':'';
const AB={'Très commun':6,'Commun':5,'Assez commun':4,'Peu commun':3,'Rare':2,'Très rare':1,'Non observé':0};
const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/\s+/g,' ').trim();

/* ---- schémas : statut automatique sur toutes les fiches plantes ---- */
for(const t of ['espece','arbre','jeunes']){const f=SCH[t].f;const i=f.findIndex(x=>x[0]==='statut');
 if(i>-1)f[i]=['statut','Statut (rempli automatiquement)','sel',STATS];else{const j=f.findIndex(x=>x[0]==='espece');f.splice(j+1,0,['statut','Statut (rempli automatiquement)','sel',STATS])}}


/* ---- faune d'Ouvéa : Jourdan et al. 2020, rapport EEE PIL/IRD-IAC (convention 255/2016) ---- */
const FAUNE={
 reptiles:[['Bavayia crassicollis','Bavayia des rivages (gecko)','Endémique Loyauté'],['Emoia loyaltiensis','Emoia des Loyauté (scinque)','Endémique Loyauté'],
  ['Caledoniscincus austrocaledonicus','scinque de litière','Endémique NC'],['Caledoniscincus haplorhinus','scinque de litière','Endémique NC'],['Caledoniscincus atropunctatus','scinque de litière – disparition possible','Indigène'],
  ['Cryptoblepharus novocaledonicus','scinque des rochers littoraux','Endémique NC'],['Epibator nigrofasciolatus','scinque','Endémique NC'],['Phoboscincus garnieri','grand scinque – disparition possible','Endémique NC'],
  ['Emoia cyanura','Emoia à queue bleue (scinque)','Indigène'],['Gehyra georgpotthasti','grand gecko (20 cm)','Indigène'],['Candoia bibroni','Boa du Pacifique','Indigène'],
  ['Nactus pelagicus','gecko','Introduite'],['Lepidodactylus lugubris','gecko des maisons','Introduite'],['Hemidactylus frenatus','Margouillat des maisons','Introduite'],['Hemidactylus garnotii','gecko','Introduite'],
  ['Hemiphyllodactylus typus','gecko','Introduite'],['Indotyphlops braminus','Typhlops bramin (serpent aveugle)','Introduite'],['Ranoidea aurea','Rainette (grenouille)','Introduite'],
  ['Gecko indéterminé','à photographier','Inconnu'],['Scinque indéterminé','à photographier','Inconnu']],
 fourmis:[['Leptomyrmex pallens','fourmi araignée','Endémique NC'],['Camponotus chloroticus','','Indigène'],['Odontomachus simillimus','fourmi à mâchoires','Indigène'],['Pheidole fervens','','Indigène'],['Tetramorium pacificum','','Indigène'],['Technomyrmex vitiensis','','Indigène'],
  ['Anoplolepis gracilipes','fourmi folle jaune – ENVAHISSANTE','Introduite'],['Wasmannia auropunctata','fourmi électrique – ENVAHISSANTE','Introduite'],['Pheidole megacephala','fourmi noire à grosse tête – ENVAHISSANTE','Introduite'],
  ['Solenopsis geminata','fourmi de feu tropicale – ENVAHISSANTE','Introduite'],['Paratrechina longicornis','fourmi folle noire','Introduite'],['Tapinoma melanocephalum','fourmi fantôme','Introduite'],['Technomyrmex albipes','','Introduite'],
  ['Brachymyrmex obscurior','','Introduite'],['Nylanderia vaga','','Introduite'],['Cardiocondyla emeryi','','Introduite'],['Cardiocondyla obscurior','','Introduite'],['Monomorium floricola','','Introduite'],['Monomorium pharaonis','fourmi du pharaon','Introduite'],
  ['Fourmi indéterminée','mettre en tube','Inconnu']],
 oiseaux:[["Perruche d'Ouvéa",'Eunymphicus uvaeensis · PEOU','Endémique Ouvéa'],['Martin-chasseur des Loyauté','Todiramphus sanctus macmillani · MALO','Endémique Loyauté'],['Myzomèle cardinal','Myzomela cardinalis lifuensis · MYCR','Endémique Loyauté'],
  ['Gérygone des Loyauté','Gerygone flavolateralis lifuensis · GELI','Endémique Loyauté'],['Échenilleur-pie des Loyauté','Lalage leucopyga simillima · ECPIL','Endémique Loyauté'],['Siffleur doré','Pachycephala chlorura littayei · SIDO','Endémique Loyauté'],
  ['Monarque des Loyauté','Myiagra caledonica viridinitens · MOLO','Endémique Loyauté'],['Stourne des Loyauté','Aplonis striata atronitens · STLO','Endémique Loyauté'],['Zostérops à dos gris des Loyauté','Zosterops lateralis nigrescens · ZOMA','Endémique Loyauté'],
  ['Loriquet à tête bleue','Trichoglossus haematodus deplanchei · LOTE','Indigène'],['Méliphage à oreillons gris','Lichmera incana · MEOR','Indigène'],['Pigeon à gorge blanche','Columba vitiensis hypoenochroa · PIGO','Indigène'],['Ptilope de Grey','Ptilinopus greyii · PTGR','Indigène'],
  ['Columbine turvert','Chalcophaps longirostris · COTU','Indigène'],['Coucou éclatant','Chrysococcyx lucidus layardi · COEC','Indigène'],['Coucou à éventail','Cacomantis flabelliformis · COEV','Indigène'],['Autour australien','Accipiter fasciatus vigilax · AUAU','Indigène'],
  ['Busard de Gould','Circus approximans · BUGO','Indigène'],['Faucon pèlerin','Falco peregrinus nesiotes · FAPE','Indigène'],['Effraie des clochers','Tyto javanica delicatula · EFCL','Indigène'],['Râle tiklin','Gallirallus philippensis swindellsi · RATI','Indigène'],
  ['Talève sultane','Porphyrio porphyrio samoensis · TASU','Indigène'],['Salangane à croupion blanc','Aerodramus spodiopygius · SACR','Indigène'],['Salangane soyeuse','Collocalia esculenta albidior · SASO','Indigène'],['Hirondelle du Pacifique','Hirundo tahitica subfusca · HIPA','Indigène'],
  ['Hirondelle messagère','Hirundo neoxena · HIME','Indigène'],['Langrayen à ventre blanc','Artamus leucorhynchus melaleucus · LAVE','Indigène'],['Aigrette sacrée','Egretta sacra albolineata · AISA','Indigène'],['Pluvier fauve','Pluvialis fulva · PLFA','Indigène'],
  ['Oiseau indéterminé','noter le chant / la description','Inconnu']]};
for(const [arr,k] of [[REPTILES,'reptiles'],[FOURMIS,'fourmis'],[OISEAUX,'oiseaux']]){arr.length=0;arr.push(...FAUNE[k].map(f=>f[0]))}
const FCOL={'Endémique Ouvéa':'#0B6B2E','Endémique Loyauté':'#1B7F3B','Endémique NC':'#2E7D4F','Indigène':'#1565C0','Introduite':'#757575','Inconnu':'#9E9E9E'};
/* ---- index des noms ---- */
const PROTM=new Map(PROT.map(p=>[norm(p[0]),p]));
let IDX=null;
function plantIndex(){if(IDX)return IDX;const m=new Map();
 for(const v of FL){m.set(norm(v[0]),{n:v[0],fam:v[1],st:v[2],ty:v[3],ouv:v[4],ab:v[5]})}
 for(const p of PROT){const k=norm(p[0]);if(!m.has(k))m.set(k,{n:p[0],fam:p[1],st:'',ty:'',ouv:1,ab:p[3]||''})}
 IDX=m;return m}
function entries(kind){
 if(kind==='plantes'){const m=plantIndex();for(const k in FLU){if(!m.has(norm(k))&&!m.has(two(k))){const st=/Endémique des Loyauté|Endémique Loyauté/.test(FLU[k][4])?'L':/Endémique/.test(FLU[k][4])?'N':/Introduction/.test(FLU[k][4])?'A':'I';m.set(norm(k),{n:k,fam:FLU[k][3].split('–')[0].trim(),st,ty:FLU[k][3].split('–')[1]||'',ouv:1,ab:''})}}const extra=lists().plantes.filter(n=>!m.has(norm(n))).map(n=>({n,fam:'saisie équipe',st:'',ty:'',ouv:1,ab:'',team:1}));return [...m.values(),...extra]}
 const F=FAUNE[kind]||[];const known=new Set(F.map(f=>norm(f[0])));
 return [...F.map(f=>({n:f[0],fam:f[1],stl:f[2],st:'',ty:'',ouv:1,ab:''})),...(lists()[kind]||[]).filter(n=>!known.has(norm(n))&&!/–|\(/.test(n)).map(n=>({n,fam:'saisie équipe',st:'',ty:'',ouv:1,ab:'',team:1}))]}
function info(n){return plantIndex().get(norm(n))}
function search(kind,q){const qs=norm(q).split(' ').filter(Boolean);if(!qs.length)return[];const out=[];
 for(const e of entries(kind)){const fv=kind==='plantes'?flu(e.n):null;const w=norm(e.n+(kind==='plantes'?(fv?' '+fv[3]:''):' '+e.fam)).replace(/[·()'’-]/g,' ').split(' ').filter(Boolean);let ok=true,pos=0;
  for(const t of qs){const k=w.findIndex((x,i)=>i>=pos&&x.startsWith(t));if(k<0){ok=false;break}pos=k+1}
  if(!ok)continue;let s=0;if(w[0].startsWith(qs[0]))s+=100;if(e.ouv===1)s+=30;s+=(AB[e.ab]||0)*3;if(e.team)s+=40;if(PROTM.has(norm(e.n)))s+=5;s-=e.n.length*.1;out.push([s,e])}
 return out.sort((a,b)=>b[0]-a[0]).slice(0,8).map(x=>x[1])}
function badge(e){const b=[];const p=PROTM.get(norm(e.n));
 if(e.st)b.push(`<span class="bdg" style="background:${STC[e.st]}">${ST[e.st]}</span>`);
 if(e.stl)b.push(`<span class="bdg" style="background:${FCOL[e.stl]||'#666'}">${e.stl}</span>`);if(/ENVAHISSANTE/.test(e.fam))b.push('<span class="bdg" style="background:#E65100">Envahissante</span>');
 if(p)b.push(`<span class="bdg" style="background:#C62828">Protégée G${p[2]}</span>`);
 if(e.team)b.push('<span class="bdg" style="background:#8D6E63">déjà saisie</span>');
 return b.join(' ')}
function line(e){if(e.stl!==undefined)return e.fam.replace(' – ENVAHISSANTE','');return [e.fam,e.ouv===1?(e.ab?'Ouvéa : '+e.ab.toLowerCase():'présente à Ouvéa'):e.ouv===2?'Ouvéa : à confirmer':e.fam&&e.fam!=='saisie équipe'?'pas citée à Ouvéa':''].filter(Boolean).join(' · ')}


/* ---- florule illustrée (Butaud 2014, annexe 5) ---- */
const FLU=window.FLORULE||{},FROWS=window.FLORULE_ROWS||[];
const two=n=>norm(n).replace(/\b(cf|aff)\.?\s/g,'').split(' ').slice(0,2).join(' ');
const FLN=new Map(),FL2=new Map();for(const k in FLU){FLN.set(norm(k),k);if(!FL2.has(two(k)))FL2.set(two(k),k)}
function flu(n){const k=FLN.get(norm(n))||FL2.get(two(n));return k?[k,...FLU[k]]:null}
function fthumb(n,w,hh,big){const f=flu(n);if(!f)return null;const [,s,i]=f;const rows=FROWS[s]||8;const c=i%8,r=Math.floor(i/8);
 const d=h('div',{class:'fth',style:`width:${w}px;height:${hh}px;background-image:url('florule/f${s}.jpg');background-size:800% ${rows*100}%;background-position:${c*100/7}% ${rows>1?r*100/(rows-1):0}%`});
 if(big)d.addEventListener('click',e=>{e.stopPropagation();fzoom(n)});return d}
function fzoom(n){const f=flu(n);if(!f)return;const W=Math.min(innerWidth-20,420);
 const z=h('div',{class:'zoom',onclick:()=>z.remove()},fthumb(n,W,W*4/3),h('div',{class:'zcap'},h('b',{},h('i',{},f[0])),h('br'),f[3]?'Noms : '+f[3]:'',h('br'),f[4]+' · '+f[5],h('br'),h('span',{style:'opacity:.7'},'Florule des îles Loyauté – J.-F. Butaud 2014 / Province des Îles')));document.body.append(z)}
window.fthumb=fthumb;
/* ---- champ avec suggestions ---- */
function rowOf(box,labelStart){return [...box.querySelectorAll('.row')].find(r=>(r.querySelector('.lab')?.textContent||'').startsWith(labelStart))}
function setSel(box,labelStart,val){const r=rowOf(box,labelStart);const s=r&&r.querySelector('select');if(!s||!val)return;if(![...s.options].some(o=>o.value===val))s.append(h('option',{value:val},val));s.value=val;s.classList.add('auto');setTimeout(()=>s.classList.remove('auto'),1200)}
function attachAC(inp,kind,box,type,field){
 inp.removeAttribute('list');inp.setAttribute('autocapitalize','off');inp.setAttribute('autocorrect','off');inp.setAttribute('spellcheck','false');
 inp.placeholder=kind==='plantes'?'Tapez les 1res lettres du genre (ex. syz, ficus pro…)':'Tapez les 1res lettres…';
 const row=inp.closest('.row');row.classList.add('acrow');
 const dd=h('div',{class:'acdd'});const inf=h('div',{class:'acinf'});
 const recent=[...new Map(live(type).sort((a,b)=>a.ts<b.ts?1:-1).map(r=>r[field]).filter(Boolean).map(v=>[norm(v),v])).values()].slice(0,6);
 if(recent.length)row.insertBefore(h('div',{class:'chips'},h('span',{class:'muted'},'Récentes : '),recent.map(v=>h('button',{type:'button',class:'chip',onclick:()=>pick(v)},v))),inp);
 inp.after(dd,inf);
 const apply=n=>{const e=kind==='plantes'?info(n):null;inf.innerHTML='';
  if(e){inf.innerHTML=badge(e)+' <span class="muted">'+line(e)+'</span>';{const t=fthumb(e.n,84,112,true);if(t){const fv=flu(e.n);inf.prepend(h('div',{class:'fbox'},t,h('div',{class:'muted'},fv[3]?'Noms : '+fv[3]:'','  ',h('a',{href:'#',onclick:ev=>{ev.preventDefault();fzoom(e.n)}},'agrandir'))))}}
   if(e.st)setSel(box,'Statut',ST[e.st]);const ty=TYP(e.ty);if(ty)setSel(box,'Type',ty);
   const p=PROTM.get(norm(e.n));if(p)inf.innerHTML+='<div class="protw">⚠ Espèce protégée : compter tous les pieds (fiche Protégées), GPS et photo, pas de prélèvement.</div>'}
  else if(kind!=='plantes'){const f=(FAUNE[kind]||[]).find(x=>norm(x[0])===norm(n));if(f)inf.innerHTML=badge({n:f[0],fam:f[1],stl:f[2]})+' <span class="muted">'+f[1].replace(' – ENVAHISSANTE','')+'</span>'}
  else if(kind==='plantes'&&n.trim()){setSel(box,'Statut','Inconnu (?)');inf.innerHTML='<span class="muted">Nom hors liste Butaud : nom provisoire accepté, statut à vérifier.</span>'}};
 const pick=n=>{inp.value=n;dd.innerHTML='';dd.style.display='none';apply(n);inp.dispatchEvent(new Event('input'));inp.blur()};
 const show=()=>{const r=search(kind,inp.value);dd.innerHTML='';if(!r.length||norm(inp.value)===norm(r[0].n)&&r.length===1){dd.style.display='none';return}
  for(const e of r){const it=h('div',{class:'acit',html:`<div class="actx"><div><b>${e.n.replace(/^(\S+)/,'<i>$1</i>')}</b></div><div class="acsub">${badge(e)} ${line(e)}${kind==='plantes'&&flu(e.n)&&flu(e.n)[3]?'<br><span class="vern">'+flu(e.n)[3]+'</span>':''}</div></div>`});const t=kind==='plantes'?fthumb(e.n,46,61):null;if(t)it.prepend(t);
   it.addEventListener('pointerdown',ev=>{ev.preventDefault();pick(e.n)});dd.append(it)}dd.style.display='block'};
 inp.addEventListener('input',e=>{if(e.isTrusted!==false)show()});inp.addEventListener('focus',show);
 inp.addEventListener('blur',()=>setTimeout(()=>{dd.style.display='none';apply(inp.value)},150));
 if(inp.value)apply(inp.value);
}

/* ---- formulaires allégés ---- */
const OPTK={espece:['herbier','photos','remarque'],arbre:['tige','mode_h','etat','gps','photos','remarque'],jeunes:['broute','herbier','photos'],herbier:['gps','photos','remarque'],
 protegee:['remarque'],rep_obs:['hauteur','gps','photos','remarque'],fo_obs:['tube','photos','remarque'],oi_contact:['remarque'],oi_nid:['entree','orientation','gps','photos','remarque']};
const KIND={plantes:['espece','arbre','jeunes','herbier','oi_nid'],reptiles:['rep_obs'],fourmis:['fo_obs'],oiseaux:['oi_contact','oi_nid']};
let LASTSAVE=0;
const _form=form;form=function(type,ctx,editId,after){
 const box=_form(type,ctx,editId,after);const sc=SCH[type];if(!sc)return box;
 const rows=[...box.children].filter(e=>e.classList&&e.classList.contains('row'));
 if(rows.length===sc.f.length){
  sc.f.forEach(([k,,t,opt],i)=>{const inp=rows[i].querySelector('input[type=text]');if(t==='text'&&opt&&inp){attachAC(inp,opt,box,type,k)}});
  const ok=OPTK[type]||[];const opt=sc.f.map((f,i)=>ok.includes(f[0])?rows[i]:null).filter(Boolean);
  if(opt.length){const rec=editId?R[editId]:null;const filled=rec&&ok.some(k=>rec[k]&&(!Array.isArray(rec[k])||rec[k].length));
   const det=h('details',{class:'more'},h('summary',{},'＋ Plus de détails ('+sc.f.filter(f=>ok.includes(f[0])).map(f=>f[1].split(' (')[0].toLowerCase()).join(', ')+')'));
   if(filled)det.open=true;opt[0].before(det);opt.forEach(r=>det.append(r))}
 }
 if(!editId&&Date.now()-LASTSAVE<4000){setTimeout(()=>{const i=box.querySelector('.acrow input[type=text]');if(i)i.focus()},80)}
 return box};

/* ---- synchronisation automatique ---- */
let tSync=null,lastOK=0;
const kick=(d=2500)=>{clearTimeout(tSync);tSync=setTimeout(()=>{if(navigator.onLine&&S.team)sync(false)},d)};
const _put2=put;put=function(rec){const r=_put2(rec);LASTSAVE=Date.now();kick();return r};
const _sync=sync;sync=async function(manual){await _sync(manual);if(!Object.values(R).some(r=>r.dirty))lastOK=Date.now();renderStatus()};
window.addEventListener('online',()=>kick(500));
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')kick(800)});
setInterval(()=>kick(0),45000);kick(1500);
const _rs2=renderStatus;renderStatus=function(){_rs2();const st=$('#st');if(!st)return;const pend=Object.values(R).filter(r=>r.dirty).length;
 const who=(S.obs||'?').split(' ')[0];const net=navigator.onLine;
 st.innerHTML=`${who} · <span class="sync ${!net?'off':pend?'wait':'ok'}">${!net?'● hors ligne':pend?'↻ '+pend+' à envoyer':'✔ synchronisé'+(lastOK?' '+hhmm(lastOK):'')}</span>${window.RO&&RO()?' · consultation':''}`};

/* ---- photos d'illustration reptiles et fourmis ---- */
const ILL={reptiles:['https://inaturalist-open-data.s3.amazonaws.com/photos/33603949/large.jpeg','Bavayia crassicollis (Bavayia des rivages), gecko endémique des îles Loyauté, présent à Ouvéa – photo L. Hudel, CC BY, iNaturalist'],
 fourmis:['https://inaturalist-open-data.s3.amazonaws.com/photos/169816206/large.jpeg','Leptomyrmex pallens, fourmi endémique de Nouvelle-Calédonie, signalée à Ouvéa – photo P.-L. Stenger, CC BY-NC, iNaturalist']};
window.PHOTOS=window.PHOTOS||{};for(const k in ILL)window.PHOTOS[k]=ILL[k][0];
if('caches' in window&&navigator.onLine)caches.open('eie-ill').then(c=>Promise.all(Object.values(ILL).map(([u])=>c.match(u).then(m=>m||fetch(u,{mode:'no-cors'}).then(r=>c.put(u,r)))))).catch(()=>{});
const _r3=render;render=function(){_r3();for(const k in ILL){if(S.tab===k){const cr=V.querySelector('.hero .credit');if(cr)cr.textContent=ILL[k][1]}}};


/* ---- vue Florule ---- */
function vFlorule(){const q=h('input',{type:'search',placeholder:'Nom latin, genre ou nom local (iaai, drehu, nengone)…',value:S.fq||''});const g=h('div',{class:'flgrid'});const cnt=h('p',{class:'muted'});
 const ks=Object.keys(FLU).sort();
 const draw=()=>{S.fq=q.value;saveS();const qs=norm(q.value).split(' ').filter(Boolean);g.innerHTML='';let n=0;
  for(const k of ks){const f=FLU[k];const hay=norm(k+' '+f[2]+' '+f[3]+' '+f[4]);if(qs.some(t=>!hay.includes(t)))continue;if(++n>120)continue;
   g.append(h('div',{class:'flc',onclick:()=>fzoom(k)},fthumb(k,150,200),h('div',{class:'flt'},h('i',{},k)),h('div',{class:'flv'},f[2]),h('div',{class:'fls'},f[3].split('–')[0]+' · '+f[4])))}
  cnt.textContent=`${n} espèce(s)${n>120?' – affinez la recherche (120 affichées)':''} · Florule des îles Loyauté, J.-F. Butaud 2014 (Province des Îles)`};
 q.addEventListener('input',draw);V.append(h('div',{class:'card'},h('h3',{},'🔎 Florule illustrée des îles Loyauté'),q,cnt),g);draw()}
const _r4=render;render=function(){if(S.tab==='florule'){clearInterval(TICK);V.innerHTML='';document.querySelectorAll('nav.tabs button').forEach(b=>b.classList.toggle('on',b.dataset.t==='plantes'));vFlorule();renderStatus();window.scrollTo(0,0);return}
 _r4();
 if(S.tab==='plantes'){const b=h('button',{class:'btn2 flbtn',onclick:()=>{S.tab='florule';saveS();render()}},'🔎 Florule illustrée – 433 photos (Butaud 2014)');const hero=V.querySelector('.hero');hero?hero.after(b):V.prepend(b)}
 if(S.tab==='accueil'){const t=V.querySelector('.tiles');if(t)t.append(h('button',{class:'tile',onclick:()=>{S.tab='florule';saveS();render()}},h('div',{class:'tart',style:"background:url('florule/f0.jpg') 0 0/800% 800%"}),h('div',{class:'tcap'},h('b',{},'Florule'),h('span',{class:'who'},'433 plantes en photo, noms locaux'),h('span',{class:'inf'},'Butaud 2014 – Province des Îles'))))}
 if(S.tab==='oiseaux'){const cr=V.querySelector('.hero .credit');if(cr)cr.textContent="Perruche d'Ouvéa sur santal, Gossanah – rapport EEE Province des Îles (Jourdan et al. 2020)"}};
window.PHOTOS.oiseaux='ill_perruche.jpg';
/* ---- styles ---- */
document.head.append(h('style',{},`.fth{flex:none;border-radius:6px;background-repeat:no-repeat;background-color:#eee;border:1px solid #ccc;cursor:pointer}
.acit{display:flex;gap:10px;align-items:center}.actx{flex:1;min-width:0}.vern{color:#6D4C41;font-style:italic}
.fbox{display:flex;gap:10px;align-items:flex-start;margin:6px 0}
.flbtn{width:100%;margin:0 0 12px}.flgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px}
.flc{background:#fff;border:1px solid #D5DCD7;border-radius:10px;padding:6px;cursor:pointer}.flc .fth{width:100%!important;height:auto!important;aspect-ratio:3/4}
.flt{font-size:14px;font-weight:700;margin-top:4px}.flv{font-size:12px;color:#6D4C41;font-style:italic}.fls{font-size:11px;color:#2E7D4F}
input,select,textarea{font-size:17px!important;min-height:46px}
.acrow{position:relative}.acdd{display:none;position:absolute;left:0;right:0;z-index:30;background:#fff;border:1px solid #9BB8A5;border-radius:10px;box-shadow:0 6px 18px rgba(0,0,0,.18);max-height:60vh;overflow:auto;margin-top:2px}
.acit{padding:10px 12px;border-bottom:1px solid #eee;cursor:pointer}.acit:active,.acit:hover{background:#EEF7F0}.acit b{font-size:16px}.acsub{font-size:12px;color:#555;margin-top:3px}
.bdg{display:inline-block;color:#fff;font-size:11px;font-weight:700;border-radius:6px;padding:1px 6px;margin-right:2px}
.acinf{font-size:13px;margin-top:5px;line-height:1.5}.protw{color:#C62828;font-weight:700;margin-top:4px}
.chips{display:flex;flex-wrap:wrap;gap:6px;margin:2px 0 6px;align-items:center}.chip{border:1px solid #2E7D4F;background:#EEF7F0;color:#1F4D33;border-radius:16px;padding:6px 10px;font-size:14px;font-style:italic}
select.auto{outline:3px solid #66BB6A;transition:outline .3s}
details.more{margin:8px 0;border:1px dashed #9BB8A5;border-radius:10px;padding:4px 10px}details.more summary{padding:8px 0;font-weight:700;color:#2E7D4F;font-size:15px;cursor:pointer}
.form .actions{position:sticky;bottom:0;background:#fff;padding:10px 0 calc(10px + env(safe-area-inset-bottom));z-index:4;border-top:1px solid #E3E8E4;margin:0 -12px -12px;padding-left:12px;padding-right:12px}
.form .actions .btn{flex:1;min-height:52px;font-size:18px}
.sync.ok{color:#B9F6CA}.sync.wait{color:#FFE082}.sync.off{color:#FFAB91}
.hero .credit{font-size:10px!important;max-width:70%;line-height:1.2}`));
render();
})();
