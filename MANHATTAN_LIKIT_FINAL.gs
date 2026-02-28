// ============================================================
// Manhattan Likit — Sadakat Programı Otomasyon
// Google Apps Script + Ecwid API (Batch Processing)
// ============================================================

const CONFIG = {
  STORE_ID: '11692025',
  API_TOKEN: 'secret_nQ6JM4ewfv5QJJXbQyxe41kH5LukVdA2',
  BASE_URL: 'https://app.ecwid.com/api/v3',
  
  TIERS: [
    { name: 'Diamond',  minSpend: 40000, maxReturn: 3,   maxCancel: 2  },
    { name: 'Platinum', minSpend: 20000, maxReturn: 4,   maxCancel: 3  },
    { name: 'Gold',     minSpend: 10000, maxReturn: 5,   maxCancel: 5  },
    { name: 'Silver',   minSpend: 5000,  maxReturn: 6,   maxCancel: 8  },
    { name: 'Bronze',   minSpend: 2000,  maxReturn: 7,   maxCancel: 10 },
    { name: 'Starter',  minSpend: 0,     maxReturn: 100, maxCancel: 100 },
  ],
  
  STARTER_RETURN_THRESHOLD: 20,
  LOOKBACK_DAYS: 365,
  BATCH_SIZE: 1000,        // Her seferde max guncelleme
  API_DELAY: 600,         // Istekler arasi bekleme (ms)
  
  // Dogum gunu kupon ayarlari
  NOTIFICATION_EMAIL: 'info@manhattanlikit.com',
  BIRTHDAY_DISCOUNT_PERCENT: 5,
  BIRTHDAY_COUPON_VALIDITY_DAYS: 7,
  BIRTHDAY_ADVANCE_DAYS: 0,
  BIRTHDAY_MANIPULATION_DAYS: 7,
  BIRTHDAY_CHANGE_COOLDOWN_DAYS: 365,
  
  // Referral ayarlari (Silver ve uzeri)
  REFERRAL_TIERS: {
    'Silver':   { discount: 5 },
    'Gold':     { discount: 7.5 },
    'Platinum': { discount: 10 },
    'Diamond':  { discount: 15 }
  },
  REFERRAL_COUPON_VALIDITY_DAYS: 14,
  REFERRAL_DAILY_LIMIT: 3,
  REFERRAL_MONTHLY_LIMIT: 10,
  
  // Flash bonus ayarlari (Hafta sonu)
  FLASH_DISCOUNT_PERCENT: 2.5,
  FLASH_COUPON_VALIDITY_HOURS: 24
  // Çark ayarları → PropertiesService (_SPIN_DEFAULT_CONFIG) taşındı
};

// ===================== API HELPERS =====================

function ecwidGet(endpoint) {
  var url = CONFIG.BASE_URL + '/' + CONFIG.STORE_ID + '/' + endpoint;
  var options = {
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + CONFIG.API_TOKEN },
    muteHttpExceptions: true
  };
  var maxRetries = 3;
  for (var attempt = 1; attempt <= maxRetries; attempt++) {
    var response = UrlFetchApp.fetch(url, options);
    var code = response.getResponseCode();
    if (code === 200) return JSON.parse(response.getContentText());
    if ((code === 403 || code === 429 || code === 503 || response.getContentText().indexOf('Bandwidth') > -1) && attempt < maxRetries) {
      var wait = attempt * 10000; // 10s, 20s, 30s
      Logger.log('API ' + code + ' hatasi, ' + (wait/1000) + ' sn bekleniyor... (deneme ' + attempt + '/' + maxRetries + ')');
      Utilities.sleep(wait);
      continue;
    }
    throw new Error('API GET hatasi: ' + code + ' - ' + response.getContentText().substring(0, 200));
  }
}

function ecwidPut(endpoint, payload) {
  var url = CONFIG.BASE_URL + '/' + CONFIG.STORE_ID + '/' + endpoint;
  var options = {
    method: 'put',
    headers: {
      'Authorization': 'Bearer ' + CONFIG.API_TOKEN,
      'Content-Type': 'application/json'
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };
  var maxRetries = 3;
  for (var attempt = 1; attempt <= maxRetries; attempt++) {
    var response = UrlFetchApp.fetch(url, options);
    var code = response.getResponseCode();
    if (code === 200) return JSON.parse(response.getContentText());
    if ((code === 403 || code === 429 || code === 503) && attempt < maxRetries) {
      var wait = attempt * 10000;
      Logger.log('PUT ' + code + ' hatasi, ' + (wait/1000) + ' sn bekleniyor... (deneme ' + attempt + '/' + maxRetries + ')');
      Utilities.sleep(wait);
      continue;
    }
    Logger.log('PUT hatasi (' + endpoint + '): ' + code);
    return null;
  }
}

// ===================== INITIALIZATION =====================

function initializeGroups() {
  var data = ecwidGet('customer_groups');
  var groups = data.items || data;
  var props = PropertiesService.getScriptProperties();
  var mapping = {};
  
  groups.forEach(function(g) {
    mapping[g.name] = g.id;
    Logger.log('Grup: ' + g.name + ' → ID: ' + g.id);
  });
  
  props.setProperty('GROUP_IDS', JSON.stringify(mapping));
  
  var requiredGroups = CONFIG.TIERS.map(function(t) { return t.name; });
  var missingGroups = requiredGroups.filter(function(name) { return !mapping[name]; });
  
  if (missingGroups.length > 0) {
    Logger.log('EKSIK GRUPLAR: ' + missingGroups.join(', '));
  } else {
    Logger.log('Tum gruplar mevcut!');
  }
  Logger.log(JSON.stringify(mapping, null, 2));
  return mapping;
}

function loadGroupIds() {
  var props = PropertiesService.getScriptProperties();
  var stored = props.getProperty('GROUP_IDS');
  if (!stored) throw new Error('Grup IDleri bulunamadi. Once initializeGroups() calistirin.');
  return JSON.parse(stored);
}

// ===================== DATA FETCHING =====================

function fetchAllOrders() {
  var cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - CONFIG.LOOKBACK_DAYS);
  var cutoffTimestamp = Math.floor(cutoffDate.getTime() / 1000);
  
  var allOrders = [];
  var offset = 0;
  var limit = 100;
  var hasMore = true;
  
  while (hasMore) {
    var data = ecwidGet('orders?createdFrom=' + cutoffTimestamp + '&limit=' + limit + '&offset=' + offset);
    var orders = data.items || [];
    allOrders = allOrders.concat(orders);
    Logger.log('Siparisler: ' + allOrders.length + ' / ' + (data.total || '?'));
    
    if (orders.length < limit) {
      hasMore = false;
    } else {
      offset += limit;
      Utilities.sleep(600);
    }
  }
  Logger.log('Toplam ' + allOrders.length + ' siparis cekildi.');
  return allOrders;
}

function fetchAllCustomers() {
  var allCustomers = [];
  var offset = 0;
  var limit = 100;
  var hasMore = true;
  
  while (hasMore) {
    var data = ecwidGet('customers?limit=' + limit + '&offset=' + offset);
    var customers = data.items || [];
    allCustomers = allCustomers.concat(customers);
    
    if (customers.length < limit) {
      hasMore = false;
    } else {
      offset += limit;
      Utilities.sleep(800);
    }
  }
  Logger.log('Toplam ' + allCustomers.length + ' musteri cekildi.');
  return allCustomers;
}

// ===================== CALCULATION =====================

function calculateCustomerMetrics(orders) {
  var metrics = {};
  
  orders.forEach(function(order) {
    var email = (order.email || '').toLowerCase().trim();
    if (!email) return;
    
    if (!metrics[email]) {
      metrics[email] = {
        email: email,
        customerId: order.customerId,
        totalSpend: 0,
        totalOrders: 0,
        refundCount: 0,
        cancelCount: 0,
      };
    }
    
    var m = metrics[email];
    m.totalOrders++;
    if (order.customerId) m.customerId = order.customerId;
    
    var payStatus = (order.paymentStatus || '').toUpperCase();
    var fulfStatus = (order.fulfillmentStatus || '').toUpperCase();
    
    if (payStatus === 'CANCELLED' || fulfStatus === 'WILL_NOT_DELIVER') {
      m.cancelCount++;
      return;
    }
    
    if (payStatus === 'REFUNDED' || payStatus === 'PARTIALLY_REFUNDED' || fulfStatus === 'RETURNED') {
      m.refundCount++;
      return;
    }
    
    if (payStatus === 'PAID' || payStatus === 'ACCEPTED') {
      if (fulfStatus === 'DELIVERED' || fulfStatus === 'SHIPPED') {
        m.totalSpend += (order.total || 0);
      }
    }
  });
  
  Object.keys(metrics).forEach(function(key) {
    var m = metrics[key];
    m.returnRate = m.totalOrders > 0 ? (m.refundCount / m.totalOrders) * 100 : 0;
    m.cancelRate = m.totalOrders > 0 ? (m.cancelCount / m.totalOrders) * 100 : 0;
  });
  
  return metrics;
}

function determineTier(metrics) {
  var totalSpend = metrics.totalSpend;
  var returnRate = metrics.returnRate;
  var cancelRate = metrics.cancelRate;
  
  if (returnRate > CONFIG.STARTER_RETURN_THRESHOLD) return 'Starter';
  
  for (var i = 0; i < CONFIG.TIERS.length; i++) {
    var tier = CONFIG.TIERS[i];
    if (totalSpend >= tier.minSpend) {
      if (returnRate < tier.maxReturn && cancelRate < tier.maxCancel) {
        return tier.name;
      }
    }
  }
  return 'Starter';
}

// ===================== BATCH UPDATE =====================

/**
 * Batch guncelleme - her calistiginda BATCH_SIZE kadar musteri gunceller.
 * Kaldigini yerden devam eder. Tum musteriler bitince sifirlanir.
 */
function fullLoyaltyUpdate() {
  var props = PropertiesService.getScriptProperties();
  var groupIds = loadGroupIds();
  
  // Onceki batch'ten kalan veri var mi?
  var batchIndex = parseInt(props.getProperty('BATCH_INDEX') || '0');
  var totalUpdates = JSON.parse(props.getProperty('BATCH_TOTALS') || '{"upgrades":0,"downgrades":0,"unchanged":0}');
  
  var updateList;
  
  if (props.getProperty('BATCH_CHUNKS') && batchIndex > 0) {
    // Devam eden batch - parcalardan yukle
    updateList = [];
    var totalChunks = parseInt(props.getProperty('BATCH_CHUNKS') || '0');
    for (var ci = 0; ci < totalChunks; ci++) {
      var minChunk = JSON.parse(props.getProperty('BATCH_' + ci) || '[]');
      minChunk.forEach(function(item) {
        updateList.push({customerId: item.c, newGroupId: item.g, email: item.e, name: item.n, from: item.f, to: item.t, spend: item.s, returnRate: item.r, cancelRate: item.k});
      });
    }
    Logger.log('Devam ediliyor: ' + batchIndex + ' / ' + updateList.length);
  } else {
    // Yeni hesaplama
    Logger.log('Yeni hesaplama basliyor...');
    var orders = fetchAllOrders();
    var customers = fetchAllCustomers();
    var metrics = calculateCustomerMetrics(orders);
    
    var customerMap = {};
    customers.forEach(function(c) {
      var email = (c.email || '').toLowerCase().trim();
      if (email) {
        customerMap[email] = {
          id: c.id,
          currentGroupId: c.customerGroupId || null,
          name: c.name || email,
        };
      }
    });
    
    var groupIdToName = {};
    Object.keys(groupIds).forEach(function(name) {
      groupIdToName[groupIds[name]] = name;
    });
    
    // Degisecek musterileri listele
    updateList = [];
    
    Object.keys(metrics).forEach(function(key) {
      var m = metrics[key];
      var customer = customerMap[m.email];
      if (!customer) return;
      
      var newTierName = determineTier(m);
      var newGroupId = groupIds[newTierName];
      if (!newGroupId) return;
      
      if (customer.currentGroupId !== newGroupId) {
        var currentGroupName = groupIdToName[customer.currentGroupId] || 'Yok';
        updateList.push({
          customerId: customer.id,
          email: m.email,
          name: customer.name,
          from: currentGroupName,
          to: newTierName,
          newGroupId: newGroupId,
          spend: Math.round(m.totalSpend),
          returnRate: m.returnRate.toFixed(1),
          cancelRate: m.cancelRate.toFixed(1),
        });
      }
    });
    
    // Son 12 ayda siparisi olmayan ama hala tier grubunda olan musterileri General'a tasi
    var tierGroupIds = {};
    CONFIG.TIERS.forEach(function(t) {
      if (groupIds[t.name]) tierGroupIds[groupIds[t.name]] = t.name;
    });
    
    Object.keys(customerMap).forEach(function(email) {
      var customer = customerMap[email];
      if (!metrics[email] && customer.currentGroupId && tierGroupIds[customer.currentGroupId]) {
        var currentGroupName = tierGroupIds[customer.currentGroupId];
        updateList.push({
          customerId: customer.id,
          email: email,
          name: customer.name,
          from: currentGroupName,
          to: 'General',
          newGroupId: 0,
          spend: 0,
          returnRate: '0.0',
          cancelRate: '0.0',
        });
      }
    });
    
    Logger.log('Degisecek musteri: ' + updateList.length);
    
    // Listeyi parcalara bolup kaydet (property basina 9KB limit)
    var chunkSize = 200;
    var totalChunks = Math.ceil(updateList.length / chunkSize);
    for (var ci = 0; ci < totalChunks; ci++) {
      var chunk = updateList.slice(ci * chunkSize, (ci + 1) * chunkSize);
      // Kisa keylerle kaydet (boyut azalt)
      var minChunk = chunk.map(function(item) {
        return {c: item.customerId, g: item.newGroupId, e: item.email, n: item.name, f: item.from, t: item.to, s: item.spend, r: item.returnRate, k: item.cancelRate};
      });
      props.setProperty('BATCH_' + ci, JSON.stringify(minChunk));
    }
    props.setProperty('BATCH_CHUNKS', totalChunks.toString());
    props.setProperty('BATCH_TOTAL', updateList.length.toString());
    batchIndex = 0;
    totalUpdates = { upgrades: 0, downgrades: 0, unchanged: 0 };
  }
  
  // Bu batch'te guncellenecekler
  var endIndex = Math.min(batchIndex + CONFIG.BATCH_SIZE, updateList.length);
  var changes = [];
  var errors = 0;
  
  Logger.log('Batch: ' + batchIndex + ' → ' + endIndex + ' (toplam: ' + updateList.length + ')');
  
  for (var i = batchIndex; i < endIndex; i++) {
    var item = updateList[i];
    
    var result = ecwidPut('customers/' + item.customerId, { customerGroupId: item.newGroupId });
    
    if (result !== null) {
      var newIdx = -1, oldIdx = -1;
      for (var j = 0; j < CONFIG.TIERS.length; j++) {
        if (CONFIG.TIERS[j].name === item.to) newIdx = j;
        if (CONFIG.TIERS[j].name === item.from) oldIdx = j;
      }
      var isUpgrade = newIdx < oldIdx;
      var direction;
      if (item.from === 'Yok') {
        direction = 'YENI';
      } else if (item.to === 'General') {
        direction = 'DOWN';
      } else if (isUpgrade) {
        direction = 'UP';
      } else {
        direction = 'DOWN';
      }
      
      if (isUpgrade) {
        totalUpdates.upgrades++;
        // Seviye yükseltme emaili gonder (DOWN'da gonderme)
        if (direction === 'UP' || direction === 'YENI') {
          try { sendTierUpgradeEmail(item.email, item.name, item.from, item.to); } catch(emailErr) { Logger.log('Upgrade email error: ' + emailErr); }
        }
      } else {
        totalUpdates.downgrades++;
      }
      
      changes.push({
        email: item.email,
        name: item.name,
        from: item.from,
        to: item.to,
        spend: item.spend,
        returnRate: item.returnRate,
        cancelRate: item.cancelRate,
        direction: direction
      });
    } else {
      errors++;
    }
    
    Utilities.sleep(CONFIG.API_DELAY);
    
    // Her 100 istekte bir ilerleme kaydet
    if ((i - batchIndex) % 100 === 99) {
      Logger.log('Ilerleme: ' + (i + 1) + ' / ' + updateList.length);
      // Ilerlemeyi kaydet (timeout olursa kaybolmasin)
      props.setProperty('BATCH_INDEX', (i + 1).toString());
      props.setProperty('BATCH_TOTALS', JSON.stringify(totalUpdates));
      // Loglari da yaz
      if (changes.length > 0) {
        logToSheet(changes);
        changes = [];
      }
    }
  }
  
  // Degisiklikleri logla
  if (changes.length > 0) {
    logToSheet(changes);
  }
  
  // Sonraki batch icin kaydet
  if (endIndex < updateList.length) {
    props.setProperty('BATCH_INDEX', endIndex.toString());
    props.setProperty('BATCH_TOTALS', JSON.stringify(totalUpdates));
    Logger.log('Batch tamamlandi: ' + endIndex + ' / ' + updateList.length);
    Logger.log('Kalan: ' + (updateList.length - endIndex) + ' musteri');
    Logger.log('Sonraki batch icin tekrar calistirin veya trigger bekleyin.');
  } else {
    // Tum musteriler guncellendi - temizle
    var totalChunks = parseInt(props.getProperty('BATCH_CHUNKS') || '0');
    for (var ci = 0; ci < totalChunks; ci++) {
      props.deleteProperty('BATCH_' + ci);
    }
    props.deleteProperty('BATCH_CHUNKS');
    props.deleteProperty('BATCH_TOTAL');
    props.deleteProperty('BATCH_INDEX');
    props.deleteProperty('BATCH_TOTALS');
    
    var summary = 'TAMAMLANDI! Yukseltme: ' + totalUpdates.upgrades + 
      ', Dusurme: ' + totalUpdates.downgrades + 
      ', Hata: ' + errors;
    Logger.log(summary);
    logSummary(totalUpdates, updateList.length);
  }
  
  Logger.log('Bu batch: ' + changes.length + ' guncelleme, ' + errors + ' hata');
}

/**
 * 15 dakikalık tier sync trigger'i kur (bir kez calistir)
 */
function setupDailyTrigger() {
  // Onceki triggerlari temizle
  var triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(function(t) {
    if (t.getHandlerFunction() === 'dailyLoyaltyCheck') {
      ScriptApp.deleteTrigger(t);
    }
  });
  
  ScriptApp.newTrigger('dailyLoyaltyCheck')
    .timeBased()
    .everyMinutes(15)
    .create();
  
  Logger.log('15dk trigger kuruldu: Her 15 dakikada calisacak.');
}

// ===================== DAILY TRIGGER =====================

/**
 * Gunluk calisacak fonksiyon (gece 03:00)
 * Once devam eden batch varsa bitirir, yoksa yeni hesaplama baslatir
 */
function dailyLoyaltyCheck() {
  Logger.log('=== Gunluk Sadakat Kontrolu ===');
  try {
    fullLoyaltyUpdate();
    updateStatus('Basarili ✅');
  } catch(e) {
    Logger.log('HATA: ' + e.message);
    updateStatus('HATA: ' + e.message);
  }
}

// ===================== LOGGING =====================

