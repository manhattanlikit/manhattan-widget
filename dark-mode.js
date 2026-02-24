// Manhattan Likit — Dark Mode v2.7f
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
body.ml-dm-t .tiles-wrapper,
body.ml-dm-t .menu,
body.ml-dm-t .store,
body.ml-dm-t .footer,
body.ml-dm-t .footer-new,
body.ml-dm-t .grid-product__wrap,
body.ml-dm-t .grid-product__wrap-inner,
body.ml-dm-t .grid-category__card,
body.ml-dm-t .ml-dm-btn,
body.ml-dm-t .ec-cart,
body.ml-dm-t .ec-store,
body.ml-dm-t h1,body.ml-dm-t h2,body.ml-dm-t h3,
body.ml-dm-t p,body.ml-dm-t a,body.ml-dm-t span,
body.ml-dm-t .tile,
body.ml-dm-t [class*="tile-"],
body.ml-dm-t .product-details,
body.ml-dm-t .cover__button,
body.ml-dm-t .cover-button,
body.ml-dm-t .form-control__button,
body.ml-dm-t input,body.ml-dm-t textarea,body.ml-dm-t select{
  transition:background-color .35s ease,color .35s ease,border-color .35s ease!important;
}

/* ── TOGGLE BUTON ── */
.ml-dm-btn{
  z-index:999999;
  width:40px;height:40px;border-radius:10px;
  border:2px solid #a07830;
  background:transparent;
  backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
  color:#a07830;
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;
  box-shadow:0 2px 6px rgba(160,120,48,.25);
  transition:background .25s ease,border-color .25s ease,color .25s ease,box-shadow .25s ease,transform .25s ease;
  padding:0;
  pointer-events:auto;
  overflow:hidden;
}
/* Hover açık: #6 Sıcak İç Glow */
.ml-dm-btn:hover{
  border-color:#a07830;
  color:#a07830;
  background:transparent;
  box-shadow:0 2px 8px rgba(160,120,48,.3), inset 0 0 10px rgba(160,120,48,.08);
}
.ml-dm-btn svg{width:18px;height:18px;transition:color .25s ease}
.ml-dm-btn:active svg{transform:rotate(15deg) scale(.9)}

/* Dark mode base: #7 Antik + Parlak Gölge */
body.ml-dark .ml-dm-btn{
  background:rgba(35,34,30,.55);
  border-color:rgba(160,120,48,.35);
  color:${GOLD};
  box-shadow:0 2px 10px rgba(0,0,0,.2), 0 0 12px rgba(175,140,62,.06);
  overflow:hidden;
}
/* Hover dark: #7 Altın Glow Ring */
body.ml-dark .ml-dm-btn:hover{
  background:rgba(45,44,38,.85);
  border-color:${GOLD};
  color:${GOLD};
  box-shadow:0 0 0 3px rgba(212,176,94,.1), 0 2px 12px rgba(0,0,0,.25), 0 0 18px rgba(212,176,94,.08);
}

@media(max-width:768px){
  .ml-dm-btn{width:34px;height:34px;border-radius:8px}
  .ml-dm-btn svg{width:15px;height:15px}
}

/* ══════════════════════════════════════
   DARK MODE ANA KURALLAR
   ══════════════════════════════════════ */

