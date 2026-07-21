import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';

export default function RoleGuard({ allowedRoles, children }) {
  const { user } = useAuth();
  const currentRole = user?.role;

  if (!allowedRoles.includes(currentRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
