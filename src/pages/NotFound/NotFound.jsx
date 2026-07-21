import { Box, Paper, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: 'calc(100vh - 72px)', display: 'flex', alignItems: 'center', justifyContent: 'center', px: 2 }}>
      <Paper sx={{ maxWidth: 600, width: '100%', p: 5, borderRadius: 4, textAlign: 'center', boxShadow: 6 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          The page you are looking for does not exist or has been moved.
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/login')} sx={{ mt: 3 }}>
          Go to Login
        </Button>
      </Paper>
    </Box>
  );
}
