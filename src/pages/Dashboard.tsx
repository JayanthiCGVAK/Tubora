import React from 'react';


import { useAuth } from '../context/AuthContext';
import {Route, Navigate,Routes } from 'react-router-dom';
import ViewData from './ViewData';
import Sidebar from '../components/Sidebar';
import './../Dashboard.css';


const Dashboard: React.FC = () => {
    
    const { isAuthenticated } = useAuth();
      
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
 return (
    <div className="dashboard-container">
    <Sidebar />
    <div className="page-content">
        <Routes>
          <Route path="/" element={<ViewData />} />
          <Route path="/view" element={<ViewData />} />
        </Routes>
      </div>
  </div>

                
 )
};
export default Dashboard;