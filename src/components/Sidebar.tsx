// src/components/Sidebar.tsx
import React from 'react';
import {  NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  
  return (
    <div className="sidebar">
      <NavLink to="/dashboard/view">View Data</NavLink>
    
    </div>
  );
};

export default Sidebar;