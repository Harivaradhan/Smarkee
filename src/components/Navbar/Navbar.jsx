import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import useAuth from '../../hooks/useAuth.js';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ py: 1, px: 3 }}>
      <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 44, height: 44, borderRadius: '50%', bgcolor: 'primary.main' }} />
          <Typography variant="h6" color="text.primary" fontWeight={700}>
            Smarkee
          </Typography>
        </Box>

        {isAuthenticated ? (
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              {user?.fullName || user?.username}
            </Typography>
            <Button variant="outlined" color="primary" size="small" onClick={logout}>
              Logout
            </Button>
          </Box>
        ) : (
          <Button variant="outlined" color="primary" size="small" onClick={() => navigate('/login')}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
