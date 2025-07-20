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
  LinearProgress,
  Dialog,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  VolumeUp as VolumeUpIcon,
  Star as StarIcon,
  Celebration as CelebrationIcon,
} from '@mui/icons-material';
import { useChild } from '../contexts/ChildContext';
import { Concept } from '../types';

interface GameQuestion {
  id: string;
  question: string;
  options: Concept[];
  correctAnswer: Concept;
  type: 'size' | 'color' | 'shape' | 'number';
}

const ConceptGamePage: React.FC = () => {
  const { childId } = useParams<{ childId: string }>();
  const { currentChild } = useChild();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState<GameQuestion | null>(null);
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gameStarted, setGameStarted] = useState(false);

  // Mock concepts
  const concepts: Concept[] = [
    {
      id: '1',
      name: 'Büyük Hazine Sandığı',
      type: 'size',
      difficulty: 'easy',
      imageUrl: '🏴‍☠️📦',
      order: 1,
    },
    {
      id: '2',
      name: 'Küçük Papağan',
      type: 'size',
      difficulty: 'easy',
      imageUrl: '🦜',
      order: 2,
    },
    {
      id: '3',
      name: 'Kırmızı Gemi',
      type: 'color',
      difficulty: 'easy',
      imageUrl: '🚢',
      order: 3,
    },
    {
      id: '4',
      name: 'Mavi Deniz',
      type: 'color',
      difficulty: 'easy',
      imageUrl: '🌊',
      order: 4,
    },
    {
      id: '5',
      name: 'Yuvarlak Dünya',
      type: 'shape',
      difficulty: 'easy',
      imageUrl: '🌍',
      order: 5,
    },
    {
      id: '6',
      name: 'Üçgen Yelken',
      type: 'shape',
      difficulty: 'easy',
      imageUrl: '⛵',
      order: 6,
    },
  ];

  const generateQuestion = (): GameQuestion => {
    const types = ['size', 'color', 'shape'];
    const selectedType = types[Math.floor(Math.random() * types.length)] as 'size' | 'color' | 'shape';
    
    const conceptsOfType = concepts.filter(c => c.type === selectedType);
    const correctAnswer = conceptsOfType[Math.floor(Math.random() * conceptsOfType.length)];
    
    // Create wrong options from other concepts
    const wrongOptions = concepts
      .filter(c => c.id !== correctAnswer.id)
      .slice(0, 2);
    
    const allOptions = [correctAnswer, ...wrongOptions].sort(() => Math.random() - 0.5);
    
    const questions = {
      size: ['Bana büyük olanı göster', 'Küçük olanı seç'],
      color: ['Kırmızı olanı bul', 'Mavi olanı göster'],
      shape: ['Yuvarlak olanı seç', 'Üçgen olanı bul'],
    };
    
    const questionTexts = questions[selectedType];
    const questionText = questionTexts[Math.floor(Math.random() * questionTexts.length)];
    
    return {
      id: Date.now().toString(),
      question: questionText,
      options: allOptions,
      correctAnswer,
      type: selectedType,
    };
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setQuestionCount(0);
    setCurrentQuestion(generateQuestion());
    
    // Speak the question
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance('Oyun başlıyor! Hazır mısın?');
      utterance.lang = 'tr-TR';
      utterance.rate = 0.8;
      utterance.pitch = currentChild?.voiceGender === 'male' ? 0.8 : 1.2;
      window.speechSynthesis.speak(utterance);
    }
  };

  const speakQuestion = () => {
    if (!currentQuestion) return;
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentQuestion.question);
      utterance.lang = 'tr-TR';
      utterance.rate = 0.8;
      utterance.pitch = currentChild?.voiceGender === 'male' ? 0.8 : 1.2;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleAnswer = (selectedConcept: Concept) => {
    if (!currentQuestion) return;
    
    const correct = selectedConcept.id === currentQuestion.correctAnswer.id;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 1);
      // Play success sound/animation
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance('Harika! Doğru cevap!');
        utterance.lang = 'tr-TR';
        utterance.rate = 0.8;
        utterance.pitch = currentChild?.voiceGender === 'male' ? 0.8 : 1.2;
        window.speechSynthesis.speak(utterance);
      }
    } else {
      // Play encouragement sound
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance('Tekrar dene! Sen yapabilirsin!');
        utterance.lang = 'tr-TR';
        utterance.rate = 0.8;
        utterance.pitch = currentChild?.voiceGender === 'male' ? 0.8 : 1.2;
        window.speechSynthesis.speak(utterance);
      }
    }
    
    setShowResult(true);
    
    // After 2 seconds, move to next question or end game
    setTimeout(() => {
      setShowResult(false);
      setIsCorrect(null);
      
      if (questionCount < 4) { // 5 questions total
        setQuestionCount(questionCount + 1);
        setCurrentQuestion(generateQuestion());
      } else {
        // End game
        setGameStarted(false);
        setCurrentQuestion(null);
        
        if ('speechSynthesis' in window) {
          const finalScore = correct ? score + 1 : score;
          const utterance = new SpeechSynthesisUtterance(
            `Oyun bitti! ${finalScore} doğru cevap verdin. Çok iyi!`
          );
          utterance.lang = 'tr-TR';
          utterance.rate = 0.8;
          utterance.pitch = currentChild?.voiceGender === 'male' ? 0.8 : 1.2;
          window.speechSynthesis.speak(utterance);
        }
      }
    }, 2000);
  };

  const getThemeBackground = (theme: string) => {
    const themes = {
      pirates: 'linear-gradient(135deg, #8B4513 0%, #D2691E 100%)',
      space: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
      animals: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
      nature: 'linear-gradient(135deg, #16A34A 0%, #22C55E 100%)',
      default: 'linear-gradient(135deg, #6B7280 0%, #9CA3AF 100%)',
    };
    return themes[theme as keyof typeof themes] || themes.default;
  };

  // Speak question when it changes
  useEffect(() => {
    if (currentQuestion && gameStarted) {
      setTimeout(() => {
        speakQuestion();
      }, 1000);
    }
  }, [currentQuestion, gameStarted]);

  return (
    <Box sx={{ minHeight: '100vh', background: getThemeBackground(currentChild?.theme || 'default') }}>
      <AppBar position="static" sx={{ backgroundColor: 'rgba(255,255,255,0.9)', color: 'black' }}>
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
            {currentChild?.name} - Kavram Oyunu
          </Typography>
          {gameStarted && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body1">
                Skor: {score}/{questionCount + 1}
              </Typography>
              <IconButton color="inherit" onClick={speakQuestion}>
                <VolumeUpIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 3 }}>
        {!gameStarted ? (
          // Game Start Screen
          <Paper
            elevation={3}
            sx={{
              p: 4,
              textAlign: 'center',
              backgroundColor: 'rgba(255,255,255,0.95)',
              borderRadius: 4,
            }}
          >
            <Typography variant="h3" gutterBottom color="primary">
              🎮 Kavram Oyunu
            </Typography>
            <Typography variant="h6" gutterBottom color="text.secondary">
              {currentChild?.theme === 'pirates' ? '🏴‍☠️ Korsan teması ile' :
               currentChild?.theme === 'space' ? '🚀 Uzay teması ile' :
               currentChild?.theme === 'animals' ? '🦁 Hayvanlar teması ile' :
               currentChild?.theme === 'nature' ? '🌿 Doğa teması ile' :
               '🎯 Öğrenme oyunu'}
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Renkler, şekiller ve büyüklükler hakkında sorular cevaplayacaksın.
              Hazır mısın?
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={startGame}
              sx={{ fontSize: '1.5rem', py: 2, px: 4 }}
            >
              Oyunu Başlat
            </Button>
          </Paper>
        ) : currentQuestion ? (
          // Game Screen
          <Box>
            {/* Progress Bar */}
            <Paper elevation={2} sx={{ p: 2, mb: 3, backgroundColor: 'rgba(255,255,255,0.95)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Typography variant="h6">
                  Soru {questionCount + 1}/5
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(questionCount + 1) * 20}
                  sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
                />
                <Typography variant="body1">
                  {score} doğru
                </Typography>
              </Box>
            </Paper>

            {/* Question */}
            <Paper
              elevation={3}
              sx={{
                p: 3,
                mb: 3,
                textAlign: 'center',
                backgroundColor: 'rgba(255,255,255,0.95)',
              }}
            >
              <Typography variant="h4" gutterBottom color="primary">
                {currentQuestion.question}
              </Typography>
              <Button
                variant="outlined"
                startIcon={<VolumeUpIcon />}
                onClick={speakQuestion}
                sx={{ mt: 2 }}
              >
                Soruyu Tekrar Dinle
              </Button>
            </Paper>

            {/* Options */}
            <Grid container spacing={3}>
              {currentQuestion.options.map((option) => (
                <Grid item xs={12} sm={6} md={4} key={option.id}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: 6,
                      },
                      '&:active': {
                        transform: 'scale(0.95)',
                      },
                      backgroundColor: 'rgba(255,255,255,0.95)',
                      minHeight: 200,
                    }}
                    onClick={() => handleAnswer(option)}
                  >
                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                      <Typography
                        variant="h1"
                        component="div"
                        sx={{ mb: 2, fontSize: { xs: '3rem', sm: '4rem' } }}
                      >
                        {option.imageUrl}
                      </Typography>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ fontWeight: 'bold', color: 'text.primary' }}
                      >
                        {option.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          // Game End Screen
          <Paper
            elevation={3}
            sx={{
              p: 4,
              textAlign: 'center',
              backgroundColor: 'rgba(255,255,255,0.95)',
              borderRadius: 4,
            }}
          >
            <CelebrationIcon sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
            <Typography variant="h3" gutterBottom color="primary">
              Tebrikler!
            </Typography>
            <Typography variant="h5" gutterBottom>
              {score}/5 doğru cevap verdin!
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 3 }}>
              {[...Array(5)].map((_, index) => (
                <StarIcon
                  key={index}
                  sx={{
                    fontSize: 40,
                    color: index < score ? 'gold' : 'grey.300',
                  }}
                />
              ))}
            </Box>
            <Button
              variant="contained"
              size="large"
              onClick={startGame}
              sx={{ mr: 2 }}
            >
              Tekrar Oyna
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/')}
            >
              Ana Sayfaya Dön
            </Button>
          </Paper>
        )}
      </Container>

      {/* Result Dialog */}
      <Dialog open={showResult} maxWidth="sm" fullWidth>
        <DialogContent sx={{ textAlign: 'center', py: 4 }}>
          {isCorrect ? (
            <Box>
              <Typography variant="h2" sx={{ mb: 2 }}>🎉</Typography>
              <Typography variant="h4" color="success.main" gutterBottom>
                Harika!
              </Typography>
              <Typography variant="h6">
                Doğru cevap!
              </Typography>
            </Box>
          ) : (
            <Box>
              <Typography variant="h2" sx={{ mb: 2 }}>💪</Typography>
              <Typography variant="h4" color="warning.main" gutterBottom>
                Tekrar dene!
              </Typography>
              <Typography variant="h6">
                Sen yapabilirsin!
              </Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ConceptGamePage;