import React, { useEffect } from 'react'
import { Routes, Route } from "react-router-dom"
import SignUp from './pages/SignUp.jsx'
import SignIn from './pages/SignIn'
import { Toaster } from "react-hot-toast";
import PublicRoute from './hooks/PublicRoute.jsx';
import Home from './pages/Home.jsx';
import PrivateRoute from './hooks/PrivateRoute.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import { useDispatch } from 'react-redux';
import axios from "axios";
import { setUserData } from './redux/slices/userSlice.js';
import getCurrentUser from './hooks/getCurrentUser.jsx';
import getSuggestedusers from './hooks/getSuggestedusers.jsx';
import Profile from './pages/Profile.jsx';
import EditProfile from './pages/EditProfile.jsx';
import Upload from './pages/Upload.jsx';
import useGetAllPosts from './hooks/getAllPosts.jsx';
import Loops from './pages/Loops.jsx';
import getAllLoops from './hooks/getAllLoops.jsx';


export const serverUrl = "http://localhost:8000/api"

const App = () => {

  getCurrentUser();
  getSuggestedusers();
  useGetAllPosts();
  getAllLoops();


  return (
    <>
      <Routes>
        <Route
          path='/signup'
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />

        <Route
          path='/signin'
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />

        <Route
          path='/forgot-password'
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile/:userName"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/editprofile"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />

        <Route
          path="/upload"
          element={
            <PrivateRoute>
              <Upload />
            </PrivateRoute>
          }
        />

        <Route
          path="/loops"
          element={
            <PrivateRoute>
              <Loops />
            </PrivateRoute>
          }
        />

      </Routes>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#0f0f0f",
            color: "#fff",
            borderRadius: "12px",
            padding: "12px 16px",
            fontSize: "14px",
          },
        }}
      />
    </>
  )
}

export default App