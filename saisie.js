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

/* ---- plantes envahissantes : Butaud 2014, tableaux 14 et 15 ---- */
const ENV={"Agave americana":["Agavaceae","Cult. Rare","Fort"],"Furcraea foetida":["Agavaceae","Subsp. Peu commun","Fort"],"Schinus terebenthifolius":["Anacardiaceae","Subsp. ?","Fort"],"Brassaia actinophylla":["Araliaceae","Subsp. Assez commun","Fort"],"Asparagus setaceus":["Asparagaceae","Adv. Assez commun","Faible"],"Mikania micrantha":["Asteraceae","? ?","Indéterminé"],"Pluchea odorata":["Asteraceae","Nat. Commun","Très fort"],"Pseudogynoxys chenopodioides":["Asteraceae","Subsp. Rare","Indéterminé"],"Sphagneticola trilobata":["Asteraceae","Adv. Peu commun","Moyen à fort"],"Spathodea campanulata":["Bignoniaceae","Subsp. Rare","Faible à moyen"],"Tecoma stans":["Bignoniaceae","Adv. Commun","Fort"],"Opuntia stricta":["Cactaceae","Cult. Rare","Faible à moyen"],"Delonix regia":["Caesalpiniaceae","Adv. Commun","Faible"],"Senna tora":["Caesalpiniaceae","Adv. Peu commun","Faible"],"Tradescantia spathacea":["Commelinaceae","Subsp. Assez commun","Fort"],"Tradescantia zebrina":["Commelinaceae","Subsp. Peu commun","Faible à moyen"],"Kalanchoe daigremontiana":["Crassulaceae","Subsp. Rare","Faible à moyen"],"Kalanchoe delagoensis":["Crassulaceae","Adv. Assez commun","Faible"],"Kalanchoe pinnata":["Crassulaceae","Adv. Assez commun","Moyen à fort"],"Cyperus involucratus":["Cyperaceae","Adv. Peu commun","Faible à moyen"],"Ricinus communis":["Euphorbiaceae","Adv. Commun","Moyen"],"Flemingia strobilifera":["Fabaceae","Subsp. Rare","Moyen"],"Neonotonia wightii":["Fabaceae","Adv. Peu commun","Moyen"],"Stylosanthes scabra":["Fabaceae","Adv. Rare","Faible"],"Clerodendrum buchananii var. fallax":["Lamiaceae","Nat. Assez commun","Faible"],"Hyptis pectinata":["Lamiaceae","Adv. Rare","Faible"],"Ocimum gratissimum":["Lamiaceae","Adv. Rare","Faible à moyen"],"Melia azedarach":["Meliaceae","Adv. Assez commun","Moyen"],"Adenanthera pavonina":["Mimosaceae","Nat. Assez commun","Moyen"],"Leucaena leucocephala":["Mimosaceae","Adv. Assez commun","Moyen à fort"],"Mimosa diplotricha var. diplotricha":["Mimosaceae","Adv. ?","Faible à moyen"],"Psidium cattleianum":["Myrtaceae","Cult. Très rare","Très fort"],"Syzygium cumini":["Myrtaceae","Adv. Assez commun","Fort"],"Syzygium jambos":["Myrtaceae","Subsp. Rare","Moyen à fort"],"Passiflora maliformis":["Passifloraceae","Subsp. Assez commun","Faible à moyen"],"Passiflora suberosa":["Passifloraceae","Nat. Commun","Moyen"],"Turnera ulmifolia":["Passifloraceae","Nat. Commun","Moyen"],"Rivina humilis":["Phytolaccaceae","Nat. Commun","Moyen"],"Arundo donax":["Poaceae","Adv. Peu commun","Moyen à fort"],"Megathyrsus maximus":["Poaceae","Adv. Commun","Moyen"],"Phyllostachys cf. flexuosa":["Poaceae","Subsp. Rare","Moyen à fort"],"Stenotaphrum secundatum":["Poaceae","Adv. Commun","Moyen à fort"],"Cestrum nocturnum":["Solanaceae","Cult. Rare","Moyen"],"Solanum torvum":["Solanaceae","Adv. Assez commun","Moyen à fort"],"Typha domingensis":["Typhaceae","Nat. Commun","Fort"],"Lantana camara":["Verbenaceae","Nat. Commun","Fort"]};
const ENVN=new Map(Object.keys(ENV).map(k=>[norm(k),k]));
const envOf=n=>{const k=ENVN.get(norm(n))||[...ENVN.entries()].find(([a])=>a.split(' ').slice(0,2).join(' ')===norm(n).split(' ').slice(0,2).join(' '))?.[1];return k?[k,...ENV[k]]:null};
const ICOL={'Très fort':'#B71C1C','Fort':'#D84315','Moyen à fort':'#EF6C00','Moyen':'#F9A825','Faible à moyen':'#9E9D24','Faible':'#7CB342','Indéterminé':'#8D6E63'};
SCH.eee={titre:'Fiche 6 – Plantes envahissantes',ctx:['carre','quart'],f:[
 ['espece','Espèce envahissante','text','envahissantes',true],
 ['recouvrement','Recouvrement dans le quart','codes'],
 ['stade','Stade','sel',['','Plantules','Jeunes','Adultes','Adultes en fleurs / fruits']],
 ['surface','Surface touchée (m²)','num'],['gps','Point GPS','gps'],['photos','Photos','photo'],['remarque','Remarque','text']],
 lab:r=>`${r.carre}${r.quart} – ${r.espece} – ${r.recouvrement||'·'}${r.stade?' – '+r.stade:''}`};
