import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const SIGN_UP = "SIGN_UP";

const initialState = {
  userInfo: [],
  loading: false,
  error: false,
}

export const signUp = createAsyncThunk(
  SIGN_UP,
  async ({ id, user }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        }
      };
      const response = await axios.put(`http://43.205.196.7:9000/api/users/${id}`, user, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${SIGN_UP}/pending`:
      return {
        ...state,
        loading: true,
        error: false
      }
    case `${SIGN_UP}/fulfilled`:
      return {
        ...state,
        userInfo: action.payload,
        loading: false,
        error: false
      }
    case `${SIGN_UP}/rejected`:
      return {
        ...state,
        loading: false,
        error: true
      }
    default:
      return { userInfo: [], loading: false, error: false };
  }
}

export default signupReducer;
