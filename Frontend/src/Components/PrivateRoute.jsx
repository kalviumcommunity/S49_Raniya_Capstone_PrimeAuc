import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const isAuthenticated = Boolean(localStorage.getItem('token'));
  console.log('Is Authenticated:', isAuthenticated); // Debugging line
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