function logToSheet(changes) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var logSheet = ss.getSheetByName('Sadakat Log');
  if (!logSheet) {
    logSheet = ss.insertSheet('Sadakat Log');
    logSheet.appendRow(['Tarih', 'E-posta', 'Ad', 'Eski', 'Yeni', 'Harcama', 'Iade %', 'Iptal %', 'Yon']);
    logSheet.getRange(1, 1, 1, 9).setFontWeight('bold');
  }
  
  var now = new Date().toLocaleString('tr-TR');
  var startRow = logSheet.getLastRow() + 1;
  
  changes.forEach(function(c) {
    logSheet.appendRow([now, c.email, c.name, c.from, c.to, c.spend + ' TL', c.returnRate + '%', c.cancelRate + '%', c.direction]);
  });
  
  // Renklendirme
  var endRow = logSheet.getLastRow();
  if (endRow >= startRow) {
    for (var r = startRow; r <= endRow; r++) {
      var yon = logSheet.getRange(r, 9).getValue();
      var rowRange = logSheet.getRange(r, 1, 1, 9);
      if (yon === 'UP') {
        rowRange.setBackground('#dcfce7'); // yesil
        logSheet.getRange(r, 9).setValue('⬆️ UP');
      } else if (yon === 'DOWN') {
        rowRange.setBackground('#fee2e2'); // kirmizi
        logSheet.getRange(r, 9).setValue('⬇️ DOWN');
      } else if (yon === 'YENI') {
        rowRange.setBackground('#dbeafe'); // mavi
        logSheet.getRange(r, 9).setValue('🆕 YENI');
      }
    }
  }
}

function logSummary(totals, totalCustomers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var summarySheet = ss.getSheetByName('Ozet');
  if (!summarySheet) {
    summarySheet = ss.insertSheet('Ozet');
    summarySheet.appendRow(['Tarih', 'Toplam', 'Yukseltme', 'Dusurme']);
    summarySheet.getRange(1, 1, 1, 4).setFontWeight('bold');
  }
  summarySheet.appendRow([
    new Date().toLocaleString('tr-TR'),
    totalCustomers,
    totals.upgrades,
    totals.downgrades
  ]);
}

// ===================== UTILITY =====================

/**
 * Mevcut tum log satirlarini renklendir (bir kez calistir)
 */
function colorizeExistingLog() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var logSheet = ss.getSheetByName('Sadakat Log');
  if (!logSheet) return;
  
  var lastRow = logSheet.getLastRow();
  if (lastRow < 2) return;
  
  for (var r = 2; r <= lastRow; r++) {
    var yon = logSheet.getRange(r, 9).getValue().toString();
    var eski = logSheet.getRange(r, 4).getValue().toString();
    var rowRange = logSheet.getRange(r, 1, 1, 9);
    
    if (eski === 'Yok') {
      rowRange.setBackground('#dbeafe');
      logSheet.getRange(r, 9).setValue('🆕 YENI');
    } else if (yon.indexOf('UP') > -1) {
      rowRange.setBackground('#dcfce7');
      logSheet.getRange(r, 9).setValue('⬆️ UP');
    } else if (yon.indexOf('DOWN') > -1) {
      rowRange.setBackground('#fee2e2');
      logSheet.getRange(r, 9).setValue('⬇️ DOWN');
    }
  }
  Logger.log('Tum satirlar renklendi: ' + (lastRow - 1) + ' satir');
}

/**
 * Tum musterilerin guncel seviyelerini ceker ve "Tam Rapor" sayfasina yazar
 */
function fullReport() {
  var groupIds = loadGroupIds();
  var customers = fetchAllCustomers();
  var orders = fetchAllOrders();
  var metrics = calculateCustomerMetrics(orders);
  
  var groupIdToName = {};
  Object.keys(groupIds).forEach(function(name) {
    groupIdToName[groupIds[name]] = name;
  });
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var reportSheet = ss.getSheetByName('Tam Rapor');
  if (reportSheet) {
    reportSheet.clear();
  } else {
    reportSheet = ss.insertSheet('Tam Rapor');
  }
  
  // Basliklar
  var headers = ['E-posta', 'Ad', 'Seviye', 'Harcama (TL)', 'Siparis', 'Iade', 'Iade %', 'Iptal', 'Iptal %'];
  reportSheet.appendRow(headers);
  reportSheet.getRange(1, 1, 1, 9).setFontWeight('bold').setBackground('#f3f4f6');
  
  var rows = [];
  var tierCounts = { Diamond: 0, Platinum: 0, Gold: 0, Silver: 0, Bronze: 0, Starter: 0, Grupsuz: 0 };
  
  customers.forEach(function(c) {
    var email = (c.email || '').toLowerCase().trim();
    var tierName = groupIdToName[c.customerGroupId] || 'Grupsuz';
    var m = metrics[email] || { totalSpend: 0, totalOrders: 0, refundCount: 0, returnRate: 0, cancelCount: 0, cancelRate: 0 };
    
    tierCounts[tierName] = (tierCounts[tierName] || 0) + 1;
    
    rows.push([
      email,
      c.name || '',
      tierName,
      Math.round(m.totalSpend),
      m.totalOrders,
      m.refundCount,
      m.returnRate ? m.returnRate.toFixed(1) + '%' : '0%',
      m.cancelCount,
      m.cancelRate ? m.cancelRate.toFixed(1) + '%' : '0%'
    ]);
  });
  
  // Seviyelere gore sirala
  var tierOrder = { Diamond: 0, Platinum: 1, Gold: 2, Silver: 3, Bronze: 4, Starter: 5, Grupsuz: 6 };
  rows.sort(function(a, b) {
    return (tierOrder[a[2]] || 99) - (tierOrder[b[2]] || 99);
  });
  
  // Toplu yazma (hizli)
  if (rows.length > 0) {
    reportSheet.getRange(2, 1, rows.length, 9).setValues(rows);
  }
  
  // Ozet bilgi en uste
  Logger.log('=== TAM RAPOR ===');
  Logger.log('Toplam musteri: ' + customers.length);
  Object.keys(tierCounts).forEach(function(tier) {
    if (tierCounts[tier] > 0) Logger.log('  ' + tier + ': ' + tierCounts[tier]);
  });
  Logger.log('Rapor olusturuldu!');
}

/**
 * Durum sayfasini guncelle - sabah bakinca herseyi gorursun
 */
function updateStatus(result) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var statusSheet = ss.getSheetByName('Durum');
  if (!statusSheet) {
    statusSheet = ss.insertSheet('Durum', 0);
  }
  statusSheet.clear();
  
  var now = new Date().toLocaleString('tr-TR');
  var props = PropertiesService.getScriptProperties();
  var hasPending = props.getProperty('BATCH_CHUNKS') ? 'Evet' : 'Hayir';
  
  var triggers = ScriptApp.getProjectTriggers();
  var dailyActive = false;
  var referralActive = false;
  var birthdayActive = false;
  triggers.forEach(function(t) {
    if (t.getHandlerFunction() === 'dailyLoyaltyCheck') dailyActive = true;
    if (t.getHandlerFunction() === 'dailyReferralCheck') referralActive = true;
    if (t.getHandlerFunction() === 'dailyBirthdayCheck') birthdayActive = true;
  });
  
  // Birthday count
  var bdaySheet = ss.getSheetByName('Birthdays');
  var bdayCount = bdaySheet ? Math.max(bdaySheet.getLastRow() - 1, 0) : 0;
  
  // Referral count
  var refSheet = ss.getSheetByName('Referrals');
  var refCount = refSheet ? Math.max(refSheet.getLastRow() - 1, 0) : 0;
  
  var data = [
    ['MANHATTAN LIKIT — SADAKAT DURUMU', ''],
    ['', ''],
    ['Son Calisma', now],
    ['Sonuc', result || 'Basarili'],
    ['Bekleyen Batch', hasPending],
    ['', ''],
    ['— TRIGGERLAR —', ''],
    ['Saatlik Tier Sync', dailyActive ? '✅ Aktif' : '❌ Pasif'],
    ['Saatlik Referral Check', referralActive ? '✅ Aktif' : '❌ Pasif'],
    ['Gunluk Birthday Check (09:00)', birthdayActive ? '✅ Aktif' : '❌ Pasif'],
    ['', ''],
    ['— VERILER —', ''],
    ['Kayitli Dogum Gunu', bdayCount + ' kisi'],
    ['Referral Daveti', refCount + ' davet'],
  ];
  
  statusSheet.getRange(1, 1, data.length, 2).setValues(data);
  statusSheet.getRange(1, 1).setFontSize(14).setFontWeight('bold');
  statusSheet.setColumnWidth(1, 250);
  statusSheet.setColumnWidth(2, 200);
  Logger.log('Durum sayfasi guncellendi.');
}

/**
 * Batch durumunu sifirla (sorun olursa kullan)
 */
function resetBatch() {
  var props = PropertiesService.getScriptProperties();
  var totalChunks = parseInt(props.getProperty('BATCH_CHUNKS') || '0');
  for (var ci = 0; ci < totalChunks; ci++) {
    props.deleteProperty('BATCH_' + ci);
  }
  props.deleteProperty('BATCH_CHUNKS');
  props.deleteProperty('BATCH_TOTAL');
  props.deleteProperty('BATCH_INDEX');
  props.deleteProperty('BATCH_TOTALS');
  Logger.log('Batch sifirlandi. Yeniden baslayabilirsiniz.');
}

/**
 * Otomatik batch baslat - her 2 dk'da bir calisir, bitince durur
 */
function startAutoBatch() {
  // Onceki triggerlari temizle
  var triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(function(t) {
    if (t.getHandlerFunction() === 'autoBatchStep') {
      ScriptApp.deleteTrigger(t);
    }
  });
  
  // 2 dakikada bir calis
  ScriptApp.newTrigger('autoBatchStep')
    .timeBased()
    .everyMinutes(1)
    .create();
  
  Logger.log('Otomatik batch baslatildi. Her 2 dk calisacak. Tarayiciyi kapatabilirsin.');
  
  // Ilk batch'i hemen calistir
  fullLoyaltyUpdate();
}

function autoBatchStep() {
  var props = PropertiesService.getScriptProperties();
  var hasChunks = props.getProperty('BATCH_CHUNKS');
  
  if (hasChunks) {
    // Devam eden batch var
    fullLoyaltyUpdate();
  } else {
    // Tum batchler bitti - triggeri kaldir
    var triggers = ScriptApp.getProjectTriggers();
    triggers.forEach(function(t) {
      if (t.getHandlerFunction() === 'autoBatchStep') {
        ScriptApp.deleteTrigger(t);
      }
    });
    Logger.log('Tum musteriler guncellendi! Otomatik batch durduruldu.');
  }
}

// ===================== TEST =====================

function dryRun() {
  var groupIds = loadGroupIds();
  var orders = fetchAllOrders();
  var customers = fetchAllCustomers();
  var metrics = calculateCustomerMetrics(orders);
  
  var customerMap = {};
  customers.forEach(function(c) {
    var email = (c.email || '').toLowerCase().trim();
    if (email) customerMap[email] = { id: c.id, currentGroupId: c.customerGroupId };
  });
  
  var groupIdToName = {};
  Object.keys(groupIds).forEach(function(name) { groupIdToName[groupIds[name]] = name; });
  
  Logger.log('=== DRY RUN ===\n');
  
  var wouldChange = 0;
  var tierCounts = { Diamond: 0, Platinum: 0, Gold: 0, Silver: 0, Bronze: 0, Starter: 0 };
  
  Object.keys(metrics).forEach(function(key) {
    var m = metrics[key];
    var customer = customerMap[m.email];
    if (!customer) return;
    
    var newTier = determineTier(m);
    tierCounts[newTier] = (tierCounts[newTier] || 0) + 1;
    var currentTier = groupIdToName[customer.currentGroupId] || 'Yok';
    
    if (groupIds[newTier] !== customer.currentGroupId) {
      wouldChange++;
    }
  });
  
  Logger.log('\n=== OZET ===');
  Logger.log('Degisecek musteri: ' + wouldChange);
  Logger.log('Seviye dagilimi:');
  Object.keys(tierCounts).forEach(function(tier) {
    Logger.log('  ' + tier + ': ' + tierCounts[tier]);
  });
}

function testAPI() {
  var url = 'https://app.ecwid.com/api/v3/11692025/profile';
  var options = {
    method: 'get',
    headers: { 'Authorization': 'Bearer secret_nQ6JM4ewfv5QJJXbQyxe41kH5LukVdA2' },
    muteHttpExceptions: true
  };
  var response = UrlFetchApp.fetch(url, options);
  Logger.log('Status: ' + response.getResponseCode());
  Logger.log('Body: ' + response.getContentText().substring(0, 500));
}

// ===================== WEB ENDPOINT (Widget icin) =====================

/**
 * Widget'tan gelen isteği karşılar
 * Deploy → New deployment → Web app → Anyone → Deploy
 * URL: https://script.google.com/.../exec?email=xxx@xxx.com
 */
function doGet(e) {
  var action = (e.parameter.action || '').toLowerCase().trim();
  var email = (e.parameter.email || '').toLowerCase().trim();
  
  // Birthday kontrol (widget dogrulama)
  if (action === 'check-birthday') {
    try {
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      var sheet = ss.getSheetByName('Birthdays');
      if (sheet) {
        var data = sheet.getDataRange().getValues();
        for (var i = 1; i < data.length; i++) {
          if (String(data[i][0]).toLowerCase().trim() === email) {
            return ContentService.createTextOutput(JSON.stringify({ exists: true, birthday: data[i][1] })).setMimeType(ContentService.MimeType.JSON);
          }
        }
      }
      return ContentService.createTextOutput(JSON.stringify({ exists: false })).setMimeType(ContentService.MimeType.JSON);
    } catch(err) { return ContentService.createTextOutput(JSON.stringify({ exists: false })).setMimeType(ContentService.MimeType.JSON); }
  }
  
  // Birthday kaydet
  if (action === 'birthday') {
    return handleBirthday(email, e.parameter.birthday || '');
  }
  
  // Referral gonder
  if (action === 'referral') {
    var referrerEmail = (e.parameter.referrerEmail || '').toLowerCase().trim();
    var friendEmail = (e.parameter.friendEmail || '').toLowerCase().trim();
    return handleReferral(referrerEmail, friendEmail);
  }
  
  // Flash bonus kupon
  if (action === 'flash') {
    return handleFlashCoupon(email);
  }
  
  // Spin Wheel
  if (action === 'spin') {
    return handleSpin(email);
  }
  
  // Spin Config Check (lightweight — testMode + ses + segment metinleri)
  if (action === 'spin-check') {
    var _chkCfg = _loadSpinConfig();
    var _segTexts = [];
    if (_chkCfg.segments) {
      for (var si = 0; si < _chkCfg.segments.length; si++) {
        _segTexts.push({ label: _chkCfg.segments[si].label || '', sub: _chkCfg.segments[si].sub || '' });
      }
    }
    return jsonResponse({ ok: true, testMode: !!_chkCfg.testMode, tickSound: _chkCfg.tickSound || 'wood', celebSound: _chkCfg.celebSound || 'sparkle', voovSound: _chkCfg.voovSound || 'studio2', segTexts: _segTexts, fontScale: _chkCfg.fontScale || 1.0, fontFamily: _chkCfg.fontFamily || 'Plus Jakarta Sans', labelGap: _chkCfg.labelGap !== undefined ? _chkCfg.labelGap : 6 });
  }
  
  // Ücretsiz kargo eşiği — Ecwid shipping settings'ten dinamik çek
  if (action === 'shipping-threshold') {
    return _handleShippingThreshold();
  }
  
  // Default: musteri bilgisi getir
  var result = { spend: 0, orders: 0, allTimeSpend: 0, allTimeOrders: 0, couponTotal: 0 };
  
  if (email) {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Tam Rapor');
    if (sheet) {
      var data = sheet.getDataRange().getValues();
      for (var i = 1; i < data.length; i++) {
        if (String(data[i][0]).toLowerCase().trim() === email) {
          result.spend = data[i][3] || 0;
          result.orders = data[i][4] || 0;
          break;
        }
      }
    }
    // Tüm zamanlar: Ecwid API'den tarih filtresi olmadan
    try {
      var ats = 0, ato = 0, aOff = 0, aMore = true, aCoup = 0;
      while (aMore) {
        var aData = ecwidGet('orders?email=' + encodeURIComponent(email) + '&limit=100&offset=' + aOff);
        var aItems = aData.items || [];
        aItems.forEach(function(o) {
          var ps = (o.paymentStatus || '').toUpperCase();
          var fs = (o.fulfillmentStatus || '').toUpperCase();
          if (ps === 'CANCELLED' || fs === 'WILL_NOT_DELIVER') return;
          if (ps === 'REFUNDED' || ps === 'PARTIALLY_REFUNDED' || fs === 'RETURNED') return;
          if (ps === 'PAID' || ps === 'ACCEPTED') { ats += (o.total || 0); ato++; aCoup += (o.couponDiscount || 0); }
        });
        aMore = aItems.length >= 100;
        aOff += 100;
      }
      result.allTimeSpend = Math.round(ats);
      result.allTimeOrders = ato;
      result.couponTotal = Math.round(aCoup);
    } catch(e) { Logger.log('AllTime fetch error: ' + e); }
  }
  
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Widget'tan POST istegi: {action:'birthday'|'referral', ...}
 */
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var action = data.action || '';
    if (action === 'birthday') {
      return handleBirthday(data.email, data.birthday);
    }
    if (action === 'referral') {
      return handleReferral(data.referrerEmail, data.friendEmail);
    }
    // === KARGO ACTIONS ===
    if (action === 'kargoVerifyPin') {
      return kargoVerifyPin(data.pin);
    }
    if (action === 'kargoChangePin') {
      return kargoChangePin(data.pin, data.newPin);
    }
    if (action === 'kargoGetOrders') {
      return kargoAuthWrap(data.pin, function() {
        return kargoGetOrders(data.mode);
      });
    }
    if (action === 'kargoSearchByPhone') {
      return kargoAuthWrap(data.pin, function() {
        return kargoSearchByPhone(data.phone);
      });
    }
    if (action === 'kargoUpdateTracking') {
      return kargoAuthWrap(data.pin, function() {
        return kargoUpdateTracking(data.orderId, data.trackCode);
      });
    }
    if (action === 'kargoBatchUpdate') {
      return kargoAuthWrap(data.pin, function() {
        return kargoBatchUpdate(data.shipments);
      });
    }
    if (action === 'kargoCheckOrder') {
      return kargoAuthWrap(data.pin, function() {
        return kargoCheckOrder(data.orderId);
      });
    }
    if (action === 'kargoGetUnpaid') {
      return kargoAuthWrap(data.pin, kargoGetUnpaid);
    }
    if (action === 'kargoSendReminder') {
      return kargoAuthWrap(data.pin, function() {
        return kargoSendReminder(data.orderId);
      });
    }
    if (action === 'kargoSaveAndToggle') {
        var en = data.enabled === true || data.enabled === 'true';
        return kargoSaveAndToggle(data.rules, en);
    }
    
    if (action === 'kargoToggleAutoReminder') {
      return kargoAuthWrap(data.pin, function() {
        return kargoToggleAutoReminder(data.enabled === true || data.enabled === 'true', data.rules);
      });
    }
    if (action === 'kargoGetAutoReminderStatus') {
      return kargoAuthWrap(data.pin, kargoGetAutoReminderStatus);
    }
    if (action === 'kargoSaveRules') {
      return kargoAuthWrap(data.pin, function() {
        return kargoSaveRules(data.rules);
      });
    }
    if (action === 'kargoTestAutoReminder') {
      return kargoAuthWrap(data.pin, function() {
        return kargoTestAutoReminder(data.rules);
      });
    }
    // ── Spin Admin endpoints (PIN korumalı) ──
    if (action === 'spinGetConfig') {
      return kargoAuthWrap(data.pin, _spinGetConfig);
    }
    if (action === 'spinSaveConfig') {
      return kargoAuthWrap(data.pin, function() {
        return _spinSaveConfig(data.config);
      });
    }
    if (action === 'spinGetStats') {
      return kargoAuthWrap(data.pin, _spinGetStats);
    }
    return jsonResponse({ error: 'Bilinmeyen action: ' + action });
  } catch (err) {
    Logger.log('doPost error: ' + err.toString());
    return jsonResponse({ error: 'Sunucu hatasi.' });
  }
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ===================== KARGO PIN SİSTEMİ =====================

function getKargoPinSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('KargoPIN');
  if (!sheet) {
    sheet = ss.insertSheet('KargoPIN');
    sheet.appendRow(['Kullanici', 'PIN', 'Aktif', 'HataliDeneme', 'KilitZamani']);
    sheet.setFrozenRows(1);
    sheet.appendRow(['1', '1907', true, 0, '']);
    sheet.appendRow(['2', '2024', true, 0, '']);
  }
  return sheet;
}

