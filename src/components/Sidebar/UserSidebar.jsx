import { Box, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import {
  Dashboard,
  CardGiftcard,
  History,
  Person,
  Logout,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';

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
    </Box>
  );
}
