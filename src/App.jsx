import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard.jsx';
import ManufacturerDashboard from './pages/ManufacturerDashboard/ManufacturerDashboard.jsx';
import DistributorDashboard from './pages/DistributorDashboard/DistributorDashboard.jsx';
import UserArea from './pages/UserDashboard/UserArea.jsx';
import UserDashboard from './pages/UserDashboard/UserDashboard.jsx';
import ScanBottle from './pages/UserDashboard/ScanBottle.jsx';
import Rewards from './pages/UserDashboard/Rewards.jsx';
import ScanHistory from './pages/UserDashboard/ScanHistory.jsx';
import Profile from './pages/UserDashboard/Profile.jsx';
import ConsumerDashboard from './pages/ConsumerDashboard/ConsumerDashboard.jsx';
import Unauthorized from './pages/Unauthorized/Unauthorized.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
import RoleGuard from './components/RoleGuard/RoleGuard.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32',
    },
    secondary: {
      main: '#1565C0',
    },
    background: {
      default: '#F5F7FA',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <Box sx={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <RoleGuard allowedRoles={["Admin"]}>
                    <AdminDashboard />
                  </RoleGuard>
                </ProtectedRoute>
              }
            />
            <Route
              path="/manufacturer/dashboard"
              element={
                <ProtectedRoute>
                  <RoleGuard allowedRoles={["Manufacturer"]}>
                    <ManufacturerDashboard />
                  </RoleGuard>
                </ProtectedRoute>
              }
            />
            <Route
              path="/distributor/dashboard"
              element={
                <ProtectedRoute>
                  <RoleGuard allowedRoles={["Distributor"]}>
                    <DistributorDashboard />
                  </RoleGuard>
                </ProtectedRoute>
              }
            />
            <Route
              path="/user"
              element={
                <ProtectedRoute>
                  <RoleGuard allowedRoles={["User"]}>
                    <UserArea />
                  </RoleGuard>
                </ProtectedRoute>
              }
            >
              <Route index element={<UserDashboard />} />
              <Route path="dashboard" element={<UserDashboard />} />
              <Route path="scan" element={<ScanBottle />} />
              <Route path="rewards" element={<Rewards />} />
              <Route path="history" element={<ScanHistory />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
