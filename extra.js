// v1.4 – Carte de terrain, accès Neodyme (consultation), photos de l'appareil photo (HD), retrait de P2
(function(){
const CARTE={"ext":[457187,457687,393494,394000],"poly":[{"n":"Tampon 50 m","s":"tampon","c":[[457388.52,393796.53],[457390.7,393800.93],[457393.3,393805.09],[457396.29,393808.98],[457399.65,393812.56],[457403.34,393815.79],[457407.34,393818.64],[457411.59,393821.09],[457416.06,393823.1],[457420.71,393824.68],[457425.49,393825.78],[457430.36,393826.42],[457435.26,393826.57],[457440.16,393826.24],[457445.0,393825.43],[457449.74,393824.16],[457473.53,393816.47],[457478.11,393814.74],[457482.51,393812.56],[457486.68,393809.96],[457490.56,393806.97],[457494.14,393803.61],[457497.37,393799.92],[457500.22,393795.93],[457502.67,393791.67],[457504.69,393787.2],[457506.26,393782.55],[457507.36,393777.77],[457508.0,393772.91],[457508.15,393768.0],[457507.82,393763.11],[457507.02,393758.27],[457505.74,393753.53],[457487.3,393696.43],[457485.57,393691.84],[457483.39,393687.44],[457480.79,393683.28],[457477.8,393679.39],[457474.44,393675.82],[457470.74,393672.59],[457466.75,393669.73],[457462.5,393667.29],[457458.03,393665.27],[457453.38,393663.7],[457448.6,393662.59],[457443.73,393661.96],[457438.83,393661.81],[457433.93,393662.13],[457429.09,393662.94],[457424.35,393664.22],[457400.56,393671.9],[457395.97,393673.64],[457391.58,393675.81],[457387.41,393678.41],[457383.53,393681.4],[457379.95,393684.76],[457376.72,393688.46],[457373.87,393692.45],[457371.42,393696.7],[457369.4,393701.17],[457367.83,393705.82],[457366.72,393710.6],[457366.09,393715.47],[457365.94,393720.37],[457366.27,393725.27],[457367.07,393730.11],[457368.35,393734.85],[457386.79,393791.94]]},{"n":"Emprise 0,15 ha","s":"emprise","c":[[457434.37,393776.58],[457458.16,393768.89],[457439.72,393711.8],[457415.93,393719.48]]},{"n":"M1","s":"carre","c":[[457415.93,393719.48],[457439.72,393711.8],[457445.87,393730.83],[457422.08,393738.51]]},{"n":"M2","s":"carre","c":[[457422.08,393738.51],[457445.87,393730.83],[457452.01,393749.86],[457428.22,393757.54]]},{"n":"M3","s":"carre","c":[[457428.22,393757.54],[457452.01,393749.86],[457458.16,393768.89],[457434.37,393776.58]]},{"n":"M1a","s":"quart","c":[[457415.93,393719.48],[457427.82,393715.64],[457430.9,393725.15],[457419.0,393729.0]]},{"n":"M1b","s":"quart","c":[[457419.0,393729.0],[457430.9,393725.15],[457433.97,393734.67],[457422.08,393738.51]]},{"n":"M1c","s":"quart","c":[[457430.9,393725.15],[457442.79,393721.31],[457445.87,393730.83],[457433.97,393734.67]]},{"n":"M1d","s":"quart","c":[[457427.82,393715.64],[457439.72,393711.8],[457442.79,393721.31],[457430.9,393725.15]]},{"n":"M1_regen5x5","s":"regen","c":[[457439.57,393727.61],[457444.33,393726.07],[457445.87,393730.83],[457441.11,393732.37]]},{"n":"M2a","s":"quart","c":[[457422.08,393738.51],[457433.97,393734.67],[457437.04,393744.19],[457425.15,393748.03]]},{"n":"M2b","s":"quart","c":[[457425.15,393748.03],[457437.04,393744.19],[457440.12,393753.7],[457428.22,393757.54]]},{"n":"M2c","s":"quart","c":[[457437.04,393744.19],[457448.94,393740.35],[457452.01,393749.86],[457440.12,393753.7]]},{"n":"M2d","s":"quart","c":[[457433.97,393734.67],[457445.87,393730.83],[457448.94,393740.35],[457437.04,393744.19]]},{"n":"M2_regen5x5","s":"regen","c":[[457445.72,393746.64],[457450.48,393745.1],[457452.01,393749.86],[457447.25,393751.4]]},{"n":"M3a","s":"quart","c":[[457428.22,393757.54],[457440.12,393753.7],[457443.19,393763.22],[457431.3,393767.06]]},{"n":"M3b","s":"quart","c":[[457431.3,393767.06],[457443.19,393763.22],[457446.26,393772.74],[457434.37,393776.58]]},{"n":"M3c","s":"quart","c":[[457443.19,393763.22],[457455.09,393759.38],[457458.16,393768.89],[457446.26,393772.74]]},{"n":"M3d","s":"quart","c":[[457440.12,393753.7],[457452.01,393749.86],[457455.09,393759.38],[457443.19,393763.22]]},{"n":"M3_regen5x5","s":"regen","c":[[457451.86,393765.67],[457456.62,393764.14],[457458.16,393768.89],[457453.4,393770.43]]},{"n":"P1","s":"p1","c":[[457477.34,393752.06],[457501.13,393744.38],[457507.28,393763.41],[457483.49,393771.1]]},{"n":"P1 jeunes plants","s":"regen","c":[[457507.3,393763.4],[457502.54,393764.94],[457500.99,393760.19],[457505.75,393758.65]]}],"line":[[[457489.2,393748.25],[457495.4,393767.25]],[[457480.4,393761.6],[457504.2,393753.9]]],"pts":[{"n":"PQ1","d":"Piquet 1 - Coin SO emprise, cote route/centrale","x":457415.9,"y":393719.5,"lat":-20.652558,"lon":166.550968},{"n":"PQ2","d":"Piquet 2 - Coin SE emprise, cote route","x":457439.7,"y":393711.8,"lat":-20.652627,"lon":166.551196},{"n":"PQ3","d":"Piquet 3 - Limite M1/M2 ouest","x":457422.1,"y":393738.5,"lat":-20.652386,"lon":166.551026},{"n":"PQ4","d":"Piquet 4 - Limite M1/M2 est - coin NE de M1 (petit carre 5x5 M1)","x":457445.9,"y":393730.8,"lat":-20.652454,"lon":166.551255},{"n":"PQ5","d":"Piquet 5 - Limite M2/M3 ouest","x":457428.2,"y":393757.5,"lat":-20.652214,"lon":166.551084},{"n":"PQ6","d":"Piquet 6 - Limite M2/M3 est - coin NE de M2 (petit carre 5x5 M2)","x":457452.0,"y":393749.9,"lat":-20.652282,"lon":166.551313},{"n":"PQ7","d":"Piquet 7 - Coin NO emprise","x":457434.4,"y":393776.6,"lat":-20.652042,"lon":166.551143},{"n":"PQ8","d":"Piquet 8 - Coin NE emprise - coin NE de M3 (petit carre 5x5 M3)","x":457458.2,"y":393768.9,"lat":-20.65211,"lon":166.551371},{"n":"P1A","d":"Coin A placette temoin P1 25x20 m (SO)","x":457477.3,"y":393752.1,"lat":-20.652262,"lon":166.551556},{"n":"P1B","d":"Coin B placette temoin P1 25x20 m (NO)","x":457483.5,"y":393771.1,"lat":-20.65209,"lon":166.551614},{"n":"P1C","d":"Coin C placette temoin P1 25x20 m (NE) - petit carre 5x5 P1","x":457507.3,"y":393763.4,"lat":-20.652158,"lon":166.551843},{"n":"P1D","d":"Coin D placette temoin P1 25x20 m (SE)","x":457501.1,"y":393744.4,"lat":-20.65233,"lon":166.551784},{"n":"F1","d":"Poste fourmis F1 = centre carre M1","x":457430.9,"y":393725.2,"lat":-20.652506,"lon":166.551111},{"n":"F2","d":"Poste fourmis F2 = centre carre M2","x":457437.0,"y":393744.2,"lat":-20.652334,"lon":166.551169},{"n":"F3","d":"Poste fourmis F3 = centre carre M3","x":457443.2,"y":393763.2,"lat":-20.652162,"lon":166.551228},{"n":"F4","d":"Poste fourmis F4 = centre placette P1","x":457492.3,"y":393757.7,"lat":-20.65221,"lon":166.551699},{"n":"O1","d":"Point ecoute oiseaux O1 = centre emprise","x":457437.0,"y":393744.2,"lat":-20.652334,"lon":166.551169}]};
const RO=()=>String(S.team||'').toUpperCase().startsWith('NEODYME-');
window.RO=RO;

/* ---------- P2 retiré ---------- */
{const i=CARRES.indexOf('P2');if(i>-1)CARRES.splice(i,1);if(S.carre==='P2'){S.carre='M1';saveS()}}
if(!PEOPLE.includes('Neodyme (consultation)'))PEOPLE.push('Neodyme (consultation)');

/* ---------- Mode consultation (code NEODYME-…) ---------- */
const _put=put;put=function(rec){if(RO()){toast('Consultation seule : la saisie est désactivée',true);return}return _put(rec)};
const _ap=addPhoto;addPhoto=async function(){if(RO()){toast('Consultation seule',true);return null}return _ap.apply(this,arguments)};
const _rs=renderStatus;renderStatus=function(){_rs();if(RO())$('#st').textContent+=' · consultation'};

/* ---------- Onglet Carte ---------- */
const nav=document.querySelector('nav.tabs');
if(nav&&!nav.querySelector('[data-t="carte"]')){
 const b=h('button',{'data-t':'carte',html:'<span class="tic"><svg viewBox="0 0 24 24"><path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z M9 3v15 M15 6v15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg></span><span>Carte</span>'});
 b.onclick=()=>{S.tab='carte';saveS();clearInterval(TICK);render()};nav.insertBefore(b,nav.querySelector('[data-t="donnees"]'));
}
const _render=render;
render=function(){
 if(S.tab!=='carte'){stopGPS();return _render()}
 clearInterval(TICK);V.innerHTML='';document.querySelectorAll('nav.tabs button').forEach(b=>b.classList.toggle('on',b.dataset.t==='carte'));
 vCarte();renderStatus();window.scrollTo(0,0);
};

// Projection Lambert NC (RGNC91-93, EPSG:3163)
const A=6378137,F_=1/298.257222101,E=Math.sqrt(2*F_-F_*F_),RD=Math.PI/180;
const mm=p=>Math.cos(p)/Math.sqrt(1-E*E*Math.sin(p)**2),tt=p=>Math.tan(Math.PI/4-p/2)/Math.pow((1-E*Math.sin(p))/(1+E*Math.sin(p)),E/2);
const P1=-20.666666666667*RD,P2=-22.333333333333*RD,P0=-21.5*RD,L0=166*RD;
const NN=(Math.log(mm(P1))-Math.log(mm(P2)))/(Math.log(tt(P1))-Math.log(tt(P2))),FF=mm(P1)/(NN*Math.pow(tt(P1),NN)),R0=A*FF*Math.pow(tt(P0),NN);
function lambert(lat,lon){const r=A*FF*Math.pow(tt(lat*RD),NN),th=NN*(lon*RD-L0);return[400000+r*Math.sin(th),300000+R0-r*Math.cos(th)]}
window.lambertNC=lambert;window.EIE_CARTE=CARTE;

let WID=null,ME=null;
function stopGPS(){if(WID!=null&&navigator.geolocation){navigator.geolocation.clearWatch(WID)}WID=null}
const DIRS=['N','NE','E','SE','S','SO','O','NO'];
const cap=(dx,dy)=>DIRS[Math.round(((Math.atan2(dx,dy)*180/Math.PI+360)%360)/45)%8];

function vCarte(){
 const NS='http://www.w3.org/2000/svg',el=(t,a)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);return e};
 const [x0,x1,y0,y1]=CARTE.ext;
 const HOME={x:457380,y:-393845,w:180,h:180};
 let vb=Object.assign({},LS.get('eie_vb',HOME));
 const svg=el('svg',{class:'map',preserveAspectRatio:'xMidYMid meet'});
 svg.append(el('image',{href:'carte_ortho.jpg',x:x0,y:-y1,width:x1-x0,height:y1-y0,preserveAspectRatio:'none'}));
 const G=el('g',{});svg.append(G);
 const ST={tampon:['none','#fff','4 3',.8],emprise:['none','#E53935','',2.5],carre:['none','#E53935','',1.6],quart:['none','#FFA726','5 4',1],regen:['rgba(46,204,64,.55)','#2ECC40','',1.5],p1:['none','#00E5FF','',2.5]};
 for(const p of CARTE.poly){const [fi,st,da,w]=ST[p.s]||ST.quart;
  G.append(el('polygon',{points:p.c.map(([x,y])=>x+','+(-y)).join(' '),fill:fi,stroke:st,'stroke-dasharray':da,'stroke-width':w,'vector-effect':'non-scaling-stroke'}))}
 for(const l of CARTE.line)G.append(el('polyline',{points:l.map(([x,y])=>x+','+(-y)).join(' '),fill:'none',stroke:'#FFA726','stroke-dasharray':'5 4','stroke-width':1,'vector-effect':'non-scaling-stroke'}));
 const labs=[];
 const cen=c=>[c.c.reduce((a,b)=>a+b[0],0)/c.c.length,c.c.reduce((a,b)=>a+b[1],0)/c.c.length];
 for(const c of CARTE.poly.filter(p=>p.s==='carre'||p.s==='p1')){const qs=CARTE.poly.filter(p=>p.s==='quart'&&p.n.startsWith(c.n)).map(cen).sort((u,v)=>(v[0]-v[1])-(u[0]-u[1]));let [cx,cy]=qs[0]||cen(c);
  if(!qs.length){const b=CARTE.pts.find(p=>p.n==='P1B');if(b){cx=(cx+b.x)/2;cy=(cy+b.y)/2}}
  const t=el('text',{x:cx,y:-cy,'text-anchor':'middle','dominant-baseline':'middle',fill:'#fff',stroke:'#000','stroke-width':.6,'paint-order':'stroke','font-weight':'700',class:'big'});t.textContent=c.n;G.append(t);labs.push(t)}
 const dots=[];
 for(const p of CARTE.pts){const col=p.n.startsWith('PQ')?'#FFEB3B':p.n.startsWith('P1')?'#00E5FF':p.n.startsWith('F')?'#E040FB':'#4FC3F7';
  if(p.n==='O1')continue; // même point que F2
  const c=el('circle',{cx:p.x,cy:-p.y,fill:col,stroke:'#000','stroke-width':1,'vector-effect':'non-scaling-stroke'});G.append(c);
  const t=el('text',{x:p.x,y:-p.y,fill:'#fff',stroke:'#000','stroke-width':.5,'paint-order':'stroke','font-weight':'700'});t.textContent=p.n==='F2'?'F2 / O1':p.n;G.append(t);dots.push([c,t])}
 const acc=el('circle',{fill:'rgba(33,150,243,.18)',stroke:'#2196F3','stroke-width':1,'vector-effect':'non-scaling-stroke',r:0,cx:0,cy:0,style:'display:none'});
 const me=el('circle',{fill:'#2196F3',stroke:'#fff','stroke-width':2,'vector-effect':'non-scaling-stroke',r:0,cx:0,cy:0,style:'display:none'});svg.append(acc,me);
 function upd(){svg.setAttribute('viewBox',`${vb.x} ${vb.y} ${vb.w} ${vb.h}`);const k=vb.w/100;
  dots.forEach(([c,t])=>{c.setAttribute('r',1.1*k);t.setAttribute('font-size',3.2*k);t.setAttribute('dx',1.6*k);t.setAttribute('dy',-1.2*k)});
  labs.forEach(t=>t.setAttribute('font-size',5*k));me.setAttribute('r',1.4*k);LS.set('eie_vb',vb)}
 const zoom=(f,cx,cy)=>{const nw=Math.min(500,Math.max(15,vb.w*f));const r=nw/vb.w;cx=cx??vb.x+vb.w/2;cy=cy??vb.y+vb.h/2;vb={x:cx-(cx-vb.x)*r,y:cy-(cy-vb.y)*r,w:nw,h:vb.h*r};upd()};
 const toSvg=(ex,ey)=>{const p=svg.createSVGPoint();p.x=ex;p.y=ey;return p.matrixTransform(svg.getScreenCTM().inverse())};
 const ptrs=new Map();let last=null;
 svg.addEventListener('pointerdown',e=>{svg.setPointerCapture(e.pointerId);ptrs.set(e.pointerId,{x:e.clientX,y:e.clientY});last=null});
 svg.addEventListener('pointermove',e=>{if(!ptrs.has(e.pointerId))return;const prev=ptrs.get(e.pointerId);ptrs.set(e.pointerId,{x:e.clientX,y:e.clientY});
  if(ptrs.size===1){const a=toSvg(prev.x,prev.y),b=toSvg(e.clientX,e.clientY);vb.x-=b.x-a.x;vb.y-=b.y-a.y;upd()}
  else if(ptrs.size===2){const [p,q]=[...ptrs.values()];const d=Math.hypot(p.x-q.x,p.y-q.y);if(last){const c=toSvg((p.x+q.x)/2,(p.y+q.y)/2);zoom(last/d,c.x,c.y)}last=d}});
 const up=e=>{ptrs.delete(e.pointerId);last=null};svg.addEventListener('pointerup',up);svg.addEventListener('pointercancel',up);
 svg.addEventListener('wheel',e=>{e.preventDefault();const c=toSvg(e.clientX,e.clientY);zoom(e.deltaY>0?1.2:1/1.2,c.x,c.y)},{passive:false});
 const info=h('div',{class:'mapinfo'},'Position : GPS arrêté');
 const center=(x,y)=>{vb.x=x-vb.w/2;vb.y=-y-vb.h/2;upd()};
 const gpsBtn=h('button',{class:'mbtn',title:'Ma position',onclick:()=>{if(WID!=null){stopGPS();me.style.display=acc.style.display='none';ME=null;info.textContent='Position : GPS arrêté';gpsBtn.classList.remove('on');table();return}
   if(!navigator.geolocation){toast('GPS indisponible',true);return}gpsBtn.classList.add('on');info.textContent='Recherche GPS… (rester immobile, ciel dégagé)';let first=true;
   WID=navigator.geolocation.watchPosition(p=>{const [x,y]=lambert(p.coords.latitude,p.coords.longitude);ME={x,y,a:p.coords.accuracy};
    me.setAttribute('cx',x);me.setAttribute('cy',-y);acc.setAttribute('cx',x);acc.setAttribute('cy',-y);acc.setAttribute('r',p.coords.accuracy);me.style.display=acc.style.display='';
    info.textContent=`X ${x.toFixed(1)} · Y ${y.toFixed(1)} (Lambert NC) · précision ± ${Math.round(p.coords.accuracy)} m`;if(first){center(x,y);first=false}table()},
    e=>{toast('GPS : '+e.message,true)},{enableHighAccuracy:true,maximumAge:2000,timeout:30000})}},'◎');
 const tools=h('div',{class:'mtools'},h('button',{class:'mbtn',onclick:()=>zoom(1/1.5)},'+'),h('button',{class:'mbtn',onclick:()=>zoom(1.5)},'−'),gpsBtn,h('button',{class:'mbtn',title:'Recentrer',onclick:()=>{vb=Object.assign({},HOME);upd()}},'⌂'));
 V.append(h('div',{class:'mapwrap'},svg,tools),info);
 V.append(h('div',{class:'legend muted',html:'<span style="color:#E53935">■</span> emprise et carrés M1–M3 &nbsp;<span style="color:#00B8D4">■</span> placette témoin P1 &nbsp;<span style="color:#2ECC40">■</span> jeunes plants 5 × 5 m (coin nord-est) &nbsp;<span style="color:#FFA726">┅</span> quarts &nbsp;<span style="color:#9E9E9E">┅</span> tampon 50 m'}));
 V.append(h('div',{class:'actions',style:'margin:8px 0 12px'},h('a',{class:'btn2',href:'carte_A3.pdf',target:'_blank',style:'text-decoration:none;display:inline-block'},'📄 Carte A3 (PDF, à imprimer)')));
 const tb=h('div',{class:'card'});V.append(tb);
 function table(){tb.innerHTML='';tb.append(h('h3',{},'Points GPS (préfixe OUV- dans la Garmin)'),h('p',{class:'muted'},ME?'Distance et direction depuis votre position. Toucher une ligne pour la voir sur la carte.':'Toucher une ligne pour la voir sur la carte. Activer ◎ pour avoir la distance.'),
  h('table',{class:'tb'},h('tr',{},h('th',{},'Point'),h('th',{},'Description'),h('th',{},ME?'Distance':'X / Y')),...CARTE.pts.map(p=>{const dx=ME?p.x-ME.x:0,dy=ME?p.y-ME.y:0;
   return h('tr',{onclick:()=>{center(p.x,p.y);window.scrollTo({top:0,behavior:'smooth'})},style:'cursor:pointer'},h('td',{},h('b',{},'OUV-'+p.n)),h('td',{},p.d),h('td',{},ME?`${Math.round(Math.hypot(dx,dy))} m ${cap(dx,dy)}`:`${p.x.toFixed(1)}\n${p.y.toFixed(1)}`))})))}
 table();upd();
}