if(!SHEETS.some(x=>x[0]==='eee'))SHEETS.splice(6,0,['eee','F6_Envahissantes']);
const _vP2=vPlantes;vPlantes=function(){_vP2();const sb=V.querySelector('.sub');if(sb&&!sb.querySelector('.eeeb')){sb.append(h('button',{class:'eeeb'+(S.sub==='eee'?' on':''),onclick:()=>{S.sub='eee';saveS();render()}},'⚠ Envahissantes'))}
 if(S.sub==='eee'){const f=V.querySelector('.card.form');if(f)f.before(h('p',{class:'help'},'Noter chaque plante envahissante vue dans le quart (liste Butaud 2014 en premier dans les suggestions). Recouvrement : mêmes codes que la fiche 1. Photo conseillée.'))}};
/* ---- index des noms ---- */
const PROTM=new Map(PROT.map(p=>[norm(p[0]),p]));
let IDX=null;
function plantIndex(){if(IDX)return IDX;const m=new Map();
 for(const v of FL){m.set(norm(v[0]),{n:v[0],fam:v[1],st:v[2],ty:v[3],ouv:v[4],ab:v[5]})}
 for(const p of PROT){const k=norm(p[0]);if(!m.has(k))m.set(k,{n:p[0],fam:p[1],st:'',ty:'',ouv:1,ab:p[3]||''})}
 IDX=m;return m}
