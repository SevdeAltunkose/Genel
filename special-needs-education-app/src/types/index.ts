export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface Child {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  developmentLevel: 'mild' | 'moderate' | 'severe';
  interests: string[];
  communicationLevel: 'beginner' | 'intermediate' | 'advanced';
  theme: 'pirates' | 'space' | 'animals' | 'nature' | 'default';
  voiceGender: 'male' | 'female';
  parentId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommunicationItem {
  id: string;
  name: string;
  category: 'food' | 'drink' | 'activity' | 'emotion' | 'need' | 'object';
  imageUrl: string;
  soundUrl?: string;
  isActive: boolean;
  childId: string;
}

export interface ConceptCategory {
  id: string;
  name: string;
  description: string;
  concepts: Concept[];
}

export interface Concept {
  id: string;
  name: string;
  type: 'color' | 'shape' | 'size' | 'number' | 'animal' | 'object';
  difficulty: 'easy' | 'medium' | 'hard';
  imageUrl: string;
  soundUrl?: string;
  order: number;
}

export interface GameSession {
  id: string;
  childId: string;
  conceptId: string;
  startTime: string;
  endTime?: string;
  correctAnswers: number;
  totalQuestions: number;
  averageResponseTime: number;
  interactions: GameInteraction[];
}

export interface GameInteraction {
  id: string;
  questionType: string;
  question: string;
  answer: string;
  isCorrect: boolean;
  responseTime: number;
  timestamp: string;
}

export interface LearningCurriculum {
  id: string;
  childId: string;
  concepts: ConceptOrder[];
  createdAt: string;
  updatedAt: string;
}

export interface ConceptOrder {
  conceptId: string;
  order: number;
  isCompleted: boolean;
  completedAt?: string;
}

export interface ProgressReport {
  childId: string;
  period: 'daily' | 'weekly' | 'monthly';
  startDate: string;
  endDate: string;
  totalSessions: number;
  totalPlayTime: number;
  averageAccuracy: number;
  averageResponseTime: number;
  conceptProgress: ConceptProgress[];
  communicationStats: CommunicationStats;
}

export interface ConceptProgress {
  conceptId: string;
  conceptName: string;
  accuracy: number;
  sessionsCompleted: number;
  averageResponseTime: number;
  improvement: number;
}

export interface CommunicationStats {
  totalInteractions: number;
  mostUsedItems: {
    itemId: string;
    itemName: string;
    count: number;
  }[];
  activeHours: {
    hour: number;
    count: number;
  }[];
}

export interface Theme {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  backgroundImage?: string;
  sounds: {
    success: string;
    error: string;
    click: string;
  };
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface ChildContextType {
  children: Child[];
  currentChild: Child | null;
  setCurrentChild: (child: Child) => void;
  addChild: (child: Omit<Child, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateChild: (id: string, updates: Partial<Child>) => Promise<void>;
  deleteChild: (id: string) => Promise<void>;
  loading: boolean;
}

export interface VoiceSettings {
  gender: 'male' | 'female';
  language: 'tr-TR' | 'en-US';
  rate: number;
  pitch: number;
  volume: number;
}

export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  template: string;
  variables: string[];
  category: 'communication' | 'learning' | 'assessment';
}

export interface AIPrompt {
  id: string;
  childId: string;
  parentInput: string;
  generatedPrompt: string;
  promptType: 'communication' | 'learning' | 'assessment';
  createdAt: string;
  isActive: boolean;
}