/* ---------- Photos de l'appareil photo (depuis l'ordinateur) ---------- */
const HD_MAX=2560,HD_Q=0.85;
const PROTS=[['plantes','Plantes'],['reptiles','Reptiles'],['fourmis','Fourmis'],['oiseaux','Oiseaux'],['general','Général / paysage']];
const LIEUX=['M1','M2','M3','P1','O1','F1','F2','F3','F4','Hors placette'];
const hdr=(x={})=>({apikey:SB_KEY,Authorization:'Bearer '+SB_KEY,'x-team-key':S.team,...x});

async function exifDate(file){try{const b=new DataView(await file.slice(0,262144).arrayBuffer());if(b.getUint16(0)!==0xFFD8)return '';let o=2;
 while(o<b.byteLength-4){const m=b.getUint16(o),l=b.getUint16(o+2);if(m===0xFFE1&&b.getUint32(o+4)===0x45786966){const t=o+10,le=b.getUint16(t)===0x4949;
  const u16=p=>b.getUint16(t+p,le),u32=p=>b.getUint32(t+p,le);const str=(p,n)=>{let s='';for(let i=0;i<n-1;i++)s+=String.fromCharCode(b.getUint8(t+p+i));return s};
  const ifd=(p,want)=>{const n=u16(p);const r={};for(let i=0;i<n;i++){const e=p+2+i*12,tag=u16(e);if(want.includes(tag))r[tag]=u32(e+8)}return r};
  const i0=ifd(u32(4),[0x8769,0x0132]);let d='';if(i0[0x8769]){const ex=ifd(i0[0x8769],[0x9003]);if(ex[0x9003])d=str(ex[0x9003],20)}if(!d&&i0[0x0132])d=str(i0[0x0132],20);return d.trim()}
  if((m&0xFF00)!==0xFF00)break;o+=2+l}}catch(e){}return ''}
