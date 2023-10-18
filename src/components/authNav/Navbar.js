import React from 'react';
import Annovate from "../../assets/dashboard/logoAnnovate.png";
import "./styles/navbar.css";
import { MdNotifications } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { BiSolidUser } from "react-icons/bi";

const Navbar = () => {
  const style = {
    icon: "text-[#fff] w-[16px]"
  }

  return (
    <nav className="bg-[#373564] navbar px-6 fixed w-full top-0">
      <div className="flex py-[4px] items-center justify-between gap-4">
        <div className="pt-2">
          <img src={Annovate} alt="annovate logo" />
        </div>
        <ul className="flex items-center nav_lists text-[14px] font-[500] text-white">
          <li>Projects</li>
          <li>Universal</li>
          <li>Explore</li>
          <li>Contact</li>
        </ul>
        <ul className="flex items-center text-[14px] gap-6 text-white">
          <li><BiSearch className={style.icon} /></li>
          <li><MdNotifications className={style.icon} /></li>
          <li><BiSolidUser className={style.icon} /></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;