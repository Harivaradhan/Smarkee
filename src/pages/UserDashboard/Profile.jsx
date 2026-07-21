import { Box, Typography, Paper, Grid, Button } from '@mui/material';
import { profileData } from './userData.js';

export default function Profile() {
  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Profile
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Manage your personal details and recycling statistics.
      </Typography>

      <Paper sx={{ p: 3, mt: 3, borderRadius: 4, boxShadow: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Name
            </Typography>
            <Typography variant="h6" fontWeight={700}>
              {profileData.name}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mt: 2 }}>
              Email
            </Typography>
            <Typography>{profileData.email}</Typography>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mt: 2 }}>
              Phone
            </Typography>
            <Typography>{profileData.phone}</Typography>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mt: 2 }}>
              City
            </Typography>
            <Typography>{profileData.city}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Total Bottles Recycled
            </Typography>
            <Typography variant="h5" fontWeight={700}>
              {profileData.bottles}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mt: 2 }}>
              Carbon Saved
            </Typography>
            <Typography variant="h5" fontWeight={700}>
              {profileData.carbonSaved}
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 4 }}>
              Edit Profile
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
