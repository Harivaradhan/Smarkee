import { useState, useEffect } from 'react';
import axios from "axios";
import { Box, Typography, Grid, Paper, Button, Stack, TextField, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DashboardMetricCard from '../../components/AdminDashboard/DashboardMetricCard.jsx';

import {
  Star as StarIcon,
  Spa as SpaIcon,
  FilterVintage as BottleIcon,
  EmojiEvents as TrophyIcon,
} from '@mui/icons-material';

export default function UserDashboard() {
  const navigate = useNavigate();
  const [allRewards, setAllRewards] = useState([]);
  const [rewardCode, setRewardCode] = useState('');
  const [claimMessage, setClaimMessage] = useState('');

const [recentActivity, setRecentActivity] = useState(() => {
  const saved = localStorage.getItem("claimedRewards");
  return saved ? JSON.parse(saved) : [];
});

const handleClaimReward = async () => {
  if (!rewardCode.trim()) {
    setClaimMessage('Please enter a reward code to claim your reward.');
    return;
  }

  try {
    const response = await axios.get("http://13.60.20.124:8000/reward/all/");
    const rewards = response.data.rewards || [];

    const matchedReward = rewards.find(
      (r) => r.reward_id.toLowerCase() === rewardCode.trim().toLowerCase()
    );

    if (!matchedReward) {
      setClaimMessage(`No reward found for code "${rewardCode}".`);
      setRewardCode('');
      return;
    }

    setClaimMessage(
      matchedReward.claimed
        ? `Reward "${matchedReward.reward_id}" has already been claimed.`
        : `Reward "${matchedReward.reward_id}" found — ${matchedReward.total_points} pts.`
    );

    setRecentActivity((prev) => {
      const withoutDuplicate = prev.filter(
        (item) => item.reward_id !== matchedReward.reward_id
      );
      const updated = [matchedReward, ...withoutDuplicate].slice(0, 5);
      localStorage.setItem("claimedRewards", JSON.stringify(updated));
      return updated;
    });
  } catch (error) {
    console.error("Error claiming reward:", error);
    setClaimMessage('Something went wrong while checking your reward code.');
  }

  setRewardCode('');
};

const fetchRecentActivity = async () => {
  try {
    const response = await axios.get("http://13.60.20.124:8000/reward/all/");
    const rewards = response.data.rewards || [];

    setAllRewards(rewards);

    const sorted = [...rewards].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    setRecentActivity(sorted.slice(0, 5));
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
};

useEffect(() => {
    fetchRecentActivity();
}, []);

const totalPoints = allRewards.reduce((sum, r) => sum + (r.total_points || 0), 0);
const bottlesRecycled = allRewards.length;
const co2Saved = (bottlesRecycled * 0.1763).toFixed(1); // kg per bottle, adjust to your real factor





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
            <Button
  variant="contained"
  color="primary"
  onClick={handleClaimReward}
>
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
       {[
  { label: 'Reward Points', value: totalPoints.toLocaleString(), icon: 'Star' },
  { label: 'Bottles Recycled', value: bottlesRecycled, icon: 'Bottle' },
  { label: 'CO₂ Saved', value: `${co2Saved} kg`, icon: 'Spa' },
  { label: 'Current Rank', value: '#12', icon: 'Trophy' }, // see note below
].map((stat) => {
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

<Stack spacing={2} sx={{ mt:3 }}>

{recentActivity.length > 0 && recentActivity.map((transaction)=>(

<Paper
key={transaction.reward_id}
sx={{
p:2,
borderRadius:3,
bgcolor:'grey.50'
}}
>

<Box
sx={{
display:'flex',
justifyContent:'space-between',
alignItems:'center'
}}
>

<Box>

<Typography fontWeight={700}>
  {transaction.reward_id}
</Typography>

<Typography
variant="body2"
color="text.secondary"
>
{transaction.product_name || "Bottle Recycled"} |
{new Date(transaction.created_at)
.toLocaleString()}
</Typography>

</Box>


<Box sx={{textAlign:'right'}}>

<Typography
variant="subtitle1"
fontWeight={700}
>
+{transaction.total_points} pts
</Typography>


<Typography
variant="caption"
color="success.main"
>
{transaction.claimed ? "Claimed" : "Available"}
</Typography>


</Box>

</Box>

</Paper>

))}

</Stack>
          </Paper>
        </Grid>
       
      </Grid>
    </Box>
  );
}
