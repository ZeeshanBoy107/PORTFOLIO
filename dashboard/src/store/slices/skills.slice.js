import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const skillSlice = createSlice({
  name: "skill",
  initialState: {
    skills: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    getAllSkillRequest: (state, action) => {
      state.loading = true;
    },
    getAllSkillSuccess: (state, action) => {
      state.loading = false;
      state.skills = action.payload;
    },
    getAllSkillFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addNewSkillRequest: (state, action) => {
      state.loading = true;
    },
    addNewSkillSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    addNewSkillFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSkillRequest(state, action) {
      state.loading = true;
    },
    deleteSkillSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    deleteSkillFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateSkillRequest(state, action) {
      state.loading = true;
    },
    updateSkillSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.skills = state.skills;
    },
    updateSkillFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearAllSkillErrors: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    clearAllSkillMessage: (state, action) => {
      state.loading = false;
      state.message = null;
    },
    resetSkillSlice: (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

export const getAllSkills = () => async (dispatch) => {
  dispatch(skillSlice.actions.getAllSkillRequest());
  try {
    const { data } = await axios.get(
      "https://portfolio-ip3n.onrender.com/api/v1/skill/getall",
      { withCredentials: true }
    );
    dispatch(skillSlice.actions.getAllSkillSuccess(data.skills));
    dispatch(skillSlice.actions.clearAllSkillErrors());
  } catch (error) {
    dispatch(skillSlice.actions.getAllSkillFailed(error.response.data.message));
  }
};

export const addNewSkill = (skillData) => async (dispatch) => {
  dispatch(skillSlice.actions.addNewSkillRequest());
  try {
    const { data } = await axios.post(
      "https://portfolio-ip3n.onrender.com/api/v1/skill/add",
      skillData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch(skillSlice.actions.addNewSkillSuccess(data.message));
    dispatch(skillSlice.actions.clearAllSkillErrors());
  } catch (error) {
    dispatch(skillSlice.actions.addNewSkillFailed(error.response.data.message));
    dispatch(clearAllSkillMessage());
  }
};

export const deleteSkill = (id) => async (dispatch) => {
  dispatch(skillSlice.actions.deleteSkillRequest());
  try {
    const { data } = await axios.delete(
      `https://portfolio-ip3n.onrender.com/api/v1/skill/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(skillSlice.actions.deleteSkillSuccess(data.message));
    dispatch(skillSlice.actions.clearAllSkillErrors());
  } catch (error) {
    dispatch(skillSlice.actions.deleteSkillFailed(error.response.data.message));
    dispatch(skillSlice.actions.clearAllSkillMessage());
  }
};

export const updateSkill = (id, proficiency) => async (dispatch) => {
  dispatch(skillSlice.actions.updateSkillRequest());
  try {
    const { data } = await axios.post(
      `https://portfolio-ip3n.onrender.com/api/v1/skill/update/${id}`,
      { proficiency },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(skillSlice.actions.updateSkillSuccess(data.message));
    dispatch(skillSlice.actions.clearAllSkillErrors());
  } catch (error) {
    console.log(error);
    dispatch(
      skillSlice.actions.updateSkillFailed(error?.response?.data?.message)
    );
    dispatch(skillSlice.actions.clearAllSkillMessage());
  }
};

export const clearAllSkillError = () => (dispatch) => {
  dispatch(skillSlice.actions.clearAllSkillErrors());
};

export const clearAllSkillMessage = () => (dispatch) => {
  dispatch(skillSlice.actions.clearAllSkillMessage());
};

export const resetSkillSlice = () => (dispatch) => {
  dispatch(skillSlice.actions.resetSkillSlice());
};

export default skillSlice.reducer;
