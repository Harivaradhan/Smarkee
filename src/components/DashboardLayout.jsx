import { Box } from '@mui/material';
import Sidebar from './Sidebar/Sidebar.jsx';

export default function DashboardLayout({ children, SidebarComponent = Sidebar }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, minHeight: 'calc(100vh - 72px)', gap: 3, p: { xs: 2, md: 3 }, bgcolor: 'background.default' }}>
      <Box sx={{ display: { xs: 'none', md: 'block' }, width: 280, flexShrink: 0 }}>
        <SidebarComponent />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        {children}
      </Box>
    </Box>
  );
}
