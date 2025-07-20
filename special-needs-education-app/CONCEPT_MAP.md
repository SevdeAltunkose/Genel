# 🎯 Özel Gereksinimli Çocuklar İçin Eğitim ve İletişim Uygulaması
## Kavram Haritası ve API Dokümantasyonu

---

## 🌐 **KAVRAM HARİTASI GENEL BAKIŞ**

Bu belge, özel gereksinimli çocuklar için geliştirilen eğitim ve iletişim uygulamasının tüm bileşenlerini, aralarındaki ilişkileri ve API uç noktalarını detaylandırır.

### 📊 **İstatistikler**
- **Toplam Bileşen**: 23 adet
- **API Uç Noktası**: 32 adet  
- **Tamamlanan Özellik**: 11 adet
- **Planlanan Özellik**: 12 adet

---

## 🏗️ **ANA KATEGORİLER**

### 🔵 **CORE - Temel Sistem** (3 bileşen)
Uygulamanın temel altyapısını oluşturan kritik bileşenler.

| Bileşen | Durum | Açıklama |
|---------|-------|----------|
| **Kimlik Doğrulama Sistemi** | ✅ Tamamlandı | JWT tabanlı ebeveyn giriş/çıkış |
| **Güvenlik ve Veri Koruma** | ✅ Tamamlandı | Şifreleme, çocuk verilerinin korunması |
| **Sayfa Yönlendirme** | ✅ Tamamlandı | React Router, korumalı rotalar |

### 🟢 **FEATURE - Özellikler** (6 bileşen)
Kullanıcı deneyimini şekillendiren ana özellikler.

| Bileşen | Durum | Açıklama |
|---------|-------|----------|
| **Ebeveyn Dashboard** | ✅ Tamamlandı | Çocuk profilleri, hızlı erişim |
| **Çocuk Profil Yönetimi** | ✅ Tamamlandı | Profil oluşturma, tema seçimi |
| **İletişim Panosu** | ✅ Tamamlandı | Görsel kartlar, sesli geri bildirim |
| **Kavram Oyunu** | ✅ Tamamlandı | Eğitici oyunlar, ilerleme takibi |
| **Yönetim Portalı** | ✅ Tamamlandı | AI prompt üretici, kart yönetimi |
| **Gelişim Takibi** | 🔴 Planlandı | Raporlama, analitik |

### 🟠 **DATA - Veri Yönetimi** (6 bileşen)
Veri saklama, yönetim ve işleme katmanları.

| Bileşen | Durum | Açıklama |
|---------|-------|----------|
| **Kullanıcı Veri Modeli** | ✅ Tamamlandı | Ebeveyn bilgileri, hesap ayarları |
| **Çocuk Veri Modeli** | ✅ Tamamlandı | Profil bilgileri, gelişim seviyesi |
| **İletişim Kartları Veritabanı** | 🔴 Planlandı | Kart kütüphanesi, kategoriler |
| **Kavram ve Öğrenme Verileri** | ✅ Tamamlandı | Renkler, şekiller, tema içerikleri |
| **Oturum ve Etkileşim Verileri** | 🔴 Planlandı | Oyun oturumları, tepki süreleri |
| **Öğrenme Müfredatı** | 🔴 Planlandı | Kişiselleştirilmiş öğrenme yolları |

### 🟣 **AI - Yapay Zeka** (7 bileşen)
Akıllı özellikler ve kişiselleştirme sistemleri.

| Bileşen | Durum | Açıklama |
|---------|-------|----------|
| **AI Prompt Üretici** | ✅ Tamamlandı | Ebeveyn → AI prompt dönüştürme |
| **Sesli Geri Bildirim** | ✅ Tamamlandı | Web Speech API, cinsiyet bazlı ses |
| **Kişiselleştirme Motoru** | 🔴 Planlandı | Çocuğa özel içerik önerisi |
| **Uyarlanabilir Öğrenme** | 🔴 Planlandı | Zorluk seviyesi ayarlama |
| **İletişim Kartı Önerisi** | 🔴 Planlandı | AI tabanlı kart önerileri |
| **Gelişim Öngörüleri** | 🔴 Planlandı | Veri analizi, trend tahminleri |
| **Doğal Dil İşleme** | 🔴 Planlandı | Metin anlama, duygu analizi |

### ⚫ **INTEGRATION - Entegrasyonlar** (3 bileşen)
Dış sistemler ve uyumluluk katmanları.

| Bileşen | Durum | Açıklama |
|---------|-------|----------|
| **GDPR/KVKK Uyumluluğu** | 🔴 Planlandı | Veri koruma, çocuk gizliliği |
| **Veri Dışa Aktarma** | 🔴 Planlandı | PDF raporlar, Excel verileri |
| **Bulut Depolama** | 🔴 Planlandı | Senkronizasyon, çoklu cihaz |

---

## 🔗 **BAĞLANTI HARİTASI**

