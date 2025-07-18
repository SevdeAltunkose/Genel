import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Paper,
  TextField,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Psychology as PsychologyIcon,
  AutoAwesome as AutoAwesomeIcon,
  ExpandMore as ExpandMoreIcon,
  ContentCopy as ContentCopyIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { useChild } from '../contexts/ChildContext';
import { AIPrompt, PromptTemplate } from '../types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const ManagementPortalPage: React.FC = () => {
  const { childId } = useParams<{ childId: string }>();
  const { currentChild, updateChild } = useChild();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [openPromptDialog, setOpenPromptDialog] = useState(false);
  const [parentInput, setParentInput] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [promptType, setPromptType] = useState<'communication' | 'learning' | 'assessment'>('communication');
  const [aiPrompts, setAiPrompts] = useState<AIPrompt[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Prompt templates
  const promptTemplates: PromptTemplate[] = [
    {
      id: '1',
      name: 'İletişim Kartı Önerisi',
      description: 'Çocuğun ihtiyaçlarına göre iletişim kartları öner',
      template: `Çocuk profili:
- Ad: {childName}
- Yaş: {childAge}
- Gelişim seviyesi: {developmentLevel}
- İletişim seviyesi: {communicationLevel}
- İlgi alanları: {interests}

Ebeveyn talebi: {parentInput}

Bu çocuk için uygun iletişim kartları öner. Her kart için:
1. Kartın adı
2. Kategori (yiyecek, içecek, aktivite, duygu, ihtiyaç, nesne)
3. Neden önemli olduğu
4. Kullanım önerisi

Çocuğun yaşına ve gelişim seviyesine uygun, görsel ve anlaşılır öneriler sun.`,
      variables: ['childName', 'childAge', 'developmentLevel', 'communicationLevel', 'interests', 'parentInput'],
      category: 'communication',
    },
    {
      id: '2',
      name: 'Öğrenme Müfredatı',
      description: 'Çocuğa özel öğrenme planı oluştur',
      template: `Çocuk profili:
- Ad: {childName}
- Yaş: {childAge}
- Gelişim seviyesi: {developmentLevel}
- İletişim seviyesi: {communicationLevel}
- Tema tercihi: {theme}

Ebeveyn talebi: {parentInput}

Bu çocuk için kademeli öğrenme müfredatı oluştur:
1. Temel kavramlar (renkler, şekiller, sayılar)
2. Öğrenme sırası (kolay → zor)
3. Her kavram için oyun önerileri
4. Başarı ölçütleri
5. Tahmini süre

Çocuğun seviyesine uygun, eğlenceli ve motivasyonel bir plan hazırla.`,
      variables: ['childName', 'childAge', 'developmentLevel', 'communicationLevel', 'theme', 'parentInput'],
      category: 'learning',
    },
    {
      id: '3',
      name: 'Gelişim Değerlendirmesi',
      description: 'Çocuğun gelişimini değerlendirmek için sorular',
      template: `Çocuk profili:
- Ad: {childName}
- Yaş: {childAge}
- Gelişim seviyesi: {developmentLevel}
- İletişim seviyesi: {communicationLevel}

Ebeveyn gözlemi: {parentInput}

Bu çocuğun gelişimini değerlendirmek için:
1. Gözlemlenecek davranışlar
2. Değerlendirme soruları
3. Gelişim göstergeleri
4. Hangi alanlarda desteklenmeli
5. Önerilen aktiviteler

Objektif ve yapıcı bir değerlendirme rehberi hazırla.`,
      variables: ['childName', 'childAge', 'developmentLevel', 'communicationLevel', 'parentInput'],
      category: 'assessment',
    },
  ];

  useEffect(() => {
    // Load existing AI prompts from localStorage
    const storedPrompts = localStorage.getItem(`aiPrompts_${childId}`);
    if (storedPrompts) {
      setAiPrompts(JSON.parse(storedPrompts));
    }
  }, [childId]);

  const generatePrompt = () => {
    if (!parentInput.trim() || !currentChild) return;
    
    setIsGenerating(true);
    
    // Find the appropriate template
    const template = promptTemplates.find(t => t.category === promptType);
    if (!template) return;
    
    // Replace variables in template
    let prompt = template.template;
    const variables = {
      childName: currentChild.name,
      childAge: currentChild.age.toString(),
      developmentLevel: currentChild.developmentLevel === 'mild' ? 'Hafif destek' : 
                       currentChild.developmentLevel === 'moderate' ? 'Orta destek' : 'Yoğun destek',
      communicationLevel: currentChild.communicationLevel === 'beginner' ? 'Başlangıç' :
                         currentChild.communicationLevel === 'intermediate' ? 'Orta' : 'İleri',
      interests: currentChild.interests.join(', ') || 'Belirtilmemiş',
      theme: currentChild.theme === 'pirates' ? 'Korsanlar' :
             currentChild.theme === 'space' ? 'Uzay' :
             currentChild.theme === 'animals' ? 'Hayvanlar' :
             currentChild.theme === 'nature' ? 'Doğa' : 'Varsayılan',
      parentInput: parentInput.trim(),
    };
    
    // Replace all variables
    Object.entries(variables).forEach(([key, value]) => {
      prompt = prompt.replace(new RegExp(`{${key}}`, 'g'), value);
    });
    
    // Simulate AI processing delay
    setTimeout(() => {
      setGeneratedPrompt(prompt);
      setIsGenerating(false);
    }, 1500);
  };

  const savePrompt = () => {
    if (!generatedPrompt || !currentChild) return;
    
    const newPrompt: AIPrompt = {
      id: Date.now().toString(),
      childId: currentChild.id,
      parentInput: parentInput.trim(),
      generatedPrompt: generatedPrompt,
      promptType: promptType,
      createdAt: new Date().toISOString(),
      isActive: true,
    };
    
    const updatedPrompts = [...aiPrompts, newPrompt];
    setAiPrompts(updatedPrompts);
    localStorage.setItem(`aiPrompts_${childId}`, JSON.stringify(updatedPrompts));
    
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    
    // Reset form
    setParentInput('');
    setGeneratedPrompt('');
    setOpenPromptDialog(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add a toast notification here
  };

  const deletePrompt = (promptId: string) => {
    const updatedPrompts = aiPrompts.filter(p => p.id !== promptId);
    setAiPrompts(updatedPrompts);
    localStorage.setItem(`aiPrompts_${childId}`, JSON.stringify(updatedPrompts));
  };

  const getPromptTypeText = (type: string) => {
    const types = {
      communication: 'İletişim',
      learning: 'Öğrenme',
      assessment: 'Değerlendirme',
    };
    return types[type as keyof typeof types] || type;
  };

  const getPromptTypeColor = (type: string) => {
    const colors = {
      communication: 'primary',
      learning: 'success',
      assessment: 'warning',
    };
    return colors[type as keyof typeof colors] || 'default';
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate('/')}
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {currentChild?.name} - Yönetim Portalı
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 3 }}>
        {showSuccess && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Prompt başarıyla kaydedildi!
          </Alert>
        )}

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
            <Tab label="AI Prompt Üretici" />
            <Tab label="İletişim Yönetimi" />
            <Tab label="Öğrenme Müfredatı" />
            <Tab label="Gelişim Raporları" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          {/* AI Prompt Generator */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper elevation={2} sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <PsychologyIcon sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography variant="h5">AI Prompt Üretici</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Çocuğunuzla ilgili isteklerinizi yazın, size özel prompt'lar oluşturalım.
                </Typography>
                
                <Button
                  variant="contained"
                  startIcon={<AutoAwesomeIcon />}
                  onClick={() => setOpenPromptDialog(true)}
                  size="large"
                  sx={{ mb: 3 }}
                >
                  Yeni Prompt Oluştur
                </Button>

                {/* Saved Prompts */}
                <Typography variant="h6" gutterBottom>
                  Kaydedilen Prompt'lar
                </Typography>
                
                {aiPrompts.length === 0 ? (
                  <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'grey.50' }}>
                    <Typography color="text.secondary">
                      Henüz prompt oluşturmadınız. Yukarıdaki butona tıklayarak başlayın.
                    </Typography>
                  </Paper>
                ) : (
                  <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
                    {aiPrompts.map((prompt) => (
                      <Accordion key={prompt.id} sx={{ mb: 1 }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                            <Chip
                              label={getPromptTypeText(prompt.promptType)}
                              color={getPromptTypeColor(prompt.promptType) as any}
                              size="small"
                            />
                            <Typography variant="body2" sx={{ flexGrow: 1 }}>
                              {prompt.parentInput.substring(0, 50)}...
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {new Date(prompt.createdAt).toLocaleDateString('tr-TR')}
                            </Typography>
                          </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" gutterBottom>
                              Ebeveyn Talebi:
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                              {prompt.parentInput}
                            </Typography>
                            
                            <Typography variant="subtitle2" gutterBottom>
                              Oluşturulan Prompt:
                            </Typography>
                            <Paper sx={{ p: 2, bgcolor: 'primary.50', maxHeight: 200, overflow: 'auto' }}>
                              <Typography variant="body2" style={{ whiteSpace: 'pre-wrap' }}>
                                {prompt.generatedPrompt}
                              </Typography>
                            </Paper>
                          </Box>
                          
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button
                              size="small"
                              startIcon={<ContentCopyIcon />}
                              onClick={() => copyToClipboard(prompt.generatedPrompt)}
                            >
                              Kopyala
                            </Button>
                            <Button
                              size="small"
                              color="error"
                              startIcon={<DeleteIcon />}
                              onClick={() => deletePrompt(prompt.id)}
                            >
                              Sil
                            </Button>
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </Box>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Prompt Türleri
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="İletişim"
                      secondary="İletişim kartları ve yöntemleri için öneriler"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Öğrenme"
                      secondary="Kişiselleştirilmiş öğrenme planları"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Değerlendirme"
                      secondary="Gelişim takibi ve değerlendirme araçları"
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography variant="h5" gutterBottom>
            İletişim Panosu Yönetimi
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Bu bölüm yakında gelecek...
          </Typography>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="h5" gutterBottom>
            Öğrenme Müfredatı
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Bu bölüm yakında gelecek...
          </Typography>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Typography variant="h5" gutterBottom>
            Gelişim Raporları
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Bu bölüm yakında gelecek...
          </Typography>
        </TabPanel>
      </Container>

      {/* Prompt Generation Dialog */}
      <Dialog open={openPromptDialog} onClose={() => setOpenPromptDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <AutoAwesomeIcon color="primary" />
            Yeni Prompt Oluştur
          </Box>
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Prompt Türü</InputLabel>
            <Select
              value={promptType}
              label="Prompt Türü"
              onChange={(e) => setPromptType(e.target.value as any)}
            >
              <MenuItem value="communication">İletişim</MenuItem>
              <MenuItem value="learning">Öğrenme</MenuItem>
              <MenuItem value="assessment">Değerlendirme</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Talebinizi detaylı olarak yazın"
            value={parentInput}
            onChange={(e) => setParentInput(e.target.value)}
            margin="normal"
            placeholder="Örnek: Çocuğum yemek yemek istemiyor, hangi iletişim kartları yardımcı olabilir?"
            helperText="Ne istediğinizi ne kadar detaylı yazarsanız, o kadar iyi sonuç alırsınız."
          />

          <Button
            fullWidth
            variant="contained"
            onClick={generatePrompt}
            disabled={!parentInput.trim() || isGenerating}
            sx={{ mt: 2, mb: 2 }}
          >
            {isGenerating ? 'Prompt Oluşturuluyor...' : 'Prompt Oluştur'}
          </Button>

          {generatedPrompt && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Oluşturulan Prompt:
              </Typography>
              <Paper sx={{ p: 2, bgcolor: 'primary.50', maxHeight: 300, overflow: 'auto' }}>
                <Typography variant="body2" style={{ whiteSpace: 'pre-wrap' }}>
                  {generatedPrompt}
                </Typography>
              </Paper>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPromptDialog(false)}>İptal</Button>
          {generatedPrompt && (
            <Button onClick={() => copyToClipboard(generatedPrompt)} startIcon={<ContentCopyIcon />}>
              Kopyala
            </Button>
          )}
          {generatedPrompt && (
            <Button onClick={savePrompt} variant="contained" startIcon={<SaveIcon />}>
              Kaydet
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManagementPortalPage;