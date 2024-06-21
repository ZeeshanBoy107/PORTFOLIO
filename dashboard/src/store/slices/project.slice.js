import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import skillsSlice from "./skills.slice";

const projectSlice = createSlice( {
  name: 'project',
  initialState: {
    loading: false,
    projects: [],
    error: null,
    message: null
  },
  reducers : {
    getAllProjectsRequest(state, action) {
      state.loading = true;
    },
    getAllProjectsSuccess(state, action) {
      state.loading = false;
      state.projects = action.payload;
    },
    getAllProjectsFailed(state, action) {
      state.loading = false;
    },
    addProjectsRequest(state, action) {
      state.loading = true;
    },
    addProjectsSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    addProjectsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteProjectsRequest(state, action) {
      state.loading = true;
    },
    deleteProjectsSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    deleteProjectsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateProjectsRequest(state, action) {
      state.loading = true;
    },
    updateProjectsSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    updateProjectsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearAllProjectError(state,action) {
      state.error = null;
    },
    clearAllProjectMessage(state,action) {
      state.message = null;
    },
    resetProjectSlice(state, action) {
      state.loading = false;
      state.error = null;
      state.message = null;
      state.projects = state.projects;
    }
  }
})

export const getAllProjects = () => async (dispatch) => {
  dispatch(projectSlice.actions.getAllProjectsRequest());
  try {
    const { data } = await axios.get("http://localhost:4000/api/v1/project/getall");
    dispatch(projectSlice.actions.getAllProjectsSuccess(data.projects));
    dispatch(projectSlice.actions.clearAllProjectError())
  } catch (error) {
    dispatch(projectSlice.actions.getAllProjectsFailed(error));
  }
}

export const addNewProject = (projectData) => async(dispatch) => {
  dispatch(projectSlice.actions.addProjectsRequest());
  
  try {
    const { data } = await axios.post(
      "http://localhost:4000/api/v1/project/add",
      projectData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch(projectSlice.actions.addProjectsSuccess(data.message));
    dispatch(projectSlice.actions.clearAllProjectError());
  } catch (error) {
    dispatch(projectSlice.actions.addProjectsFailed(error.response.data.message))
  }
}


export const deleteProject = (id) => async(dispatch) => {
  dispatch(projectSlice.actions.deleteProjectsRequest());
  
  try {
    const { data } = await axios.delete(
      `http://localhost:4000/api/v1/project/delete/${id}`,
      {
        withCredentials: true
      }
    );
    dispatch(projectSlice.actions.deleteProjectsSuccess(data.message));
    dispatch(projectSlice.actions.clearAllProjectError());
  } catch (error) {
    dispatch(projectSlice.actions.deleteProjectsFailed(error.response.data.message))
  }
}

export const updateProject = (id, projectData) => async (dispatch) => {
  dispatch(projectSlice.actions.updateProjectsRequest());
  try {
    const { data } = await axios.post(
      `http://localhost:4000/api/v1/project/update/${id}`,
      projectData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch(projectSlice.actions.updateProjectsSuccess(data.message))
    dispatch(projectSlice.actions.clearAllProjectError())
  } catch (error) {
    dispatch(projectSlice.actions.updateProjectsFailed(error.response.data.message))
  }
}

export const clearAllProjectError = () => (dispatch) => {
  dispatch(projectSlice.actions.clearAllProjectError());
}

export const clearAllProjectMessage = () => (dispatch) => {
  dispatch(projectSlice.actions.clearAllProjectMessage());
}

export const resetProjectSlice = () => (dispatch) => {
  dispatch(projectSlice.actions.resetProjectSlice());
}





export default projectSlice.reducer;