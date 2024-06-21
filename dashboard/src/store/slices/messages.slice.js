
import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    loading: false,
    messages: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllMessagesRequest(state, action) {
      state.loading = true;
      state.messages = [];
      state.error = null;
    },
    getAllMessagesSuccess(state, action) {
      state.loading = false;
      state.messages = action.payload;
    },
    getAllMessagesFailed(state, action) {
      state.loading = false;
      state.messages = state.message;
      state.error = action.payload;
    },
    deleteMessageRequest(state, action) {
      state.loading = true;
      state.message = null
      state.error = null;
    },
    deleteMessageSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    deleteMessageFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    resetMessageSlice(state, action) {
      state.error = null;
      state.messages = state.messages;
      state.error = null
    },
    clearAllErrors(state, action) {
      state.error = null;
      state.loading = false;
    },

    clearAllMessages(state, action) {
      state.message = null;
      state.loading = null;
    }
  }
});

export const getAllMessages = () => async (dispatch) => {
  dispatch(messageSlice.actions.getAllMessagesRequest());
  try {
    const { data } = await axios.get("http://localhost:4000/api/v1/message/getall", {withCredentials: true})

    dispatch(messageSlice.actions.getAllMessagesSuccess(data.messages));
    dispatch(messageSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(messageSlice.actions.getAllMessagesFailed(error.response.data.message));
  }
}

export const deleteMessage = (id) => async  (dispatch) => {
  dispatch(messageSlice.actions.deleteMessageRequest());
  try {
    const {data} = await axios.delete(
      `http://localhost:4000/api/v1/message/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(messageSlice.actions.deleteMessageSuccess(data.message));
    dispatch(messageSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(messageSlice.actions.deleteMessageFailed(error.response.data.message))
  }
}

export const clearAllMessageError = () => (dispatch) => {
  dispatch(messageSlice.actions.clearAllErrors());
}
export const clearAllMessageMessage = () => (dispatch) => {
  dispatch(messageSlice.actions.clearAllMessages());
}

export const resetMessageSlice = () => (dispatch) => {
  dispatch(messageSlice.actions.resetMessageSlice());
}





export default messageSlice.reducer;