import { configureStore } from '@reduxjs/toolkit';
import signinReducer from "./auth/signin";
import emailReducer from "./auth/verifyEmail";
import signupReducer from "./auth/signup";
import projectReducer from "./project/createProject";
import userProjectReducer from "./project/userProject";
import deleteProjectReducer from './project/deleteProject';
import labelReducer from './label/label';
import annotateProgressReducer from './annotateProgress/progress';
import projectImageReducer from './project/projectImages';

const store = configureStore({
  reducer: {
    auth: signinReducer,
    verify_email: emailReducer,
    signup: signupReducer,
    project: projectReducer,
    userProject: userProjectReducer,
    projectDelet: deleteProjectReducer,
    projectLabel: labelReducer,
    annotateProgress: annotateProgressReducer,
    imageProject: projectImageReducer,
  }
})

export default store;
