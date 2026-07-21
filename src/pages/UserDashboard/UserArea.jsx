import { Outlet } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout.jsx';
import UserSidebar from '../../components/Sidebar/UserSidebar.jsx';

export default function UserArea() {
  return (
    <DashboardLayout SidebarComponent={UserSidebar}>
      <Outlet />
    </DashboardLayout>
  );
}
