// src/App.jsx
import React, { useState, useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { ThemeProvider, useThemeContext } from './context/ThemeContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages/Components
import Dashboard from './pages/Dashboard';
import HabitsPage from './pages/HabitsPage';
import MeditationTracker from './pages/MeditationTracker';
import CalendarView from './pages/CalendarView';
import Profile from './pages/Profile';
import WaterTracker from './pages/WaterTracker';
import ExerciseTracker from './pages/ExerciseTracker';
import JournalTracker from './pages/JournalTracker';
import BottomNav from './Components/common/BottomNav';
import Sidebar from './Components/Sidebar';

import Signup from './Components/Signup';
import Login from './Components/Login';
import Face1 from './Components/Face1';
import ChallengeSetup from './pages/ChallengeSetup';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: { main: '#1976d2' },
          secondary: { main: '#dc004e' },
          background: { default: '#f5f5f5', paper: '#ffffff' },
        }
      : {
          primary: { main: '#90caf9' },
          secondary: { main: '#f48fb1' },
          background: { default: '#121212', paper: '#1e1e1e' },
          text: { primary: '#ffffff', secondary: 'rgba(255, 255, 255, 0.7)' },
        }),
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', borderRadius: 8 },
      },
    },
  },
});

function App() {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <ThemeProvider>
      <AppContent isMobile={isMobile} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
    </ThemeProvider>
  );
}

function AppContent({ isMobile, mobileOpen, setMobileOpen }) {
  const { mode } = useThemeContext();
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar
          isMobile={isMobile}
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
          mode={mode}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            pb: 8,
            width: { xs: '100%', sm: 'auto' },
            marginLeft: { sm: '240px' },
          }}
        >
          <Routes>
            {/* Public / Auth routes */}
            <Route path="/" element={<Face1 />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/challenge" element={<ChallengeSetup />} />

            {/* Dashboard / Tracker routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/habits" element={<HabitsPage />} />
            <Route path="/meditation" element={<MeditationTracker />} />
            <Route path="/calendar" element={<CalendarView />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/water" element={<WaterTracker />} />
            <Route path="/exercise" element={<ExerciseTracker />} />
            <Route path="/journal" element={<JournalTracker />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Box>
        <BottomNav />
      </Box>

      <ToastContainer
        position="bottom-right"
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={mode}
      />
    </MUIThemeProvider>
  );
}

export default App;