// ===================== ÜCRETSİZ KARGO EŞİĞİ =====================
// Ecwid shipping settings'ten dinamik olarak ücretsiz kargo eşiğini çeker
function _handleShippingThreshold() {
  try {
    var data = ecwidGet('profile/shippingOptions');
    var threshold = 0;
    var found = false;
    
    // Tüm shipping option'ları tara
    var options = data || [];
    if (data && data.items) options = data.items; // bazı API versiyonları items altında döner
    
    for (var i = 0; i < options.length; i++) {
      var opt = options[i];
      if (!opt.enabled) continue;
      
      // Yöntem 1: Flat rate = 0 olan ve minimumOrderSubtotal > 0 olan → ücretsiz kargo eşiği
      if (opt.ratesCalculationType === 'flat' && opt.flatRate) {
        if (opt.flatRate.cost === 0 || opt.flatRate.shippingRate === 0) {
          if (opt.minimumOrderSubtotal && opt.minimumOrderSubtotal > 0) {
            threshold = opt.minimumOrderSubtotal;
            found = true;
            break;
          }
        }
      }
      
      // Yöntem 2: Title'da "ücretsiz" veya "free" geçen
      var title = (opt.title || '').toLowerCase();
      if ((title.indexOf('ücretsiz') > -1 || title.indexOf('free') > -1 || title.indexOf('bedava') > -1) && opt.minimumOrderSubtotal > 0) {
        threshold = opt.minimumOrderSubtotal;
        found = true;
        break;
      }
      
      // Yöntem 3: Table rates — en yüksek subtotal'da rate=0 olan
      if (opt.ratesCalculationType === 'table' && opt.ratesTable && opt.ratesTable.rates) {
        var rates = opt.ratesTable.rates;
        for (var r = 0; r < rates.length; r++) {
          var rate = rates[r];
          if (rate.rate === 0 && rate.conditions) {
            var cond = rate.conditions;
            if (cond.subtotalFrom && cond.subtotalFrom > threshold) {
              threshold = cond.subtotalFrom;
              found = true;
            }
          }
        }
        if (found) break;
      }
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      ok: true,
      threshold: threshold,
      found: found
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      ok: false,
      error: err.message,
      threshold: 0
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function kargoVerifyPin(pin) {
  if (!pin) return jsonResponse({ ok: false, error: 'PIN gerekli.' });
  pin = String(pin).trim();
  
  var sheet = getKargoPinSheet_();
  var data = sheet.getDataRange().getValues();
  
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][1]).trim() === pin && data[i][2] === true) {
      // Check lockout (5 min)
      var lockTime = data[i][4];
      if (lockTime) {
        var lockDate = new Date(lockTime);
        var now = new Date();
        var diffMin = (now - lockDate) / 60000;
        if (diffMin < 5) {
          var kalan = Math.ceil(5 - diffMin);
          return jsonResponse({ ok: false, error: kalan + ' dakika bekleyin.', locked: true, remaining: 0 });
        }
        // Lockout expired, reset
        sheet.getRange(i + 1, 4).setValue(0);
        sheet.getRange(i + 1, 5).setValue('');
      }
      // Success — reset attempts
      sheet.getRange(i + 1, 4).setValue(0);
      sheet.getRange(i + 1, 5).setValue('');
      return jsonResponse({ ok: true, user: String(data[i][0]) });
    }
  }
  
  // Wrong PIN — find any active user to increment (use first active)
  // Actually we need to track attempts globally or per-session
  // Simple approach: track by IP is not possible in GAS, so track globally
  var props = PropertiesService.getScriptProperties();
  var attempts = parseInt(props.getProperty('kargo_fail_count') || '0');
  var lockStr = props.getProperty('kargo_fail_lock') || '';
  
  // Check global lockout
  if (lockStr) {
    var lockDate = new Date(lockStr);
    var now = new Date();
    var diffMin = (now - lockDate) / 60000;
    if (diffMin < 5) {
      var kalan = Math.ceil(5 - diffMin);
      return jsonResponse({ ok: false, error: kalan + ' dakika bekleyin.', locked: true, remaining: 0 });
    }
    // Expired, reset
    props.setProperty('kargo_fail_count', '0');
    props.deleteProperty('kargo_fail_lock');
    attempts = 0;
  }
  
  attempts++;
  props.setProperty('kargo_fail_count', String(attempts));
  var remaining = Math.max(5 - attempts, 0);
  
  if (attempts >= 5) {
    props.setProperty('kargo_fail_lock', new Date().toISOString());
    return jsonResponse({ ok: false, error: 'Çok fazla hatalı deneme. 5 dakika bekleyin.', locked: true, remaining: 0 });
  }
  
  return jsonResponse({ ok: false, error: 'Hatalı PIN.', remaining: remaining });
}

function kargoChangePin(oldPin, newPin) {
  if (!oldPin || !newPin) return jsonResponse({ ok: false, error: 'Eski ve yeni PIN gerekli.' });
  oldPin = String(oldPin).trim();
  newPin = String(newPin).trim();
  
  if (!/^\d{4}$/.test(newPin)) return jsonResponse({ ok: false, error: 'PIN 4 haneli sayı olmalı.' });
  
  var sheet = getKargoPinSheet_();
  var data = sheet.getDataRange().getValues();
  
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][1]).trim() === oldPin && data[i][2] === true) {
      sheet.getRange(i + 1, 2).setValue(newPin);
      return jsonResponse({ ok: true, message: 'PIN değiştirildi.' });
    }
  }
  
  return jsonResponse({ ok: false, error: 'Mevcut PIN hatalı.' });
}

function kargoAuthWrap(pin, fn) {
  if (!pin) return jsonResponse({ ok: false, error: 'PIN gerekli.' });
  var verify = JSON.parse(kargoVerifyPin(pin).getContent());
  if (!verify.ok) return jsonResponse(verify);
  return fn();
}

// ===================== KARGO SİPARİŞ FONKSİYONLARI =====================

function kargoGetOrders(mode) {
  try {
    var allOrders = [];
    var statuses;
    if (mode === 'export') {
      statuses = ['AWAITING_PROCESSING'];
    } else if (mode === 'import') {
      statuses = ['PROCESSING'];
    } else {
      statuses = ['AWAITING_PROCESSING', 'PROCESSING'];
    }
    
    for (var s = 0; s < statuses.length; s++) {
      var offset = 0;
      while (true) {
        var data = ecwidGet('orders?paymentStatus=PAID&fulfillmentStatus=' + statuses[s] + '&limit=100&offset=' + offset);
        var items = data.items || [];
        for (var i = 0; i < items.length; i++) {
          var o = items[i];
          var sp = o.shippingPerson || {};
          allOrders.push({
            id: o.id,
            orderNumber: o.vendorOrderNumber || o.orderNumber || o.id,
            name: (sp.name || '').toUpperCase(),
            street: sp.street || '',
            city: sp.city || '',
            state: sp.stateOrProvinceName || '',
            phone: sp.phone || '',
            email: o.email || '',
            total: o.total || 0,
            shippingMethod: (o.shippingOption && o.shippingOption.shippingMethodName) || ''
          });
        }
        if (items.length < 100) break;
        offset += 100;
        Utilities.sleep(CONFIG.API_DELAY);
      }
    }
    
    return jsonResponse({ ok: true, orders: allOrders, count: allOrders.length });
  } catch (err) {
    Logger.log('kargoGetOrders error: ' + err.toString());
    return jsonResponse({ ok: false, error: 'Sipariş çekme hatası: ' + err.message });
  }
}

function kargoBatchUpdate(shipments) {
  try {
    if (!shipments || !shipments.length) return jsonResponse({ ok: false, error: 'Gönderi listesi boş.' });
    
    // 1) Tüm siparişleri tek seferde çek → telefon haritası oluştur
    var phoneMap = {};  // normalized phone → {id, orderNumber, fulfillmentStatus}
    var statuses = ['AWAITING_PROCESSING', 'PROCESSING', 'SHIPPED'];
    
    for (var s = 0; s < statuses.length; s++) {
      var offset = 0;
      while (true) {
        var data = ecwidGet('orders?paymentStatus=PAID&fulfillmentStatus=' + statuses[s] + '&limit=100&offset=' + offset);
        var items = data.items || [];
        for (var i = 0; i < items.length; i++) {
          var o = items[i];
          var sp = o.shippingPerson || {};
          var ph = String(sp.phone || '').replace(/\D/g, '').slice(-10);
          if (ph.length === 10 && !phoneMap[ph]) {
            phoneMap[ph] = { id: o.id, orderNumber: o.vendorOrderNumber || o.orderNumber || o.id, fulfillmentStatus: (o.fulfillmentStatus || '').toUpperCase() };
          }
        }
        if (items.length < 100) break;
        offset += 100;
        Utilities.sleep(CONFIG.API_DELAY);
      }
    }
    
    // 2) Her gönderiyi eşleştir ve güncelle
    var results = [];
    for (var j = 0; j < shipments.length; j++) {
      var sh = shipments[j];
      var normPhone = String(sh.phone || '').replace(/\D/g, '').slice(-10);
      var trackCode = String(sh.trackCode || '').trim();
      var name = String(sh.name || '');
      
      if (!trackCode) {
        results.push({ name: name, status: 'skip', reason: 'Takip kodu yok' });
        continue;
      }
      
      var match = normPhone.length === 10 ? phoneMap[normPhone] : null;
      
      if (!match) {
        results.push({ name: name, phone: normPhone, status: 'notFound', reason: 'Eşleşmedi' });
        continue;
      }
      
      if (match.fulfillmentStatus === 'SHIPPED') {
        results.push({ name: name, orderNumber: match.orderNumber, status: 'alreadyShipped' });
        continue;
      }
      
      // Güncelle
      try {
        var trackUrl = 'https://ykss.yurticikargo.com/reports/SSWDocumentDetail/' + trackCode;
        ecwidPut('orders/' + match.id, { fulfillmentStatus: 'SHIPPED', trackingNumber: trackUrl });
        results.push({ name: name, orderNumber: match.orderNumber, trackCode: trackCode, status: 'updated' });
        Utilities.sleep(CONFIG.API_DELAY);
      } catch (updErr) {
        results.push({ name: name, orderNumber: match.orderNumber, status: 'error', reason: updErr.message });
      }
    }
    
    var updated = results.filter(function(r) { return r.status === 'updated'; }).length;
    var skipped = results.filter(function(r) { return r.status === 'alreadyShipped'; }).length;
    var notFound = results.filter(function(r) { return r.status === 'notFound'; }).length;
    var errors = results.filter(function(r) { return r.status === 'error'; }).length;
    
    return jsonResponse({ ok: true, results: results, summary: { updated: updated, skipped: skipped, notFound: notFound, errors: errors } });
  } catch (err) {
    Logger.log('kargoBatchUpdate error: ' + err.toString());
    return jsonResponse({ ok: false, error: 'Toplu güncelleme hatası: ' + err.message });
  }
}

function kargoCheckOrder(orderId) {
  try {
    if (!orderId) return jsonResponse({ ok: false, error: 'Order ID gerekli.' });
    var order = ecwidGet('orders/' + orderId);
    return jsonResponse({
      ok: true,
      id: order.id,
      orderNumber: order.orderNumber,
      fulfillmentStatus: (order.fulfillmentStatus || '').toUpperCase(),
      trackingNumber: order.trackingNumber || ''
    });
  } catch (err) {
    // Try as orderNumber
    try {
      var search = ecwidGet('orders?orderNumber=' + orderId + '&limit=1');
      if (search.items && search.items.length) {
        var order = search.items[0];
        return jsonResponse({
          ok: true,
          id: order.id,
          orderNumber: order.orderNumber,
          fulfillmentStatus: (order.fulfillmentStatus || '').toUpperCase(),
          trackingNumber: order.trackingNumber || ''
        });
      }
    } catch (e2) {}
    return jsonResponse({ ok: false, error: 'Sipariş bulunamadı: ' + orderId });
  }
}

function kargoUpdateTracking(orderId, trackCode) {
  try {
    if (!orderId || !trackCode) return jsonResponse({ ok: false, error: 'Order ID ve takip kodu gerekli.' });
    var trackUrl = 'https://ykss.yurticikargo.com/reports/SSWDocumentDetail/' + trackCode;
    ecwidPut('orders/' + orderId, {
      fulfillmentStatus: 'SHIPPED',
      trackingNumber: trackUrl
    });
    return jsonResponse({ ok: true, orderId: orderId, trackCode: trackCode });
  } catch (err) {
    return jsonResponse({ ok: false, error: 'Güncelleme hatası: ' + err.message });
  }
}

function kargoSearchByPhone(phone) {
  try {
    if (!phone) return jsonResponse({ ok: false, error: 'Telefon gerekli.' });
    var norm = String(phone).replace(/\D/g, '').slice(-10);
    if (norm.length < 10) return jsonResponse({ ok: false, error: 'Geçersiz telefon.' });
    
    var statuses = ['AWAITING_PROCESSING', 'PROCESSING', 'SHIPPED'];
    for (var s = 0; s < statuses.length; s++) {
      var offset = 0;
      while (true) {
        var data = ecwidGet('orders?paymentStatus=PAID&fulfillmentStatus=' + statuses[s] + '&limit=100&offset=' + offset);
        var items = data.items || [];
        for (var i = 0; i < items.length; i++) {
          var sp = items[i].shippingPerson || {};
          var oPhone = String(sp.phone || '').replace(/\D/g, '').slice(-10);
          if (oPhone === norm) {
            return jsonResponse({
              ok: true,
              id: items[i].id,
              orderNumber: items[i].orderNumber,
              fulfillmentStatus: (items[i].fulfillmentStatus || '').toUpperCase(),
              trackingNumber: items[i].trackingNumber || ''
            });
          }
        }
        if (items.length < 100) break;
        offset += 100;
        Utilities.sleep(CONFIG.API_DELAY);
      }
    }
    return jsonResponse({ ok: false, error: 'Bulunamadı.' });
  } catch (err) {
    return jsonResponse({ ok: false, error: 'Arama hatası: ' + err.message });
  }
}

// ===================== ÖDEME HATIRLATMA SİSTEMİ =====================

function kargoGetUnpaid() {
  try {
    // Pre-load PaymentReminders sent list
    var sentIds = {};
    try {
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      var remSheet = ss.getSheetByName('PaymentReminders');
      if (remSheet && remSheet.getLastRow() > 1) {
        var remData = remSheet.getDataRange().getValues();
        for (var r = 1; r < remData.length; r++) {
          sentIds[String(remData[r][0])] = true;
        }
      }
    } catch (e) { /* sheet may not exist yet */ }
    
    var allOrders = [];
    var offset = 0;
    while (true) {
      var data = ecwidGet('orders?paymentStatus=AWAITING_PAYMENT&fulfillmentStatus=AWAITING_PROCESSING&limit=100&offset=' + offset);
      var items = data.items || [];
      for (var i = 0; i < items.length; i++) {
        var o = items[i];
        var sp = o.shippingPerson || {};
        
        // Extract bank details from orderExtraFields
        var bankInfo = '';
        var extraFields = o.orderExtraFields || [];
        for (var j = 0; j < extraFields.length; j++) {
          if (extraFields[j].id === 'cstmz_bank_account_details') {
            bankInfo = extraFields[j].value || '';
            break;
          }
        }
        
        // Calculate minutes elapsed
        var createDate = o.createDate ? new Date(o.createDate) : null;
        var nowMs = new Date().getTime();
        var elapsedMin = createDate ? Math.floor((nowMs - createDate.getTime()) / 60000) : 0;
        
        allOrders.push({
          id: o.id,
          orderNumber: o.vendorOrderNumber || o.orderNumber || o.id,
          name: (sp.name || '').toUpperCase(),
          email: o.email || '',
          phone: sp.phone || '',
          state: sp.stateOrProvinceName || '',
          city: sp.city || '',
          total: o.total || 0,
          createDate: o.createDate || '',
          elapsedMin: elapsedMin,
          bankInfo: bankInfo,
          shippingMethod: (o.shippingOption && o.shippingOption.shippingMethodName) || '',
          alreadySent: !!sentIds[String(o.id)]
        });
      }
      if (items.length < 100) break;
      offset += 100;
      Utilities.sleep(CONFIG.API_DELAY);
    }
    
    // Sort by elapsed time descending (oldest first)
    allOrders.sort(function(a, b) { return b.elapsedMin - a.elapsedMin; });
    
    return jsonResponse({ ok: true, orders: allOrders, count: allOrders.length });
  } catch (err) {
    Logger.log('kargoGetUnpaid error: ' + err.toString());
    return jsonResponse({ ok: false, error: 'Sipariş çekme hatası: ' + err.message });
  }
}