function entries(kind){
 if(kind==='envahissantes')return entries('plantes');
 if(kind==='plantes'){const m=plantIndex();for(const k in ENV){if(!m.has(norm(k)))m.set(norm(k),{n:k,fam:ENV[k][0],st:'M',ty:'',ouv:ENV[k][1]?1:0,ab:''})}for(const k in FLU){if(!m.has(norm(k))&&!m.has(two(k))){const st=/Endémique des Loyauté|Endémique Loyauté/.test(FLU[k][4])?'L':/Endémique/.test(FLU[k][4])?'N':/Introduction/.test(FLU[k][4])?'A':'I';m.set(norm(k),{n:k,fam:FLU[k][3].split('–')[0].trim(),st,ty:FLU[k][3].split('–')[1]||'',ouv:1,ab:''})}}const extra=lists().plantes.filter(n=>!m.has(norm(n))).map(n=>({n,fam:'saisie équipe',st:'',ty:'',ouv:1,ab:'',team:1}));return [...m.values(),...extra]}
 const F=FAUNE[kind]||[];const known=new Set(F.map(f=>norm(f[0])));
 return [...F.map(f=>({n:f[0],fam:f[1],stl:f[2],st:'',ty:'',ouv:1,ab:''})),...(lists()[kind]||[]).filter(n=>!known.has(norm(n))&&!/–|\(/.test(n)).map(n=>({n,fam:'saisie équipe',st:'',ty:'',ouv:1,ab:'',team:1}))]}
function info(n){return plantIndex().get(norm(n))}
function search(kind,q){const qs=norm(q).split(' ').filter(Boolean);if(!qs.length){if(['reptiles','fourmis','oiseaux'].includes(kind)){const o={'Endémique Ouvéa':0,'Endémique Loyauté':1,'Endémique NC':2,'Indigène':3,'Introduite':4,'Inconnu':5};return entries(kind).sort((a,b)=>(o[a.stl]??6)-(o[b.stl]??6)).slice(0,40)}return[]}const out=[];
 for(const e of entries(kind)){const PL=kind==='plantes'||kind==='envahissantes';const fv=PL?flu(e.n):null;const w=norm(e.n+(PL?(fv?' '+fv[3]:''):' '+e.fam)).replace(/[·()'’-]/g,' ').split(' ').filter(Boolean);let ok=true,pos=0;
  for(const t of qs){const k=w.findIndex((x,i)=>i>=pos&&x.startsWith(t));if(k<0){ok=false;break}pos=k+1}
  if(!ok)continue;let s=0;if(w[0].startsWith(qs[0]))s+=100;if(e.ouv===1)s+=30;s+=(AB[e.ab]||0)*3;if(e.team)s+=40;if(kind==='envahissantes'&&envOf(e.n))s+=300;if(PROTM.has(norm(e.n)))s+=5;s-=e.n.length*.1;out.push([s,e])}
 return out.sort((a,b)=>b[0]-a[0]).slice(0,8).map(x=>x[1])}
function badge(e){const b=[];const p=PROTM.get(norm(e.n));
 if(e.st)b.push(`<span class="bdg" style="background:${STC[e.st]}">${ST[e.st]}</span>`);
 if(e.stl)b.push(`<span class="bdg" style="background:${FCOL[e.stl]||'#666'}">${e.stl}</span>`);if(/ENVAHISSANTE/.test(e.fam))b.push('<span class="bdg" style="background:#E65100">Envahissante</span>');
 if(p)b.push(`<span class="bdg" style="background:#C62828">Protégée G${p[2]}</span>`);
 if(e.team)b.push('<span class="bdg" style="background:#8D6E63">déjà saisie</span>');
 {const v=e.stl===undefined?envOf(e.n):null;if(v)b.push(`<span class="bdg" style="background:${ICOL[v[3]]||'#E65100'}">Envahissante – impact ${v[3].toLowerCase()}</span>`)}
 return b.join(' ')}
function line(e){if(e.stl!==undefined)return e.fam.replace(' – ENVAHISSANTE','');return [e.fam,e.ouv===1?(e.ab?'Ouvéa : '+e.ab.toLowerCase():'présente à Ouvéa'):e.ouv===2?'Ouvéa : à confirmer':e.fam&&e.fam!=='saisie équipe'?'pas citée à Ouvéa':''].filter(Boolean).join(' · ')}


/* ---- florule illustrée (Butaud 2014, annexe 5) ---- */
const FLU=window.FLORULE||{},FROWS=window.FLORULE_ROWS||[];
const two=n=>norm(n).replace(/\b(cf|aff)\.?\s/g,'').split(' ').slice(0,2).join(' ');
const FLN=new Map(),FL2=new Map();for(const k in FLU){FLN.set(norm(k),k);if(!FL2.has(two(k)))FL2.set(two(k),k)}
function flu(n){const k=FLN.get(norm(n))||FL2.get(two(n));return k?[k,...FLU[k]]:null}
function envph(n){const E=window.ENVPH||{};const k=Object.keys(E).find(x=>norm(x)===norm(n)||two(x)===two(n));return k?[k,...E[k]]:null}
const inatU=(id,sz)=>`https://inaturalist-open-data.s3.amazonaws.com/photos/${id}/${sz||'medium'}.jpeg`;
function fthumb(n,w,hh,big){const f=flu(n);if(!f){const e=envph(n);if(!e)return null;const d=h('div',{class:'fth',style:`width:${w}px;height:${hh}px;background:#eee url('${inatU(e[1],'small')}') center/cover`});if(big)d.addEventListener('click',ev=>{ev.stopPropagation();fzoom(n)});return d}const [,s,i]=f;const rows=FROWS[s]||8;const c=i%8,r=Math.floor(i/8);
 const d=h('div',{class:'fth',style:`width:${w}px;height:${hh}px;background-image:url('florule/f${s}.jpg');background-size:800% ${rows*100}%;background-position:${c*100/7}% ${rows>1?r*100/(rows-1):0}%`});
 if(big)d.addEventListener('click',e=>{e.stopPropagation();fzoom(n)});return d}
function fzoom(n){const f=flu(n);if(!f){const e=envph(n);if(!e)return;const z=h('div',{class:'zoom',onclick:()=>z.remove()},h('img',{src:inatU(e[1],'large'),style:'max-height:75vh'}),h('div',{class:'zcap'},h('b',{},h('i',{},e[0])),h('br'),`Photo : ${e[3]||'anonyme'} (${String(e[2]).toUpperCase()}), iNaturalist – usage interne non commercial`));document.body.append(z);return}const W=Math.min(innerWidth-20,420);
 const z=h('div',{class:'zoom',onclick:()=>z.remove()},fthumb(n,W,W*4/3),h('div',{class:'zcap'},h('b',{},h('i',{},f[0])),h('br'),f[3]?'Noms : '+f[3]:'',h('br'),f[4]+' · '+f[5],h('br'),h('span',{style:'opacity:.7'},'Florule des îles Loyauté – J.-F. Butaud 2014 / Province des Îles')));document.body.append(z)}
window.fthumb=fthumb;
window.eieEnvOf=n=>envOf(n);window.eieInfo=n=>info(n);window.eieProt=n=>PROTM.get(norm(n));

/* ---- photos de la faune (iNaturalist, licences libres, usage interne) ---- */
window.FAPH={"Bavayia crassicollis":[33603949,"cc-by","Lennart Hudel"],"Emoia loyaltiensis":[458397724,"cc-by-nc","Benoît HENRY"],"Caledoniscincus austrocaledonicus":[2858539,"cc-by-nc","Jakob Fahr"],"Caledoniscincus haplorhinus":[596299761,"cc-by-nc","juju98"],"Caledoniscincus atropunctatus":[156842795,"cc-by-nc","Shankar Meyer"],"Cryptoblepharus novocaledonicus":[331875071,"cc-by-nc","Claire Goiran"],"Epibator nigrofasciolatus":[331165523,"cc-by-nc","Valentin Nemia"],"Phoboscincus garnieri":[324241156,"cc-by-nc","Amaury Durbano"],"Emoia cyanura":[255886630,"cc-by-nc","Hyongchan Kim"],"Gehyra georgpotthasti":[465446867,"cc-by","Dominik Maximilián Ramík"],"Candoia bibroni":[87243815,"cc-by-nc","jqrichmond"],"Nactus pelagicus":[889526,"cc-by-nc",""],"Lepidodactylus lugubris":[604324557,"cc-by-nc","Felipe Barrera Ocampo"],"Hemidactylus frenatus":[61116593,"cc-by-nc","sarayoung"],"Hemidactylus garnotii":[679511248,"cc-by-nc","藜梓柠"],"Hemiphyllodactylus typus":[9814687,"cc-by-nc","budak"],"Indotyphlops braminus":[89695603,"cc-by-nc","Colin Chiu"],"Ranoidea aurea":[254178476,"cc-by-nc","James Bennett"],"Leptomyrmex pallens":[44893905,"cc-by-nc","Damien Brouste"],"Camponotus chloroticus":[208098492,"cc-by","Dominik Maximilián Ramík"],"Odontomachus simillimus":[438485876,"cc-by-nc","colorado_river"],"Pheidole fervens":[555969633,"cc-by","Jonghyun Park"],"Tetramorium pacificum":[681996729,"cc-by-nc","Lumin Ong"],"Technomyrmex vitiensis":[594973180,"cc-by-nc","Francesco Simone Mensa"],"Anoplolepis gracilipes":[116456619,"cc-by","Nigel Main"],"Wasmannia auropunctata":[548547936,"cc-by-nc","Chaym Turak"],"Pheidole megacephala":[179975701,"cc-by","Jake Nitta"],"Solenopsis geminata":[66649313,"cc-by","Reynante Martinez"],"Paratrechina longicornis":[466599145,"cc-by","Judy Gallagher"],"Tapinoma melanocephalum":[174512993,"cc-by","Jonghyun Park"],"Technomyrmex albipes":[96245492,"cc-by-nc","Vijay Anand Ismavel"],"Brachymyrmex obscurior":[252774274,"cc0",""],"Nylanderia vaga":[716208176,"cc-by","Thomas Irvine"],"Cardiocondyla emeryi":[240852010,"cc-by-nc","Eduardo Millares Ley"],"Cardiocondyla obscurior":[461283976,"cc-by-nc","Oliver Yung"],"Monomorium floricola":[144466455,"cc-by-nc","Mason Salem"],"Monomorium pharaonis":[103329306,"cc-by-nc","igorkonstr"],"Eunymphicus uvaeensis":[27395234,"cc-by-nc","Frédéric Desmoulins"],"Todiramphus sanctus":[465363188,"cc-by","Saryu Mae 前 朝琉"],"Myzomela cardinalis":[60018959,"cc-by-nc","Frédéric Desmoulins"],"Gerygone flavolateralis":[62402141,"cc-by-nc","Frédéric Desmoulins"],"Lalage leucopyga":[27485866,"cc-by-nc","Frédéric Desmoulins"],"Pachycephala chlorura":[27909356,"cc-by-nc","Frédéric Desmoulins"],"Myiagra caledonica":[27440633,"cc-by-nc","Frédéric Desmoulins"],"Aplonis striata":[225346001,"cc-by-nc","Roger Le Guen"],"Zosterops lateralis":[309196442,"cc-by","BIHNZ"],"Trichoglossus haematodus":[35514445,"gfdl","Benjamint444"],"Lichmera incana":[297858681,"cc-by-nc","Frédéric Desmoulins"],"Columba vitiensis":[42489427,"cc-by-nc","Frédéric Desmoulins"],"Ptilinopus greyii":[65586150,"cc-by-nc","rodneya63"],"Chalcophaps longirostris":[60018980,"cc-by-nc","Frédéric Desmoulins"],"Chrysococcyx lucidus":[441173241,"cc-by-nc","Caiden"],"Cacomantis flabelliformis":[238226820,"cc-by-nc","Dennis Hocking"],"Accipiter fasciatus":[643341290,"cc-by-nc","Dennis Hocking"],"Circus approximans":[451845340,"cc-by-nc","Maurice"],"Falco peregrinus":[212499566,"cc-by-nc","nautiboy"],"Tyto javanica":[388849682,"cc-by-nc","Indra Bone"],"Gallirallus philippensis":[38291,"cc-by-nc-sa","Leo"],"Porphyrio porphyrio":[176055601,"cc-by-nc","jjulio2000"],"Aerodramus spodiopygius":[234809877,"cc-by-nc","Andy Pearce"],"Collocalia esculenta":[358587212,"cc-by-nc","Stephen John Davies"],"Hirundo tahitica":[530098134,"cc-by-nc","John D Reynolds"],"Hirundo neoxena":[53141530,"cc-by","Shane Walker"],"Artamus leucorhynchus":[365376826,"cc-by-nc","kiwipom"],"Egretta sacra":[218361660,"cc-by-sa","JJ Harrison"],"Pluvialis fulva":[262432635,"cc-by-nc","Paul Donahue"]};
function fsci(n){for(const k in FAUNE){const f=FAUNE[k].find(x=>norm(x[0])===norm(n));if(f)return k==='oiseaux'?f[1].split(' · ')[0].split(' ').slice(0,2).join(' '):f[0]}return null}
function fauPh(n){const sc=fsci(n);const e=sc&&window.FAPH[sc];return e?[sc,...e]:null}
function zoomAny(n){if(flu(n)||envph(n))return fzoom(n);const e=fauPh(n);if(!e)return;const f=Object.values(FAUNE).flat().find(x=>norm(x[0])===norm(n));
 const z=h('div',{class:'zoom',onclick:()=>z.remove()},h('img',{src:inatU(e[1],'large'),style:'max-height:72vh'}),h('div',{class:'zcap'},h('b',{},n),f?h('div',{},f[1].replace(' – ENVAHISSANTE',''),' · ',f[2]):null,h('div',{style:'opacity:.75;font-size:12px'},`Photo : ${e[3]||'anonyme'} (${String(e[2]).toUpperCase()}), iNaturalist – usage interne non commercial. Photo de référence, pas d’Ouvéa.`)));document.body.append(z)}
function anyThumb(n,w,hh){let t=fthumb(n,w,hh);if(!t){const e=fauPh(n);if(e)t=h('div',{class:'fth',style:`width:${w}px;height:${hh}px;background:#eee url('${inatU(e[1],'small')}') center/cover`})}
 if(t){t.addEventListener('pointerdown',ev=>{ev.stopPropagation();ev.preventDefault();zoomAny(n)});t.title='Toucher pour agrandir'}return t}
window.eieZoom=zoomAny;window.eieThumb=anyThumb;
setTimeout(()=>{try{const c=navigator.connection;if(!navigator.onLine||(c&&(c.saveData||/2g/.test(c.effectiveType||''))))return;caches.open('eie-ill').then(ca=>Promise.all(Object.values(window.FAPH).map(v=>{const u=inatU(v[0],'small');return ca.match(u).then(m=>m||fetch(u,{mode:'no-cors'}).then(r=>ca.put(u,r)).catch(()=>{}))})))}catch(e){}},12000);
/* ---- champ avec suggestions ---- */
function rowOf(box,labelStart){return [...box.querySelectorAll('.row')].find(r=>(r.querySelector('.lab')?.textContent||'').startsWith(labelStart))}
function setSel(box,labelStart,val){const r=rowOf(box,labelStart);const s=r&&r.querySelector('select');if(!s||!val)return;if(![...s.options].some(o=>o.value===val))s.append(h('option',{value:val},val));s.value=val;s.classList.add('auto');setTimeout(()=>s.classList.remove('auto'),1200)}
function attachAC(inp,kind,box,type,field){
 inp.removeAttribute('list');inp.setAttribute('autocapitalize','off');inp.setAttribute('autocorrect','off');inp.setAttribute('spellcheck','false');
 inp.placeholder=(kind==='plantes'||kind==='envahissantes')?'Tapez les 1res lettres du genre (ex. syz, ficus pro…)':'Tapez les 1res lettres…';
 const row=inp.closest('.row');row.classList.add('acrow');
 const dd=h('div',{class:'acdd'});const inf=h('div',{class:'acinf'});
 const recent=[...new Map(live(type).sort((a,b)=>a.ts<b.ts?1:-1).map(r=>r[field]).filter(Boolean).map(v=>[norm(v),v])).values()].slice(0,6);
 if(recent.length)row.insertBefore(h('div',{class:'chips'},h('span',{class:'muted'},'Récentes : '),recent.map(v=>h('button',{type:'button',class:'chip',onclick:()=>pick(v)},v))),inp);
 inp.after(dd,inf);
 const PK=kind==='plantes'||kind==='envahissantes';const apply=n=>{const e=PK?(info(n)||(()=>{const v=envOf(n);return v?{n:v[0],fam:v[1],st:'M',ty:'',ouv:1,ab:''}:null})()):null;inf.innerHTML='';
  if(e){inf.innerHTML=badge(e)+' <span class="muted">'+line(e)+'</span>';{const t=fthumb(e.n,84,112,true);if(t){const fv=flu(e.n)||[];inf.prepend(h('div',{class:'fbox'},t,h('div',{class:'muted'},fv[3]?'Noms : '+fv[3]:'','  ',h('a',{href:'#',onclick:ev=>{ev.preventDefault();fzoom(e.n)}},'agrandir'))))}}
   if(e.st)setSel(box,'Statut',ST[e.st]);const ty=TYP(e.ty);if(ty)setSel(box,'Type',ty);
   {const v=envOf(e.n);if(v)inf.append(h('div',{class:'envw'},`⚠ Plante envahissante – impact ${v[3].toLowerCase()} (Butaud 2014)`))}
   }
  else if(!PK){const f=(FAUNE[kind]||[]).find(x=>norm(x[0])===norm(n));if(f){inf.innerHTML=badge({n:f[0],fam:f[1],stl:f[2]})+' <span class="muted">'+f[1].replace(' – ENVAHISSANTE','')+'</span>';const t=anyThumb(f[0],90,90);if(t)inf.prepend(h('div',{class:'fbox'},t,h('div',{class:'muted'},'Photo de référence (iNaturalist) – toucher pour agrandir')))}}
  else if(PK&&n.trim()){setSel(box,'Statut','Inconnu (?)');inf.innerHTML='<span class="muted">Nom hors liste Butaud : nom provisoire accepté, statut à vérifier.</span>'}};
 const pick=n=>{inp.value=n;dd.innerHTML='';dd.style.display='none';apply(n);inp.dispatchEvent(new Event('input'));inp.blur()};
 const show=()=>{const r=search(kind,inp.value);dd.innerHTML='';if(!r.length||norm(inp.value)===norm(r[0].n)&&r.length===1){dd.style.display='none';return}
  for(const e of r){const it=h('div',{class:'acit',html:`<div class="actx"><div><b>${e.n.replace(/^(\S+)/,'<i>$1</i>')}</b></div><div class="acsub">${badge(e)} ${line(e)}${(kind==='plantes'||kind==='envahissantes')&&flu(e.n)&&flu(e.n)[3]?'<br><span class="vern">'+flu(e.n)[3]+'</span>':''}</div></div>`});const t=anyThumb(e.n,52,52);if(t)it.prepend(t);
   it.addEventListener('pointerdown',ev=>{ev.preventDefault();pick(e.n)});dd.append(it)}if(!inp.value.trim())dd.prepend(h('div',{class:'achd'},'Espèces connues à Ouvéa – tapez pour filtrer, touchez la photo pour l’agrandir'));dd.style.display='block'};
 inp.addEventListener('input',e=>{if(e.isTrusted!==false)show()});inp.addEventListener('focus',show);
 inp.addEventListener('blur',()=>setTimeout(()=>{dd.style.display='none';apply(inp.value)},150));
 if(inp.value)apply(inp.value);
}

/* ---- formulaires allégés ---- */
const OPTK={espece:['herbier','remarque'],arbre:['tige','mode_h','etat','gps','photos','remarque'],jeunes:['broute','herbier','photos'],herbier:['gps','photos','remarque'],
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

/* ---- guide des espèces d'Ouvéa ---- */
const GSEC=[['env','⚠ Plantes envahissantes'],['reptiles','Reptiles'],['fourmis','Fourmis'],['oiseaux','Oiseaux']];
function vGuide(){const sec=S.gsec||'env';
 V.append(h('div',{class:'card'},h('h3',{},'📖 Espèces connues à Ouvéa'),h('div',{class:'seg gseg'},GSEC.map(([k,l])=>h('button',{class:sec===k?'on':'',onclick:()=>{S.gsec=k;saveS();render()}},l))),
  h('p',{class:'muted'},sec==='env'?'46 plantes envahissantes ou potentiellement envahissantes des Loyauté, classées par impact – Butaud 2014, tableaux 14 et 15.':'Espèces recensées à Ouvéa – Jourdan et al. 2020, rapport EEE Province des Îles (IRD/IAC). Toucher une espèce pour voir la fiche.')));
 const list=h('div',{class:'glist'});V.append(list);
 if(sec==='env'){const ord=['Très fort','Fort','Moyen à fort','Moyen','Faible à moyen','Faible','Indéterminé'];
  for(const k of Object.keys(ENV).sort((a,b)=>ord.indexOf(ENV[a][2])-ord.indexOf(ENV[b][2])||a.localeCompare(b))){const v=ENV[k];const fv=flu(k);
   const row=h('div',{class:'gi',onclick:()=>fzoom(k)},fthumb(k,54,72)||h('div',{class:'fth nop'},'pas de photo'),h('div',{class:'gt'},h('div',{},h('i',{},h('b',{},k))),h('div',{class:'acsub',html:`<span class="bdg" style="background:${ICOL[v[2]]}">Impact ${v[2].toLowerCase()}</span> ${v[0]} · Ouvéa : ${v[1]?v[1].replace('Adv.','adventice').replace('Nat.','naturalisée').replace('Subsp.','subspontanée').replace('Cult.','cultivée'):'non citée'}`}),fv&&fv[3]?h('div',{class:'vern'},fv[3]):null));list.append(row)}}
 else for(const f of FAUNE[sec]){list.append(h('div',{class:'gi',onclick:()=>zoomAny(f[0])},anyThumb(f[0],54,54)||h('div',{class:'fth nop'},'—'),h('div',{class:'gt'},h('div',{},h('b',{},f[0])),h('div',{class:'acsub',html:badge({n:f[0],fam:f[1],stl:f[2]})+' '+f[1].replace(' – ENVAHISSANTE','')}))))}}
const _r5=render;render=function(){if(S.tab==='guide'){clearInterval(TICK);V.innerHTML='';document.querySelectorAll('nav.tabs button').forEach(b=>b.classList.remove('on'));vGuide();renderStatus();window.scrollTo(0,0);return}
 _r5();const go=sec=>{S.gsec=sec;S.tab='guide';saveS();render()};
 if(['reptiles','fourmis','oiseaux'].includes(S.tab)){const b=h('button',{class:'btn2 flbtn',onclick:()=>go(S.tab)},'📖 Espèces connues à Ouvéa (rapport EEE 2020)');const hero=V.querySelector('.hero');hero?hero.after(b):V.prepend(b)}
 if(S.tab==='florule'){const c=V.querySelector('.card');if(c)c.append(h('button',{class:'btn2',style:'margin-top:8px',onclick:()=>go('env')},'⚠ Plantes envahissantes (46)'))}
 if(S.tab==='accueil'){const t=V.querySelector('.tiles');if(t)t.append(h('button',{class:'tile',onclick:()=>go('env')},h('div',{class:'tart',style:"background:#FFF3E0;display:flex;align-items:center;justify-content:center;font-size:44px"},'📖'),h('div',{class:'tcap'},h('b',{},'Espèces d’Ouvéa'),h('span',{class:'who'},'Envahissantes, reptiles, fourmis, oiseaux'),h('span',{class:'inf'},'Rapports Butaud 2014 et EEE 2020'))))}};
/* ---- styles ---- */
document.head.append(h('style',{},`.envw{color:#E65100;font-weight:700;margin-top:4px}.gseg{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0}.gseg button{border:1px solid #2E7D4F;background:#fff;color:#1F4D33;border-radius:18px;padding:8px 12px;font-size:14px;font-weight:600}.gseg button.on{background:#2E7D4F;color:#fff}
.gi{display:flex;gap:10px;align-items:center;background:#fff;border:1px solid #E0E6E2;border-radius:10px;padding:8px;margin-bottom:6px}.gt{flex:1;min-width:0}.fth.nop{width:54px;height:72px;font-size:10px;color:#999;display:flex;align-items:center;justify-content:center;text-align:center}
.sub .eeeb{color:#E65100}.sub .eeeb.on{background:#E65100;color:#fff}
.fth{flex:none;border-radius:6px;background-repeat:no-repeat;background-color:#eee;border:1px solid #ccc;cursor:pointer}
.acit{display:flex;gap:10px;align-items:center}.actx{flex:1;min-width:0}.vern{color:#6D4C41;font-style:italic}
.zoom{z-index:80!important}.achd{padding:8px 12px;font-size:12px;color:#2E7D4F;font-weight:700;background:#EEF7F0;position:sticky;top:0}
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
