import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../auth/signin';
import axios from 'axios';

const DELETE_PROJECT = "DELETE_PROJECT";
const userDetails = getToken();
const token = userDetails?.token;

const initialState = {
  projectDelete: [],
  loading: false,
  error: false,
}

export const deleteProject = createAsyncThunk(
  DELETE_PROJECT,
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      };
      const response = await axios.delete(`http://43.205.196.7:9000/api/projects/${id}`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const deleteProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${DELETE_PROJECT}/pending`:
      return {
        ...state,
        loading: true,
        error: false
      }
    case `${DELETE_PROJECT}/fulfilled`:
      return {
        ...state,
        projectDelete: action.payload,
        loading: false,
        error: false
      }
    case `${DELETE_PROJECT}/rejected`:
      return {
        ...state,
        loading: false,
        error: true
      }
    default:
      return { projectDelete: [], loading: false, error: false };
  }
}

export default deleteProjectReducer;
