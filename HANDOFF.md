# Manhattan Likit — Master Handoff

> Bu dosya `project_knowledge_search` ile aranır — baştan sona okunmaz.
> Kritik kurallar ve deploy yöntemi → System Instruction'da (her zaman aktif).
> Domain detayları → HANDOFF_DARKMODE.md, HANDOFF_KARGO.md, HANDOFF_WIDGET.md, HANDOFF_CARK.md

## Güncel Dosya Durumları (Brace Tablosu)
| Dosya | Satır | Brace |
|-------|-------|-------|
| MANHATTAN_LIKIT_FINAL.gs | 3488 | 700/700 |
| kargo.html | 1154 | 286/286 |
| dark-mode.js | 5233 | 1659/1659 |
| widget.js | 904 | 518/518 |
| widgetwix.js | 857 | 480/480 |
| spinwheel.js | 1148 | 324/324 |
| spin.html | 932 | 280/280 |

> ⚠️ Bu tablo her oturumda düzenlenecek tek brace referansıdır.

### GAS Endpoint'leri — Kargo (POST)
| Action | Açıklama | Yeni? |
|--------|----------|-------|
| `kargoSaveAndToggle` | Kuralları kaydet + trigger oluştur/sil | ✅ YENİ |
| `kargoGetAutoReminderStatus` | Kurallar + send istatistikleri | ✅ GÜNCELLENDİ |
| `kargoTestAutoReminder` | Dry-run test, kural eşleşme kontrolü | r3 eklendi |
| `kargoSendReminder` | Tek sipariş için mail gönder | Değişmedi |
| `kargoGetOrders` | Bekleyen siparişleri çek (PAID + AWAITING/PROCESSING) | Takip import'ta kullanılıyor |
| `kargoGetUnpaidOrders` | Ödeme bekleyen sipariş listesi | Değişmedi |
| `kargoUpdateTracking` | Sipariş durumunu SHIPPED yap + takip URL ekle | Takip import'ta kullanılıyor |
| `kargoBatchUpdate` | Toplu telefon eşleştirme + güncelleme (pasif — deployment URL sorunu) | GAS'ta var ama çağrılmıyor |
| `kargoToggleAutoReminder` | Eski master toggle (artık kullanılmıyor) | DEPRECATED |
| `kargoSaveRules` | Eski sadece kayıt (artık kullanılmıyor) | DEPRECATED |

### GAS Endpoint'leri — Widget (GET)
| Action | Açıklama | Yeni? |
|--------|----------|-------|
| `flash` | Flash kupon oluştur/döndür + expiry | ✅ GÜNCELLENDİ |
| `spin` | Çark çevir — ödül seç + kupon oluştur | ✅ YENİ |
| `spin-check` | Config check: testMode + tickSound + celebSound + segTexts + fontScale | ✅ YENİ |
| `spinSaveConfig` | spin.html'den config kaydet (POST) | ✅ YENİ |
| `spinGetConfig` | spin.html'e config döndür (GET) | ✅ YENİ |
| `spinGetStats` | İstatistik: toplam spin, son 7/30 gün | ✅ YENİ |
| `birthday` | Doğum günü kaydet | Değişmedi |
| `referral` | Referans kupon | Değişmedi |
| `lookup` | Müşteri puan/tier sorgusu | Değişmedi |
| `check-referral` | Referans durumu kontrol | Değişmedi |
| `send-referral-email` | Referans maili gönder | Değişmedi |
| `check-birthday` | Doğum günü kontrol (Sheet'ten) | ✅ YENİ |

## Bilinen Kısıtlamalar
- `kargoToggleAutoReminder` ve `kargoSaveRules` DEPRECATED — GAS'ta duruyor ama kargo.html çağırmıyor
- Eski `kargoCheckOrder` ve `kargoSearchByPhone` endpoint'leri GAS'ta duruyor — import akışında artık kullanılmıyor ama tek sipariş sorgusu için hala çalışır
- `kargoBatchUpdate` GAS'ta var ama kargo.html çağırmıyor — "Yeni Dağıtım" URL sorunu nedeniyle client-side telefon eşleşmeye geçildi
- Flash bonus sadece giriş yapmış kullanıcılara çalışır (email gerekli)
- Otomatik hatırlatma 5dk interval — tam dakikada değil, GAS trigger zamanlamasına bağlı
- Takip kodu import: SHIPPED siparişler kargoGetOrders havuzunda olmadığı için "Eşleşmedi" görünür (veri kaybı yok, sadece mesaj farklı)
- Çark çevir: Şu an sadece manhattandan.com (Ecwid) için. Wix versiyonu gerekirse ayrı dosya yapılmalı
- Çark giriş algılama: widget.js'in _mlCache'i async (GAS fetch bağımlı). spinwheel.js açılışta _mlCache yoksa Ecwid.Customer.get ile fallback yapar
- Çark cooldown: localStorage tabanlı kalıcı — tarayıcı temizlenirse sıfırlanır ama GAS tarafında week_key kontrolü devam eder
- GAS auto-deploy: GitHub Actions → clasp push. `script.googleapis.com` datacenter IP'lerden erişilemiyor (Google güvenlik). Alternatif: Mac'te `gaspush` alias

## GAS Deploy Otomasyonu
**Akış:** Claude GAS dosyasını GitHub'a push → GitHub Actions tetiklenir → `clasp push --force` → Apps Script güncellenir

**Dosyalar:**
- `.github/workflows/gas-deploy.yml` — workflow tanımı
- `appsscript.json` — GAS manifest (timeZone, runtime, webapp)
- GitHub Secret `CLASPRC` — clasp OAuth token (info@manhattanlikit.com)

**Tetikleme:** Sadece `MANHATTAN_LIKIT_FINAL.gs` veya `appsscript.json` değişince çalışır.

**Manuel yedek (Mac terminal):**
```bash
cd ~/gas-manhattan && curl -sO https://raw.githubusercontent.com/manhattanlikit/manhattan-widget/main/MANHATTAN_LIKIT_FINAL.gs && clasp push --force
```
Veya alias: `gaspush`

**Kurulum notları:**
- clasp: `npm install -g @google/clasp` (Mac'te `sudo` gerekli)
- `clasp login` → tarayıcıda Google OAuth → `~/.clasprc.json` oluşur
- Script ID: `1eY5Rh8AYTroa1QB3gqHLeXSo7yenQFMjPcawbfC0bLMjH9LGBD65cah3`
- Apps Script API: https://script.google.com/home/usersettings → Açık olmalı
- `~/gas-manhattan/` → clasp proje dizini (clone ile oluştu)

---


### Sheet Yapıları → Domain Handoff'larda
- PaymentReminders → `HANDOFF_KARGO.md`
- FlashCoupons → `HANDOFF_WIDGET.md`
- SpinWheel → `HANDOFF_CARK.md`

### Detaylı Akış Diyagramları → Domain Handoff'larda
- Takip Kodu Import Akışı → `HANDOFF_KARGO.md`
- Otomatik Trigger Akışı → `HANDOFF_KARGO.md`
- Kriz Senaryoları → `HANDOFF_KARGO.md`
