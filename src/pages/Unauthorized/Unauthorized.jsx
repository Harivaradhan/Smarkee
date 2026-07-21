import { Box, Paper, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: 'calc(100vh - 72px)', display: 'flex', alignItems: 'center', justifyContent: 'center', px: 2 }}>
      <Paper sx={{ maxWidth: 600, width: '100%', p: 5, borderRadius: 4, textAlign: 'center', boxShadow: 6 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Unauthorized Access
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          You do not have permission to view this page. Please login with a role that has access.
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/login')} sx={{ mt: 3 }}>
          Return to Login
        </Button>
      </Paper>
    </Box>
  );
}
