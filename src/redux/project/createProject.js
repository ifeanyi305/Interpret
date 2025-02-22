import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../auth/signin';
import axios from 'axios';

const CREATE_PROJECT = "CREATE_PROJECT";
const userDetails = getToken();
const token = userDetails?.token;
const initialState = {
  project: [],
  loading: false,
  error: false,
}

export const createProject = createAsyncThunk(
  CREATE_PROJECT,
  async (data, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      const response = await axios.post('http://43.205.196.7:9000/api/projects/', data, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${CREATE_PROJECT}/pending`:
      return {
        ...state,
        loading: true,
        error: false
      }
    case `${CREATE_PROJECT}/fulfilled`:
      return {
        project: action.payload,
        loading: false,
        error: false
      }
    case `${CREATE_PROJECT}/rejected`:
      return {
        ...state,
        loading: false,
        error: true
      }
    default:
      return { project: [], loading: false, error: false };
  }
}

export default projectReducer;