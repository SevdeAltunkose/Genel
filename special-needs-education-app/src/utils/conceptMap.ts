// Kavram Haritası ve API Uç Noktaları
// Özel Gereksinimli Çocuklar İçin Eğitim ve İletişim Uygulaması

export interface ConceptMapNode {
  id: string;
  name: string;
  description: string;
  category: 'core' | 'feature' | 'data' | 'ai' | 'integration';
  connections: string[];
  priority: 'high' | 'medium' | 'low';
  status: 'implemented' | 'in-progress' | 'planned';
}

export interface APIEndpoint {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
  category: 'auth' | 'user' | 'child' | 'communication' | 'learning' | 'ai' | 'analytics';
  requestBody?: any;
  responseType: any;
  authRequired: boolean;
  priority: 'critical' | 'high' | 'medium' | 'low';
}

// ==============================================
// KAVRAM HARİTASI - ANA YAPITAŞLARI
// ==============================================

export const CONCEPT_MAP: ConceptMapNode[] = [
  // CORE - Temel Sistem Bileşenleri
  {
    id: 'core-auth',
    name: 'Kimlik Doğrulama Sistemi',
    description: 'Ebeveyn giriş/çıkış, güvenlik, oturum yönetimi',
    category: 'core',
    connections: ['feature-dashboard', 'data-user', 'core-security'],
    priority: 'high',
    status: 'implemented'
  },
  {
    id: 'core-security',
    name: 'Güvenlik ve Veri Koruma',
    description: 'JWT tokenlar, şifreleme, çocuk verilerinin korunması',
    category: 'core',
    connections: ['core-auth', 'data-child', 'integration-gdpr'],
    priority: 'high',
    status: 'implemented'
  },
  {
    id: 'core-routing',
    name: 'Sayfa Yönlendirme',
    description: 'React Router, korumalı rotalar, navigasyon',
    category: 'core',
    connections: ['feature-dashboard', 'feature-communication', 'feature-game'],
    priority: 'high',
    status: 'implemented'
  },

  // FEATURE - Ana Özellikler
  {
    id: 'feature-dashboard',
    name: 'Ebeveyn Dashboard',
    description: 'Çocuk profilleri görüntüleme, hızlı erişim',
    category: 'feature',
    connections: ['core-auth', 'data-child', 'feature-profile-management'],
    priority: 'high',
    status: 'implemented'
  },
  {
    id: 'feature-profile-management',
    name: 'Çocuk Profil Yönetimi',
    description: 'Profil oluşturma, düzenleme, tema seçimi',
    category: 'feature',
    connections: ['feature-dashboard', 'data-child', 'ai-personalization'],
    priority: 'high',
    status: 'implemented'
  },
  {
    id: 'feature-communication',
    name: 'İletişim Panosu',
    description: 'Görsel kartlar, sesli geri bildirim, ifade oluşturma',
    category: 'feature',
    connections: ['data-communication', 'ai-voice', 'feature-analytics'],
    priority: 'high',
    status: 'implemented'
  },
  {
    id: 'feature-game',
    name: 'Kavram Oyunu',
    description: 'Eğitici oyunlar, kavram öğretimi, ilerleme takibi',
    category: 'feature',
    connections: ['data-concepts', 'ai-adaptive-learning', 'feature-analytics'],
    priority: 'high',
    status: 'implemented'
  },
  {
    id: 'feature-management',
    name: 'Yönetim Portalı',
    description: 'AI prompt üretici, iletişim kartı yönetimi, müfredat',
    category: 'feature',
    connections: ['ai-prompt-generator', 'data-curriculum', 'feature-analytics'],
    priority: 'high',
    status: 'implemented'
  },
  {
    id: 'feature-analytics',
    name: 'Gelişim Takibi ve Raporlama',
    description: 'Kullanım verileri, ilerleme raporları, analitik',
    category: 'feature',
    connections: ['data-sessions', 'ai-insights', 'feature-export'],
    priority: 'medium',
    status: 'planned'
  },

  // DATA - Veri Yönetimi
  {
    id: 'data-user',
    name: 'Kullanıcı Veri Modeli',
    description: 'Ebeveyn bilgileri, hesap ayarları',
    category: 'data',
    connections: ['core-auth', 'data-child'],
    priority: 'high',
    status: 'implemented'
  },
  {
    id: 'data-child',
    name: 'Çocuk Veri Modeli',
    description: 'Profil bilgileri, gelişim seviyesi, tercihler',
    category: 'data',
    connections: ['data-user', 'data-communication', 'data-concepts'],
    priority: 'high',
    status: 'implemented'
  },
  {
    id: 'data-communication',
    name: 'İletişim Kartları Veritabanı',
    description: 'Kart kütüphanesi, kategoriler, kişiselleştirme',
    category: 'data',
    connections: ['feature-communication', 'ai-card-recommendation'],
    priority: 'high',
    status: 'planned'
  },
  {
    id: 'data-concepts',
    name: 'Kavram ve Öğrenme Verileri',
    description: 'Renkler, şekiller, sayılar, tema bazlı içerikler',
    category: 'data',
    connections: ['feature-game', 'data-curriculum', 'ai-adaptive-learning'],
    priority: 'high',
    status: 'implemented'
  },
  {
    id: 'data-sessions',
    name: 'Oturum ve Etkileşim Verileri',
    description: 'Oyun oturumları, tepki süreleri, başarı oranları',
    category: 'data',
    connections: ['feature-game', 'feature-communication', 'ai-insights'],
    priority: 'medium',
    status: 'planned'
  },
  {
    id: 'data-curriculum',
    name: 'Öğrenme Müfredatı',
    description: 'Kişiselleştirilmiş öğrenme yolları, BEP',
    category: 'data',
    connections: ['feature-management', 'ai-curriculum-builder'],
    priority: 'medium',
    status: 'planned'
  },

  // AI - Yapay Zeka Özellikleri
  {
    id: 'ai-prompt-generator',
    name: 'AI Prompt Üretici',
    description: 'Ebeveyn girdilerini profesyonel prompt\'lara dönüştürme',
    category: 'ai',
    connections: ['feature-management', 'ai-nlp', 'data-child'],
    priority: 'high',
    status: 'implemented'
  },
  {
    id: 'ai-voice',
    name: 'Sesli Geri Bildirim Sistemi',
    description: 'Web Speech API, cinsiyet bazlı ses ayarları',
    category: 'ai',
    connections: ['feature-communication', 'feature-game', 'data-child'],
    priority: 'high',
    status: 'implemented'
  },
  {
    id: 'ai-personalization',
    name: 'Kişiselleştirme Motoru',
    description: 'Çocuğa özel içerik önerisi, tema uyarlama',
    category: 'ai',
    connections: ['data-child', 'ai-card-recommendation', 'ai-adaptive-learning'],
    priority: 'medium',
    status: 'planned'
  },
  {
    id: 'ai-adaptive-learning',
    name: 'Uyarlanabilir Öğrenme',
    description: 'Zorluk seviyesi ayarlama, öğrenme hızı analizi',
    category: 'ai',
    connections: ['feature-game', 'data-sessions', 'ai-insights'],
    priority: 'medium',
    status: 'planned'
  },
  {
    id: 'ai-card-recommendation',
    name: 'İletişim Kartı Önerisi',
    description: 'Kullanım verilerine dayalı kart önerileri',
    category: 'ai',
    connections: ['data-communication', 'data-sessions', 'ai-personalization'],
    priority: 'medium',
    status: 'planned'
  },
  {
    id: 'ai-insights',
    name: 'Gelişim Öngörüleri',
    description: 'Veri analizi, gelişim trendleri, öneri sistemi',
    category: 'ai',
    connections: ['data-sessions', 'feature-analytics', 'ai-nlp'],
    priority: 'low',
    status: 'planned'
  },
  {
    id: 'ai-nlp',
    name: 'Doğal Dil İşleme',
    description: 'Ebeveyn girdilerini anlama, çeviri, duygu analizi',
    category: 'ai',
    connections: ['ai-prompt-generator', 'ai-insights'],
    priority: 'medium',
    status: 'planned'
  },

  // INTEGRATION - Entegrasyonlar
  {
    id: 'integration-gdpr',
    name: 'GDPR/KVKK Uyumluluğu',
    description: 'Veri koruma, çocuk gizliliği, izin yönetimi',
    category: 'integration',
    connections: ['core-security', 'data-child'],
    priority: 'high',
    status: 'planned'
  },
  {
    id: 'integration-export',
    name: 'Veri Dışa Aktarma',
    description: 'PDF raporlar, Excel verileri, uzman paylaşımı',
    category: 'integration',
    connections: ['feature-analytics', 'feature-export'],
    priority: 'medium',
    status: 'planned'
  },
  {
    id: 'integration-cloud',
    name: 'Bulut Depolama',
    description: 'Veri senkronizasyonu, yedekleme, çoklu cihaz',
    category: 'integration',
    connections: ['data-sessions', 'core-security'],
    priority: 'medium',
    status: 'planned'
  }
];

