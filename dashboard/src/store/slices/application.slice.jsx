import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    applications: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    getAllApplicationRequest: (state, action) => {
      state.loading = true;
    },
    getAllApplicationSuccess: (state, action) => {
      state.loading = false;
      state.applications = action.payload;
    },
    getAllApplicationFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addNewApplicationRequest: (state, action) => {
      state.loading = true;
    },
    addNewApplicationSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    addNewApplicationFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteApplicationRequest(state, action) {
      state.loading = true;
    },
    deleteApplicationSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    deleteApplicationFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearAllApplicationErrors: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    clearAllApplicationMessage: (state, action) => {
      state.loading = false;
      state.message = null;
    },
    resetApplicationSlice: (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

export const getAllApplications = () => async (dispatch) => {
  dispatch(applicationSlice.actions.getAllApplicationRequest());
  try {
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/softwareapplication/getall",
      { withCredentials: true }
    );
    dispatch(applicationSlice.actions.getAllApplicationSuccess(data.softwareApps));
    dispatch(applicationSlice.actions.clearAllApplicationErrors());
  } catch (error) {
    dispatch(applicationSlice.actions.getAllApplicationFailed(error.response.data.message));
  }
};

export const addNewApplication = (applicationData) => async (dispatch) => {
  dispatch(applicationSlice.actions.addNewApplicationRequest());
  try {
    const { data } = await axios.post(
      "http://localhost:4000/api/v1/softwareapplication/add",
      applicationData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch(applicationSlice.actions.addNewApplicationSuccess(data.message));
    dispatch(applicationSlice.actions.clearAllApplicationErrors());
  } catch (error) {
    dispatch(applicationSlice.actions.addNewApplicationFailed(error.response.data.message));
    dispatch(clearAllApplicationMessage());
  }
};

export const deleteApplication = (id) => async (dispatch) => {
  dispatch(applicationSlice.actions.deleteApplicationRequest());
  try {
    const { data } = await axios.delete(
      `http://localhost:4000/api/v1/softwareapplication/delete/${id}`,
      {withCredentials: true}
    );
    dispatch(applicationSlice.actions.deleteApplicationSuccess(data.message));
    dispatch(applicationSlice.actions.clearAllApplicationErrors());
  } catch (error) {
    dispatch(applicationSlice.actions.deleteApplicationFailed());
  }
};

export const clearAllApplicationError = () => (dispatch) => {
  dispatch(applicationSlice.actions.clearAllApplicationErrors());
};

export const clearAllApplicationMessage = () => (dispatch) => {
  dispatch(applicationSlice.actions.clearAllApplicationMessage());
};

export const resetApplicationSlice = () => (dispatch) => {
  dispatch(applicationSlice.actions.resetApplicationSlice());
};

export default applicationSlice.reducer;
