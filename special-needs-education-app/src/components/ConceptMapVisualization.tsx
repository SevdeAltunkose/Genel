import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  AccountTree as AccountTreeIcon,
  Api as ApiIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  PendingActions as PendingActionsIcon,
} from '@mui/icons-material';
import { CONCEPT_MAP, API_ENDPOINTS, generateAPIDocumentation } from '../utils/conceptMap';

const ConceptMapVisualization: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [showAPIDialog, setShowAPIDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const getCategoryColor = (category: string) => {
    const colors = {
      'core': '#2196F3',
      'feature': '#4CAF50',
      'data': '#FF9800',
      'ai': '#9C27B0',
      'integration': '#607D8B'
    };
    return colors[category as keyof typeof colors] || '#666';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'implemented':
        return <CheckCircleIcon sx={{ color: '#4CAF50' }} />;
      case 'in-progress':
        return <ScheduleIcon sx={{ color: '#FF9800' }} />;
      case 'planned':
        return <PendingActionsIcon sx={{ color: '#F44336' }} />;
      default:
        return null;
    }
  };

  const getCategoryTranslation = (category: string) => {
    const translations = {
      'core': 'Temel Sistem',
      'feature': 'Özellikler',
      'data': 'Veri Yönetimi',
      'ai': 'Yapay Zeka',
      'integration': 'Entegrasyonlar'
    };
    return translations[category as keyof typeof translations] || category;
  };

  const getStatusText = (status: string) => {
    const texts = {
      'implemented': 'Tamamlandı',
      'in-progress': 'Devam Ediyor',
      'planned': 'Planlandı'
    };
    return texts[status as keyof typeof texts] || status;
  };

  const selectedNodeData = selectedNode ? CONCEPT_MAP.find(node => node.id === selectedNode) : null;
  const connectedNodes = selectedNodeData ? CONCEPT_MAP.filter(node => 
    selectedNodeData.connections.includes(node.id)
  ) : [];

  const apiDocumentation = generateAPIDocumentation();

  // Group nodes by category for better visualization
  const nodesByCategory = CONCEPT_MAP.reduce((acc, node) => {
    if (!acc[node.category]) {
      acc[node.category] = [];
    }
    acc[node.category].push(node);
    return acc;
  }, {} as Record<string, typeof CONCEPT_MAP>);

  const handleShowAPI = (category: string) => {
    setSelectedCategory(category);
    setShowAPIDialog(true);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AccountTreeIcon color="primary" />
        Özel Eğitim Uygulaması - Kavram Haritası
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Bu harita, uygulamanın tüm bileşenleri ve aralarındaki ilişkileri gösterir.
        Her bileşen kategoriye göre renklendirilmiş ve durumuna göre işaretlenmiştir.
      </Typography>

      {/* Legend */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Açıklama</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom>Kategoriler:</Typography>
            {Object.entries(nodesByCategory).map(([category, nodes]) => (
              <Chip
                key={category}
                label={`${getCategoryTranslation(category)} (${nodes.length})`}
                sx={{ 
                  mr: 1, 
                  mb: 1, 
                  bgcolor: getCategoryColor(category), 
                  color: 'white' 
                }}
              />
            ))}
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom>Durumlar:</Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircleIcon sx={{ color: '#4CAF50' }} />
                <Typography variant="body2">Tamamlandı</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ScheduleIcon sx={{ color: '#FF9800' }} />
                <Typography variant="body2">Devam Ediyor</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PendingActionsIcon sx={{ color: '#F44336' }} />
                <Typography variant="body2">Planlandı</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Main Concept Map */}
      <Grid container spacing={3}>
        {Object.entries(nodesByCategory).map(([category, nodes]) => (
          <Grid item xs={12} key={category}>
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                  <Typography variant="h6">
                    {getCategoryTranslation(category)}
                  </Typography>
                  <Chip
                    size="small"
                    label={`${nodes.length} bileşen`}
                    sx={{ bgcolor: getCategoryColor(category), color: 'white' }}
                  />
                  <Button
                    size="small"
                    startIcon={<ApiIcon />}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShowAPI(category);
                    }}
                    sx={{ ml: 'auto' }}
                  >
                    API'leri Gör
                  </Button>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  {nodes.map((node) => (
                    <Grid item xs={12} sm={6} md={4} key={node.id}>
                      <Card
                        sx={{
                          cursor: 'pointer',
                          border: selectedNode === node.id ? '2px solid' : '1px solid',
                          borderColor: selectedNode === node.id ? getCategoryColor(node.category) : 'divider',
                          '&:hover': {
                            boxShadow: 6,
                            transform: 'translateY(-2px)',
                          },
                          transition: 'all 0.2s',
                        }}
                        onClick={() => setSelectedNode(node.id)}
                      >
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            {getStatusIcon(node.status)}
                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>
                              {node.name}
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {node.description}
                          </Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Chip
                              size="small"
                              label={getStatusText(node.status)}
                              color={node.status === 'implemented' ? 'success' : 
                                     node.status === 'in-progress' ? 'warning' : 'error'}
                            />
                            <Chip
                              size="small"
                              label={`${node.connections.length} bağlantı`}
                              variant="outlined"
                            />
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>

      {/* Selected Node Details */}
      {selectedNodeData && (
        <Paper sx={{ mt: 3, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Seçili Bileşen: {selectedNodeData.name}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {selectedNodeData.description}
          </Typography>
          
          {connectedNodes.length > 0 && (
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Bağlı Bileşenler:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {connectedNodes.map((connectedNode) => (
                  <Chip
                    key={connectedNode.id}
                    label={connectedNode.name}
                    size="small"
                    onClick={() => setSelectedNode(connectedNode.id)}
                    sx={{ 
                      bgcolor: getCategoryColor(connectedNode.category),
                      color: 'white',
                      cursor: 'pointer'
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}
        </Paper>
      )}

      {/* API Documentation Dialog */}
      <Dialog open={showAPIDialog} onClose={() => setShowAPIDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <ApiIcon />
            API Uç Noktaları - {selectedCategory?.toUpperCase()}
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedCategory && (
            <Box>
              {apiDocumentation
                .find(doc => doc.category.toLowerCase() === selectedCategory)
                ?.endpoints.map((endpoint) => (
                <Accordion key={endpoint.id} sx={{ mb: 1 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                      <Chip
                        label={endpoint.method}
                        size="small"
                        color={
                          endpoint.method === 'GET' ? 'success' :
                          endpoint.method === 'POST' ? 'primary' :
                          endpoint.method === 'PUT' ? 'warning' :
                          endpoint.method === 'DELETE' ? 'error' : 'default'
                        }
                      />
                      <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                        {endpoint.path}
                      </Typography>
                      <Chip
                        label={endpoint.priority}
                        size="small"
                        variant="outlined"
                        sx={{ ml: 'auto' }}
                      />
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {endpoint.description}
                    </Typography>
                    
                    <Grid container spacing={2}>
                      {endpoint.requestBody && (
                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle2" gutterBottom>Request Body:</Typography>
                          <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                            <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                              {JSON.stringify(endpoint.requestBody, null, 2)}
                            </Typography>
                          </Paper>
                        </Grid>
                      )}
                      
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" gutterBottom>Response Type:</Typography>
                        <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                          <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                            {typeof endpoint.responseType === 'string' 
                              ? endpoint.responseType 
                              : JSON.stringify(endpoint.responseType, null, 2)}
                          </Typography>
                        </Paper>
                      </Grid>
                    </Grid>
                    
                    <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                      <Chip
                        label={endpoint.authRequired ? 'Auth Required' : 'Public'}
                        size="small"
                        color={endpoint.authRequired ? 'error' : 'success'}
                      />
                      <Chip
                        label={`Priority: ${endpoint.priority}`}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAPIDialog(false)}>Kapat</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ConceptMapVisualization;