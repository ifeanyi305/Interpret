import React, { useState, useEffect } from 'react';
import Annovate from "../../assets/dashboard/annovate_logo.png";
import { Link, useNavigate } from 'react-router-dom';
import "./styles/navbar.css";
import { MdNotifications } from "react-icons/md";
import { BiSolidUser } from "react-icons/bi";
import Upload from "../../assets/dashboard/export.png";
import greenElipses from "../../assets/dashboard/greenElipses.png";
import redElipses from "../../assets/dashboard/redElipses.png";
import reset from "../../assets/dashboard/reset.png";
import user from "../../assets/dashboard/user.png";
import logoutIcon from "../../assets/dashboard/logout.png";
import upgrade from "../../assets/dashboard/upgrade.png";
import settings from "../../assets/dashboard/settings.png";
import { signout } from '../../redux/auth/signin';
import { getToken } from '../../components/auth/Signin';
import { useDispatch } from 'react-redux';

const Navbar = ({ handleNotification, handleProfile,
  notifications, profile, modalActive, closeModal }) => {
  const style = {
    icon: "text-[#fff] text-[20px] hover:text-[#F10191B2]",
    list: "bg-[#F10191B2] verify_email rounded-[20px] cursor-pointer font-[700] text-[#fff] text-[14px]",
    cursor: "cursor-pointer hover:text-[#F10191]",
    list1: "flex items-center gap-4 rounded-[9px] option py-2 cursor-pointer",
    options: "text-[15px] font-[500] text-[#252525e6]",
  }

  const [selectedItem, setSelectedItem] = useState(0);
  const dispatch = useDispatch();
  const userDetails = getToken();
  const navigate = useNavigate();
  const userName = userDetails?.userName;
  const userEmail = userDetails?.email;

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  useEffect(() => {
    setSelectedItem(0);
  }, []);

  const handleLogout = () => {
    dispatch(signout());
    navigate('/auth/signin');
    window.location.reload();
  };

  return (
    <div>
      <nav className="bg-[#373564] blur_con navbar px-6 fixed w-full top-0">
        <div className="flex py-[4px] items-center justify-between gap-4">
          <div className="pt-2">
            <Link to="/"><img src={Annovate} alt="annovate logo" /></Link>
          </div>
          <ul className="flex items-center nav_lists gap-4 text-[14px] font-[500] text-white">
            <li
              onClick={() => handleItemClick(0)}
              className={selectedItem === 0 ? style.list : style.cursor}
            >
              <Link to="/">Projects</Link>
            </li>
            <li
              onClick={() => handleItemClick(1)}
              className={selectedItem === 1 ? style.list : style.cursor}
            >
              Universal
            </li>
            <li
              onClick={() => handleItemClick(2)}
              className={selectedItem === 2 ? style.list : style.cursor}
            >
              Explore
            </li>
            <li
              onClick={() => handleItemClick(3)}
              className={selectedItem === 3 ? style.list : style.cursor}
            >
              Contact
            </li>
          </ul>
          <ul className="flex items-center text-[14px] gap-6 text-white">
            <button onClick={handleNotification}>
              <li><MdNotifications className={style.icon} /></li>
            </button>
            <button onClick={handleProfile}>
              <li><BiSolidUser className={style.icon} /></li>
            </button>
          </ul>
        </div>
      </nav>
      <div className="">
        {
          modalActive && (
            <button onClick={closeModal} className="fixed w-screen h-screen top-0 bottom-0 left-0 closeModal_button">&apos;</button>
          )
        }
        {
          notifications ? (
            <div className="border-[#0000004d] user_notification fixed bg-[#fff] rounded-[9px] border-[0.3px] right-0 mt-[3%] mr-[2%] w-[65%] md:w-[25%]">
              <div>
                <div className="px-4 py-6">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex items-start gap-2">
                      <img src={greenElipses} className="mt-[7px]" alt="elipses" />
                      <img src={Upload} alt="upload" />
                      <div>
                        <p className="text-[15px] font-[500] text-[#000]">File Uploaded</p>
                        <p className="text-[14px] font-[400] text-[#7F7F7F]">Your file has been uploaded successfully</p>
                      </div>
                    </div>
                    <p className="text-[14px] font-[400] text-[#7F7F7F]">1 day</p>
                  </div>
                  <hr className="my-6" />
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex items-start gap-2">
                      <img src={redElipses} className="mt-[7px]" alt="elipses" />
                      <img src={reset} alt="upload" />
                      <div>
                        <p className="text-[15px] font-[500] text-[#000]">Password Reset</p>
                        <p className="text-[14px] font-[400] text-[#7F7F7F]">Your password has been restored successfully</p>
                      </div>
                    </div>
                    <p className="text-[14px] font-[400] text-[#7F7F7F]">4 days</p>
                  </div>
                </div>
                <div className="bg-[#373564] border-[#0000004d] border-[0.3px] w-full py-2 text-center text-[15px] text-[#fff] font-[500]">
                  <button type="button">View all</button>
                </div>
              </div>
            </div>
          ) : (<></>)
        }
        {
          profile ? (
            <div className="border-[#0000004d] user_profile fixed bg-[#fff] rounded-[9px] border-[0.3px] right-0 mt-[3%] mr-[2%] p-4">
              <div className="flex justify-between items-center gap-2">
                <img src={user} alt="user" />
                <div>
                  <p className="text-[15px] user_name font-[500] text-[#252525e6]">{userName}</p>
                  <p className="text-[13px] font-[500] text-[#999999]">{userEmail}</p>
                </div>
              </div>
              <hr className="my-2" />
              <ul>
                <Link to="/">
                  <li className={style.list1}>
                    <img src={logoutIcon} alt="logout" />
                    <p className={style.options}>Dashboard</p>
                  </li>
                </Link>
                <li className={style.list1}>
                  <img src={settings} alt='settings' />
                  <p className={style.options}>Profile Setting</p>
                </li>
                <li className={style.list1}>
                  <img src={upgrade} alt="upgrade" />
                  <p className={style.options}>Upgrade Plan</p>
                </li>
                <li className={style.list1} onClick={handleLogout}>
                  <img src={logoutIcon} alt="logout" />
                  <button
                    type="button"
                    className={style.options}
                  >Log out</button>
                </li>
              </ul>
            </div>
          ) : (<></>)
        }
      </div>
    </div>
  );
};

export default Navbar;