/* ── BODY & GENEL ── */
body.ml-dark,
html:has(body.ml-dark){
  background:${BG1}!important;
  color:${TX1}!important;
}
/* Text selection + cursor */
body.ml-dark ::selection{
  background:rgba(175,140,62,.35)!important;
  color:${TX1}!important;
}
body.ml-dark input,
body.ml-dark textarea{
  caret-color:${GOLD}!important;
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
body.ml-dark .whyus,
body.ml-dark .contacts,
body.ml-dark .owner,
body.ml-dark .store,
body.ml-dark .dynamic-product-browser{
  background:${BG1}!important;
  color:${TX1}!important;
  overflow:visible!important;
}
body.ml-dark .caption{
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

/* ── HAKKINDA / ABOUT BÖLÜMÜ — gold başlık + underline ── */
body.ml-dark .tile-about h1,
body.ml-dark .tile-about h2,
body.ml-dark .tile-about h3,
body.ml-dark .tile-about h4,
body.ml-dark .owner h1,
body.ml-dark .owner h2,
body.ml-dark .owner h3,
body.ml-dark .owner h4,
body.ml-dark .whyus h1,
body.ml-dark .whyus h2,
body.ml-dark .whyus h3,
body.ml-dark .whyus h4,
body.ml-dark .contacts h1,
body.ml-dark .contacts h2,
body.ml-dark .contacts h3,
body.ml-dark .contacts h4{
  color:${GOLD}!important;
}
body.ml-dark .tile-about a,
body.ml-dark .owner a,
body.ml-dark .whyus a,
body.ml-dark .contacts a{
  color:${GOLD}!important;
  text-decoration-color:${GOLDDIM}!important;
}
body.ml-dark .tile-about a:hover,
body.ml-dark .owner a:hover,
body.ml-dark .whyus a:hover,
body.ml-dark .contacts a:hover{
  color:${GOLD}!important;
  text-decoration-color:${GOLD}!important;
}
body.ml-dark .tile-about p,
body.ml-dark .tile-about span,
body.ml-dark .tile-about div,
body.ml-dark .owner p,
body.ml-dark .owner span,
body.ml-dark .owner div,
body.ml-dark .whyus p,
body.ml-dark .whyus span,
body.ml-dark .whyus div,
body.ml-dark .contacts p,
body.ml-dark .contacts span,
body.ml-dark .contacts div{
  color:${TX1}!important;
}
/* Hakkında underline elementleri */
body.ml-dark .tile-about u,
body.ml-dark .tile-about [style*="underline"],
body.ml-dark .owner u,
body.ml-dark .owner [style*="underline"],
body.ml-dark .whyus u,
body.ml-dark .whyus [style*="underline"]{
  color:${GOLD}!important;
  text-decoration-color:${GOLDDIM}!important;
}
/* Hakkında ikincil metin */
body.ml-dark .tile-about .tile__description,
body.ml-dark .tile-about [class*="description"],
body.ml-dark .owner [class*="description"]{
  color:${TX2}!important;
}
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
  border:none!important;
  outline:none!important;
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
/* picture-additional: Ecwid hover 2. görsel — background-image'a DOKUNMA */
body.ml-dark .grid-product__picture-additional{
  border-radius:12px 12px 0 0!important;
}
body.ml-dark .grid-product__image img,
body.ml-dark .grid-product__picture img,
body.ml-dark .grid-product__picture-wrapper img{
  background:transparent!important;
}
/* ── TÜM ÜRÜN GÖRSELLERİ — yumuşak köşe ── */
body.ml-dark .grid-product__image img,
body.ml-dark .grid-product__picture img,
body.ml-dark .grid-product__picture-wrapper img,
body.ml-dark .details-gallery img,
body.ml-dark .details-gallery__thumb img,
body.ml-dark .details-gallery__thumb-bg img,
body.ml-dark .ec-cart-item img,
body.ml-dark [class*="cart-item"] img,
body.ml-dark [class*="recently"] img,
body.ml-dark [class*="related"] img,
body.ml-dark .product-details__related-products img{
  border-radius:12px!important;
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

/* ── STATİK SAYFALAR (Şartlar, Gizlilik, İade, vb.) ── */
body.ml-dark .ec-page-body,
body.ml-dark [class*="page-body"],
body.ml-dark [class*="page-content"],
body.ml-dark [class*="legal"],
body.ml-dark [class*="store-page"],
body.ml-dark [class*="ec-page"],
body.ml-dark .ec-store__content-wrapper{
  background-color:${BG1}!important;
  color:${TX1}!important;
}
body.ml-dark .ec-page-body *,
body.ml-dark [class*="page-body"] *,
body.ml-dark [class*="page-content"] *,
body.ml-dark [class*="legal"] *,
body.ml-dark [class*="ec-page"] *{
  color:${TX1}!important;
}
body.ml-dark .ec-page-body div,
body.ml-dark .ec-page-body section,
body.ml-dark .ec-page-body article{
  background-color:${BG1}!important;
}
body.ml-dark .ec-page-body h1,
body.ml-dark .ec-page-body h2,
body.ml-dark .ec-page-body h3,
body.ml-dark .ec-page-body h4{
  color:${GOLD}!important;
}
body.ml-dark .ec-page-body p,
body.ml-dark .ec-page-body li,
body.ml-dark .ec-page-body span{
  color:${TX2}!important;
}
body.ml-dark .ec-page-body strong,
body.ml-dark .ec-page-body b{
  color:${TX1}!important;
}
body.ml-dark .ec-page-body a{
  color:${GOLD}!important;
}
body.ml-dark .ec-page-body details,
body.ml-dark .ec-page-body summary,
body.ml-dark .ec-page-body [class*="accordion"],
body.ml-dark .ec-page-body [class*="collapse"]{
  background:${BG2}!important;
  color:${TX1}!important;
  border-color:${BD}!important;
}
/* Statik sayfa — hover/focus/active beyaz flash önle */
body.ml-dark .ec-page-body summary:hover,
body.ml-dark .ec-page-body details summary:hover,
body.ml-dark .ec-page-body [class*="accordion"]:hover,
body.ml-dark .ec-page-body [onclick]:hover,
body.ml-dark .ec-page-body [role="button"]:hover,
body.ml-dark .ec-page-body [class*="toggle"]:hover,
body.ml-dark .ec-page-body [class*="expand"]:hover,
body.ml-dark .ec-page-body [class*="collaps"]:hover{
  background-color:${BG3}!important;
  color:${TX1}!important;
}
body.ml-dark .ec-page-body summary:focus,
body.ml-dark .ec-page-body details:focus,
body.ml-dark .ec-page-body details[open] summary{
  background-color:${BG2}!important;
  outline:none!important;
}
body.ml-dark .ec-page-body table,
body.ml-dark .ec-page-body td,
body.ml-dark .ec-page-body th,
body.ml-dark .ec-page-body tr{
  background:transparent!important;
  color:${TX1}!important;
  border-color:${BD}!important;
}
/* ── İADE / ŞARTLAR / GİZLİLİK — ml-*-wrapper dark mode ── */
body.ml-dark [class*="ml-"][class*="-wrapper"]{
  background:${BG1}!important;
  color:${TX1}!important;
}
body.ml-dark [class*="ml-"][class*="-wrapper"] h1,
body.ml-dark [class*="ml-"][class*="-wrapper"] h3,
body.ml-dark [class*="ml-"][class*="-wrapper"] h4{
  color:${GOLD}!important;
}
body.ml-dark [class*="ml-"][class*="-wrapper"] p,
body.ml-dark [class*="ml-"][class*="-wrapper"] li,
body.ml-dark [class*="ml-"][class*="-wrapper"] span{
  color:${TX2}!important;
}
body.ml-dark [class*="ml-"][class*="-wrapper"] strong,
body.ml-dark [class*="ml-"][class*="-wrapper"] b{
  color:${TX1}!important;
}
body.ml-dark [class*="ml-"][class*="-wrapper"] a{
  color:${GOLD}!important;
}
body.ml-dark [class*="ml-"][class*="-wrapper"] .ml-card,
body.ml-dark [class*="ml-"][class*="-wrapper"] .ml-detail-box,
body.ml-dark [class*="ml-"][class*="-wrapper"] .ml-detail-content{
  background:${BG2}!important;
  border-color:${BD}!important;
}
body.ml-dark [class*="ml-"][class*="-wrapper"] .ml-card-header{
  border-bottom-color:${BD}!important;
}
body.ml-dark [class*="ml-"][class*="-wrapper"] .ml-detail-title{
  color:${TX1}!important;
}
body.ml-dark [class*="ml-"][class*="-wrapper"] .ml-detail-title:hover{
  background:${BG3}!important;
}
body.ml-dark [class*="ml-"][class*="-wrapper"] .ml-tag{
  background:${BG3}!important;
  color:${TX2}!important;
}
body.ml-dark [class*="ml-"][class*="-wrapper"] .ml-highlight{
  background:rgba(5,150,105,.08)!important;
  border-color:rgba(5,150,105,.25)!important;
}
body.ml-dark [class*="ml-"][class*="-wrapper"] .ml-time{
  background:${BG3}!important;
  color:${TX2}!important;
}
body.ml-dark [class*="ml-"][class*="-wrapper"] .ml-trust{
  border-top-color:${BD}!important;
}
body.ml-dark [class*="ml-"][class*="-wrapper"] .ml-trust-icon{
  background:${GOLD}!important;
  color:${BG1}!important;
}
body.ml-dark [class*="ml-"][class*="-wrapper"] .ml-trust-item h4{
  color:${TX1}!important;
}
body.ml-dark [class*="ml-"][class*="-wrapper"] .ml-support{
  border-top-color:rgba(5,150,105,.2)!important;
  color:${TX3}!important;
}
body.ml-dark [class*="ml-"][class*="-wrapper"] .ml-footer strong{
  color:${GOLD}!important;
}
body.ml-dark [class*="ml-"][class*="-wrapper"] .ml-label{
  color:${TX3}!important;
}
body.ml-dark [class*="ml-"][class*="-wrapper"] .ml-card ul li+li{
  border-top-color:${BD}!important;
}
body.ml-dark [class*="ml-"][class*="-wrapper"] .ml-arrow{
  color:${TX3}!important;
}
body.ml-dark [class*="ml-"][class*="-wrapper"] .ml-detail-content{
  border-top-color:${BD}!important;
}
/* ── ÜRÜN AÇIKLAMALARI ── */
body.ml-dark .product-details__description{
  color:${TX2}!important;
  background:transparent!important;
}
body.ml-dark .product-details__description p,
body.ml-dark .product-details__description span,
body.ml-dark .product-details__description li,
body.ml-dark .product-details__description td{
  color:${TX2}!important;
}
body.ml-dark .product-details__description h1,
body.ml-dark .product-details__description h2,
body.ml-dark .product-details__description h3,
body.ml-dark .product-details__description h4,
body.ml-dark .product-details__description h5,
body.ml-dark .product-details__description strong,
body.ml-dark .product-details__description b{
  color:${GOLD}!important;
}
body.ml-dark .product-details__description a{
  color:${GOLD}!important;
}
/* ── SALT/ÜRÜN HTML .D CLASS + ÖZEL DARK MOD ── */
body.ml-dark .product-details__description .D h1,
body.ml-dark .product-details__description .D h2,
body.ml-dark .product-details__description .D h3{
  color:${GOLD}!important;
}
body.ml-dark .product-details__description .mn-link{
  color:${TX3}!important;
  border-color:rgba(175,140,62,.25)!important;
}
body.ml-dark .product-details__description .mn-link:hover{
  color:${GOLD}!important;
  border-color:rgba(175,140,62,.5)!important;
  background:rgba(175,140,62,.08)!important;
}

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
@keyframes mlCheckPulse{
  0%{box-shadow:0 0 0 0 rgba(175,140,62,.5)}
  70%{box-shadow:0 0 0 8px rgba(175,140,62,0)}
  100%{box-shadow:0 0 0 0 rgba(175,140,62,0)}
}
/* Agreement checkbox — unchecked dikkat çekici */
body.ml-dark .ml-agree-pulse .form-control__checkbox-view{
  animation:mlCheckPulse 1.5s ease-in-out infinite!important;
  border-color:${GOLD}!important;
}
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
  background:linear-gradient(135deg,#af8c3e,#d4b05e)!important;
  background-color:#af8c3e!important;
  color:#fff!important;
  border:none!important;
  border-radius:12px!important;
  overflow:hidden!important;
  position:relative!important;
  text-decoration:none!important;
}
body.ml-dark .cover__button *:not(.ml-sweep),
body.ml-dark .cover-button *:not(.ml-sweep){
  color:#fff!important;
  background:transparent!important;
  background-color:transparent!important;
}

/* ── FORM / INPUT ── */
body.ml-dark input:not([type="checkbox"]):not([type="radio"]),
body.ml-dark textarea,
body.ml-dark select{
  background:#3d3c36!important;
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
/* ── BOŞ SELECT — Ecwid doğal akış, sadece renkler ── */
body.ml-dark .form-control--empty input.form-control__text{
  color:transparent!important;
}
body.ml-dark .form-control--empty .form-control__placeholder,
body.ml-dark .form-control--empty .form-control__placeholder-inner{
  color:${TX2}!important;
  opacity:1!important;
  visibility:visible!important;
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
/* Checkout radiogroup — radio gold override */
body.ml-dark .ec-radiogroup input[type="radio"],
body.ml-dark .ec-radiogroup .form-control__radio,
body.ml-dark .form-control__radio{
  accent-color:${GOLD}!important;
}
body.ml-dark .ec-radiogroup input[type="radio"]:checked,
body.ml-dark .ec-radiogroup .form-control__radio:checked,
body.ml-dark .form-control__radio:checked{
  accent-color:${GOLD}!important;
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
  background:transparent!important;
  border-color:transparent!important;
}
body.ml-dark .form-control__radio-view::after,
body.ml-dark .ml-radio-fix::after{
  background:transparent!important;
  border-color:transparent!important;
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
body.ml-dark .form-control__radio:checked ~ .form-control__radio-view::after,
body.ml-dark .form-control__radio:checked + .form-control__radio-view::after,
body.ml-dark .form-control__radio:checked ~ .ml-radio-fix::after,
body.ml-dark .form-control__radio:checked + .ml-radio-fix::after{
  background:#fff!important;
  border-color:#fff!important;
}
body.ml-dark .form-control__radio-view{
  border-color:${BD}!important;
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
/* Sepet ürün seçenekleri — gri (TX3) → okunabilir (TX2/TX1) */
body.ml-dark .ec-cart-item__options,
body.ml-dark .ec-cart-item__option{
  color:${TX2}!important;
}
body.ml-dark .ec-cart-option--key{
  color:${TX2}!important;
}
body.ml-dark .ec-cart-option--value{
  color:${TX1}!important;
}
/* ── SEPET ÖZET TABLOSU (Ürünler, İndirim, Kargo, Toplam) ── */
body.ml-dark .ec-cart-summary__row{
  color:${TX2}!important;
  border-color:${BD}!important;
}
body.ml-dark .ec-cart-summary__cell--price{
  color:${TX2}!important;
}
body.ml-dark .ec-cart-summary__row--total{
  color:${TX1}!important;
  border-color:${BD2}!important;
}
body.ml-dark .ec-cart-summary__row--total .ec-cart-summary__cell--price{
  color:${GOLD}!important;
}
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
  background:${BG2}!important;
  color:${TX3}!important;
  border:1px solid ${BD}!important;
  border-radius:14px!important;
  margin:12px auto!important;
  max-width:90%!important;
  padding:8px 0!important;
}
body.ml-dark .ec-footer a{color:${GOLD}!important;background:transparent!important}
body.ml-dark .ec-footer a:hover{color:${TX1}!important}
/* Footer iç — hepsi transparent, border yok */
body.ml-dark .ec-footer *{
  border:none!important;
  background:transparent!important;
}

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
/* ══ ECWID İÇ LABEL BORDER KILL ══ */
/* Ecwid .ec-size .ec-store ile 5-class specificity kullanıyor */
/* Aynı prefix + body.ml-dark ile eziyoruz (6-class) */
body.ml-dark .ec-size .ec-store .form-control--checkbox-button .form-control__inline-label label,
body.ml-dark .ec-size .ec-store .form-control--checkbox-button .form-control__inline-label label:hover,
body.ml-dark .ec-size .ec-store .form-control--checkbox-button .form-control__inline-label label:active,
body.ml-dark .ec-size .ec-store .form-control--checkbox-button .form-control__inline-label label:focus,
body.ml-dark .ec-size .ec-store .form-control--checkbox-button .form-control__radio:checked~.form-control__inline-label label,
body.ml-dark .ec-size .ec-store .form-control--checkbox-button .form-control__radio:checked~.form-control__inline-label label:hover,
body.ml-dark .ec-size .ec-store .form-control--checkbox-button .form-control__radio:checked~.form-control__inline-label label:active,
body.ml-dark .form-control--checkbox-button .form-control__inline-label label,
body.ml-dark .form-control--checkbox-button .form-control__inline-label label:hover,
body.ml-dark .form-control--checkbox-button .form-control__inline-label label:active{
  border:none!important;
  border-color:transparent!important;
  box-shadow:none!important;
  outline:none!important;
  background:transparent!important;
}
/* ::after pseudo sweep kaldır — JS _injectSweep kullanıyoruz */
.form-control--checkbox-button .form-control__radio:checked+.form-control__inline-label::after,
body.ml-dark .form-control--checkbox-button .form-control__radio:checked+.form-control__inline-label::after{
  content:none!important;
  display:none!important;
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
  border-color:${BD2}!important;
}

/* ── ALT NAVİGASYON İKONLARI (Ürünleri Ara, Hesabım vb.) ── */
body.ml-dark .footer-menu{
  background:${BG2}!important;
  border:1px solid ${BD}!important;
  border-radius:14px!important;
  margin:12px auto!important;
  max-width:90%!important;
  padding:8px 0!important;
}
/* Footer iç elementler — border YOK */
body.ml-dark .footer-menu *{
  border:none!important;
  background:transparent!important;
}
body.ml-dark .footer-menu a,
body.ml-dark .footer-menu svg,
body.ml-dark [class*="store-footer"] a,
body.ml-dark [class*="store-footer"] svg{
  color:${GOLD}!important;
  fill:${GOLD}!important;
}
/* Footer nav cell — ortalanmış, eşit aralık */
body.ml-dark .ec-footer__cell{
  text-align:center!important;
  flex:1!important;
  padding:6px 2px!important;
  font-size:11px!important;
  line-height:1.2!important;
  overflow:hidden!important;
}
body.ml-dark .ec-footer__cell a{
  font-size:11px!important;
  display:flex!important;
  flex-direction:column!important;
  align-items:center!important;
  gap:2px!important;
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
  box-shadow:none!important;
}
/* Ecwid high specificity override — blue box-shadow + border kill */
body.ml-dark .ec-size .ec-store .ec-radiogroup label,
body.ml-dark .ec-size .ec-store .ec-radiogroup__item label,
body.ml-dark .ec-size .ec-store .ec-radiogroup__item,
body.ml-dark .ec-size .ec-store .ec-radiogroup input:checked+label,
body.ml-dark .ec-size .ec-store .ec-radiogroup input:checked~label{
  border-color:${BD}!important;
  box-shadow:none!important;
}
body.ml-dark [class*="shipping"] [class*="radio"]:hover,
body.ml-dark .ec-radiogroup label:hover{
  border-color:${GOLDDIM}!important;
}
body.ml-dark [class*="shipping"] input:checked~label,
body.ml-dark [class*="shipping"] input:checked+label,
body.ml-dark .ec-radiogroup input:checked+label,
body.ml-dark .ec-size .ec-store .ec-radiogroup input:checked+label{
  border-color:${GOLD}!important;
  background:rgba(175,140,62,.08)!important;
  box-shadow:0 0 0 1px ${GOLD}, 0 0 0 1px ${GOLD} inset!important;
}
/* Radiogroup item arası beyaz çizgi */
body.ml-dark .ec-radiogroup__item{
  border-color:${BD2}!important;
  box-shadow:none!important;
}

/* ── FİLTRE SIDEBAR (Cümle ile ara, Stok, Marka, Fiyat) ── */
/* Aktif filtre tag/chip'leri */
body.ml-dark .ec-pill,
body.ml-dark .ec-pill--small{
  background:${BG2}!important;
  color:${TX1}!important;
  border:1px solid ${BD}!important;
  border-radius:16px!important;
}
body.ml-dark .ec-pill__text,
body.ml-dark .ec-pill__text-inner{
  color:${TX1}!important;
}
body.ml-dark .ec-pill__control,
body.ml-dark .ec-pill__control-inner{
  color:${TX2}!important;
}
body.ml-dark .ec-filters__applied,
body.ml-dark .ec-filters__applied-body,
body.ml-dark .ec-filters__applied-head{
  background:transparent!important;
  color:${TX1}!important;
}
body.ml-dark [class*="ec-filter"] [class*="tag"],
body.ml-dark [class*="ec-filter"] [class*="chip"],
body.ml-dark [class*="ec-filter"] [class*="pill"],
body.ml-dark [class*="ec-filter"] [class*="applied"],
body.ml-dark [class*="filter-applied"],
body.ml-dark [class*="applied-filter"],
body.ml-dark .ec-filter [class*="tag"],
body.ml-dark .ec-filter [class*="selected"]{
  background:${BG3}!important;
  color:${TX1}!important;
  border-color:${BD}!important;
}
body.ml-dark .ec-filter,
body.ml-dark [class*="ec-filter"],
body.ml-dark .ec-filter__body{
  background:${BG1}!important;
  color:${TX1}!important;
}
body.ml-dark .ec-openable-block,
body.ml-dark .ec-filter .ec-openable-block{
  background:${BG1}!important;
  color:${TX1}!important;
}
body.ml-dark [class*="filter-section-sticky-bar"]::before,
body.ml-dark [class*="filter-section-sticky-bar"]::after,
body.ml-dark [class*="filters-sticky-bar"]::before,
body.ml-dark [class*="filters-sticky-bar"]::after{
  background:${BG1}!important;
}
body.ml-dark .ec-filter input[type="text"],
body.ml-dark .ec-filter input[type="number"],
body.ml-dark .ec-filter input[type="search"],
body.ml-dark [class*="ec-filter"] input{
  background:${BG3}!important;
  color:${TX1}!important;
  border-color:${BD}!important;
}
body.ml-dark .ec-filter label,
body.ml-dark [class*="ec-filter"] label{
  color:${TX1}!important;
}
/* Checkbox gold — tüm site */
body.ml-dark input[type="checkbox"]{
  accent-color:${GOLD}!important;
}
body.ml-dark .form-control__checkbox-view{
  border:1.5px solid rgba(175,140,62,.5)!important;
  background:${BG1}!important;
  border-radius:3px!important;
}
body.ml-dark .form-control__checkbox:checked~.form-control__checkbox-view,
body.ml-dark .form-control__checkbox:checked+.form-control__checkbox-view{
  background:${GOLD}!important;
  border-color:${GOLD}!important;
}
/* Fiyat range slider — gold */
body.ml-dark .ec-filter [class*="range"],
body.ml-dark [class*="range-slider"]{
  accent-color:${GOLD}!important;
}
body.ml-dark .ec-filter [class*="range"] [class*="track"],
body.ml-dark [class*="range-slider"] [class*="track"]{
  background:${BD}!important;
}
body.ml-dark .ec-filter [class*="range"] [class*="fill"],
body.ml-dark [class*="range-slider"] [class*="fill"],
body.ml-dark .ec-filter [class*="range"] [class*="active"]{
  background:${GOLD}!important;
}
body.ml-dark .ec-filter [class*="range"] [class*="thumb"],
body.ml-dark [class*="range-slider"] [class*="thumb"],
body.ml-dark .ec-filter [class*="range"] [class*="handle"]{
  background:${TX1}!important;
  border-color:${GOLD}!important;
}
/* Filtre separator çizgiler */
body.ml-dark .ec-filter__section,
body.ml-dark [class*="ec-filter"] [class*="section"],
body.ml-dark .ec-filter hr,
body.ml-dark .ec-filter__item{
  border-color:${BD2}!important;
}
/* Fiyat range slider — Ecwid ec-range class'ları */
body.ml-dark .ec-range__slider{
  background:${GOLD}!important;
}
body.ml-dark .ec-range__runner{
  background:${GOLD}!important;
  border-color:${GOLD}!important;
  box-shadow:0 0 0 3px rgba(175,140,62,.2)!important;
}
body.ml-dark .ec-range__track-inner,
body.ml-dark .ec-range__track-line{
  background:${BD}!important;
}
/* ── PSEUDO-ELEMENT FIXLERİ ── */
/* Filtre separator çizgi */
body.ml-dark .ec-filter__items::after{
  background:${BD2}!important;
  opacity:.3!important;
}
/* Checkbox iç kare — unchecked gizle, checked tick göster */
body.ml-dark .form-control__checkbox-view::after{
  background:transparent!important;
  border-color:transparent!important;
}
body.ml-dark .form-control__checkbox:checked~.form-control__checkbox-view::after,
body.ml-dark .form-control__checkbox:checked+.form-control__checkbox-view::after{
  background:transparent!important;
  border-color:#fff!important;
}
/* Slider uç kapaklar */
body.ml-dark .ec-range__track-line::before,
body.ml-dark .ec-range__track-line::after{
  background:${BD}!important;
}
/* Sepet sayaç mavi → gold */
body.ml-dark .ec-minicart__counter::after{
  background:${GOLD}!important;
}
/* Radiogroup pseudo çizgiler */
body.ml-dark .ec-radiogroup::before,
body.ml-dark .ec-radiogroup::after,
body.ml-dark .ml-rg-fix::before,
body.ml-dark .ml-rg-fix::after{
  background:${BD2}!important;
  opacity:.2!important;
}
/* Checkout separator beyaz çizgi */
body.ml-dark .ec-cart-next__header,
body.ml-dark [class*="ec-cart-next"]{
  border-color:${BD2}!important;
}

/* ── CHECKOUT — Ödeme bildirim + Kabul kutuları (renkli arka planlar) ── */
body.ml-dark [class*="checkout"] [style*="background-color: rgb(255, 255, 224)"],
body.ml-dark [class*="checkout"] [style*="background-color: rgb(255, 255, 240)"],
body.ml-dark .ec-cart [style*="background-color: rgb(255, 255, 224)"],
body.ml-dark .ec-cart [style*="background-color: rgb(255, 255, 240)"],
body.ml-dark .ec-cart-step [style*="background-color: rgb(255, 255, 224)"],
body.ml-dark .ec-cart-step [style*="background-color: rgb(255, 255, 240)"],
body.ml-dark .ec-cart [style*="background-color: rgb(245, 212"],
body.ml-dark .ec-cart [style*="background-color: rgb(247, 205"],
body.ml-dark .ec-cart [style*="background: rgb(255"],
body.ml-dark .ec-cart [style*="background-color: rgb(255"],
body.ml-dark .ec-cart-step [style*="background-color: rgb(255"],
body.ml-dark .ec-cart-step [style*="background-color: rgb(253"],
body.ml-dark .ec-cart-step [style*="background-color: rgb(250"],
body.ml-dark .ec-cart-step [style*="background-color: rgb(248"],
body.ml-dark .ec-confirmation [style*="background-color: rgb(255"],
body.ml-dark [class*="checkout"] [style*="background-color: rgb(255, 255, 224)"],
body.ml-dark [class*="checkout"] [style*="background-color: rgb(255, 255, 240)"]{
  background-color:rgba(175,140,62,.1)!important;
  color:${TX1}!important;
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

/* ── CHECKOUT FORM INPUT WRAPPER'LARI (adres, isim, telefon) ── */
body.ml-dark .form-control--flexible{
  background:#353430!important;
  border-color:${BD}!important;
  border-radius:8px!important;
}

/* ── BEYAZ BORDER TEMİZLEME — spesifik hedef (wildcard kaldırıldı) ── */
/* Sadece gerçek container/divider'lar — collapsed form elementlere dokunma */
body.ml-dark .ec-cart,
body.ml-dark .ec-cart__body,
body.ml-dark .ec-cart__products,
body.ml-dark .ec-cart-item,
body.ml-dark .ec-cart-item__wrap,
body.ml-dark .ec-cart-item__image,
body.ml-dark .ec-cart-item__options,
body.ml-dark .ec-cart-summary,
body.ml-dark .ec-cart-summary__row,
body.ml-dark .ec-cart-summary__total,
body.ml-dark .ec-cart-step,
body.ml-dark .ec-cart-step__body,
body.ml-dark .ec-cart-step__next,
body.ml-dark .ec-cart-step__section,
body.ml-dark .ec-cart-step__wrap,
body.ml-dark .ec-cart-step__block,
body.ml-dark .ec-cart-step__anchor,
body.ml-dark .ec-cart-step__title,
body.ml-dark .ec-cart-step__text,
body.ml-dark .ec-cart__cell,
body.ml-dark .ec-confirmation,
body.ml-dark .ec-confirmation__body,
body.ml-dark .ec-radiogroup,
body.ml-dark .ec-radiogroup__items,
body.ml-dark .ec-radiogroup__item,
body.ml-dark .ec-radiogroup label{
  border-color:${BD2}!important;
}
body.ml-dark .ec-minicart{
  border-color:${BD2}!important;
}
body.ml-dark .ec-cart__products{
  border-bottom-color:${BD2}!important;
}
body.ml-dark .ec-cart-step--current{
  border-top-color:${BD2}!important;
}
body.ml-dark .ec-cart-step__next{
  border-bottom-color:${BD2}!important;
}
body.ml-dark .ec-cart__steps .ec-cart-step{
  border-color:${BD2}!important;
}
body.ml-dark .store .border,
body.ml-dark .dynamic-product-browser > .border{
  border-color:${BD2}!important;
}

/* ── RADIOGROUP (teslimat/ödeme seçim kutuları) ── */
body.ml-dark .ec-radiogroup__items{
  border-color:${BD}!important;
  border-radius:10px!important;
  overflow:hidden!important;
}
body.ml-dark .ec-radiogroup__item{
  border-color:${BD}!important;
}

/* ── STEP İKON — mavi → gold ── */
body.ml-dark .ec-cart-step__icon{
  border-color:${GOLDDIM}!important;
  color:${GOLD}!important;
}
body.ml-dark .ec-cart-step__icon--done{
  border-color:${GOLDDIM}!important;
  background:rgba(175,140,62,.1)!important;
}
body.ml-dark .ec-cart-step__icon svg{
  fill:${GOLD}!important;
  color:${GOLD}!important;
}

/* ── SEPET ÜRÜN GÖRSELİ ARKA PLAN (inline override) ── */
body.ml-dark .ec-cart-item__picture{
  background-color:${IMG_BG}!important;
  border-radius:8px!important;
  overflow:hidden!important;
}

/* ── ÖNERİLEN ÜRÜNLER KAROSELİ (Bunları da Beğenebilirsiniz) ── */
body.ml-dark .product-details__related-products,
body.ml-dark [class*="related-products"],
body.ml-dark [class*="recently"]{
  overflow:visible!important;
  background:${BG1}!important;
}
/* Recently viewed / related — ürün kartları */
body.ml-dark .product-details__related-products .grid-product__wrap,
body.ml-dark [class*="related"] .grid-product__wrap,
body.ml-dark [class*="recently"] .grid-product__wrap,
body.ml-dark [class*="recently-viewed"] .grid-product__wrap,
body.ml-dark .ec-related-products .grid-product__wrap{
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
body.ml-dark .product-details__related-products .grid-product__wrap-inner,
body.ml-dark [class*="related"] .grid-product__wrap-inner,
body.ml-dark [class*="recently"] .grid-product__wrap-inner,
body.ml-dark .ec-related-products .grid-product__wrap-inner{
  background:${BG2}!important;
  border:none!important;
}
body.ml-dark .product-details__related-products .grid-product__wrap:hover,
body.ml-dark [class*="related"] .grid-product__wrap:hover,
body.ml-dark [class*="recently"] .grid-product__wrap:hover,
body.ml-dark [class*="recently-viewed"] .grid-product__wrap:hover,
body.ml-dark .ec-related-products .grid-product__wrap:hover{
  box-shadow:
    inset 0 0 0 1px ${GOLDDIM},
    0 0 0 2px ${BG1},
    0 0 0 3px ${GOLDDIM},
    0 4px 20px rgba(175,140,62,.15),
    0 8px 32px rgba(0,0,0,.35)!important;
  transform:translateY(-2px)!important;
  border:none!important;
  outline:none!important;
}
/* Recently viewed ürün isimleri + fiyatlar */
body.ml-dark [class*="recently"] .grid-product__title,
body.ml-dark [class*="recently"] .grid-product__title-inner,
body.ml-dark .ec-related-products .grid-product__title,
body.ml-dark .ec-related-products .grid-product__title-inner{
  color:${TX1}!important;
}
/* Recently viewed ürün resim alanı — beyaz bg temizle */
body.ml-dark [class*="recently"] .grid-product__image,
body.ml-dark [class*="recently"] .grid-product__picture,
body.ml-dark [class*="recently"] .grid-product__picture-wrapper,
body.ml-dark [class*="recently"] .grid-product__image-wrap,
body.ml-dark .ec-related-products .grid-product__image,
body.ml-dark .ec-related-products .grid-product__picture,
body.ml-dark .ec-related-products .grid-product__picture-wrapper,
body.ml-dark .ec-related-products .grid-product__image-wrap{
  background:${IMG_BG}!important;
  border:none!important;
  border-radius:12px 12px 0 0!important;
}
body.ml-dark [class*="recently"] .grid-product__image img,
body.ml-dark .ec-related-products .grid-product__image img{
  border-radius:12px 12px 0 0!important;
}
body.ml-dark [class*="recently"] .grid-product__price,
body.ml-dark [class*="recently"] .grid-product__price-value,
body.ml-dark .ec-related-products .grid-product__price,
body.ml-dark .ec-related-products .grid-product__price-value{
  color:${GOLD}!important;
}
body.ml-dark [class*="recently"] .grid-product__old-price,
body.ml-dark .ec-related-products .grid-product__old-price{
  color:${TX3}!important;
}
/* Recently viewed — alt beyaz çizgi/separator yok et */
body.ml-dark [class*="recently"]::after,
body.ml-dark [class*="recently"]::before,
body.ml-dark .ec-related-products::after,
body.ml-dark .ec-related-products::before,
body.ml-dark [class*="recently"] > div:last-child{
  border:none!important;
  border-bottom:none!important;
  border-top:none!important;
  background:transparent!important;
}
/* ══ SON GÖRÜNTÜLENENLER — Gerçek DOM: .recently-viewed class ailesi ══ */
/* Beğenebilirsiniz kart tasarımı ile birebir aynı */
/* Section title */
body.ml-dark .recently-viewed-title{
  color:${TX1}!important;
  font-weight:700!important;
}
/* Kart container — grid-product__wrap ile aynı */
body.ml-dark .recently-viewed{
  background:${BG2}!important;
  border-radius:14px!important;
  border:none!important;
  margin:0 8px!important;
  padding:0!important;
  box-shadow:
    inset 0 0 0 1px ${BD},
    0 0 0 2px ${BG1},
    0 0 0 3px ${BD2},
    0 2px 12px rgba(0,0,0,.3)!important;
  overflow:visible!important;
  transition:box-shadow .3s ease,transform .3s ease!important;
}
body.ml-dark .recently-viewed:hover{
  box-shadow:
    inset 0 0 0 1px ${GOLDDIM},
    0 0 0 2px ${BG1},
    0 0 0 3px ${GOLDDIM},
    0 4px 20px rgba(175,140,62,.15),
    0 8px 32px rgba(0,0,0,.35)!important;
  transform:translateY(-2px)!important;
  border:none!important;
  outline:none!important;
}
/* Link */
body.ml-dark .recently-viewed__url{
  color:inherit!important;
  text-decoration:none!important;
  display:flex!important;
  flex-direction:column!important;
  height:100%!important;
}
/* Thumbnail — beyaz bg, sabit yükseklik, contain */
body.ml-dark .recently-viewed__thumb{
  background:#fff!important;
  border:none!important;
  border-radius:14px 14px 0 0!important;
  overflow:hidden!important;
  height:150px!important;
  display:flex!important;
  align-items:center!important;
  justify-content:center!important;
}
body.ml-dark .recently-viewed__thumb img{
  border-radius:0!important;
  background:transparent!important;
  width:100%!important;
  height:100%!important;
  object-fit:contain!important;
}
/* Ürün adı */
body.ml-dark .recently-viewed__name{
  color:${TX1}!important;
  text-align:center!important;
  font-size:14px!important;
  padding:10px 8px 4px!important;
  line-height:1.3!important;
}
/* Fiyat */
body.ml-dark .recently-viewed__price,
body.ml-dark .recently-viewed__price .ec-price-item{
  color:${GOLD}!important;
  text-align:center!important;
  font-size:16px!important;
  font-weight:600!important;
  padding:4px 8px 12px!important;
}
body.ml-dark .recently-viewed__price .ec-price-item--old{
  color:${TX3}!important;
}

/* Karosel/scrollbar temizliği */
body.ml-dark [class*="recently"] ::-webkit-scrollbar,
body.ml-dark .ec-related-products ::-webkit-scrollbar{
  height:6px!important;
  background:${BG2}!important;
}
body.ml-dark [class*="recently"] ::-webkit-scrollbar-thumb,
body.ml-dark .ec-related-products ::-webkit-scrollbar-thumb{
  background:${BD2}!important;
  border-radius:3px!important;
}
/* Karosel scroller — overflow fix */
body.ml-dark .product-details__related-products,
body.ml-dark [class*="related-products"]{
  overflow:visible!important;
}
/* Recently viewed / Related heading */
body.ml-dark .ec-related-products__title,
body.ml-dark [class*="related-products"] h2,
body.ml-dark [class*="recently"] h2,
body.ml-dark [class*="recently-viewed"] h2,
body.ml-dark .ec-related-products h2{
  color:${TX1}!important;
  font-weight:700!important;
}
/* Recently viewed kart alt text */
body.ml-dark [class*="recently"] .grid-product__bg,
body.ml-dark .ec-related-products .grid-product__bg{
  background:${BG2}!important;
}
body.ml-dark [class*="recently"] .grid-product__spacer,
body.ml-dark .ec-related-products .grid-product__spacer{
  border:none!important;
  background:transparent!important;
}

/* ── ANASAYFA CTA BUTONU (Alışverişe Devam Et / Mağazaya Git) ── */
body.ml-dark .tile-cover .cover__button,
body.ml-dark .tile-cover .cover-button,
body.ml-dark .cover__button.cover-button,
body.ml-dark .tile-cover a.cover__button,
body.ml-dark .tile-cover a.cover-button{
  background:linear-gradient(135deg,#af8c3e,#d4b05e)!important;
  background-color:#af8c3e!important;
  color:#fff!important;
  border:none!important;
  border-radius:12px!important;
  font-weight:700!important;
  text-decoration:none!important;
  position:relative!important;
  overflow:hidden!important;
}
body.ml-dark .tile-cover .cover__button *:not(.ml-sweep),
body.ml-dark .tile-cover .cover-button *:not(.ml-sweep){
  color:#fff!important;
  background:transparent!important;
  background-color:transparent!important;
}
body.ml-dark .tile-cover .cover__button:hover,
body.ml-dark .tile-cover .cover-button:hover,
body.ml-dark .cover__button:hover,
body.ml-dark .cover-button:hover{
  background:#af8c3e!important;
  background-color:#af8c3e!important;
  border-radius:12px!important;
  overflow:hidden!important;
  transform:scale(.97)!important;
}
body.ml-dark .cover__button:hover *:not(.ml-sweep),
body.ml-dark .cover-button:hover *:not(.ml-sweep){
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
body.ml-dark [class*="tabs__"] a:hover,
body.ml-dark [class*="tabs__"] a.active,
body.ml-dark [class*="tabs__"] a[aria-selected="true"]{
  color:${GOLD}!important;
}
/* Statik sayfa — iç sekmeler (Şartlar & Koşullar vb.) */
body.ml-dark .ec-page-body nav a,
body.ml-dark [class*="content-page"] nav a,
body.ml-dark [class*="legal"] nav a{
  color:${TX2}!important;
  transition:color .2s!important;
}
body.ml-dark .ec-page-body nav a:hover,
body.ml-dark [class*="content-page"] nav a:hover,
body.ml-dark .ec-page-body nav a.active{
  color:${GOLD}!important;
}
/* Statik sayfa SVG/icon'lar */
body.ml-dark .ec-page-body svg,
body.ml-dark .ec-page-body img:not([src*=".jpg"]):not([src*=".png"]):not([src*=".webp"]){
  filter:invert(1) brightness(.85)!important;
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
/* Sepet + Arama floating ikonları */
body.ml-dark .float-icons,
body.ml-dark .float-icons__wrap,
body.ml-dark .float-icons__icon,
body.ml-dark .float-icons__icon > div,
body.ml-dark .float-icons__wrap .ec-minicart__body,
body.ml-dark .float-icons__wrap .ec-minicart__icon{
  background:transparent!important;
  border:none!important;
  box-shadow:none!important;
}
/* Sadece yuvarlak daire (.ec-minicart, radius:40px) */
body.ml-dark .float-icons__wrap .ec-minicart{
  background:${BG2}!important;
  border:1px solid ${BD}!important;
  box-shadow:0 2px 8px rgba(0,0,0,.3)!important;
}
body.ml-dark .float-icons__wrap svg{
  color:${GOLD}!important;
  fill:${GOLD}!important;
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

// ─── SVG İKONLARI — Sadece ay: stroke (açık) / fill (kapalı) ───
var moonOff='<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/></svg>';
var moonOn='<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/></svg>';

// ─── TOGGLE BUTON OLUŞTUR ───
var btn=document.createElement('button');
btn.className='ml-dm-btn';
btn.setAttribute('aria-label','Karanlık mod');
btn.setAttribute('title','Karanlık / Aydınlık Mod');
btn.innerHTML=moonOff;

// ─── TOGGLE FONKSİYONU ───

function toggle(){
  // Observer'ı KAPAT — yoksa class değişiminde fixAll anında tetiklenir → flash
  _observer.disconnect();
  document.body.classList.add('ml-dm-t');
  document.body.classList.toggle('ml-dark');
  var dark=document.body.classList.contains('ml-dark');
  document.documentElement.style.setProperty('background',dark?'#1b1a17':'','important');
  btn.innerHTML=dark?moonOn:moonOff;
  try{localStorage.setItem('ml-dark',dark?'1':'0');}catch(e){}
  // CSS body.ml-dark kuralları otomatik devreye girer/çıkar
  // JS inline stil KOYMA — Ecwid'in doğal akışını bozar
  // SALT HTML .D class toggle
  if(!dark){
    document.querySelectorAll('.product-details__description .D').forEach(function(d){d.classList.remove('D');});
  }
  // Transition bittikten SONRA fixAll + observer tekrar aç
  setTimeout(function(){
    fixAll();
    document.body.classList.remove('ml-dm-t');
    // Observer'ı tekrar başlat
    _observer.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class','style']});
  },400);
  // Ecwid geç render için 2. pas
  setTimeout(fixAll,1200);
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
      document.documentElement.style.setProperty('background','#1b1a17','important');
      btn.innerHTML=moonOn;
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
var _fixRAF=null;
var _lastFixTime=0;
function fixAll(){
  // Debounce — Ecwid çok sık DOM değiştirir
  clearTimeout(_fixTimer);
  if(_fixRAF) cancelAnimationFrame(_fixRAF);
  _fixTimer=setTimeout(function(){
    var now=Date.now();
    // fixAll kendi style yazımından tetiklenen observer'ı yoksay (150ms guard)
    if(now-_lastFixTime<150) return;
    _fixRAF=requestAnimationFrame(function(){
      _lastFixTime=Date.now();
      _fixAllNow();
    });
  },80);
}
function _fixAllNow(){
  var dark=document.body.classList.contains('ml-dark');
  fixStokYok();
  fixLabels(); // Türkçe çeviri + sepet img radius (dark guard içeride)
  if(dark){
    fixSelects();
    fixSweep();
    fixButtonText();
    fixBadgeRect();
    fixFloatingIcons();
  }else{
    cleanAll();
  }
}

// ─── TEMİZLİK (light mode'a dönünce) ───
function cleanAll(){
  cleanStokYok();
  // Sweep overlay'ları kaldır
  document.querySelectorAll('.ml-sweep').forEach(function(el){el.remove();});
  // Select temizle
  document.querySelectorAll('.form-control--empty .form-control__placeholder').forEach(function(el){
    el.style.removeProperty('opacity');
    el.style.removeProperty('visibility');
  });
  // Opsiyon butonları — tüm inline style temizle
  document.querySelectorAll('.form-control--checkbox-button .form-control__inline-label').forEach(function(el){
    ['background','color','border-color','border','font-weight','border-radius','transition','opacity','transform','box-shadow','cursor','position','overflow'].forEach(function(p){el.style.removeProperty(p);});
    var il=el.querySelector('label');
    if(il){il.style.removeProperty('color');il.style.removeProperty('background');il.style.removeProperty('border');}
  });
  // Sepete Ekle wrapper + TÜM primary wrapper temizle
  // Tüm primary wrapper temizle
  document.querySelectorAll('.form-control--primary').forEach(function(el){
    ['position','overflow','border-radius','background','border'].forEach(function(p){el.style.removeProperty(p);});
  });
  // Cover butonlar — sadece _injectSweep'in koyduğu position+overflow temizle
  // Ecwid orijinal stillerine DOKUNMA (beyaz buton sorunu)
  document.querySelectorAll('.cover__button,.cover-button').forEach(function(el){
    el.style.removeProperty('position');
    el.style.removeProperty('overflow');
  });
  // Primary/secondary buton text + bg temizle
  document.querySelectorAll('.form-control__button-text,.form-control__button-svg,.form-control__button-svg svg').forEach(function(el){
    el.style.removeProperty('color');el.style.removeProperty('fill');
  });
  document.querySelectorAll('.form-control--primary .form-control__button').forEach(function(el){
    ['background','color','border','border-radius'].forEach(function(p){el.style.removeProperty(p);});
  });
  // Badge temizle
  document.querySelectorAll('.product-details__label-container,.product-details .ec-label').forEach(function(el){
    ['display','width','max-width','padding','border-radius','white-space','box-sizing','line-height','overflow','margin'].forEach(function(p){el.style.removeProperty(p);});
  });
  // Sepet ürün görseli temizle
  document.querySelectorAll('.ec-cart-item img, [class*="cart-item"] img').forEach(function(el){
    el.style.removeProperty('border-radius');
  });
  // Cart picture wrapper temizle
  document.querySelectorAll('.ec-cart-item__picture').forEach(function(el){
    ['background-color','border-radius','overflow'].forEach(function(p){el.style.removeProperty(p);});
  });
  // Checkout duyuru kutuları temizle
  document.querySelectorAll('.ec-cart-step [style*="background"], .ec-cart [style*="background-color"]').forEach(function(el){
    el.style.removeProperty('background-color');
    el.style.removeProperty('color');
    el.querySelectorAll('*').forEach(function(c){c.style.removeProperty('color');});
  });
  // Beyaz border JS temizle
  document.querySelectorAll('.ec-cart__products,.ec-cart-step,.ec-cart-step__next,.ec-radiogroup__items,.ec-radiogroup__item,.ec-radiogroup label,.ec-minicart,.store .border,.dynamic-product-browser > .border').forEach(function(el){
    el.style.removeProperty('border-color');
    el.style.removeProperty('border-bottom-color');
  });
  // Floating ikon temizle
  document.querySelectorAll('.float-icons,.float-icons__wrap,.float-icons__icon,.float-icons__icon > div,.float-icons__wrap .ec-minicart,.float-icons__wrap .ec-minicart__body,.float-icons__wrap .ec-minicart__icon').forEach(function(el){
    el.style.removeProperty('background');el.style.removeProperty('background-color');
    el.style.removeProperty('border');el.style.removeProperty('box-shadow');
  });
  document.querySelectorAll('.float-icons__wrap svg').forEach(function(s){s.style.removeProperty('color');s.style.removeProperty('fill');});
  // Related/recently viewed ürün kartları — inline stil temizle
  document.querySelectorAll('[class*="recently"] .grid-product__wrap, .ec-related-products .grid-product__wrap, [class*="related"] .grid-product__wrap, .product-details__related-products .grid-product__wrap').forEach(function(w){
    ['background','border','border-radius','overflow','box-shadow','transform'].forEach(function(p){w.style.removeProperty(p);});
    var inner=w.querySelector('.grid-product__wrap-inner,[class*="wrap-inner"]');
    if(inner){inner.style.removeProperty('background');inner.style.removeProperty('border');}
    w.querySelectorAll('.grid-product__image,.grid-product__picture,.grid-product__picture-wrapper,[class*="image-wrap"]').forEach(function(img){
      img.style.removeProperty('background');img.style.removeProperty('border');
    });
    // Title/price inline renk temizle
    w.querySelectorAll('.grid-product__title,.grid-product__title-inner,.grid-product__subtitle,.grid-product__sku,.grid-product__description').forEach(function(t){
      t.style.removeProperty('color');
    });
    w.querySelectorAll('.grid-product__price .ec-price-item,.grid-product__price-value,.grid-product__old-price,.grid-product__price-old').forEach(function(t){
      t.style.removeProperty('color');
    });
  });
  // Related/recently section container temizle
  document.querySelectorAll('[class*="recently"], .ec-related-products, [class*="related-products"], .product-details__related-products').forEach(function(sec){
    sec.style.removeProperty('background');sec.style.removeProperty('border');sec.style.removeProperty('border-bottom');
    var kids=sec.children;
    for(var i=0;i<kids.length;i++){
      if(kids[i].tagName==='DIV'){
        kids[i].style.removeProperty('background');kids[i].style.removeProperty('border');kids[i].style.removeProperty('border-bottom');
      }
    }
  });
  // Son Görüntülenenler (.recently-viewed) inline stil temizle
  document.querySelectorAll('.recently-viewed-title').forEach(function(el){
    el.style.removeProperty('color');
  });
  // Hakkında bölümü inline stil temizle
  document.querySelectorAll('.tile-about,.owner,.whyus,.contacts').forEach(function(sec){
    sec.style.removeProperty('color');
    sec.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span,div,li,a,u').forEach(function(el){
      el.style.removeProperty('color');
    });
  });
  document.querySelectorAll('.recently-viewed[class*="recently-viewed--"]').forEach(function(card){
    ['background','border','border-radius','overflow','box-shadow','transform','margin','padding'].forEach(function(p){card.style.removeProperty(p);});
    var name=card.querySelector('.recently-viewed__name');
    if(name){['color','text-align','font-size','padding','line-height'].forEach(function(p){name.style.removeProperty(p);});}
    card.querySelectorAll('.recently-viewed__price,.recently-viewed__price .ec-price-item,.recently-viewed__price .ec-price-item--old').forEach(function(p){
      ['color','text-align','font-size','font-weight','padding'].forEach(function(pp){p.style.removeProperty(pp);});
    });
    var thumb=card.querySelector('.recently-viewed__thumb');
    if(thumb){
      ['background','border','border-radius','overflow','height','display','align-items','justify-content'].forEach(function(p){thumb.style.removeProperty(p);});
      var img=thumb.querySelector('img');
      if(img){['border-radius','width','height','object-fit'].forEach(function(p){img.style.removeProperty(p);});}
    }
    card.querySelectorAll('.recently-viewed__price,.recently-viewed__price .ec-price-item').forEach(function(p){
      p.style.removeProperty('text-align');
    });
  });
  // Statik sayfa inline stil temizle
  document.querySelectorAll('.ec-page-body, [class*="ec-page"], [class*="page-body"], [class*="store-page"]').forEach(function(pg){
    pg.style.removeProperty('background-color');pg.style.removeProperty('color');
    pg.querySelectorAll('div').forEach(function(d){
      d.style.removeProperty('background-color');d.style.removeProperty('color');
    });
  });
  // ml-wrapper temizle
  document.querySelectorAll('[class*="ml-"][class*="-wrapper"]').forEach(function(w){
    w.style.removeProperty('background');w.style.removeProperty('color');
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
  if(!document.body.classList.contains('ml-dark')) return;
  // Ecwid placeholder'ı gizliyorsa zorla göster
  document.querySelectorAll('.form-control--empty .form-control__placeholder').forEach(function(el){
    el.style.setProperty('opacity','1','important');
    el.style.setProperty('visibility','visible','important');
  });
}

// ─── SWEEP + HOVER — JS EVENT LISTENER ───
// Ecwid inline style koyuyor → CSS hover eziliyor
// Tek çözüm: mouseenter/mouseleave ile inline style yönet
// ═══════════════════════════════════════════════════════
// UNIVERSAL SWEEP SYSTEM
// Tek fonksiyon, tüm gold butonlara sweep + hover
// ═══════════════════════════════════════════════════════
var _sweepCSS='position:absolute;top:0;left:-100%;width:60%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent);animation:mlsweep 3s ease-in-out infinite;pointer-events:none;z-index:1;border-radius:inherit;';

function _injectSweep(el){
  if(!el||el.querySelector('.ml-sweep')) return;
  el.style.setProperty('position','relative','important');
  el.style.setProperty('overflow','hidden','important');
  var sw=document.createElement('div');
  sw.className='ml-sweep';
  sw.style.cssText=_sweepCSS;
  el.appendChild(sw);
}

function _bindHover(el,sweepTarget){
  if(!el||el._mlHover) return;
  el._mlHover=true;
  var target=sweepTarget||el;
  el.addEventListener('mouseenter',function(){
    if(!document.body.classList.contains('ml-dark')) return;
    el.style.setProperty('background','#af8c3e','important');
    el.style.setProperty('transform','scale(.97)','important');
    el.style.setProperty('box-shadow','0 2px 12px rgba(175,140,62,.3)','important');
    var s=target.querySelector('.ml-sweep');if(s)s.style.animationPlayState='paused';
  });
  el.addEventListener('mouseleave',function(){
    if(!document.body.classList.contains('ml-dark')) return;
    el.style.setProperty('background','linear-gradient(135deg,#af8c3e,#d4b05e)','important');
    el.style.removeProperty('transform');
    el.style.removeProperty('box-shadow');
    var s=target.querySelector('.ml-sweep');if(s)s.style.animationPlayState='running';
  });
}

function fixSweep(){
  if(!document.body.classList.contains('ml-dark')) return;

  // ═══ 1) TÜM PRIMARY BUTONLAR (Sepete Ekle, Devam Et, Checkout, vb.) ═══
  document.querySelectorAll('.form-control--primary').forEach(function(wrapper){
    wrapper.style.setProperty('background','linear-gradient(135deg,#af8c3e,#d4b05e)','important');
    wrapper.style.setProperty('border-radius','10px','important');
    wrapper.style.setProperty('border','none','important');
    _injectSweep(wrapper);
    var btn=wrapper.querySelector('.form-control__button');
    if(btn) _bindHover(btn,wrapper);
  });

  // ═══ 2) COVER BUTONLAR (Anasayfa CTA — "Alışverişe Devam Et") ═══
  // CSS body.ml-dark .cover__button kuralları yeterli — sadece sweep inject
  document.querySelectorAll('.cover__button,.cover-button').forEach(function(el){
    _injectSweep(el);
  });

  // ═══ 3) OPSİYON BUTONLARI (Boyut, Sertlik) ═══
  document.querySelectorAll('.form-control--checkbox-button').forEach(function(cb){
    var inp=cb.querySelector('.form-control__radio');
    var lbl=cb.querySelector('.form-control__inline-label');
    if(!inp||!lbl) return;
    // Hover aktifken DOKUNMA — observer fixAll tetiklese bile hover state korunsun
    if(lbl._mlHoverActive) return;
    var innerLbl=lbl.querySelector('label');

    // Ortak — BORDER YOK, box-shadow ile çerçeve (tırtık önleme: layout shift yok)
    lbl.style.setProperty('border','none','important');
    lbl.style.setProperty('border-radius','10px','important');
    lbl.style.setProperty('transition','background .2s ease,color .2s ease,box-shadow .2s ease,transform .15s ease','important');
    lbl.style.setProperty('cursor','pointer','important');

    if(inp.checked){
      // ── SEÇİLİ — gold gradient + sweep ──
      lbl.style.setProperty('background','linear-gradient(135deg,#af8c3e,#d4b05e)','important');
      lbl.style.setProperty('color','#fff','important');
      lbl.style.setProperty('font-weight','700','important');
      lbl.style.setProperty('box-shadow','0 0 0 1.5px #af8c3e, 0 2px 8px rgba(175,140,62,.25)','important');
      lbl.style.setProperty('position','relative','important');
      lbl.style.setProperty('overflow','hidden','important');
      if(innerLbl){innerLbl.style.setProperty('color','#fff','important');innerLbl.style.setProperty('background','transparent','important');innerLbl.style.setProperty('border','none','important');}
      _injectSweep(lbl);
    }else{
      // ── SEÇİLİ DEĞİL — koyu, sweep kaldır ──
      var old=lbl.querySelector('.ml-sweep');if(old)old.remove();
      lbl.style.setProperty('background','#2c2b26','important');
      lbl.style.setProperty('color','#ece8df','important');
      lbl.style.setProperty('font-weight','600','important');
      lbl.style.setProperty('box-shadow','0 0 0 1px rgba(175,140,62,.15)','important');
      if(innerLbl){innerLbl.style.setProperty('color','#ece8df','important');innerLbl.style.setProperty('background','transparent','important');innerLbl.style.setProperty('border','none','important');}
    }

    // Hover — sadece 1 kere
    if(!lbl._mlHover){
      lbl._mlHover=true;
      lbl.addEventListener('mouseenter',function(){
        if(!document.body.classList.contains('ml-dark')) return;
        lbl._mlHoverActive=true;
        if(inp.checked){
          // Seçili hover — koyu gold, sweep duraklat
          lbl.style.setProperty('background','#af8c3e','important');
          lbl.style.setProperty('transform','scale(.97)','important');
          lbl.style.setProperty('box-shadow','0 0 0 1.5px #8a6f32, 0 1px 4px rgba(0,0,0,.3)','important');
          var sw=lbl.querySelector('.ml-sweep');if(sw)sw.style.animationPlayState='paused';
        }else{
          // Seçili değil hover — gold gradient + sweep
          lbl.style.setProperty('background','linear-gradient(135deg,#af8c3e,#d4b05e)','important');
          lbl.style.setProperty('color','#fff','important');
          lbl.style.setProperty('font-weight','700','important');
          lbl.style.setProperty('box-shadow','0 0 0 1.5px #af8c3e, 0 2px 8px rgba(175,140,62,.25)','important');
          lbl.style.setProperty('transform','translateY(-1px)','important');
          lbl.style.setProperty('position','relative','important');
          lbl.style.setProperty('overflow','hidden','important');
          if(innerLbl){innerLbl.style.setProperty('color','#fff','important');innerLbl.style.setProperty('background','transparent','important');innerLbl.style.setProperty('border','none','important');}
          _injectSweep(lbl);
        }
      });
      lbl.addEventListener('mouseleave',function(){
        if(!document.body.classList.contains('ml-dark')) return;
        lbl._mlHoverActive=false;
        lbl.style.removeProperty('transform');
        if(inp.checked){
          // Seçili leave — gradient'e dön, sweep devam
          lbl.style.setProperty('background','linear-gradient(135deg,#af8c3e,#d4b05e)','important');
          lbl.style.setProperty('color','#fff','important');
          lbl.style.setProperty('box-shadow','0 0 0 1.5px #af8c3e, 0 2px 8px rgba(175,140,62,.25)','important');
          if(innerLbl){innerLbl.style.setProperty('color','#fff','important');innerLbl.style.setProperty('border','none','important');}
          var sw=lbl.querySelector('.ml-sweep');if(sw)sw.style.animationPlayState='running';
        }else{
          // Seçili değil leave — sweep kaldır, koyu'ya dön
          var old=lbl.querySelector('.ml-sweep');if(old)old.remove();
          lbl.style.setProperty('background','#2c2b26','important');
          lbl.style.setProperty('color','#ece8df','important');
          lbl.style.setProperty('font-weight','600','important');
          lbl.style.setProperty('box-shadow','0 0 0 1px rgba(175,140,62,.15)','important');
          if(innerLbl){innerLbl.style.setProperty('color','#ece8df','important');innerLbl.style.setProperty('background','transparent','important');innerLbl.style.setProperty('border','none','important');}
        }
      });
    }
  });
}

// ─── BUTON TEXT RENKLERİ ───
// Sadece text rengi — bg inline koymak hover'ı bozar
function fixButtonText(){
  if(!document.body.classList.contains('ml-dark')) return;
  // Primary buton — gold gradient bg + #fff text (Ecwid CSS'i eziyor, inline zorla)
  document.querySelectorAll('.form-control--primary .form-control__button').forEach(function(el){
    el.style.setProperty('background','linear-gradient(135deg,#af8c3e,#d4b05e)','important');
    el.style.setProperty('color','#fff','important');
    el.style.setProperty('border','none','important');
    el.style.setProperty('border-radius','10px','important');
  });
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
// ─── TÜRKÇE ETİKETLER + SEPET GÖRSEL RADIUS ───
function fixLabels(){
  // "Recently viewed products" → "Son Görüntülenenler"
  document.querySelectorAll('.ec-related-products__title, [class*="related-products"] h2, [class*="recently"] h2, [class*="recently"] h3, [class*="recently"] [class*="title"], [class*="recently-viewed"] [class*="title"]').forEach(function(el){
    if(el.textContent.trim().match(/recently|viewed/i) && !el._mlFixed){
      el._mlFixed=true;
      el.textContent='Son Görüntülenenler';
    }
  });
  // Genel "Recently viewed" text node'ları — heading + div/span
  document.querySelectorAll('h1,h2,h3,h4,h5,h6,div,span').forEach(function(el){
    var t=el.textContent.trim();
    if((t==='Recently viewed products'||t==='Recently viewed')&& el.children.length===0){
      el.textContent='Son Görüntülenenler';
      el._mlFixed=true;
    }
  });
  // Sepet ürün görseli — border-radius + inline bg override
  if(document.body.classList.contains('ml-dark')){
    document.querySelectorAll('.ec-cart-item img, [class*="cart-item"] img').forEach(function(el){
      el.style.setProperty('border-radius','12px','important');
    });
    // Cart item picture wrapper — Ecwid inline style bg override
    document.querySelectorAll('.ec-cart-item__picture').forEach(function(el){
      el.style.setProperty('background-color','#e8e4da','important');
      el.style.setProperty('border-radius','12px','important');
      el.style.setProperty('overflow','hidden','important');
    });
    // ── CHECKOUT DUYURU KUTULARI — açık renkli inline bg'leri koyu yap ──
    document.querySelectorAll('.ec-cart-step [style*="background"], .ec-cart-step [style*="background-color"]').forEach(function(el){
      if(el.offsetHeight<20) return;
      var cs=getComputedStyle(el);
      var bg=cs.backgroundColor;
      var m=bg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)/);
      if(m && +m[1]>180 && +m[2]>180 && +m[3]>180){
        // Açık renkli bg → koyu gold tint
        el.style.setProperty('background-color','rgba(175,140,62,.08)','important');
        el.style.setProperty('color','#ece8df','important');
        // Border rengini koru ama koyu versiyonuna çevir
        var blc=cs.borderLeftColor;
        var bm=blc.match(/rgb\((\d+),\s*(\d+),\s*(\d+)/);
        if(bm && parseFloat(cs.borderLeftWidth)>=2){
          el.style.setProperty('border-left-color',blc,'important');
        }
        // İçerideki tüm text elementleri
        el.querySelectorAll('*').forEach(function(c){
          var ccs=getComputedStyle(c);
          var cc=ccs.color;
          var cm=cc.match(/rgb\((\d+),\s*(\d+),\s*(\d+)/);
          if(cm && +cm[1]<100 && +cm[2]<100 && +cm[3]<100){
            c.style.setProperty('color','#ece8df','important');
          }
        });
      }
    });
    // ── CHECKOUT DOĞRUDAN STYLE İLE RENKLENEN TÜM ELEMENTLER ──
    document.querySelectorAll('.ec-cart [style*="background-color"]').forEach(function(el){
      if(el.offsetHeight<15) return;
      var cs=getComputedStyle(el);
      var bg=cs.backgroundColor;
      var m=bg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)/);
      if(m && +m[1]>200 && +m[2]>200 && +m[3]>200){
        el.style.setProperty('background-color','rgba(175,140,62,.08)','important');
        el.style.setProperty('color','#ece8df','important');
      }
    });
    // ── BEYAZ BORDER TEMİZLEME (CSS yetmiyor — JS inline zorla) ──
    document.querySelectorAll('.ec-cart__products').forEach(function(el){
      el.style.setProperty('border-bottom-color','rgba(175,140,62,.06)','important');
    });
    document.querySelectorAll('.ec-cart-step').forEach(function(el){
      el.style.setProperty('border-color','rgba(175,140,62,.06)','important');
    });
    document.querySelectorAll('.ec-cart-step__next').forEach(function(el){
      el.style.setProperty('border-bottom-color','rgba(175,140,62,.06)','important');
    });
    document.querySelectorAll('.ec-radiogroup__items').forEach(function(el){
      el.style.setProperty('border-color','rgba(175,140,62,.12)','important');
    });
    // Radiogroup individual items (teslimat/ödeme arası çizgiler)
    document.querySelectorAll('.ec-radiogroup__item').forEach(function(el){
      el.style.setProperty('border-color','rgba(175,140,62,.06)','important');
    });
    // Radiogroup label borders
    document.querySelectorAll('.ec-radiogroup label').forEach(function(el){
      el.style.setProperty('border-color','rgba(175,140,62,.12)','important');
    });
    // Checked radio — blue box-shadow override
    document.querySelectorAll('.ec-radiogroup input:checked+label,.ec-radiogroup input:checked~label').forEach(function(el){
      el.style.setProperty('border-color','#af8c3e','important');
      el.style.setProperty('background','rgba(175,140,62,.08)','important');
      el.style.setProperty('box-shadow','0 0 0 1px #af8c3e, 0 0 0 1px #af8c3e inset','important');
    });
    // Unchecked radio labels — kill box-shadow
    document.querySelectorAll('.ec-radiogroup label').forEach(function(el){
      var prev=el.previousElementSibling;
      if(!prev||!prev.checked){
        el.style.setProperty('box-shadow','none','important');
      }
    });
    // Radiogroup items — kill box-shadow
    document.querySelectorAll('.ec-radiogroup__item').forEach(function(el){
      el.style.setProperty('box-shadow','none','important');
    });
    // Native radio circles — gold
    document.querySelectorAll('.ec-radiogroup input[type="radio"],.ec-radiogroup .form-control__radio,.form-control__radio').forEach(function(el){
      el.style.setProperty('accent-color','#af8c3e','important');
    });
    // Filtre sidebar — slider + checkbox + input borders
    document.querySelectorAll('.ec-filter input,.ec-filter label,[class*="ec-filter"] input').forEach(function(el){
      var t=el.type;
      if(t==='checkbox'||t==='radio') el.style.setProperty('accent-color','#af8c3e','important');
      if(t==='text'||t==='number'||t==='search') el.style.setProperty('border-color','rgba(175,140,62,.12)','important');
    });
    document.querySelectorAll('.ec-minicart').forEach(function(el){
      el.style.setProperty('border-color','rgba(175,140,62,.06)','important');
    });
    // Store .border class (3px top)
    document.querySelectorAll('.store .border, .dynamic-product-browser > .border').forEach(function(el){
      el.style.setProperty('border-color','rgba(175,140,62,.06)','important');
    });
    // Açık arka planlar — inline VE CSS-based (ürün görseli + HTML hariç)
    document.querySelectorAll('.ec-cart *, .ec-cart-step *, .ec-confirmation *, [class*="checkout"] *').forEach(function(el){
      if(el.offsetHeight<10||el.offsetWidth<10) return;
      if(el.tagName==='IMG'||el.tagName==='BUTTON') return;
      var cn=typeof el.className==='string'?el.className:'';
      if(cn.indexOf('picture')>-1||cn.indexOf('image')>-1||cn.indexOf('btn')>-1||cn.indexOf('form-control--primary')>-1||cn.indexOf('form-control__button')>-1) return;
      var bg=getComputedStyle(el).backgroundColor;
      var m=bg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)/);
      if(m && +m[1]>200 && +m[2]>200 && +m[3]>100){
        // Kabul kutusu = sarımsı → dikkat çekici gold tint
        if(+m[3]<245){
          el.style.setProperty('background-color','rgba(175,140,62,.15)','important');
          el.style.setProperty('outline','1px solid rgba(175,140,62,.4)','important');
          el.style.setProperty('outline-offset','-1px','important');
          el.style.setProperty('border-radius','8px','important');
        } else {
          el.style.setProperty('background-color','rgba(175,140,62,.06)','important');
        }
        el.style.setProperty('color','#ece8df','important');
      }
    });
    // Radiogroup pseudo çizgiler — border kill
    document.querySelectorAll('.ec-radiogroup').forEach(function(rg){
      var cs=getComputedStyle(rg,'::before');
      if(cs.content!=='none'){
        rg.classList.add('ml-rg-fix');
      }
      cs=getComputedStyle(rg,'::after');
      if(cs.content!=='none'){
        rg.classList.add('ml-rg-fix');
      }
    });
    // Radio-view — force visible if hidden
    document.querySelectorAll('.form-control__radio-view').forEach(function(rv){
      if(rv.offsetWidth<5){
        // Ecwid native radio kullanıyor — accent-color ile devam
        var inp=rv.previousElementSibling||rv.parentElement.querySelector('.form-control__radio');
        if(inp) inp.style.setProperty('accent-color','#af8c3e','important');
      }
    });
    // Range slider — blue → gold
    document.querySelectorAll('.ec-range__slider,.ec-range__runner').forEach(function(el){
      el.style.setProperty('background','#af8c3e','important');
      el.style.setProperty('border-color','#af8c3e','important');
      el.style.setProperty('box-shadow','0 0 0 3px rgba(175,140,62,.2)','important');
    });
    document.querySelectorAll('.ec-range__track-inner,.ec-range__track-line').forEach(function(el){
      el.style.setProperty('background','rgba(175,140,62,.12)','important');
    });
    // Cart-next header separator
    document.querySelectorAll('.ec-cart-next__header,[class*="ec-cart-next"]').forEach(function(el){
      el.style.setProperty('border-color','rgba(175,140,62,.06)','important');
    });
    // ── STATİK SAYFA + ML-WRAPPER + ÜRÜN AÇIKLAMA — KAPSAMLI DARK FIX ──
    var _darkScopes='.ec-page-body *, [class*="ml-"][class*="-wrapper"] *, .product-details__description, .product-details__description *';
    document.querySelectorAll(_darkScopes).forEach(function(el){
      var tag=el.tagName;
      if(tag==='IMG'||tag==='VIDEO'||tag==='IFRAME') return;
      if(tag==='SVG'||tag==='svg'||tag==='path'||tag==='circle'||tag==='polyline'||tag==='line'||tag==='polygon'||tag==='rect'||tag==='ellipse') return;
      var cn=typeof el.className==='string'?el.className:'';
      // Renkli ikon container'ları koru (yeşil ✓, kırmızı ✗, step num, trust)
      if(cn.indexOf('ml-icon-')>-1||cn.indexOf('ml-step-num')>-1||cn.indexOf('ml-check')>-1||cn.indexOf('ml-trust-icon')>-1) return;
      var cs=getComputedStyle(el);

      // ── ARKA PLAN TEMİZLİĞİ ──
      var bg=cs.backgroundColor;
      var m=bg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)/);
      if(m){
        var r=+m[1],g=+m[2],b=+m[3];
        if(r>240&&g>240&&b>240){
          el.style.setProperty('background-color','transparent','important');
        } else if(r>200&&g>200&&b>200){
          el.style.setProperty('background-color','#23221e','important');
        } else if(r>180&&g>180&&b>180){
          el.style.setProperty('background-color','#2c2b26','important');
        }
      }

      // ── GRADIENT TEMİZLİĞİ (backgroundImage üzerinden) ──
      var bgImg=cs.backgroundImage||'';
      if(bgImg.indexOf('linear-gradient')>-1||bgImg.indexOf('radial-gradient')>-1){
        // Gradient içindeki tüm rgb değerlerini çek
        var rgbMatches=bgImg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/g);
        if(rgbMatches){
          var allLight=rgbMatches.every(function(rgb){
            var rm=rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
            return rm&&+rm[1]>180&&+rm[2]>180&&+rm[3]>180;
          });
          if(allLight){
            el.style.setProperty('background','#23221e','important');
          }
        }
      }

      // ── INLINE STYLE BACKGROUND (shorthand) ──
      var inBg=el.getAttribute('style')||'';
      if(inBg.indexOf('background')>-1){
        // #ffffff, #fafafa, #f5f5f7, #fef7f7 vb.
        if(/background[^:]*:\s*#f[a-f0-9]{5}/i.test(inBg)||
           /background[^:]*:\s*#fff/i.test(inBg)||
           /background[^:]*:\s*rgb\(\s*2[3-5]\d/i.test(inBg)){
          // Gradient varsa BG2, düz renkse transparent
          if(inBg.indexOf('gradient')>-1){
            el.style.setProperty('background','#23221e','important');
          } else {
            el.style.setProperty('background','transparent','important');
          }
        }
        // Açık renkli gradient (inline hex check)
        if(inBg.indexOf('linear-gradient')>-1){
          var hexes=inBg.match(/#[0-9a-fA-F]{3,8}/g);
          if(hexes){
            var lightGrad=hexes.every(function(hex){
              var h=hex.replace('#','');
              if(h.length===3) h=h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
              if(h.length<6) return false;
              var ri=parseInt(h.substr(0,2),16),gi=parseInt(h.substr(2,2),16),bi=parseInt(h.substr(4,2),16);
              return ri>180&&gi>180&&bi>180;
            });
            if(lightGrad){
              el.style.setProperty('background','#23221e','important');
            }
          }
        }
      }

      // ── BOX-SHADOW TEMİZLİĞİ (beyaz gölge → dark) ──
      var bs=cs.boxShadow;
      if(bs&&bs!=='none'&&bs.indexOf('rgba(0')>-1){
        // Hafif gölgeleri dark'a uyarla — daha koyu
        el.style.setProperty('box-shadow','0 2px 8px rgba(0,0,0,0.3)','important');
      }

      // ── YAZI RENGİ TEMİZLİĞİ ──
      var c=cs.color;
      var cm=c.match(/rgb\((\d+),\s*(\d+),\s*(\d+)/);
      if(cm){
        var cr=+cm[1],cg=+cm[2],cb=+cm[3];
        // Koyu text → açık (siyah, #1d1d1f, #333)
        if(cr<100&&cg<100&&cb<100){
          // h4/h3/strong → gold, p/span → TX2/TX1
          var tn=el.tagName;
          if(tn==='H1'||tn==='H2'||tn==='H3'||tn==='H4'||tn==='H5'||tn==='STRONG'||tn==='B'){
            el.style.setProperty('color','#af8c3e','important');
          } else {
            el.style.setProperty('color','#ece8df','important');
          }
        }
        // Orta gri (#666, #6e6e73, #86868b, #999) → TX2/TX3
        else if(cr>80&&cr<170&&cg>80&&cg<170&&cb>80&&cb<170){
          el.style.setProperty('color','#b5b0a4','important');
        }
      }

      // ── BORDER TEMİZLİĞİ ──
      var bcs=['borderTopColor','borderBottomColor','borderLeftColor','borderRightColor'];
      bcs.forEach(function(prop){
        var bc=cs[prop];
        if(bc){
          var bm=bc.match(/rgb\((\d+),\s*(\d+),\s*(\d+)/);
          if(bm && +bm[1]>200 && +bm[2]>200 && +bm[3]>200){
            el.style.setProperty(prop.replace(/([A-Z])/g,function(m){return '-'+m.toLowerCase()}),'rgba(175,140,62,.12)','important');
          }
        }
      });
    });

    // ── SALT HTML .D CLASS AKTİFLEŞTİRME ──
    // SALT Koleksiyon HTML kendi .D class dark mode'u var
    document.querySelectorAll('.product-details__description > div').forEach(function(d){
      // Root container dark bg
      var dStyle=d.getAttribute('style')||'';
      if(dStyle.indexOf('background')>-1&&(dStyle.indexOf('#fff')>-1||dStyle.indexOf('#ffffff')>-1)){
        d.style.setProperty('background','transparent','important');
      }
      // .D class varsa aktifleştir
      var styleTag=d.querySelector('style');
      if(styleTag&&styleTag.textContent.indexOf('.D ')>-1){
        d.classList.add('D');
      }
    });

    // ml-wrapper kendisi
    document.querySelectorAll('[class*="ml-"][class*="-wrapper"]').forEach(function(w){
      w.style.setProperty('background','#1b1a17','important');
      w.style.setProperty('color','#ece8df','important');
    });

    // Radio-view::after — CSS yetmiyor, class ile zorla
    document.querySelectorAll('.form-control__radio-view').forEach(function(rv){
      rv.classList.add('ml-radio-fix');
    });
    // ── RECENTLY VIEWED / RELATED ÜRÜN KARTLARI ENFORCEMENTİ ──
    document.querySelectorAll('[class*="recently"] .grid-product__wrap, .ec-related-products .grid-product__wrap, [class*="related"] .grid-product__wrap').forEach(function(w){
      w.style.setProperty('background','#23221e','important');
      w.style.setProperty('border','none','important');
      w.style.setProperty('border-radius','14px','important');
      w.style.setProperty('overflow','hidden','important');
      w.style.setProperty('box-shadow','inset 0 0 0 1px rgba(175,140,62,.12), 0 0 0 2px #1b1a17, 0 0 0 3px rgba(175,140,62,.06), 0 2px 12px rgba(0,0,0,.3)','important');
      // wrap-inner
      var inner=w.querySelector('.grid-product__wrap-inner,[class*="wrap-inner"]');
      if(inner){
        inner.style.setProperty('background','#23221e','important');
        inner.style.setProperty('border','none','important');
      }
      // Image wrapper bg
      w.querySelectorAll('.grid-product__image,.grid-product__picture,.grid-product__picture-wrapper,[class*="image-wrap"]').forEach(function(img){
        img.style.setProperty('background','#2c2b26','important');
        img.style.setProperty('border','none','important');
      });
      // Title renk — gri kalmasın
      w.querySelectorAll('.grid-product__title,.grid-product__title-inner').forEach(function(t){
        t.style.setProperty('color','#ece8df','important');
      });
      // Subtitle/description renk
      w.querySelectorAll('.grid-product__subtitle,.grid-product__sku,.grid-product__description').forEach(function(t){
        t.style.setProperty('color','#a09b8f','important');
      });
      // Fiyat renk — gold
      w.querySelectorAll('.grid-product__price .ec-price-item,.grid-product__price-value').forEach(function(t){
        t.style.setProperty('color','#d4b05e','important');
      });
      // Eski fiyat
      w.querySelectorAll('.grid-product__old-price,.grid-product__price-old').forEach(function(t){
        t.style.setProperty('color','#706c62','important');
      });
      // Hover white border kill + dark hover style enforce
      if(!w._mlHover){
        w._mlHover=true;
        w.addEventListener('mouseenter',function(){
          if(!document.body.classList.contains('ml-dark')) return;
          this.style.setProperty('border','none','important');
          this.style.setProperty('outline','none','important');
          this.style.setProperty('background','#23221e','important');
          this.style.setProperty('box-shadow','inset 0 0 0 1px #af8c3e, 0 0 0 2px #1b1a17, 0 0 0 3px #af8c3e, 0 4px 20px rgba(175,140,62,.15), 0 8px 32px rgba(0,0,0,.35)','important');
          this.style.setProperty('transform','translateY(-2px)','important');
        });
        w.addEventListener('mouseleave',function(){
          if(!document.body.classList.contains('ml-dark')) return;
          this.style.setProperty('border','none','important');
          this.style.setProperty('outline','none','important');
          this.style.setProperty('background','#23221e','important');
          this.style.setProperty('box-shadow','inset 0 0 0 1px rgba(175,140,62,.12), 0 0 0 2px #1b1a17, 0 0 0 3px rgba(175,140,62,.06), 0 2px 12px rgba(0,0,0,.3)','important');
          this.style.setProperty('transform','none','important');
        });
      }
    });
    // Recently viewed container bg + alt çizgi temizliği
    document.querySelectorAll('[class*="recently"], .ec-related-products, [class*="related-products"]').forEach(function(sec){
      sec.style.setProperty('background','#1b1a17','important');
      sec.style.setProperty('border','none','important');
      sec.style.setProperty('border-bottom','none','important');
      // Child divs'de beyaz bg/border temizle
      var kids=sec.children;
      for(var i=0;i<kids.length;i++){
        var k=kids[i];
        if(k.tagName==='DIV'){
          var kbg=getComputedStyle(k).backgroundColor;
          var km=kbg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)/);
          if(km&&+km[1]>180&&+km[2]>180&&+km[3]>180){
            k.style.setProperty('background','transparent','important');
          }
          k.style.setProperty('border','none','important');
          k.style.setProperty('border-bottom','none','important');
        }
      }
    });

    // ── HAKKINDA / ABOUT BÖLÜMÜ ENFORCEMENTİ ──
    document.querySelectorAll('.tile-about,.owner,.whyus,.contacts').forEach(function(sec){
      sec.style.setProperty('color','#ece8df','important');
      // Başlıklar → gold
      sec.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach(function(h){
        h.style.setProperty('color','#d4b05e','important');
      });
      // Paragraflar/span → TX1
      sec.querySelectorAll('p,span,div,li').forEach(function(el){
        // Skip headings inside
        if(el.tagName.match(/^H\d$/)) return;
        var cs=getComputedStyle(el).color;
        var m=cs.match(/rgb\((\d+),\s*(\d+),\s*(\d+)/);
        if(m && +m[1]<150 && +m[2]<150 && +m[3]<150){
          el.style.setProperty('color','#ece8df','important');
        }
      });
      // Linkler + underline → gold
      sec.querySelectorAll('a,u').forEach(function(el){
        el.style.setProperty('color','#d4b05e','important');
      });
    });

    // ── SON GÖRÜNTÜLENENLER — .recently-viewed class ENFORCEMENTİ ──
    // Section title
    document.querySelectorAll('.recently-viewed-title').forEach(function(el){
      el.style.setProperty('color','#ece8df','important');
    });
    // Kart container
    document.querySelectorAll('.recently-viewed[class*="recently-viewed--"]').forEach(function(card){
      card.style.setProperty('background','#23221e','important');
      card.style.setProperty('border','none','important');
      card.style.setProperty('border-radius','14px','important');
      card.style.setProperty('overflow','visible','important');
      card.style.setProperty('padding','0','important');
      card.style.setProperty('margin','0 8px','important');
      card.style.setProperty('box-shadow','inset 0 0 0 1px rgba(175,140,62,.12), 0 0 0 2px #1b1a17, 0 0 0 3px rgba(175,140,62,.06), 0 2px 12px rgba(0,0,0,.3)','important');
      // Ürün adı
      var name=card.querySelector('.recently-viewed__name');
      if(name){
        name.style.setProperty('color','#ece8df','important');
        name.style.setProperty('text-align','center','important');
        name.style.setProperty('font-size','14px','important');
        name.style.setProperty('padding','10px 8px 4px','important');
        name.style.setProperty('line-height','1.3','important');
      }
      // Fiyat
      card.querySelectorAll('.recently-viewed__price,.recently-viewed__price .ec-price-item').forEach(function(p){
        p.style.setProperty('color','#d4b05e','important');
        p.style.setProperty('text-align','center','important');
        p.style.setProperty('font-size','16px','important');
        p.style.setProperty('font-weight','600','important');
        p.style.setProperty('padding','4px 8px 12px','important');
      });
      card.querySelectorAll('.recently-viewed__price .ec-price-item--old').forEach(function(p){
        p.style.setProperty('color','#706c62','important');
      });
      // Thumbnail — beyaz bg, sabit yükseklik, contain
      var thumb=card.querySelector('.recently-viewed__thumb');
      if(thumb){
        thumb.style.setProperty('background','#fff','important');
        thumb.style.setProperty('border','none','important');
        thumb.style.setProperty('border-radius','14px 14px 0 0','important');
        thumb.style.setProperty('overflow','hidden','important');
        thumb.style.setProperty('height','150px','important');
        thumb.style.setProperty('display','flex','important');
        thumb.style.setProperty('align-items','center','important');
        thumb.style.setProperty('justify-content','center','important');
        var img=thumb.querySelector('img');
        if(img){
          img.style.setProperty('border-radius','0','important');
          img.style.setProperty('width','100%','important');
          img.style.setProperty('height','100%','important');
          img.style.setProperty('object-fit','contain','important');
        }
      }
      // Hover
      if(!card._mlRVHover){
        card._mlRVHover=true;
        card.addEventListener('mouseenter',function(){
          if(!document.body.classList.contains('ml-dark')) return;
          this.style.setProperty('box-shadow','inset 0 0 0 1px #af8c3e, 0 0 0 2px #1b1a17, 0 0 0 3px #af8c3e, 0 4px 20px rgba(175,140,62,.15), 0 8px 32px rgba(0,0,0,.35)','important');
          this.style.setProperty('transform','translateY(-2px)','important');
        });
        card.addEventListener('mouseleave',function(){
          if(!document.body.classList.contains('ml-dark')) return;
          this.style.setProperty('box-shadow','inset 0 0 0 1px rgba(175,140,62,.12), 0 0 0 2px #1b1a17, 0 0 0 3px rgba(175,140,62,.06), 0 2px 12px rgba(0,0,0,.3)','important');
          this.style.setProperty('transform','none','important');
        });
      }
    });

    // ── STATİK SAYFA ZORLA DARK BG ──
    document.querySelectorAll('.ec-page-body, [class*="ec-page"], [class*="page-body"], [class*="store-page"]').forEach(function(pg){
      pg.style.setProperty('background-color','#1b1a17','important');
      pg.style.setProperty('color','#ece8df','important');
      // İçindeki tüm div'leri dark yap + hover beyaz flash önle
      pg.querySelectorAll('div').forEach(function(d){
        var dbg=getComputedStyle(d).backgroundColor;
        var dm=dbg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)/);
        if(dm&&+dm[1]>180&&+dm[2]>180&&+dm[3]>180){
          d.style.setProperty('background-color','#1b1a17','important');
        }
        // Tıklanabilir/hover elementlere dark hover zorla
        if(d.onclick||d.getAttribute('onclick')||d.style.cursor==='pointer'||getComputedStyle(d).cursor==='pointer'){
          if(!d._mlHoverFix){
            d._mlHoverFix=true;
            d.addEventListener('mouseenter',function(){
              this.style.setProperty('background-color','#2c2b26','important');
            });
            d.addEventListener('mouseleave',function(){
              this.style.setProperty('background-color','#23221e','important');
            });
          }
        }
      });
      // border temizliği
      pg.querySelectorAll('div,section,article').forEach(function(el){
        var bc=getComputedStyle(el).borderColor;
        if(bc){
          var bm=bc.match(/rgb\((\d+),\s*(\d+),\s*(\d+)/);
          if(bm&&+bm[1]>200&&+bm[2]>200&&+bm[3]>200){
            el.style.setProperty('border-color','rgba(175,140,62,.12)','important');
          }
        }
      });
    });

    // ── CHECKBOX VİSİBİLİTY ENFORCEMENTİ ──
    document.querySelectorAll('.form-control__checkbox-view').forEach(function(cv){
      // Unchecked — görünür border zorla
      cv.style.setProperty('border','1.5px solid rgba(175,140,62,.5)','important');
      cv.style.setProperty('border-radius','3px','important');
      // Checked kontrolü
      var inp=cv.previousElementSibling;
      if(!inp) inp=cv.parentElement.querySelector('.form-control__checkbox');
      if(inp && inp.checked){
        cv.style.setProperty('background','#af8c3e','important');
        cv.style.setProperty('border-color','#af8c3e','important');
      } else {
        cv.style.setProperty('background','#1b1a17','important');
      }
    });
    // ── AGREEMENT CHECKBOX — dikkat çekici pulse ──
    document.querySelectorAll('.ec-cart-step label,.ec-cart [class*="agreement"],.ec-cart [class*="consent"]').forEach(function(lbl){
      var txt=(lbl.textContent||'').toLowerCase();
      if(txt.indexOf('kabul')>-1||txt.indexOf('accept')>-1||txt.indexOf('şartlar')>-1){
        var wrap=lbl.closest('.form-control')||lbl.closest('[class*="checkbox"]')||lbl.parentElement;
        if(wrap){
          var cb=wrap.querySelector('.form-control__checkbox');
          if(cb && !cb.checked){
            wrap.classList.add('ml-agree-pulse');
          } else {
            wrap.classList.remove('ml-agree-pulse');
          }
        }
      }
    });
  }
}

function fixBadgeRect(){
  if(!document.body.classList.contains('ml-dark')) return;
  // Container — inline-flex ile sarmalı
  document.querySelectorAll('.product-details__label-container').forEach(function(el){
    el.style.setProperty('display','inline-flex','important');
    el.style.setProperty('width','auto','important');
    el.style.setProperty('max-width','fit-content','important');
    el.style.setProperty('overflow','hidden','important');
    el.style.setProperty('border-radius','4px','important');
  });
  // İç label — temiz dikdörtgen
  document.querySelectorAll('.product-details .ec-label,.details-product-purchase__place .ec-label').forEach(function(el){
    el.style.setProperty('display','inline-block','important');
    el.style.setProperty('width','auto','important');
    el.style.setProperty('max-width','none','important');
    el.style.setProperty('padding','4px 14px','important');
    el.style.setProperty('border-radius','4px','important');
    el.style.setProperty('white-space','nowrap','important');
    el.style.setProperty('box-sizing','border-box','important');
    el.style.setProperty('line-height','1.4','important');
    el.style.setProperty('overflow','hidden','important');
    el.style.setProperty('margin','0','important');
  });
}

// ─── FLOATING İKONLAR (Sepet + Arama daireleri) ───
function fixFloatingIcons(){
  if(!document.body.classList.contains('ml-dark')) return;
  // Kare wrapper'ları temizle
  document.querySelectorAll('.float-icons,.float-icons__wrap,.float-icons__icon,.float-icons__icon > div,.float-icons__wrap .ec-minicart__body,.float-icons__wrap .ec-minicart__icon').forEach(function(el){
    el.style.setProperty('background','transparent','important');
    el.style.setProperty('border','none','important');
    el.style.setProperty('box-shadow','none','important');
  });
  // Sadece yuvarlak ec-minicart daireler
  document.querySelectorAll('.float-icons__wrap .ec-minicart').forEach(function(el){
    el.style.setProperty('background','#23221e','important');
    el.style.setProperty('border','1px solid rgba(175,140,62,.2)','important');
    el.style.setProperty('box-shadow','0 2px 8px rgba(0,0,0,.3)','important');
  });
  document.querySelectorAll('.float-icons__wrap svg').forEach(function(svg){
    svg.style.setProperty('color','#d4b05e','important');
    svg.style.setProperty('fill','#d4b05e','important');
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
