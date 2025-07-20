import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Paper,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  VolumeUp as VolumeUpIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import { useChild } from '../contexts/ChildContext';
import { CommunicationItem } from '../types';

const CommunicationBoardPage: React.FC = () => {
  const { childId } = useParams<{ childId: string }>();
  const { currentChild } = useChild();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<CommunicationItem[]>([]);
  const [communicationItems, setCommunicationItems] = useState<CommunicationItem[]>([]);

  // Mock data for communication items
  useEffect(() => {
    const mockItems: CommunicationItem[] = [
      {
        id: '1',
        name: 'Su',
        category: 'drink',
        imageUrl: '🥤',
        isActive: true,
        childId: childId || '',
      },
      {
        id: '2',
        name: 'Muz',
        category: 'food',
        imageUrl: '🍌',
        isActive: true,
        childId: childId || '',
      },
      {
        id: '3',
        name: 'Oyun',
        category: 'activity',
        imageUrl: '🎮',
        isActive: true,
        childId: childId || '',
      },
      {
        id: '4',
        name: 'Mutlu',
        category: 'emotion',
        imageUrl: '😊',
        isActive: true,
        childId: childId || '',
      },
      {
        id: '5',
        name: 'Yardım',
        category: 'need',
        imageUrl: '🤝',
        isActive: true,
        childId: childId || '',
      },
      {
        id: '6',
        name: 'Kitap',
        category: 'object',
        imageUrl: '📚',
        isActive: true,
        childId: childId || '',
      },
      {
        id: '7',
        name: 'Çikolata',
        category: 'food',
        imageUrl: '🍫',
        isActive: true,
        childId: childId || '',
      },
      {
        id: '8',
        name: 'Müzik',
        category: 'activity',
        imageUrl: '🎵',
        isActive: true,
        childId: childId || '',
      },
    ];
    setCommunicationItems(mockItems);
  }, [childId]);

  const handleItemClick = (item: CommunicationItem) => {
    setSelectedItems(prev => [...prev, item]);
  };

  const handleSpeak = () => {
    if (selectedItems.length === 0) return;

    const text = selectedItems.map(item => item.name).join(' ') + ' istiyorum';
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'tr-TR';
      utterance.rate = 0.8;
      utterance.pitch = currentChild?.voiceGender === 'male' ? 0.8 : 1.2;
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleClear = () => {
    setSelectedItems([]);
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
            {currentChild?.name} - İletişim Panosu
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 3 }}>
        {/* Selected Items Bar */}
        <Paper
          elevation={3}
          sx={{
            p: 2,
            mb: 3,
            minHeight: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'rgba(255,255,255,0.95)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            {selectedItems.length === 0 ? (
              <Typography variant="h6" color="text.secondary">
                Bir şey seçin...
              </Typography>
            ) : (
              selectedItems.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    p: 1,
                    bgcolor: 'primary.light',
                    borderRadius: 2,
                    color: 'white',
                  }}
                >
                  <Typography variant="h6">{item.imageUrl}</Typography>
                  <Typography variant="body1">{item.name}</Typography>
                </Box>
              ))
            )}
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              color="success"
              startIcon={<VolumeUpIcon />}
              onClick={handleSpeak}
              disabled={selectedItems.length === 0}
              size="large"
            >
              Söyle
            </Button>
            <Button
              variant="outlined"
              startIcon={<ClearIcon />}
              onClick={handleClear}
              disabled={selectedItems.length === 0}
              size="large"
            >
              Temizle
            </Button>
          </Box>
        </Paper>

        {/* Communication Items Grid */}
        <Grid container spacing={2}>
          {communicationItems.map((item) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={item.id}>
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
                }}
                onClick={() => handleItemClick(item)}
              >
                <CardContent sx={{ textAlign: 'center', p: 2 }}>
                  <Typography
                    variant="h2"
                    component="div"
                    sx={{ mb: 1, fontSize: { xs: '2rem', sm: '3rem' } }}
                  >
                    {item.imageUrl}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ 
                      fontSize: { xs: '1rem', sm: '1.2rem' },
                      fontWeight: 'bold',
                      color: 'text.primary',
                    }}
                  >
                    {item.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default CommunicationBoardPage;