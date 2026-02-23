// Manhattan Likit — Dark Mode v1.0
// Standalone file — widget.js'e dokunmaz, ayrı yüklenir
// Toggle: sağ üst sabit buton (ay/güneş)
// Tasarım: Premium warm-dark, Apple siyahı DEĞİL

(function(){
'use strict';

// ─── RENK PALETİ ───
// Sıcak koyu tonlar — saf siyah değil, hafif kahve/altın alt ton
var BG1='#1b1a17';      // ana arka plan (sıcak kömür)
var BG2='#23221e';      // kart / yüzey
var BG3='#2c2b26';      // hover / aktif yüzey
var BGnav='#16150f';    // nav & footer (en koyu)
var TX1='#ece8df';      // birincil metin (sıcak krem)
var TX2='#a09b8f';      // ikincil metin
var TX3='#706c62';      // üçüncül / ipucu
var GOLD='#d4b05e';     // Manhattan gold vurgu
var GOLDDIM='#af8c3e';  // koyu gold
var BD='rgba(175,140,62,.12)'; // kenarlık
var BD2='rgba(175,140,62,.06)';
var CARD_SHADOW='0 2px 16px rgba(0,0,0,.35)';
var IMG_BG='#2c2b26';   // ürün görseli container — koyu sıcak (kartla uyumlu)

// ─── CSS ───
var css=`
/* ══════════════════════════════════════
   MANHATTAN DARK MODE — Warm Premium
   ══════════════════════════════════════ */

/* ── GEÇİŞ ANİMASYONU ── */
body.ml-dm-t,
body.ml-dm-t .tiles,
body.ml-dm-t .menu,
body.ml-dm-t .store,
body.ml-dm-t .footer,
body.ml-dm-t .footer-new,
body.ml-dm-t .grid-product__wrap,
body.ml-dm-t .ml-dm-btn{
  transition:background-color .3s ease,color .3s ease,border-color .3s ease!important;
}

/* ── TOGGLE BUTON ── */
.ml-dm-btn{
  z-index:999999;
  width:40px;height:40px;border-radius:50%;
  border:1.5px solid rgba(175,140,62,.35);
  background:rgba(255,255,255,.92);
  backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);
  color:#af8c3e;
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;
  box-shadow:0 2px 8px rgba(0,0,0,.08);
  transition:background .3s ease,border-color .3s ease,color .3s ease,box-shadow .3s ease;
  padding:0;
  pointer-events:auto;
}
.ml-dm-btn:hover{
  box-shadow:0 3px 14px rgba(175,140,62,.18);
  border-color:rgba(175,140,62,.6);
}
.ml-dm-btn svg{width:20px;height:20px;transition:transform .4s ease}
.ml-dm-btn:active svg{transform:rotate(30deg)}

body.ml-dark .ml-dm-btn{
  background:rgba(35,34,30,.92);
  border-color:rgba(175,140,62,.25);
  color:${GOLD};
  box-shadow:0 2px 10px rgba(0,0,0,.35);
}

@media(max-width:768px){
  .ml-dm-btn{width:34px;height:34px}
  .ml-dm-btn svg{width:16px;height:16px}
}

/* ══════════════════════════════════════
   DARK MODE ANA KURALLAR
   ══════════════════════════════════════ */

/* ── BODY & GENEL ── */
body.ml-dark{
  background:${BG1}!important;
  color:${TX1}!important;
}

/* ── TILES WRAPPER (Instant Site ana container) ── */
body.ml-dark .tiles-wrapper,
body.ml-dark .tiles,
body.ml-dark .body{
  background:${BG1}!important;
}
/* ── SİTE SECTION BLOKLARI ── */
body.ml-dark .menu,
body.ml-dark .container,
body.ml-dark .caption,
body.ml-dark .whyus,
body.ml-dark .contacts,
body.ml-dark .owner,
body.ml-dark .store,
body.ml-dark .dynamic-product-browser{
  background:${BG1}!important;
  color:${TX1}!important;
  overflow:visible!important;
}
body.ml-dark .footer,
body.ml-dark .footer-new{
  background:${BGnav}!important;
  color:${TX3}!important;
  border-top:1px solid ${BD2}!important;
}

/* ── LOGO (dark/light swap) ── */
body.ml-dark .logo img{
  content:url('https://static.wixstatic.com/media/1ca398_eb2ce0b39e06419fa00da66903e58dc5~mv2.png')!important;
}

/* ── NAVİGASYON ── */
body.ml-dark .main-nav,
body.ml-dark .top-menu{
  background:transparent!important;
}
body.ml-dark .top-menu__item a{
  color:${TX1}!important;
  transition:color .2s;
}
body.ml-dark .top-menu__item a:hover{
  color:${GOLD}!important;
}

/* ── SEARCH PANEL ── */
body.ml-dark .search-panel,
body.ml-dark .search-panel > *,
body.ml-dark .search-panel div,
body.ml-dark [class*="search-panel"]{
  border:none!important;
  box-shadow:none!important;
  outline:none!important;
}
body.ml-dark .search-panel{
  background:transparent!important;
  background-color:transparent!important;
}
body.ml-dark .search-panel .text-field{
  border:none!important;
  background:transparent!important;
}
body.ml-dark .search-panel::before,
body.ml-dark .search-panel::after,
body.ml-dark .search-panel *::before,
body.ml-dark .search-panel *::after{
  display:none!important;
  border:none!important;
}
body.ml-dark .search-panel input,
body.ml-dark .search-panel .text-field,
body.ml-dark .search-panel input[type="text"]{
  background:${BG2}!important;
  color:#fff!important;
  border-color:${GOLDDIM}!important;
}
body.ml-dark .search-panel input::placeholder{
  color:rgba(255,255,255,.5)!important;
}
body.ml-dark .search-panel *{
  color:#fff!important;
}
body.ml-dark .search-panel svg{
  color:${GOLD}!important;
  fill:${GOLD}!important;
}
/* Ecwid search widget + overlay (Instant Site) */
body.ml-dark .ecwid-search-widget,
body.ml-dark [class*="ecwid-search"],
body.ml-dark [class*="search-widget"],
body.ml-dark [id*="search"]{
  background:${BG2}!important;
}
body.ml-dark .ecwid-search-widget *,
body.ml-dark [class*="ecwid-search"] *,
body.ml-dark [class*="search-widget"] *{
  color:${TX1}!important;
}
body.ml-dark .ecwid-search-widget input,
body.ml-dark [class*="ecwid-search"] input,
body.ml-dark [class*="search-widget"] input{
  background:${BG3}!important;
  color:${TX1}!important;
  border-color:${BD}!important;
}
body.ml-dark .ecwid-search-widget input::placeholder,
body.ml-dark [class*="ecwid-search"] input::placeholder,
body.ml-dark [class*="search-widget"] input::placeholder{
  color:${TX2}!important;
}
body.ml-dark .ecwid-search-widget svg,
body.ml-dark [class*="ecwid-search"] svg,
body.ml-dark [class*="search-widget"] svg{
  color:${GOLD}!important;
  fill:${GOLD}!important;
}

/* ── ECWID STORE WRAPPER ── */
body.ml-dark .ec-store,
body.ml-dark .ec-wrapper,
body.ml-dark .ecwid-productBrowser,
body.ml-dark .ec-store__content-wrapper{
  background:transparent!important;
  color:${TX1}!important;
}

/* ── TİLE / SECTION BLOKLARI ── */
body.ml-dark .tile,
body.ml-dark [class*="tile-"]{
  background:${BG1}!important;
}
body.ml-dark .tile [class*="cover"],
body.ml-dark [class*="tile-"] [class*="cover"]{
  background:${BG1}!important;
}

/* Farklı arka plan tonları olan section'lar */
body.ml-dark [class*="section"],
body.ml-dark [style*="background-color: rgb(255"],
body.ml-dark [style*="background-color: rgb(254"],
body.ml-dark [style*="background-color: rgb(252"],
body.ml-dark [style*="background-color: rgb(249"],
body.ml-dark [style*="background-color: rgb(248"],
body.ml-dark [style*="background-color: rgb(246"],
body.ml-dark [style*="background-color: rgb(245"],
body.ml-dark [style*="background-color: rgb(243"],
body.ml-dark [style*="background-color: rgb(242"],
body.ml-dark [style*="background-color: rgb(240"],
body.ml-dark [style*="background-color: rgb(239"],
body.ml-dark [style*="background-color: rgb(237"],
body.ml-dark [style*="background-color: rgb(235"],
body.ml-dark [style*="background-color: rgb(233"],
body.ml-dark [style*="background-color: rgb(232"],
body.ml-dark [style*="background-color: rgb(230"]{
  background-color:${BG1}!important;
}

/* Hafif daha açık olan bölgeler (f5f5f7 / fcfaf7 gibi) */
body.ml-dark [style*="background-color: rgb(236"],
body.ml-dark [style*="background-color: rgb(222"],
body.ml-dark [style*="background-color: rgb(193"],
body.ml-dark [style*="background-color: rgb(183"],
body.ml-dark [style*="background-color: rgb(176"],
body.ml-dark [style*="background-color: rgb(150"],
body.ml-dark [style*="background-color: rgb(140"],
body.ml-dark [style*="background-color: rgb(132"],
body.ml-dark [style*="background-color: rgb(125"],
body.ml-dark [style*="background-color: rgb(113"],
body.ml-dark [style*="background-color: rgb(84"],
body.ml-dark [style*="background-color: rgb(77"],
body.ml-dark [style*="background-color: rgb(44"]{
  background-color:${BG2}!important;
}

/* ── TİPOGRAFİ ── */
body.ml-dark h1,body.ml-dark h2,body.ml-dark h3,body.ml-dark h4,body.ml-dark h5{
  color:${TX1}!important;
}
body.ml-dark p{color:${TX2}!important}
body.ml-dark a{color:${GOLD}!important}
body.ml-dark a:hover{color:${TX1}!important}
body.ml-dark small,body.ml-dark .ec-text-muted{color:${TX3}!important}

/* ── ÜRÜN KARTLARI ── */
/* Tüm grid ancestor'ları — shadow kırpılmasın */
body.ml-dark .grid__products,
body.ml-dark .grid__products--classic,
body.ml-dark [class*="grid__products"],
body.ml-dark .grid__wrap,
body.ml-dark .grid__wrap-row,
body.ml-dark [class*="grid__wrap"],
body.ml-dark .grid,
body.ml-dark .ec-grid,
body.ml-dark .grid__products-row{
  overflow:visible!important;
}
/* Kategori grid'leri */
body.ml-dark .grid-categories,
body.ml-dark [class*="grid-categories"]{
  overflow:visible!important;
}
/* Grid hücre — kart etrafında nefes alanı (shadow çakışmasını önler) */
body.ml-dark .grid-product{
  padding:4px!important;
}
body.ml-dark .grid-product__wrap{
  background:${BG2}!important;
  border-radius:14px!important;
  border:none!important;
  /* Üçlü çerçeve: iç çizgi → koyu boşluk → dış çizgi → gölge */
  box-shadow:
    inset 0 0 0 1px ${BD},
    0 0 0 2px ${BG1},
    0 0 0 3px ${BD2},
    0 2px 12px rgba(0,0,0,.3)!important;
  overflow:hidden;
  transition:box-shadow .25s ease,transform .25s ease!important;
}
body.ml-dark .grid-product__wrap-inner{
  background:${BG2}!important;
  border-radius:12px!important;
  border:none!important;
  overflow:hidden;
}
body.ml-dark .grid-product__wrap:hover{
  box-shadow:
    inset 0 0 0 1px ${GOLDDIM},
    0 0 0 2px ${BG1},
    0 0 0 3px ${GOLDDIM},
    0 4px 20px rgba(175,140,62,.15),
    0 8px 32px rgba(0,0,0,.35)!important;
  transform:translateY(-2px)!important;
}
/* Kategori kartları */
body.ml-dark .grid-category__card,
body.ml-dark [class*="grid-category__card"]{
  background:${BG2}!important;
  border-radius:14px!important;
  border:none!important;
  box-shadow:
    inset 0 0 0 1px ${BD},
    0 0 0 2px ${BG1},
    0 0 0 3px ${BD2},
    0 2px 12px rgba(0,0,0,.3)!important;
  overflow:hidden!important;
  transition:box-shadow .25s ease,transform .25s ease!important;
}
body.ml-dark .grid-category__card:hover,
body.ml-dark [class*="grid-category__card"]:hover{
  box-shadow:
    inset 0 0 0 1px ${GOLDDIM},
    0 0 0 2px ${BG1},
    0 0 0 3px ${GOLDDIM},
    0 4px 20px rgba(175,140,62,.15),
    0 8px 32px rgba(0,0,0,.35)!important;
  transform:translateY(-2px)!important;
}
/* Kategori resim + başlık */
body.ml-dark .grid-category__card img{
  border-radius:12px 12px 0 0!important;
}
body.ml-dark .grid-category__title,
body.ml-dark [class*="grid-category__title"]{
  color:${TX1}!important;
}

/* Stokta Var label — gold (Stokta Yok hariç) */
body.ml-dark .grid-product__label:not([class*="Stokta-Yok"]):not([class*="Stokta-yok"]){
  background:${GOLDDIM}!important;
  color:${BG1}!important;
  border-radius:6px!important;
}
/* Stokta Yok — eski kural kaldırıldı, badge section sonrasına taşındı */
/* Ürün detaydaki Stokta var/yok badge — düzgün dikdörtgen */
body.ml-dark .product-details__label-container{
  display:inline-flex!important;
  width:auto!important;
  max-width:fit-content!important;
}
body.ml-dark .product-details .ec-label,
body.ml-dark .details-product-purchase__place .ec-label{
  display:inline-block!important;
  width:auto!important;
  max-width:fit-content!important;
  padding:4px 12px!important;
  border-radius:4px!important;
  box-sizing:border-box!important;
  line-height:1.4!important;
  white-space:nowrap!important;
}

/* ── ÜRÜN KART İÇERİK ── */
body.ml-dark .grid-product__title,
body.ml-dark .grid-product__title-inner{
  color:${TX1}!important;
}
body.ml-dark .grid-product__subtitle,
body.ml-dark .grid-product__sku{
  color:${TX2}!important;
}
body.ml-dark .grid-product__price .ec-price-item,
body.ml-dark .grid-product__price-value{
  color:${GOLD}!important;
}

/* ── ÜRÜN GÖRSELLERİ — Açık container, blend yok ── */
body.ml-dark .grid-product__image,
body.ml-dark .grid-product__bg,
body.ml-dark .grid-product__bg[style]{
  background:${IMG_BG}!important;
  background-color:${IMG_BG}!important;
  border-radius:12px 12px 0 0!important;
}
body.ml-dark .grid-product__image img,
body.ml-dark .grid-product__picture img,
body.ml-dark .grid-product__picture-wrapper img{
  background:transparent!important;
}

/* ── ÜRÜN DETAY SAYFASI ── */
body.ml-dark .product-details__product-title{color:${TX1}!important}
body.ml-dark .product-details__product-price .ec-price-item{color:${GOLD}!important}
body.ml-dark .product-details__product-description{color:${TX2}!important}
body.ml-dark .product-details{color:${TX2}!important}
/* Sidebar + Options container (gerçek class: product-details__sidebar, details-product-options) */
body.ml-dark .product-details__sidebar{
  background:transparent!important;
  color:${TX1}!important;
}
body.ml-dark .details-product-options{
  background:transparent!important;
}
/* Attraction block (Stokta var + fiyat üstü alan) */
body.ml-dark .product-details__attraction-block,
body.ml-dark .product-details__product-on-sale{
  background:transparent!important;
}

/* WYSIWYG ürün açıklaması içerikleri (Koleksiyon tablosu vb.) */
body.ml-dark .product-details__product-description *,
body.ml-dark .product-details__product-description td,
body.ml-dark .product-details__product-description th,
body.ml-dark .product-details__product-description span,
body.ml-dark .product-details__product-description p,
body.ml-dark .product-details__product-description div,
body.ml-dark .product-details__product-description strong,
body.ml-dark .product-details__product-description b,
body.ml-dark .product-details__product-description li{
  color:${TX1}!important;
  background-color:transparent!important;
}
body.ml-dark .product-details__product-description table{
  border-color:${BD}!important;
}
body.ml-dark .product-details__product-description td,
body.ml-dark .product-details__product-description th{
  border-color:${BD}!important;
}

/* Ürün detay görseli */
body.ml-dark .product-details__gallery,
body.ml-dark .product-details-module__gallery,
body.ml-dark .details-gallery,
body.ml-dark .details-gallery__main-image-wrapper{
  background:${IMG_BG}!important;
  border-radius:10px;
}
/* Galeri resim ortalama — sadece img üzerinde, wrapper'a dokunma */
body.ml-dark .details-gallery__main-image-wrapper img,
body.ml-dark .product-details__gallery img,
body.ml-dark .product-details-module__gallery img,
body.ml-dark .details-gallery img{
  background:transparent!important;
  display:block!important;
  margin:0 auto!important;
}
/* Thumbnail backgrounds */
body.ml-dark .details-gallery__thumb-bg{
  background:${IMG_BG}!important;
}
/* Galeri iç wrapper (gerçek class: details-gallery__image-wrapper-inner) */
body.ml-dark .details-gallery__image-wrapper-inner{
  background:${IMG_BG}!important;
}
/* Galeri thumbnails vertical — sol kenar */
body.ml-dark .details-gallery--thumbnails-vertical{
  background:transparent!important;
}

/* Ürün seçenekleri başlıkları (gerçek Ecwid class: product-details-module__title ec-header-h6) */
body.ml-dark .product-details__product-options .form-control__label,
body.ml-dark .product-details__product-options label,
body.ml-dark .details-product-option__title,
body.ml-dark .product-details-module__title,
body.ml-dark .ec-header-h6,
body.ml-dark [class*="product-option"] [class*="title"]{
  color:${TX1}!important;
}

/* ── KATEGORİ & SAYFA BAŞLIKLARI ── */
body.ml-dark .ec-page-title{color:${TX1}!important}
body.ml-dark .ec-breadcrumbs a{color:${TX3}!important}
body.ml-dark .ec-breadcrumbs a:hover{color:${GOLD}!important}

/* ── ÜRÜN NAVİGASYON OKLARI (< >) ── */
body.ml-dark .product-details-navigation__arrow,
body.ml-dark [class*="product-details-navigation"] a,
body.ml-dark [class*="product-details-navigation"] button,
body.ml-dark .product-details__navigation a,
body.ml-dark .product-details__navigation button{
  color:${TX2}!important;
  border-color:${BD}!important;
  background:${BG2}!important;
  transition:all .2s!important;
}
body.ml-dark .product-details-navigation__arrow:hover,
body.ml-dark [class*="product-details-navigation"] a:hover,
body.ml-dark [class*="product-details-navigation"] button:hover,
body.ml-dark .product-details__navigation a:hover,
body.ml-dark .product-details__navigation button:hover{
  color:${GOLD}!important;
  border-color:${GOLD}!important;
  background:${BG3}!important;
}
body.ml-dark .product-details-navigation__arrow svg,
body.ml-dark [class*="product-details-navigation"] svg,
body.ml-dark .product-details__navigation svg{
  color:${TX2}!important;
  fill:${TX2}!important;
  transition:all .2s!important;
}
body.ml-dark .product-details-navigation__arrow:hover svg,
body.ml-dark [class*="product-details-navigation"] a:hover svg,
body.ml-dark [class*="product-details-navigation"] button:hover svg,
body.ml-dark .product-details__navigation a:hover svg,
body.ml-dark .product-details__navigation button:hover svg{
  color:${GOLD}!important;
  fill:${GOLD}!important;
}

/* ── BUTONLAR — widget.js ml-cta ile birebir ── */
/* PRIMARY butonlar (Sepete Ekle, Sepete Git, Checkout vb.) */
body.ml-dark .form-control--primary .form-control__button,
body.ml-dark .details-product-purchase__add-to-bag .form-control__button,
body.ml-dark .details-product-purchase__checkout .form-control__button{
  background:linear-gradient(135deg,#af8c3e,#d4b05e)!important;
  color:#fff!important;
  border:none!important;
  border-radius:10px!important;
  font-weight:700!important;
  letter-spacing:-.1px!important;
  cursor:pointer!important;
  position:relative!important;
  overflow:hidden!important;
  transition:all .2s!important;
}
/* Buton text span — #fff zorla */
body.ml-dark .form-control--primary .form-control__button-text,
body.ml-dark .form-control--primary .form-control__button-svg,
body.ml-dark .form-control--primary .form-control__button-svg svg,
body.ml-dark .details-product-purchase__add-to-bag .form-control__button-text{
  color:#fff!important;
  fill:#fff!important;
}
/* Sweep animasyonu — widget.js ml-cta::after birebir kopyası */
/* Wrapper'a taşındı çünkü Ecwid button::after'ı --animated ile kullanır */
body.ml-dark .details-product-purchase__add-to-bag.form-control{
  position:relative!important;
  overflow:hidden!important;
  border-radius:10px!important;
}
body.ml-dark .details-product-purchase__add-to-bag.form-control::after{
  content:''!important;
  position:absolute!important;
  top:0!important;left:-100%!important;
  width:60%!important;height:100%!important;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent)!important;
  animation:mlsweep 3s ease-in-out infinite!important;
  pointer-events:none!important;
  z-index:1!important;
}
body.ml-dark .details-product-purchase__add-to-bag.form-control:hover::after{
  animation:none!important;
}
@keyframes mlsweep{0%,100%{left:-100%}50%{left:100%}}
/* Hover — koyu gold + scale, sweep durur */
body.ml-dark .form-control--primary .form-control__button:hover,
body.ml-dark .details-product-purchase__add-to-bag .form-control__button:hover{
  background:${GOLDDIM}!important;
  color:#fff!important;
  opacity:1!important;
  transform:scale(.97)!important;
  box-shadow:0 2px 12px rgba(175,140,62,.25)!important;
}
body.ml-dark .form-control--primary .form-control__button:hover .form-control__button-text{
  color:#fff!important;
}
body.ml-dark .form-control--primary .form-control__button:hover::after{
  animation:none!important;
}
/* Active — scale */
body.ml-dark .form-control--primary .form-control__button:active{
  transform:scale(.98)!important;
}
/* SECONDARY butonlar (Tekrar ekle, Favori vb.) — subtle, gold DEĞİL */
body.ml-dark .form-control--secondary .form-control__button{
  background:${BG3}!important;
  color:${TX1}!important;
  border:1.5px solid ${BD}!important;
  border-radius:10px!important;
  font-weight:600!important;
  cursor:pointer!important;
  transition:all .2s!important;
}
body.ml-dark .form-control--secondary .form-control__button-text,
body.ml-dark .form-control--secondary .form-control__button-svg,
body.ml-dark .form-control--secondary .form-control__button-svg svg{
  color:${TX1}!important;
  fill:${TX1}!important;
}
body.ml-dark .form-control--secondary .form-control__button:hover{
  background:${BG2}!important;
  border-color:${GOLDDIM}!important;
  color:${GOLD}!important;
}
body.ml-dark .form-control--secondary .form-control__button:hover .form-control__button-text{
  color:${GOLD}!important;
}

/* Cover butonlar — gold bg + beyaz yazı + yuvarlak köşe */
body.ml-dark .cover__button,
body.ml-dark .cover-button,
body.ml-dark a.cover__button,
body.ml-dark a.cover-button,
body.ml-dark button.cover__button,
body.ml-dark button.cover-button{
  background:${GOLDDIM}!important;
  background-color:${GOLDDIM}!important;
  color:#fff!important;
  border:none!important;
  border-radius:12px!important;
  overflow:hidden!important;
  text-decoration:none!important;
}
body.ml-dark .cover__button *,
body.ml-dark .cover-button *{
  color:#fff!important;
  background:transparent!important;
  background-color:transparent!important;
}

/* ── FORM / INPUT ── */
body.ml-dark input:not([type="checkbox"]):not([type="radio"]),
body.ml-dark textarea,
body.ml-dark select{
  background:${BG3}!important;
  color:${TX1}!important;
  border-color:${BD}!important;
  color-scheme:dark!important;
}
/* Select dropdown container (Ecwid wrapper) — SAFE: no appearance override */
body.ml-dark .form-control--select,
body.ml-dark .details-product-option--select .form-control,
body.ml-dark [class*="product-option"] select,
body.ml-dark .details-product-option select,
body.ml-dark .product-details__product-options select{
  background:${BG3}!important;
  color:${TX1}!important;
  color-scheme:dark!important;
  border:1.5px solid ${BD}!important;
  border-radius:8px!important;
}
/* Asıl select element — .form-control__select (Ecwid gerçek class) */
body.ml-dark .form-control__select{
  background:${BG3}!important;
  color:${TX1}!important;
  color-scheme:dark!important;
  border:none!important;
}
/* Boş (seçilmemiş) select — "Lütfen seç" yazısı görünsün */
body.ml-dark .form-control--empty .form-control__select{
  color:${TX2}!important;
}
/* Select wrapper içindeki ok/svg — Ecwid kendi ekliyor */
body.ml-dark .form-control--select svg,
body.ml-dark .form-control--select::after{
  color:${GOLD}!important;
  fill:${GOLD}!important;
  opacity:1!important;
}
body.ml-dark .form-control--select:focus-within{
  border-color:${GOLDDIM}!important;
  box-shadow:0 0 0 2px rgba(175,140,62,.15)!important;
}
/* Select option text (dropdown açılınca) */
body.ml-dark select option{
  background:${BG3}!important;
  color:${TX1}!important;
}
/* product-details-module__content — select container arka plan */
body.ml-dark .product-details-module__content{
  background:transparent!important;
}
/* ── SELECT İÇ ELEMENTLER (Ecwid custom select: select opacity:0, görünen = input + placeholder + arrow) ── */
/* Seçili değer gösteren readonly input */
body.ml-dark .form-control--select input.form-control__text{
  background:transparent!important;
  color:${TX1}!important;
  border:none!important;
}
/* ── BOŞ SELECT — "Lütfen seç" göster ── */
/* Input transparan → alttaki placeholder görünsün */
body.ml-dark .form-control--empty input.form-control__text{
  color:transparent!important;
}
/* Placeholder — BOŞ iken zorla göster (Ecwid display:none yapsa bile) */
body.ml-dark .form-control--empty .form-control__placeholder{
  display:flex!important;
  visibility:visible!important;
  opacity:1!important;
  position:absolute!important;
  top:0!important;left:0!important;right:0!important;
  height:100%!important;
  align-items:center!important;
  padding-left:12px!important;
  pointer-events:none!important;
  z-index:1!important;
}
body.ml-dark .form-control--empty .form-control__placeholder-inner{
  color:${TX2}!important;
  opacity:1!important;
  display:block!important;
  font-size:14px!important;
}
/* ── SEÇİLMİŞ SELECT — placeholder gizle, text göster ── */
body.ml-dark .form-control--select:not(.form-control--empty) .form-control__placeholder{
  display:none!important;
}
body.ml-dark .form-control--select:not(.form-control--empty) .form-control__text{
  color:${TX1}!important;
}
/* ── Ok simgesi — her zaman görünür ── */
body.ml-dark .form-control__arrow{
  color:${GOLD}!important;
  display:flex!important;
  align-items:center!important;
  opacity:1!important;
  visibility:visible!important;
  z-index:2!important;
  pointer-events:none!important;
}
body.ml-dark .form-control__arrow svg{
  color:${GOLD}!important;
  fill:${GOLD}!important;
  stroke:${GOLD}!important;
  opacity:1!important;
  width:auto!important;
  height:auto!important;
}
body.ml-dark .form-control__arrow svg path,
body.ml-dark .form-control__arrow svg polyline,
body.ml-dark .form-control__arrow svg line{
  fill:${GOLD}!important;
  stroke:${GOLD}!important;
}
body.ml-dark input::placeholder,
body.ml-dark textarea::placeholder{
  color:${TX3}!important;
}
body.ml-dark input:focus,
body.ml-dark textarea:focus{
  border-color:${GOLDDIM}!important;
  box-shadow:0 0 0 2px rgba(175,140,62,.15)!important;
}
/* Native radio & checkbox — gold accent */
body.ml-dark input[type="radio"],
body.ml-dark input[type="checkbox"]{
  accent-color:${GOLDDIM}!important;
}
/* Ecwid radio wrap — Bilgi bölümü */
body.ml-dark .form-control__radio-wrap{
  background:transparent!important;
}
body.ml-dark .form-control__radio-view{
  border-color:${GOLDDIM}!important;
  border-radius:50%!important;
  width:18px!important;
  height:18px!important;
}
body.ml-dark .form-control__radio-view-inner{
  border-radius:50%!important;
}
body.ml-dark .form-control__radio:checked ~ .form-control__radio-view,
body.ml-dark .form-control__radio:checked + .form-control__radio-view{
  border-color:${GOLD}!important;
  background:${GOLDDIM}!important;
  border-radius:50%!important;
}
body.ml-dark .form-control__radio:checked ~ .form-control__radio-view .form-control__radio-view-inner,
body.ml-dark .form-control__radio:checked + .form-control__radio-view .form-control__radio-view-inner{
  background:#fff!important;
  border-radius:50%!important;
}
/* Bilgi text container */
body.ml-dark .form-control--radio.form-control--flexible{
  background:${BG3}!important;
  color:${TX1}!important;
  border-color:${BD}!important;
  border-radius:8px!important;
}
body.ml-dark .form-control--radio.form-control--flexible *{
  color:${TX1}!important;
}

/* ── SEPET ── */
body.ml-dark .ec-cart,
body.ml-dark .ec-cart__body{
  background:${BG1}!important;
  color:${TX1}!important;
}
body.ml-dark .ec-cart-item{
  background:${BG1}!important;
  color:${TX1}!important;
  border-bottom:1px solid ${BD2}!important;
}
body.ml-dark .ec-cart-item__title{color:${TX1}!important}
body.ml-dark .ec-cart-item__price{color:${GOLD}!important}
body.ml-dark .ec-cart-item__sku{color:${TX3}!important}
body.ml-dark .ec-minicart__body{
  background:${BG2}!important;
  border-color:${BD2}!important;
}

/* ── HESABIM SAYFASI ── */
body.ml-dark .ec-cart-email__input{
  background:${BG3}!important;
}
body.ml-dark .ec-cart-email__input input{
  background:transparent!important;
  color:${TX1}!important;
}

/* ── FOOTER ── */
body.ml-dark .ec-footer{
  background:${BGnav}!important;
  color:${TX3}!important;
  border-top:1px solid ${BD2}!important;
}
body.ml-dark .ec-footer a{color:${TX3}!important}
body.ml-dark .ec-footer a:hover{color:${GOLD}!important}
body.ml-dark .ec-footer__row{border-color:${BD2}!important}

/* ── HELPFULCROWD REVIEW KARTLARI ── */
body.ml-dark .hc-widget-card,
body.ml-dark .hc-comment,
body.ml-dark .hc-review-form-wrapper,
body.ml-dark .hc-review-form__submit__wrapper{
  background:${BG2}!important;
  color:${TX1}!important;
  border-color:${BD}!important;
}
/* HC içi tüm beyaz çizgileri kaldır */
body.ml-dark [class*="hc-"] hr{
  border:none!important;
  border-top:1px solid ${BD}!important;
  background:transparent!important;
  height:0!important;
}
body.ml-dark .hc-comment{
  border:none!important;
  border-bottom:1px solid ${BD}!important;
  margin-bottom:0!important;
}
body.ml-dark .hc-widget-card{
  border:none!important;
  background:transparent!important;
}
body.ml-dark [class*="hc-"] h1,
body.ml-dark [class*="hc-"] h2,
body.ml-dark [class*="hc-"] h3,
body.ml-dark [class*="hc-"] h4,
body.ml-dark [class*="hc-"] strong,
body.ml-dark .hc-comment__title,
body.ml-dark .hc-review-summary__title,
body.ml-dark [class*="hc-"] [class*="title"]{
  color:${TX1}!important;
}
body.ml-dark [class*="hc-"] p,
body.ml-dark [class*="hc-"] span,
body.ml-dark [class*="hc-"] div,
body.ml-dark .hc-comment__body,
body.ml-dark .hc-comment__author,
body.ml-dark [class*="hc-"] [class*="text"],
body.ml-dark [class*="hc-"] [class*="label"],
body.ml-dark [class*="hc-"] [class*="metric"],
body.ml-dark [class*="hc-"] time{
  color:${TX2}!important;
}
body.ml-dark [class*="hc-"] [class*="border"],
body.ml-dark [class*="hc-"] [class*="separator"],
body.ml-dark [class*="hc-"] [class*="divider"]{
  border-color:${BD}!important;
  background:transparent!important;
}
body.ml-dark .hc-dropdown__content,
body.ml-dark .hc-dropdown__item{
  background:${BG3}!important;
  color:${TX1}!important;
}
body.ml-dark .hc-dropdown__item:hover{
  background:${BG1}!important;
}
body.ml-dark .hc-product-tab-filters__search{
  background:${BG3}!important;
  border-color:${BD}!important;
  color:${TX1}!important;
}
body.ml-dark .hc-product-tab-filters__search input{
  color:${TX1}!important;
}
body.ml-dark .hc-rating-chart__bar-wrapper{
  background:${BG3}!important;
}
body.ml-dark .hc-recommended-metric__chart{
  background:${BG3}!important;
}
body.ml-dark .hc-tooltip__content{
  background:${BG2}!important;
  color:${TX2}!important;
}
body.ml-dark [class*="hc-"] a{
  color:${GOLD}!important;
}
body.ml-dark .hc-flag{
  background:${BG3}!important;
  color:${TX2}!important;
}
/* HelpfulCrowd butonlar */
body.ml-dark [class*="hc-"] button,
body.ml-dark .hc-review-form__submit button{
  background:${GOLDDIM}!important;
  color:${BG1}!important;
  border-color:${GOLDDIM}!important;
}
/* Müşteri medya resimleri */
body.ml-dark [class*="hc-"] img{
  border-radius:6px;
}

/* ── SOSYAL PAYLAŞIM ── */
body.ml-dark .ec-likely__widget{
  background:${BG3}!important;
  color:${TX2}!important;
  border-color:${BD}!important;
}

/* ── CHECKBOX / OPSİYON BUTONLARI ── */
/* Container div'in kendisi beyaz kalıyor — şeffaf yap */
body.ml-dark .form-control--checkbox-button,
body.ml-dark .details-product-option .form-control{
  background:transparent!important;
}
/* ── NORMAL (seçili değil) ── */
body.ml-dark .form-control--checkbox-button .form-control__inline-label{
  background:${BG3}!important;
  color:${TX1}!important;
  border:1.5px solid ${BD}!important;
  border-radius:8px!important;
  transition:all .25s ease!important;
  position:relative!important;
  overflow:hidden!important;
}
body.ml-dark .form-control--checkbox-button .form-control__inline-label label{
  background:transparent!important;
  color:inherit!important;
  transition:color .25s ease!important;
}
/* ── HOVER (seçili değil) — gold border glow + gold text ── */
body.ml-dark .form-control--checkbox-button .form-control__radio:not(:checked)+.form-control__inline-label:hover{
  background:${BG3}!important;
  color:${GOLD}!important;
  border-color:${GOLDDIM}!important;
  box-shadow:0 0 0 1px rgba(175,140,62,.15),0 2px 8px rgba(175,140,62,.1)!important;
  transform:translateY(-1px)!important;
}
body.ml-dark .form-control--checkbox-button .form-control__radio:not(:checked)+.form-control__inline-label:hover label{
  color:${GOLD}!important;
}
/* ── SEÇİLİ — gold gradient + beyaz text ── */
body.ml-dark .form-control--checkbox-button .form-control__radio:checked+.form-control__inline-label{
  background:linear-gradient(135deg,#af8c3e,#d4b05e)!important;
  color:#fff!important;
  border-color:${GOLD}!important;
  font-weight:600!important;
  position:relative!important;
  overflow:hidden!important;
  box-shadow:0 2px 8px rgba(175,140,62,.2)!important;
}
body.ml-dark .form-control--checkbox-button .form-control__radio:checked+.form-control__inline-label label,
body.ml-dark .form-control--checkbox-button .form-control__radio:checked+.form-control__inline-label *{
  color:#fff!important;
  background:transparent!important;
}
/* ── HOVER (seçili) — koyu gold, "kapat" sinyali ── */
body.ml-dark .form-control--checkbox-button .form-control__radio:checked+.form-control__inline-label:hover{
  background:${GOLDDIM}!important;
  border-color:${GOLDDIM}!important;
  box-shadow:0 1px 4px rgba(0,0,0,.3)!important;
  transform:translateY(0)!important;
  opacity:.85!important;
}
body.ml-dark .form-control--checkbox-button .form-control__radio:checked+.form-control__inline-label:hover label{
  color:#fff!important;
}
/* ── SEÇİLİ SEÇENEK PARLAMA ANİMASYONU ── */
@keyframes mlOptSweep{
  0%{left:-100%}
  100%{left:100%}
}
/* Light mode — seçili seçenek gold parlama */
.form-control--checkbox-button .form-control__radio:checked+.form-control__inline-label{
  position:relative!important;
  overflow:hidden!important;
}
.form-control--checkbox-button .form-control__radio:checked+.form-control__inline-label::after{
  content:'';
  position:absolute;
  top:0;left:-100%;
  width:60%;height:100%;
  background:linear-gradient(90deg,transparent,rgba(175,140,62,.18),transparent);
  animation:mlOptSweep 2.5s ease-in-out infinite;
  pointer-events:none;
}
/* Dark mode — beyaz sweep */
body.ml-dark .form-control--checkbox-button .form-control__radio:checked+.form-control__inline-label::after{
  content:''!important;
  position:absolute!important;
  top:0!important;left:-100%!important;
  width:60%!important;height:100%!important;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent)!important;
  animation:mlOptSweep 2.5s ease-in-out infinite!important;
  pointer-events:none!important;
}

/* ── MİKTAR INPUT ── */
body.ml-dark .details-product-purchase__qty{
  color:${TX1}!important;
  max-width:180px!important;
}
/* Adet input field — beyaz bg fix */
body.ml-dark .details-product-purchase__qty-field,
body.ml-dark .details-product-purchase__qty-field.form-control{
  background:${BG3}!important;
  color:${TX1}!important;
  border:1.5px solid ${BD}!important;
  border-radius:8px!important;
}
body.ml-dark .details-product-purchase__qty-field input.form-control__text{
  background:transparent!important;
  color:${TX1}!important;
}
body.ml-dark .details-product-purchase__qty-field .form-control__placeholder-inner{
  color:${TX1}!important;
}
body.ml-dark .details-product-purchase__qty-label{
  color:${TX1}!important;
}
/* Miktar iç SVG'ler */
body.ml-dark .details-product-purchase__qty svg{
  color:${GOLD}!important;
  fill:${GOLD}!important;
}

/* ── SAYFALAMA (Pagination) ── */
body.ml-dark .page-link,
body.ml-dark .page-link span,
body.ml-dark .page-link a,
body.ml-dark .page-link i{
  background:${BG2}!important;
  color:${TX2}!important;
}
body.ml-dark .page-link a:hover{
  background:${BG3}!important;
  color:${GOLD}!important;
}

/* ── MİNİCART ── */
body.ml-dark .ec-minicart{
  background:transparent!important;
}

/* ── ALT NAVİGASYON İKONLARI (Ürünleri Ara, Hesabım vb.) ── */
body.ml-dark .footer-menu,
body.ml-dark .ec-store__content-wrapper [class*="footer"]{
  background:${BG2}!important;
  border-top:1px solid ${BD2}!important;
  border-bottom:none!important;
}
body.ml-dark .footer-menu a,
body.ml-dark .footer-menu svg,
body.ml-dark [class*="store-footer"] a,
body.ml-dark [class*="store-footer"] svg{
  color:${GOLD}!important;
  fill:${GOLD}!important;
}
body.ml-dark [class*="store-footer"] span{
  color:${TX2}!important;
}

/* ── CHECKOUT — Teslimat yöntemi kutuları ── */
body.ml-dark [class*="shipping"] [class*="radio"],
body.ml-dark [class*="delivery"] label,
body.ml-dark .ec-radiogroup label,
body.ml-dark [class*="checkout"] [class*="step"] label{
  background:${BG2}!important;
  color:${TX1}!important;
  border-color:${BD}!important;
}
body.ml-dark [class*="shipping"] [class*="radio"]:hover,
body.ml-dark .ec-radiogroup label:hover{
  border-color:${GOLDDIM}!important;
}
body.ml-dark [class*="shipping"] input:checked~label,
body.ml-dark [class*="shipping"] input:checked+label,
body.ml-dark .ec-radiogroup input:checked+label{
  border-color:${GOLDDIM}!important;
  background:rgba(175,140,62,.08)!important;
}

/* ── CHECKOUT — Ödeme bildirim kutuları (renkli arka planlar) ── */
body.ml-dark [class*="checkout"] [style*="background-color: rgb(255, 255, 224)"],
body.ml-dark [class*="checkout"] [style*="background-color: rgb(255, 255, 240)"],
body.ml-dark [style*="background-color: rgb(245, 212"],
body.ml-dark [style*="background-color: rgb(247, 205"]{
  background-color:rgba(175,140,62,.1)!important;
  border-color:${BD}!important;
}

/* ── SEPET SAYFA ARKA PLANI — ana bg ile aynı ── */
body.ml-dark .ec-cart-step,
body.ml-dark .ec-confirmation,
body.ml-dark [class*="checkout"]{
  background:${BG1}!important;
  color:${TX1}!important;
}
body.ml-dark .ec-cart-step__body,
body.ml-dark .ec-cart-step__section{
  background:${BG1}!important;
}

/* ── ÖNERİLEN ÜRÜNLER KAROSELİ (Bunları da Beğenebilirsiniz) ── */
body.ml-dark .product-details__related-products,
body.ml-dark [class*="related-products"],
body.ml-dark [class*="recently"]{
  overflow:visible!important;
}
body.ml-dark .product-details__related-products .grid-product__wrap,
body.ml-dark [class*="related"] .grid-product__wrap,
body.ml-dark [class*="recently"] .grid-product__wrap{
  border-radius:14px!important;
  border:none!important;
  box-shadow:
    inset 0 0 0 1px ${BD},
    0 0 0 2px ${BG1},
    0 0 0 3px ${BD2},
    0 2px 12px rgba(0,0,0,.3)!important;
  overflow:hidden!important;
}
/* Karosel scroller */
body.ml-dark .product-details__related-products,
body.ml-dark [class*="related-products"]{
  overflow:visible!important;
}

/* ── ANASAYFA CTA BUTONU (Alışverişe Devam Et / Mağazaya Git) ── */
body.ml-dark .tile-cover .cover__button,
body.ml-dark .tile-cover .cover-button,
body.ml-dark .cover__button.cover-button,
body.ml-dark .tile-cover a.cover__button,
body.ml-dark .tile-cover a.cover-button{
  background:${GOLDDIM}!important;
  background-color:${GOLDDIM}!important;
  color:#fff!important;
  border:none!important;
  border-radius:12px!important;
  font-weight:600!important;
  text-decoration:none!important;
}
body.ml-dark .tile-cover .cover__button *,
body.ml-dark .tile-cover .cover-button *{
  color:#fff!important;
  background:transparent!important;
  background-color:transparent!important;
}
body.ml-dark .tile-cover .cover__button:hover,
body.ml-dark .tile-cover .cover-button:hover,
body.ml-dark .cover__button:hover,
body.ml-dark .cover-button:hover{
  background:${GOLD}!important;
  background-color:${GOLD}!important;
  border-radius:12px!important;
  overflow:hidden!important;
}
body.ml-dark .cover__button:hover *,
body.ml-dark .cover-button:hover *{
  background:transparent!important;
  background-color:transparent!important;
  border-radius:inherit!important;
}

/* ── ECWID İKON BAR (Ürünleri Ara, Hesabım, Siparişleri İzle, Favoriler, Sepetim) ── */
body.ml-dark .ec-store__content-wrapper a,
body.ml-dark .ec-footer a svg,
body.ml-dark .ec-store [class*="icon-bar"] a,
body.ml-dark .ec-store [class*="icon-bar"] svg{
  color:${GOLD}!important;
  fill:${GOLD}!important;
}

/* ── ÜRÜN DETAY — ek düzeltmeler ── */
/* Stokta var badge genişleme düzeltme — ek güvenlik */
body.ml-dark .product-details .ec-label[class*="Stokta"],
body.ml-dark .product-details__label-container{
  display:inline-flex!important;
  width:auto!important;
  max-width:fit-content!important;
}
/* Üzeri çizili eski fiyat */
body.ml-dark .ec-price-item--old,
body.ml-dark [class*="price--old"],
body.ml-dark .grid-product__price-compare,
body.ml-dark s .ec-price-item{
  color:${TX3}!important;
}
/* Promosyon kodu linki */
body.ml-dark [class*="coupon"] a,
body.ml-dark [class*="promo"] a{
  color:${GOLD}!important;
}

/* ── PARA BİRİMİ ── */
body.ml-dark .ec-currency-converter-element select{
  background:${BG3}!important;
  color:${TX2}!important;
}

/* ── TABLAR ── */
body.ml-dark [class*="tabs__"] a,
body.ml-dark [class*="tabs__"] span{
  color:${TX2}!important;
}

/* ── PUSHMENU / MOBİL MENÜ ── */
body.ml-dark .pushmenu-btn{
  color:${TX1}!important;
}

/* ── İKONLAR / SVG ── */
body.ml-dark .ec-minicart__icon,
body.ml-dark .ec-cart-widget svg{
  color:${TX1}!important;
  fill:${TX1}!important;
}

/* ── HR & KENARLIKLARI ── */
body.ml-dark hr{border-color:${BD2}!important}

/* ── SCROLLBAR ── */
body.ml-dark ::-webkit-scrollbar{width:8px;height:8px}
body.ml-dark ::-webkit-scrollbar-track{background:${BG1}}
body.ml-dark ::-webkit-scrollbar-thumb{background:${BG3};border-radius:4px}
body.ml-dark ::-webkit-scrollbar-thumb:hover{background:${TX3}}

/* ── BADGE / ETİKET ── */
body.ml-dark [class*="label--"],
body.ml-dark .ec-label{
  background:${GOLDDIM}!important;
  color:${BG1}!important;
}
/* Stokta Yok — koyu bordo (badge + grid-product__label kurallarını ezmek için yüksek specificity) */
body.ml-dark .grid-product__label.grid-product__label--Stokta-Yok,
body.ml-dark .grid-product__label[class*="Stokta-Yok"],
body.ml-dark .grid-product__label[class*="Stokta-yok"],
body.ml-dark [class*="label--Stokta-Yok"][class*="label--Stokta-Yok"],
body.ml-dark [class*="label--Stokta-yok"],
body.ml-dark [class*="label-container"][class*="Stokta-Yok"],
body.ml-dark [class*="label-container"][class*="Stokta-yok"],
body.ml-dark .product-details__label-container.product-details__label--Stokta-Yok,
body.ml-dark .product-details__label-container.product-details__label--Stokta-yok{
  background:#8b3a3a!important;
  color:#fff!important;
  border-radius:6px!important;
}
body.ml-dark [class*="Stokta-Yok"] .label__text,
body.ml-dark [class*="Stokta-yok"] .label__text,
body.ml-dark .grid-product__label--Stokta-Yok .label__text,
body.ml-dark .grid-product__label--Stokta-yok .label__text{
  color:#fff!important;
}
/* Stokta Yok içindeki .ec-label — badge gold kuralını ez */
body.ml-dark [class*="Stokta-Yok"] .ec-label,
body.ml-dark [class*="Stokta-yok"] .ec-label,
body.ml-dark [class*="Stokta-Yok"] [class*="label--"],
body.ml-dark [class*="Stokta-yok"] [class*="label--"],
body.ml-dark .grid-product__label--Stokta-Yok .ec-label,
body.ml-dark .grid-product__label--Stokta-yok .ec-label{
  background:#8b3a3a!important;
  background-color:#8b3a3a!important;
  color:#fff!important;
}

/* ── POPUP / OVERLAY ── */
body.ml-dark .ec-modal,
body.ml-dark [class*="popup"]{
  background:${BG2}!important;
  color:${TX1}!important;
}

/* ══════════════════════════════════════
   WIDGET DARK MODE OVERRIDE
   (widget.js CSS değişkenleri)
   ══════════════════════════════════════ */
body.ml-dark .ml-overlay .ml-card{
  --mltp:#ece8df;
  --mlts:#d4cfc4;
  --mltt:#b5ae9e;
  --mlbg:${BG2};
  --mlbg2:${BG3};
  --mlbgh:#3a3930;
  --mlbd:${BD};
  --mlgl:rgba(175,140,62,.12);
}
/* Stat kutuları — gold tınılı */
body.ml-dark .ml-overlay .ml-stat{
  background:rgba(175,140,62,.08)!important;
  border-color:rgba(175,140,62,.15)!important;
}
body.ml-dark .ml-overlay .ml-stat:hover{
  background:rgba(175,140,62,.14)!important;
  border-color:rgba(175,140,62,.25)!important;
}
body.ml-dark .ml-overlay .ml-stat-num{
  color:${GOLD}!important;
}
body.ml-dark .ml-overlay .ml-stat-lbl{
  color:#b5ae9e!important;
}
/* Tier ismi — gold (tüm tier'lar) */
body.ml-dark .ml-overlay .ml-tier-name{
  color:${GOLD}!important;
}
body.ml-dark .ml-overlay .ml-tier-sub{
  color:#d4cfc4!important;
}
/* Header ortalama */
body.ml-dark .ml-overlay .ml-head{
  text-align:center!important;
  justify-content:center!important;
}
body.ml-dark .ml-overlay .ml-head-sub,
body.ml-dark .ml-overlay .ml-head-title{
  color:#b5ae9e!important;
}
/* Progress label ve hint */
body.ml-dark .ml-overlay .ml-prog-label,
body.ml-dark .ml-overlay .ml-prog-val{
  color:#d4cfc4!important;
}
body.ml-dark .ml-overlay .ml-prog-hint{
  color:#d4cfc4!important;
}
body.ml-dark .ml-overlay .ml-prog-hint b{
  color:${GOLD}!important;
}
/* Tier tablosu */
body.ml-dark .ml-overlay .ml-tier-row.current{
  background:rgba(175,140,62,.1)!important;
  border-color:rgba(175,140,62,.2)!important;
}
body.ml-dark .ml-overlay .ml-tr-name{
  color:#d4cfc4!important;
}
body.ml-dark .ml-overlay .ml-tr-info{
  color:#b5ae9e!important;
}
body.ml-dark .ml-overlay .ml-label{
  color:#b5ae9e!important;
}
/* Savings kutusu — gold tınılı */
body.ml-dark .ml-overlay .ml-savings{
  background:linear-gradient(135deg,rgba(175,140,62,.14),rgba(175,140,62,.08))!important;
  border-color:rgba(175,140,62,.2)!important;
}
body.ml-dark .ml-overlay .ml-savings-txt{
  color:#d4cfc4!important;
}
body.ml-dark .ml-overlay .ml-savings-txt b{
  color:${GOLD}!important;
}
body.ml-dark .ml-overlay .ml-savings-orders{
  border-left-color:rgba(175,140,62,.2)!important;
}
body.ml-dark .ml-overlay .ml-savings-orders-val{
  color:${GOLD}!important;
}
body.ml-dark .ml-overlay .ml-savings-orders-lbl{
  color:#b5ae9e!important;
}
body.ml-dark .ml-overlay .ml-savings-only{
  background:rgba(175,140,62,.08)!important;
}
/* Widget içi okunabilirlik */
body.ml-dark .ml-overlay .ml-card .ml-sub,
body.ml-dark .ml-overlay .ml-card [class*="desc"],
body.ml-dark .ml-overlay .ml-card [class*="info"]{
  color:#d4cfc4!important;
}
body.ml-dark .ml-overlay .ml-card .ml-val{
  color:#ece8df!important;
}
body.ml-dark .ml-overlay{
  background:rgba(0,0,0,.6)!important;
}
body.ml-dark .ml-trigger{
  background:linear-gradient(135deg,${BG2},${BG3})!important;
  border:1px solid ${BD}!important;
  color:${GOLD}!important;
}
body.ml-dark .ml-trigger:hover{
  border-color:${GOLDDIM}!important;
}
body.ml-dark .ml-tier-share{
  background:${BG3}!important;
  color:${TX2}!important;
}
body.ml-dark .ml-tr-ico{
  background:${BG3}!important;
}
body.ml-dark .ml-signin-input{
  background:${BG3}!important;
  border-color:${BD}!important;
  color:${TX1}!important;
}
body.ml-dark .ml-signin-input::placeholder{
  color:${TX3}!important;
}

/* ══════════════════════════════════════
   EKSİK ECWID BİLEŞENLERİ
   ══════════════════════════════════════ */

/* ── BİLDİRİM / TOAST ── */
body.ml-dark .ec-notice,
body.ml-dark [class*="ec-notice"],
body.ml-dark [class*="storefront__notification"],
body.ml-dark [class*="notification"]:not(.ml-overlay *){
  background:${BG2}!important;
  color:${TX1}!important;
  border-color:${BD}!important;
}

/* ── ARAMA SONUÇLARI ── */
body.ml-dark [class*="search-result"],
body.ml-dark [class*="search-product"],
body.ml-dark .ec-search{
  background:${BG1}!important;
  color:${TX1}!important;
}
body.ml-dark [class*="search-result"] [class*="title"],
body.ml-dark [class*="search-product"] [class*="title"]{
  color:${TX1}!important;
}
body.ml-dark [class*="search-result"] [class*="price"]{
  color:${GOLD}!important;
}

/* ── HESABIM / SİPARİŞLERİM ── */
body.ml-dark [class*="ec-my-account"],
body.ml-dark [class*="my-account"],
body.ml-dark .ec-account{
  background:${BG1}!important;
  color:${TX1}!important;
}
body.ml-dark [class*="ec-order"],
body.ml-dark [class*="order-item"],
body.ml-dark [class*="order-details"]{
  background:${BG2}!important;
  color:${TX1}!important;
  border-color:${BD}!important;
}
body.ml-dark [class*="ec-order"] [class*="title"],
body.ml-dark [class*="order-item"] [class*="title"]{
  color:${TX1}!important;
}
body.ml-dark [class*="ec-order"] [class*="price"],
body.ml-dark [class*="order-item"] [class*="price"]{
  color:${GOLD}!important;
}
body.ml-dark [class*="ec-order"] [class*="status"]{
  color:${GOLD}!important;
}

/* ── FAVORİLER ── */
body.ml-dark [class*="ec-favs"],
body.ml-dark [class*="favorites"]{
  background:${BG1}!important;
  color:${TX1}!important;
}

/* ── LOADER / SPİNNER ── */
body.ml-dark .ec-loader,
body.ml-dark [class*="ec-loader"]{
  background:${BG1}!important;
}
body.ml-dark .ec-loader svg,
body.ml-dark [class*="ec-loader"] svg{
  color:${GOLD}!important;
  fill:${GOLD}!important;
}
`;

// ─── STYLE ENJEKSİYONU ───
var styleEl=document.createElement('style');
styleEl.id='ml-dark-mode';
styleEl.textContent=css;
document.head.appendChild(styleEl);

// ─── SVG İKONLARI ───
var moonIco='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/></svg>';
var sunIco='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';

// ─── TOGGLE BUTON OLUŞTUR ───
var btn=document.createElement('button');
btn.className='ml-dm-btn';
btn.setAttribute('aria-label','Karanlık mod');
btn.setAttribute('title','Karanlık / Aydınlık Mod');
btn.innerHTML=moonIco;

// ─── TOGGLE FONKSİYONU ───

function toggle(){
  document.body.classList.add('ml-dm-t');
  document.body.classList.toggle('ml-dark');
  var dark=document.body.classList.contains('ml-dark');
  btn.innerHTML=dark?sunIco:moonIco;
  try{localStorage.setItem('ml-dark',dark?'1':'0');}catch(e){}
  setTimeout(function(){document.body.classList.remove('ml-dm-t');},350);
  setTimeout(fixAll,100);
  setTimeout(fixAll,500); // Ecwid geç render için ikinci pas
}

btn.addEventListener('click',function(e){
  e.stopPropagation();
  e.preventDefault();
  toggle();
});

// ─── SAYFA HAZIR OLUNCA EKLE ───
function init(){
  // Nav bar'da "Bize ulaşın" linkini bul, sağına ekle
  var placed=false;
  var navLinks=document.querySelectorAll('.menu a, nav a, .nav a, [class*="menu"] a');
  for(var i=0;i<navLinks.length;i++){
    if(navLinks[i].textContent.trim().indexOf('Bize')>-1){
      // Link'in parent'ına ekle
      var parent=navLinks[i].parentElement;
      btn.style.marginLeft='12px';
      btn.style.display='inline-flex';
      btn.style.verticalAlign='middle';
      if(navLinks[i].nextSibling){
        parent.insertBefore(btn,navLinks[i].nextSibling);
      }else{
        parent.appendChild(btn);
      }
      placed=true;
      break;
    }
  }
  // Fallback — nav bulunamazsa fixed wrapper
  if(!placed){
    var wrap=document.createElement('div');
    wrap.id='ml-dm-wrap';
    wrap.setAttribute('style','position:fixed!important;top:14px!important;right:16px!important;z-index:999999!important;pointer-events:auto!important;');
    wrap.appendChild(btn);
    (document.documentElement||document.body).appendChild(wrap);
  }
  // Kayıtlı tercihi yükle
  try{
    if(localStorage.getItem('ml-dark')==='1'){
      document.body.classList.add('ml-dark');
      btn.innerHTML=sunIco;
    }
  }catch(e){}
  // Ecwid-proof düzeltmeleri uygula + observer başlat
  fixAll();
  setTimeout(fixAll,1000); // Ecwid geç yükleme için
  setTimeout(fixAll,3000); // Ürün sayfası geç render için
  // Observer'ı başlat
  _observer.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class','style']});
}

// ═══════════════════════════════════════════════════════
// ECWID-PROOF JS ENFORCEMENT LAYER
// CSS'e güvenme — inline style + DOM injection
// Ecwid ne yaparsa yapsın, bu her seferinde düzeltir
// ═══════════════════════════════════════════════════════

var _fixTimer=null;
function fixAll(){
  // Debounce — Ecwid çok sık DOM değiştirir
  clearTimeout(_fixTimer);
  _fixTimer=setTimeout(_fixAllNow,80);
}
function _fixAllNow(){
  var dark=document.body.classList.contains('ml-dark');
  fixStokYok();
  if(dark){
    fixSelects();
    fixSweep();
    fixButtonText();
    fixBadgeRect();
  }else{
    cleanAll();
  }
}

// ─── TEMİZLİK (light mode'a dönünce) ───
function cleanAll(){
  cleanStokYok();
  // Sweep overlay'ları kaldır
  document.querySelectorAll('.ml-sweep').forEach(function(el){el.remove();});
  // Select wrapper position temizle
  document.querySelectorAll('.form-control--select').forEach(function(el){
    el.style.removeProperty('position');
  });
}

// ─── STOKTA YOK — INLINE STYLE TEMİZLİĞİ ───
function cleanStokYok(){
  document.querySelectorAll('[class*="Stokta-Yok"],[class*="Stokta-yok"],[class*="stokta-yok"]').forEach(function(l){
    l.style.removeProperty('background');l.style.removeProperty('background-color');l.style.removeProperty('color');
    l.querySelectorAll('.ec-label,[class*="label--"],.label__text').forEach(function(el){
      el.style.removeProperty('background');el.style.removeProperty('background-color');el.style.removeProperty('color');
    });
  });
}

// ─── STOKTA YOK LABEL ───
function fixStokYok(){
  if(!document.body.classList.contains('ml-dark')){cleanStokYok();return;}
  document.querySelectorAll('[class*="Stokta-Yok"],[class*="Stokta-yok"],[class*="stokta-yok"]').forEach(function(l){
    l.style.setProperty('background','#8b3a3a','important');
    l.style.setProperty('background-color','#8b3a3a','important');
    l.style.setProperty('color','#fff','important');
    l.querySelectorAll('.ec-label,[class*="label--"],.label__text').forEach(function(el){
      el.style.setProperty('background','#8b3a3a','important');
      el.style.setProperty('background-color','#8b3a3a','important');
      el.style.setProperty('color','#fff','important');
    });
  });
}

// ─── SELECT WRAPPER POSITION ───
// CSS placeholder kuralları .form-control--empty class'ına bağlı (Ecwid otomatik toggle eder)
// JS sadece wrapper'ın position:relative olduğundan emin olur
function fixSelects(){
  document.querySelectorAll('.form-control--select').forEach(function(w){
    w.style.setProperty('position','relative','important');
  });
}

// ─── SWEEP ANİMASYONU — SADECE SEPETE EKLE DOM INJECTION ───
// Opsiyonlar tamamen CSS ile yönetilir (inline style = hover bozulur)
function fixSweep(){
  // Sepete Ekle butonu — wrapper'a <div> inject
  var atb=document.querySelector('.details-product-purchase__add-to-bag');
  if(atb){
    atb.style.setProperty('position','relative','important');
    atb.style.setProperty('overflow','hidden','important');
    atb.style.setProperty('border-radius','10px','important');
    if(!atb.querySelector('.ml-sweep')){
      var sw=document.createElement('div');
      sw.className='ml-sweep';
      sw.style.cssText='position:absolute;top:0;left:-100%;width:60%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent);animation:mlsweep 3s ease-in-out infinite;pointer-events:none;z-index:1;border-radius:inherit;';
      atb.appendChild(sw);
    }
    // Hover → sweep duraklat
    atb.onmouseenter=function(){var s=atb.querySelector('.ml-sweep');if(s)s.style.animationPlayState='paused';};
    atb.onmouseleave=function(){var s=atb.querySelector('.ml-sweep');if(s)s.style.animationPlayState='running';};
  }
  // Opsiyon butonları — sadece eski sweep div'leri temizle, CSS ::after halleder
  document.querySelectorAll('.form-control--checkbox-button .form-control__inline-label .ml-sweep').forEach(function(el){el.remove();});
}

// ─── BUTON TEXT RENKLERİ ───
// Sadece text rengi — bg inline koymak hover'ı bozar
function fixButtonText(){
  // Primary buton text — mutlak #fff
  document.querySelectorAll('.form-control--primary .form-control__button-text').forEach(function(el){
    el.style.setProperty('color','#fff','important');
  });
  document.querySelectorAll('.form-control--primary .form-control__button-svg,.form-control--primary .form-control__button-svg svg').forEach(function(el){
    el.style.setProperty('color','#fff','important');
    el.style.setProperty('fill','#fff','important');
  });
  // Secondary buton text
  document.querySelectorAll('.form-control--secondary .form-control__button-text').forEach(function(el){
    el.style.setProperty('color','#ece8df','important');
  });
}

// ─── STOKTA VAR BADGE DİKDÖRTGEN ───
function fixBadgeRect(){
  document.querySelectorAll('.product-details .ec-label').forEach(function(el){
    el.style.setProperty('display','inline-block','important');
    el.style.setProperty('width','auto','important');
    el.style.setProperty('max-width','fit-content','important');
    el.style.setProperty('padding','4px 12px','important');
    el.style.setProperty('border-radius','4px','important');
    el.style.setProperty('white-space','nowrap','important');
    el.style.setProperty('box-sizing','border-box','important');
    el.style.setProperty('line-height','1.4','important');
  });
}

// ─── OBSERVER — Ecwid her DOM değişikliğinde fixAll çağır ───
var _observer=new MutationObserver(fixAll);


if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',init);
}else{
  init();
}

})();
