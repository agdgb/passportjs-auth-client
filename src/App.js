import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import UserList from "./components/UserList";
import NotFound from "./pages/error/404";
import EditUser from "./pages/EditUser";
import ErrorPage from "./pages/ErrorPage";
import { Toaster } from "react-hot-toast";

const App = () =>
{
  return (
    <AuthProvider>
      <Router>
        <Toaster />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="register" element={<Register />} />
            <Route path="users" element={<UserList />} />
            <Route path="users/edit/:id" element={<EditUser />} />
          </Route>
          <Route />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
