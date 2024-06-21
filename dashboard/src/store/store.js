import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice";
import forgotResetPasswordReducer from "./slices/forgotResetPassword.slice";
import messagesReducer from "./slices/messages.slice";
import timelineReducer from "./slices/timeline.slice";
import skillsReducer from "./slices/skills.slice";
import applicationReducer from "./slices/application.slice";
import projectReducer from "./slices/project.slice";

export const store = configureStore({
  reducer:{
    user: userReducer,
    forgotPassword: forgotResetPasswordReducer,
    messages: messagesReducer,
    timeline: timelineReducer,
    skill: skillsReducer,
    application: applicationReducer,
    project: projectReducer
  }
})