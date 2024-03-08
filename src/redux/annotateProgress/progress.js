import { createAsyncThunk } from '@reduxjs/toolkit';

const ANNOTATE_PROCESS = "ANNOTATE_PROCESS"

const initialState = {
  annotateProgress: {},
  progress: false,
  error: false,
}

export const updateProgress = createAsyncThunk(
  ANNOTATE_PROCESS,
  async (data, { rejectWithValue }) => {
    const { projectId, newKey } = data;

    try {
      let annotateProgress;
      const annotateProgressStr = localStorage.getItem("annotateProgress");
      annotateProgress = annotateProgressStr ? JSON.parse(annotateProgressStr) : {};
      if (Object.keys(annotateProgress)[0] && Object.keys(annotateProgress)[0] === projectId) {
        annotateProgress = {
          [projectId]: {
            ...annotateProgress?.[projectId], [newKey]: true
          }
        }
        localStorage.setItem("annotateProgress", JSON.stringify(annotateProgress));
      } else if (Object.keys(annotateProgress)[0] && Object.keys(annotateProgress)[0] !== projectId) {
        localStorage.removeItem("annotateProgress");
        annotateProgress = {
          [projectId]: {
            [newKey]: true
          }
        }
        localStorage.setItem("annotateProgress", JSON.stringify(annotateProgress));
      } else if (!Object.keys(annotateProgress)[0]) {
        annotateProgress = {
          [projectId]: {
            [newKey]: true
          }
        }
        localStorage.setItem("annotateProgress", JSON.stringify(annotateProgress));
      }
      return annotateProgress;
    } catch (error) {
      return rejectWithValue(error)
    }
  }
);

export default function progessReducer(state = initialState, action) {
  switch (action.type) {
    case `${ANNOTATE_PROCESS}/pending`:
      return { annotateProgress: {}, progress: true, error: false };
    case `${ANNOTATE_PROCESS}/fulfilled`:
      return { annotateProgress: { ...action.payload }, progress: false, error: false };
    case `${ANNOTATE_PROCESS}/rejected`:
      return { annotateProgress: {}, progress: false, error: true };
    default:
      return { ...state, annotateProgress: {}, progress: false, error: false };
  }
};
