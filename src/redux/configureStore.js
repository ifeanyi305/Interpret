import { configureStore } from '@reduxjs/toolkit';
import signinReducer from "./auth/signin";
import emailReducer from "./auth/verifyEmail";
import signupReducer from "./auth/signup";
import projectReducer from "./project/createProject";
import userProjectReducer from "./project/userProject";

const store = configureStore({
  reducer: {
    auth: signinReducer,
    verify_email: emailReducer,
    signup: signupReducer,
    project: projectReducer,
    userProject: userProjectReducer,
  }
})

export default store;
