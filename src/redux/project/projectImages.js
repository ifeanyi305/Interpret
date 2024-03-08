import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../auth/signin';
import axios from 'axios';

const ADD_PROJECT_IMAGE = "ADD_PROJECT_IMAGE";
const userDetails = getToken();
const token = userDetails?.token;

const initialState = {
  projectImage: [],
  loading: false,
  error: false,
}

export const createProjectImage = createAsyncThunk(
  ADD_PROJECT_IMAGE,
  async (imageObjects, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(imageObjects),
      };
      const response = await axios.post('http://43.205.196.7:9000/api/images', imageObjects, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const projectImageReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ADD_PROJECT_IMAGE}/pending`:
      return {
        ...state,
        loading: true,
        error: false
      }
    case `${ADD_PROJECT_IMAGE}/fulfilled`:
      return {
        projectImage: action.payload,
        loading: false,
        error: false
      }
    case `${ADD_PROJECT_IMAGE}/rejected`:
      return {
        ...state,
        loading: false,
        error: true
      }
    default:
      return { projectImage: [], loading: false, error: false };
  }
}

export default projectImageReducer;