function kargoSendReminder(orderId) {
  try {
    if (!orderId) return jsonResponse({ ok: false, error: 'Order ID gerekli.' });
    
    var order = ecwidGet('orders/' + orderId);
    if (!order || !order.id) return jsonResponse({ ok: false, error: 'Sipariş bulunamadı.' });
    
    if ((order.paymentStatus || '').toUpperCase() !== 'AWAITING_PAYMENT') {
      return jsonResponse({ ok: false, error: 'Sipariş zaten ödenmiş.' });
    }
    
    var sp = order.shippingPerson || {};
    var email = order.email;
    if (!email) return jsonResponse({ ok: false, error: 'Müşteri e-posta adresi yok.' });
    
    // Extract bank info
    var bankInfo = '';
    var extraFields = order.orderExtraFields || [];
    for (var j = 0; j < extraFields.length; j++) {
      if (extraFields[j].id === 'cstmz_bank_account_details') {
        bankInfo = extraFields[j].value || '';
        break;
      }
    }
    
    var orderNum = order.vendorOrderNumber || order.orderNumber || order.id;
    var customerName = sp.name || 'Değerli Müşterimiz';
    var totalStr = (order.total || 0).toLocaleString('tr-TR', {minimumFractionDigits: 2}) + ' TL';
    var bankHtml = bankInfo ? bankInfo.replace(/\n/g, '<br>') : 'Banka bilgisi bulunamadı.';
    
    var subject = 'Sipariş Durumu - Manhattan Likit #' + orderNum;
    
    var html = '<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="max-width:640px;margin:auto;font-family:Arial,Helvetica,sans-serif">' +
      '<tr><td align="left" valign="top" style="padding-top:12px">' +
      '<h1 style="font-size:30px;font-weight:normal;line-height:40px;color:#333;margin:0;padding:0">Sipariş Durumu</h1>' +
      '</td></tr>' +
      
      // Greeting
      '<tr><td style="padding-top:24px">' +
      '<p style="font-size:16px;color:#333;line-height:24px;margin:0 0 20px">Merhaba <strong>' + customerName + '</strong>, <strong>#' + orderNum + '</strong> numaralı siparişiniz için ödeme beklenmektedir.</p>' +
      '</td></tr>' +
      
      // Havale/EFT Başlık
      '<tr><td>' +
      '<table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom:15px">' +
      '<tr><td bgcolor="#166534" style="background-color:#166534;padding:12px 18px">' +
      '<p style="margin:0;font-size:18px;font-weight:bold;color:#fff">Havale / EFT / FAST Talimatları</p>' +
      '</td></tr></table>' +
      
      // Ödeme Yaparken Dikkat Edin
      '<table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom:12px">' +
      '<tr><td width="4" bgcolor="#22c55e" style="background-color:#22c55e"></td>' +
      '<td bgcolor="#f0fdf4" style="background-color:#f0fdf4;padding:14px 15px">' +
      '<p style="margin:0 0 12px;font-size:15px;font-weight:bold;color:#166534">Ödeme Yaparken Dikkat Edin</p>' +
      '<table width="100%" border="0" cellpadding="0" cellspacing="0">' +
      '<tr><td style="padding:0 0 8px;font-size:14px;line-height:22px;color:#333">' +
      '<span style="display:inline-block;width:18px;height:18px;background-color:#16a34a;color:#fff;text-align:center;line-height:18px;font-size:12px;font-weight:bold;margin-right:6px">&#10003;</span> Açıklama kısmını <strong>boş bırakın</strong> <span style="background-color:#dcfce7;color:#166534;padding:4px 10px;font-size:13px;font-weight:bold;margin-left:5px;border:2px solid #16a34a">Önerilen</span></td></tr>' +
      '<tr><td style="padding:0 0 8px;font-size:14px;line-height:22px;color:#333">' +
      '<span style="display:inline-block;width:18px;height:18px;background-color:#16a34a;color:#fff;text-align:center;line-height:18px;font-size:12px;font-weight:bold;margin-right:6px">&#10003;</span> Boş bırakamıyorsanız sadece <strong>adınızı ve soyadınızı</strong> yazın</td></tr>' +
      '<tr><td style="padding:0;font-size:14px;line-height:22px;color:#333">' +
      '<span style="display:inline-block;width:18px;height:18px;background-color:#dc2626;color:#fff;text-align:center;line-height:18px;font-size:12px;font-weight:bold;margin-right:6px">X</span> Ürün adı, sipariş no veya benzeri ifadeler <strong><u>kesinlikle yazmayın</u></strong> <span style="background-color:#fef2f2;color:#b91c1c;padding:2px 8px;font-size:12px;font-weight:bold;margin-left:5px;border:1px solid #fecaca">Önerilmez</span></td></tr>' +
      '</table></td></tr></table>' +
      
      // Neden Bu Kadar Önemli
      '<table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom:12px">' +
      '<tr><td width="4" bgcolor="#f59e0b" style="background-color:#f59e0b"></td>' +
      '<td bgcolor="#fffbeb" style="background-color:#fffbeb;padding:14px 15px">' +
      '<p style="margin:0 0 8px;font-size:15px;font-weight:bold;color:#b45309">Neden Bu Kadar Önemli?</p>' +
      '<p style="margin:0;font-size:14px;line-height:22px;color:#555">Bankalar açıklama kısmındaki belirli kelimeleri otomatik olarak tarar. Bu tür ifadeler <strong><u>sizin hesaplarınızda</u></strong> da sorunlara yol açabilir.</p>' +
      '</td></tr></table>' +
      
      // Kurallara Uyulmaması Halinde
      '<table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom:15px">' +
      '<tr><td width="4" bgcolor="#dc2626" style="background-color:#dc2626"></td>' +
      '<td bgcolor="#fef2f2" style="background-color:#fef2f2;padding:14px 15px">' +
      '<p style="margin:0 0 10px;font-size:15px;font-weight:bold;color:#b91c1c">Kurallara Uyulmaması Halinde</p>' +
      '<table width="100%" border="0" cellpadding="0" cellspacing="0">' +
      '<tr><td style="padding:0 0 4px;font-size:14px;line-height:22px;color:#555">&#8226; Siparişiniz iptal edilir</td></tr>' +
      '<tr><td style="padding:0 0 4px;font-size:14px;line-height:22px;color:#555">&#8226; Ödemeniz masraflar düşülerek iade edilir</td></tr>' +
      '<tr><td style="padding:0;font-size:14px;line-height:22px;color:#555">&#8226; Sonraki siparişleriniz kabul edilmez</td></tr>' +
      '</table></td></tr></table>' +
      
      // Banka Bilgileri Kutusu
      '<table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom:15px;border:2px solid #166534">' +
      '<tr><td bgcolor="#166534" style="background-color:#166534;padding:10px 15px">' +
      '<p style="margin:0;font-size:14px;font-weight:bold;color:#fff">Geçici hesap bilgileridir. Kaydetmeyiniz.</p></td></tr>' +
      '<tr><td bgcolor="#f0fdf4" style="background-color:#f0fdf4;padding:15px">' +
      '<p style="margin:0 0 10px;font-size:16px;font-weight:bold;color:#166534">Havale/EFT/FAST Bilgilerimiz</p>' +
      '<p style="margin:0;font-size:16px;line-height:26px;color:#333"><strong>' + bankHtml + '</strong></p>' +
      '</td></tr>' +
      '<tr><td bgcolor="#dcfce7" style="background-color:#dcfce7;padding:12px 15px;border-top:1px solid #bbf7d0">' +
      '<p style="margin:0 0 6px;font-size:16px;font-weight:bold;color:#166534">Gönderilecek Tutar: ' + totalStr + '</p>' +
      '<p style="margin:0;font-size:14px;line-height:22px;color:#166534"><strong>Hatırlatma:</strong> Açıklama kısmını boş bırakın. Boş bırakamıyorsanız sadece adınızı ve soyadınızı yazın. Talimatları okumadan gönderim yapmayınız.</p>' +
      '</td></tr></table>' +
      
      '</td></tr>' +
      
      // Sipariş durumu bar
      '<tr><td>' +
      '<table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="#f8f8f8">' +
      '<tr><td align="center" style="font-size:18px;line-height:24px;padding-top:26px;color:#333">Sipariş durumu: <b>İşlem Sırasında</b></td></tr>' +
      '<tr><td align="center" style="font-size:24px;line-height:30px;padding-bottom:30px;color:#333">Ödeme durumu: <b>Ödeme Bekleniyor</b></td></tr>' +
      '</table></td></tr>' +
      
      // Footer
      '<tr><td style="padding-top:24px;text-align:center">' +
      '<p style="font-size:14px;color:#333;line-height:20px;margin:0 0 12px">Bizimle alışveriş yaptığınız için teşekkürler!</p>' +
      '<p style="font-size:14px;color:#333;line-height:20px;margin:0">Sevgilerle,<br>Manhattan Likit</p>' +
      '</td></tr>' +
      
      // Auto note
      '<tr><td style="padding:20px 0;border-top:1px solid #eee">' +
      '<p style="margin:0;font-size:12px;line-height:18px;color:#999;text-align:center">Bu e-posta otomatik olarak gönderilmiştir. Ödemenizi zaten yaptıysanız lütfen dikkate almayınız.</p>' +
      '</td></tr>' +
      
      '</table>';
    
    var plainText = 'Merhaba ' + customerName + ', #' + orderNum + ' numaralı siparişiniz için ödeme beklenmektedir. Toplam: ' + totalStr;
    
    GmailApp.sendEmail(email, subject, plainText, { htmlBody: html });
    
    // Update Ecwid order staff notes with "MAİL GÖNDERİLDİ: OK"
    try {
      var currentOrder = ecwidGet('orders/' + orderId);
      var currentNotes = currentOrder.privateAdminNotes || '';
      var newNotes = currentNotes ? (currentNotes + '\nMAİL GÖNDERİLDİ: OK') : 'MAİL GÖNDERİLDİ: OK';
      ecwidPut('orders/' + orderId, { privateAdminNotes: newNotes });
    } catch (noteErr) {
      Logger.log('Staff note update error: ' + noteErr.toString());
    }
    
    // Log to PaymentReminders sheet
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('PaymentReminders');
    if (!sheet) {
      sheet = ss.insertSheet('PaymentReminders');
      sheet.appendRow(['order_id', 'order_number', 'email', 'name', 'total', 'sent_at']);
    }
    sheet.appendRow([
      order.id,
      orderNum,
      email,
      sp.name || '',
      order.total || 0,
      new Date().toISOString()
    ]);
    
    return jsonResponse({ ok: true, message: 'Hatırlatma e-postası gönderildi: ' + email });
  } catch (err) {
    Logger.log('kargoSendReminder error: ' + err.toString());
    return jsonResponse({ ok: false, error: 'Gönderim hatası: ' + err.message });
  }
}

// ===================== OTOMATİK ÖDEME HATIRLATMA =====================

function kargoToggleAutoReminder(enabled, rules) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('PaymentReminders');
  if (!sheet) {
    sheet = ss.insertSheet('PaymentReminders');
    sheet.appendRow(['order_id', 'order_number', 'email', 'name', 'total', 'sent_at']);
  }
  sheet.getRange('H1').setValue('AUTO_ENABLED');
  sheet.getRange('H2').setValue(enabled ? 'ON' : 'OFF');
  if (rules) {
    sheet.getRange('I1').setValue('RULES_JSON');
    sheet.getRange('I2').setValue(JSON.stringify(rules));
  }
  
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'autoPaymentReminder') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
  
  if (enabled) {
    ScriptApp.newTrigger('autoPaymentReminder')
      .timeBased()
      .everyMinutes(5)
      .create();
  }
  
  return jsonResponse({ ok: true, enabled: enabled });
}

function kargoSaveRules(rules) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('PaymentReminders');
  if (!sheet) {
    sheet = ss.insertSheet('PaymentReminders');
    sheet.appendRow(['order_id', 'order_number', 'email', 'name', 'total', 'sent_at']);
  }
  sheet.getRange('I1').setValue('RULES_JSON');
  sheet.getRange('I2').setValue(JSON.stringify(rules));
  return jsonResponse({ ok: true });
}

function kargoSaveAndToggle(rules, enabled) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('PaymentReminders');
  if (!sheet) {
    sheet = ss.insertSheet('PaymentReminders');
    sheet.appendRow(['order_id', 'order_number', 'email', 'name', 'total', 'sent_at']);
  }
  // Save rules
  sheet.getRange('I1').setValue('RULES_JSON');
  sheet.getRange('I2').setValue(JSON.stringify(rules));
  // Save enabled state
  sheet.getRange('H1').setValue('AUTO_ENABLED');
  sheet.getRange('H2').setValue(enabled ? 'ON' : 'OFF');
  // Manage trigger
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'autoPaymentReminder') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
  if (enabled) {
    ScriptApp.newTrigger('autoPaymentReminder')
      .timeBased()
      .everyMinutes(5)
      .create();
  }
  return jsonResponse({ ok: true, enabled: enabled });
}

function kargoGetAutoReminderStatus() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('PaymentReminders');
    if (!sheet) return jsonResponse({ ok: true, enabled: false, rules: null, totalSent: 0, todaySent: 0, lastSendDate: null });
    var val = sheet.getRange('H2').getValue();
    var rulesJson = sheet.getRange('I2').getValue();
    var rules = null;
    try { rules = JSON.parse(rulesJson); } catch (e) {}
    
    // Count sends from sheet data (col F = sent_at)
    var totalSent = 0;
    var todaySent = 0;
    var lastSendDate = null;
    var lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      var data = sheet.getRange(2, 1, lastRow - 1, 6).getValues();
      var now = new Date();
      var todayStr = Utilities.formatDate(now, 'Europe/Istanbul', 'yyyy-MM-dd');
      for (var i = 0; i < data.length; i++) {
        if (!data[i][0]) continue; // skip empty rows
        totalSent++;
        var sentAt = data[i][5]; // col F
        if (sentAt) {
          var d = new Date(sentAt);
          var dStr = Utilities.formatDate(d, 'Europe/Istanbul', 'yyyy-MM-dd');
          if (dStr === todayStr) todaySent++;
          if (!lastSendDate || d > lastSendDate) lastSendDate = d;
        }
      }
    }
    var lastStr = lastSendDate ? Utilities.formatDate(lastSendDate, 'Europe/Istanbul', 'dd.MM.yyyy HH:mm') : null;
    
    return jsonResponse({ ok: true, enabled: val === 'ON', rules: rules, totalSent: totalSent, todaySent: todaySent, lastSendDate: lastStr });
  } catch (e) {
    return jsonResponse({ ok: true, enabled: false, rules: null, totalSent: 0, todaySent: 0, lastSendDate: null });
  }
}

function _checkRuleMatch(rule, day, totalMin) {
  if (!rule || !rule.days || rule.enabled === false) return false;
  var days = rule.days;
  var dayMatch = false;
  for (var i = 0; i < days.length; i++) {
    if (Number(days[i]) === day) { dayMatch = true; break; }
  }
  if (!dayMatch) return false;
  
  var startParts = (rule.start || '').split(':');
  var endParts = (rule.end || '').split(':');
  if (startParts.length < 2 || endParts.length < 2) return false;
  var startMin = parseInt(startParts[0]) * 60 + parseInt(startParts[1]);
  var endMin = parseInt(endParts[0]) * 60 + parseInt(endParts[1]);
  
  return totalMin >= startMin && totalMin <= endMin;
}

function _getActiveThreshold(rules, day, totalMin) {
  // Check rule 1
  if (rules.r1 && rules.r1.threshold && _checkRuleMatch(rules.r1, day, totalMin)) {
    return { threshold: rules.r1.threshold, rule: 1 };
  }
  // Check rule 2
  if (rules.r2 && rules.r2.threshold && _checkRuleMatch(rules.r2, day, totalMin)) {
    return { threshold: rules.r2.threshold, rule: 2 };
  }
  // Check rule 3
  if (rules.r3 && rules.r3.threshold && _checkRuleMatch(rules.r3, day, totalMin)) {
    return { threshold: rules.r3.threshold, rule: 3 };
  }
  return null;
}

function kargoTestAutoReminder(rules) {
  try {
    var now = new Date();
    var turkeyTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Istanbul' }));
    var day = turkeyTime.getDay();
    var hour = turkeyTime.getHours();
    var min = turkeyTime.getMinutes();
    var totalMin = hour * 60 + min;
    
    var rule1Match = rules && rules.r1 ? _checkRuleMatch(rules.r1, day, totalMin) : false;
    var rule2Match = rules && rules.r2 ? _checkRuleMatch(rules.r2, day, totalMin) : false;
    var rule3Match = rules && rules.r3 ? _checkRuleMatch(rules.r3, day, totalMin) : false;
    
    // Get sent IDs
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('PaymentReminders');
    var sentIds = {};
    if (sheet && sheet.getLastRow() > 1) {
      var remData = sheet.getDataRange().getValues();
      for (var r = 1; r < remData.length; r++) {
        if (remData[r][0]) sentIds[String(remData[r][0])] = true;
      }
    }
    
    var wouldSend = [];
    var alreadySent = [];
    var notReady = [];
    var totalUnpaid = 0;
    var offset = 0;
    
    // Collect thresholds from enabled rules
    var active = _getActiveThreshold(rules, day, totalMin);
    var activeThr = active ? active.threshold : null;
    
    while (true) {
      var data = ecwidGet('orders?paymentStatus=AWAITING_PAYMENT&fulfillmentStatus=AWAITING_PROCESSING&limit=100&offset=' + offset);
      var items = data.items || [];
      
      for (var i = 0; i < items.length; i++) {
        var o = items[i];
        totalUnpaid++;
        var sp = o.shippingPerson || {};
        var orderNum = o.vendorOrderNumber || o.orderNumber || o.id;
        var createDate = o.createDate ? new Date(o.createDate) : null;
        var elapsedMin = createDate ? Math.floor((now.getTime() - createDate.getTime()) / 60000) : 0;
        
        var info = {
          orderNumber: orderNum,
          name: (sp.name || '').toUpperCase(),
          email: o.email || '',
          elapsedMin: elapsedMin
        };
        
        if (sentIds[String(o.id)]) {
          alreadySent.push(info);
        } else if (activeThr && elapsedMin >= activeThr) {
          wouldSend.push(info);
        } else {
          notReady.push(info);
        }
      }
      
      if (items.length < 100) break;
      offset += 100;
      Utilities.sleep(500);
    }
    
    return jsonResponse({
      ok: true,
      serverTime: turkeyTime.toLocaleString('tr-TR'),
      rule1Match: rule1Match,
      rule2Match: rule2Match,
      rule3Match: rule3Match,
      activeThreshold: activeThr,
      totalUnpaid: totalUnpaid,
      wouldSend: wouldSend,
      alreadySent: alreadySent,
      notReady: notReady
    });
  } catch (err) {
    Logger.log('kargoTestAutoReminder error: ' + err.toString());
    return jsonResponse({ ok: false, error: err.message });
  }
}

