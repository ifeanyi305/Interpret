import React from 'react';
import Navbar from './Navbar';
import { FiExternalLink } from "react-icons/fi";

const Sidebar = () => {
  const projects = [
    {
      name: "Hello one",
    },
    {
      name: "Hello two",
    },
    {
      name: "Hello three",
    }
  ]

  return (
    <div>
      <Navbar />
      <div className="px-[4%] bg-[#373564] md:w-[23%] h-full fixed overflow-y-auto scrollbar">
        <div className="mb-4 pt-[80px]">
          <p className="text-[#fff] mb-[15px] text-[15px] font-[700]">Recent Projects</p>
          <div>
            {
              projects.map((project, index) => (
                <div key={index}>
                  <p className="mb-[10px] text-[#fff] border-[1px] border-[#fff] py-[3px] px-6 rounded-[4px]">{project.name}</p>
                </div>
              ))
            }
          </div>
        </div>
        <div className="flex justify-center my-6">
          <button type="button" className="text-[#fff] bg-[#F10191B2] py-[3px] px-6 rounded-[20px]">See more</button>
        </div>
        <div>
          <div className="flex mb-[12px] items-center gap-2">
            <p className="text-[#fff] text-[15px] font-[700]">Quick Tips</p>
            <FiExternalLink className="text-[#fff] text-[20px] font-[700]" />
          </div>
          <div className="my-6">
            <p className="text-[#fff] mb-[6px] text-[15px] font-[700]">Settings</p>
            <p className="ml-[12px] text-white">Account Settings</p>
          </div>
          <div>
            <p className="text-[#fff] mb-[6px] text-[15px] font-[700]">Resources</p>
            <ul className="ml-[12px] text-white">
              <li>Getting started</li>
              <li className="py-2">Tutorials</li>
              <li>Public dataset & models</li>
              <li className="pt-2">Library</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;