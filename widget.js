(function(){
// CSS enjekte
var s=document.createElement('style');
s.textContent=`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
:root{--mltp:#1d1d1f;--mlts:#6e6e73;--mltt:#aeaeb2;--mlbg:#fff;--mlbg2:#f5f5f7;--mlbgh:#f0f0f2;--mlbd:rgba(0,0,0,.06);--mlr:20px;--mlg:#af8c3e;--mlgl:#f7f0de}
.ml-trigger{position:fixed;bottom:24px;right:24px;height:48px;padding:0 20px 0 16px;border-radius:24px;background:linear-gradient(135deg,#af8c3e,#d4b05e);border:none;cursor:pointer;z-index:999999;display:flex;align-items:center;gap:8px;color:#fff;font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif;font-size:13px;font-weight:600;letter-spacing:-.1px;box-shadow:0 2px 12px rgba(175,140,62,.3);transition:all .8s cubic-bezier(.25,0,0,1);overflow:hidden}
.ml-trigger::after{content:'';position:absolute;top:0;left:-100%;width:60%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent);animation:mlsweep 3s ease-in-out infinite}
@keyframes mlsweep{0%,100%{left:-100%}50%{left:100%}}
.ml-trigger:hover{transform:scale(1.04);box-shadow:0 4px 20px rgba(175,140,62,.4)}.ml-trigger:active{transform:scale(.98)}.ml-trigger svg{width:18px;height:18px;stroke-width:1.8}
.ml-overlay{position:fixed;inset:0;background:rgba(0,0,0,.3);backdrop-filter:blur(20px) saturate(180%);-webkit-backdrop-filter:blur(20px) saturate(180%);z-index:1000000;display:flex;align-items:center;justify-content:center;opacity:0;visibility:hidden;transition:all .25s ease}
.ml-overlay.open{opacity:1;visibility:visible}
.ml-card{width:400px;max-width:92vw;max-height:98vh;overflow-y:auto;overflow-x:hidden;background:var(--mlbg);border-radius:var(--mlr);position:relative;transform:translateY(10px);transition:transform .3s cubic-bezier(.2,0,0,1);box-shadow:0 0 0 .5px rgba(0,0,0,.08),0 24px 60px -12px rgba(0,0,0,.15);font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif;color:var(--mltp)}
.ml-overlay.open .ml-card{transform:translateY(0)}.ml-card::-webkit-scrollbar{display:none}
.ml-x{position:sticky;top:12px;float:right;margin:12px 12px 0 0;width:30px;height:30px;border:none;background:var(--mlbg2);border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:2;transition:background .15s}
.ml-x:hover{background:var(--mlbgh)}.ml-x svg{width:12px;height:12px;stroke:var(--mlts);stroke-width:2.5}
.ml-inner{padding:0 22px 16px}
.ml-head{text-align:center;padding-top:2px;margin-bottom:8px}
.ml-head-sub{font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--mltt);margin-bottom:2px}
.ml-head-title{font-size:17px;font-weight:800;letter-spacing:-.5px;color:var(--mltp)}
.ml-tier{text-align:center;margin-bottom:10px}
.ml-tier-badge{width:56px;height:56px;margin:0 auto 8px;border-radius:50%;display:flex;align-items:center;justify-content:center;position:relative}
.ml-tier-badge svg{width:24px;height:24px;stroke-width:1.2}
.ml-tier-ring{position:absolute;inset:-4px;border-radius:50%;border:2px solid transparent;background:conic-gradient(from 0deg,#af8c3e,#d4b05e,#f0e2b8,#d4b05e,#af8c3e) border-box;-webkit-mask:linear-gradient(#fff 0 0) padding-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;animation:mlring 4s linear infinite}
@keyframes mlring{to{transform:rotate(360deg)}}
.ml-tier-name{font-size:20px;font-weight:800;letter-spacing:-.8px;margin-bottom:1px;line-height:1.1}
.ml-tier-sub{font-size:11px;color:var(--mltt);font-weight:500}
.t-starter .ml-tier-badge{background:#f5f5f7}.t-starter .ml-tier-badge svg{stroke:#c7c7cc}.t-starter .ml-tier-name{color:#c7c7cc}
.t-bronze .ml-tier-badge{background:linear-gradient(145deg,#f2e8da,#e8d5be)}.t-bronze .ml-tier-badge svg{stroke:#a07440}.t-bronze .ml-tier-name{color:#8b6234}
.t-silver .ml-tier-badge{background:linear-gradient(145deg,#f0f0f2,#e4e4e8)}.t-silver .ml-tier-badge svg{stroke:#8e8e93}.t-silver .ml-tier-name{color:#636366}
.t-gold .ml-tier-badge{background:linear-gradient(145deg,#faf3e0,#f0e2b8)}.t-gold .ml-tier-badge svg{stroke:#af8c3e}.t-gold .ml-tier-name{color:#8a6d28}
.t-platinum .ml-tier-badge{background:linear-gradient(145deg,#e8e8ed,#d8d8de)}.t-platinum .ml-tier-badge svg{stroke:#636366}.t-platinum .ml-tier-name{color:#48484a}
.t-diamond .ml-tier-badge{background:linear-gradient(145deg,#e0e8f5,#c8d8f0)}.t-diamond .ml-tier-badge svg{stroke:#4a6fa5}.t-diamond .ml-tier-name{color:#3a5a8a}
.ml-prog{margin-bottom:10px}
.ml-prog-row{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px}
.ml-prog-label{font-size:13px;font-weight:500;color:var(--mlts)}
.ml-prog-val{font-size:13px;font-weight:700;color:var(--mltp);letter-spacing:-.2px}
.ml-prog-bar{width:100%;height:8px;background:var(--mlbg2);border-radius:4px;overflow:hidden}
.ml-prog-fill{height:100%;border-radius:4px;background:linear-gradient(90deg,#af8c3e,#d4b05e,#f0e2b8,#d4b05e);background-size:200% 100%;transition:width .8s cubic-bezier(.25,0,0,1);animation:mlshimmer 2s ease infinite}
@keyframes mlshimmer{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
.ml-prog-hint{margin-top:6px;text-align:center;font-size:12px;font-weight:500;color:var(--mlts);line-height:1.3;letter-spacing:-.1px}
.ml-prog-hint b{color:var(--mltp);font-weight:700}
.ml-stats{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px}
.ml-stat{background:var(--mlbg2);border-radius:12px;padding:10px;text-align:center;border:1px solid rgba(175,140,62,.08);transition:all .2s}
.ml-stat:hover{border-color:rgba(175,140,62,.2);background:#fdfbf5}
.ml-stat-num{font-size:16px;font-weight:800;letter-spacing:-.5px;color:var(--mltp);line-height:1.2}
.ml-stat-lbl{font-size:10px;font-weight:600;color:var(--mltt);letter-spacing:.5px;text-transform:uppercase;margin-top:1px}
.ml-label{font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:var(--mltt);margin-bottom:4px}
.ml-tiers-table{margin-bottom:10px}
.ml-tier-row{display:flex;align-items:center;gap:8px;padding:5px 8px;border-radius:10px;margin-bottom:1px;position:relative}
.ml-tier-row.current{background:linear-gradient(135deg,#fdfbf5,#faf3e0);border:1.5px solid rgba(175,140,62,.2)}
.ml-tr-badge{display:inline-block;font-size:8px;font-weight:800;letter-spacing:1px;color:#fff;background:linear-gradient(135deg,#af8c3e,#d4b05e);padding:1px 6px;border-radius:4px;vertical-align:middle;margin-left:4px}
.ml-tr-ico{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.ml-tr-ico svg{width:14px;height:14px;stroke-width:1.5}
.ml-tr-ico.t-starter svg{stroke:#c7c7cc}.ml-tr-ico.t-bronze svg{stroke:#a07440}.ml-tr-ico.t-silver svg{stroke:#8e8e93}
.ml-tr-ico.t-gold svg{stroke:#af8c3e}.ml-tr-ico.t-platinum svg{stroke:#636366}.ml-tr-ico.t-diamond svg{stroke:#4a6fa5}
.ml-tr-info{flex:1;min-width:0}
.ml-tr-name{font-size:12px;font-weight:700;color:var(--mltp);letter-spacing:-.1px}
.ml-tr-desc{font-size:10px;font-weight:500;color:var(--mltt)}
.ml-tr-discount{font-size:13px;font-weight:800;color:var(--mltp);letter-spacing:-.3px;flex-shrink:0;display:flex;align-items:center;gap:4px}
.ml-tier-row.locked{opacity:.65;cursor:pointer;transition:all .2s}
.ml-tier-row.locked:hover{opacity:1;background:var(--mlbg2)}
.ml-tier-row.locked .ml-tr-name,.ml-tier-row.locked .ml-tr-discount{color:var(--mlts)}
.ml-tier-row.locked .ml-tr-ico{opacity:.7}.ml-tier-row.locked .ml-tr-desc{color:var(--mlts)}
.ml-tier-row.passed{opacity:.7}.ml-tier-row.passed .ml-tr-name{color:var(--mlts)}
.ml-tier-tip{display:none;background:linear-gradient(135deg,#faf3e0,#f7f0de);border:1px solid rgba(175,140,62,.15);border-radius:10px;padding:10px 12px;margin:4px 0 6px;font-size:12px;color:var(--mltp);line-height:1.5;animation:mlfade .2s ease}
.ml-tier-row.expanded+.ml-tier-tip{display:block}
@keyframes mlfade{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}
.ml-tr-check{width:22px;height:22px;border-radius:50%;background:#af8c3e;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.ml-tr-check svg{width:12px;height:12px;stroke:#fff;stroke-width:2.5}
.ml-greeting{text-align:center;font-size:12px;font-weight:500;color:var(--mlts);margin-bottom:2px;letter-spacing:-.1px}
.ml-greeting b{color:var(--mltp);font-weight:700}
.ml-cta{display:block;width:100%;padding:11px;background:var(--mltp);color:#fff;font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif;font-size:13px;font-weight:700;letter-spacing:-.1px;border:none;border-radius:10px;cursor:pointer;text-align:center;text-decoration:none;transition:all .2s;box-sizing:border-box}
.ml-cta:hover{background:linear-gradient(135deg,#af8c3e,#d4b05e);color:#fff;opacity:1}.ml-cta:active{transform:scale(.98)}
.ml-cta-gold{background:linear-gradient(135deg,#af8c3e,#d4b05e);color:#fff !important;position:relative;overflow:hidden}
.ml-cta-gold::after{content:'';position:absolute;top:0;left:-100%;width:60%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent);animation:mlsweep 3s ease-in-out infinite}
.ml-max-msg{text-align:center;padding:8px 0 16px;font-size:15px;font-weight:500;color:var(--mlts);line-height:1.6;letter-spacing:-.1px}
.ml-btns{display:flex;gap:10px}
.ml-btns .ml-cta,.ml-btns .ml-cta-secondary{flex:1}
.ml-cta-secondary{display:block;padding:13px;background:var(--mlbg2);color:var(--mltp);font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif;font-size:14px;font-weight:700;letter-spacing:-.1px;border:none;border-radius:12px;cursor:pointer;text-align:center;text-decoration:none;transition:all .2s;box-sizing:border-box}
.ml-cta-secondary:hover{background:var(--mlbgh)}
.ml-locked-msg{text-align:center;padding:16px 0 8px;font-size:15px;font-weight:500;color:var(--mlts);line-height:1.6}
.ml-confetti{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:hidden;z-index:3}
.ml-confetti i{position:absolute;width:6px;height:6px;border-radius:50%;top:-10px;animation:mlconf 1.8s ease-out forwards}
.ml-confetti i:nth-child(odd){border-radius:1px;width:5px;height:8px}
@keyframes mlconf{0%{transform:translateY(0) rotate(0) scale(1);opacity:1}100%{transform:translateY(280px) rotate(720deg) scale(0);opacity:0}}
.ml-savings{background:linear-gradient(135deg,#faf3e0,#f7f0de);border-radius:10px;padding:10px 12px;margin-bottom:10px;display:flex;align-items:center;gap:8px;border:1px solid rgba(175,140,62,.12)}
.ml-savings-ico{width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,#af8c3e,#d4b05e);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.ml-savings-ico svg{width:15px;height:15px;stroke:#fff;stroke-width:2;fill:none}
.ml-savings-txt{font-size:11px;color:var(--mlts);line-height:1.3;letter-spacing:-.1px}
.ml-savings-txt b{color:var(--mltp);font-size:14px;font-weight:800}
.ml-warn{background:linear-gradient(135deg,#fef2f2,#fde8e8);border:1px solid rgba(229,62,62,.12);border-radius:10px;padding:8px 12px;margin-bottom:10px;display:flex;align-items:center;gap:8px}
.ml-warn-ico{width:28px;height:28px;border-radius:50%;background:#e53e3e;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.ml-warn-ico svg{width:14px;height:14px}
.ml-warn-txt{font-size:11px;color:#9b2c2c;line-height:1.3}
.ml-warn-txt b{font-weight:700;color:#c53030}
.ml-levelup{text-align:center;margin-bottom:8px;animation:mlpulse 1s ease 2}
.ml-levelup-txt{font-size:12px;font-weight:700;color:var(--mlg);letter-spacing:-.2px}
@keyframes mlpulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
.ml-burst{position:fixed;pointer-events:none;z-index:1000000}
.ml-burst i{position:absolute;width:4px;height:4px;border-radius:50%;animation:mlbst .5s ease-out forwards}
@keyframes mlbst{0%{transform:translate(0,0) scale(1);opacity:1}70%{opacity:.8}100%{opacity:0}}
.ml-flash{background:linear-gradient(135deg,#1d1d1f,#2c2c2e);border-radius:8px;padding:7px 10px;margin-bottom:8px;display:flex;align-items:center;gap:8px;color:#fff}
.ml-flash-ico{width:24px;height:24px;border-radius:50%;background:linear-gradient(135deg,#af8c3e,#d4b05e);display:flex;align-items:center;justify-content:center;flex-shrink:0;animation:mlpulse 1.5s ease infinite}
.ml-flash-ico svg{width:12px;height:12px;stroke:#fff;stroke-width:2;fill:none}
.ml-flash-txt{font-size:10px;line-height:1.3;flex:1}
.ml-flash-txt b{color:#d4b05e;font-weight:700}
.ml-flash-timer{font-size:12px;font-weight:800;color:#d4b05e;letter-spacing:.5px;flex-shrink:0}
.ml-share-preview{position:fixed;inset:0;z-index:1000001;background:rgba(0,0,0,.6);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;animation:mlfade .2s ease}
.ml-share-preview canvas{border-radius:12px;max-width:85vw;box-shadow:0 12px 40px rgba(0,0,0,.3)}
.ml-share-preview-btns{display:flex;gap:10px}
.ml-share-preview-btns button{padding:8px 20px;border-radius:10px;border:none;font-family:inherit;font-size:12px;font-weight:700;cursor:pointer}
.ml-sp-share{background:linear-gradient(135deg,#af8c3e,#d4b05e);color:#fff}
.ml-sp-close{background:rgba(255,255,255,.15);color:#fff}
.ml-surprise{text-align:center;margin-bottom:4px}
.ml-surprise a{font-size:10px;font-weight:600;color:var(--mlg);text-decoration:none;display:inline-flex;align-items:center;gap:3px;opacity:.7;transition:opacity .2s}
.ml-surprise a:hover{opacity:1}
.ml-surprise a svg{width:11px;height:11px;stroke:var(--mlg);stroke-width:2;fill:none}
.ml-bday-form{background:linear-gradient(135deg,#faf3e0,#f7f0de);border:1px solid rgba(175,140,62,.15);border-radius:8px;padding:8px 10px;margin-bottom:8px;text-align:center;animation:mlfade .2s ease}
.ml-bday-form input{border:1px solid rgba(0,0,0,.1);border-radius:6px;padding:5px 8px;font-size:11px;font-family:inherit;text-align:center;width:130px;margin:4px 0}
.ml-bday-form button{background:linear-gradient(135deg,#af8c3e,#d4b05e);color:#fff;border:none;border-radius:6px;padding:4px 12px;font-size:10px;font-weight:700;font-family:inherit;cursor:pointer;margin-left:4px}
.ml-bday-form .ml-bday-msg{font-size:10px;color:var(--mlts);margin-top:4px}
.ml-tier-share{position:absolute;bottom:-2px;right:-2px;width:16px;height:16px;border-radius:50%;background:var(--mltp);display:flex;align-items:center;justify-content:center;opacity:0;transform:scale(.7);transition:all .2s;cursor:pointer}
.ml-tier-badge:hover .ml-tier-share{opacity:1;transform:scale(1)}
.ml-tier-share svg{width:8px;height:8px;stroke:#fff;stroke-width:2;fill:none}
.ml-trigger.collapsed{width:48px;height:48px;padding:0;border-radius:50%;justify-content:center;gap:0}
.ml-trigger.collapsed .ml-trigger-txt{max-width:0;opacity:0;overflow:hidden}
.ml-trigger .ml-trigger-txt{max-width:200px;opacity:1;white-space:nowrap;overflow:hidden;transition:max-width .9s ease,opacity .7s ease}
.ml-trigger.collapsed svg{margin:0}
@media(min-width:1025px){.ml-card{width:440px}.ml-head-title{font-size:18px}.ml-tier-name{font-size:22px}.ml-tr-name{font-size:13px}.ml-tr-desc{font-size:11px}.ml-tr-discount{font-size:14px}.ml-stat-num{font-size:18px}.ml-stat-lbl{font-size:10px}.ml-prog-label{font-size:13px}.ml-prog-val{font-size:13px}.ml-prog-hint{font-size:12px}.ml-inner{padding:0 24px 18px}}
@media(max-width:1024px){.ml-card{border-radius:16px;max-width:94vw}.ml-inner{padding:0 18px 16px}.ml-tier-badge{width:56px;height:56px}.ml-tier-badge svg{width:24px;height:24px}.ml-tier-name{font-size:20px}.ml-head-title{font-size:17px}.ml-stat-num{font-size:15px}.ml-stats{gap:6px}.ml-stat{padding:10px 8px}.ml-prog-hint{font-size:11px}.ml-btns{flex-direction:column;gap:6px}.ml-trigger{bottom:16px;right:16px;width:44px;height:44px;padding:0;border-radius:50%;justify-content:center}.ml-trigger .ml-trigger-txt{display:none}.ml-trigger svg{width:18px;height:18px;margin:0}.ml-tier-row{padding:5px 8px}.ml-tr-ico{width:24px;height:24px}.ml-tr-ico svg{width:11px;height:11px}.ml-tr-name{font-size:11px}.ml-tr-desc{font-size:9px}.ml-tr-discount{font-size:12px}}`;
document.head.appendChild(s);

// HTML enjekte
var w=document.createElement('div');
w.innerHTML='<button class="ml-trigger" onclick="mlOpen()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><span class="ml-trigger-txt">Sadakat Seviyem</span></button><div class="ml-overlay" id="ov" onclick="mlClose(event)"><div class="ml-card"><button class="ml-x" onclick="mlClose()"><svg viewBox="0 0 24 24" fill="none" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button><div class="ml-inner"><div class="ml-head"><div class="ml-head-sub">Manhattan</div><div class="ml-head-title">Sadakat Programı</div></div><div id="ct"></div></div></div></div>';
document.body.appendChild(w);

var T=[
{n:'Starter',mn:0,d:0,r:0,s:false},
{n:'Bronze',mn:2000,d:2.5,r:15,s:false},
{n:'Silver',mn:5000,d:5,r:10,s:false},
{n:'Gold',mn:10000,d:7.5,r:8,s:false},
{n:'Platinum',mn:20000,d:10,r:5,s:false},
{n:'Diamond',mn:40000,d:15,r:3,s:true}
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
var DEMO={tier:'Gold',spend:14250,orders:18,returnRate:4.2,name:'Tamer',loggedIn:true};

function f$(n){return new Intl.NumberFormat('tr-TR').format(Math.round(n))}

// Spend'den tier hesapla (Ecwid group'a güvenme)
function tierFromSpend(spend){
for(var i=T.length-1;i>=0;i--){if(spend>=T[i].mn)return T[i].n;}
return 'Starter';
}

var CONFETTI_COLORS=['#af8c3e','#d4b05e','#f0e2b8','#8b6234','#636366','#4a6fa5','#e53e3e','#48bb78'];
function mlConfetti(card,intense){
var con=document.createElement('div');con.className='ml-confetti';
var count=intense?40:20;
for(var k=0;k<count;k++){
var p=document.createElement('i');
p.style.left=Math.random()*100+'%';
p.style.background=CONFETTI_COLORS[Math.floor(Math.random()*CONFETTI_COLORS.length)];
p.style.animationDelay=(Math.random()*0.8)+'s';
p.style.animationDuration=(1.2+Math.random()*1)+'s';
con.appendChild(p);
}
card.appendChild(con);
setTimeout(function(){con.remove();},3000);
}

function checkLevelUp(tier){
var key='ml_last_tier';
try{
var prev=localStorage.getItem(key);
localStorage.setItem(key,tier);
if(!prev)return 'first';
if(prev!==tier){var pi=T.findIndex(function(t){return t.n===prev});var ci=T.findIndex(function(t){return t.n===tier});return ci>pi?'levelup':'same';}
return 'same';
}catch(e){return 'same';}
}

function go(d){
// LOGGED OUT: kilitli görünüm
if(!d.loggedIn){
var tt='';
T.forEach(function(ti){
var lockIco='<svg viewBox="0 0 24 24" fill="none" stroke="var(--mltt)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:12px;height:12px"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>';
tt+='<div class="ml-tier-row locked"><div class="ml-tr-ico t-'+ti.n.toLowerCase()+'" style="background:'+TB[ti.n]+'">'+IC[ti.n]+'</div><div class="ml-tr-info"><div class="ml-tr-name">'+ti.n+'</div></div><div class="ml-tr-discount">'+lockIco+'</div></div>';
});
document.getElementById('ct').innerHTML='<div class="ml-locked-msg">İndirim seviyenizi görmek için<br><a href="https://manhattandan.com/account" style="color:var(--mlg);font-weight:700;text-decoration:underline">giriş yapın</a>.</div><div class="ml-tiers-table"><div class="ml-label">Tüm Seviyeler</div>'+tt+'</div><div class="ml-btns"><a href="https://manhattandan.com/account" class="ml-cta ml-cta-gold">Giriş Yap</a><button onclick="mlClose()" class="ml-cta-secondary">Mağazaya Git</button></div>';
return;
}
// LOGGED IN
var i=T.findIndex(function(t){return t.n===d.tier});
var t=T[i],nx=i<T.length-1?T[i+1]:null;
var c='t-'+d.tier.toLowerCase();
var greeting=d.loggedIn&&d.name?'<div class="ml-greeting">Hoş geldin, <b>'+d.name+'</b></div>':'';
var prog='';
if(nx){
var p=Math.min((d.spend/nx.mn)*100,100);
var r=nx.mn-d.spend;
prog='<div class="ml-prog"><div class="ml-prog-row"><span class="ml-prog-label">Sonraki: '+nx.n+'</span><span class="ml-prog-val">'+f$(d.spend)+' / '+f$(nx.mn)+' ₺</span></div><div class="ml-prog-bar"><div class="ml-prog-fill" id="pf" data-p="'+p+'" style="width:0%"></div></div><div class="ml-prog-hint"><b>'+nx.n+'</b> seviyesine <b>'+f$(r)+' ₺</b> kaldı'+(nx.r?' · İade oranı <%'+nx.r+' olmalı':'')+'</div></div>';
}else{
prog='<div class="ml-max-msg">En yüksek seviyedesiniz.<br>Tüm ayrıcalıklarınız aktif.</div>';
}
var tt='';
T.forEach(function(ti,j){
var ip=j<i,ic=j===i,cls=ic?'current':ip?'passed':'locked';
var desc=ti.mn===0?'Başlangıç':f$(ti.mn)+' ₺ alışveriş'+(ti.r?' · <%'+ti.r+' iade':'');
var badge=ic?'<span class="ml-tr-badge">SİZ</span>':'';
var cod=ip?'<div class="ml-tr-check">'+IC.chk+'</div>':'<div class="ml-tr-discount">%'+ti.d+'</div>';
var clickAttr=(!ip&&!ic)?' onclick="mlTip(this)"':'';
var tip='';
if(!ip&&!ic){
var need=ti.mn-d.spend;
tip='<div class="ml-tier-tip"><svg viewBox="0 0 24 24" fill="none" stroke="var(--mlg)" stroke-width="2" stroke-linecap="round" style="width:14px;height:14px;vertical-align:-2px;margin-right:3px;flex-shrink:0"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg><b>'+ti.n+'</b> seviyesine ulaşmak için <b>'+f$(Math.max(need,0))+' ₺</b> daha alışveriş yapın'+(ti.r?' ve iade oranınızı <b>%'+ti.r+'</b> altında tutun':'')+'. Bu seviyede <b>%'+ti.d+'</b> indirim kazanırsınız!</div>';
}
tt+='<div class="ml-tier-row '+cls+'"'+clickAttr+'><div class="ml-tr-ico t-'+ti.n.toLowerCase()+'" style="background:'+TB[ti.n]+'">'+IC[ti.n]+'</div><div class="ml-tr-info"><div class="ml-tr-name">'+ti.n+' '+badge+'</div><div class="ml-tr-desc">'+desc+'</div></div>'+cod+'</div>'+tip;
});
var rateBox='';
var statCols='1fr 1fr';
if(typeof d.returnRate==='number'){
rateBox='<div class="ml-stat"><div class="ml-stat-num" style="color:'+(d.returnRate>(t.r||100)?'#e53e3e':'var(--mltp)')+'">%'+d.returnRate.toFixed(1)+'</div><div class="ml-stat-lbl">İade Oranı</div></div>';
statCols='1fr 1fr 1fr';
}
// Tasarruf hesapla
var savings=Math.round(d.spend*(t.d/100));
var savingsHtml=savings>0?'<div class="ml-savings"><div class="ml-savings-ico"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1v22"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg></div><div class="ml-savings-txt">Bugüne kadar toplam<br><b>'+f$(savings)+' ₺</b> tasarruf ettiniz</div></div>':'';
// İade uyarısı
var warnHtml='';
if(typeof d.returnRate==='number'&&t.r>0){
var limit=t.r;
var diff=limit-d.returnRate;
var warnIco='<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M12 9v4"/><circle cx="12" cy="16" r=".5" fill="#fff"/><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>';
if(diff<=3&&diff>0){warnHtml='<div class="ml-warn"><div class="ml-warn-ico">'+warnIco+'</div><div class="ml-warn-txt">İade oranınız <b>%'+d.returnRate.toFixed(1)+'</b> — <b>%'+limit+'</b> limitine yaklaşıyor.<br>Seviyenizi korumak için dikkatli olun!</div></div>';}
else if(diff<=0){warnHtml='<div class="ml-warn"><div class="ml-warn-ico">'+warnIco+'</div><div class="ml-warn-txt">İade oranınız <b>%'+d.returnRate.toFixed(1)+'</b> ile <b>%'+limit+'</b> limitini aştı.<br>Seviye düşüşü riski var!</div></div>';}
}
// Level-up kontrol
var luStatus=checkLevelUp(d.tier);
var luHtml='';
if(luStatus==='levelup'){luHtml='<div class="ml-levelup"><div class="ml-levelup-txt"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="width:16px;height:16px;vertical-align:-3px;margin-right:4px"><path d="M12 2l3 7h7l-5.5 5 2 7L12 17l-6.5 4 2-7L2 9h7z"/></svg>Tebrikler! '+d.tier+' seviyesine yükseldiniz!</div></div>';}
// Hedef takvim
var projHtml='';
if(nx&&d.orders>1&&d.spend>0){
var avgPerMonth=d.spend/12;
if(avgPerMonth>0){var monthsLeft=Math.ceil((nx.mn-d.spend)/avgPerMonth*0.7);var targetDate=new Date();targetDate.setMonth(targetDate.getMonth()+monthsLeft);var monthNames=['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];projHtml='<div style="text-align:center;font-size:10px;color:var(--mlts);margin-top:4px">Bu hızda giderseniz <b>'+nx.n+'</b> seviyesi <b>'+monthNames[targetDate.getMonth()]+' '+targetDate.getFullYear()+'</b></div>';}
}
// Sürpriz indirimler linki
var surpriseHtml='<div class="ml-surprise"><a href="javascript:void(0)" onclick="mlBday()"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12v10H4V12"/><path d="M2 7h20v5H2z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/></svg>Sürpriz İndirimler</a></div>';
// Flash bonus (Cuma 22:00 - Cumartesi 22:00)
var flashHtml='';
var now=new Date();var dow=now.getDay(),hr=now.getHours();
var isFlash=(dow===5&&hr>=22)||(dow===6&&hr<22);
if(isFlash){
var end=new Date(now);if(dow===5){end.setDate(end.getDate()+1);}end.setHours(22,0,0,0);
var rem=Math.max(0,Math.floor((end-now)/1000));
var fh=Math.floor(rem/3600),fm=Math.floor((rem%3600)/60),fs=rem%60;
flashHtml='<div class="ml-flash"><div class="ml-flash-ico"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div><div class="ml-flash-txt"><b>Flash Bonus +%2.5</b><br>Hafta sonu özel ek indirim</div><div class="ml-flash-timer" id="ml-ft">'+String(fh).padStart(2,'0')+':'+String(fm).padStart(2,'0')+':'+String(fs).padStart(2,'0')+'</div></div>';
}
var btns='<button onclick="mlClose()" class="ml-cta">Alışverişe Devam Et</button>';
document.getElementById('ct').innerHTML=greeting+luHtml+'<div class="ml-tier '+c+'"><div class="ml-tier-badge" onclick="mlSharePreview()" title="Paylaş"><div class="ml-tier-ring"></div>'+IC[d.tier]+'<div class="ml-tier-share"><svg viewBox="0 0 24 24" stroke-linecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg></div></div><div class="ml-tier-name">'+d.tier+'</div><div class="ml-tier-sub">Mevcut Seviyeniz</div></div>'+surpriseHtml+'<div id="ml-bday-area"></div>'+flashHtml+prog+projHtml+warnHtml+savingsHtml+'<div class="ml-stats" style="grid-template-columns:'+statCols+'"><div class="ml-stat"><div class="ml-stat-num" data-count="'+Math.round(d.spend)+'">0 ₺</div><div class="ml-stat-lbl">Son 12 Ay Alışveriş</div></div><div class="ml-stat"><div class="ml-stat-num" data-count="'+d.orders+'">0</div><div class="ml-stat-lbl">Sipariş</div></div>'+rateBox+'</div><div class="ml-tiers-table"><div class="ml-label">Tüm Seviyeler</div>'+tt+'</div>'+btns;
// Confetti
setTimeout(function(){
var card=document.querySelector('.ml-card');
if(card){
if(luStatus==='levelup'){mlConfetti(card,true);mlSound('levelup');}
else if(i>0){mlConfetti(card,false);mlSound('open');}
}
var pf=document.getElementById('pf');
if(pf)pf.style.width=pf.dataset.p+'%';
document.querySelectorAll('[data-count]').forEach(function(el){
var target=parseInt(el.dataset.count),isMoney=target>100,inc=target/40,cur=0;
var tm=setInterval(function(){cur+=inc;if(cur>=target){cur=target;clearInterval(tm);}el.textContent=isMoney?f$(Math.round(cur))+' ₺':Math.round(cur);},30);
});
},120);
// Flash timer
var fte=document.getElementById('ml-ft');
if(fte){setInterval(function(){var t=fte.textContent.split(':');var s=parseInt(t[0])*3600+parseInt(t[1])*60+parseInt(t[2])-1;if(s<=0)return;var h=Math.floor(s/3600),m=Math.floor((s%3600)/60),sc=s%60;fte.textContent=String(h).padStart(2,'0')+':'+String(m).padStart(2,'0')+':'+String(sc).padStart(2,'0');},1000);}
}

var _mlCache=null;

// Sayfa yüklendiğinde arka planda veriyi çek
if(typeof Ecwid!=='undefined'&&Ecwid.OnAPILoaded){
Ecwid.OnAPILoaded.add(function(){
try{Ecwid.Customer.get(function(c){
if(c){
var name=c.name?c.name.split(' ')[0]:'',email=c.email||'';
if(WEB_APP&&email){
fetch(WEB_APP+'?email='+encodeURIComponent(email)).then(function(r){return r.json()}).then(function(d){
var tier=tierFromSpend(d.spend||0);
_mlCache={tier:tier,spend:d.spend||0,orders:d.orders||0,returnRate:d.returnRate,name:name,email:email,loggedIn:true};
}).catch(function(){
var tier=GM[c.customerGroupId]||'Starter';
var td=T.find(function(t){return t.n===tier});
_mlCache={tier:tier,spend:td?td.mn:0,orders:0,name:name,email:email,loggedIn:true};
});
}else{var tier=GM[c.customerGroupId]||'Starter';var td=T.find(function(t){return t.n===tier});_mlCache={tier:tier,spend:td?td.mn:0,orders:0,name:name,email:email,loggedIn:true};}
}else{_mlCache={tier:'Starter',spend:0,orders:0,name:'',loggedIn:false};}
});}catch(e){}
});
}

window.mlOpen=function(){
document.getElementById('ov').classList.add('open');
if(_mlCache){go(_mlCache);return;}
document.getElementById('ct').innerHTML='<div style="text-align:center;padding:40px 0"><div style="width:28px;height:28px;border:2.5px solid #f0f0f2;border-top-color:#1d1d1f;border-radius:50%;margin:0 auto;animation:mlspin .6s linear infinite"></div></div>';
if(!document.getElementById('mlspincss')){var sc=document.createElement('style');sc.id='mlspincss';sc.textContent='@keyframes mlspin{to{transform:rotate(360deg)}}';document.head.appendChild(sc);}
if(typeof Ecwid!=='undefined'&&Ecwid.Customer){
try{Ecwid.Customer.get(function(c){
if(c){
var name=c.name?c.name.split(' ')[0]:'',email=c.email||'';
if(WEB_APP&&email){
fetch(WEB_APP+'?email='+encodeURIComponent(email)).then(function(r){return r.json()}).then(function(d){
var tier=tierFromSpend(d.spend||0);
_mlCache={tier:tier,spend:d.spend||0,orders:d.orders||0,returnRate:d.returnRate,name:name,email:email,loggedIn:true};
go(_mlCache);
}).catch(function(){
var tier=GM[c.customerGroupId]||'Starter';
var td=T.find(function(t){return t.n===tier});
_mlCache={tier:tier,spend:td?td.mn:0,orders:0,name:name,email:email,loggedIn:true};
go(_mlCache);
});
}else{var tier=GM[c.customerGroupId]||'Starter';var td=T.find(function(t){return t.n===tier});_mlCache={tier:tier,spend:td?td.mn:0,orders:0,name:name,email:email,loggedIn:true};go(_mlCache);}
}else{_mlCache={tier:'Starter',spend:0,orders:0,name:'',loggedIn:false};go(_mlCache);}
});}catch(e){go(DEMO);}
}else{go(DEMO);}
};

window.mlClose=function(e){
if(e&&e.target!==document.getElementById('ov')&&!e.target.closest('.ml-x'))return;
document.getElementById('ov').classList.remove('open');
var trig=document.querySelector('.ml-trigger');
if(trig&&!trig.classList.contains('collapsed'))trig.classList.add('collapsed');
};

window.mlTip=function(el){
var wasExpanded=el.classList.contains('expanded');
document.querySelectorAll('.ml-tier-row.expanded').forEach(function(r){r.classList.remove('expanded');});
if(!wasExpanded)el.classList.add('expanded');
};

// Paylaş — önce preview, sonra paylaş
window.mlSharePreview=function(){
if(!_mlCache||!_mlCache.loggedIn)return;
var d=_mlCache;
var ti=T.findIndex(function(t){return t.n===d.tier});
var t=T[ti];
var c=document.createElement('canvas');c.width=600;c.height=340;
var ctx=c.getContext('2d');
var bg=ctx.createLinearGradient(0,0,600,340);
bg.addColorStop(0,'#1d1d1f');bg.addColorStop(1,'#2c2c2e');
ctx.fillStyle=bg;ctx.beginPath();ctx.roundRect(0,0,600,340,20);ctx.fill();
var gl=ctx.createLinearGradient(60,0,540,0);
gl.addColorStop(0,'#af8c3e');gl.addColorStop(0.5,'#d4b05e');gl.addColorStop(1,'#af8c3e');
ctx.fillStyle=gl;ctx.fillRect(60,40,480,2);
ctx.font='600 11px sans-serif';ctx.fillStyle='#8e8e93';ctx.textAlign='center';
ctx.fillText('MANHATTAN',300,70);
ctx.font='800 42px sans-serif';ctx.fillStyle='#fff';
ctx.fillText(d.tier,300,125);
ctx.font='500 14px sans-serif';ctx.fillStyle='#aeaeb2';
ctx.fillText('Sadakat Seviyesi',300,150);
ctx.beginPath();ctx.arc(300,210,38,0,Math.PI*2);
var cg=ctx.createLinearGradient(262,172,338,248);cg.addColorStop(0,'#af8c3e');cg.addColorStop(1,'#d4b05e');
ctx.fillStyle=cg;ctx.fill();
ctx.font='800 22px sans-serif';ctx.fillStyle='#fff';
ctx.fillText('%'+t.d,300,218);
ctx.font='500 12px sans-serif';ctx.fillStyle='#636366';
ctx.fillText('İndirim Oranı',300,268);
ctx.fillStyle=gl;ctx.fillRect(60,298,480,2);
ctx.font='500 10px sans-serif';ctx.fillStyle='#48484a';
ctx.fillText('manhattandan.com',300,322);
// Preview overlay
var ov=document.createElement('div');ov.className='ml-share-preview';
ov.innerHTML='<div class="ml-share-preview-btns"><button class="ml-sp-share" id="ml-sp-go">Paylaş</button><button class="ml-sp-close" id="ml-sp-x">Kapat</button></div>';
ov.insertBefore(c,ov.firstChild);
document.body.appendChild(ov);
document.getElementById('ml-sp-x').onclick=function(){ov.remove();};
document.getElementById('ml-sp-go').onclick=function(){
c.toBlob(function(blob){
if(navigator.share){var f=new File([blob],'manhattan-seviye.png',{type:'image/png'});navigator.share({title:'Manhattan Sadakat Seviyem',files:[f]}).catch(function(){});}
else{var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='manhattan-seviye.png';a.click();}
ov.remove();
},'image/png');};
};

// Doğum günü formu
window.mlBday=function(){
var area=document.getElementById('ml-bday-area');
if(!area)return;
if(area.innerHTML){area.innerHTML='';return;}
// Check if already saved (yearly limit)
var saved=null;try{saved=localStorage.getItem('ml_bday_saved');}catch(e){}
if(saved){
var sd=new Date(saved);
var diff=Date.now()-sd.getTime();
if(diff<365*24*60*60*1000){area.innerHTML='<div class="ml-bday-form"><div class="ml-bday-msg">Doğum gününüz kayıtlı. Yılda 1 kez değiştirilebilir.</div></div>';return;}
}
area.innerHTML='<div class="ml-bday-form"><div style="font-size:11px;font-weight:600;color:var(--mltp);margin-bottom:2px">Doğum gününüzü girin</div><div style="font-size:9px;color:var(--mlts);margin-bottom:4px">Özel gününüzde sürpriz indirim kazanın</div><input type="date" id="ml-bday-input"><button onclick="mlBdaySave()">Kaydet</button><div class="ml-bday-msg" id="ml-bday-msg"></div></div>';
};

window.mlBdaySave=function(){
var inp=document.getElementById('ml-bday-input');
var msg=document.getElementById('ml-bday-msg');
if(!inp||!inp.value){if(msg)msg.textContent='Lütfen tarih seçin';return;}
if(!_mlCache||!_mlCache.loggedIn)return;
var email=_mlCache.email||'';
// POST to Apps Script
fetch(WEB_APP,{method:'POST',headers:{'Content-Type':'text/plain'},body:JSON.stringify({action:'birthday',email:email,birthday:inp.value})}).then(function(){
if(msg)msg.textContent='Kaydedildi!';
try{localStorage.setItem('ml_bday_saved',new Date().toISOString());}catch(e){}
setTimeout(function(){var a=document.getElementById('ml-bday-area');if(a)a.innerHTML='';},1500);
}).catch(function(){if(msg)msg.textContent='Kaydedildi!';try{localStorage.setItem('ml_bday_saved',new Date().toISOString());}catch(e){}});
};

// Micro-sound (Web Audio API, low volume)
function mlSound(type){
try{
var ac=new(window.AudioContext||window.webkitAudioContext)();
var g=ac.createGain();g.gain.value=0.08;g.connect(ac.destination);
var o1=ac.createOscillator();o1.type='sine';o1.connect(g);
if(type==='levelup'){
o1.frequency.setValueAtTime(523,ac.currentTime);
o1.frequency.setValueAtTime(659,ac.currentTime+0.1);
o1.frequency.setValueAtTime(784,ac.currentTime+0.2);
o1.start(ac.currentTime);o1.stop(ac.currentTime+0.35);
}else{
o1.frequency.setValueAtTime(440,ac.currentTime);
o1.frequency.setValueAtTime(554,ac.currentTime+0.08);
o1.start(ac.currentTime);o1.stop(ac.currentTime+0.15);
}
}catch(e){}
}

// Scroll burst + collapse trigger
var _mlScrolled=false;
var _mlScrollStart=null;
window.addEventListener('scroll',function(){
if(_mlScrolled)return;
if(_mlScrollStart===null)_mlScrollStart=window.scrollY;
if(window.scrollY-_mlScrollStart<250)return;
var trig=document.querySelector('.ml-trigger');
if(!trig||trig.classList.contains('collapsed'))return;
_mlScrolled=true;
// Star burst particles
var rect=trig.getBoundingClientRect();
var bst=document.createElement('div');bst.className='ml-burst';
bst.style.left=rect.left+'px';bst.style.top=rect.top+'px';
var cols=['#af8c3e','#d4b05e','#f0e2b8','#fff'];
for(var k=0;k<12;k++){
var p=document.createElement('i');
var angle=(k/12)*Math.PI*2;
var dist=20+Math.random()*15;
p.style.background=cols[k%4];
p.style.left=(rect.width/2)+'px';p.style.top=(rect.height/2)+'px';
p.style.setProperty('--dx',(Math.cos(angle)*dist)+'px');
p.style.setProperty('--dy',(Math.sin(angle)*dist)+'px');
bst.appendChild(p);
}
document.body.appendChild(bst);
// Override burst animation with custom directions
bst.querySelectorAll('i').forEach(function(p){
var dx=parseFloat(p.style.getPropertyValue('--dx'));
var dy=parseFloat(p.style.getPropertyValue('--dy'));
p.animate([{transform:'translate(0,0) scale(1)',opacity:1},{transform:'translate('+dx+'px,'+dy+'px) scale(0)',opacity:0}],{duration:1100,easing:'ease-out'});
});
setTimeout(function(){bst.remove();},1500);
// Collapse
setTimeout(function(){trig.classList.add('collapsed');},1600);
},{passive:true});

document.addEventListener('keydown',function(e){if(e.key==='Escape')window.mlClose();});
})();
