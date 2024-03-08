import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../auth/signin';

const USER_PROJECT = "USER_PROJECT";
const userDetails = getToken();
const token = userDetails?.token;
const initialState = {
  projects: [],
  loading: false,
  error: false,
}

export const fetchProject = createAsyncThunk(
  USER_PROJECT,
  async (userId, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
      const response = await axios.get(`http://43.205.196.7:9000/api/projects/user/${userId}`, config);
      if (response.status === 200) {
        return response.data;
      }
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