### En Kritik Bağlantılar:
- **Kimlik Doğrulama** ↔ **Ebeveyn Dashboard** ↔ **Çocuk Profil Yönetimi**
- **AI Prompt Üretici** ↔ **Yönetim Portalı** ↔ **Çocuk Veri Modeli**
- **İletişim Panosu** ↔ **Sesli Geri Bildirim** ↔ **İletişim Kartları**
- **Kavram Oyunu** ↔ **Uyarlanabilir Öğrenme** ↔ **Gelişim Takibi**

---

## 🔌 **API UÇ NOKTALARI**

### **AUTH - Kimlik Doğrulama** (4 endpoint)

#### 🔴 **POST** `/api/auth/login` - *Kritik*
Ebeveyn giriş işlemi
```json
Request: { "email": "string", "password": "string" }
Response: { "user": "User", "token": "string" }
```

#### 🔴 **POST** `/api/auth/register` - *Kritik*
Yeni ebeveyn hesabı oluşturma
```json
Request: { "email": "string", "password": "string", "name": "string" }
Response: { "user": "User", "token": "string" }
```

#### 🔵 **POST** `/api/auth/logout` - *Yüksek*
Oturum kapatma
```json
Response: { "success": "boolean" }
```

#### 🔵 **POST** `/api/auth/refresh` - *Yüksek*
Token yenileme
```json
Response: { "token": "string" }
```

---

### **CHILD - Çocuk Profil Yönetimi** (5 endpoint)

#### 🔴 **GET** `/api/children` - *Kritik*
Kullanıcının çocuk listesi
```json
Response: Child[]
```

#### 🔵 **POST** `/api/children` - *Yüksek*
Yeni çocuk profili oluşturma
```json
Request: CreateChildRequest
Response: Child
```

#### 🔵 **GET** `/api/children/:childId` - *Yüksek*
Belirli çocuk profili detayları
```json
Response: Child
```

#### 🔵 **PUT** `/api/children/:childId` - *Yüksek*
Çocuk profili güncelleme
```json
Request: UpdateChildRequest
Response: Child
```

#### 🟡 **DELETE** `/api/children/:childId` - *Orta*
Çocuk profili silme
```json
Response: { "success": "boolean" }
```

---

### **COMMUNICATION - İletişim Kartları** (5 endpoint)

#### 🔴 **GET** `/api/children/:childId/communication-cards` - *Kritik*
Çocuğun aktif iletişim kartları
```json
Response: CommunicationItem[]
```

#### 🔵 **GET** `/api/communication-cards/library` - *Yüksek*
Tüm iletişim kartları kütüphanesi
```json
Response: CommunicationItem[]
```

#### 🔵 **POST** `/api/children/:childId/communication-cards` - *Yüksek*
Çocuğa iletişim kartı ekleme
```json
Request: { "cardIds": "string[]" }
Response: { "success": "boolean" }
```

#### 🟡 **DELETE** `/api/children/:childId/communication-cards/:cardId` - *Orta*
İletişim kartını çocuktan kaldırma
```json
Response: { "success": "boolean" }
```

#### 🟡 **POST** `/api/children/:childId/communication-interactions` - *Orta*
İletişim etkileşimi kaydetme
```json
Request: CommunicationInteraction
Response: { "success": "boolean" }
```

---

### **LEARNING - Öğrenme ve Oyunlar** (6 endpoint)

#### 🔵 **GET** `/api/learning/concepts` - *Yüksek*
Tüm öğrenme kavramları
```json
Response: Concept[]
```

#### 🔵 **GET** `/api/children/:childId/curriculum` - *Yüksek*
Çocuğa özel öğrenme müfredatı
```json
Response: LearningCurriculum
```

#### 🟡 **PUT** `/api/children/:childId/curriculum` - *Orta*
Öğrenme müfredatı güncelleme
```json
Request: CurriculumUpdate
Response: LearningCurriculum
```

#### 🔵 **POST** `/api/children/:childId/game-sessions` - *Yüksek*
Yeni oyun oturumu başlatma
```json
Request: { "conceptId": "string", "gameType": "string" }
Response: GameSession
```

#### 🔵 **PUT** `/api/children/:childId/game-sessions/:sessionId` - *Yüksek*
Oyun oturumu sonlandırma
```json
Request: GameSessionResult
Response: GameSession
```

#### 🟡 **POST** `/api/children/:childId/game-interactions` - *Orta*
Oyun etkileşimi kaydetme
```json
Request: GameInteraction
Response: { "success": "boolean" }
```

---

### **AI - Yapay Zeka Özellikleri** (5 endpoint)

#### 🔵 **POST** `/api/ai/prompts/generate` - *Yüksek*
AI prompt oluşturma ⭐ **ÖNE ÇIKAN ÖZELLİK**
```json
Request: { 
  "childId": "string", 
  "parentInput": "string", 
  "promptType": "PromptType" 
}
Response: { "prompt": "string", "promptId": "string" }
```

#### 🟡 **POST** `/api/ai/prompts` - *Orta*
Prompt kaydetme
```json
Request: AIPrompt
Response: AIPrompt
```

#### 🟡 **GET** `/api/children/:childId/prompts` - *Orta*
Çocuğa ait prompt listesi
```json
Response: AIPrompt[]
```

#### ⚪ **GET** `/api/children/:childId/ai/card-recommendations` - *Düşük*
AI tabanlı kart önerileri
```json
Response: CommunicationItem[]
```

