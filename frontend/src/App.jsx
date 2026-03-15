import React from 'react'
import { Routes, Route } from "react-router-dom"
import SignUp from './pages/SignUp.jsx'
import SignIn from './pages/SignIn'
import { Toaster } from "react-hot-toast";
import PublicRoute from './components/PublicRoute.jsx';
import Home from './pages/Home.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';

export const serverUrl = "http://localhost:8000/api"
const App = () => {
  return (
    <>
      <Routes>
        <Route
          path='/signup'
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>

          } />
        <Route
          path='/signin'
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          } />
        <Route
          path='/forgot-password'
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          } />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
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