function autoPaymentReminder() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('PaymentReminders');
    if (!sheet || sheet.getRange('H2').getValue() !== 'ON') return;
    
    // Read rules from sheet
    var rulesJson = sheet.getRange('I2').getValue();
    var rules = null;
    try { rules = JSON.parse(rulesJson); } catch (e) {}
    if (!rules) return; // No rules configured — do nothing
    
    // Check time against rules
    var now = new Date();
    var turkeyTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Istanbul' }));
    var day = turkeyTime.getDay();
    var hour = turkeyTime.getHours();
    var min = turkeyTime.getMinutes();
    var totalMin = hour * 60 + min;
    
    var active = _getActiveThreshold(rules, day, totalMin);
    if (!active) return; // No rule matches current time
    
    var thresholdMin = active.threshold;
    Logger.log('Auto payment reminder running. Rule ' + active.rule + ', threshold ' + thresholdMin + 'min, time ' + turkeyTime.toString());
    
    // Get already sent order IDs
    var sentIds = {};
    if (sheet.getLastRow() > 1) {
      var remData = sheet.getDataRange().getValues();
      for (var r = 1; r < remData.length; r++) {
        if (remData[r][0]) sentIds[String(remData[r][0])] = true;
      }
    }
    
    // Fetch unpaid orders
    var offset = 0;
    var sentCount = 0;
    while (true) {
      var data = ecwidGet('orders?paymentStatus=AWAITING_PAYMENT&fulfillmentStatus=AWAITING_PROCESSING&limit=100&offset=' + offset);
      var items = data.items || [];
      
      for (var i = 0; i < items.length; i++) {
        var o = items[i];
        
        // Skip if already sent
        if (sentIds[String(o.id)]) continue;
        
        // Check elapsed time >= threshold
        var createDate = o.createDate ? new Date(o.createDate) : null;
        if (!createDate) continue;
        var elapsedMin = Math.floor((now.getTime() - createDate.getTime()) / 60000);
        if (elapsedMin < thresholdMin) continue;
        
        // Get email
        var email = o.email;
        if (!email) continue;
        
        var sp = o.shippingPerson || {};
        var customerName = sp.name || 'Değerli Müşterimiz';
        var orderNum = o.vendorOrderNumber || o.orderNumber || o.id;
        var totalStr = (o.total || 0).toLocaleString('tr-TR', {minimumFractionDigits: 2}) + ' TL';
        
        // Extract bank info
        var bankInfo = '';
        var extraFields = o.orderExtraFields || [];
        for (var j = 0; j < extraFields.length; j++) {
          if (extraFields[j].id === 'cstmz_bank_account_details') {
            bankInfo = extraFields[j].value || '';
            break;
          }
        }
        var bankHtml = bankInfo ? bankInfo.replace(/\n/g, '<br>') : 'Banka bilgisi bulunamadı.';
        
        // Build email (same template as kargoSendReminder)
        var subject = 'Sipariş Durumu - Manhattan Likit #' + orderNum;
        
        var html = '<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="max-width:640px;margin:auto;font-family:Arial,Helvetica,sans-serif">' +
          '<tr><td align="left" valign="top" style="padding-top:12px">' +
          '<h1 style="font-size:30px;font-weight:normal;line-height:40px;color:#333;margin:0;padding:0">Sipariş Durumu</h1>' +
          '</td></tr>' +
          '<tr><td style="padding-top:24px">' +
          '<p style="font-size:16px;color:#333;line-height:24px;margin:0 0 20px">Merhaba <strong>' + customerName + '</strong>, <strong>#' + orderNum + '</strong> numaralı siparişiniz için ödeme beklenmektedir.</p>' +
          '</td></tr>' +
          '<tr><td>' +
          '<table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom:15px">' +
          '<tr><td bgcolor="#166534" style="background-color:#166534;padding:12px 18px">' +
          '<p style="margin:0;font-size:18px;font-weight:bold;color:#fff">Havale / EFT / FAST Talimatları</p>' +
          '</td></tr></table>' +
          '<table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom:12px">' +
          '<tr><td width="4" bgcolor="#22c55e" style="background-color:#22c55e"></td>' +
          '<td bgcolor="#f0fdf4" style="background-color:#f0fdf4;padding:14px 15px">' +
          '<p style="margin:0 0 12px;font-size:15px;font-weight:bold;color:#166534">Ödeme Yaparken Dikkat Edin</p>' +
          '<table width="100%" border="0" cellpadding="0" cellspacing="0">' +
          '<tr><td style="padding:0 0 8px;font-size:14px;line-height:22px;color:#333">' +
          '<span style="display:inline-block;width:18px;height:18px;background-color:#16a34a;color:#fff;text-align:center;line-height:18px;font-size:12px;font-weight:bold;margin-right:6px">&#10003;</span> Açıklama kısmını <strong>boş bırakın</strong> <span style="background-color:#dcfce7;color:#166534;padding:4px 10px;font-size:13px;font-weight:bold;margin-left:5px;border:2px solid #16a34a">Önerilen</span></td></tr>' +
          '<tr><td style="padding:0 0 8px;font-size:14px;line-height:22px;color:#333">' +
          '<span style="display:inline-block;width:18px;height:18px;background-color:#16a34a;color:#fff;text-align:center;line-height:18px;font-size:12px;font-weight:bold;margin-right:6px">&#10003;</span> Boş bırakamıyorsanız sadece <strong>adınızı ve soyadınızı</strong> yazın</td></tr>' +
          '<tr><td style="padding:0;font-size:14px;line-height:22px;color:#333">' +
          '<span style="display:inline-block;width:18px;height:18px;background-color:#dc2626;color:#fff;text-align:center;line-height:18px;font-size:12px;font-weight:bold;margin-right:6px">X</span> Ürün adı, sipariş no veya benzeri ifadeler <strong><u>kesinlikle yazmayın</u></strong> <span style="background-color:#fef2f2;color:#b91c1c;padding:2px 8px;font-size:12px;font-weight:bold;margin-left:5px;border:1px solid #fecaca">Önerilmez</span></td></tr>' +
          '</table></td></tr></table>' +
          '<table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom:12px">' +
          '<tr><td width="4" bgcolor="#f59e0b" style="background-color:#f59e0b"></td>' +
          '<td bgcolor="#fffbeb" style="background-color:#fffbeb;padding:14px 15px">' +
          '<p style="margin:0 0 8px;font-size:15px;font-weight:bold;color:#b45309">Neden Bu Kadar Önemli?</p>' +
          '<p style="margin:0;font-size:14px;line-height:22px;color:#555">Bankalar açıklama kısmındaki belirli kelimeleri otomatik olarak tarar. Bu tür ifadeler <strong><u>sizin hesaplarınızda</u></strong> da sorunlara yol açabilir.</p>' +
          '</td></tr></table>' +
          '<table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom:15px">' +
          '<tr><td width="4" bgcolor="#dc2626" style="background-color:#dc2626"></td>' +
          '<td bgcolor="#fef2f2" style="background-color:#fef2f2;padding:14px 15px">' +
          '<p style="margin:0 0 10px;font-size:15px;font-weight:bold;color:#b91c1c">Kurallara Uyulmaması Halinde</p>' +
          '<table width="100%" border="0" cellpadding="0" cellspacing="0">' +
          '<tr><td style="padding:0 0 4px;font-size:14px;line-height:22px;color:#555">&#8226; Siparişiniz iptal edilir</td></tr>' +
          '<tr><td style="padding:0 0 4px;font-size:14px;line-height:22px;color:#555">&#8226; Ödemeniz masraflar düşülerek iade edilir</td></tr>' +
          '<tr><td style="padding:0;font-size:14px;line-height:22px;color:#555">&#8226; Sonraki siparişleriniz kabul edilmez</td></tr>' +
          '</table></td></tr></table>' +
          '<table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom:15px;border:2px solid #166534">' +
          '<tr><td bgcolor="#166534" style="background-color:#166534;padding:10px 15px">' +
          '<p style="margin:0;font-size:14px;font-weight:bold;color:#fff">Geçici hesap bilgileridir. Kaydetmeyiniz.</p></td></tr>' +
          '<tr><td bgcolor="#f0fdf4" style="background-color:#f0fdf4;padding:15px">' +
          '<p style="margin:0 0 10px;font-size:16px;font-weight:bold;color:#166534">Havale/EFT/FAST Bilgilerimiz</p>' +
          '<p style="margin:0;font-size:16px;line-height:26px;color:#333"><strong>' + bankHtml + '</strong></p>' +
          '</td></tr>' +
          '<tr><td bgcolor="#dcfce7" style="background-color:#dcfce7;padding:12px 15px;border-top:1px solid #bbf7d0">' +
          '<p style="margin:0 0 6px;font-size:16px;font-weight:bold;color:#166534">Gönderilecek Tutar: ' + totalStr + '</p>' +
          '<p style="margin:0;font-size:14px;line-height:22px;color:#166534"><strong>Hatırlatma:</strong> Açıklama kısmını boş bırakın. Boş bırakamıyorsanız sadece adınızı ve soyadınızı yazın. Talimatları okumadan gönderim yapmayınız.</p>' +
          '</td></tr></table>' +
          '</td></tr>' +
          '<tr><td>' +
          '<table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="#f8f8f8">' +
          '<tr><td align="center" style="font-size:18px;line-height:24px;padding-top:26px;color:#333">Sipariş durumu: <b>İşlem Sırasında</b></td></tr>' +
          '<tr><td align="center" style="font-size:24px;line-height:30px;padding-bottom:30px;color:#333">Ödeme durumu: <b>Ödeme Bekleniyor</b></td></tr>' +
          '</table></td></tr>' +
          '<tr><td style="padding-top:24px;text-align:center">' +
          '<p style="font-size:14px;color:#333;line-height:20px;margin:0 0 12px">Bizimle alışveriş yaptığınız için teşekkürler!</p>' +
          '<p style="font-size:14px;color:#333;line-height:20px;margin:0">Sevgilerle,<br>Manhattan Likit</p>' +
          '</td></tr>' +
          '<tr><td style="padding:20px 0;border-top:1px solid #eee">' +
          '<p style="margin:0;font-size:12px;line-height:18px;color:#999;text-align:center">Bu e-posta otomatik olarak gönderilmiştir. Ödemenizi zaten yaptıysanız lütfen dikkate almayınız.</p>' +
          '</td></tr></table>';
        
        var plainText = 'Merhaba ' + customerName + ', #' + orderNum + ' numaralı siparişiniz için ödeme beklenmektedir. Toplam: ' + totalStr;
        
        GmailApp.sendEmail(email, subject, plainText, { htmlBody: html });
        
        // Update Ecwid staff notes
        try {
          var currentOrder = ecwidGet('orders/' + o.id);
          var currentNotes = currentOrder.privateAdminNotes || '';
          var newNotes = currentNotes ? (currentNotes + '\nMAİL GÖNDERİLDİ: OK (OTO)') : 'MAİL GÖNDERİLDİ: OK (OTO)';
          ecwidPut('orders/' + o.id, { privateAdminNotes: newNotes });
        } catch (noteErr) {
          Logger.log('Auto staff note error: ' + noteErr.toString());
        }
        
        // Log to sheet
        sheet.appendRow([o.id, orderNum, email, sp.name || '', o.total || 0, new Date().toISOString()]);
        sentIds[String(o.id)] = true;
        sentCount++;
        
        Utilities.sleep(2000); // 2s delay between emails
      }
      
      if (items.length < 100) break;
      offset += 100;
      Utilities.sleep(1000);
    }
    
    Logger.log('Auto payment reminder completed. Sent: ' + sentCount);
  } catch (err) {
    Logger.log('autoPaymentReminder error: ' + err.toString());
  }
}

// ===================== DOGUM GUNU SISTEMI =====================

