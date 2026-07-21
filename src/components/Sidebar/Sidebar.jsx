import { Box, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard, Login, HowToReg } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const items = [
  { label: 'Dashboard', path: '/dashboard/admin', icon: <Dashboard /> },
  { label: 'Login', path: '/login', icon: <Login /> },
  { label: 'Register', path: '/register', icon: <HowToReg /> },
];

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: 240, p: 2, bgcolor: 'background.paper', borderRadius: 3, boxShadow: 1 }}>
      <List>
        {items.map((item) => (
          <ListItemButton key={item.label} onClick={() => navigate(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
