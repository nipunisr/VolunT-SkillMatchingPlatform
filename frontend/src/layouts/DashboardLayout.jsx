import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBarCommon from '../components/NavBarCommon';
import Footer from '../components/Footer';

const DashboardLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBarCommon />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;