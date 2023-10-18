import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../components/auth/Signin';

const UserRoute = () => {
  const isAuthenticated = getToken();
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default UserRoute;