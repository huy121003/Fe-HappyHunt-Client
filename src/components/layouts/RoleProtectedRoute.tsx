import { useAppSelector } from '@/redux/reduxHook';
import React from 'react';
import { Navigate } from 'react-router-dom';
interface RoleProtectedRouteProps {
  children: React.ReactNode;
}

const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({
  children,
}) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const userRole = useAppSelector((state) => state.auth?.account?.role?.name);

  if (!isAuthenticated || !userRole) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default RoleProtectedRoute;
