import React, { useEffect } from 'react'
import { Routes, Route } from "react-router-dom"
import SignUp from './pages/SignUp.jsx'
import SignIn from './pages/SignIn'
import { Toaster } from "react-hot-toast";
import PublicRoute from './hooks/PublicRoute.jsx';
import Home from './pages/Home.jsx';
import PrivateRoute from './hooks/PrivateRoute.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import { useDispatch, useSelector } from 'react-redux';
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
import Story from './pages/Story.jsx';
import getAllStories from './hooks/getAllStories.jsx';
import Messages from './pages/Messages.jsx';
import MessageArea from './pages/MessageArea.jsx';
import { io } from "socket.io-client"
import { setOnlineUsers, setSocket } from './redux/slices/socketSlice.js';
import getFollowingList from './hooks/getFollowingList.jsx';
import getPrevChatUsers from './hooks/getPrevChatUsers.jsx';
import Search from './pages/Search.jsx';

export const serverUrl = "http://localhost:8000/api"

const App = () => {

  getCurrentUser();
  getSuggestedusers();
  useGetAllPosts();
  getAllLoops();
  getAllStories();
  getFollowingList();
  getPrevChatUsers();

  const { userData } = useSelector(state => state.user);
  const { socket } = useSelector(state => state.socket);

  const dispatch = useDispatch();


  useEffect(() => {
    if (userData) {
      const socketIo = io("http://localhost:8000", {
        query: {
          userId: userData._id
        }
      });

      dispatch(setSocket(socketIo));

      socketIo.on('getOnlineUsers', (users) => {
        dispatch(setOnlineUsers(users));
      });

      return () => socketIo.close();
    }
  }, [userData]);

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

        <Route
          path="/story/:userName"
          element={
            <PrivateRoute>
              <Story />
            </PrivateRoute>
          }
        />

        <Route
          path="/messages"
          element={
            <PrivateRoute>
              <Messages />
            </PrivateRoute>
          }
        />

        <Route
          path="/messageArea"
          element={
            <PrivateRoute>
              <MessageArea />
            </PrivateRoute>
          }
        />

        <Route
          path="/search"
          element={
            <PrivateRoute>
              <Search />
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

export default App;


//6:07:51