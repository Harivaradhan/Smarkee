import { Box, Typography, Grid, Paper, Button, LinearProgress, Stack } from '@mui/material';
import { rewardOffers } from './userData.js';

export default function Rewards() {
  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Rewards
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Redeem your points for eco-friendly rewards.
      </Typography>

      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 4, boxShadow: 3 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Current Points
            </Typography>
            <Typography variant="h3" fontWeight={700}>
              2,450
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              You're just 550 points away from the next reward tier.
            </Typography>
            <Box sx={{ mt: 3 }}>
              <LinearProgress variant="determinate" value={82} sx={{ height: 10, borderRadius: 5 }} />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                82% toward next reward
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            {rewardOffers.map((reward) => (
              <Grid item xs={12} sm={6} key={reward.title}>
                <Paper sx={{ p: 3, borderRadius: 4, boxShadow: 3, height: '100%' }}>
                  <Stack spacing={1}>
                    <Typography variant="h6" fontWeight={700}>
                      {reward.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {reward.description}
                    </Typography>
                    <Typography variant="subtitle1" fontWeight={700}>
                      {reward.points} points
                    </Typography>
                    <Button variant="outlined" color="primary" size="small" sx={{ mt: 1 }}>
                      Redeem
                    </Button>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