function handleBirthday(email, birthday) {
  try {
    if (!email) return jsonResponse({ error: 'Email gerekli.' });
    if (!birthday) {
      var _ss=SpreadsheetApp.getActiveSpreadsheet();
      var _sh=_ss.getSheetByName('Birthdays');
      if(!_sh)return jsonResponse({exists:false});
      var _d=_sh.getDataRange().getValues();
      var _el=email.toLowerCase().trim();
      for(var _j=1;_j<_d.length;_j++){if(String(_d[_j][0]).toLowerCase().trim()===_el)return jsonResponse({exists:true});}
      return jsonResponse({exists:false});
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return jsonResponse({ error: 'Gecersiz email.' });
    if (!/^\d{4}-\d{2}-\d{2}$/.test(birthday)) return jsonResponse({ error: 'Gecersiz tarih formati.' });

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Birthdays');
    if (!sheet) {
      sheet = ss.insertSheet('Birthdays');
      sheet.appendRow(['email', 'birthday', 'saved_at', 'last_coupon_date', 'coupon_code']);
      sheet.setFrozenRows(1);
    }

    var data = sheet.getDataRange().getValues();
    var emailLower = email.toLowerCase().trim();
    var now = new Date();
    var existingRow = -1;

    for (var i = 1; i < data.length; i++) {
      if (String(data[i][0]).toLowerCase().trim() === emailLower) { existingRow = i; break; }
    }

    if (existingRow >= 0) {
      var savedAt = new Date(data[existingRow][2]);
      var daysSince = Math.floor((now - savedAt) / (1000 * 60 * 60 * 24));
      if (daysSince < CONFIG.BIRTHDAY_CHANGE_COOLDOWN_DAYS) {
        var nextDate = new Date(savedAt);
        nextDate.setDate(nextDate.getDate() + CONFIG.BIRTHDAY_CHANGE_COOLDOWN_DAYS);
        var months = ['Ocak','Subat','Mart','Nisan','Mayis','Haziran','Temmuz','Agustos','Eylul','Ekim','Kasim','Aralik'];
        var formatted = nextDate.getDate() + ' ' + months[nextDate.getMonth()] + ' ' + nextDate.getFullYear();
        return jsonResponse({ error: 'Dogum gunu yilda 1 kez degistirilebilir. Sonraki degisiklik: ' + formatted });
      }
      sheet.getRange(existingRow + 1, 1, 1, 5).setValues([[emailLower, birthday, now.toISOString(), '', '']]);
    } else {
      sheet.appendRow([emailLower, birthday, now.toISOString(), '', '']);
    }

    sendBirthdayConfirmationEmail(emailLower, birthday);

    // Admin bildirimi
    try {
      GmailApp.sendEmail(CONFIG.NOTIFICATION_EMAIL,
        'Yeni Dogum Gunu Kaydi - ' + emailLower,
        'Email: ' + emailLower + '\nDogum gunu: ' + birthday + '\nTarih: ' + now.toISOString(),
        { name: 'Manhattan Likit' }
      );
    } catch(notifErr) { Logger.log('Birthday admin notif error: ' + notifErr); }

    return jsonResponse({ success: true, message: 'Dogum gununuz kaydedildi!' });
  } catch (e) {
    Logger.log('Birthday handler error: ' + e.toString());
    return jsonResponse({ error: 'Bir hata olustu.' });
  }
}

function createBirthdayCoupon(email) {
  var code = generateCouponCode();
  var now = new Date();
  var expDate = new Date(now);
  expDate.setDate(expDate.getDate() + CONFIG.BIRTHDAY_COUPON_VALIDITY_DAYS);

  var payload = {
    name: 'Dogum Gunu - ' + email,
    code: code,
    discountType: 'PERCENT',
    discount: CONFIG.BIRTHDAY_DISCOUNT_PERCENT,
    status: 'ACTIVE',
    usesLimit: 'SINGLE',
    repeatCustomerOnly: false,
    launchDate: formatEcwidDate(now),
    expirationDate: formatEcwidDate(expDate)
  };

  var options = {
    method: 'post',
    contentType: 'application/json',
    headers: { 'Authorization': 'Bearer ' + CONFIG.API_TOKEN },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  try {
    var response = UrlFetchApp.fetch(CONFIG.BASE_URL + '/' + CONFIG.STORE_ID + '/discount_coupons', options);
    var status = response.getResponseCode();
    if (status === 200 || status === 201) {
      Logger.log('Coupon created: ' + code + ' for ' + email);
      return { code: code, expirationDate: expDate };
    } else {
      Logger.log('Coupon fail: ' + response.getContentText());
      return null;
    }
  } catch (e) {
    Logger.log('Coupon API error: ' + e.toString());
    return null;
  }
}

function generateCouponCode() {
  var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  var code = '';
  for (var i = 0; i < 12; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
  return code;
}

function formatEcwidDate(date) {
  return date.toISOString().split('.')[0] + '+0000';
}

function dailyBirthdayCheck() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Birthdays');
  if (!sheet || sheet.getLastRow() < 2) { Logger.log('No birthday data.'); return; }

  var data = sheet.getDataRange().getValues();
  var now = new Date();
  var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  var targetDate = new Date(today);
  targetDate.setDate(targetDate.getDate() + CONFIG.BIRTHDAY_ADVANCE_DAYS);
  var targetMonth = targetDate.getMonth() + 1;
  var targetDay = targetDate.getDate();

  var processed = 0, errors = 0;

  for (var i = 1; i < data.length; i++) {
    var email = String(data[i][0]).trim();
    var birthday = String(data[i][1]).trim();
    var savedAt = data[i][2];
    var lastCouponDate = data[i][3];
    if (!email || !birthday) continue;

    var bdParts = birthday.split('-');
    if (bdParts.length < 3) continue;
    if (parseInt(bdParts[1], 10) !== targetMonth || parseInt(bdParts[2], 10) !== targetDay) continue;

    // Guvenlik 1: manipulasyon korumasi
    var savedDate = new Date(savedAt);
    var minActive = new Date(savedDate);
    minActive.setDate(minActive.getDate() + CONFIG.BIRTHDAY_MANIPULATION_DAYS);
    if (minActive > today) { Logger.log('SKIP (manipulation): ' + email); continue; }

    // Guvenlik 2: yillik limit
    if (lastCouponDate) {
      var lastDate = new Date(lastCouponDate);
      if (lastDate.getFullYear() === now.getFullYear()) { Logger.log('SKIP (yearly): ' + email); continue; }
    }

    var coupon = createBirthdayCoupon(email);
    if (coupon) {
      var rowNum = i + 1;
      sheet.getRange(rowNum, 4).setValue(now.toISOString());
      sheet.getRange(rowNum, 5).setValue(coupon.code);
      sendBirthdayCouponEmail(email, coupon.code, coupon.expirationDate);
      processed++;
      Utilities.sleep(500);
    } else {
      errors++;
    }
  }

  if (processed > 0 || errors > 0) {
    Logger.log('Birthday check: ' + processed + ' coupons, ' + errors + ' errors');
    if (CONFIG.NOTIFICATION_EMAIL) {
      MailApp.sendEmail({
        to: CONFIG.NOTIFICATION_EMAIL,
        subject: 'Dogum Gunu Kuponu — ' + processed + ' kupon',
        body: processed + ' kupon olusturuldu, ' + errors + ' hata.\nTarih: ' + now.toISOString()
      });
    }
  }
}

function sendBirthdayConfirmationEmail(email, birthday) {
  try {
    var bdParts = birthday.split('-');
    var months = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
    var formattedDate = parseInt(bdParts[2]) + ' ' + months[parseInt(bdParts[1]) - 1];

    var html = '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>' +
      '<body style="margin:0;padding:0;background-color:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif">' +
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f7"><tr><td align="center" style="padding:32px 16px">' +
      '<table role="presentation" width="500" cellpadding="0" cellspacing="0" style="max-width:500px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 8px rgba(0,0,0,0.04)">' +

      // Header bar
      '<tr><td style="background:#1a1a1a;padding:20px 32px;text-align:center">' +
      '<span style="color:#af8c3e;font-size:14px;font-weight:700;letter-spacing:3px;text-transform:uppercase">Manhattan Likit</span>' +
      '</td></tr>' +

      // Check icon - pure HTML/CSS
      '<tr><td style="padding:40px 32px 0;text-align:center">' +
      '<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto"><tr>' +
      '<td style="width:64px;height:64px;border-radius:50%;background:#af8c3e;text-align:center;vertical-align:middle;font-size:28px;color:#ffffff;line-height:64px">&#10003;</td>' +
      '</tr></table>' +
      '</td></tr>' +

      // Content
      '<tr><td style="padding:24px 32px 40px;text-align:center">' +
      '<h1 style="font-size:24px;color:#1a1a1a;margin:0 0 12px;font-weight:700">Doğum Gününüz Kaydedildi</h1>' +
      '<p style="font-size:15px;color:#666;margin:0 0 28px;line-height:1.6"><b style="color:#1a1a1a">' + formattedDate + '</b> tarihinde sizin için özel bir sürprizimiz olacak.</p>' +

      // Divider
      '<table role="presentation" width="40" cellpadding="0" cellspacing="0" style="margin:0 auto 28px"><tr><td style="border-top:2px solid #af8c3e"></td></tr></table>' +

      // Info box
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="background:#f9f9fb;border-radius:12px;padding:24px;text-align:center">' +
      '<p style="font-size:14px;color:#555;margin:0;line-height:1.7">Doğum gününüzde size özel<br><b style="color:#af8c3e">sürpriz bir indirim kodu</b> göndereceğiz.</p>' +
      '</td></tr></table>' +

      // Brand note
      '<p style="font-size:13px;color:#999;margin:28px 0 0;line-height:1.6;text-align:center;font-style:italic">Manhattan Likit ailesinin bir parçası olduğunuz için teşekkür ederiz.</p>' +

      // CTA
      '<table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px auto 0"><tr><td style="background:#af8c3e;border-radius:10px">' +
      '<a href="https://manhattandan.com" style="display:inline-block;padding:14px 36px;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px">Alışverişe Devam Et</a>' +
      '</td></tr></table>' +

      '</td></tr>' +

      // Footer
      '<tr><td style="padding:24px 32px;border-top:1px solid #f0f0f0;text-align:center">' +
      '<p style="font-size:12px;color:#999;margin:0">Manhattan Likit &mdash; manhattandan.com</p>' +
      '</td></tr>' +

      '</table></td></tr></table></body></html>';

    GmailApp.sendEmail(email, 'Doğum Gününüz Kaydedildi — Manhattan Likit', 'Doğum gününüz kaydedildi. Özel gününüzde sürpriz indirim kodunuz gelecek!', {
      htmlBody: html,
      name: 'Manhattan Likit'
    });
    Logger.log('Confirmation email sent: ' + email);
  } catch (e) {
    Logger.log('Email error (confirmation): ' + e.toString());
  }
}

function sendBirthdayCouponEmail(email, couponCode, expirationDate) {
  try {
    var months = ['Ocak','\u015Eubat','Mart','Nisan','May\u0131s','Haziran','Temmuz','A\u011Fustos','Eyl\u00FCl','Ekim','Kas\u0131m','Aral\u0131k'];
    var expFormatted = expirationDate.getDate() + ' ' + months[expirationDate.getMonth()] + ' ' + expirationDate.getFullYear();

    var html = '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>' +
      '<body style="margin:0;padding:0;background-color:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif">' +
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f7"><tr><td align="center" style="padding:32px 16px">' +
      '<table role="presentation" width="500" cellpadding="0" cellspacing="0" style="max-width:500px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 8px rgba(0,0,0,0.04)">' +

      // Header bar
      '<tr><td style="background:#1a1a1a;padding:20px 32px;text-align:center">' +
      '<span style="color:#af8c3e;font-size:14px;font-weight:700;letter-spacing:3px;text-transform:uppercase">Manhattan Likit</span>' +
      '</td></tr>' +

      // Gold star icon - pure HTML/CSS
      '<tr><td style="padding:40px 32px 0;text-align:center">' +
      '<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto"><tr>' +
      '<td style="width:64px;height:64px;border-radius:50%;background:#af8c3e;text-align:center;vertical-align:middle;font-size:30px;color:#ffffff;line-height:64px">&#9733;</td>' +
      '</tr></table>' +
      '</td></tr>' +

      // Content
      '<tr><td style="padding:24px 32px 40px;text-align:center">' +
      '<h1 style="font-size:26px;color:#1a1a1a;margin:0 0 8px;font-weight:700">Do&#287;um G&#252;n&#252;n&#252;z Kutlu Olsun!</h1>' +
      '<p style="font-size:15px;color:#666;margin:0 0 8px;line-height:1.6">Bug&#252;n sizin g&#252;n&#252;n&#252;z ve biz de yan&#305;n&#305;zday&#305;z.</p>' +
      '<p style="font-size:14px;color:#999;margin:0 0 32px;line-height:1.6">Manhattan Likit ailesinin de&#287;erli bir &#252;yesi olarak<br>sizin i&#231;in &#246;zel bir hediye haz&#305;rlad&#305;k.</p>' +

      // Divider
      '<table role="presentation" width="40" cellpadding="0" cellspacing="0" style="margin:0 auto 32px"><tr><td style="border-top:2px solid #af8c3e"></td></tr></table>' +

      // Coupon box
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="background:#faf3e0;border:2px dashed #af8c3e;border-radius:16px;padding:32px 20px;text-align:center">' +
      '<p style="font-size:11px;color:#8b6234;margin:0 0 10px;text-transform:uppercase;letter-spacing:3px;font-weight:700">Do&#287;um G&#252;n&#252; Hediyeniz</p>' +
      '<p style="font-size:28px;font-weight:900;color:#af8c3e;margin:0 0 10px;letter-spacing:4px;font-family:Courier New,monospace">' + couponCode + '</p>' +
      '<p style="font-size:22px;font-weight:800;color:#1a1a1a;margin:0">%5 EK &#304;ND&#304;R&#304;M</p>' +
      '</td></tr></table>' +

      // Expiration
      '<p style="font-size:13px;color:#999;margin:16px 0 0;text-align:center">Son kullanma tarihi: <b style="color:#666">' + expFormatted + '</b></p>' +

      // Details
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0 0"><tr><td style="background:#f9f9fb;border-radius:12px;padding:24px;text-align:left">' +
      '<p style="font-size:13px;color:#374151;margin:0 0 12px;font-weight:600">Kullan&#305;m Ko&#351;ullar&#305;</p>' +
      '<p style="font-size:13px;color:#666;margin:0 0 6px;line-height:1.5">&#10003;&nbsp; T&#252;m &#252;r&#252;nlerde ge&#231;erli</p>' +
      '<p style="font-size:13px;color:#666;margin:0 0 6px;line-height:1.5">&#10003;&nbsp; Mevcut seviye indiriminize ek kullanabilirsiniz</p>' +
      '<p style="font-size:13px;color:#666;margin:0 0 6px;line-height:1.5">&#10003;&nbsp; Tek kullan&#305;ml&#305;k</p>' +
      '<p style="font-size:13px;color:#666;margin:0;line-height:1.5">&#10003;&nbsp; Sepette kupon kodunu girin</p>' +
      '</td></tr></table>' +

      // Brand note
      '<p style="font-size:13px;color:#999;margin:28px 0 0;line-height:1.6;text-align:center;font-style:italic">Nice mutlu y&#305;llara, sa&#287;l&#305;kla ve keyifle.<br>Manhattan Likit ailesi olarak yan&#305;n&#305;zday&#305;z.</p>' +

      // CTA
      '<table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px auto 0"><tr><td style="background:#af8c3e;border-radius:10px">' +
      '<a href="https://manhattandan.com" style="display:inline-block;padding:16px 40px;color:#ffffff;text-decoration:none;font-weight:700;font-size:16px">Hediyenizi Kullan&#305;n</a>' +
      '</td></tr></table>' +

      '</td></tr>' +

      // Footer
      '<tr><td style="padding:24px 32px;border-top:1px solid #f0f0f0;text-align:center">' +
      '<p style="font-size:12px;color:#999;margin:0">Manhattan Likit &mdash; manhattandan.com</p>' +
      '</td></tr>' +

      '</table></td></tr></table></body></html>';

    GmailApp.sendEmail(email, 'Do\u011Fum G\u00FCn\u00FCn\u00FCz Kutlu Olsun! S\u00FCrpriz hediyeniz haz\u0131r \u2014 Manhattan Likit', 'Do\u011Fum g\u00FCn\u00FCn\u00FCz kutlu olsun! Sizin i\u00E7in \u00F6zel %5 ek indirim kodunuz: ' + couponCode + ' - Son kullanma: ' + expFormatted, {
      htmlBody: html,
      name: 'Manhattan Likit'
    });
    Logger.log('Coupon email sent: ' + email + ' code: ' + couponCode);
  } catch (e) {
    Logger.log('Email error (coupon): ' + e.toString());
  }
}

function sendTierUpgradeEmail(email, customerName, oldTier, newTier) {
  try {
    var tierInfo = {
      'Bronze':   { discount: '%3',  color: '#cd7f32', label: 'Bronze' },
      'Silver':   { discount: '%5',  color: '#a0a0a0', label: 'Silver' },
      'Gold':     { discount: '%7.5', color: '#af8c3e', label: 'Gold' },
      'Platinum': { discount: '%10', color: '#7b8794', label: 'Platinum' },
      'Diamond':  { discount: '%15', color: '#4a90d9', label: 'Diamond' }
    };
    var info = tierInfo[newTier] || { discount: '', color: '#af8c3e', label: newTier };
    var oldInfo = tierInfo[oldTier] || { discount: '', color: '#ccc', label: oldTier };
    var displayName = customerName || email.split('@')[0];
    var oldLabel = (oldTier === 'Yok' || oldTier === 'Starter') ? 'Ba\u015Flang\u0131\u00E7' : oldTier;

    // Tier-specific unlocks
    var unlockText = '';
    if (newTier === 'Gold') unlockText = 'Art\u0131k arkada\u015Flar\u0131n\u0131z\u0131 davet edebilir, onlara da indirim hediye edebilirsiniz.';
    else if (newTier === 'Platinum') unlockText = 'En \u00F6zel m\u00FC\u015Fterilerimizden biri oldunuz. Arkada\u015Flar\u0131n\u0131za %10 hediye edebilirsiniz.';
    else if (newTier === 'Diamond') unlockText = 'Zirvede yerinizi ald\u0131n\u0131z. Arkada\u015Flar\u0131n\u0131za %15 hediye edebilir, en y\u00FCksek ayr\u0131cal\u0131klar\u0131n keyfini \u00E7\u0131karabilirsiniz.';

    var html = '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>' +
      '<body style="margin:0;padding:0;background-color:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif">' +
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f7"><tr><td align="center" style="padding:32px 16px">' +
      '<table role="presentation" width="500" cellpadding="0" cellspacing="0" style="max-width:500px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 8px rgba(0,0,0,0.04)">' +

      // Header bar
      '<tr><td style="background:#1a1a1a;padding:20px 32px;text-align:center">' +
      '<span style="color:#af8c3e;font-size:14px;font-weight:700;letter-spacing:3px;text-transform:uppercase">Manhattan Likit</span>' +
      '</td></tr>' +

      // Arrow up icon
      '<tr><td style="padding:40px 32px 0;text-align:center">' +
      '<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto"><tr>' +
      '<td style="width:64px;height:64px;border-radius:50%;background:#af8c3e;text-align:center;vertical-align:middle;font-size:28px;color:#ffffff;line-height:64px">&#9650;</td>' +
      '</tr></table>' +
      '</td></tr>' +

      // Content
      '<tr><td style="padding:24px 32px 40px;text-align:center">' +
      '<h1 style="font-size:24px;color:#1a1a1a;margin:0 0 8px;font-weight:700">Yeni Seviyeniz Haz&#305;r</h1>' +
      '<p style="font-size:15px;color:#666;margin:0 0 8px;line-height:1.7">' + displayName + ', bir ad&#305;m daha ileri gittiniz.</p>' +
      '<p style="font-size:14px;color:#999;margin:0 0 32px;line-height:1.6">Her sipari&#351;inizle birlikte g&#252;veninizi hissediyoruz.<br>&#350;imdi s&#305;ra bizde: yeni ayr&#305;cal&#305;klar&#305;n&#305;z sizi bekliyor.</p>' +

      // Tier badges - old: faded gray, new: gold premium
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 32px"><tr><td style="text-align:center">' +
      '<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto"><tr>' +

      // Old tier - subtle, faded
      '<td style="padding:16px 24px;background:#f9f9fb;border:1px solid #e8e8e8;border-radius:12px;text-align:center;opacity:0.6">' +
      '<p style="font-size:11px;color:#bbb;margin:0 0 6px;text-transform:uppercase;letter-spacing:1px">&#214;nceki</p>' +
      '<p style="font-size:15px;font-weight:600;color:#ccc;margin:0">' + oldLabel + '</p>' +
      '</td>' +

      // Arrow
      '<td style="padding:0 14px;font-size:20px;color:#af8c3e">&rarr;</td>' +

      // New tier - premium gold frame
      '<td style="padding:16px 24px;background:#faf3e0;border:2px solid #af8c3e;border-radius:12px;text-align:center">' +
      '<p style="font-size:11px;color:#af8c3e;margin:0 0 6px;text-transform:uppercase;letter-spacing:2px;font-weight:600">Yeni Seviye</p>' +
      '<p style="font-size:20px;font-weight:800;color:#1a1a1a;margin:0">' + info.label + '</p>' +
      '</td>' +

      '</tr></table>' +
      '</td></tr></table>' +

      // Divider
      '<table role="presentation" width="40" cellpadding="0" cellspacing="0" style="margin:0 auto 28px"><tr><td style="border-top:2px solid #af8c3e"></td></tr></table>' +

      // Discount highlight
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="background:#f9f9fb;border-radius:12px;padding:28px;text-align:center">' +
      '<p style="font-size:14px;color:#555;margin:0 0 8px;line-height:1.7">Art&#305;k t&#252;m al&#305;&#351;veri&#351;lerinizde</p>' +
      '<p style="font-size:32px;font-weight:900;color:#af8c3e;margin:0 0 8px">' + info.discount + ' indirim</p>' +
      '<p style="font-size:14px;color:#555;margin:0">kazan&#305;yorsunuz.</p>' +
      '</td></tr></table>' +

      // Unlock note (if Silver+)
      (unlockText ? '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0 0"><tr><td style="background:#faf3e0;border-left:3px solid #af8c3e;border-radius:0 8px 8px 0;padding:16px 20px;text-align:left">' +
      '<p style="font-size:13px;color:#666;margin:0;line-height:1.6">' + unlockText + '</p>' +
      '</td></tr></table>' : '') +

      // Brand closing
      '<p style="font-size:13px;color:#999;margin:28px 0 0;line-height:1.6;text-align:center;font-style:italic">Bu yolculukta her ad&#305;m&#305; birlikte at&#305;yoruz.<br>Manhattan Likit ailesi olarak yan&#305;n&#305;zday&#305;z.</p>' +

      // CTA
      '<table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px auto 0"><tr><td style="background:#af8c3e;border-radius:10px">' +
      '<a href="https://manhattandan.com" style="display:inline-block;padding:14px 36px;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px">Yeni Ayr&#305;cal&#305;klar&#305;n&#305;z&#305; Ke&#351;fedin</a>' +
      '</td></tr></table>' +

      '</td></tr>' +

      // Footer
      '<tr><td style="padding:24px 32px;border-top:1px solid #f0f0f0;text-align:center">' +
      '<p style="font-size:12px;color:#999;margin:0">Manhattan Likit &mdash; manhattandan.com</p>' +
      '</td></tr>' +

      '</table></td></tr></table></body></html>';

    GmailApp.sendEmail(email, 'Yeni Seviyeniz Haz\u0131r: ' + newTier + ' \u2014 Manhattan Likit',
      'Tebrikler! Sadakat seviyeniz ' + newTier + ' oldu. Art\u0131k ' + info.discount + ' indirim kazan\u0131yorsunuz.',
      { htmlBody: html, name: 'Manhattan Likit' }
    );
    Logger.log('Tier upgrade email sent: ' + email + ' -> ' + newTier);
  } catch (e) {
    Logger.log('Email error (tier upgrade): ' + e.toString());
  }
}

function handleReferral(referrerEmail, friendEmail) {
  try {
    if (!referrerEmail || !friendEmail) return jsonResponse({ error: 'Her iki email adresi gerekli.' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(referrerEmail)) return jsonResponse({ error: 'Gecersiz email.' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(friendEmail)) return jsonResponse({ error: 'Gecersiz email.' });

    var refEmail = referrerEmail.toLowerCase().trim();
    var frdEmail = friendEmail.toLowerCase().trim();

    // 1) Kendine gonderemez
    if (refEmail === frdEmail) return jsonResponse({ error: 'Kendi email adresinize davet gonderemezsiniz.' });

    // 2) Referrer'in seviyesini kontrol et (Silver+ olmali)
    var referrerInfo = getCustomerInfo(refEmail);
    if (!referrerInfo) return jsonResponse({ error: 'Bu email adresiyle kayitli musteri bulunamadi.' });

    var tierDiscount = CONFIG.REFERRAL_TIERS[referrerInfo.tierName];
    if (!tierDiscount) return jsonResponse({ error: 'Arkadas davet etmek icin Silver veya ustu seviye gereklidir.' });

    // 3) Arkadas daha once siparis vermis mi? (yeni musteri olmali)
    var friendOrders = ecwidGet('orders?email=' + encodeURIComponent(frdEmail) + '&paymentStatus=PAID&limit=1');
    if (friendOrders && friendOrders.total > 0) {
      return jsonResponse({ error: 'Bu kisi zaten mevcut bir musterimiz.' });
    }

    // 4) Referrals sheet kontrol - limitler ve tekrar
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Referrals');
    if (!sheet) {
      sheet = ss.insertSheet('Referrals');
      sheet.appendRow(['referrer_email', 'friend_email', 'friend_coupon_code', 'discount_percent', 'status', 'created_at', 'reward_coupon_code', 'completed_at', 'referrer_name']);
      sheet.setFrozenRows(1);
    }

    var data = sheet.getDataRange().getValues();
    var now = new Date();
    var todayStr = now.toISOString().split('T')[0];
    var monthStr = now.toISOString().substring(0, 7); // YYYY-MM
    var dailyCount = 0;
    var monthlyCount = 0;

    for (var i = 1; i < data.length; i++) {
      var rowReferrer = String(data[i][0]).toLowerCase().trim();
      var rowFriend = String(data[i][1]).toLowerCase().trim();
      var rowCreated = String(data[i][5]);

      // Global check — bu arkadas daha once herhangi biri tarafindan davet edilmis mi?
      if (rowFriend === frdEmail) {
        return jsonResponse({ error: 'Bu kisi daha once davet edilmis.' });
      }

      if (rowReferrer === refEmail) {
        // Gunluk limit
        if (rowCreated.indexOf(todayStr) === 0) dailyCount++;
        // Aylik limit
        if (rowCreated.indexOf(monthStr) === 0) monthlyCount++;
      }
    }

    if (dailyCount >= CONFIG.REFERRAL_DAILY_LIMIT) {
      return jsonResponse({ error: 'Gunluk davet limitinize ulastiniz (' + CONFIG.REFERRAL_DAILY_LIMIT + '/gun).' });
    }
    if (monthlyCount >= CONFIG.REFERRAL_MONTHLY_LIMIT) {
      return jsonResponse({ error: 'Aylik davet limitinize ulastiniz (' + CONFIG.REFERRAL_MONTHLY_LIMIT + '/ay).' });
    }

    // 5) Kupon olustur (arkadas icin)
    var discountPercent = tierDiscount.discount;
    var couponCode = generateCouponCode();
    var expDate = new Date(now);
    expDate.setDate(expDate.getDate() + CONFIG.REFERRAL_COUPON_VALIDITY_DAYS);

    var payload = {
      name: 'Referral - ' + refEmail + ' > ' + frdEmail,
      code: couponCode,
      discountType: 'PERCENT',
      status: 'ACTIVE',
      discount: discountPercent,
      launchDate: formatEcwidDate(now),
      expirationDate: formatEcwidDate(expDate),
      usesLimit: 'SINGLE',
      applicationLimit: 'NEW_CUSTOMER_ONLY'
    };

    var createResult = ecwidPost('discount_coupons', payload);
    if (!createResult || !createResult.id) {
      Logger.log('Referral coupon create error: ' + JSON.stringify(createResult));
      return jsonResponse({ error: 'Kupon olusturulurken hata olustu.' });
    }

    // 6) Kaydet
    var referrerName = referrerInfo.name || refEmail.split('@')[0];
    sheet.appendRow([refEmail, frdEmail, couponCode, discountPercent, 'PENDING', now.toISOString(), '', '', referrerName]);

    // 7) Arkadasa email gonder
    sendReferralInviteEmail(frdEmail, referrerName, couponCode, discountPercent, expDate);

    // 8) Admin bildirimi
    try {
      GmailApp.sendEmail(CONFIG.NOTIFICATION_EMAIL,
        'Yeni Referral Daveti - ' + refEmail,
        'Davet eden: ' + refEmail + ' (' + referrerName + ', ' + referrerInfo.tierName + ')\nDavet edilen: ' + frdEmail + '\nKupon: ' + couponCode + ' (%' + discountPercent + ')\nTarih: ' + now.toISOString(),
        { name: 'Manhattan Likit' }
      );
    } catch(notifErr) { Logger.log('Referral admin notif error: ' + notifErr); }

    Logger.log('Referral created: ' + refEmail + ' -> ' + frdEmail + ' code: ' + couponCode + ' %' + discountPercent);
    return jsonResponse({ success: true, coupon: couponCode, discount: discountPercent, senderName: referrerName, senderTier: referrerInfo.tierName, message: 'Davetiniz gonderildi! Arkadasiniz siparis verdiginde sizin icin de indirim kodu olusturulacak.' });

  } catch (e) {
    Logger.log('Referral handler error: ' + e.toString());
    return jsonResponse({ error: 'Sunucu hatasi.' });
  }
}

/**
 * Ecwid'den musteri bilgisi al (email ile)
 * @returns {object|null} {id, email, name, tierName}
 */
function getCustomerInfo(email) {
  var result = ecwidGet('customers?email=' + encodeURIComponent(email) + '&limit=1');
  if (!result || !result.items || result.items.length === 0) return null;

  var c = result.items[0];
  var groupIds = loadGroupIds();
  var groupIdToName = {};
  Object.keys(groupIds).forEach(function(name) {
    groupIdToName[groupIds[name]] = name;
  });

  var tierName = groupIdToName[c.customerGroupId] || 'Starter';
  return {
    id: c.id,
    email: c.email,
    name: c.name || '',
    tierName: tierName,
    customerGroupId: c.customerGroupId
  };
}

/**
 * Ecwid API POST helper (kupon olusturmak icin)
 */
function ecwidPost(endpoint, payload) {
  var url = CONFIG.BASE_URL + '/' + CONFIG.STORE_ID + '/' + endpoint;
  var options = {
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + CONFIG.API_TOKEN,
      'Content-Type': 'application/json'
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };
  var response = UrlFetchApp.fetch(url, options);
  var code = response.getResponseCode();
  if (code === 200 || code === 201) {
    return JSON.parse(response.getContentText());
  }
  Logger.log('ecwidPost error [' + code + ']: ' + response.getContentText());
  return null;
}

/**
 * Gunluk referral kontrol - kupon kullanildi mi?
 * Kullanildiysa: adres kontrolu yap, referrer'e odul kuponu olustur
 */
function dailyReferralCheck() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Referrals');
  if (!sheet) { Logger.log('Referrals sheet bulunamadi.'); return; }

  var data = sheet.getDataRange().getValues();
  var processed = 0;
  var rewards = 0;
  var errors = 0;

  for (var i = 1; i < data.length; i++) {
    var status = String(data[i][4]).trim();
    if (status !== 'PENDING') continue;

    var refEmail = String(data[i][0]).trim();
    var frdEmail = String(data[i][1]).trim();
    var couponCode = String(data[i][2]).trim();
    var discountPercent = Number(data[i][3]);
    var referrerName = String(data[i][8] || '').trim();

    try {
      // Kuponu Ecwid'den kontrol et
      var coupon = ecwidGet('discount_coupons/' + couponCode);
      if (!coupon) {
        Logger.log('Coupon not found: ' + couponCode);
        continue;
      }

      // Kupon kullanildi mi? (USEDUP veya orderCount > 0)
      if (coupon.status === 'USEDUP' || coupon.orderCount > 0) {
        processed++;

        // Adres kontrolu: arkadasin siparisi
        var friendOrder = findOrderByCoupon(couponCode);
        if (!friendOrder) {
          Logger.log('Order not found for coupon: ' + couponCode);
          sheet.getRange(i + 1, 5).setValue('ORDER_NOT_FOUND');
          continue;
        }

        // Teslimat adresi karsilastirma
        if (isSameAddress(refEmail, friendOrder)) {
          Logger.log('FRAUD: Same address detected for referral ' + refEmail + ' -> ' + frdEmail);
          sheet.getRange(i + 1, 5).setValue('FRAUD_SAME_ADDRESS');
          sheet.getRange(i + 1, 8).setValue(new Date().toISOString());
          errors++;
          continue;
        }

        // Referrer icin odul kuponu olustur
        var rewardCode = generateCouponCode();
        var now = new Date();
        var expDate = new Date(now);
        expDate.setDate(expDate.getDate() + CONFIG.REFERRAL_COUPON_VALIDITY_DAYS);

        var payload = {
          name: 'Referral Odul - ' + refEmail,
          code: rewardCode,
          discountType: 'PERCENT',
          status: 'ACTIVE',
          discount: discountPercent,
          launchDate: formatEcwidDate(now),
          expirationDate: formatEcwidDate(expDate),
          usesLimit: 'SINGLE',
          applicationLimit: 'UNLIMITED'
        };

        var createResult = ecwidPost('discount_coupons', payload);
        if (createResult && createResult.id) {
          // Referrer'e email gonder
          sendReferralRewardEmail(refEmail, referrerName, rewardCode, discountPercent, frdEmail, expDate);

          // Sheet guncelle
          sheet.getRange(i + 1, 5).setValue('COMPLETED');
          sheet.getRange(i + 1, 7).setValue(rewardCode);
          sheet.getRange(i + 1, 8).setValue(now.toISOString());
          rewards++;
          Logger.log('Referral reward: ' + refEmail + ' code: ' + rewardCode);
        } else {
          sheet.getRange(i + 1, 5).setValue('REWARD_ERROR');
          errors++;
        }
      }

      // Suresi dolmus kuponlari kontrol et
      if (coupon.status === 'EXPIRED' && coupon.orderCount === 0) {
        sheet.getRange(i + 1, 5).setValue('EXPIRED');
        sheet.getRange(i + 1, 8).setValue(new Date().toISOString());
      }

      Utilities.sleep(CONFIG.API_DELAY);
    } catch (err) {
      Logger.log('Referral check error row ' + i + ': ' + err.toString());
      errors++;
    }
  }

  // Admin bildirimi
  if (processed > 0) {
    GmailApp.sendEmail(CONFIG.NOTIFICATION_EMAIL,
      'Referral Kontrol - ' + rewards + ' odul, ' + errors + ' hata',
      processed + ' referral islendi. ' + rewards + ' odul kuponu olusturuldu. ' + errors + ' hata.\nTarih: ' + new Date().toISOString(),
      { name: 'Manhattan Likit' }
    );
  }

  Logger.log('dailyReferralCheck: ' + processed + ' islendi, ' + rewards + ' odul, ' + errors + ' hata');
}

/**
 * Kupon koduna gore siparis bul
 */
function findOrderByCoupon(couponCode) {
  // Son 30 gunun siparislerinde ara
  var cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 30);
  var cutoffStr = cutoff.toISOString().replace('T', ' ').substring(0, 19) + ' +0000';

  var result = ecwidGet('orders?createdFrom=' + encodeURIComponent(cutoffStr) + '&paymentStatus=PAID&limit=100');
  if (!result || !result.items) return null;

  for (var j = 0; j < result.items.length; j++) {
    var order = result.items[j];
    if (order.discountCoupon && order.discountCoupon.code === couponCode) {
      return order;
    }
  }
  return null;
}

/**
 * Referrer'in gecmis siparisleriyle arkadasin siparis adresini karsilastir
 */
function isSameAddress(referrerEmail, friendOrder) {
  if (!friendOrder.shippingPerson) return false;
  var friendAddr = normalizeAddress(friendOrder.shippingPerson);
  if (!friendAddr) return false;

  // Referrer'in siparislerini al
  var refOrders = ecwidGet('orders?email=' + encodeURIComponent(referrerEmail) + '&paymentStatus=PAID&limit=10');
  if (!refOrders || !refOrders.items || refOrders.items.length === 0) return false;

  for (var k = 0; k < refOrders.items.length; k++) {
    if (!refOrders.items[k].shippingPerson) continue;
    var refAddr = normalizeAddress(refOrders.items[k].shippingPerson);
    if (refAddr && refAddr === friendAddr) return true;
  }
  return false;
}

/**
 * Adresi normalize et (kucuk harf, bosluk sil, karsilastirma icin)
 */
function normalizeAddress(shippingPerson) {
  if (!shippingPerson) return null;
  var parts = [
    shippingPerson.street || '',
    shippingPerson.city || '',
    shippingPerson.postalCode || ''
  ];
  var normalized = parts.join('|').toLowerCase().replace(/\s+/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
  return normalized.length > 5 ? normalized : null;
}

/**
 * Arkadasa gonderilen davet emaili
 */
function sendReferralInviteEmail(friendEmail, referrerName, couponCode, discountPercent, expDate) {
  try {
    if (!expDate) { expDate = new Date(); expDate.setDate(expDate.getDate() + 14); }
    var months = ['Ocak','\u015Eubat','Mart','Nisan','May\u0131s','Haziran','Temmuz','A\u011Fustos','Eyl\u00FCl','Ekim','Kas\u0131m','Aral\u0131k'];
    var expFormatted = expDate.getDate() + ' ' + months[expDate.getMonth()] + ' ' + expDate.getFullYear();

    var html = '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>' +
      '<body style="margin:0;padding:0;background-color:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif">' +
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f7"><tr><td align="center" style="padding:32px 16px">' +
      '<table role="presentation" width="500" cellpadding="0" cellspacing="0" style="max-width:500px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 8px rgba(0,0,0,0.04)">' +

      '<tr><td style="background:#1a1a1a;padding:20px 32px;text-align:center">' +
      '<span style="color:#af8c3e;font-size:14px;font-weight:700;letter-spacing:3px;text-transform:uppercase">Manhattan Likit</span>' +
      '</td></tr>' +

      // Diamond gift icon
      '<tr><td style="padding:40px 32px 0;text-align:center">' +
      '<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto"><tr>' +
      '<td style="width:64px;height:64px;border-radius:50%;background:#af8c3e;text-align:center;vertical-align:middle;font-size:28px;color:#ffffff;line-height:64px">&#9670;</td>' +
      '</tr></table>' +
      '</td></tr>' +

      '<tr><td style="padding:24px 32px 40px;text-align:center">' +
      '<h1 style="font-size:24px;color:#1a1a1a;margin:0 0 12px;font-weight:700">Sizin &#304;&#231;in &#214;zel Bir Davet</h1>' +
      '<p style="font-size:15px;color:#666;margin:0 0 24px;line-height:1.7"><b style="color:#1a1a1a">' + referrerName + '</b> Manhattan Likit deneyimini<br>sizinle payla&#351;mak istedi.</p>' +

      // Referrer note box
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 32px"><tr><td style="background:#f9f9fb;border-left:3px solid #af8c3e;border-radius:0 8px 8px 0;padding:16px 20px;text-align:left">' +
      '<p style="font-size:13px;color:#666;margin:0;line-height:1.6;font-style:italic">"Benim en sevdi&#287;im markalardan biri. Deneyimini senin de ya&#351;amanı istedim."</p>' +
      '</td></tr></table>' +

      // Divider
      '<table role="presentation" width="40" cellpadding="0" cellspacing="0" style="margin:0 auto 32px"><tr><td style="border-top:2px solid #af8c3e"></td></tr></table>' +

      // Coupon box
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="background:#faf3e0;border:2px dashed #af8c3e;border-radius:16px;padding:32px 20px;text-align:center">' +
      '<p style="font-size:11px;color:#8b6234;margin:0 0 10px;text-transform:uppercase;letter-spacing:3px;font-weight:700">Ho&#351; Geldin Hediyeniz</p>' +
      '<p style="font-size:28px;font-weight:900;color:#af8c3e;margin:0 0 10px;letter-spacing:4px;font-family:Courier New,monospace">' + couponCode + '</p>' +
      '<p style="font-size:22px;font-weight:800;color:#1a1a1a;margin:0">%' + discountPercent + ' &#304;ND&#304;R&#304;M</p>' +
      '</td></tr></table>' +

      '<p style="font-size:13px;color:#999;margin:16px 0 0;text-align:center">Son kullanma tarihi: <b style="color:#666">' + expFormatted + '</b></p>' +

      // Details
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0 0"><tr><td style="background:#f9f9fb;border-radius:12px;padding:24px;text-align:left">' +
      '<p style="font-size:13px;color:#666;margin:0 0 6px;line-height:1.5">&#10003;&nbsp; T&#252;m &#252;r&#252;nlerde ge&#231;erli</p>' +
      '<p style="font-size:13px;color:#666;margin:0 0 6px;line-height:1.5">&#10003;&nbsp; &#304;lk al&#305;&#351;veri&#351;inizde hemen kullanabilirsiniz</p>' +
      '<p style="font-size:13px;color:#666;margin:0;line-height:1.5">&#10003;&nbsp; Sepette kupon kodunu girin, indiriminiz an&#305;nda yans&#305;s&#305;n</p>' +
      '</td></tr></table>' +

      // Brand closing
      '<p style="font-size:13px;color:#999;margin:28px 0 0;line-height:1.6;text-align:center;font-style:italic">&#304;yi &#351;eyler payla&#351;&#305;ld&#305;k&#231;a &#231;o&#287;al&#305;r.<br>Manhattan Likit ailesine ho&#351; geldiniz.</p>' +

      // CTA
      '<table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px auto 0"><tr><td style="background:#af8c3e;border-radius:10px">' +
      '<a href="https://manhattandan.com" style="display:inline-block;padding:16px 40px;color:#ffffff;text-decoration:none;font-weight:700;font-size:16px">Ke&#351;fetmeye Ba&#351;lay&#305;n</a>' +
      '</td></tr></table>' +

      '</td></tr>' +

      '<tr><td style="padding:24px 32px;border-top:1px solid #f0f0f0;text-align:center">' +
      '<p style="font-size:12px;color:#999;margin:0">Manhattan Likit &mdash; manhattandan.com</p>' +
      '</td></tr>' +

      '</table></td></tr></table></body></html>';

    GmailApp.sendEmail(friendEmail, referrerName + ' Size Bir Hediye G\u00F6nderdi \u2014 Manhattan Likit',
      referrerName + ' size Manhattan Likit\'te %' + discountPercent + ' indirim hediye etti. Kodunuz: ' + couponCode,
      { htmlBody: html }
    );
    Logger.log('Referral invite email sent to: ' + friendEmail);
  } catch (e) {
    Logger.log('Referral invite email error: ' + e.toString());
  }
}

function sendReferralRewardEmail(referrerEmail, referrerName, rewardCode, discountPercent, friendEmail, expDate) {
  try {
    if (!expDate) { expDate = new Date(); expDate.setDate(expDate.getDate() + 14); }
    var months = ['Ocak','\u015Eubat','Mart','Nisan','May\u0131s','Haziran','Temmuz','A\u011Fustos','Eyl\u00FCl','Ekim','Kas\u0131m','Aral\u0131k'];
    var expFormatted = expDate.getDate() + ' ' + months[expDate.getMonth()] + ' ' + expDate.getFullYear();
    var displayName = referrerName || referrerEmail.split('@')[0];
    var friendDisplay = friendEmail.split('@')[0] + '***';

    var html = '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>' +
      '<body style="margin:0;padding:0;background-color:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif">' +
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f7"><tr><td align="center" style="padding:32px 16px">' +
      '<table role="presentation" width="500" cellpadding="0" cellspacing="0" style="max-width:500px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 8px rgba(0,0,0,0.04)">' +

      '<tr><td style="background:#1a1a1a;padding:20px 32px;text-align:center">' +
      '<span style="color:#af8c3e;font-size:14px;font-weight:700;letter-spacing:3px;text-transform:uppercase">Manhattan Likit</span>' +
      '</td></tr>' +

      // Star icon
      '<tr><td style="padding:40px 32px 0;text-align:center">' +
      '<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto"><tr>' +
      '<td style="width:64px;height:64px;border-radius:50%;background:#af8c3e;text-align:center;vertical-align:middle;font-size:30px;color:#ffffff;line-height:64px">&#9733;</td>' +
      '</tr></table>' +
      '</td></tr>' +

      '<tr><td style="padding:24px 32px 40px;text-align:center">' +
      '<h1 style="font-size:24px;color:#1a1a1a;margin:0 0 12px;font-weight:700">Payla&#351;t&#305;&#287;&#305;n&#305;z De&#287;er Geri D&#246;nd&#252;</h1>' +
      '<p style="font-size:15px;color:#666;margin:0 0 8px;line-height:1.7">Davet etti&#287;iniz <b style="color:#1a1a1a">' + friendDisplay + '</b> ilk sipari&#351;ini tamamlad&#305;.</p>' +
      '<p style="font-size:14px;color:#999;margin:0 0 32px;line-height:1.6">G&#252;zel deneyimleri payla&#351;man&#305;n en iyi yan&#305;:<br>her iki taraf da kazan&#305;r.</p>' +

      // Divider
      '<table role="presentation" width="40" cellpadding="0" cellspacing="0" style="margin:0 auto 32px"><tr><td style="border-top:2px solid #af8c3e"></td></tr></table>' +

      // Coupon box
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="background:#faf3e0;border:2px dashed #af8c3e;border-radius:16px;padding:32px 20px;text-align:center">' +
      '<p style="font-size:11px;color:#8b6234;margin:0 0 10px;text-transform:uppercase;letter-spacing:3px;font-weight:700">Te&#351;ekk&#252;r Hediyeniz</p>' +
      '<p style="font-size:28px;font-weight:900;color:#af8c3e;margin:0 0 10px;letter-spacing:4px;font-family:Courier New,monospace">' + rewardCode + '</p>' +
      '<p style="font-size:22px;font-weight:800;color:#1a1a1a;margin:0">%' + discountPercent + ' EK &#304;ND&#304;R&#304;M</p>' +
      '</td></tr></table>' +

      '<p style="font-size:13px;color:#999;margin:16px 0 0;text-align:center">Son kullanma tarihi: <b style="color:#666">' + expFormatted + '</b></p>' +

      // Details
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0 0"><tr><td style="background:#f9f9fb;border-radius:12px;padding:24px;text-align:left">' +
      '<p style="font-size:13px;color:#666;margin:0 0 6px;line-height:1.5">&#10003;&nbsp; Mevcut seviye indiriminize ek kullanabilirsiniz</p>' +
      '<p style="font-size:13px;color:#666;margin:0 0 6px;line-height:1.5">&#10003;&nbsp; Tek kullan&#305;ml&#305;k</p>' +
      '<p style="font-size:13px;color:#666;margin:0;line-height:1.5">&#10003;&nbsp; T&#252;m &#252;r&#252;nlerde ge&#231;erli</p>' +
      '</td></tr></table>' +

      // Brand closing
      '<p style="font-size:13px;color:#999;margin:28px 0 0;line-height:1.6;text-align:center;font-style:italic">Siz payla&#351;t&#305;k&#231;a, aile b&#252;y&#252;yor.<br>Manhattan Likit ailesi olarak yan&#305;n&#305;zday&#305;z.</p>' +

      // CTA
      '<table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px auto 0"><tr><td style="background:#af8c3e;border-radius:10px">' +
      '<a href="https://manhattandan.com" style="display:inline-block;padding:16px 40px;color:#ffffff;text-decoration:none;font-weight:700;font-size:16px">Hediyenizi Kullan&#305;n</a>' +
      '</td></tr></table>' +

      '</td></tr>' +

      '<tr><td style="padding:24px 32px;border-top:1px solid #f0f0f0;text-align:center">' +
      '<p style="font-size:12px;color:#999;margin:0">Manhattan Likit &mdash; manhattandan.com</p>' +
      '</td></tr>' +

      '</table></td></tr></table></body></html>';

    GmailApp.sendEmail(referrerEmail, 'Payla\u015Ft\u0131\u011F\u0131n\u0131z De\u011Fer Geri D\u00F6nd\u00FC! Hediyeniz Haz\u0131r \u2014 Manhattan Likit',
      'Tebrikler! Davet ettiginiz arkadas siparis verdi. Sizin icin %' + discountPercent + ' ek indirim kodunuz: ' + rewardCode,
      { htmlBody: html }
    );
    Logger.log('Referral reward email sent to: ' + referrerEmail);
  } catch (e) {
    Logger.log('Referral reward email error: ' + e.toString());
  }
}

function setupReferralTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'dailyReferralCheck') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
  ScriptApp.newTrigger('dailyReferralCheck')
    .timeBased()
    .everyMinutes(15)
    .create();
  Logger.log('Referral trigger kuruldu (15dk)');
}

/**
 * Test: referral kupon olustur ve email gonder
 */
function testReferralSystem() {
  var testCouponCode = generateCouponCode();
  var now = new Date();
  var expDate = new Date(now);
  expDate.setDate(expDate.getDate() + 14);

  // Davet emaili testi
  sendReferralInviteEmail('info@manhattanlikit.com', 'Test Kullanici', testCouponCode, 7.5, expDate);

  // Odul emaili testi
  var rewardCode = generateCouponCode();
  sendReferralRewardEmail('info@manhattanlikit.com', 'Test Kullanici', rewardCode, 7.5, 'arkadas@test.com', expDate);

  // Admin bildirimi testi
  GmailApp.sendEmail(CONFIG.NOTIFICATION_EMAIL,
    'Yeni Referral Daveti - test@example.com',
    'Davet eden: test@example.com (Test Kullanici, Gold)\nDavet edilen: arkadas@test.com\nKupon: ' + testCouponCode + ' (%7.5)\nTarih: ' + now.toISOString(),
    { name: 'Manhattan Likit' }
  );

  Logger.log('Referral test emailleri gonderildi. Davet kodu: ' + testCouponCode + ' Odul kodu: ' + rewardCode);
}

function testTierUpgradeEmail() {
  sendTierUpgradeEmail('info@manhattanlikit.com', 'Test Kullanıcı', 'Bronze', 'Silver');
  sendTierUpgradeEmail('info@manhattanlikit.com', 'Test Kullanıcı', 'Silver', 'Gold');
  Logger.log('Tier upgrade test emailleri gonderildi.');
}

function setupBirthdayTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'dailyBirthdayCheck') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
  ScriptApp.newTrigger('dailyBirthdayCheck')
    .timeBased().everyMinutes(15).create();
  Logger.log('Birthday trigger kuruldu (15dk)');
}

