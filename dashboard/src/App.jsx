import React, { useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ManageSkills from './pages/ManageSkills';
import ManageTimeline from './pages/ManageTimeline';
import ManageProject from './pages/ManageProject';
import ViewProject from './pages/ViewProject';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';
import { getUser } from './store/slices/user.slice';
import "../src/App.css"
import { getAllMessages } from './store/slices/messages.slice';
import { getAllTimeline } from './store/slices/timeline.slice';
import { getAllSkills } from './store/slices/skills.slice';
import { getAllApplications } from './store/slices/application.slice';
import { getAllProjects } from './store/slices/project.slice';
import UpdateProject from './pages/UpdateProject';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getAllMessages());
    dispatch(getAllTimeline());
    dispatch(getAllSkills());
    dispatch(getAllApplications());
    dispatch(getAllProjects())
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/password/forgot" element={<ForgotPassword />}/>
        <Route path="/password/reset/:token" element={<ResetPassword />}/>
        <Route path="/manage/skills" element={<ManageSkills />}/>
        <Route path="/manage/timelines" element={<ManageTimeline />}/>
        
        <Route path="/manage/projects" element={<ManageProject />}/>
        <Route path="/view/project/:id" element={<ViewProject />}/>
        <Route path="/update/project/:id" element={<UpdateProject />}/> 
      </Routes>
      <ToastContainer position='bottom-right' theme='dark'/>
    </Router>
  );
}

export default App;