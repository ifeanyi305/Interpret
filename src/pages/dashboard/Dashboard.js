import React from 'react';
import Sidebar from '../../components/authNav/Sidebar';
import Navbar from "../../components/authNav/Navbar";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="md:ml-[%]">
        <Navbar />
      </div>
    </div>
  );
};

export default Dashboard;