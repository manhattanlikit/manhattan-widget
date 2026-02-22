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
.ml-overlay.open .ml-card{transform:translateY(0)}.ml-card::-webkit-scrollbar{display:none}.ml-card{-webkit-overflow-scrolling:touch;overscroll-behavior:contain}
.ml-x{position:sticky;top:12px;float:right;margin:12px 12px 0 0;width:30px;height:30px;border:none;background:var(--mlbg2);border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:2;transition:background .15s}
.ml-x:hover{background:var(--mlbgh)}.ml-x svg{width:12px;height:12px;stroke:var(--mlts);stroke-width:2.5}
.ml-inner{padding:14px 22px 16px}
.ml-head{display:flex;align-items:center;justify-content:center;gap:6px;padding-top:0;margin-bottom:4px}
.ml-head-sub{font-size:10px;font-weight:600;letter-spacing:1.2px;text-transform:uppercase;color:var(--mltt)}
.ml-head-dot{width:3px;height:3px;border-radius:50%;background:var(--mlbd);flex-shrink:0}
.ml-head-title{font-size:10px;font-weight:600;letter-spacing:1.2px;text-transform:uppercase;color:var(--mltt)}
.ml-tier{text-align:center;margin-bottom:8px;display:flex;flex-direction:column;align-items:center}
.ml-tier-badge{width:48px;height:48px;margin:0 auto 6px;border-radius:50%;display:flex;align-items:center;justify-content:center;position:relative}
.ml-tier-badge svg{width:20px;height:20px;stroke-width:1.2}
.ml-tier-ring{position:absolute;inset:-3px;border-radius:50%;border:1.5px solid transparent;background:conic-gradient(from 0deg,#af8c3e,#d4b05e,#f0e2b8,#d4b05e,#af8c3e) border-box;-webkit-mask:linear-gradient(#fff 0 0) padding-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;animation:mlring 4s linear infinite}
@keyframes mlring{to{transform:rotate(360deg)}}
.ml-tier-name{font-size:20px;font-weight:800;letter-spacing:-.6px;margin-bottom:0;line-height:1.1}
.ml-tier-sub{font-size:11px;color:var(--mltt);font-weight:500}
.t-starter .ml-tier-badge{background:linear-gradient(145deg,#faf3e0,#f0e2b8)}.t-starter .ml-tier-badge svg{stroke:#c9a24e}.t-starter .ml-tier-name{color:#af8c3e}
.t-bronze .ml-tier-badge{background:linear-gradient(145deg,#f2e8da,#e8d5be)}.t-bronze .ml-tier-badge svg{stroke:#a07440}.t-bronze .ml-tier-name{color:#8b6234}
.t-silver .ml-tier-badge{background:linear-gradient(145deg,#f0f0f2,#e4e4e8)}.t-silver .ml-tier-badge svg{stroke:#8e8e93}.t-silver .ml-tier-name{color:#636366}
.t-gold .ml-tier-badge{background:linear-gradient(145deg,#faf3e0,#f0e2b8)}.t-gold .ml-tier-badge svg{stroke:#af8c3e}.t-gold .ml-tier-name{color:#8a6d28}
.t-platinum .ml-tier-badge{background:linear-gradient(145deg,#e8e8ed,#d8d8de)}.t-platinum .ml-tier-badge svg{stroke:#636366}.t-platinum .ml-tier-name{color:#48484a}
.t-diamond .ml-tier-badge{background:linear-gradient(145deg,#e0e8f5,#c8d8f0)}.t-diamond .ml-tier-badge svg{stroke:#4a6fa5}.t-diamond .ml-tier-name{color:#3a5a8a}
.ml-prog{margin-bottom:10px}
.ml-prog-row{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px;gap:6px}
.ml-prog-label{font-size:12px;font-weight:500;color:var(--mlts);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}
.ml-prog-val{font-size:11px;font-weight:500;color:var(--mlts);letter-spacing:-.1px}
.ml-prog-bar{width:100%;height:8px;background:var(--mlbg2);border-radius:4px;overflow:hidden}
.ml-prog-fill{height:100%;border-radius:4px;background:linear-gradient(90deg,#af8c3e,#d4b05e);transition:width .8s cubic-bezier(.25,0,0,1);position:relative;overflow:hidden}
.ml-prog-fill::after{content:'';position:absolute;top:0;left:-50%;width:50%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent);animation:mlshimmer 2s linear infinite}
@keyframes mlshimmer{0%{left:-50%}100%{left:150%}}
.ml-prog-hint{margin-top:6px;text-align:center;font-size:12px;font-weight:500;color:var(--mlts);line-height:1.3;letter-spacing:-.1px}
.ml-prog-hint b{color:var(--mltp);font-weight:700}
.ml-stats{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px}
.ml-stat{background:var(--mlbg2);border-radius:12px;padding:10px;text-align:center;border:1px solid rgba(175,140,62,.08);transition:all .2s}
.ml-stat:hover{border-color:rgba(175,140,62,.2);background:#fdfbf5}
.ml-stat-num{font-size:14px;font-weight:700;letter-spacing:-.3px;color:var(--mlts);line-height:1.2}
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
.ml-tr-name{font-size:13px;font-weight:700;color:var(--mltp);letter-spacing:-.1px}
.ml-tr-desc{font-size:11px;font-weight:500;color:var(--mltt)}
.ml-tr-discount{font-size:14px;font-weight:800;color:var(--mlg);letter-spacing:-.3px;flex-shrink:0;display:flex;align-items:center;gap:3px;justify-content:center}

.ml-tier-row.locked{opacity:.8;cursor:pointer;transition:all .2s}
.ml-tier-row.locked:hover{opacity:1;background:var(--mlbg2)}
.ml-tier-row.locked .ml-tr-name{color:var(--mltp)}.ml-tier-row.locked .ml-tr-discount{color:var(--mlg);opacity:.8}
.ml-tier-row.locked .ml-tr-ico{opacity:.85}.ml-tier-row.locked .ml-tr-desc{color:var(--mlts)}
.ml-tier-row.passed{opacity:.7}.ml-tier-row.passed .ml-tr-name{color:var(--mlts)}
.ml-tier-tip{display:none;background:linear-gradient(135deg,#faf3e0,#f7f0de);border:1px solid rgba(175,140,62,.15);border-radius:10px;padding:10px 12px;margin:4px 0 6px;font-size:12px;color:var(--mltp);line-height:1.5;animation:mlfade .2s ease}
.ml-tier-row.expanded+.ml-tier-tip{display:block}
@keyframes mlfade{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}
.ml-tr-check{width:22px;height:22px;border-radius:50%;background:#af8c3e;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.ml-tr-check svg{width:12px;height:12px;stroke:#fff;stroke-width:2.5}
.ml-greeting{text-align:center;font-size:13px;font-weight:500;color:var(--mlts);margin-bottom:0;letter-spacing:-.1px}
.ml-greeting b{color:var(--mltp);font-weight:600}
.ml-cta{display:flex;align-items:center;justify-content:center;width:100%;padding:13px;background:linear-gradient(135deg,#af8c3e,#d4b05e);color:#fff;font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif;font-size:14px;font-weight:700;letter-spacing:-.1px;border:none;border-radius:10px;cursor:pointer;text-align:center;text-decoration:none;transition:all .2s;box-sizing:border-box;position:relative;overflow:hidden}
.ml-cta::after{content:'';position:absolute;top:0;left:-100%;width:60%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent);animation:mlsweep 3s ease-in-out infinite}
.ml-cta:hover{background:var(--mltp)!important;color:#fff;opacity:1}.ml-cta:hover::after{animation:none!important}.ml-cta:active{transform:scale(.98);background:var(--mltp)}
.ml-cta-gold{background:linear-gradient(135deg,#af8c3e,#d4b05e);color:#fff !important;position:relative;overflow:hidden}
.ml-cta-gold::after{content:'';position:absolute;top:0;left:-100%;width:60%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent);animation:mlsweep 3s ease-in-out infinite}
.ml-max-msg{text-align:center;padding:8px 0 16px;font-size:15px;font-weight:500;color:var(--mlts);line-height:1.6;letter-spacing:-.1px}
.ml-btns{display:flex;gap:10px}
.ml-btns .ml-cta,.ml-btns .ml-cta-secondary{flex:1}
.ml-cta-secondary{display:flex;align-items:center;justify-content:center;padding:13px;background:var(--mlbg2);color:var(--mltp);font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif;font-size:14px;font-weight:700;letter-spacing:-.1px;border:none;border-radius:10px;cursor:pointer;text-align:center;text-decoration:none;transition:all .2s;box-sizing:border-box}
.ml-cta-secondary:hover{background:var(--mlbgh)}
.ml-locked-msg{text-align:center;padding:16px 0 8px;font-size:15px;font-weight:500;color:var(--mlts);line-height:1.6}
.ml-confetti{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:hidden;z-index:3}
.ml-confetti i{position:absolute;width:6px;height:6px;border-radius:50%;top:-10px;animation:mlconf 1.8s ease-out forwards}
.ml-confetti i:nth-child(odd){border-radius:1px;width:5px;height:8px}
@keyframes mlconf{0%{transform:translateY(0) rotate(0) scale(1);opacity:1}100%{transform:translateY(280px) rotate(720deg) scale(0);opacity:0}}
.ml-savings{background:linear-gradient(135deg,#faf3e0,#f7f0de);border-radius:10px;padding:10px 12px;margin-bottom:10px;display:flex;align-items:center;gap:8px;border:1px solid rgba(175,140,62,.12)}
.ml-savings-ico{width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,#af8c3e,#d4b05e);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.ml-savings-ico svg{width:15px;height:15px;stroke:#fff;stroke-width:2;fill:none}
.ml-savings-txt{font-size:12px;color:var(--mlts);line-height:1.3;letter-spacing:-.1px}
.ml-savings-txt b{color:var(--mltp);font-size:14px;font-weight:800}
.ml-savings-orders{margin-left:auto;text-align:center;padding-left:10px;border-left:1px solid rgba(175,140,62,.15);min-width:44px}
.ml-savings-orders-val{font-size:14px;font-weight:800;color:var(--mltp);line-height:1.2}
.ml-savings-orders-lbl{font-size:8px;font-weight:500;color:var(--mlts);text-transform:uppercase;letter-spacing:.5px}
.ml-savings-only{justify-content:center;background:var(--mlbg2);border-color:var(--mlbd)}
.ml-stats-compact{display:flex;justify-content:center;gap:0;margin-bottom:10px;background:var(--mlbg2);border-radius:10px;padding:8px 4px;border:1px solid var(--mlbd)}
.ml-sc-item{flex:1;text-align:center;position:relative}
.ml-sc-item+.ml-sc-item::before{content:'';position:absolute;left:0;top:20%;height:60%;width:1px;background:var(--mlbd)}
.ml-sc-val{font-size:11px;font-weight:600;color:var(--mlts);line-height:1.2;letter-spacing:-.2px}
.ml-sc-lbl{font-size:8px;font-weight:500;color:var(--mltt);text-transform:uppercase;letter-spacing:.5px;margin-top:1px}
.ml-sc-highlight .ml-sc-val{color:var(--mlg);font-weight:700}
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
.ml-flash-txt{font-size:11px;line-height:1.3;flex:1}
.ml-flash-txt b{color:#d4b05e;font-weight:700}
.ml-flash-timer{font-size:13px;font-weight:800;color:#d4b05e;letter-spacing:.5px;flex-shrink:0}
.ml-share-preview{position:fixed;inset:0;z-index:1000001;background:rgba(0,0,0,.7);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;animation:mlfade .2s ease;cursor:pointer}
.ml-share-preview canvas{border-radius:12px;max-width:88vw;max-height:60vh;object-fit:contain;box-shadow:0 12px 40px rgba(0,0,0,.4);cursor:default}
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
.ml-ref{background:var(--mlbg2);border-radius:10px;padding:10px 12px;margin-bottom:10px;text-align:center}
.ml-ref-title{font-size:11px;font-weight:700;color:var(--mltp);margin-bottom:2px;display:flex;align-items:center;justify-content:center;gap:4px}
.ml-ref-title svg{width:14px;height:14px;stroke:var(--mlg);stroke-width:2;fill:none}
.ml-ref-sub{font-size:11px;color:var(--mlts);margin-bottom:6px;line-height:1.4}
.ml-ref-form{display:flex;gap:4px;align-items:center}
.ml-ref-form input{flex:1;border:1px solid var(--mlbd);border-radius:6px;padding:6px 8px;font-size:11px;font-family:inherit;outline:none;transition:border-color .2s}
.ml-ref-form input:focus{border-color:var(--mlg)}
.ml-ref-form button{background:linear-gradient(135deg,#af8c3e,#d4b05e);color:#fff;border:none;border-radius:6px;padding:6px 12px;font-size:10px;font-weight:700;font-family:inherit;cursor:pointer;white-space:nowrap;transition:opacity .2s}
.ml-ref-form button:disabled{opacity:.5;cursor:not-allowed}
.ml-ref-msg{font-size:10px;margin-top:4px;line-height:1.3}
.ml-ref-msg.ok{color:#38a169}.ml-ref-msg.err{color:#e53e3e}
.ml-acc-hdr{display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--mlbg2);border-radius:8px;cursor:pointer;margin-bottom:4px;-webkit-tap-highlight-color:transparent;user-select:none}
.ml-acc-hdr:active{background:var(--mlbgh)}
.ml-acc-title{font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--mltt);display:flex;align-items:center;gap:5px}
.ml-acc-chev{width:12px;height:12px;stroke:var(--mltt);stroke-width:2.5;fill:none;transition:transform .2s;flex-shrink:0}
.ml-acc-hdr.open .ml-acc-chev{transform:rotate(180deg)}
.ml-acc-body{max-height:0;overflow:hidden;transition:max-height .3s ease}
.ml-acc-hdr.open+.ml-acc-body{max-height:800px}
.ml-ref-teaser{font-size:10px;color:var(--mlts);text-align:center;margin-bottom:8px;padding:6px 10px;background:var(--mlbg2);border-radius:8px;line-height:1.4}
.ml-ref-teaser b{color:var(--mlg);font-weight:700}
.ml-tier-share{position:absolute;bottom:-2px;right:-2px;width:16px;height:16px;border-radius:50%;background:var(--mltp);display:flex;align-items:center;justify-content:center;opacity:0;transform:scale(.7);transition:all .2s;cursor:pointer}
.ml-tier-badge:hover .ml-tier-share{opacity:1;transform:scale(1)}
.ml-tier-share svg{width:8px;height:8px;stroke:#fff;stroke-width:2;fill:none}
.ml-trigger.collapsed{width:48px;height:48px;padding:0;border-radius:50%;justify-content:center;gap:0}
.ml-trigger.collapsed .ml-trigger-txt{max-width:0;opacity:0;overflow:hidden}
.ml-trigger .ml-trigger-txt{max-width:200px;opacity:1;white-space:nowrap;overflow:hidden;transition:max-width .9s ease,opacity .7s ease}
.ml-trigger.collapsed svg{margin:0}

.ml-hero-row{display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:2px}
.ml-hero-side{font-size:10px;font-weight:600;letter-spacing:.8px;text-transform:uppercase;color:#af8c3e;text-align:center;line-height:1.3;min-width:56px}
.ml-flash-row{display:flex;gap:0;margin-bottom:6px;align-items:stretch;border-radius:8px;overflow:hidden}
.ml-flash-row .ml-flash{flex:1;margin-bottom:0;border-radius:0}
.ml-flash-btn{flex:0 0 auto;width:120px;background:linear-gradient(135deg,#af8c3e,#d4b05e);color:#fff;border:none;font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif;font-size:12px;font-weight:700;cursor:pointer;padding:8px 6px;transition:opacity .2s;white-space:nowrap}
.ml-flash-btn:active{opacity:.8}
@media(min-width:1025px){.ml-card{width:440px}.ml-head-title{font-size:10px}.ml-tier-name{font-size:22px}.ml-tr-name{font-size:13px}.ml-tr-desc{font-size:11px}.ml-tr-discount{font-size:14px}.ml-stat-num{font-size:15px}.ml-stat-lbl{font-size:10px}.ml-prog-label{font-size:10px}.ml-prog-val{font-size:11px}.ml-inner{padding:14px 24px 18px}}
@media(max-width:1024px){.ml-card{border-radius:16px;max-width:94vw}.ml-inner{padding:12px 18px 16px}.ml-tier-badge{width:44px;height:44px}.ml-tier-badge svg{width:18px;height:18px}.ml-tier-name{font-size:18px}.ml-head-title{font-size:10px}.ml-stat-num{font-size:15px}.ml-stats{gap:6px}.ml-stat{padding:10px 8px}.ml-btns{flex-direction:column;gap:6px}.ml-trigger{bottom:16px;right:16px;width:44px;height:44px;padding:0;border-radius:50%;justify-content:center}.ml-trigger .ml-trigger-txt{display:none}.ml-trigger svg{width:18px;height:18px;margin:0}.ml-tier-row{padding:5px 8px}.ml-tr-ico{width:24px;height:24px}.ml-tr-ico svg{width:11px;height:11px}.ml-tr-name{font-size:12px}.ml-tr-desc{font-size:10px}.ml-tr-discount{font-size:13px}}`;
document.head.appendChild(s);

// HTML enjekte
var w=document.createElement('div');
w.innerHTML='<button class="ml-trigger" onclick="mlOpen()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><span class="ml-trigger-txt">İndirim Seviyem</span></button><div class="ml-overlay" id="ov" onclick="mlClose(event)"><div class="ml-card"><button class="ml-x" onclick="mlClose()"><svg viewBox="0 0 24 24" fill="none" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button><div class="ml-inner"><div id="ml-htitle" style="display:none"></div><div id="ct"></div></div></div></div>';
document.body.appendChild(w);

var T=[
{n:'Starter',mn:0,d:0,r:0,s:false},
{n:'Bronze',mn:2000,d:2.5,r:7,s:false},
{n:'Silver',mn:5000,d:5,r:6,s:false},
{n:'Gold',mn:10000,d:7.5,r:5,s:false},
{n:'Platinum',mn:20000,d:10,r:4,s:false},
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
var TC={Starter:'#c7c7cc',Bronze:'#8b6234',Silver:'#636366',Gold:'#8a6d28',Platinum:'#636366',Diamond:'#4a6fa5'};
var DEMO={tier:'Gold',spend:14250,orders:18,returnRate:4.2,name:'Kullanıcı',fullName:'Kullanıcı',loggedIn:true};
var REF_RATES={Silver:5,Gold:7.5,Platinum:10,Diamond:15};
// Minimal crown logo for canvas
function drawCrown(ctx,x,y,sz,color){
ctx.save();ctx.translate(x-sz/2,y-sz/2);var s=sz/24;
ctx.fillStyle=color;ctx.beginPath();
ctx.moveTo(2*s,18*s);ctx.lineTo(5*s,8*s);ctx.lineTo(9*s,12*s);ctx.lineTo(12*s,5*s);ctx.lineTo(15*s,12*s);ctx.lineTo(19*s,8*s);ctx.lineTo(22*s,18*s);ctx.closePath();ctx.fill();
ctx.fillRect(2*s,19*s,20*s,2*s);
ctx.restore();
}

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
var key='ml_tier_'+((_mlCache&&_mlCache.email)?_mlCache.email:'guest');
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
document.getElementById('ct').innerHTML='<div class="ml-locked-msg">İndirim seviyenizi görmek için<br><a href="https://manhattandan.com/account" target="_self" onclick="event.stopPropagation()" style="color:var(--mlg);font-weight:700;text-decoration:underline">giriş yapın</a>.</div><div class="ml-tiers-table"><div class="ml-label">Tüm Seviyeler <span style="display:inline-block;font-weight:500;font-size:8px;color:var(--mlg);border:1px solid rgba(175,140,62,.25);border-radius:4px;padding:1px 5px;margin-left:6px;vertical-align:1px;letter-spacing:.3px">Son 12 ay</span></div>'+tt+'</div><div class="ml-btns"><a href="https://manhattandan.com/account" target="_self" onclick="event.stopPropagation()" class="ml-cta ml-cta-gold">Giriş Yap</a><button type="button" onclick="event.stopPropagation();mlClose()" class="ml-cta-secondary">Mağazaya Git</button></div>';
return;
}
// LOGGED IN
var i=T.findIndex(function(t){return t.n===d.tier});
var t=T[i],nx=i<T.length-1?T[i+1]:null;
var c='t-'+d.tier.toLowerCase();
var greeting=d.loggedIn&&d.name?'<div class="ml-greeting">Hoşgeldin, '+d.name+'!</div>':'';
var prog='';
if(nx){
var p=Math.min((d.spend/nx.mn)*100,100);
var r=nx.mn-d.spend;
prog='<div class="ml-prog"><div class="ml-prog-row"><span class="ml-prog-label">Sonraki: <b>'+nx.n+'</b> · %'+nx.d+' indirim · '+f$(r)+' ₺ kaldı'+(nx.r?' · iade <%'+nx.r:'')+'</span><span class="ml-prog-val">'+Math.round(p)+'%</span></div><div class="ml-prog-bar"><div class="ml-prog-fill" id="pf" data-p="'+p+'" style="width:0%"></div></div></div>';
}else{
prog='<div class="ml-max-msg">En yüksek seviyedesiniz.<br>Tüm ayrıcalıklarınız aktif.</div>';
}
var tt='';
T.forEach(function(ti,j){
var ip=j<i,ic=j===i,cls=ic?'current':ip?'passed':'locked';
var desc=ti.mn===0?'Başlangıç':f$(ti.mn)+' ₺ alışveriş'+(ti.r?' · <%'+ti.r+' iade':'');
var badge=ic?'<span class="ml-tr-badge">SİZ</span>':'';
var refSmallIco=REF_RATES[ti.n]?'<svg viewBox="0 0 24 24" fill="none" stroke="var(--mlg)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:15px;height:15px;flex-shrink:0"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4-4v2"/><circle cx="9" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>':'';
var cod=ip?'<div class="ml-tr-check">'+IC.chk+'</div>':'<div class="ml-tr-discount">'+refSmallIco+'%'+ti.d+'</div>';
var clickAttr=ic?' onclick="mlSharePreview()" style="cursor:pointer"':(!ip&&!ic)?' onclick="mlTip(this)"':'';
var tip='';
if(ic){
var curRefExtra=REF_RATES[ti.n]?' Arkadaşlarınızı davet ederek <b>%'+REF_RATES[ti.n]+' ek indirim</b> hediye edebilirsiniz. Seviye indiriminize ek olarak geçerlidir.':'';
tip='<div class="ml-tier-tip"><svg viewBox="0 0 24 24" fill="none" stroke="var(--mlg)" stroke-width="2" stroke-linecap="round" style="width:14px;height:14px;vertical-align:-2px;margin-right:3px;flex-shrink:0"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><circle cx="9" cy="9" r=".5" fill="var(--mlg)"/><circle cx="15" cy="9" r=".5" fill="var(--mlg)"/></svg><b>'+ti.n+'</b> seviyesinde <b>%'+ti.d+' indirim</b> kazanıyorsunuz.'+(ti.r?' İade limitiniz <b>%'+ti.r+'</b>.':'')+curRefExtra+'</div>';
}
else if(!ip&&!ic){
var need=ti.mn-d.spend;
var refTipExtra=REF_RATES[ti.n]?' Ayrıca arkadaşlarınızı davet edip <b>mevcut indiriminize ek %'+REF_RATES[ti.n]+' indirim</b> hediye edebilirsiniz.':'';
tip='<div class="ml-tier-tip"><svg viewBox="0 0 24 24" fill="none" stroke="var(--mlg)" stroke-width="2" stroke-linecap="round" style="width:14px;height:14px;vertical-align:-2px;margin-right:3px;flex-shrink:0"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg><b>'+ti.n+'</b> seviyesine ulaşmak için <b>'+f$(Math.max(need,0))+' ₺</b> daha alışveriş yapın'+(ti.r?' ve iade oranınızı <b>%'+ti.r+'</b> altında tutun':'')+'. Bu seviyede <b>%'+ti.d+'</b> indirim kazanırsınız!'+refTipExtra+'</div>';
}
tt+='<div class="ml-tier-row '+cls+'"'+clickAttr+'><div class="ml-tr-ico t-'+ti.n.toLowerCase()+'" style="background:'+TB[ti.n]+'">'+IC[ti.n]+'</div><div class="ml-tr-info"><div class="ml-tr-name">'+ti.n+' '+badge+'</div><div class="ml-tr-desc">'+desc+'</div></div>'+cod+'</div>'+tip;
});
// Tasarruf hesapla
var _savSpend=(d.allTimeSpend||d.spend||0);var _savRate=Math.max(t.d,2.5);var rawSav=_savSpend*(_savRate/100)*1.4;var savings;if(rawSav<1000){savings=Math.ceil(rawSav/10)*10;}else{savings=Math.ceil(rawSav/50)*50;}
var savingsHtml='<div class="ml-savings"><div class="ml-savings-ico"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1v22"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg></div><div class="ml-savings-txt">'+(savings>0?'Bugüne kadar toplam<br><b>'+f$(savings)+' ₺ ve üzeri</b> tasarruf ettiniz':'Sipariş verin,<br><b>tasarruf etmeye başlayın</b>')+'</div><div class="ml-savings-orders"><div class="ml-savings-orders-val">'+d.orders+'</div><div class="ml-savings-orders-lbl">Sipariş</div></div></div>';
// İade compact (only if exists)
var compactStats='';
if(typeof d.returnRate==='number'){compactStats='<div class="ml-stats-compact"><div class="ml-sc-item"><div class="ml-sc-val" style="color:'+(d.returnRate>(t.r||100)?'#e53e3e':'var(--mlts)')+'">%'+d.returnRate.toFixed(1)+'</div><div class="ml-sc-lbl">İade Oranı</div></div></div>';}
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
if(avgPerMonth>0){var monthsLeft=Math.ceil((nx.mn-d.spend)/avgPerMonth*0.7);var targetDate=new Date();targetDate.setMonth(targetDate.getMonth()+monthsLeft);var monthNames=['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];projHtml='<div style="text-align:center;font-size:10px;color:var(--mlts);margin:4px 0 8px">Tahmini <b style=\"color:var(--mlg)\">'+nx.n+' seviyesine</b> geçiş: <b>'+monthNames[targetDate.getMonth()]+' '+targetDate.getFullYear()+'</b></div>';}
}
// Sürpriz indirimler linki
var surpriseHtml='<div class="ml-acc-hdr" id="ml-acc-bday" onclick="event.stopPropagation();var _r=document.getElementById(\'ml-acc-ref\');if(_r)_r.classList.remove(\'open\');mlAccToggle(\'ml-acc-bday\');var ba=document.getElementById(\'ml-bday-area\');if(ba&&!ba.innerHTML)mlBday();"><div class="ml-acc-title"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" style="width:12px;height:12px;stroke:var(--mlg);stroke-width:2;fill:none"><path d="M20 12v10H4V12"/><path d="M2 7h20v5H2z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/></svg>Doğum Günü Hediyesi <span style="display:inline-block;font-weight:500;font-size:8px;color:var(--mlg);border:1px solid rgba(175,140,62,.25);border-radius:4px;padding:1px 5px;margin-left:6px;vertical-align:1px;letter-spacing:.3px">Sürpriz İndirimler</span></div><svg class="ml-acc-chev" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></div><div class="ml-acc-body"><div id="ml-bday-area" style="padding:4px 0"></div></div>';
var refHtml='';
if(REF_RATES[d.tier]){
var refTiers=['Silver','Gold','Platinum','Diamond'];
var refProgHtml='<div style="display:flex;justify-content:center;gap:6px;margin-top:8px">';
refTiers.forEach(function(rn){
var rate=REF_RATES[rn];if(!rate)return;
var isActive=rn===d.tier;
refProgHtml+='<div style="text-align:center;padding:4px 8px;border-radius:6px;font-size:9px;line-height:1.3;'+(isActive?'background:rgba(175,140,62,.12);color:var(--mlg);font-weight:700':'color:var(--mlts);opacity:.6')+'"><div style="font-weight:'+(isActive?'700':'500')+'">'+rn+'</div><div style="font-size:10px">%'+rate+'</div></div>';
});
refProgHtml+='</div>';
refHtml='<div class="ml-ref"><div class="ml-ref-title"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>Arkadaşını Davet Et</div><div class="ml-ref-sub">Arkadaşınıza <b>%'+REF_RATES[d.tier]+'</b> hoş geldin indirimi hediye edin.<br>Alışveriş yaptığında <b>size de %'+REF_RATES[d.tier]+' ek indirim kuponu</b> gelsin!<br><span style="font-size:9px;color:var(--mltt)">Mevcut seviye indiriminize ek olarak geçerlidir.</span></div>'+refProgHtml+'<div id="ml-ref-area" style="margin-top:10px"><div class="ml-ref-form"><input type="email" id="ml-ref-email" placeholder="Arkadaşınızın e-postası"><button onclick="mlRefSend()">Gönder</button></div></div></div>';
} else {
refHtml='<div class="ml-ref" style="opacity:.85"><div class="ml-ref-title"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>Arkadaşını Davet Et</div><div class="ml-ref-sub"><b>Silver</b> seviyesine ulaştığınızda arkadaşlarınızı davet edip <b>ek indirim</b> kazanabilirsiniz!</div><div style="display:flex;justify-content:center;gap:8px;margin-top:6px"><div style="text-align:center;padding:3px 6px;border-radius:4px;font-size:9px;background:rgba(175,140,62,.08);color:var(--mlg)"><div style="font-weight:600">Silver</div><div>%5</div></div><div style="text-align:center;padding:3px 6px;border-radius:4px;font-size:9px;color:var(--mlts)"><div style="font-weight:600">Gold</div><div>%7.5</div></div><div style="text-align:center;padding:3px 6px;border-radius:4px;font-size:9px;color:var(--mlts)"><div style="font-weight:600">Platinum</div><div>%10</div></div><div style="text-align:center;padding:3px 6px;border-radius:4px;font-size:9px;color:var(--mlts)"><div style="font-weight:600">Diamond</div><div>%15</div></div></div></div>';
}
if(refHtml){refHtml='<div class="ml-acc-hdr" id="ml-acc-ref" onclick="event.stopPropagation();var _b=document.getElementById(\'ml-acc-bday\');if(_b)_b.classList.remove(\'open\');mlAccToggle(\'ml-acc-ref\')"><div class="ml-acc-title"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" style="width:12px;height:12px;stroke:var(--mlg);stroke-width:2;fill:none"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>Arkadaşını Davet Et <span style="display:inline-block;font-weight:500;font-size:8px;color:var(--mlg);border:1px solid rgba(175,140,62,.25);border-radius:4px;padding:1px 5px;margin-left:6px;vertical-align:1px;letter-spacing:.3px">İndirim Kazan</span></div><svg class="ml-acc-chev" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></div><div class="ml-acc-body">'+refHtml+'</div>';}
// Flash bonus (Cumartesi 16:00 - Pazar 18:00)
var flashHtml='';
var now=new Date();var dow=now.getDay(),hr=now.getHours();
var isFlash=(dow===6&&hr>=16)||(dow===0&&hr<18);
window._mlFlashEnd=null;
if(isFlash){
var end=new Date(now);if(dow===6){end.setDate(end.getDate()+1);}end.setHours(18,0,0,0);
window._mlFlashEnd=end.getTime();
var rem=Math.max(0,Math.floor((end-now)/1000));
var fh=Math.floor(rem/3600),fm=Math.floor((rem%3600)/60),fs=rem%60;
flashHtml='<div class="ml-flash-row" onclick="event.stopPropagation()"><div class="ml-flash"><div class="ml-flash-ico"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div><div class="ml-flash-txt"><b>Flash Bonus +%2.5</b><br>Hafta sonu özel ek indirim</div><div class="ml-flash-timer" id="ml-ft">'+String(fh).padStart(2,'0')+':'+String(fm).padStart(2,'0')+':'+String(fs).padStart(2,'0')+'</div></div><button onclick="event.stopPropagation();mlFlashCoupon()" class="ml-flash-btn">Kodumu Oluştur</button></div><div id="ml-flash-code" onclick="event.stopPropagation()" style="margin-bottom:6px"></div>';
try{var _fc=sessionStorage.getItem('ml_flash_code');if(_fc){var _fcd=JSON.parse(_fc);if(_fcd.end>Date.now()){window._mlCachedFlashCode=_fcd.code;}else{sessionStorage.removeItem('ml_flash_code');}}}catch(e){}
}
var btns='<button type="button" onclick="event.stopPropagation();mlClose()" class="ml-cta">Alışverişe Devam Et</button>';
document.getElementById('ct').innerHTML=luHtml+'<div class="ml-tier '+c+'"><div class="ml-hero-row"><div class="ml-hero-side">Sadakat<br>Programı</div><div class="ml-tier-badge" onclick="mlSharePreview()" title="Paylaş"><div class="ml-tier-ring"></div>'+IC[d.tier]+'<div class="ml-tier-share"><svg viewBox="0 0 24 24" stroke-linecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg></div></div><div class="ml-hero-side">Manhattan</div></div><div class="ml-tier-name">'+d.tier+'</div>'+greeting+'</div>'+flashHtml+prog+projHtml+warnHtml+savingsHtml+compactStats+'<div class="ml-acc-hdr open" id="ml-acc-tiers" onclick="event.stopPropagation();mlAccToggle(\'ml-acc-tiers\')"><div class="ml-acc-title">Tüm Seviyeler <span style="display:inline-block;font-weight:500;font-size:8px;color:var(--mlg);border:1px solid rgba(175,140,62,.25);border-radius:4px;padding:1px 5px;margin-left:4px;vertical-align:1px;letter-spacing:.3px">Son 12 ay</span></div><svg class="ml-acc-chev" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></div><div class="ml-acc-body"><div class="ml-tiers-table">'+tt+'</div></div>'+refHtml+surpriseHtml+btns;
// Show cached flash code
if(window._mlCachedFlashCode){setTimeout(function(){window._mlShowFlashCode(window._mlCachedFlashCode);},50);}
// Confetti
setTimeout(function(){
var ht=document.getElementById('ml-htitle');if(ht)ht.style.color=TC[d.tier]||'var(--mltp)';
var card=document.querySelector('.ml-card');
if(card){
if(luStatus==='levelup'){mlConfetti(card,true);}
else if(i>0){mlConfetti(card,false);}
}
var pf=document.getElementById('pf');
if(pf)pf.style.width=Math.max(parseFloat(pf.dataset.p),3)+'%';
document.querySelectorAll('[data-count]').forEach(function(el){
var target=parseInt(el.dataset.count),isMoney=target>100,inc=target/40,cur=0;
var tm=setInterval(function(){cur+=inc;if(cur>=target){cur=target;clearInterval(tm);}el.textContent=isMoney?f$(Math.round(cur))+' ₺':Math.round(cur);},30);
});
},120);
// Flash timer
var fte=document.getElementById('ml-ft');
if(fte){setInterval(function(){var t=fte.textContent.split(':');var s=parseInt(t[0])*3600+parseInt(t[1])*60+parseInt(t[2])-1;if(s<=0)return;var h=Math.floor(s/3600),m=Math.floor((s%3600)/60),sc=s%60;fte.textContent=String(h).padStart(2,'0')+':'+String(m).padStart(2,'0')+':'+String(sc).padStart(2,'0');var fce=document.getElementById('ml-fc-exp');if(fce)fce.textContent='Kod geçerliliği: '+String(h).padStart(2,'0')+':'+String(m).padStart(2,'0')+':'+String(sc).padStart(2,'0');},1000);}
}

// Flash kupon oluştur
window._mlShowFlashCode=function(code){
var area=document.getElementById('ml-flash-code');if(!area)return;
var fte=document.getElementById('ml-ft');var timeStr=fte?fte.textContent:'--:--:--';
area.innerHTML='<div id="ml-fc-title" style="text-align:center;font-size:11px;font-weight:600;color:var(--mlg);letter-spacing:.5px;text-transform:uppercase;padding:6px 0">Ek %2.5 İndirim Kodunuz</div><div style="background:var(--mlbg2);border:2px dashed var(--mlg);border-radius:10px;padding:12px 14px;text-align:center;cursor:pointer" onclick="event.stopPropagation();mlCopyFlash()"><div style="display:flex;align-items:center;justify-content:center;gap:8px"><svg viewBox="0 0 24 24" fill="none" stroke="var(--mlg)" stroke-width="2" stroke-linecap="round" style="width:18px;height:18px;flex-shrink:0;opacity:.6"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg><div style="font-size:20px;font-weight:800;color:var(--mlg);letter-spacing:2px;font-family:monospace">'+code+'</div></div></div>';
window._mlFlashCode=code;
try{if(window._mlFlashEnd)sessionStorage.setItem('ml_flash_code',JSON.stringify({code:code,end:window._mlFlashEnd}));}catch(e){}
};
window.mlCopyFlash=function(){
var code=window._mlFlashCode;if(!code)return;
navigator.clipboard.writeText(code);
var t=document.getElementById('ml-fc-title');if(!t)return;
var fte=document.getElementById('ml-ft');
var ts=fte?fte.textContent:'--:--:--';
t.innerHTML='<span style="color:#38a169">✓ Kopyalandı!</span> · <span id="ml-fc-exp" style="color:var(--mlg)">'+ts+'</span>';
};
window.mlFlashCoupon=function(){
if(!_mlCache||!_mlCache.loggedIn||!_mlCache.email)return;
if(window._mlCachedFlashCode){window._mlShowFlashCode(window._mlCachedFlashCode);return;}
var area=document.getElementById('ml-flash-code');
if(!area)return;
area.innerHTML='<div style="font-size:10px;color:var(--mltt);padding:6px 0">Oluşturuluyor...</div>';
fetch(WEB_APP+'?action=flash&email='+encodeURIComponent(_mlCache.email)).then(function(r){return r.json()}).then(function(d){
if(d.success&&d.code){
window._mlShowFlashCode(d.code);window._mlCachedFlashCode=d.code;
}else{
area.innerHTML='<div style="font-size:10px;color:#c0392b;padding:6px 0">'+(d.error||'Bir hata oluştu.')+'</div>';
}
}).catch(function(){area.innerHTML='<div style="font-size:10px;color:#c0392b;padding:6px 0">Bağlantı hatası.</div>';});
};

var _mlCache=null;window._mlCache=_mlCache;

// Sayfa yüklendiğinde arka planda veriyi çek
if(typeof Ecwid!=='undefined'&&Ecwid.OnAPILoaded){
Ecwid.OnAPILoaded.add(function(){
try{Ecwid.Customer.get(function(c){
if(c){
var bp=c.billingPerson||{};var name=c.name?(c.name.split(' ')[0]):(bp.firstName||bp.name&&bp.name.split(' ')[0]||'');var fullName=c.name||bp.name||((bp.firstName||'')+' '+(bp.lastName||'')).trim()||'';var email=c.email||'';
if(WEB_APP&&email){
fetch(WEB_APP+'?email='+encodeURIComponent(email)).then(function(r){return r.json()}).then(function(d){
var tier=tierFromSpend(d.spend||0);
_mlCache=window._mlCache={tier:tier,spend:d.spend||0,orders:d.orders||0,returnRate:d.returnRate,name:name,fullName:fullName,email:email,loggedIn:true};
}).catch(function(){
var tier=GM[c.customerGroupId]||'Starter';
var td=T.find(function(t){return t.n===tier});
_mlCache=window._mlCache={tier:tier,spend:td?td.mn:0,orders:0,name:name,fullName:fullName,email:email,loggedIn:true};
});
}else{var tier=GM[c.customerGroupId]||'Starter';var td=T.find(function(t){return t.n===tier});_mlCache=window._mlCache={tier:tier,spend:td?td.mn:0,orders:0,name:name,fullName:fullName,email:email,loggedIn:true};}
}else{_mlCache={tier:'Starter',spend:0,orders:0,name:'',fullName:'',loggedIn:false};}
});}catch(e){}
});
}

window.mlOpen=function(){
document.getElementById('ov').classList.add('open');
if(_mlCache){go(_mlCache);return;}
document.getElementById('ct').innerHTML='<div style="text-align:center;padding:30px 0"><svg viewBox="0 0 24 24" fill="none" style="width:32px;height:32px;margin:0 auto 8px;display:block;animation:mlpulse 1.5s ease-in-out infinite"><path d="M2 18L5 8l4 4 3-7 3 7 4-4 3 10z" fill="rgba(175,140,62,.15)" stroke="#af8c3e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><rect x="2" y="19" width="20" height="2" rx="1" fill="#af8c3e" opacity=".3"/></svg><div style="font-size:10px;color:var(--mltt);font-weight:500">Yükleniyor...</div></div>';
if(!document.getElementById('mlspincss')){var sc=document.createElement('style');sc.id='mlspincss';sc.textContent='@keyframes mlspin{to{transform:rotate(360deg)}}@keyframes mlpulse{0%,100%{opacity:.4;transform:scale(.95)}50%{opacity:1;transform:scale(1)}}';document.head.appendChild(sc);}
if(typeof Ecwid!=='undefined'&&Ecwid.Customer){
try{Ecwid.Customer.get(function(c){
if(c){
var bp=c.billingPerson||{};var name=c.name?(c.name.split(' ')[0]):(bp.firstName||bp.name&&bp.name.split(' ')[0]||'');var fullName=c.name||bp.name||((bp.firstName||'')+' '+(bp.lastName||'')).trim()||'';var email=c.email||'';
if(WEB_APP&&email){
fetch(WEB_APP+'?email='+encodeURIComponent(email)).then(function(r){return r.json()}).then(function(d){
var tier=tierFromSpend(d.spend||0);
_mlCache=window._mlCache={tier:tier,spend:d.spend||0,orders:d.orders||0,returnRate:d.returnRate,name:name,fullName:fullName,email:email,loggedIn:true};
go(_mlCache);
}).catch(function(){
var tier=GM[c.customerGroupId]||'Starter';
var td=T.find(function(t){return t.n===tier});
_mlCache=window._mlCache={tier:tier,spend:td?td.mn:0,orders:0,name:name,fullName:fullName,email:email,loggedIn:true};
go(_mlCache);
});
}else{var tier=GM[c.customerGroupId]||'Starter';var td=T.find(function(t){return t.n===tier});_mlCache=window._mlCache={tier:tier,spend:td?td.mn:0,orders:0,name:name,fullName:fullName,email:email,loggedIn:true};go(_mlCache);}
}else{_mlCache={tier:'Starter',spend:0,orders:0,name:'',fullName:'',loggedIn:false};go(_mlCache);}
});}catch(e){go({tier:'Starter',spend:0,orders:0,name:'',fullName:'',loggedIn:false});}
}else{go({tier:'Starter',spend:0,orders:0,name:'',fullName:'',loggedIn:false});}
};

window.mlClose=function(e){
if(e&&e.target&&e.target!==document.getElementById('ov')&&!e.target.closest('.ml-x')&&!e.target.closest('.ml-cta')&&!e.target.closest('.ml-cta-secondary'))return;
document.getElementById('ov').classList.remove('open');
var trig=document.querySelector('.ml-trigger');
if(trig&&!trig.classList.contains('collapsed'))trig.classList.add('collapsed');
};
document.addEventListener('keydown',function(e){
if(e.key==='Escape'){
var sp=document.querySelector('.ml-share-preview');
if(sp){sp.remove();e.stopImmediatePropagation();return;}
var ov=document.getElementById('ov');
if(ov&&ov.classList.contains('open')){mlClose();e.stopImmediatePropagation();}
}
},true);

window.mlAccToggle=function(id){var h=document.getElementById(id);if(!h)return;var excl=['ml-acc-ref','ml-acc-bday'];if(excl.indexOf(id)>=0){excl.forEach(function(eid){if(eid!==id){var el=document.getElementById(eid);if(el)el.classList.remove('open');}});}h.classList.toggle('open');};
window.mlTip=function(el){
var wasExpanded=el.classList.contains('expanded');
document.querySelectorAll('.ml-tier-row.expanded').forEach(function(r){r.classList.remove('expanded');});
if(!wasExpanded)el.classList.add('expanded');
};

// Paylaş — premium share card
// === SHARED CARD HELPERS ===
window._mlCardBg=function(ctx,W,H){
// Background — deep premium gradient
var bg=ctx.createLinearGradient(0,0,W,H);bg.addColorStop(0,'#0c0c0e');bg.addColorStop(0.4,'#141418');bg.addColorStop(1,'#0a0a0c');
ctx.fillStyle=bg;ctx.beginPath();ctx.roundRect(0,0,W,H,20);ctx.fill();
// Inner subtle gradient overlay for depth
var ig=ctx.createRadialGradient(W*0.3,H*0.3,0,W*0.5,H*0.5,W*0.7);
ig.addColorStop(0,'rgba(175,140,62,.03)');ig.addColorStop(1,'transparent');
ctx.fillStyle=ig;ctx.beginPath();ctx.roundRect(0,0,W,H,20);ctx.fill();
// Gold gradient stroke — single smooth roundRect
ctx.save();
var gs=ctx.createLinearGradient(0,0,W,H);
gs.addColorStop(0,'rgba(175,140,62,.15)');gs.addColorStop(0.2,'rgba(212,176,94,.6)');gs.addColorStop(0.4,'rgba(240,226,184,.8)');gs.addColorStop(0.5,'rgba(212,176,94,.6)');gs.addColorStop(0.6,'rgba(240,226,184,.8)');gs.addColorStop(0.8,'rgba(212,176,94,.6)');gs.addColorStop(1,'rgba(175,140,62,.15)');
ctx.strokeStyle=gs;ctx.lineWidth=1.5;
ctx.beginPath();ctx.roundRect(0.75,0.75,W-1.5,H-1.5,20);ctx.stroke();
ctx.restore();
// Inner edge highlight — subtle inset glow
ctx.save();
var ih=ctx.createLinearGradient(0,0,W,0);
ih.addColorStop(0,'transparent');ih.addColorStop(0.3,'rgba(240,226,184,.06)');ih.addColorStop(0.5,'rgba(240,226,184,.1)');ih.addColorStop(0.7,'rgba(240,226,184,.06)');ih.addColorStop(1,'transparent');
ctx.fillStyle=ih;ctx.fillRect(20,2,W-40,0.5);
ctx.restore();
// Gold accent line helper
var gl=ctx.createLinearGradient(80,0,W-80,0);gl.addColorStop(0,'transparent');gl.addColorStop(0.2,'rgba(175,140,62,.3)');gl.addColorStop(0.5,'rgba(240,226,184,.5)');gl.addColorStop(0.8,'rgba(175,140,62,.3)');gl.addColorStop(1,'transparent');
return gl;
}
window._mlCardOverlay=function(c,btns,onShare){
var ov=document.createElement('div');ov.className='ml-share-preview';
ov.onclick=function(e){if(e.target===ov)ov.remove();};
ov.innerHTML='<div class="ml-share-preview-btns">'+btns+'</div>';
ov.insertBefore(c,ov.firstChild);document.body.appendChild(ov);
return ov;
}

// === BADGE TIKLAMA — ANA AKIŞ ===
window.mlSharePreview=function(){
if(!_mlCache||!_mlCache.loggedIn)return;
var ep=document.querySelector('.ml-share-preview');if(ep)ep.remove();
var d=_mlCache;
var refRate=REF_RATES[d.tier];
// Silver+ → referral prompt önce
if(refRate){
_mlRefPrompt(d,refRate);
} else {
// Starter/Bronze → direkt tier kartı
_mlTierCard(d);
}
};

// === REFERRAL PROMPT OVERLAY ===
window._mlRefPrompt=function(d,refRate){
var ov=document.createElement('div');ov.className='ml-share-preview';
ov.onclick=function(e){if(e.target===ov)ov.remove();};
var html='<div style="background:#16161a;border-radius:16px;padding:24px 20px;max-width:340px;width:90vw;text-align:center;cursor:default;border:1px solid rgba(175,140,62,.2);box-shadow:0 20px 60px rgba(0,0,0,.5)">';
html+='<svg viewBox="0 0 24 24" fill="none" stroke="#af8c3e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:28px;height:28px;margin-bottom:8px"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4-4v2"/><circle cx="9" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>';
html+='<div style="font-size:15px;font-weight:700;color:#fff;margin-bottom:4px">Arkadaşına hediye gönder</div>';
html+='<div style="font-size:11px;color:#9e9ea3;margin-bottom:14px;line-height:1.5">Arkadaşına tüm indirimlerine ek<br><b style="color:#d4b05e;font-size:13px">%'+refRate+' özel indirim</b> hediye et,<br>alışveriş yapınca <b style="color:#d4b05e">sana da %'+refRate+'</b> gelsin!</div>';
html+='<div id="ml-rp-area"><input type="email" id="ml-rp-email" placeholder="Arkadaşının e-postası" style="width:100%;padding:10px 12px;border:1px solid rgba(175,140,62,.2);border-radius:8px;background:#1e1e24;color:#fff;font-size:13px;font-family:inherit;text-align:center;box-sizing:border-box;outline:none"><button id="ml-rp-send" onclick="mlRefSendPrompt()" style="width:100%;margin-top:8px;padding:10px;background:linear-gradient(135deg,#af8c3e,#d4b05e);color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;position:relative;overflow:hidden">Davet Gönder</button><div id="ml-rp-msg" style="font-size:10px;margin-top:6px;min-height:14px"></div></div>';
html+='<div onclick="this.closest(\'.ml-share-preview\').remove();window._mlTierCard(window._mlCache||{})" style="margin-top:10px;font-size:11px;color:#636366;cursor:pointer;padding:6px">Kartımı Göster →</div>';
html+='</div>';
ov.innerHTML=html;
document.body.appendChild(ov);
// Focus email
setTimeout(function(){var inp=document.getElementById('ml-rp-email');if(inp)inp.focus();},100);
}

// === REFERRAL SEND (PROMPT İÇİNDEN) ===
window.mlRefSendPrompt=function(){
var inp=document.getElementById('ml-rp-email');
var msg=document.getElementById('ml-rp-msg');
var btn=document.getElementById('ml-rp-send');
if(!inp||!inp.value){if(msg){msg.textContent='E-posta girin';msg.style.color='#e53e3e';}return;}
if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value)){if(msg){msg.textContent='Geçerli bir e-posta girin';msg.style.color='#e53e3e';}return;}
if(!_mlCache||!_mlCache.email)return;
if(btn){btn.disabled=true;btn.textContent='Gönderiliyor...';}
fetch(WEB_APP+'?action=referral&referrerEmail='+encodeURIComponent(_mlCache.email)+'&friendEmail='+encodeURIComponent(inp.value.trim())).then(function(r){return r.json()}).then(function(d){
// Prompt overlay'ı kapat
var pov=document.querySelector('.ml-share-preview');if(pov)pov.remove();
if(d.success&&d.coupon){
// Kupon kartını aç
_mlCouponCard(d.coupon,d.discount,d.senderName||_mlCache.fullName||_mlCache.name||'',d.senderTier||_mlCache.tier||'');
} else {
// Hata — prompt tekrar aç
var refRate=REF_RATES[_mlCache.tier];
_mlRefPrompt(_mlCache,refRate);
setTimeout(function(){var m=document.getElementById('ml-rp-msg');if(m){m.textContent=d.error||'Bir hata oluştu';m.style.color='#e53e3e';}},200);
}
}).catch(function(){
var pov=document.querySelector('.ml-share-preview');if(pov)pov.remove();
var refRate=REF_RATES[_mlCache.tier];
_mlRefPrompt(_mlCache,refRate);
setTimeout(function(){var m=document.getElementById('ml-rp-msg');if(m){m.textContent='Bağlantı hatası';m.style.color='#e53e3e';}},200);
});
};

// === KUPON KARTI (referral sonrası) — Kredi kartı tasarımı ===
window._mlCouponCard=function(code,disc,senderName,senderTier){
var S=3,W=600,H=340;
var c=document.createElement('canvas');c.width=W*S;c.height=H*S;c.style.width='100%';c.style.maxWidth=W+'px';c.style.height='auto';c.style.aspectRatio=W+'/'+H;
var ctx=c.getContext('2d');ctx.scale(S,S);
var gl=_mlCardBg(ctx,W,H);
ctx.textAlign='center';ctx.textBaseline='middle';
// Crown
drawCrown(ctx,W/2,22,11,'#af8c3e');
// MANHATTAN LIKIT
ctx.font='600 8px -apple-system,BlinkMacSystemFont,sans-serif';ctx.fillStyle='#7c7c80';
ctx.fillText('M A N H A T T A N   L I K I T',W/2,38);
// Sender message — "[İsim] size %X indirim gönderdi"
var senderMsg=senderName?(senderName+' size %'+disc+' indirim gönderdi'):'Size özel %'+disc+' indirim';
ctx.font='500 13px -apple-system,BlinkMacSystemFont,sans-serif';ctx.fillStyle='#c8c8cc';
ctx.fillText(senderMsg,W/2,64);
// Discount circle
var circY=114;
ctx.save();ctx.shadowColor='rgba(175,140,62,.4)';ctx.shadowBlur=30;
ctx.beginPath();ctx.arc(W/2,circY,32,0,Math.PI*2);
var cg=ctx.createRadialGradient(W/2-8,circY-8,4,W/2,circY,32);cg.addColorStop(0,'#f0e2b8');cg.addColorStop(0.35,'#d4b05e');cg.addColorStop(1,'#af8c3e');
ctx.fillStyle=cg;ctx.fill();ctx.restore();
// Outer ring
ctx.strokeStyle='rgba(240,226,184,.08)';ctx.lineWidth=0.5;
ctx.beginPath();ctx.arc(W/2,circY,40,0,Math.PI*2);ctx.stroke();
// Discount text
ctx.font='800 19px -apple-system,BlinkMacSystemFont,sans-serif';ctx.fillStyle='#fff';
ctx.fillText('%'+disc,W/2,circY+1);
// Coupon code — large monospace in subtle frame
var bx=W/2-130,by=164,bw=260,bh=44;
ctx.fillStyle='rgba(175,140,62,.04)';
ctx.beginPath();ctx.roundRect(bx,by,bw,bh,10);ctx.fill();
ctx.strokeStyle='rgba(212,176,94,.2)';ctx.lineWidth=0.5;
ctx.beginPath();ctx.roundRect(bx,by,bw,bh,10);ctx.stroke();
ctx.font='800 22px monospace';
var codeGl=ctx.createLinearGradient(W/2-100,0,W/2+100,0);codeGl.addColorStop(0,'#af8c3e');codeGl.addColorStop(0.5,'#f0e2b8');codeGl.addColorStop(1,'#af8c3e');
ctx.fillStyle=codeGl;
ctx.fillText(code,W/2,by+bh/2+1);
// Site info
ctx.font='400 9px -apple-system,BlinkMacSystemFont,sans-serif';ctx.fillStyle='#636366';
ctx.fillText('manhattandan.com adresinde geçerlidir',W/2,228);
// Separator
ctx.fillStyle=gl;ctx.fillRect(140,250,W-280,0.5);
// Sender pride — name + tier badge
if(senderName){
var nameGl=ctx.createLinearGradient(W/2-100,0,W/2+100,0);nameGl.addColorStop(0,'#af8c3e');nameGl.addColorStop(0.5,'#f0e2b8');nameGl.addColorStop(1,'#af8c3e');
ctx.font='600 14px -apple-system,BlinkMacSystemFont,sans-serif';ctx.fillStyle=nameGl;
ctx.fillText(senderName,W/2,274);
// Tier badge
if(senderTier){
ctx.font='500 9px -apple-system,BlinkMacSystemFont,sans-serif';ctx.fillStyle='#9e9ea3';
ctx.fillText(senderTier+' Üyesi',W/2,294);
}
}
// Bottom
ctx.font='400 8px -apple-system,BlinkMacSystemFont,sans-serif';ctx.fillStyle='#4a4a4e';
ctx.fillText('manhattandan.com',W/2,H-14);
// Overlay — WP + Download + Kapat
var ov=_mlCardOverlay(c,'');
ov.querySelector('.ml-share-preview-btns').innerHTML='<button class="ml-sp-share" id="ml-cp-wp" style="background:#25D366;color:#fff">WhatsApp\'ta Gönder</button><button class="ml-sp-share" id="ml-cp-dl">Kartı İndir</button><button class="ml-sp-close" id="ml-cp-x">Kapat</button>';
document.getElementById('ml-cp-x').onclick=function(){ov.remove();};
// Kartı İndir — direkt dosya kaydetme
document.getElementById('ml-cp-dl').onclick=function(){
c.toBlob(function(blob){
var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='manhattan-davet-'+code+'.png';document.body.appendChild(a);a.click();document.body.removeChild(a);URL.revokeObjectURL(a.href);
},'image/png');};
// WhatsApp — mobil native share, desktop wa.me
document.getElementById('ml-cp-wp').onclick=function(){
var wpText=senderName?senderName+' sana Manhattan Likit\'ten %'+disc+' indirim hediye etti!':'Manhattan Likit\'ten sana %'+disc+' indirim!';
wpText+='\n\nKod: '+code+'\nmanhattandan.com\n\nTüm indirimlerine ek, sana özel!';
var isMobile=/Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
if(isMobile){
c.toBlob(function(blob){
try{
var f=new File([blob],'manhattan-davet.png',{type:'image/png'});
if(navigator.share&&navigator.canShare&&navigator.canShare({files:[f]})){
navigator.share({text:wpText,files:[f]}).catch(function(){
window.open('https://wa.me/?text='+encodeURIComponent(wpText),'_blank');
});return;}
}catch(e){}
window.open('https://wa.me/?text='+encodeURIComponent(wpText),'_blank');
},'image/png');
} else {
window.open('https://web.whatsapp.com/send?text='+encodeURIComponent(wpText),'_blank');
}
};
}

// === TIER KARTI (kişisel prestij) ===
window._mlTierCard=function(d){
var ti=T.findIndex(function(t){return t.n===d.tier});
var t=T[ti];
var S=3,W=600,H=340;
var c=document.createElement('canvas');c.width=W*S;c.height=H*S;c.style.width='100%';c.style.maxWidth=W+'px';c.style.height='auto';c.style.aspectRatio=W+'/'+H;
var ctx=c.getContext('2d');ctx.scale(S,S);
var gl=_mlCardBg(ctx,W,H);
ctx.textAlign='center';ctx.textBaseline='middle';
// Crown
drawCrown(ctx,W/2,28,14,'#af8c3e');
// MANHATTAN
ctx.font='600 9px -apple-system,BlinkMacSystemFont,sans-serif';ctx.fillStyle='#9e9ea3';
ctx.fillText('M A N H A T T A N',W/2,46);
// Tier name
ctx.font='800 40px -apple-system,BlinkMacSystemFont,sans-serif';ctx.fillStyle='#ffffff';
ctx.fillText(d.tier,W/2,90);
// Discount circle
var circY=150;
ctx.save();ctx.shadowColor='rgba(175,140,62,.35)';ctx.shadowBlur=35;
ctx.beginPath();ctx.arc(W/2,circY,36,0,Math.PI*2);
var cg=ctx.createRadialGradient(W/2-10,circY-10,4,W/2,circY,36);cg.addColorStop(0,'#f0e2b8');cg.addColorStop(0.35,'#d4b05e');cg.addColorStop(1,'#af8c3e');
ctx.fillStyle=cg;ctx.fill();ctx.restore();
ctx.strokeStyle='rgba(240,226,184,.1)';ctx.lineWidth=0.5;
ctx.beginPath();ctx.arc(W/2,circY,44,0,Math.PI*2);ctx.stroke();
ctx.font='800 22px -apple-system,BlinkMacSystemFont,sans-serif';ctx.fillStyle='#fff';
ctx.fillText('%'+t.d,W/2,circY+2);
ctx.font='400 9px -apple-system,BlinkMacSystemFont,sans-serif';ctx.fillStyle='#636366';
ctx.fillText('Özel İndirim',W/2,circY+52);
// Referral area or generic text
var refRate=REF_RATES[d.tier];
if(refRate){
ctx.font='500 10px -apple-system,BlinkMacSystemFont,sans-serif';ctx.fillStyle='#9e9ea3';
ctx.fillText('Arkadaşınızı davet edin',W/2,circY+72);
ctx.font='600 12px -apple-system,BlinkMacSystemFont,sans-serif';
var refGl=ctx.createLinearGradient(W/2-60,0,W/2+60,0);refGl.addColorStop(0,'#af8c3e');refGl.addColorStop(0.5,'#f0e2b8');refGl.addColorStop(1,'#af8c3e');
ctx.fillStyle=refGl;
ctx.fillText('%'+refRate+' ek indirim kazanın',W/2,circY+88);
} else {
ctx.font='400 9px -apple-system,BlinkMacSystemFont,sans-serif';ctx.fillStyle='#636366';
ctx.fillText('Sadakat üyelerine özel ayrıcalıklar',W/2,circY+80);
}
// Customer name
var displayName=d.fullName||d.name||'';
if(displayName){
var nameGl=ctx.createLinearGradient(W/2-100,0,W/2+100,0);nameGl.addColorStop(0,'#af8c3e');nameGl.addColorStop(0.5,'#f0e2b8');nameGl.addColorStop(1,'#af8c3e');
ctx.font='600 16px -apple-system,BlinkMacSystemFont,sans-serif';ctx.fillStyle=nameGl;
ctx.fillText(displayName,W/2,H-52);
}
// Bottom
ctx.fillStyle=gl;ctx.fillRect(80,H-38,W-160,1);
ctx.font='400 9px -apple-system,BlinkMacSystemFont,sans-serif';ctx.fillStyle='#7c7c80';
ctx.fillText('manhattandan.com',W/2,H-18);
// Overlay
var ov=_mlCardOverlay(c,'<button class="ml-sp-share" id="ml-tc-go">Paylaş</button><button class="ml-sp-close" id="ml-tc-x">Kapat</button>');
document.getElementById('ml-tc-x').onclick=function(){ov.remove();};
document.getElementById('ml-tc-go').onclick=function(){
c.toBlob(function(blob){
if(navigator.share){var f=new File([blob],'manhattan-seviye.png',{type:'image/png'});navigator.share({title:'Manhattan Sadakat Seviyem',files:[f]}).catch(function(){});}
else{var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='manhattan-seviye.png';a.click();}
ov.remove();
},'image/png');};
}

// === ESKİ REFERRAL SEND (alttaki form için backward compat) ===
window.mlRefSend=function(){
var inp=document.getElementById('ml-ref-email');
var area=document.getElementById('ml-ref-area');
if(!inp||!inp.value||!area)return;
if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value)){area.innerHTML='<div class="ml-ref-msg err">Geçerli bir e-posta girin</div><div class="ml-ref-form" style="margin-top:4px"><input type="email" id="ml-ref-email" placeholder="Arkadaşınızın e-postası"><button onclick="mlRefSend()">Gönder</button></div>';return;}
if(!_mlCache||!_mlCache.loggedIn||!_mlCache.email)return;
var btn=area.querySelector('button');if(btn){btn.disabled=true;btn.textContent='Gönderiliyor...';}
fetch(WEB_APP+'?action=referral&referrerEmail='+encodeURIComponent(_mlCache.email)+'&friendEmail='+encodeURIComponent(inp.value.trim())).then(function(r){return r.json()}).then(function(d){
if(d.success&&d.coupon){
_mlCouponCard(d.coupon,d.discount,d.senderName||_mlCache.fullName||_mlCache.name||'',d.senderTier||_mlCache.tier||'');
area.innerHTML='<div class="ml-ref-msg ok"><svg viewBox="0 0 24 24" fill="none" stroke="#38a169" stroke-width="2.5" stroke-linecap="round" style="width:14px;height:14px;vertical-align:-2px"><path d="M20 6L9 17l-5-5"/></svg> Davet gönderildi!</div>';
setTimeout(function(){area.innerHTML='<div class="ml-ref-form"><input type="email" id="ml-ref-email" placeholder="Başka bir arkadaş davet edin"><button onclick="mlRefSend()">Gönder</button></div>';},20000);
}
else{area.innerHTML='<div class="ml-ref-msg err">'+(d.error||'Bir hata oluştu')+'</div><div class="ml-ref-form" style="margin-top:4px"><input type="email" id="ml-ref-email" placeholder="Arkadaşınızın e-postası"><button onclick="mlRefSend()">Gönder</button></div>';}
}).catch(function(){area.innerHTML='<div class="ml-ref-msg err">Bağlantı hatası, tekrar deneyin</div><div class="ml-ref-form" style="margin-top:4px"><input type="email" id="ml-ref-email" placeholder="Arkadaşınızın e-postası"><button onclick="mlRefSend()">Gönder</button></div>';});
};

// Doğum günü formu
var _bdaySvgCake='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:13px;height:13px;vertical-align:-2px"><path d="M20 21v-8a2 2 0 00-2-2H6a2 2 0 00-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/><path d="M2 21h20"/><path d="M7 8v3"/><path d="M12 8v3"/><path d="M17 8v3"/><path d="M7 4h.01"/><path d="M12 4h.01"/><path d="M17 4h.01"/></svg>';
var _bdaySvgEdit='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:10px;height:10px;vertical-align:-1px"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>';
var _bdaySvgCheck='<svg viewBox="0 0 24 24" fill="none" stroke="#38a169" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:12px;height:12px;vertical-align:-2px"><path d="M20 6L9 17l-5-5"/></svg>';
var _bdaySvgGift='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:11px;height:11px;vertical-align:-1px"><path d="M20 12v10H4V12"/><path d="M2 7h20v5H2z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/></svg>';

window.mlBdayEdit=function(){
var bdayKey='ml_bday_'+((_mlCache&&_mlCache.email)?_mlCache.email:'guest');
try{localStorage.removeItem(bdayKey);}catch(e){}
var area=document.getElementById('ml-bday-area');
if(area)area.innerHTML='';
mlBday();
};

window.mlBday=function(){
var area=document.getElementById('ml-bday-area');
if(!area)return;
if(area.innerHTML)return;
var bdayKey='ml_bday_'+((_mlCache&&_mlCache.email)?_mlCache.email:'guest');
var saved=null;try{saved=localStorage.getItem(bdayKey);}catch(e){}
if(saved){
var sd=new Date(saved);var diff=Date.now()-sd.getTime();
var canEdit=diff<30*60*1000;
var editHtml=canEdit?'<div style="font-size:8px;color:var(--mlg);margin-top:4px;cursor:pointer" onclick="mlBdayEdit()">'+_bdaySvgEdit+' Değiştir ('+Math.ceil((30*60*1000-diff)/60000)+' dk kaldı)</div>':'<div style="font-size:8px;color:var(--mltt);margin-top:4px">Yılda 1 kez değiştirilebilir</div>';
area.innerHTML='<div class="ml-bday-form"><div style="font-size:11px;font-weight:600;color:var(--mltp)">'+_bdaySvgCake+' Doğum gününüz kayıtlı</div><div style="font-size:9px;color:var(--mlts);margin-top:2px">Özel gününüzde <b>sürpriz indirim kodu</b> e-posta ile gelecek</div>'+editHtml+'</div>';return;
}
area.innerHTML='<div class="ml-bday-form"><div style="font-size:11px;font-weight:600;color:var(--mltp);margin-bottom:3px">'+_bdaySvgCake+' Doğum gününüzü kaydedin</div><div style="font-size:9px;color:var(--mlts);margin-bottom:6px">Özel gününüzde e-posta ile <b>sürpriz indirim kodu</b> göndereceğiz</div><input type="date" id="ml-bday-input" onchange="document.getElementById(\'ml-bday-btn\').style.display=\'inline-block\'"><button id="ml-bday-btn" style="display:none" onclick="mlBdaySave()">Kaydet</button><div class="ml-bday-msg" id="ml-bday-msg"></div></div>';
};

window.mlBdaySave=function(){
var inp=document.getElementById('ml-bday-input');
var msg=document.getElementById('ml-bday-msg');
var btn=document.getElementById('ml-bday-btn');
if(!inp||!inp.value){if(msg)msg.textContent='Lütfen tarih seçin';return;}
if(!_mlCache||!_mlCache.loggedIn)return;
if(btn){btn.disabled=true;btn.textContent='Kaydediliyor...';}
var email=_mlCache.email||'';
var bdayDate=new Date(inp.value);
var today=new Date();
var daysUntil=Math.ceil((new Date(today.getFullYear(),bdayDate.getMonth(),bdayDate.getDate())-today)/(1000*60*60*24));
if(daysUntil<0)daysUntil+=365;
fetch(WEB_APP+'?action=birthday&email='+encodeURIComponent(email)+'&birthday='+encodeURIComponent(inp.value)).then(function(r){return r.json()}).then(function(d){
if(d.success){
var area=document.getElementById('ml-bday-area');
var daysTxt=daysUntil===0?_bdaySvgGift+' Bugün doğum gününüz!':_bdaySvgGift+' '+daysUntil+' gün sonra hediyeniz gelecek';
if(area)area.innerHTML='<div class="ml-bday-form"><div style="font-size:11px;font-weight:600;color:#38a169">'+_bdaySvgCheck+' Kaydedildi!</div><div style="font-size:9px;color:var(--mlts);margin-top:2px">Doğum gününüzde <b>sürpriz indirim kodu</b> e-posta ile gelecek</div><div style="font-size:8px;color:var(--mltt);margin-top:3px">'+daysTxt+'</div><div style="font-size:8px;color:var(--mlg);margin-top:3px;cursor:pointer" onclick="mlBdayEdit()">'+_bdaySvgEdit+' Değiştir (30 dk içinde)</div></div>';
try{localStorage.setItem('ml_bday_'+((_mlCache&&_mlCache.email)?_mlCache.email:'guest'),new Date().toISOString());}catch(e){}
}else{if(msg){msg.textContent=d.error||'Bir hata oluştu';msg.style.color='#e53e3e';}if(btn){btn.disabled=false;btn.textContent='Kaydet';}}
}).catch(function(){if(msg)msg.textContent='Bağlantı hatası';if(btn){btn.disabled=false;btn.textContent='Kaydet';}});
};

// Micro-sound (Web Audio API, low volume)
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
