import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../components/auth/Signin';

const PublicRoute = () => {
  const isAuthenticated = getToken();
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default PublicRoute;