// ==============================================
// API UÇ NOKTALARI (ENDPOINTS)
// ==============================================

export const API_ENDPOINTS: APIEndpoint[] = [
  // AUTH - Kimlik Doğrulama
  {
    id: 'auth-login',
    method: 'POST',
    path: '/api/auth/login',
    description: 'Ebeveyn giriş işlemi',
    category: 'auth',
    requestBody: { email: 'string', password: 'string' },
    responseType: { user: 'User', token: 'string' },
    authRequired: false,
    priority: 'critical'
  },
  {
    id: 'auth-register',
    method: 'POST',
    path: '/api/auth/register',
    description: 'Yeni ebeveyn hesabı oluşturma',
    category: 'auth',
    requestBody: { email: 'string', password: 'string', name: 'string' },
    responseType: { user: 'User', token: 'string' },
    authRequired: false,
    priority: 'critical'
  },
  {
    id: 'auth-logout',
    method: 'POST',
    path: '/api/auth/logout',
    description: 'Oturum kapatma',
    category: 'auth',
    responseType: { success: 'boolean' },
    authRequired: true,
    priority: 'high'
  },
  {
    id: 'auth-refresh',
    method: 'POST',
    path: '/api/auth/refresh',
    description: 'Token yenileme',
    category: 'auth',
    responseType: { token: 'string' },
    authRequired: true,
    priority: 'high'
  },

  // USER - Kullanıcı Yönetimi
  {
    id: 'user-profile',
    method: 'GET',
    path: '/api/user/profile',
    description: 'Kullanıcı profil bilgileri',
    category: 'user',
    responseType: 'User',
    authRequired: true,
    priority: 'high'
  },
  {
    id: 'user-update',
    method: 'PUT',
    path: '/api/user/profile',
    description: 'Kullanıcı profil güncelleme',
    category: 'user',
    requestBody: { name: 'string?', email: 'string?' },
    responseType: 'User',
    authRequired: true,
    priority: 'medium'
  },
  {
    id: 'user-delete',
    method: 'DELETE',
    path: '/api/user/profile',
    description: 'Kullanıcı hesabı silme',
    category: 'user',
    responseType: { success: 'boolean' },
    authRequired: true,
    priority: 'low'
  },

  // CHILD - Çocuk Profil Yönetimi
  {
    id: 'child-list',
    method: 'GET',
    path: '/api/children',
    description: 'Kullanıcının çocuk listesi',
    category: 'child',
    responseType: 'Child[]',
    authRequired: true,
    priority: 'critical'
  },
  {
    id: 'child-create',
    method: 'POST',
    path: '/api/children',
    description: 'Yeni çocuk profili oluşturma',
    category: 'child',
    requestBody: 'CreateChildRequest',
    responseType: 'Child',
    authRequired: true,
    priority: 'high'
  },
  {
    id: 'child-get',
    method: 'GET',
    path: '/api/children/:childId',
    description: 'Belirli çocuk profili detayları',
    category: 'child',
    responseType: 'Child',
    authRequired: true,
    priority: 'high'
  },
  {
    id: 'child-update',
    method: 'PUT',
    path: '/api/children/:childId',
    description: 'Çocuk profili güncelleme',
    category: 'child',
    requestBody: 'UpdateChildRequest',
    responseType: 'Child',
    authRequired: true,
    priority: 'high'
  },
  {
    id: 'child-delete',
    method: 'DELETE',
    path: '/api/children/:childId',
    description: 'Çocuk profili silme',
    category: 'child',
    responseType: { success: 'boolean' },
    authRequired: true,
    priority: 'medium'
  },

  // COMMUNICATION - İletişim Kartları
  {
    id: 'comm-cards-list',
    method: 'GET',
    path: '/api/children/:childId/communication-cards',
    description: 'Çocuğun aktif iletişim kartları',
    category: 'communication',
    responseType: 'CommunicationItem[]',
    authRequired: true,
    priority: 'critical'
  },
  {
    id: 'comm-cards-library',
    method: 'GET',
    path: '/api/communication-cards/library',
    description: 'Tüm iletişim kartları kütüphanesi',
    category: 'communication',
    responseType: 'CommunicationItem[]',
    authRequired: true,
    priority: 'high'
  },
  {
    id: 'comm-cards-add',
    method: 'POST',
    path: '/api/children/:childId/communication-cards',
    description: 'Çocuğa iletişim kartı ekleme',
    category: 'communication',
    requestBody: { cardIds: 'string[]' },
    responseType: { success: 'boolean' },
    authRequired: true,
    priority: 'high'
  },
  {
    id: 'comm-cards-remove',
    method: 'DELETE',
    path: '/api/children/:childId/communication-cards/:cardId',
    description: 'İletişim kartını çocuktan kaldırma',
    category: 'communication',
    responseType: { success: 'boolean' },
    authRequired: true,
    priority: 'medium'
  },
  {
    id: 'comm-interaction-log',
    method: 'POST',
    path: '/api/children/:childId/communication-interactions',
    description: 'İletişim etkileşimi kaydetme',
    category: 'communication',
    requestBody: 'CommunicationInteraction',
    responseType: { success: 'boolean' },
    authRequired: true,
    priority: 'medium'
  },

  // LEARNING - Öğrenme ve Oyunlar
  {
    id: 'learn-concepts',
    method: 'GET',
    path: '/api/learning/concepts',
    description: 'Tüm öğrenme kavramları',
    category: 'learning',
    responseType: 'Concept[]',
    authRequired: true,
    priority: 'high'
  },
  {
    id: 'learn-curriculum',
    method: 'GET',
    path: '/api/children/:childId/curriculum',
    description: 'Çocuğa özel öğrenme müfredatı',
    category: 'learning',
    responseType: 'LearningCurriculum',
    authRequired: true,
    priority: 'high'
  },
  {
    id: 'learn-curriculum-update',
    method: 'PUT',
    path: '/api/children/:childId/curriculum',
    description: 'Öğrenme müfredatı güncelleme',
    category: 'learning',
    requestBody: 'CurriculumUpdate',
    responseType: 'LearningCurriculum',
    authRequired: true,
    priority: 'medium'
  },
  {
    id: 'learn-session-start',
    method: 'POST',
    path: '/api/children/:childId/game-sessions',
    description: 'Yeni oyun oturumu başlatma',
    category: 'learning',
    requestBody: { conceptId: 'string', gameType: 'string' },
    responseType: 'GameSession',
    authRequired: true,
    priority: 'high'
  },
  {
    id: 'learn-session-end',
    method: 'PUT',
    path: '/api/children/:childId/game-sessions/:sessionId',
    description: 'Oyun oturumu sonlandırma',
    category: 'learning',
    requestBody: 'GameSessionResult',
    responseType: 'GameSession',
    authRequired: true,
    priority: 'high'
  },
  {
    id: 'learn-interaction',
    method: 'POST',
    path: '/api/children/:childId/game-interactions',
    description: 'Oyun etkileşimi kaydetme',
    category: 'learning',
    requestBody: 'GameInteraction',
    responseType: { success: 'boolean' },
    authRequired: true,
    priority: 'medium'
  },

  // AI - Yapay Zeka Özellikleri
  {
    id: 'ai-prompt-generate',
    method: 'POST',
    path: '/api/ai/prompts/generate',
    description: 'AI prompt oluşturma',
    category: 'ai',
    requestBody: { 
      childId: 'string', 
      parentInput: 'string', 
      promptType: 'PromptType' 
    },
    responseType: { prompt: 'string', promptId: 'string' },
    authRequired: true,
    priority: 'high'
  },
  {
    id: 'ai-prompt-save',
    method: 'POST',
    path: '/api/ai/prompts',
    description: 'Prompt kaydetme',
    category: 'ai',
    requestBody: 'AIPrompt',
    responseType: 'AIPrompt',
    authRequired: true,
    priority: 'medium'
  },
  {
    id: 'ai-prompts-list',
    method: 'GET',
    path: '/api/children/:childId/prompts',
    description: 'Çocuğa ait prompt listesi',
    category: 'ai',
    responseType: 'AIPrompt[]',
    authRequired: true,
    priority: 'medium'
  },
  {
    id: 'ai-card-recommendations',
    method: 'GET',
    path: '/api/children/:childId/ai/card-recommendations',
    description: 'AI tabanlı kart önerileri',
    category: 'ai',
    responseType: 'CommunicationItem[]',
    authRequired: true,
    priority: 'low'
  },
  {
    id: 'ai-learning-insights',
    method: 'GET',
    path: '/api/children/:childId/ai/learning-insights',
    description: 'AI öğrenme analizi',
    category: 'ai',
    responseType: 'LearningInsights',
    authRequired: true,
    priority: 'low'
  },

  // ANALYTICS - Analitik ve Raporlama
  {
    id: 'analytics-progress',
    method: 'GET',
    path: '/api/children/:childId/progress',
    description: 'Çocuğun gelişim raporu',
    category: 'analytics',
    responseType: 'ProgressReport',
    authRequired: true,
    priority: 'medium'
  },
  {
    id: 'analytics-usage',
    method: 'GET',
    path: '/api/children/:childId/usage-stats',
    description: 'Kullanım istatistikleri',
    category: 'analytics',
    responseType: 'UsageStats',
    authRequired: true,
    priority: 'medium'
  },
  {
    id: 'analytics-export',
    method: 'GET',
    path: '/api/children/:childId/export',
    description: 'Veri dışa aktarma (PDF/Excel)',
    category: 'analytics',
    responseType: 'Blob',
    authRequired: true,
    priority: 'low'
  },
  {
    id: 'analytics-trends',
    method: 'GET',
    path: '/api/children/:childId/trends',
    description: 'Gelişim trendleri',
    category: 'analytics',
    responseType: 'TrendData',
    authRequired: true,
    priority: 'low'
  }
];