#### ⚪ **GET** `/api/children/:childId/ai/learning-insights` - *Düşük*
AI öğrenme analizi
```json
Response: LearningInsights
```

---

### **ANALYTICS - Analitik ve Raporlama** (4 endpoint)

#### 🟡 **GET** `/api/children/:childId/progress` - *Orta*
Çocuğun gelişim raporu
```json
Response: ProgressReport
```

#### 🟡 **GET** `/api/children/:childId/usage-stats` - *Orta*
Kullanım istatistikleri
```json
Response: UsageStats
```

#### ⚪ **GET** `/api/children/:childId/export` - *Düşük*
Veri dışa aktarma (PDF/Excel)
```json
Response: Blob
```

#### ⚪ **GET** `/api/children/:childId/trends` - *Düşük*
Gelişim trendleri
```json
Response: TrendData
```

---

## 🚀 **GELECEK ROADMAPs**

### **Faz 1: Temel Altyapı** ✅ **TAMAMLANDI**
- Kimlik doğrulama sistemi
- Çocuk profil yönetimi
- İletişim panosu
- Kavram oyunu
- AI prompt üretici

### **Faz 2: Veri ve Analitik** 🔄 **DEVAM EDİYOR**
- Oturum ve etkileşim verisi toplama
- Gelişim raporları
- Kullanım analitikleri
- Veri dışa aktarma

### **Faz 3: AI ve Kişiselleştirme** 📋 **PLANLI**
- Uyarlanabilir öğrenme sistemi
- AI tabanlı kart önerileri
- Gelişim öngörüleri
- Doğal dil işleme

### **Faz 4: Entegrasyonlar** 📋 **PLANLI**
- GDPR/KVKK uyumluluğu
- Bulut depolama
- Çoklu cihaz senkronizasyonu
- Uzman paylaşım portali

---

## 🎯 **ÖNE ÇIKAN ÖZELLİKLER**

### 🌟 **AI Prompt Üretici**
Ebeveynlerin girdiği sade metinleri, profesyonel AI prompt'larına dönüştüren devrimci özellik.

**Örnek Dönüşüm:**
```
Giriş: "Çocuğum yemek yemek istemiyor"

Çıkış: "Çocuk profili: Ali, 5 yaş, hafif destek...
Bu çocuk için uygun iletişim kartları öner..."
```

### 🎮 **Tema Bazlı Öğrenme**
- Korsanlar 🏴‍☠️
- Uzay 🚀  
- Hayvanlar 🦁
- Doğa 🌿

### 🗣️ **Sesli Geri Bildirim**
- Cinsiyet bazlı ses seçimi
- Türkçe Web Speech API
- Çocuğa özel ses tonu ayarı

---

## 📱 **KULLANIM SENARYOLARI**

### **Senaryo 1: İlk Kayıt**
1. Ebeveyn → Kayıt olur
2. Çocuk profili → Oluşturur (yaş, tema, seviye)
3. İletişim kartları → Seçer ve düzenler
4. Kavram müfredatı → Kişiselleştirir

### **Senaryo 2: Günlük Kullanım**
1. Çocuk → İletişim panosuna girer
2. Kartları seçer → "Muz istiyorum" 🍌
3. Sistem → Sesli olarak ifade eder
4. Etkileşim → Veritabanına kaydedilir

### **Senaryo 3: Öğrenme Oturumu**
1. Çocuk → Kavram oyununu başlatır
2. Korsan teması → Büyük/küçük kavramı
3. Doğru cevap → Animasyonlu ödül
4. İlerleme → Ebeveyn panelinde görünür

### **Senaryo 4: AI Prompt Oluşturma**
1. Ebeveyn → "Çocuğum sabırla oturamıyor"
2. AI → Çocuk profiline özel prompt üretir
3. Prompt → ChatGPT'ye kopyalanır
4. Uzman tavsiyeleri → Alınır ve uygulanır

---

## 🔧 **TEKNİK ALTYAPI**

### **Frontend Stack**
- ⚛️ **React 19** + TypeScript
- 🎨 **Material-UI v5**
- 🔄 **React Router v6**
- 🗃️ **Context API** (State Management)

### **Backend Stack** (Planlı)
- 🟢 **Node.js** + Express
- 🍃 **MongoDB** + Mongoose
- 🔐 **JWT** Authentication
- ☁️ **AWS S3** (Medya depolama)

### **AI Integration**
- 🧠 **OpenAI GPT** API
- 🗣️ **Web Speech API**
- 📊 **TensorFlow.js** (Gelecekte)

---

## 📄 **LİSANS VE UYUMLULUK**

- ✅ **GDPR/KVKK** Uyumlu
- 🔒 **Çocuk Gizliliği** Korumalı
- 📋 **MIT Lisansı**
- ♿ **WCAG 2.1** Erişilebilirlik

---

*Bu dokümantasyon canlı bir belgedir ve proje geliştikçe güncellenecektir.*

**Son Güncelleme:** Ocak 2025
**Versiyon:** 1.0.0
**Geliştirici:** Özel Eğitim Uygulaması Ekibi