function loadImg(file){return new Promise((ok,ko)=>{const i=new Image(),u=URL.createObjectURL(file);i.onload=()=>{ok(i);setTimeout(()=>URL.revokeObjectURL(u),1000)};i.onerror=ko;i.src=u})}
function draw(img,M){const k=Math.min(1,M/Math.max(img.naturalWidth,img.naturalHeight));const c=document.createElement('canvas');c.width=Math.round(img.naturalWidth*k);c.height=Math.round(img.naturalHeight*k);c.getContext('2d').drawImage(img,0,0,c.width,c.height);return c}
let HDROWS=null;
async function hdList(){const rows=await api('photos_hd?select=id,path,label,protocole,carre,note,obs,prise,w,h,octets,thumb,ts&order=prise.asc,ts.asc&limit=5000');HDROWS=(rows||[]).filter(r=>!String(r.path).startsWith('test/')&&r.label!=='TEST_appli.jpg');return HDROWS}
async function upHD(file,meta){
 const prise=await exifDate(file);const label=file.name||'photo.jpg';
 if(HDROWS&&HDROWS.some(r=>r.label===label&&(r.prise||'')===prise))return 'doublon';
 const img=await loadImg(file);const big=draw(img,HD_MAX);const blob=await new Promise(r=>big.toBlob(r,'image/jpeg',HD_Q));const thumb=draw(img,360).toDataURL('image/jpeg',0.7);
 const id=uid();const st=(prise.match(/^(\d{4}):(\d\d):(\d\d) (\d\d):(\d\d):(\d\d)/)||[]).slice(1).join('');const stamp=st?st.slice(0,8)+'_'+st.slice(8):'sansdate';
 const lieu=meta.carre.replace(/[^\w]+/g,'_');const base=label.replace(/\.[^.]+$/,'').replace(/[^\w-]+/g,'_').slice(0,40);
 const path=`${meta.protocole}/${lieu}/${stamp}_${base}_${id}.jpg`;
 const r=await fetch(SB_URL+'/storage/v1/object/photos-hd/'+path,{method:'POST',headers:hdr({'Content-Type':'image/jpeg','x-upsert':'true'}),body:blob});
 if(!r.ok)throw new Error(r.status+' '+(await r.text()).slice(0,100));
 const row={id,path,label,protocole:meta.protocole,carre:meta.carre,note:meta.note||null,obs:S.obs,prise,w:big.width,h:big.height,octets:blob.size,thumb,ts:now()};
 await api('photos_hd?on_conflict=id',{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=minimal'},body:JSON.stringify([row])});
 if(HDROWS)HDROWS.push(row);return 'ok'}
async function hdBlob(path){const r=await fetch(SB_URL+'/storage/v1/object/authenticated/photos-hd/'+path,{headers:hdr()});if(!r.ok)throw new Error(r.status);return r.blob()}
const hdName=r=>`${r.protocole}_${r.carre}_${(r.prise||'').replace(/[: ]/g,'').replace(/^(\d{8})(\d{6})$/,'$1_$2')||'sansdate'}_${String(r.label||'').replace(/\.[^.]+$/,'').replace(/[^\w-]+/g,'_')}.jpg`.replace(/\s+/g,'_');

function cardUpload(){
 const pr=h('select',{},PROTS.map(([k,l])=>h('option',{value:k,selected:S.hdP===k},l)));
 const li=h('select',{},LIEUX.map(l=>h('option',{value:l,selected:S.hdL===l},l)));
 const no=h('input',{type:'text',placeholder:'ex. Bavayia sur tronc M2-014 (facultatif)'});
 const fi=h('input',{type:'file',accept:'image/jpeg',multiple:true});
 const out=h('div',{class:'muted'});let failed=[];
 const go=async files=>{if(!navigator.onLine){toast('Il faut du réseau',true);return}if(!S.team){toast('Entrez le code équipe dans Réglages',true);return}
  if(!files.length){toast('Choisissez des photos',true);return}S.hdP=pr.value;S.hdL=li.value;saveS();
  try{if(!HDROWS)await hdList()}catch(e){}
  const meta={protocole:pr.value,carre:li.value,note:no.value.trim()};let ok=0,dbl=0;failed=[];
  for(let i=0;i<files.length;i++){out.textContent=`Envoi ${i+1} / ${files.length}… (ne pas fermer la page)`;
   try{const s=await upHD(files[i],meta);if(s==='doublon')dbl++;else ok++}catch(e){failed.push(files[i]);console.warn(e)}}
  out.innerHTML='';out.append(`${ok} photo(s) envoyée(s)`+(dbl?`, ${dbl} déjà en ligne (ignorée(s))`:'')+(failed.length?`, ${failed.length} échec(s).`:'.'));
  if(failed.length)out.append(' ',h('button',{class:'btn3',onclick:()=>go(failed.slice())},'Réessayer les échecs'));fi.value='';toast(failed.length?'Envoi terminé avec des échecs':'Photos envoyées ✔',!!failed.length)};
 return h('div',{class:'card'},h('h3',{},'📷 Photos de l’appareil photo (depuis l’ordinateur)'),
  h('p',{class:'muted'},`Pour les photos de l’appareil (Glwadys). Choisir une série du même protocole et du même lieu, puis envoyer. La date de prise de vue est lue dans chaque photo. Taille envoyée : ${HD_MAX} px sur le grand côté, qualité ${Math.round(HD_Q*100)} % (≈ 1 à 1,5 Mo par photo). Gardez les originaux sur le disque.`),
  h('label',{class:'row'},h('span',{class:'lab'},'Protocole'),pr),h('label',{class:'row'},h('span',{class:'lab'},'Lieu'),li),h('label',{class:'row'},h('span',{class:'lab'},'Remarque (s’applique à toute la série)'),no),
  h('label',{class:'row'},h('span',{class:'lab'},'Photos (JPEG, plusieurs à la fois)'),fi),h('button',{class:'btn',onclick:()=>go([...fi.files])},'⬆ Envoyer les photos'),out)}

function cardGallery(){
 const box=h('div',{});const fp=h('select',{},h('option',{value:''},'Tous les protocoles'),PROTS.map(([k,l])=>h('option',{value:k},l)));
 const fl=h('select',{},h('option',{value:''},'Tous les lieux'),LIEUX.map(l=>h('option',{value:l},l)));
 const sel=()=>(HDROWS||[]).filter(r=>(!fp.value||r.protocole===fp.value)&&(!fl.value||r.carre===fl.value));
 const show=()=>{box.innerHTML='';const rs=sel();const tot=(HDROWS||[]).reduce((a,r)=>a+(r.octets||0),0);
  box.append(h('p',{class:'muted'},`${rs.length} photo(s) affichée(s) sur ${(HDROWS||[]).length} · espace utilisé ${(tot/1048576).toFixed(0)} Mo sur 1 024 Mo gratuits.`));
  box.append(h('div',{class:'hdgrid'},rs.slice(0,300).map(r=>h('figure',{class:'hd',onclick:()=>openHD(r)},h('img',{src:r.thumb||'',loading:'lazy',alt:r.label}),h('figcaption',{},`${r.carre} · ${(r.prise||'').slice(0,16).replace(/^(\d{4}):(\d\d):(\d\d)/,'$3/$2')}`)))));
  if(rs.length>300)box.append(h('p',{class:'muted'},'Affichage limité à 300 vignettes : filtrer par protocole ou par lieu.'))};
 const zipAll=async()=>{const rs=sel();if(!rs.length){toast('Aucune photo',true);return}const N=150,parts=Math.ceil(rs.length/N);
  if(!confirm(`${rs.length} photo(s), environ ${(rs.reduce((a,r)=>a+(r.octets||0),0)/1048576).toFixed(0)} Mo, en ${parts} fichier(s) zip. Continuer ?`))return;
  for(let k=0;k<parts;k++){const part=rs.slice(k*N,(k+1)*N);const files=[];const used=new Set();
   for(let i=0;i<part.length;i++){toast(`Zip ${k+1}/${parts} : photo ${i+1}/${part.length}`);const r=part[i];let n=hdName(r);if(used.has(n))n=n.replace(/\.jpg$/,'_'+r.id+'.jpg');used.add(n);
    try{files.push([n,new Uint8Array(await (await hdBlob(r.path)).arrayBuffer())])}catch(e){toast('Échec : '+r.label,true)}}
   files.push(['index_photos_HD.csv','﻿fichier;protocole;lieu;date_prise;photographe;remarque;fichier_original;largeur_px;hauteur_px\n'+part.map(r=>[hdName(r),r.protocole,r.carre,r.prise,r.obs,r.note||'',r.label,r.w,r.h].map(v=>String(v??'').replace(/;/g,',')).join(';')).join('\n')]);
   await shareOrDownload(zip(files),`EIE_Ouvea_photos_HD_${fp.value||'toutes'}${parts>1?'_partie'+(k+1):''}_${stamp()}.zip`)}};
 const load=async()=>{if(!navigator.onLine){toast('Il faut du réseau',true);return}if(!S.team){toast('Entrez le code dans Réglages',true);return}
  box.textContent='Chargement…';try{await hdList();show()}catch(e){box.textContent='Erreur : '+e.message}};
 fp.onchange=fl.onchange=show;
 return h('div',{class:'card'},h('h3',{},'🖼 Photos HD (appareil photo)'),h('div',{class:'actions'},fp,fl),
  h('div',{class:'actions',style:'margin-top:8px'},h('button',{class:'btn2',onclick:load},'Afficher'),h('button',{class:'btn2',onclick:zipAll},'⬇ Télécharger (zip)')),box)}
async function openHD(r){const w=h('div',{class:'zoom'},h('div',{style:'color:#fff'},'Chargement…'));document.body.append(w);
 try{const b=await hdBlob(r.path);const u=URL.createObjectURL(b);w.innerHTML='';
  w.append(h('img',{src:u,onclick:()=>{w.remove();URL.revokeObjectURL(u)}}),h('div',{class:'zcap'},`${r.label} · ${r.carre} · ${r.prise||'date inconnue'} · ${r.obs||''}${r.note?' · '+r.note:''} `,h('a',{href:u,download:hdName(r),style:'color:#fff;font-weight:700'},'⬇ télécharger')))}
 catch(e){w.remove();toast('Photo indisponible : '+e.message,true)}}

/* ---------- Onglet Données ---------- */
const _vD=vDonnees;vDonnees=async function(){await _vD();if(S.tab!=='donnees')return;
 const cards=[...V.querySelectorAll('.card')];const reg=cards.find(c=>/Réglages/.test(c.textContent));
 if(RO()){cards.forEach(c=>{if(/Synchronisation/.test(c.querySelector('h3')?.textContent||''))c.querySelector('h3').textContent='Récupérer les données (consultation Neodyme)'});
  V.insertBefore(h('div',{class:'card ro'},h('h3',{},'Accès Neodyme – consultation'),h('p',{},'Ce code permet de lire toutes les données de l’équipe et de les exporter (Excel, photos des téléphones, photos HD). Aucune saisie ni modification n’est possible.'),h('p',{class:'muted'},'1. « Synchroniser » récupère les données. 2. « Excel pour Neodyme » exporte toutes les fiches. 3. « Photos (zip) » puis « Photos HD » pour les images.')),V.querySelector('.card'))}
 const exp=cards.find(c=>/Exporter/.test(c.querySelector('h3')?.textContent||''));const nx=exp?exp.nextSibling:(reg||null);
 const g=cardGallery();V.insertBefore(g,nx);if(!RO())V.insertBefore(cardUpload(),g)};

/* ---------- styles ---------- */
document.head.append(h('style',{},`.mapwrap{position:relative;margin:-4px -4px 6px;border-radius:12px;overflow:hidden;background:#24331f}
.map{display:block;width:100%;height:62vh;touch-action:none;user-select:none}
.mtools{position:absolute;right:8px;top:8px;display:flex;flex-direction:column;gap:6px}
.mbtn{width:44px;height:44px;border-radius:10px;border:0;background:rgba(255,255,255,.92);font-size:22px;font-weight:700;color:#1F4D33;box-shadow:0 1px 4px rgba(0,0,0,.4)}
.mbtn.on{background:#2196F3;color:#fff}
.mapinfo{font-size:14px;font-weight:600;color:#1F4D33;margin:4px 0}
.legend{font-size:13px;line-height:1.6}
.hdgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:6px}
.hd{margin:0;cursor:pointer}.hd img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:6px;border:1px solid #ccc;background:#eee}
.hd figcaption{font-size:12px;color:#555}
.zoom{flex-direction:column}.zcap{color:#fff;font-size:13px;padding:8px;text-align:center}
.card.ro{border-color:#1D6F42;background:#EEF7F0}
nav.tabs{overflow-x:visible!important}nav.tabs button{min-width:0!important;flex:1 1 0!important;padding:7px 0!important;font-size:11px!important;letter-spacing:-.2px}
.actions select{padding:10px;border-radius:8px;font-size:15px}`));

if(S._carte){delete S._carte;S.tab='carte';saveS()}
if(S.tab==='carte'||S.tab==='donnees')render();
})();

