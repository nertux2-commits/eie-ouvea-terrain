function indexHtml(data){return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Photothèque – Inventaire BESS Fajawe (Ouvéa)</title>
<style>body{font-family:Arial,sans-serif;margin:20px;color:#1f2937}h1{font-size:20px;color:#2E6B3F}input,select{font-size:15px;padding:6px;margin-right:8px}
table{border-collapse:collapse;width:100%;margin-top:12px;font-size:13px}th,td{border-bottom:1px solid #ddd;padding:5px;text-align:left;vertical-align:middle}th{background:#DCEBDF;position:sticky;top:0}
img{width:110px;height:74px;object-fit:cover;border-radius:4px}i{font-style:italic}</style></head><body>
<h1>Photothèque – Inventaire biologique de l'état initial, BESS Fajawe (Ouvéa) – DENV-PIL, novembre 2026</h1>
<input id="q" placeholder="Rechercher : espèce, réf., carré, n° d'arbre, herbier…" size="50"><select id="g"><option value="">Tous les groupes</option></select><span id="n"></span>
<table><thead><tr><th>Photo</th><th>Réf.</th><th>Groupe</th><th>Lieu</th><th>Taxon</th><th>N°</th><th>Date</th><th>Auteur</th><th>Légende</th></tr></thead><tbody id="t"></tbody></table>
<script>const D=${JSON.stringify(data)};const g=document.getElementById('g');[...new Set(D.map(o=>o.groupe))].forEach(x=>g.add(new Option(x,x)));
function r(){const q=document.getElementById('q').value.toLowerCase(),gv=g.value;const L=D.filter(o=>(!gv||o.groupe===gv)&&(!q||Object.values(o).join(' ').toLowerCase().includes(q)));
document.getElementById('n').textContent=L.length+' photo(s)';document.getElementById('t').innerHTML=L.map(o=>'<tr><td><a href="'+o.fichier+'" target="_blank"><img loading="lazy" src="'+o.fichier+'"></a></td><td>'+o.ref+'</td><td>'+o.groupe+'</td><td>'+o.lieu+'</td><td><i>'+o.taxon+'</i></td><td>'+o.numero+'</td><td>'+o.date+'</td><td>'+o.auteur+'</td><td>'+o.legende+'</td></tr>').join('')}
document.getElementById('q').oninput=r;g.onchange=r;r();<\/script></body></html>`}
