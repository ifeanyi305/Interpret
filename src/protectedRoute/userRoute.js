import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../components/auth/Signin';
import Navbar from '../components/authNav/Navbar';
import Sidebar from '../components/authNav/Sidebar';

const UserRoute = ({ handleNotification, handleProfile, notifications, profile }) => {
  const isAuthenticated = getToken();
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <Navbar
        handleNotification={handleNotification}
        handleProfile={handleProfile} />
      <section className='flex w-full'>
        <Sidebar />
        <div className="md:ml-[20%] px-[6%] container">
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default UserRoute;