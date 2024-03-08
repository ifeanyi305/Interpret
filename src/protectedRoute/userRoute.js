import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../components/auth/Signin';
import Navbar from '../components/authNav/Navbar';
import Sidebar from '../pages/dashboard/annovate/annovateProcess/Sidebar';

const UserRoute = ({
  handleNotification, handleProfile,
  notifications, profile, closeModal,
  imageFiles, imagesPreview, number, setNumber,
  selectedItem, setSelectedItem, modalActive
}) => {
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
        modalActive={modalActive}
        closeModal={closeModal}
      />
      <section className='flex w-full'>
        <Sidebar
          imageFiles={imageFiles}
          imagesPreview={imagesPreview}
          number={number}
          setNumber={setNumber}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
        <div className="md:ml-[20%] container">
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default UserRoute;
