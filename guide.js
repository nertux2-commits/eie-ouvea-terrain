// v2.0 – Appli guidée : accueil simple, prénom au 1er lancement, programme du jour, méthode pas à pas par protocole
(function(){
window.ENVPH={"Agave americana":[700843645,"cc-by-nc","Maitte Lopez"],"Furcraea foetida":[3851380,"cc-by-nc","James Steamer"],"Schinus terebenthifolius":[57240422,"cc-by-nc-sa","Mary Keim"],"Brassaia actinophylla":[19387254,"cc-by-nc","Stephen Thorpe"],"Asparagus setaceus":[699614368,"cc-by","zebedeugalinha"],"Mikania micrantha":[252393368,"cc0",""],"Pluchea odorata":[428369792,"cc-by-nc","wendyinmd"],"Pseudogynoxys chenopodioides":[577286610,"cc-by-nc","shadowsmom21666"],"Sphagneticola trilobata":[366806657,"cc-by-nc","ndalwenhlemchunu"],"Spathodea campanulata":[29187199,"cc-by-nc","squirrelwatcher019"],"Tecoma stans":[248877294,"cc-by-nc","lyndahicklin_05"],"Opuntia stricta":[27341705,"cc-by","B. Phalan"],"Delonix regia":[633179546,"cc-by-nc","藜梓柠"],"Senna tora":[29283313,"cc0",""],"Tradescantia spathacea":[13127306,"cc-by-nc-nd","Sunnetchan"],"Tradescantia zebrina":[164081200,"cc-by-nc","hmtheiss"],"Kalanchoe daigremontiana":[117767170,"cc0",""],"Kalanchoe delagoensis":[4476647,"cc-by-nc","silverside11"],"Kalanchoe pinnata":[342176977,"cc-by-nc","onidiras"],"Cyperus involucratus":[174402129,"cc-by-nc","fotis-samaritakis"],"Ricinus communis":[600529862,"cc-by-nc","Krishna Verma"],"Flemingia strobilifera":[85328009,"cc-by-nc","Alan R. Franck"],"Neonotonia wightii":[66925114,"cc0",""],"Stylosanthes scabra":[1855841,"cc-by-nc-sa","Mauricio Mercadante"],"Clerodendrum buchananii var. fallax":[59426271,"cc-by","Yves Bas"],"Hyptis pectinata":[544257036,"cc-by-sa","Greg Tasney"],"Ocimum gratissimum":[259467412,"cc-by-nc","Mike Ross"],"Melia azedarach":[647295999,"cc-by-nc","Shiri Mbariki"],"Adenanthera pavonina":[20605511,"cc-by-nc","Cheongweei Gan"],"Leucaena leucocephala":[173810094,"cc0",""],"Mimosa diplotricha var. diplotricha":[468778580,"cc0",""],"Psidium cattleianum":[688574824,"cc-by-nc","beatriz sabino"],"Syzygium cumini":[4801317,"cc-by-nc-nd","sea-kangaroo"],"Syzygium jambos":[32269153,"cc-by-nc","謝忠良"],"Passiflora maliformis":[3153276,"cc-by","Nick Hobgood"],"Passiflora suberosa":[170735717,"cc-by-nc","Juan Sangiovanni"],"Turnera ulmifolia":[115906542,"cc0",""],"Rivina humilis":[5454569,"cc-by-sa","Meghan Cassidy"],"Arundo donax":[627890218,"cc-by-nc","columbidaeperson"],"Megathyrsus maximus":[173807760,"cc0",""],"Phyllostachys cf. flexuosa":[140667675,"pd",""],"Stenotaphrum secundatum":[49482131,"cc-by-sa","Douglas Goldman"],"Cestrum nocturnum":[28784478,"cc-by-nc-nd","David W K Foster"],"Solanum torvum":[116176221,"cc0",""],"Typha domingensis":[397135600,"cc-by-nc","Todd Fitzgerald"],"Lantana camara":[424000556,"cc-by-nc","akio.suzuki"]};
const PREN=n=>String(n||'').split(' ')[0];
const ROLES={'Georges KAKUE':'Encadrement, piquetage, flore','Jean-Marie ITA':'Botaniste référent','Glwadys BAKO':'Reptiles et photos','Marvin WAITRONYIE':'Fourmis','Cédric MEAOU':'Oiseaux'};

/* ---------- code équipe transmis par le lien (…/#OUVEA-XXXX) ---------- */
{const m=location.hash.match(/^#((?:OUVEA|NEODYME)-[A-Z0-9]+)/i);if(m){S.team=m[1].toUpperCase();saveS();try{history.replaceState(null,'',location.pathname)}catch(e){}}}

/* ---------- 1er lancement : prénom ---------- */
function welcome(){if(document.querySelector('.welcome'))return;
 const other=h('input',{type:'text',placeholder:'Autre prénom et nom'});const code=h('input',{type:'text',placeholder:'Code équipe (reçu par message)',value:S.team||'',autocapitalize:'characters'});
 const done=n=>{if(!n.trim()){toast('Choisissez votre nom',true);return}if(!code.value.trim()){toast('Entrez le code équipe',true);code.focus();return}
  S.obs=n.trim();S.team=code.value.trim().toUpperCase();S.tab='accueil';saveS();try{localStorage.setItem('eie_who',S.obs)}catch(e){}w.remove();render();setTimeout(()=>sync(false),500)};
 const w=h('div',{class:'welcome'},h('div',{class:'wbox'},h('div',{class:'wt'},'Bienvenue 👋'),h('p',{},'Ce téléphone est à qui ? (une seule fois : votre nom sera ajouté à toutes vos saisies)'),
  h('div',{class:'wppl'},PEOPLE.filter(p=>!/Neodyme/.test(p)).map(p=>h('button',{class:'wp',onclick:()=>done(p)},h('b',{},PREN(p)),h('span',{},ROLES[p]||'')))),
  h('div',{class:'row'},other,h('button',{class:'btn2',style:'margin-top:6px',onclick:()=>done(other.value)},'Valider ce nom')),
  S.team?null:h('div',{class:'row'},h('span',{class:'lab'},'Code équipe'),code),
  /NEODYME/.test(S.team||'')?h('button',{class:'btn2',onclick:()=>done('Neodyme (consultation)')},'Je suis Neodyme (consultation)'):null));
 document.body.append(w)}

/* ---------- étapes cochées (partagées avec l'équipe) ---------- */
const isDone=k=>live('etape').some(r=>r.key===k&&r.done);
function setDone(k,v){let r=live('etape').find(x=>x.key===k);if(!r)r=newRec('etape',{key:k});r.done=v;put(r)}

/* ---------- programme de la mission ---------- */
const PLAN=[
 ['2026-11-10','Matin','Tous','Traversée Lifou – Ouvéa sur l’Eötr, installation',null],
 ['2026-11-10','14 h – 17 h 30','Tous','Mise en place : piquets de l’emprise (M1, M2, M3), quarts, petits carrés 5 × 5 en haut à droite, puis placette P1','carte'],
 ['2026-11-10','Soir','Tous','Charger téléphone, GPS, appareil photo ; Données › « Tout préparer »','donnees'],
 ['2026-11-11','5 h 15','Cédric','Oiseaux : point d’écoute O1 + parcours (passage 1)','oiseaux'],
 ['2026-11-11','7 h 30 – 12 h','Georges,Jean-Marie,Glwadys,Cédric','Plantes : carré M1','plantes:M1'],
 ['2026-11-11','8 h – 10 h 30','Marvin','Fourmis : postes F1, F2, F3 (centre de M1, M2, M3), puis plantes M1','fourmis'],
 ['2026-11-11','13 h – 17 h','Tous','Plantes : carré M2','plantes:M2'],
 ['2026-11-11','17 h 30 – 18 h 30','Tous','Contrôle des saisies, herbier','donnees'],
 ['2026-11-11','19 h 30 – 21 h 30','Glwadys,Marvin','Reptiles de nuit n° 1','reptiles'],
 ['2026-11-12','5 h 15','Cédric','Oiseaux : passage 2 (même heure que la veille)','oiseaux'],
 ['2026-11-12','7 h 30 – 12 h','Georges,Jean-Marie,Glwadys,Cédric','Plantes : carré M3','plantes:M3'],
 ['2026-11-12','8 h – 10 h 30','Marvin','Fourmis : poste F4 (centre de P1), puis plantes M3','fourmis'],
 ['2026-11-12','13 h – 17 h','Tous','Plantes : placette témoin P1','plantes:P1'],
 ['2026-11-12','17 h 30 – 18 h 30','Tous','Contrôle des saisies','donnees'],
 ['2026-11-12','19 h 30 – 21 h 30','Glwadys,Marvin','Reptiles de nuit n° 2','reptiles'],
 ['2026-11-13','7 h 30 – 8 h 30','Glwadys,Marvin','Reptiles de jour','reptiles'],
 ['2026-11-13','8 h 30 – 12 h','Tous','Compléments : arbres oubliés, espèces protégées, herbier, photos manquantes','plantes'],
 ['2026-11-13','Après-midi','Tous','Contrôle final, synchronisation, nettoyage du matériel (biosécurité)','donnees'],
 ['2026-11-14','Matin','Tous','Retour à Lifou',null]];
const DAYS=[['2026-11-10','Mar 10'],['2026-11-11','Mer 11'],['2026-11-12','Jeu 12'],['2026-11-13','Ven 13'],['2026-11-14','Sam 14']];
const isoToday=()=>{const d=new Date();return `${d.getFullYear()}-${pad(d.getMonth()+1,2)}-${pad(d.getDate(),2)}`};
const startH=t=>{const m=String(t).match(/^(\d+) h(?: (\d+))?/);if(m)return +m[1]+(m[2]?+m[2]/60:0);return {Matin:7,'Après-midi':13,Soir:18}[t]??0};
const mine=p=>p[2]==='Tous'||p[2].split(',').some(x=>PREN(S.obs).toLowerCase()===x.toLowerCase());
function goTo(g){if(!g)return;const [t,c]=g.split(':');S.tab=t;if(c){S.carre=c}saveS();render()}

/* ---------- accueil ---------- */
function vAccueil(){
 const td=isoToday();const inMission=DAYS.some(d=>d[0]===td);const day=S.pday&&!inMission?S.pday:(inMission?td:DAYS[1][0]);
 const hr=new Date().getHours()+new Date().getMinutes()/60;
 V.append(h('div',{class:'home-head'},h('div',{class:'hh-t'},`Bonjour ${PREN(S.obs)||''} 👋`),h('div',{class:'hh-s'},'État initial BESS ENERCAL – Fajawe, Ouvéa · 10 au 14 novembre')));
 const tasks=PLAN.filter(p=>p[0]===day&&mine(p));
 let cur=-1;if(day===td)tasks.forEach((p,i)=>{if(startH(p[1])<=hr)cur=i});
 const card=h('div',{class:'card today'},h('h3',{},day===td?'Aujourd’hui, pour vous':'Votre programme'),
  inMission?null:h('div',{class:'daychips'},DAYS.map(([d,l])=>h('button',{class:d===day?'on':'',onclick:()=>{S.pday=d;saveS();render()}},l))),
  tasks.length?tasks.map((p,i)=>h('div',{class:'task'+(i===cur?' now':'')},h('div',{class:'tt'},p[1]),h('div',{class:'tx'},p[3]),p[4]?h('button',{class:i===cur?'btn':'btn2',onclick:()=>goTo(p[4])},i===cur?'Commencer →':'Ouvrir'):null)):h('p',{class:'muted'},'Rien de prévu pour vous ce jour-là.'));
 V.append(card);
 const prog={plantes:()=>{const n=['M1','M2','M3','P1'].filter(c=>plantSteps(c).every(s=>s.done)).length;return `${n}/4 carrés terminés`},
  reptiles:()=>`${live('rep_session').filter(s=>s.fin).length}/3 sessions · ${live('rep_obs').length} reptile(s)`,
  fourmis:()=>`${['F1','F2','F3','F4'].filter(p=>isDone('fo_tub_'+p)).length}/4 postes terminés`,
  oiseaux:()=>`${live('oi_session').filter(s=>s.t0).length}/2 passages · ${live('oi_contact').length} contact(s)`};
 const big=h('div',{class:'bigtiles'});
 for(const [t,l] of [['plantes','Plantes'],['reptiles','Reptiles'],['fourmis','Fourmis'],['oiseaux','Oiseaux']]){const ph=(window.PHOTOS||{})[t];
  big.append(h('button',{class:'bt',onclick:()=>goTo(t)},h('div',{class:'bimg',style:ph?`background-image:url('${ph}')`:''}),h('div',{class:'bl'},h('b',{},l),h('span',{},prog[t]()))))}
 V.append(big);
 V.append(h('div',{class:'minirow'},[['carte','🗺','Carte'],['carnet','📝','Carnet'],['florule','🌿','Florule'],['donnees','☁','Données']].map(([t,i,l])=>h('button',{onclick:()=>goTo(t)},h('span',{class:'mi'},i),l))));
 const warn=h('div');V.append(warn);
 if(window.eieChecks)window.eieChecks().then(r=>{const ok=r.nom&&r.code&&r.cache[0]===r.cache[1]&&r.persist!==false&&r.gps==='granted';if(!ok)warn.append(h('button',{class:'warnbar',onclick:()=>goTo('donnees')},'⚠ Téléphone pas encore prêt pour le terrain – toucher ici'))});
}

/* ---------- méthode pas à pas ---------- */
function stepper(title,steps,extra,foot){
 const n=steps.filter(s=>s.done).length;const cur=steps.findIndex(s=>!s.done);
 const open=S.stepOpen==='-'?null:(S.stepOpen&&steps.some(s=>s.k===S.stepOpen)?S.stepOpen:(cur>-1?steps[cur].k:null));
 const c=h('div',{class:'card stepper'},h('div',{class:'sth'},h('h3',{},title),h('span',{class:'stn'},`${n}/${steps.length}`)),h('div',{class:'pbar'},h('div',{style:`width:${Math.round(100*n/steps.length)}%`})),extra||null);
 steps.forEach((s,i)=>{const isOpen=s.k===open;const st=s.done?'done':i===cur?'cur':'todo';
  const head=h('div',{class:'sh',onclick:()=>{S.stepOpen=isOpen?'-':s.k;saveS();render()}},h('span',{class:'snum '+st},s.done?'✔':String(i+1)),h('span',{class:'stt'},s.t),s.c?h('span',{class:'scnt'},s.c):null);
  const body=isOpen?h('div',{class:'sb'},h('p',{},s.x),h('div',{class:'actions'},s.go?h('button',{class:'btn',onclick:()=>{s.go();setTimeout(()=>{const w=document.querySelector('.workarea');if(w)w.scrollIntoView({behavior:'smooth'})},150)}},s.gl||'Ouvrir la fiche ↓'):null,
   s.man?h('button',{class:s.done?'btn3':'btn2',onclick:()=>{setDone(s.man,!s.done);if(!s.done){const nx=steps.find((z,j)=>j>i&&!z.done);S.stepOpen=nx?nx.k:'';saveS()}render()}},s.done?'Annuler « terminé »':'✔ Étape terminée'):null)):null;
  c.append(h('div',{class:'step '+st+(isOpen?' open':'')},head,body))});
 if(foot)c.append(foot);return c}
const spLink=sec=>h('button',{class:'linkb',onclick:()=>{S.gsec=sec;S.tab='guide';saveS();render()}},'📖 Espèces connues à Ouvéa');

function plantSteps(c){const cnt=t=>live(t).filter(r=>r.carre===c).length;
 return [
  {k:'desc',t:'Décrire le carré',x:'Fiche 0 : type de végétation, hauteur de la canopée au télémètre, ouverture du couvert, sol, épaisseur de litière au centre et aux 4 coins, traces (coupe, feu, cochons, cerfs, déchets). Photos des 4 coins et du centre.',done:live('carre').some(r=>r.carre===c),go:()=>{S.sub='carre'}},
  {k:'esp',t:'Liste des espèces, quart par quart',x:'Fiche 1 : parcourir le quart en allers-retours tous les 2 à 3 m. Une ligne par espèce, avec un code par étage (0–1 m, 1–5 m, > 5 m). Tapez les 1res lettres : l’appli propose le nom et remplit le statut. Quand le quart est fini, cochez-le ci-dessous.',done:['a','b','c','d'].every(q=>isDone(`esp_${c}${q}`)),c:`${cnt('espece')} lignes`,go:()=>{S.sub='espece';S.quart=['a','b','c','d'].find(q=>!isDone(`esp_${c}${q}`))||S.quart},gl:'Saisir les espèces ↓',quarts:true},
  {k:'arb',t:'Arbres de 15 cm de tour et plus',x:'Fiche 2 : étiquette numérotée sur chaque arbre, tour à 1,30 m au mètre-ruban, hauteur au télémètre si le numéro finit par 0 ou 5. Le numéro suivant est proposé tout seul.',done:isDone('arb_'+c),man:'arb_'+c,c:`${cnt('arbre')} arbres`,go:()=>{S.sub='arbre'}},
  {k:'jeu',t:'Jeunes plants – petit carré 5 × 5 m en haut à droite',x:'Fiche 3 : dans le petit carré du coin nord-est seulement. Compter les plantules (< 50 cm), jeunes plants (50 cm – 1,30 m) et gaules (> 1,30 m, tour < 15 cm) de chaque espèce d’arbre ou d’arbuste.',done:isDone('jeu_'+c),man:'jeu_'+c,c:`${cnt('jeunes')} espèces`,go:()=>{S.sub='jeunes'}},
  {k:'pro',t:'Espèces protégées : tous les pieds',x:'Fiche 5 : compter tous les pieds de chaque espèce protégée vue dans le carré, point GPS et photo. Aucun prélèvement.',done:isDone('pro_'+c),man:'pro_'+c,c:`${cnt('protegee')} lignes`,go:()=>{S.sub='protegee'}},
  {k:'eee',t:'Plantes envahissantes',x:'Fiche 6 : noter chaque plante envahissante vue dans le quart (recouvrement, stade, surface). Les envahissantes de la liste Butaud sont proposées en premier, avec photo.',done:isDone('eee_'+c),man:'eee_'+c,c:`${cnt('eee')} lignes`,go:()=>{S.sub='eee'}},
  {k:'her',t:'Herbier',x:'Fiche 4 : un échantillon pour chaque espèce non identifiée sur place (avec fleurs ou fruits si possible). Le numéro JMI-xxx est donné par l’appli : l’écrire au crayon sur l’étiquette de l’échantillon.',done:isDone('her_'+c),man:'her_'+c,c:`${live('herbier').filter(r=>r.carre===c).length} échantillons`,go:()=>{S.sub='herbier'}}]}
function guidePlantes(){
 const c=S.carre;const steps=plantSteps(c);
 const carres=h('div',{class:'seg carsel'},['M1','M2','M3','P1'].map(k=>{const ss=plantSteps(k);const n=ss.filter(s=>s.done).length;return h('button',{class:S.carre===k?'on':'',onclick:()=>{S.carre=k;S.stepOpen='';saveS();render()}},`${k} ${n===ss.length?'✔':n+'/'+ss.length}`)}));
 const st=stepper(`Méthode – carré ${c}`,steps,h('div',{},h('div',{class:'muted'},'Choisir le carré :'),carres),h('div',{class:'stfoot'},spLink('env')));
 const openK=S.stepOpen==='-'?null:(S.stepOpen&&steps.some(z=>z.k===S.stepOpen)?S.stepOpen:(steps.find(z=>!z.done)||{}).k);
 const sb=st.querySelector('.step.open .sb');if(openK==='esp'&&sb){sb.insertBefore(h('div',{class:'qchips'},['a','b','c','d'].map(q=>{const k=`esp_${c}${q}`;const d=isDone(k);const n=live('espece').filter(r=>r.carre===c&&r.quart===q).length;
   return h('div',{class:'qc'+(d?' d':'')},h('b',{},'Quart '+q),h('span',{},`${n} esp.`),h('button',{onclick:()=>{S.sub='espece';S.quart=q;saveS();render();setTimeout(()=>document.querySelector('.workarea')?.scrollIntoView({behavior:'smooth'}),150)}},'Saisir'),h('button',{class:d?'on':'',onclick:()=>{setDone(k,!d);render()}},d?'✔ fini':'Fini ?'))})),sb.querySelector('.actions'))}
 return st}
function guideReptiles(){const s=R[S.rep];const ok=s&&!s.deleted;
 const steps=[
  {k:'r1',t:'Créer la session',x:'Nuit : débuter 30 min après le coucher du soleil, pour 2 h (19 h 30 – 21 h 30). Jour : vendredi 7 h 30 – 8 h 30, temps ensoleillé. Toujours à deux. Noter la température et la météo ; pas de session sous forte pluie.',done:ok,go:()=>{setTimeout(()=>[...document.querySelectorAll('.workarea button')].find(b=>/Nouvelle/.test(b.textContent))?.click(),200)},gl:'+ Nouvelle session ↓'},
  {k:'r2',t:'Démarrer le chrono',x:'Au début de la bande de 5 m : toucher « Démarrer ». Le chrono compte le temps de recherche effectif.',done:ok&&!!s.debut,gl:'Aller au chrono ↓',go:()=>{}},
  {k:'r3',t:'Chercher et noter chaque reptile',x:'Avancer lentement côte à côte : troncs, branches basses, feuillage, litière, blocs coralliens. La nuit, les yeux des geckos brillent à la frontale. Pour chaque reptile : « Reptile vu » (le chrono se met en pause), photo par Glwadys.',done:ok&&live('rep_obs').some(r=>r.session===s.id),c:ok?`${live('rep_obs').filter(r=>r.session===s.id).length} reptile(s)`:'',gl:'Reptile vu ↓',go:()=>{setTimeout(()=>document.querySelector('.workarea .btn.big')?.click(),200)}},
  {k:'r4',t:'Terminer la session',x:'Après 2 h de recherche (1 h de jour) : « Terminer ». L’heure de fin et la durée sont enregistrées.',done:ok&&!!s.fin,gl:'Aller au chrono ↓',go:()=>{}}];
 const ses=[['Nuit','Nuit n° 1 (mer.)'],['Nuit','Nuit n° 2 (jeu.)'],['Jour','Jour (ven.)']];const all=live('rep_session').sort((a,b)=>a.ts<b.ts?-1:1);
 const sum=h('div',{class:'muted'},'Sessions prévues : '+ses.map(([j,l],i)=>{const x=all.filter(z=>z.jour_nuit===j)[j==='Nuit'?i:0];return `${l} ${x&&x.fin?'✔':x?'⏳':'○'}`}).join(' · '));
 return stepper('Méthode – reptiles',steps,sum,h('div',{class:'stfoot'},spLink('reptiles')))}
function guideFourmis(){const s=R[S.fo];const ok=s&&!s.deleted;const p=ok?s.poste:(S.poste||'F1');const el=ok&&s.t0?Date.now()-Date.parse(s.t0):0;
 const steps=[
  {k:'f1',t:'Créer le poste '+p,x:'Temps sec, entre 8 h et 11 h. Au centre du carré (F1 = M1, F2 = M2, F3 = M3, F4 = P1). Noter la température au sol et la météo.',done:ok,go:()=>{setTimeout(()=>[...document.querySelectorAll('.workarea button')].find(b=>/Nouvelle/.test(b.textContent))?.click(),200)},gl:'+ Nouveau poste ↓'},
  {k:'f2',t:'Poser les appâts',x:'Une carte avec une cuillère de thon à l’huile, une carte avec du miel, posées au sol à 1 m l’une de l’autre. Toucher « Appâts posés maintenant » : le minuteur d’1 h démarre.',done:ok&&!!s.pose,gl:'Aller au minuteur ↓',go:()=>{}},
  {k:'f3',t:'Attendre 1 heure',x:'Ne rien toucher. Pendant l’attente, aider l’équipe plantes à côté. Le téléphone sonne et vibre au bout d’1 h.',done:ok&&el>=3600000,c:ok&&s.t0&&el<3600000?`reste ${Math.ceil((3600000-el)/60000)} min`:'',gl:'Voir le minuteur ↓',go:()=>{}},
  {k:'f4',t:'Lecture des appâts',x:'Photographier chaque appât. Pour chaque sorte de fourmi : nom (suggestions) ou description, appât, nombre sur l’appât (1–10, 11–50, > 50).',done:ok&&live('fo_obs').some(r=>r.session===s.id&&r.appat!=='Recherche à vue'),c:ok?`${live('fo_obs').filter(r=>r.session===s.id).length} ligne(s)`:'',gl:'Saisir les fourmis ↓',go:()=>{}},
  {k:'f5',t:'Recherche à vue 15 minutes',x:'Autour du poste : troncs, litière, sous les pierres. Noter les fourmis trouvées avec « Où : Recherche à vue ».',done:isDone('fo_vue_'+p),man:'fo_vue_'+p,gl:'Minuteur 15 min',go:()=>timer15()},
  {k:'f6',t:'Tubes',x:'Pour chaque sorte différente : environ 10 ouvrières dans un tube d’alcool. Étiquette au crayon DANS le tube avec le n° donné par l’appli (ex. F1-2), la date et vos initiales.',done:isDone('fo_tub_'+p),man:'fo_tub_'+p,go:null}];
 const chips=h('div',{class:'seg carsel'},['F1','F2','F3','F4'].map(k=>{const ss=live('fo_poste').filter(z=>z.poste===k);const d=isDone('fo_tub_'+k);return h('button',{class:p===k?'on':'',onclick:()=>{S.poste=k;const z=ss.sort((a,b)=>a.ts<b.ts?1:-1)[0];S.fo=z?z.id:'';S.stepOpen='';saveS();render()}},`${k} ${d?'✔':ss.length?'⏳':'○'}`)}));
 return stepper('Méthode – fourmis, poste '+p,steps,h('div',{},h('div',{class:'muted'},'Choisir le poste :'),chips),h('div',{class:'stfoot'},spLink('fourmis')))}
function timer15(){const t0=Date.now();const lab=h('b',{},'15:00');const ov=h('div',{class:'tmr'},h('span',{},'Recherche à vue : '),lab,h('button',{onclick:()=>{clearInterval(iv);ov.remove()}},'✕'));document.body.append(ov);
 const iv=setInterval(()=>{const l=900000-(Date.now()-t0);if(l<=0){clearInterval(iv);lab.textContent='Terminé';vibrate();beep();return}lab.textContent=fmt(l)},500)}
function guideOiseaux(){const s=R[S.oi];const ok=s&&!s.deleted;const el=ok&&s.t0?Date.now()-Date.parse(s.t0):0;
 const steps=[
  {k:'o1',t:'Créer le passage',x:'Mercredi (passage 1) et jeudi (passage 2), au lever du soleil (≈ 5 h 15), même heure les deux matins. Pas de relevé par vent fort ou pluie. Noter la météo et le vent.',done:ok,go:()=>{S.oisub='point';setTimeout(()=>[...document.querySelectorAll('.workarea button')].find(b=>/Nouvelle/.test(b.textContent))?.click(),200)},gl:'+ Nouveau passage ↓'},
  {k:'o2',t:'Arriver en silence au point O1',x:'Rejoindre le centre de l’emprise (point OUV-O1 dans le GPS et l’onglet Carte), puis attendre 1 minute sans bouger avant de démarrer.',done:ok&&(isDone('oi_arr_'+s.id)||!!s.t0),man:ok?'oi_arr_'+s.id:null,go:null},
  {k:'o3',t:'Écoute 10 minutes',x:'Toucher « Démarrer l’écoute ». Noter chaque oiseau vu ou entendu (tapez le code à 4 lettres, ex. PEOU, MALO) : contact, distance < ou > 15 m. Alarme à 10 min.',done:ok&&el>=600000,c:ok&&s.t0&&el<600000?`reste ${Math.ceil((600000-el)/60000)} min`:'',gl:'Démarrer / noter ↓',go:()=>{S.oisub='point'}},
  {k:'o4',t:'Parcours lent 20 minutes',x:'Marcher lentement dans l’emprise et continuer à noter (phase « Parcours » remplie toute seule). Alarme à la fin.',done:ok&&el>=1800000,c:ok&&s.t0&&el>=600000&&el<1800000?`reste ${Math.ceil((1800000-el)/60000)} min`:'',gl:'Noter ↓',go:()=>{S.oisub='point'}},
  {k:'o5',t:'Nids actifs et arbres à cavités',x:'Pendant la journée avec l’équipe plantes : noter chaque nid actif et chaque arbre à cavité (n° d’étiquette de l’arbre, hauteur, entrée, occupant). Photos de loin.',done:isDone('oi_nid'),man:'oi_nid',c:`${live('oi_nid').length} noté(s)`,gl:'Fiche nids ↓',go:()=>{S.oisub='nid'}}];
 const ps=live('oi_session');const sum=h('div',{class:'muted'},`Passages : 1 ${ps.some(z=>z.passage==='1'&&z.t0)?'✔':'○'} · 2 ${ps.some(z=>z.passage==='2'&&z.t0)?'✔':'○'}`);
 return stepper('Méthode – oiseaux',steps,sum,h('div',{class:'stfoot'},spLink('oiseaux')))}

/* ---------- rendu ---------- */
const G={plantes:guidePlantes,reptiles:guideReptiles,fourmis:guideFourmis,oiseaux:guideOiseaux};
const _r=render;render=function(){
 if(!S.obs&&!document.querySelector('.welcome')){S.tab='accueil';welcome()}
 if(S.tab==='accueil'){clearInterval(TICK);V.innerHTML='';document.querySelectorAll('nav.tabs button').forEach(b=>b.classList.toggle('on',b.dataset.t==='accueil'));vAccueil();renderStatus();window.scrollTo(0,0);return}
 if(S.tab==='plantes'&&!['espece','arbre','jeunes','protegee','herbier','carre','eee'].includes(S.sub))S.sub='espece';
 if(S.tab==='plantes'&&!['M1','M2','M3','P1'].includes(S.carre))S.carre='M1';
 const y=window.scrollY;_r();
 if(G[S.tab]){V.querySelectorAll('.flbtn').forEach(e=>{if(!/Florule/.test(e.textContent))e.remove()});
  const hero=V.querySelector('.hero');const kids=[...V.children].filter(e=>e!==hero);const wa=h('div',{class:'workarea'},h('div',{class:'wah'},'✍ Saisie'));kids.forEach(e=>wa.append(e));
  const st=G[S.tab]();if(hero)hero.after(st);else V.prepend(st);V.append(wa);
  if(S.keepScroll){window.scrollTo(0,y);S.keepScroll=0}}
};

/* ---------- photos des envahissantes pour le hors-ligne (wifi / bon réseau) ---------- */
setTimeout(()=>{try{const c=navigator.connection;if(!navigator.onLine||(c&&(c.saveData||/2g/.test(c.effectiveType||''))))return;caches.open('eie-ill').then(ca=>Promise.all(Object.values(window.ENVPH).map(v=>{const u=`https://inaturalist-open-data.s3.amazonaws.com/photos/${v[0]}/small.jpeg`;return ca.match(u).then(m=>m||fetch(u,{mode:'no-cors'}).then(r=>ca.put(u,r)).catch(()=>{}))})))}catch(e){}},8000);

document.head.append(h('style',{},`.welcome{position:fixed;inset:0;z-index:60;background:linear-gradient(160deg,#1F4D33,#2E7D4F);display:flex;align-items:center;justify-content:center;padding:16px}
.wbox{background:#fff;border-radius:16px;padding:18px;max-width:440px;width:100%;max-height:92vh;overflow:auto}.wt{font-size:24px;font-weight:800;color:#1F4D33}
.wppl{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0}.wp{border:2px solid #2E7D4F;background:#EEF7F0;border-radius:12px;padding:12px 8px;text-align:left}.wp b{display:block;font-size:18px;color:#1F4D33}.wp span{font-size:12px;color:#555}
.today .task{display:grid;grid-template-columns:auto 1fr;gap:4px 10px;align-items:center;padding:10px 0;border-bottom:1px solid #EEF2EF}.task .tt{font-weight:800;color:#2E7D4F;font-size:14px;white-space:nowrap}.task .tx{font-size:15px}.task button{grid-column:1/3;justify-self:start;padding:8px 14px!important;font-size:15px!important}
.task.now{background:#FFF8E1;margin:0 -12px;padding:10px 12px;border-left:5px solid #F9A825}
.daychips{display:flex;gap:6px;flex-wrap:wrap;margin:4px 0 6px}.daychips button{border:1px solid #2E7D4F;background:#fff;border-radius:16px;padding:6px 10px;font-weight:600;color:#1F4D33}.daychips button.on{background:#2E7D4F;color:#fff}
.bigtiles{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px}.bt{border:0;padding:0;border-radius:14px;overflow:hidden;background:#fff;box-shadow:0 1px 4px rgba(0,0,0,.15);text-align:left}
.bimg{height:86px;background:#DDE8E0 center/cover}.bl{padding:8px 10px}.bl b{display:block;font-size:19px;color:#1F4D33}.bl span{font-size:12.5px;color:#2E7D4F;font-weight:600}
.minirow{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}.minirow button{border:1px solid #D5DCD7;background:#fff;border-radius:12px;padding:8px 2px;font-size:13px;font-weight:600;color:#1F4D33;display:flex;flex-direction:column;align-items:center;gap:2px}.mi{font-size:22px}
.warnbar{width:100%;margin-top:10px;border:0;background:#FFF3E0;color:#BF360C;font-weight:700;border-radius:10px;padding:12px;text-align:left}
.stepper{border:2px solid #2E7D4F}.sth{display:flex;justify-content:space-between;align-items:center}.stn{font-weight:800;color:#2E7D4F}.pbar{height:6px;background:#E3ECE6;border-radius:3px;margin:6px 0 10px;overflow:hidden}.pbar div{height:100%;background:#2E7D4F}
.step{border-top:1px solid #EEF2EF}.sh{display:flex;align-items:center;gap:10px;padding:10px 0;cursor:pointer}.snum{flex:none;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px;border:2px solid #B0BEC5;color:#78909C}
.snum.done{background:#2E7D4F;border-color:#2E7D4F;color:#fff}.snum.cur{background:#F9A825;border-color:#F9A825;color:#fff}.stt{flex:1;font-weight:700;font-size:15.5px}.step.done .stt{color:#78909C;font-weight:600}.scnt{font-size:12px;color:#2E7D4F;font-weight:700;white-space:nowrap}
.sb{padding:0 0 12px 38px}.sb p{margin:0 0 8px;font-size:15px;line-height:1.45}.sb .actions{gap:8px;flex-wrap:wrap}.sb .actions button{padding:10px 14px!important;font-size:15px!important;min-height:0!important}
.qchips{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:0 0 8px}.qc{border:1px solid #D5DCD7;border-radius:10px;padding:6px;display:flex;flex-wrap:wrap;gap:4px;align-items:center;font-size:13px}.qc b{flex:1 0 100%}.qc.d{background:#EEF7F0;border-color:#2E7D4F}.qc button{border:1px solid #2E7D4F;background:#fff;color:#1F4D33;border-radius:8px;padding:4px 8px;font-size:13px}.qc button.on{background:#2E7D4F;color:#fff}
.carsel{margin:4px 0 8px}.stfoot{margin-top:6px}.linkb{border:0;background:none;color:#2E7D4F;font-weight:700;padding:6px 0;font-size:14px}
.workarea{border-top:3px dashed #9BB8A5;margin-top:6px;padding-top:6px}.wah{font-weight:800;color:#1F4D33;margin:4px 0 8px;font-size:15px}
.hero .art{height:72px!important;min-height:0!important}.hero .art img,.hero .art svg{height:72px!important;width:100%;object-fit:cover}.hero .cap{padding:6px 10px!important}.hero .cap span{display:none}.hero .credit{display:none}
.tmr{position:fixed;left:50%;transform:translateX(-50%);bottom:84px;z-index:40;background:#1F4D33;color:#fff;border-radius:24px;padding:10px 16px;display:flex;gap:10px;align-items:center;box-shadow:0 4px 12px rgba(0,0,0,.3)}.tmr button{background:none;border:0;color:#fff;font-size:18px}`));

S.tab='accueil';saveS();render();
})();
