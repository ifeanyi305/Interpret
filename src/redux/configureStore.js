import { configureStore } from '@reduxjs/toolkit';
import signinReducer from "./auth/signin";
import projectReducer from "./project/createProject";
import userProjectReducer from "./project/userProject";

const store = configureStore({
  reducer: {
    auth: signinReducer,
    project: projectReducer,
    userProject: userProjectReducer,
  }
})

export default store;
