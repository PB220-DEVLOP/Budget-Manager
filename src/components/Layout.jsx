import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex">
      <Navbar />
      <div className="flex-grow p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
