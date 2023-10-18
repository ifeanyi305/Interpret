import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const VERIFY_EMAIL = "VERIFY_EMAIL";

const initialState = {
  email: [],
  loading: false,
  error: false,
}

const setEmail = (emailId) => {
  localStorage.setItem('email', JSON.stringify({ emailId }));
}

export const getEmail = () => JSON.parse(localStorage.getItem('email'))?.emailId;

export const verifyEmail = createAsyncThunk(
  VERIFY_EMAIL,
  async (data, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      const response = await axios.post('https://annovate-backend-production.up.railway.app/api/users/', data, config);
      console.log(response);
      const userEmail = {
        emailId: response.data._id,
      };

      localStorage.setItem('email', JSON.stringify(userEmail));
      setEmail(userEmail);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const emailReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${VERIFY_EMAIL}/pending`:
      return {
        ...state,
        loading: true,
        error: false
      }
    case `${VERIFY_EMAIL}/fulfilled`:
      return {
        email: action.payload,
        loading: false,
        error: false
      }
    case `${VERIFY_EMAIL}/rejected`:
      return {
        ...state,
        loading: false,
        error: true
      }
    default:
      return { email: [], loading: false, error: false };
  }
}

export default emailReducer;