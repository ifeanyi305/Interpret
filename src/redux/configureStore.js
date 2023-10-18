import { configureStore } from '@reduxjs/toolkit';
import signinReducer from "./auth/signin";
import projectReducer from "./project/createProject"

const store = configureStore({
  reducer: {
    auth: signinReducer,
    project: projectReducer,
  }
})

export default store;
