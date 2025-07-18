import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Avatar,
} from '@mui/material';
import {
  Add as AddIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Chat as ChatIcon,
  Games as GamesIcon,
  Settings as SettingsIcon,
  Boy as BoyIcon,
  Girl as GirlIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useChild } from '../contexts/ChildContext';
import { Child } from '../types';

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const { children, addChild, setCurrentChild } = useChild();
  const [openDialog, setOpenDialog] = useState(false);
  const [newChild, setNewChild] = useState({
    name: '',
    age: 3,
    gender: 'male' as 'male' | 'female',
    developmentLevel: 'mild' as 'mild' | 'moderate' | 'severe',
    interests: [] as string[],
    communicationLevel: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    theme: 'default' as 'pirates' | 'space' | 'animals' | 'nature' | 'default',
    voiceGender: 'female' as 'male' | 'female',
  });
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAddChild = async () => {
    try {
      await addChild(newChild);
      setOpenDialog(false);
      setNewChild({
        name: '',
        age: 3,
        gender: 'male',
        developmentLevel: 'mild',
        interests: [],
        communicationLevel: 'beginner',
        theme: 'default',
        voiceGender: 'female',
      });
    } catch (error) {
      console.error('Error adding child:', error);
    }
  };

  const handleChildSelect = (child: Child) => {
    setCurrentChild(child);
    navigate(`/child/${child.id}`);
  };

  const getThemeColor = (theme: string) => {
    const colors = {
      pirates: '#8B4513',
      space: '#1E3A8A',
      animals: '#059669',
      nature: '#16A34A',
      default: '#6B7280',
    };
    return colors[theme as keyof typeof colors] || colors.default;
  };

  const getDevelopmentLevelText = (level: string) => {
    const levels = {
      mild: 'Hafif Destek',
      moderate: 'Orta Destek',
      severe: 'Yoğun Destek',
    };
    return levels[level as keyof typeof levels];
  };

  const getCommunicationLevelText = (level: string) => {
    const levels = {
      beginner: 'Başlangıç',
      intermediate: 'Orta',
      advanced: 'İleri',
    };
    return levels[level as keyof typeof levels];
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Özel Eğitim Uygulaması
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2">
              Hoş geldiniz, {user?.name}
            </Typography>
            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Çocuk Profilleri
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
          >
            Yeni Çocuk Ekle
          </Button>
        </Box>

        {children.length === 0 ? (
          <Card sx={{ textAlign: 'center', py: 8 }}>
            <CardContent>
              <PersonIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Henüz çocuk profili eklenmemiş
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                İlk çocuk profilini ekleyerek başlayın
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenDialog(true)}
              >
                Çocuk Profili Ekle
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Grid container spacing={3}>
            {children.map((child) => (
              <Grid item xs={12} sm={6} md={4} key={child.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: getThemeColor(child.theme),
                          mr: 2,
                        }}
                      >
                        {child.gender === 'male' ? <BoyIcon /> : <GirlIcon />}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" component="h2">
                          {child.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {child.age} yaşında
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Chip
                        label={getDevelopmentLevelText(child.developmentLevel)}
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                      />
                      <Chip
                        label={getCommunicationLevelText(child.communicationLevel)}
                        size="small"
                        variant="outlined"
                        sx={{ mb: 1 }}
                      />
                    </Box>

                    <Typography variant="body2" color="text.secondary">
                      Tema: {child.theme === 'default' ? 'Varsayılan' : 
                        child.theme === 'pirates' ? 'Korsanlar' :
                        child.theme === 'space' ? 'Uzay' :
                        child.theme === 'animals' ? 'Hayvanlar' : 'Doğa'}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      startIcon={<ChatIcon />}
                      onClick={() => {
                        setCurrentChild(child);
                        navigate(`/communication/${child.id}`);
                      }}
                    >
                      İletişim
                    </Button>
                    <Button
                      size="small"
                      startIcon={<GamesIcon />}
                      onClick={() => {
                        setCurrentChild(child);
                        navigate(`/game/${child.id}`);
                      }}
                    >
                      Oyun
                    </Button>
                    <Button
                      size="small"
                      startIcon={<SettingsIcon />}
                      onClick={() => {
                        setCurrentChild(child);
                        navigate(`/management/${child.id}`);
                      }}
                    >
                      Yönetim
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Add Child Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Yeni Çocuk Profili Ekle</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Çocuğun Adı"
            value={newChild.name}
            onChange={(e) => setNewChild({ ...newChild, name: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            type="number"
            label="Yaş"
            value={newChild.age}
            onChange={(e) => setNewChild({ ...newChild, age: parseInt(e.target.value) || 3 })}
            margin="normal"
            inputProps={{ min: 1, max: 18 }}
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Cinsiyet</InputLabel>
            <Select
              value={newChild.gender}
              label="Cinsiyet"
              onChange={(e) => setNewChild({ ...newChild, gender: e.target.value as 'male' | 'female' })}
            >
              <MenuItem value="male">Erkek</MenuItem>
              <MenuItem value="female">Kız</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Gelişim Düzeyi</InputLabel>
            <Select
              value={newChild.developmentLevel}
              label="Gelişim Düzeyi"
              onChange={(e) => setNewChild({ ...newChild, developmentLevel: e.target.value as any })}
            >
              <MenuItem value="mild">Hafif Destek İhtiyacı</MenuItem>
              <MenuItem value="moderate">Orta Destek İhtiyacı</MenuItem>
              <MenuItem value="severe">Yoğun Destek İhtiyacı</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>İletişim Seviyesi</InputLabel>
            <Select
              value={newChild.communicationLevel}
              label="İletişim Seviyesi"
              onChange={(e) => setNewChild({ ...newChild, communicationLevel: e.target.value as any })}
            >
              <MenuItem value="beginner">Başlangıç</MenuItem>
              <MenuItem value="intermediate">Orta</MenuItem>
              <MenuItem value="advanced">İleri</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Tema</InputLabel>
            <Select
              value={newChild.theme}
              label="Tema"
              onChange={(e) => setNewChild({ ...newChild, theme: e.target.value as any })}
            >
              <MenuItem value="default">Varsayılan</MenuItem>
              <MenuItem value="pirates">Korsanlar</MenuItem>
              <MenuItem value="space">Uzay</MenuItem>
              <MenuItem value="animals">Hayvanlar</MenuItem>
              <MenuItem value="nature">Doğa</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Ses Cinsiyeti</InputLabel>
            <Select
              value={newChild.voiceGender}
              label="Ses Cinsiyeti"
              onChange={(e) => setNewChild({ ...newChild, voiceGender: e.target.value as any })}
            >
              <MenuItem value="female">Kadın Sesi</MenuItem>
              <MenuItem value="male">Erkek Sesi</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>İptal</Button>
          <Button onClick={handleAddChild} variant="contained" disabled={!newChild.name}>
            Ekle
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DashboardPage;