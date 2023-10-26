import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const USER_PROJECT = "USER_PROJECT";

const initialState = {
  projects: [],
  loading: false,
  error: false,
}

export const fetchProject = createAsyncThunk(
  USER_PROJECT,
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://annovate-backend-production.up.railway.app/api/projects/user/${userId}`);
      if (response.status === 200) {
        return response.data;
      }
      console.log("response", response);
      return response.error
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const userProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${USER_PROJECT}/pending`:
      return {
        ...state,
        loading: true,
        error: false
      }
    case `${USER_PROJECT}/fulfilled`:
      return {
        projects: action.payload,
        loading: false,
        error: false
      }
    case `${USER_PROJECT}/rejected`:
      return {
        ...state,
        loading: false,
        error: true
      }
    default:
      return { projects: [], loading: false, error: false };
  }
}

export default userProjectReducer;