// ===================== FLASH BONUS KUPON =====================

function handleFlashCoupon(email) {
  var json = function(obj) {
    return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
  };
  
  if (!email) return json({ success: false, error: 'E-posta gerekli.' });
  
  // Saat kontrolü: Cumartesi 16:00 - Pazar 18:00
  var now = new Date();
  var dow = now.getDay(); // 0=Pazar, 6=Cumartesi
  var hr = now.getHours();
  var isFlashTime = (dow === 6 && hr >= 16) || (dow === 0 && hr < 18);
  if (!isFlashTime) return json({ success: false, error: 'Flash bonus saatleri dışında.' });
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('FlashCoupons');
  if (!sheet) {
    sheet = ss.insertSheet('FlashCoupons');
    sheet.appendRow(['email', 'code', 'created_at', 'expires_at', 'week_key']);
  }
  
  // Haftalık duplicate kontrolü (aynı hafta aynı müşteriye 1 kez)
  var weekKey = getWeekKey(now);
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][0]).toLowerCase().trim() === email && String(data[i][4]) === weekKey) {
      // Bu hafta zaten oluşturulmuş — mevcut kodu döndür
      var existExp = data[i][3] ? Utilities.formatDate(new Date(data[i][3]), 'Europe/Istanbul', 'dd.MM.yyyy HH:mm') : '';
      return json({ success: true, code: String(data[i][1]), existing: true, expiry: existExp });
    }
  }
  
  // Yeni kupon oluştur
  var code = 'FLASH-' + generateCouponCode().substring(0, 8);
  // Kupon süresi: flash pencere sonu (Pazar 18:00)
  var expDate = new Date(now);
  if (dow === 6) { expDate.setDate(expDate.getDate() + 1); }
  expDate.setHours(18, 0, 0, 0);
  
  var payload = {
    name: 'Flash Bonus - ' + email,
    code: code,
    discountType: 'PERCENT',
    discount: CONFIG.FLASH_DISCOUNT_PERCENT,
    status: 'ACTIVE',
    usesLimit: 'SINGLE',
    repeatCustomerOnly: false,
    launchDate: formatEcwidDate(now),
    expirationDate: formatEcwidDate(expDate)
  };
  
  try {
    var result = ecwidPost('discount_coupons', payload);
    if (result) {
      sheet.appendRow([email, code, now.toISOString(), expDate.toISOString(), weekKey]);
      Logger.log('Flash coupon created: ' + code + ' for ' + email);
      var expStr = Utilities.formatDate(expDate, 'Europe/Istanbul', 'dd.MM.yyyy HH:mm');
      return json({ success: true, code: code, expiry: expStr });
    } else {
      Logger.log('Flash coupon API fail for ' + email);
      return json({ success: false, error: 'Kupon oluşturulamadı.' });
    }
  } catch (e) {
    Logger.log('Flash coupon error: ' + e.toString());
    return json({ success: false, error: 'Sistem hatası.' });
  }
}