// ==============================================
// KAVRAM HARİTASI VİZUALİZASYONU
// ==============================================

export const getConceptMapVisualization = () => {
  return {
    nodes: CONCEPT_MAP.map(node => ({
      id: node.id,
      label: node.name,
      color: getCategoryColor(node.category),
      size: getPrioritySize(node.priority),
      borderColor: getStatusColor(node.status)
    })),
    edges: CONCEPT_MAP.flatMap(node => 
      node.connections.map(connectionId => ({
        from: node.id,
        to: connectionId,
        color: '#666',
        width: 2
      }))
    )
  };
};

const getCategoryColor = (category: string) => {
  const colors = {
    'core': '#2196F3',      // Mavi - Temel sistem
    'feature': '#4CAF50',   // Yeşil - Özellikler  
    'data': '#FF9800',      // Turuncu - Veri
    'ai': '#9C27B0',        // Mor - AI
    'integration': '#607D8B' // Gri - Entegrasyonlar
  };
  return colors[category as keyof typeof colors] || '#666';
};

const getPrioritySize = (priority: string) => {
  const sizes = {
    'high': 30,
    'medium': 20,
    'low': 15
  };
  return sizes[priority as keyof typeof sizes] || 15;
};

const getStatusColor = (status: string) => {
  const colors = {
    'implemented': '#4CAF50',    // Yeşil
    'in-progress': '#FF9800',    // Turuncu
    'planned': '#F44336'         // Kırmızı
  };
  return colors[status as keyof typeof colors] || '#666';
};

// ==============================================
// API DOKÜMANTASYONU ÜRETİCİ
// ==============================================

export const generateAPIDocumentation = () => {
  const groupedEndpoints = API_ENDPOINTS.reduce((acc, endpoint) => {
    if (!acc[endpoint.category]) {
      acc[endpoint.category] = [];
    }
    acc[endpoint.category].push(endpoint);
    return acc;
  }, {} as Record<string, APIEndpoint[]>);

  return Object.entries(groupedEndpoints).map(([category, endpoints]) => ({
    category: category.toUpperCase(),
    endpoints: endpoints.sort((a, b) => {
      const priorityOrder = { 'critical': 0, 'high': 1, 'medium': 2, 'low': 3 };
      return priorityOrder[a.priority as keyof typeof priorityOrder] - 
             priorityOrder[b.priority as keyof typeof priorityOrder];
    })
  }));
};

export default {
  CONCEPT_MAP,
  API_ENDPOINTS,
  getConceptMapVisualization,
  generateAPIDocumentation
};