/* ---------- Écran d'accueil ---------- */
(function(){
const TILES=[
 ['plantes','Plantes','Jean-Marie ITA (référent) · Georges KAKUE',()=>`${live('espece').length} espèce(s) · ${live('arbre').length} arbre(s) · ${live('jeunes').length} jeune(s) plant(s)`],
 ['reptiles','Reptiles','Glwadys BAKO',()=>`${live('rep_session').length} session(s) · ${live('rep_obs').length} observation(s)`],
 ['fourmis','Fourmis','Marvin WAITRONYIE',()=>`${live('fo_poste').length} poste(s) · ${live('fo_obs').length} observation(s)`],
 ['oiseaux','Oiseaux','Cédric MEAOU',()=>`${live('oi_session').length} matin(s) · ${live('oi_contact').length} contact(s) · ${live('oi_nid').length} nid(s)/cavité(s)`],
 ['carte','Carte','Points GPS, carrés, ma position',()=>'Fonctionne sans réseau'],
 ['donnees','Données','Synchro, exports Neodyme, photos HD',()=>{const n=Object.values(R).filter(r=>r.dirty).length;return n?`${n} ligne(s) à envoyer`:'Tout est envoyé'}]];
const go=t=>{S.tab=t;saveS();clearInterval(TICK);render()};
function vAccueil(){
 const pr=(S.obs||'').split(' ')[0];
 V.append(h('div',{class:'home-head'},h('div',{class:'hh-t'},'État initial – défrichement BESS ENERCAL'),h('div',{class:'hh-s'},'Fajawe, Ouvéa · mission DENV du 10 au 14 novembre 2026'),
  h('div',{class:'hh-u'},pr&&!RO()?`Bonjour ${pr} — choisissez une rubrique.`:RO()?'Accès Neodyme – consultation seule.':'Commencez par Données › Réglages : votre nom et le code équipe.')));
 const g=h('div',{class:'tiles'});
 for(const [t,ti,who,info] of TILES){
  let art;
  if(t==='carte')art=h('div',{class:'tart',style:"background:url('carte_ortho.jpg') 42% 50%/260% auto"});
  else if((window.PHOTOS||{})[t])art=h('div',{class:'tart',style:`background:url('${window.PHOTOS[t]}') center/cover`});
  else art=h('div',{class:'tart svg',html:(typeof ART!=='undefined'&&ART[t])||''});
  g.append(h('button',{class:'tile',onclick:()=>go(t)},art,h('div',{class:'tcap'},h('b',{},ti),h('span',{class:'who'},who),h('span',{class:'inf'},info()))));
 }
 V.append(g);
 V.append(h('p',{class:'muted',style:'text-align:center;margin-top:10px'},`Version ${window.APPV} · DENV – Province des Îles Loyauté`));
}
const nav=document.querySelector('nav.tabs');
if(nav&&!nav.querySelector('[data-t="accueil"]')){const b=h('button',{'data-t':'accueil',html:'<span class="tic"><svg viewBox="0 0 24 24"><path d="M3 11l9-8 9 8M5 9.5V21h5v-6h4v6h5V9.5" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/></svg></span><span>Accueil</span>'});
 b.onclick=()=>go('accueil');nav.insertBefore(b,nav.firstChild)}
const hb=document.querySelector('header .top b');if(hb){hb.style.cursor='pointer';hb.onclick=()=>go('accueil')}
const _r=render;render=function(){if(S.tab!=='accueil')return _r();
 clearInterval(TICK);V.innerHTML='';document.querySelectorAll('nav.tabs button').forEach(b=>b.classList.toggle('on',b.dataset.t==='accueil'));vAccueil();renderStatus();window.scrollTo(0,0)};
document.head.append(h('style',{},`.home-head{background:linear-gradient(135deg,#1F4D33,#2E7D4F);color:#fff;border-radius:14px;padding:14px 14px 12px;margin-bottom:12px}
.hh-t{font-size:18px;font-weight:800}.hh-s{font-size:13px;opacity:.9;margin-top:2px}.hh-u{font-size:15px;margin-top:10px;font-weight:600}
.tiles{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}@media(min-width:700px){.tiles{grid-template-columns:repeat(3,1fr)}}
.tile{padding:0;border:1px solid #D5DCD7;border-radius:14px;background:#fff;overflow:hidden;text-align:left;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,.08)}
.tile:active{transform:scale(.98)}
.tart{height:96px;background:#EEF4EF}.tart.svg svg{width:100%;height:100%;display:block}
.tcap{padding:8px 10px 10px;display:flex;flex-direction:column;gap:2px}.tcap b{font-size:17px;color:#1F4D33}
.tcap .who{font-size:12px;color:#555}.tcap .inf{font-size:12px;color:#2E7D4F;font-weight:600}`));
if(S._home){delete S._home;S.tab='accueil';saveS();render()}
})();
