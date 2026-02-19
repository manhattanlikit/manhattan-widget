(function(){
// CSS enjekte
var s=document.createElement('style');
s.textContent=`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
:root{--mltp:#1d1d1f;--mlts:#6e6e73;--mltt:#aeaeb2;--mlbg:#fff;--mlbg2:#f5f5f7;--mlbgh:#f0f0f2;--mlbd:rgba(0,0,0,.06);--mlr:20px;--mlg:#af8c3e;--mlgl:#f7f0de}
.ml-trigger{position:fixed;bottom:24px;right:24px;height:48px;padding:0 20px 0 16px;border-radius:24px;background:var(--mltp);border:none;cursor:pointer;z-index:999999;display:flex;align-items:center;gap:8px;color:#fff;font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif;font-size:14px;font-weight:600;letter-spacing:-.1px;box-shadow:0 2px 12px rgba(0,0,0,.15),0 0 0 .5px rgba(0,0,0,.04);transition:all .2s ease}
.ml-trigger:hover{transform:scale(1.04);box-shadow:0 4px 20px rgba(0,0,0,.2)}.ml-trigger:active{transform:scale(.98)}.ml-trigger svg{width:18px;height:18px;stroke-width:1.8}
.ml-overlay{position:fixed;inset:0;background:rgba(0,0,0,.3);backdrop-filter:blur(20px) saturate(180%);-webkit-backdrop-filter:blur(20px) saturate(180%);z-index:1000000;display:flex;align-items:center;justify-content:center;opacity:0;visibility:hidden;transition:all .25s ease}
.ml-overlay.open{opacity:1;visibility:visible}
.ml-card{width:400px;max-width:92vw;max-height:90vh;overflow-y:auto;overflow-x:hidden;background:var(--mlbg);border-radius:var(--mlr);position:relative;transform:translateY(10px);transition:transform .3s cubic-bezier(.2,0,0,1);box-shadow:0 0 0 .5px rgba(0,0,0,.08),0 24px 60px -12px rgba(0,0,0,.15);font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif;color:var(--mltp)}
.ml-overlay.open .ml-card{transform:translateY(0)}.ml-card::-webkit-scrollbar{display:none}
.ml-x{position:sticky;top:12px;float:right;margin:12px 12px 0 0;width:30px;height:30px;border:none;background:var(--mlbg2);border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:2;transition:background .15s}
.ml-x:hover{background:var(--mlbgh)}.ml-x svg{width:12px;height:12px;stroke:var(--mlts);stroke-width:2.5}
.ml-inner{padding:0 24px 20px}
.ml-head{text-align:center;padding-top:4px;margin-bottom:14px}
.ml-head-sub{font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--mltt);margin-bottom:4px}
.ml-head-title{font-size:19px;font-weight:800;letter-spacing:-.5px;color:var(--mltp)}
.ml-tier{text-align:center;margin-bottom:16px}
.ml-tier-badge{width:64px;height:64px;margin:0 auto 10px;border-radius:50%;display:flex;align-items:center;justify-content:center;position:relative}
.ml-tier-badge svg{width:28px;height:28px;stroke-width:1.2}
.ml-tier-ring{position:absolute;inset:-4px;border-radius:50%;border:1.5px solid rgba(0,0,0,.04)}
.ml-tier-name{font-size:22px;font-weight:800;letter-spacing:-.8px;margin-bottom:2px;line-height:1.1}
.ml-tier-sub{font-size:13px;color:var(--mltt);font-weight:500}
.t-starter .ml-tier-badge{background:#f5f5f7}.t-starter .ml-tier-badge svg{stroke:#c7c7cc}.t-starter .ml-tier-name{color:#c7c7cc}
.t-bronze .ml-tier-badge{background:linear-gradient(145deg,#f2e8da,#e8d5be)}.t-bronze .ml-tier-badge svg{stroke:#a07440}.t-bronze .ml-tier-name{color:#8b6234}
.t-silver .ml-tier-badge{background:linear-gradient(145deg,#f0f0f2,#e4e4e8)}.t-silver .ml-tier-badge svg{stroke:#8e8e93}.t-silver .ml-tier-name{color:#636366}
.t-gold .ml-tier-badge{background:linear-gradient(145deg,#faf3e0,#f0e2b8)}.t-gold .ml-tier-badge svg{stroke:#af8c3e}.t-gold .ml-tier-name{color:#8a6d28}
.t-platinum .ml-tier-badge{background:linear-gradient(145deg,#e8e8ed,#d8d8de)}.t-platinum .ml-tier-badge svg{stroke:#636366}.t-platinum .ml-tier-name{color:#48484a}
.t-diamond .ml-tier-badge{background:linear-gradient(145deg,#e0e8f5,#c8d8f0)}.t-diamond .ml-tier-badge svg{stroke:#4a6fa5}.t-diamond .ml-tier-name{color:#3a5a8a}
.ml-prog{margin-bottom:16px}
.ml-prog-row{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px}
.ml-prog-label{font-size:13px;font-weight:500;color:var(--mlts)}
.ml-prog-val{font-size:13px;font-weight:700;color:var(--mltp);letter-spacing:-.2px}
.ml-prog-bar{width:100%;height:6px;background:var(--mlbg2);border-radius:3px;overflow:hidden}
.ml-prog-fill{height:100%;border-radius:3px;background:linear-gradient(90deg,#af8c3e,#d4b05e);transition:width .8s cubic-bezier(.25,0,0,1)}
.ml-prog-hint{margin-top:8px;text-align:center;font-size:13px;font-weight:500;color:var(--mlts);line-height:1.4;letter-spacing:-.1px}
.ml-prog-hint b{color:var(--mltp);font-weight:700}
.ml-stats{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px}
.ml-stat{background:var(--mlbg2);border-radius:14px;padding:12px;text-align:center}
.ml-stat-num{font-size:18px;font-weight:800;letter-spacing:-.5px;color:var(--mltp);line-height:1.2}
.ml-stat-lbl{font-size:11px;font-weight:600;color:var(--mltt);letter-spacing:.5px;text-transform:uppercase;margin-top:2px}
.ml-label{font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:var(--mltt);margin-bottom:8px}
.ml-tiers-table{margin-bottom:16px}
.ml-tier-row{display:flex;align-items:center;gap:10px;padding:6px 10px;border-radius:10px;margin-bottom:1px;cursor:pointer;transition:background .15s;position:relative}
.ml-tier-row:hover{background:var(--mlbg2)}
.ml-tier-row.current{background:var(--mlbg2);border:1.5px solid rgba(0,0,0,.08)}
.ml-tr-badge{display:inline-block;font-size:8px;font-weight:800;letter-spacing:1px;color:#fff;background:var(--mltp);padding:1px 6px;border-radius:4px;vertical-align:middle;margin-left:4px}
.ml-tr-ico{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.ml-tr-ico svg{width:14px;height:14px;stroke-width:1.5}
.ml-tr-ico.t-starter svg{stroke:#c7c7cc}.ml-tr-ico.t-bronze svg{stroke:#a07440}.ml-tr-ico.t-silver svg{stroke:#8e8e93}
.ml-tr-ico.t-gold svg{stroke:#af8c3e}.ml-tr-ico.t-platinum svg{stroke:#636366}.ml-tr-ico.t-diamond svg{stroke:#4a6fa5}
.ml-tr-info{flex:1;min-width:0}
.ml-tr-name{font-size:12px;font-weight:700;color:var(--mltp);letter-spacing:-.1px}
.ml-tr-desc{font-size:10px;font-weight:500;color:var(--mltt)}
.ml-tr-discount{font-size:13px;font-weight:800;color:var(--mltp);letter-spacing:-.3px;flex-shrink:0;display:flex;align-items:center;gap:4px}
.ml-tier-row.locked .ml-tr-name,.ml-tier-row.locked .ml-tr-discount{color:var(--mlts)}
.ml-tier-row.locked .ml-tr-ico{opacity:.6}.ml-tier-row.locked .ml-tr-desc{color:var(--mltt)}
.ml-tier-row.passed{opacity:.55}.ml-tier-row.passed .ml-tr-name{color:var(--mlts)}
.ml-tr-check{width:22px;height:22px;border-radius:50%;background:#af8c3e;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.ml-tr-check svg{width:12px;height:12px;stroke:#fff;stroke-width:2.5}
.ml-greeting{text-align:center;font-size:13px;font-weight:500;color:var(--mlts);margin-bottom:4px;letter-spacing:-.1px}
.ml-greeting b{color:var(--mltp);font-weight:700}
.ml-cta{display:flex;align-items:center;justify-content:center;flex:1;width:100%;padding:13px;background:var(--mltp);color:#fff;font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif;font-size:14px;font-weight:700;letter-spacing:-.1px;border:none;border-radius:12px;cursor:pointer;text-align:center;text-decoration:none;transition:all .2s}
.ml-cta:hover{opacity:.88}.ml-cta:active{transform:scale(.98)}
.ml-max-msg{text-align:center;padding:8px 0 16px;font-size:15px;font-weight:500;color:var(--mlts);line-height:1.6;letter-spacing:-.1px}
.ml-btns{display:flex;gap:10px}
.ml-cta-secondary{display:flex;align-items:center;justify-content:center;flex:1;padding:15px;background:var(--mlbg2);color:var(--mltp);font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif;font-size:14px;font-weight:700;letter-spacing:-.1px;border:none;border-radius:14px;cursor:pointer;text-align:center;text-decoration:none;transition:all .2s}
.ml-cta-secondary:hover{background:var(--mlbgh)}
@media(max-width:480px){.ml-card{border-radius:16px}.ml-inner{padding:0 20px 24px}.ml-tier-badge{width:72px;height:72px}.ml-tier-badge svg{width:32px;height:32px}.ml-tier-name{font-size:24px}.ml-head-title{font-size:19px}.ml-stat-num{font-size:18px}.ml-stats{gap:8px}.ml-stat{padding:14px 12px}.ml-prog-hint{font-size:13px}.ml-btns{flex-direction:column;gap:8px}.ml-trigger{bottom:16px;right:16px;height:44px;padding:0 16px 0 14px;font-size:13px}.ml-trigger svg{width:16px;height:16px}.ml-tier-row{padding:8px 10px}.ml-tr-ico{width:26px;height:26px}.ml-tr-ico svg{width:12px;height:12px}.ml-tr-name{font-size:12px}.ml-tr-desc{font-size:10px}.ml-tr-discount{font-size:13px}}`;
document.head.appendChild(s);

// HTML enjekte
var w=document.createElement('div');
w.innerHTML='<button class="ml-trigger" onclick="mlOpen()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>Sadakat Seviyem</button><div class="ml-overlay" id="ov" onclick="mlClose(event)"><div class="ml-card"><button class="ml-x" onclick="mlClose()"><svg viewBox="0 0 24 24" fill="none" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button><div class="ml-inner"><div class="ml-head"><div class="ml-head-sub">Manhattan Likit</div><div class="ml-head-title">Sadakat Programı</div></div><div id="ct"></div></div></div></div>';
document.body.appendChild(w);

var T=[
{n:'Starter',mn:0,d:0,s:false},
{n:'Bronze',mn:2000,d:2.5,s:false},
{n:'Silver',mn:5000,d:5,s:false},
{n:'Gold',mn:10000,d:7.5,s:false},
{n:'Platinum',mn:20000,d:10,s:false},
{n:'Diamond',mn:40000,d:15,s:true}
];

var IC={
Starter:'<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/></svg>',
Bronze:'<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3 7h7l-5.5 5 2 7L12 17l-6.5 4 2-7L2 9h7z"/></svg>',
Silver:'<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3h8l4 5-8 13L4 8z"/><path d="M4 8h16"/></svg>',
Gold:'<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="7"/><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"/></svg>',
Platinum:'<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z"/><circle cx="12" cy="12" r="10"/></svg>',
Diamond:'<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 13L2 9z"/><path d="M2 9h20"/><path d="M12 22l-4-13"/><path d="M12 22l4-13"/><path d="M8 3l4 6 4-6"/></svg>',
chk:'<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
};

var WEB_APP='https://script.google.com/macros/s/AKfycbxJKzibWzYOmapPvghMPxbt9u5vjGQyxCXZae4FKfUEsjCMIWEqkyI2CM_CovOGrzTbXQ/exec';
var GM={0:null,7957004:'Starter',24166501:'Bronze',24166502:'Silver',24166503:'Gold',24166504:'Platinum',24166505:'Diamond'};
var TB={Starter:'#f5f5f7',Bronze:'linear-gradient(145deg,#f2e8da,#e8d5be)',Silver:'linear-gradient(145deg,#f0f0f2,#e4e4e8)',Gold:'linear-gradient(145deg,#faf3e0,#f0e2b8)',Platinum:'linear-gradient(145deg,#e8e8ed,#d8d8de)',Diamond:'linear-gradient(145deg,#e0e8f5,#c8d8f0)'};
var DEMO={tier:'Gold',spend:14250,orders:18,name:'Tamer',loggedIn:true};

function f$(n){return new Intl.NumberFormat('tr-TR').format(Math.round(n))}

function go(d){
var i=T.findIndex(function(t){return t.n===d.tier});
var t=T[i],nx=i<T.length-1?T[i+1]:null;
var c='t-'+d.tier.toLowerCase();
var greeting=d.loggedIn&&d.name?'<div class="ml-greeting">Hoş geldin, <b>'+d.name+'</b></div>':'';
var prog='';
if(nx){
var p=Math.min((d.spend/nx.mn)*100,100);
var r=nx.mn-d.spend;
prog='<div class="ml-prog"><div class="ml-prog-row"><span class="ml-prog-label">Sonraki: '+nx.n+'</span><span class="ml-prog-val">'+f$(d.spend)+' / '+f$(nx.mn)+' ₺</span></div><div class="ml-prog-bar"><div class="ml-prog-fill" id="pf" data-p="'+p+'" style="width:0%"></div></div><div class="ml-prog-hint"><b>'+nx.n+'</b> seviyesine <b>'+f$(r)+' ₺</b> kaldı</div></div>';
}else{
prog='<div class="ml-max-msg">En yüksek seviyedesiniz.<br>Tüm ayrıcalıklarınız aktif.</div>';
}
var tt='';
T.forEach(function(ti,j){
var ip=j<i,ic=j===i,cls=ic?'current':ip?'passed':'locked';
var desc=ti.mn===0?'Başlangıç':f$(ti.mn)+' ₺ alışveriş';
var badge=ic?'<span class="ml-tr-badge">SİZ</span>':'';
var cod=ip?'<div class="ml-tr-check">'+IC.chk+'</div>':'<div class="ml-tr-discount">%'+ti.d+'</div>';
tt+='<div class="ml-tier-row '+cls+'"><div class="ml-tr-ico t-'+ti.n.toLowerCase()+'" style="background:'+TB[ti.n]+'">'+IC[ti.n]+'</div><div class="ml-tr-info"><div class="ml-tr-name">'+ti.n+' '+badge+'</div><div class="ml-tr-desc">'+desc+'</div></div>'+cod+'</div>';
});
var btns='';
if(d.loggedIn){btns='<a href="/store" class="ml-cta">Alışverişe Devam Et</a>';}
else{btns='<div class="ml-btns"><a href="https://manhattandan.com/account" class="ml-cta">Giriş Yap</a><a href="/store" class="ml-cta-secondary">Mağazaya Git</a></div>';}
document.getElementById('ct').innerHTML=greeting+'<div class="ml-tier '+c+'"><div class="ml-tier-badge"><div class="ml-tier-ring"></div>'+IC[d.tier]+'</div><div class="ml-tier-name">'+d.tier+'</div><div class="ml-tier-sub">Mevcut Seviyeniz</div></div>'+prog+'<div class="ml-stats"><div class="ml-stat"><div class="ml-stat-num" data-count="'+Math.round(d.spend)+'">0 ₺</div><div class="ml-stat-lbl">Alışverişiniz</div></div><div class="ml-stat"><div class="ml-stat-num" data-count="'+d.orders+'">0</div><div class="ml-stat-lbl">Sipariş</div></div></div><div class="ml-tiers-table"><div class="ml-label">Tüm Seviyeler</div>'+tt+'</div>'+btns;
setTimeout(function(){
var pf=document.getElementById('pf');
if(pf)pf.style.width=pf.dataset.p+'%';
document.querySelectorAll('[data-count]').forEach(function(el){
var target=parseInt(el.dataset.count),isMoney=target>100,inc=target/40,cur=0;
var tm=setInterval(function(){cur+=inc;if(cur>=target){cur=target;clearInterval(tm);}el.textContent=isMoney?f$(Math.round(cur))+' ₺':Math.round(cur);},30);
});
},120);
}

window.mlOpen=function(){
document.getElementById('ov').classList.add('open');
if(typeof Ecwid!=='undefined'&&Ecwid.Customer){
try{Ecwid.Customer.get(function(c){
if(c){
var tier=GM[c.customerGroupId]||'Starter',name=c.name?c.name.split(' ')[0]:'',email=c.email||'';
if(WEB_APP&&email){
fetch(WEB_APP+'?email='+encodeURIComponent(email)).then(function(r){return r.json()}).then(function(d){go({tier:tier,spend:d.spend||0,orders:d.orders||0,name:name,loggedIn:true})}).catch(function(){var td=T.find(function(t){return t.n===tier});go({tier:tier,spend:td?td.mn:0,orders:0,name:name,loggedIn:true})});
}else{var td=T.find(function(t){return t.n===tier});go({tier:tier,spend:td?td.mn:0,orders:0,name:name,loggedIn:true});}
}else{go({tier:'Starter',spend:0,orders:0,name:'',loggedIn:false});}
});}catch(e){go(DEMO);}
}else{go(DEMO);}
};

window.mlClose=function(e){
if(e&&e.target!==document.getElementById('ov')&&!e.target.closest('.ml-x'))return;
document.getElementById('ov').classList.remove('open');
};

document.addEventListener('keydown',function(e){if(e.key==='Escape')window.mlClose();});
})();
