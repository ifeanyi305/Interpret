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

export const useInputWithFocus = (initialValue) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const containerStyle = {
    backgroundColor: '#000',
    border: `1px solid ${isFocused ? '#F10191' : '#fff'}`,
  };

  const projectStyle = {
    border: `1px solid ${isFocused ? '#F10191' : '#252525a8'}`,
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
        <Route element={<UserRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard/create_project" element={<CreateProject />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
