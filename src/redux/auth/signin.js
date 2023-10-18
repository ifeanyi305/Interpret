import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const SIGN_IN = 'SIGN_IN';
const SIGN_IN_URL = `https://annovate-backend-production.up.railway.app/api/auth/`;
const SIGN_OUT = 'SIGN_OUT';

const initialState = {
  userData: [],
  loading: false,
  error: false,
}

const setToken = (token) => {
  localStorage.setItem('user', JSON.stringify({ token }));
}

const removeToken = () => {
  localStorage.removeItem('user');
}

export const getToken = () => JSON.parse(localStorage.getItem('user'))?.token;

export const signin = createAsyncThunk(
  SIGN_IN,
  async (user, { rejectWithValue }) => {
    try {
      const data = await axios.post(SIGN_IN_URL, user, {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const userDetails = {
        token: data.token,
      };

      localStorage.setItem('user', JSON.stringify(userDetails));
      setToken(userDetails);

      return { userData: data.token };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const signout = createAsyncThunk(
  SIGN_OUT,
  async (_, { dispatch }) => {
    removeToken();
    localStorage.removeItem('current');
    dispatch({ type: 'CLEAR_USER_DATA' });
  }
);

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${SIGN_IN}/pending`:
      return { userData: [], loading: true, error: false };
    case `${SIGN_IN}/fulfilled`:
      return {
        userData: action.payload,
        loading: false,
        error: false,
      };
    case `${SIGN_IN}/rejected`:
      return { userData: [], loading: false, error: true };
    default:
      return { ...state, userData: [], loading: false, error: false };
  }
};

export default authReducer;

