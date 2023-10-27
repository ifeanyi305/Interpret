import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../components/auth/Signin';
import Navbar from '../components/authNav/Navbar';
import Sidebar from '../components/authNav/Sidebar';

const UserRoute = ({ handleNotification, handleProfile, notifications, profile, closeModal }) => {
  const isAuthenticated = getToken();
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <Navbar
        handleNotification={handleNotification}
        handleProfile={handleProfile}
        notifications={notifications}
        profile={profile}
        closeModal={closeModal} />
      <section className='flex w-full'>
        <Sidebar />
        <div className="md:ml-[20%] container">
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default UserRoute;