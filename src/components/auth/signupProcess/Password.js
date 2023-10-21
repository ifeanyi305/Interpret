import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import Annovate from "../../../assets/auth/AnnoVateLogo.png";
import { signUp } from '../../../redux/auth/signup';
import { ToastContainer } from 'react-toastify';
import { flash } from '../../../redux/flash/flash';
import 'react-toastify/dist/ReactToastify.css';
import { getEmail } from '../../../redux/auth/verifyEmail';
import { BiSolidLockAlt } from "react-icons/bi";
import { BiSolidUser } from "react-icons/bi";
import { useInputWithFocus } from '../../../App';

const Password = () => {
  const emailID = getEmail();
  const id = emailID?.emailId;
  const email = emailID?.email;
  const dispatch = useDispatch();
  const [buttonClicked, setButtonClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
  })

  const handleButtonClick = () => {
    setButtonClicked(!buttonClicked);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const userInput = useInputWithFocus('');
  const passwordInput = useInputWithFocus('');
  const confirmPasswordInput = useInputWithFocus('');

  const createUser = (e) => {
    e.preventDefault();
    if (userData.confirmPassword !== userData.password) {
      flash('error', 'password do not match')
      return;
    }
    const user = {
      userName: userData.userName,
      password: userData.password,
    }
    setLoading(true);

    dispatch(signUp({ id: id, user })).then((res) => {
      if (res.error) {
        flash('error', res?.payload?.data?.error);
        setLoading(false);
      } else {
        flash('success', 'Account logged in successfully');
        setLoading(false);
        navigate('/auth/signin');
      }
    })
  }

  const style = {
    con: "bg-[#000] mb-2 flex items-center gap-2 border-[1px] border-[#F10191] py-2 px-6 text-[#fff] rounded-[70px]",
    input: "bg-transparent w-full border-none focus:outline-none",
  }

  return (
    <div className="signin w-full h-full px-[10%] py-[9%]">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="md:w-[28%]">
        <div className="mb-4">
          <h1 className="email_con">
            <Link to="/"><img src={Annovate} className="m-auto" alt="annovate logo" /></Link>
          </h1>
        </div>
        <div className="mt-6 mb-4">
          <p className="text-[#fff] text-[16px] text-[#ffffffd9] font-[600] text-center">
            Your email address has been verified
          </p>
          <p className="text-[15px] text-[#ffffff] font-[500] text-center">{email}</p>
        </div>
        <p className="text-[#fff] text-[18px] text-[#ffffffd9] font-[600] mb-6 text-center">Let&apos;s setup your account</p>
        <form onSubmit={createUser}>
          <div className={style.con} style={userInput.containerStyle}>
            <BiSolidUser className="text-[#F10191] text-[29px]" />
            <input
              type="text"
              name="userName"
              value={userData.userName}
              placeholder="Zainab"
              required
              className={style.input}
              onChange={handleChange}
              onFocus={userInput.handleFocus}
              onBlur={userInput.handleBlur}
            />
          </div>
          <div className={style.con} style={passwordInput.containerStyle}>
            <BiSolidLockAlt className="text-[#F10191] text-[29px]" />
            <input
              type="password"
              name="password"
              value={userData.password}
              required
              placeholder="password"
              className={style.input}
              onChange={handleChange}
              onFocus={passwordInput.handleFocus}
              onBlur={passwordInput.handleBlur}
            />
          </div>
          <div className={style.con} style={confirmPasswordInput.containerStyle}>
            <BiSolidLockAlt className="text-[#F10191] text-[29px]" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="confirm-password"
              required
              value={userData.confirmPassword}
              onChange={handleChange}
              className={style.input}
              onFocus={confirmPasswordInput.handleFocus}
              onBlur={confirmPasswordInput.handleBlur}
            />
          </div>
          <button
            type="submit"
            onClick={handleButtonClick}
            className={`py-2 px-6 mt-2 text-[#fff] mt-2 rounded-[70px] w-full ${buttonClicked ? 'bg-[#f1019199]' : 'bg-[#f10191d9]'}`}
          >{loading ? (<>loading...</>) : (<>Create Account</>)}</button>
        </form>
      </div>
    </div>
  );
};

export default Password;