function getWeekKey(date) {
  var d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - d.getDay()); // Pazar başlangıcına git
  return d.getFullYear() + '-W' + Math.ceil(((d - new Date(d.getFullYear(), 0, 1)) / 86400000 + 1) / 7);
}

function testCreateCoupon() {
  var coupon = createBirthdayCoupon('test@example.com');
  if (coupon) { Logger.log('TEST Kupon: ' + coupon.code + ' → ' + coupon.expirationDate); }
  else { Logger.log('TEST BASARISIZ'); }
}

function testCouponDebug() {
  var url = 'https://app.ecwid.com/api/v3/11692025/discount_coupons';
  var payload = {
    name: 'Dogum Gunu Test',
    code: 'TESTDEBUG1234',
    discountType: 'PERCENT',
    discount: 5,
    status: 'ACTIVE',
    usesLimit: 'SINGLE'
  };
  var options = {
    method: 'post',
    contentType: 'application/json',
    headers: { 'Authorization': 'Bearer secret_nQ6JM4ewfv5QJJXbQyxe41kH5LukVdA2' },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };
  var response = UrlFetchApp.fetch(url, options);
  Logger.log('Status: ' + response.getResponseCode());
  Logger.log('Body: ' + response.getContentText());
}

function testBirthdayEmails() {
  sendBirthdayConfirmationEmail('info@manhattanlikit.com', '1990-03-15');
  sendBirthdayCouponEmail('info@manhattanlikit.com', 'TEST12345678', new Date(Date.now() + 7*24*60*60*1000));
  Logger.log('Test emailleri gonderildi: info@manhattanlikit.com');
}

// ===================== ÇARK ÇEVİR =====================

function handleSpin(email) {
  try {
    if (!email) return jsonResponse({ ok: false, error: 'Email gerekli.' });
    
    email = email.toLowerCase().trim();
    var cfg = _loadSpinConfig();
    
    // Race condition koruması — aynı anda 2 istek gelirse 2. bekler
    var lock = LockService.getScriptLock();
    if (!lock.tryLock(10000)) {
      return jsonResponse({ ok: false, error: 'Sunucu meşgul, tekrar deneyin.' });
    }
    
    try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('SpinWheel');
    if (!sheet) {
      sheet = ss.insertSheet('SpinWheel');
      sheet.getRange(1, 1, 1, 6).setValues([['email', 'cooldown_key', 'segment', 'prize', 'coupon_code', 'created_at']]);
    }
    
    // Dinamik cooldown kontrolü (testMode açıkken atlanır)
    var now = new Date();
    if (cfg.testMode !== true) {
    var cooldownMs = cfg.cooldownHours * 3600000;
    
    var data = sheet.getDataRange().getValues();
    for (var i = data.length - 1; i >= 1; i--) {
      if (String(data[i][0]).toLowerCase().trim() === email) {
        var spunAt = new Date(data[i][5]);
        var elapsed = now.getTime() - spunAt.getTime();
        if (elapsed < cooldownMs) {
          var remainMs = cooldownMs - elapsed;
          var remainH = Math.floor(remainMs / 3600000);
          var remainM = Math.floor((remainMs % 3600000) / 60000);
          return jsonResponse({ 
            ok: false, 
            error: 'already_spun', 
            message: 'Tekrar çevirebilmek için ' + remainH + ' saat ' + remainM + ' dk beklemelisiniz.',
            prize: String(data[i][3]),
            couponCode: String(data[i][4]),
            cooldownHours: cfg.cooldownHours,
            remainMs: remainMs,
            testMode: !!cfg.testMode
          });
        }
        break; // Son kayıt bulundu, daha eskiye bakma
      }
    }
    } // testMode kapalıysa cooldown kontrol sonu
    
    // Ödül seç (ağırlıklı + near-miss) — dinamik config
    var result = _pickSpinPrize(cfg);
    var segment = result.segment;
    var segConfig = cfg.segments[segment];
    var isNearMiss = result.isNearMiss || false;
    
    var couponCode = '';
    var expFormatted = '';
    
    // Kupon oluştur (couponCreationEnabled kapalıysa atlanır)
    if (cfg.couponCreationEnabled !== false && (segConfig.type === 'percent' || segConfig.type === 'shipping' || segConfig.type === 'grand' || segConfig.type === 'absolute')) {
      var code = 'SPIN-' + generateCouponCode().substring(0, 8);
      var expDate = new Date(now.getTime() + cfg.couponValidityDays * 86400000);
      
      var ecwidType = 'PERCENT';
      if (segConfig.type === 'shipping') ecwidType = 'SHIPPING';
      else if (segConfig.type === 'absolute' || segConfig.type === 'grand') ecwidType = 'ABSOLUTE';
      
      var payload = {
        name: 'Çark Çevir - ' + email,
        code: code,
        discountType: ecwidType,
        status: 'ACTIVE',
        discount: segConfig.discount || 0,
        launchDate: formatEcwidDate(now),
        expirationDate: formatEcwidDate(expDate),
        usesLimit: 'SINGLE',
        applicationLimit: 'UNLIMITED'
      };
      
      var createResult = ecwidPost('discount_coupons', payload);
      if (createResult && createResult.id) {
        couponCode = code;
      } else {
        Logger.log('Kupon oluşturulamadı: ' + JSON.stringify(createResult));
        // Kupon başarısız ama çevirme kaydedilsin — kullanıcıya mesaj ver
        couponCode = '';
      }
      
      expFormatted = Utilities.formatDate(expDate, 'Europe/Istanbul', 'dd.MM.yyyy HH:mm');
    }
    
    // Sheet'e kaydet (cooldown_key artık ISO tarih)
    var cooldownKey = Utilities.formatDate(now, 'Europe/Istanbul', 'yyyy-MM-dd HH:mm');
    var prizeLabel = segConfig.label + (segConfig.sub ? ' ' + segConfig.sub : '');
    sheet.appendRow([email, cooldownKey, segment, prizeLabel, couponCode, now.toISOString()]);
    
    return jsonResponse({
      ok: true,
      segment: segment,
      angleOffset: result.angleOffset,
      prize: prizeLabel,
      couponCode: couponCode,
      type: segConfig.type,
      discount: segConfig.discount,
      expiry: expFormatted,
      cooldownHours: cfg.cooldownHours,
      isNearMiss: isNearMiss,
      couponError: (segConfig.type !== 'none') && !couponCode,
      testMode: !!cfg.testMode
    });
    } finally {
      lock.releaseLock();
    }
  } catch (err) {
    Logger.log('handleSpin error: ' + err.toString());
    return jsonResponse({ ok: false, error: 'Çark hatası: ' + err.message });
  }
}

function _pickSpinPrize(cfg) {
  var segments = cfg.segments;
  var nearMissChance = cfg.nearMissChance || 0.4;
  var nearMissSegs = cfg.nearMissSegments || [0, 2];
  
  // Near-miss — buyuk odulun yanindaki dilimlere dusur
  if (nearMissSegs.length > 0 && Math.random() < nearMissChance) {
    var seg = nearMissSegs[Math.floor(Math.random() * nearMissSegs.length)];
    if (seg >= 0 && seg < segments.length && segments[seg].active !== false) {
      var offset;
      if (seg === 0) {
        offset = Math.random() * 8 + 14;
      } else {
        offset = -(Math.random() * 8 + 14);
      }
      return { segment: seg, angleOffset: offset, isNearMiss: true };
    }
  }
  
  // Normal agirlikli rastgele (active=false veya weight=0 cikmaz)
  var totalWeight = 0;
  for (var i = 0; i < segments.length; i++) {
    if (segments[i].active !== false) totalWeight += (segments[i].weight || 0);
  }
  
  var rand = Math.random() * totalWeight;
  var cumulative = 0;
  for (var i = 0; i < segments.length; i++) {
    if (segments[i].active === false) continue;
    cumulative += (segments[i].weight || 0);
    if (rand <= cumulative) {
      var offset = (Math.random() - 0.5) * 20;
      return { segment: i, angleOffset: offset };
    }
  }
  
  return { segment: 0, angleOffset: 0 };
}

// ===================== MENU =====================

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Sadakat')
    .addItem('1. Gruplari Baslat', 'initializeGroups')
    .addItem('2. Test (Dry Run)', 'dryRun')
    .addSeparator()
    .addItem('Batch Sifirla', 'resetBatch')
    .addItem('Durum Guncelle', 'updateStatus')
    .addItem('Guncelle (Batch)', 'fullLoyaltyUpdate')
    .addItem('Log Renklendir', 'colorizeExistingLog')
    .addItem('Otomatik Batch Baslat', 'startAutoBatch')
    .addItem('Tam Rapor', 'fullReport')
    .addSeparator()
    .addItem('Trigger: Dogum Gunu', 'setupBirthdayTrigger')
    .addItem('Trigger: Referral', 'setupReferralTrigger')
    .addItem('Trigger: Saatlik Tier Sync', 'setupDailyTrigger')
    .addSeparator()
    .addItem('Test: Dogum Gunu Email', 'testBirthdayEmails')
    .addItem('Test: Kupon Olustur', 'testCreateCoupon')
    .addItem('Test: Referral Email', 'testReferralSystem')
    .addItem('Test: Seviye Email', 'testTierUpgradeEmail')
    .addToUi();
}

// ===================== SPIN ADMIN — DİNAMİK KONFİGÜRASYON =====================

var _SPIN_DEFAULT_CONFIG = {
  segments: [
    { id: 0, label: '%3', sub: 'İNDİRİM', type: 'percent', discount: 3, weight: 25, active: true },
    { id: 1, label: 'HEDİYE', sub: 'Manhattan', type: 'grand', discount: 0, weight: 0, active: true },
    { id: 2, label: '%2', sub: 'İNDİRİM', type: 'percent', discount: 2, weight: 25, active: true },
    { id: 3, label: 'KARGO', sub: 'ÜCRETSİZ', type: 'shipping', discount: 0, weight: 15, active: true },
    { id: 4, label: '%5', sub: 'İNDİRİM', type: 'percent', discount: 5, weight: 15, active: true },
    { id: 5, label: 'TEKRAR', sub: 'DENE', type: 'none', discount: 0, weight: 10, active: true },
    { id: 6, label: '%10', sub: 'İNDİRİM', type: 'percent', discount: 10, weight: 1, active: true },
    { id: 7, label: '%3', sub: 'İNDİRİM', type: 'percent', discount: 3, weight: 5, active: true }
  ],
  fontScale: 1.0,
  fontFamily: 'Plus Jakarta Sans',
  labelGap: 6,
  nearMissChance: 0.40,
  nearMissSegments: [0, 2],
  cooldownHours: 0.5,
  couponValidityDays: 7
};

/**
 * Spin config'i PropertiesService'ten oku (fallback: default)
 */
function _loadSpinConfig() {
  try {
    var raw = PropertiesService.getScriptProperties().getProperty('SPIN_CONFIG');
    if (raw) {
      var cfg = JSON.parse(raw);
      // Eksik alanları default'tan tamamla
      if (!cfg.segments) cfg.segments = _SPIN_DEFAULT_CONFIG.segments;
      if (cfg.nearMissChance === undefined) cfg.nearMissChance = _SPIN_DEFAULT_CONFIG.nearMissChance;
      if (!cfg.nearMissSegments) cfg.nearMissSegments = _SPIN_DEFAULT_CONFIG.nearMissSegments;
      if (!cfg.cooldownHours) cfg.cooldownHours = _SPIN_DEFAULT_CONFIG.cooldownHours;
      if (!cfg.couponValidityDays) cfg.couponValidityDays = _SPIN_DEFAULT_CONFIG.couponValidityDays;
      if (cfg.fontScale === undefined) cfg.fontScale = _SPIN_DEFAULT_CONFIG.fontScale || 1.0;
      if (!cfg.fontFamily) cfg.fontFamily = _SPIN_DEFAULT_CONFIG.fontFamily;
      if (cfg.labelGap === undefined) cfg.labelGap = _SPIN_DEFAULT_CONFIG.labelGap;
      // Migration v5: grand/absolute kupon + fontScale reset kaldırıldı
      if (!cfg.configVersion || cfg.configVersion < 5) {
        cfg.configVersion = 5;
        cfg.cooldownHours = cfg.cooldownHours || _SPIN_DEFAULT_CONFIG.cooldownHours;
        cfg.fontFamily = cfg.fontFamily || _SPIN_DEFAULT_CONFIG.fontFamily;
        cfg.labelGap = (cfg.labelGap !== undefined) ? cfg.labelGap : _SPIN_DEFAULT_CONFIG.labelGap;
        for (var si = 0; si < cfg.segments.length; si++) {
          var seg = cfg.segments[si];
          if (!seg.sub && _SPIN_DEFAULT_CONFIG.segments[si]) {
            seg.sub = _SPIN_DEFAULT_CONFIG.segments[si].sub || '';
            seg.label = _SPIN_DEFAULT_CONFIG.segments[si].label || seg.label;
          }
        }
        _saveSpinConfigToProps(cfg);
      }
      return cfg;
    }
  } catch(e) { Logger.log('_loadSpinConfig error: ' + e); }
  var fresh = JSON.parse(JSON.stringify(_SPIN_DEFAULT_CONFIG));
  fresh.configVersion = 5;
  return fresh;
}

/**
 * Spin config kaydet
 */
function _saveSpinConfigToProps(cfg) {
  PropertiesService.getScriptProperties().setProperty('SPIN_CONFIG', JSON.stringify(cfg));
}

/**
 * Endpoint: Config getir
 */
function _spinGetConfig() {
  return jsonResponse({ ok: true, config: _loadSpinConfig() });
}

/**
 * Endpoint: Config kaydet
 */
function _spinSaveConfig(config) {
  if (!config) return jsonResponse({ ok: false, error: 'Config boş.' });
  try {
    // Validasyon
    if (!config.segments || !Array.isArray(config.segments)) {
      return jsonResponse({ ok: false, error: 'Segments dizisi gerekli.' });
    }
    if (config.segments.length < 2 || config.segments.length > 12) {
      return jsonResponse({ ok: false, error: 'Segment sayısı 2-12 arası olmalı.' });
    }
    for (var i = 0; i < config.segments.length; i++) {
      var seg = config.segments[i];
      if (seg.weight === undefined || seg.weight < 0 || seg.weight > 100) {
        return jsonResponse({ ok: false, error: 'Segment ' + i + ' weight 0-100 arası olmalı.' });
      }
      if (!seg.label) return jsonResponse({ ok: false, error: 'Segment ' + i + ' label boş.' });
      if (!seg.type) return jsonResponse({ ok: false, error: 'Segment ' + i + ' type boş.' });
      seg.id = i; // id'leri sırala
    }
    // En az 1 aktif+weight>0 segment olmalı
    var hasActive = false;
    for (var i = 0; i < config.segments.length; i++) {
      if (config.segments[i].active !== false && config.segments[i].weight > 0) { hasActive = true; break; }
    }
    if (!hasActive) return jsonResponse({ ok: false, error: 'En az 1 aktif segment olmalı.' });
    
    // Sayısal değerleri zorla
    config.nearMissChance = Math.max(0, Math.min(1, parseFloat(config.nearMissChance) || 0.4));
    config.cooldownHours = Math.max(0.25, Math.min(336, parseFloat(config.cooldownHours) || 0.5));
    config.couponValidityDays = Math.max(1, Math.min(90, parseInt(config.couponValidityDays) || 7));
    if (!Array.isArray(config.nearMissSegments)) config.nearMissSegments = [0, 2];
    config.configVersion = 5;
    config.fontFamily = config.fontFamily || _SPIN_DEFAULT_CONFIG.fontFamily;
    config.labelGap = Math.max(0, Math.min(30, parseInt(config.labelGap) || _SPIN_DEFAULT_CONFIG.labelGap));
    
    _saveSpinConfigToProps(config);
    return jsonResponse({ ok: true, message: 'Config kaydedildi.' });
  } catch(e) {
    Logger.log('_spinSaveConfig error: ' + e);
    return jsonResponse({ ok: false, error: 'Kayıt hatası: ' + e.message });
  }
}

/**
 * Endpoint: İstatistikler
 */
function _spinGetStats() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('SpinWheel');
    if (!sheet) return jsonResponse({ ok: true, stats: { total: 0, last7: 0, bySegment: {}, recent: [] } });
    
    var data = sheet.getDataRange().getValues();
    var now = new Date();
    var sevenDaysAgo = new Date(now.getTime() - 7 * 86400000);
    var thirtyDaysAgo = new Date(now.getTime() - 30 * 86400000);
    
    var total = 0, last7 = 0, last30 = 0;
    var bySegment = {};
    var bySegment7 = {};
    var recent = [];
    
    for (var i = 1; i < data.length; i++) {
      total++;
      var createdAt = new Date(data[i][5]);
      var prize = String(data[i][3] || '');
      var coupon = String(data[i][4] || '');
      
      if (!bySegment[prize]) bySegment[prize] = 0;
      bySegment[prize]++;
      
      if (createdAt >= sevenDaysAgo) {
        last7++;
        if (!bySegment7[prize]) bySegment7[prize] = 0;
        bySegment7[prize]++;
      }
      if (createdAt >= thirtyDaysAgo) last30++;
      
      // Son 20 çevirme
      if (i >= data.length - 20) {
        recent.push({
          email: String(data[i][0] || '').replace(/(.{3}).*(@.*)/, '$1***$2'),
          prize: prize,
          coupon: coupon ? coupon.substring(0, 4) + '****' : '',
          date: Utilities.formatDate(createdAt, 'Europe/Istanbul', 'dd.MM HH:mm')
        });
      }
    }
    
    return jsonResponse({ 
      ok: true, 
      stats: { 
        total: total, 
        last7: last7, 
        last30: last30,
        bySegment: bySegment,
        bySegment7: bySegment7,
        recent: recent.reverse()
      } 
    });
  } catch(e) {
    Logger.log('_spinGetStats error: ' + e);
    return jsonResponse({ ok: false, error: 'İstatistik hatası: ' + e.message });
  }
}
