import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import {
  Dashboard,
  CardGiftcard,
  History,
  Person,
  Logout,
  EmojiEvents,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';
import { leaderboard } from '../../pages/UserDashboard/userData.js';

const items = [
  { label: 'Dashboard', path: '/user/dashboard', icon: <Dashboard /> },
  { label: 'Rewards', path: '/user/rewards', icon: <CardGiftcard /> },
  { label: 'Scan History', path: '/user/history', icon: <History /> },
  { label: 'Profile', path: '/user/profile', icon: <Person /> },
];

export default function UserSidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <Box sx={{ width: 280, p: 2, bgcolor: 'background.paper', borderRadius: 3, boxShadow: 1 }}>
      <List>
        {items.map((item) => (
          <ListItemButton key={item.label} onClick={() => navigate(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
        <ListItemButton onClick={logout} sx={{ mt: 2 }}>
          <ListItemIcon><Logout /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ p: 1.5, borderRadius: 3, bgcolor: 'grey.50' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
          <EmojiEvents color="primary" fontSize="small" />
          <Typography variant="subtitle1" fontWeight={700}>
            Leaderboard
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {leaderboard.map((entry) => (
            <Box key={entry.rank} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" fontWeight={700} color="primary.main">
                #{entry.rank} {entry.name}
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {entry.points} pts
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
