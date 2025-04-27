import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBarNav from '../components/nav/SideBarNav';
import DesktopHeader from '../components/snippets/DesktopHeader';
import Styles from '../styles/styles';

const AppLayout: React.FC = () => {
  return (
    <div className="relative min-h-screen w-screen">
      {/* HEADER */}
      <div className="fixed top-0 left-0 w-full z-40">
        <DesktopHeader />
      </div>

      {/* PAGE LAYOUT */}
      <div className={`${Styles.page} flex flex-col md:flex-row pt-[56px]`}>
        {/* SIDEBAR */}
        <div className="w-full md:w-[216px] bg-white border-r border-slate-200 pl-4 pt-4 sticky top-[56px] md:h-[calc(100vh-56px)]">
          <SideBarNav />
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 p-10 pt-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
