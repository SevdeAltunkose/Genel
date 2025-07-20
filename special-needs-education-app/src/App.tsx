import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import { ChildProvider } from './contexts/ChildContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ChildProfilePage from './pages/ChildProfilePage';
import CommunicationBoardPage from './pages/CommunicationBoardPage';
import ConceptGamePage from './pages/ConceptGamePage';
import ManagementPortalPage from './pages/ManagementPortalPage';
import PrivateRoute from './components/PrivateRoute';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#ff9800',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontSize: '1.1rem',
          padding: '12px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <ChildProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/" element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              } />
              <Route path="/child/:childId" element={
                <PrivateRoute>
                  <ChildProfilePage />
                </PrivateRoute>
              } />
              <Route path="/communication/:childId" element={
                <PrivateRoute>
                  <CommunicationBoardPage />
                </PrivateRoute>
              } />
              <Route path="/game/:childId" element={
                <PrivateRoute>
                  <ConceptGamePage />
                </PrivateRoute>
              } />
              <Route path="/management/:childId" element={
                <PrivateRoute>
                  <ManagementPortalPage />
                </PrivateRoute>
              } />
            </Routes>
          </Router>
        </ChildProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
