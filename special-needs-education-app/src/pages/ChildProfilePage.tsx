import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const ChildProfilePage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h4" gutterBottom>
          Çocuk Profili
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Bu sayfa yakında gelecek...
        </Typography>
      </Box>
    </Container>
  );
};

export default ChildProfilePage;