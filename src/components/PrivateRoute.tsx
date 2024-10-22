import React, { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface PrivateRouteProps {
  // allowedRoles: string[];
    children : ReactNode;
}

// export const PrivateRoute: React.FC<PrivateRouteProps> = ({children}) => {
  export function PrivateRoute(props: PrivateRouteProps): React.ReactElement {
    const {children} = props;
    // export const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
  const { user, role } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

//   if (!allowedRoles.includes(role || '')) {
//     return <Navigate to="/unauthorized" replace />;
//   }

  // return <Outlet />;
  return <div>{children}</div>;
};

