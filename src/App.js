import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/home/Homepage';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import Dashboard from './pages/dashboard/Dashboard';
import CreateProject from './pages/dashboard/CreateProject';
import PublicRoute from './protectedRoute/publicRoute';
import UserRoute from './protectedRoute/userRoute';
import Password from './components/auth/signupProcess/Password';
import { getEmail } from "./redux/auth/verifyEmail";
import Annovate from './pages/dashboard/annovate/Annovate';

export const useInputWithFocus = (initialValue) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const containerStyle = {
    backgroundColor: `${isFocused ? '#000' : '#252525'}`,
    border: `2px solid ${isFocused ? '#F10191' : '#cacacab3'}`,
  };

  const projectStyle = {
    border: `2px solid ${isFocused ? '#F10191' : '#252525a8'}`,
  }

  return {
    isFocused,
    handleFocus,
    handleBlur,
    containerStyle,
    projectStyle,
  };
}

function App() {
  const emailID = getEmail();
  const id = emailID?.emailId;
  const [notifications, setNotifications] = useState(false);
  const [profile, setProfile] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [number, setNumber] = useState(0);
  const [selectedItem, setSelectedItem] = useState(0);

  const handleNotification = () => {
    setNotifications(!notifications);
    setProfile(false);
    setModalActive(true);
  }

  const closeModal = () => {
    setNotifications(false);
    setModalActive(false);
    setProfile(false);
  }

  const handleProfile = () => {
    setProfile(!profile);
    setNotifications(false);
    setModalActive(true);
  }

  return (
    <div className="App">
      {/* Public Route */}
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/auth/signin" element={<Signin />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path={`/auth/setup_acc/${id}`} element={<Password />} />
        </Route>
      </Routes>

      {/* User's Route */}
      <Routes>
        <Route element={<UserRoute
          handleNotification={handleNotification}
          handleProfile={handleProfile}
          profile={profile}
          modalActive={modalActive}
          closeModal={closeModal}
          notifications={notifications}
          imageFiles={imageFiles}
          imagesPreview={imagesPreview}
          number={number}
          setNumber={setNumber}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />}>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/dashboard/create_project" element={<CreateProject />} />
          <Route path="/annovate/:projectId" element={<Annovate
            imageFiles={imageFiles}
            imagesPreview={imagesPreview}
            setImageFiles={setImageFiles}
            setImagesPreview={setImagesPreview}
            number={number}
            setNumber={setNumber}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
