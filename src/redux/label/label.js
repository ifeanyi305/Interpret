import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../auth/signin';

const LABEL = "LABEL";
const userDetails = getToken();
const token = userDetails?.token;
const initialState = {
  label: [],
  loading: false,
  error: false,
}

export const addLabel = createAsyncThunk(
  LABEL,
  async ({ projectId, labels }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      };
      const response = await axios.put(`http://43.205.196.7:9000/api/projects/label/${projectId}`, labels, config);
      console.log("response", response);
      console.log("labels", labels);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const labelReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${LABEL}/pending`:
      return {
        ...state,
        loading: true,
        error: false
      }
    case `${LABEL}/fulfilled`:
      return {
        ...state,
        label: action.payload,
        loading: false,
        error: false
      }
    case `${LABEL}/rejected`:
      return {
        ...state,
        loading: false,
        error: true
      }
    default:
      return { label: [], loading: false, error: false };
  }
}

export default labelReducer;
