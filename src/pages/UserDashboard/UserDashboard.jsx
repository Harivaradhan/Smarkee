import { useState } from 'react';
import { Box, Typography, Grid, Paper, Button, Stack, TextField, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DashboardMetricCard from '../../components/AdminDashboard/DashboardMetricCard.jsx';
import { userStats, recentActivity } from './userData.js';
import {
  Star as StarIcon,
  Spa as SpaIcon,
  FilterVintage as BottleIcon,
  EmojiEvents as TrophyIcon,
} from '@mui/icons-material';

export default function UserDashboard() {
  const navigate = useNavigate();
  const [rewardCode, setRewardCode] = useState('');
  const [claimMessage, setClaimMessage] = useState('');

  const handleClaimReward = () => {
    if (!rewardCode.trim()) {
      setClaimMessage('Please enter a reward code to claim your reward.');
      return;
    }

    setClaimMessage(`Reward code “${rewardCode.trim()}” claimed successfully.`);
    setRewardCode('');
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 2, alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Welcome back, Hari! 👋
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Keep recycling and earning rewards.
          </Typography>
        </Box>
        <Paper sx={{ p: 2, borderRadius: 3, boxShadow: 2, minWidth: { xs: '100%', sm: 360 } }}>
          <Stack spacing={1.5}>
            <Typography variant="subtitle2" color="text.secondary">
              Claim Reward
            </Typography>
            <TextField
              size="small"
              fullWidth
              label="Reward Code"
              value={rewardCode}
              onChange={(e) => setRewardCode(e.target.value)}
              placeholder="Enter reward code"
            />
            <Button variant="contained" color="primary" onClick={handleClaimReward}>
              Claim Reward
            </Button>
          </Stack>
        </Paper>
      </Box>

      {claimMessage && (
        <Box sx={{ mt: 2 }}>
          <Alert severity={claimMessage.includes('Please enter') ? 'warning' : 'success'}>
            {claimMessage}
          </Alert>
        </Box>
      )}

      <Grid container spacing={2} sx={{ mt: 3 }}>
        {userStats.map((stat) => {
          const iconMap = {
            Star: <StarIcon color="primary" />,
            Bottle: <BottleIcon color="primary" />,
            Spa: <SpaIcon color="primary" />,
            Trophy: <TrophyIcon color="primary" />,
          };

          return (
            <Grid item xs={12} sm={6} md={3} key={stat.label}>
              <DashboardMetricCard {...stat} icon={iconMap[stat.icon]} />
            </Grid>
          );
        })}
      </Grid>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 4, boxShadow: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
              <Box>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  Recent Activity
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Latest bottles scanned with reward points.
                </Typography>
              </Box>
              <Button size="small" onClick={() => navigate('/user/history')}>
                View All
              </Button>
            </Box>

            <Stack spacing={2} sx={{ mt: 3 }}>
              {recentActivity.map((activity) => (
                <Paper key={activity.id} sx={{ p: 2, borderRadius: 3, bgcolor: 'grey.50' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
                    <Box>
                      <Typography fontWeight={700}>{activity.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {activity.subtitle}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="subtitle1" fontWeight={700}>+{activity.points} pts</Typography>
                      <Typography variant="caption" color="success.main">{activity.status}</Typography>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 4, boxShadow: 3 }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Environmental Impact
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              You have helped the environment by recycling responsibly.
            </Typography>
            <Stack spacing={2} sx={{ mt: 3 }}>
              <Paper sx={{ p: 2, borderRadius: 3, bgcolor: 'rgba(46,125,50,0.08)' }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Total Bottles
                </Typography>
                <Typography variant="h5" fontWeight={700}>
                  186
                </Typography>
              </Paper>
              <Paper sx={{ p: 2, borderRadius: 3, bgcolor: 'rgba(21,101,192,0.08)' }}>
                <Typography variant="subtitle2" color="text.secondary">
                  CO₂ Saved
                </Typography>
                <Typography variant="h5" fontWeight={700}>
                  32.8 kg
                </Typography>
              </Paper>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
