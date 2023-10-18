import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../../redux/auth/signup';
import { getEmail } from '../../../redux/auth/verifyEmail';
import { BiSolidLockAlt } from "react-icons/bi";
import { BiSolidUser } from "react-icons/bi";
import { useInputWithFocus } from '../../../App';

const Password = () => {
  const id = getEmail();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    userName: "",
    password: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const userInput = useInputWithFocus('');
  const passwordInput = useInputWithFocus('');
  const confirmPasswordInput = useInputWithFocus('');

  const createUser = (e) => {
    e.preventDefault();
    const user = {
      userName: userData.userName,
      password: userData.password,
    }

    dispatch(signUp({ id: id, user })).then((res) => {
      if (res.error) {
        console.log('error', res);
      } else {
        console.log('success', 'Account logged in successfully');
        navigate('/auth/signin');
      }
    })
  }

  const style = {
    con: "bg-[#000] mb-2 flex items-center gap-2 border-[1px] border-[#F10191] py-2 px-6 text-[#fff] rounded-[20px]",
    input: "bg-transparent w-full border-none focus:outline-none",
  }

  return (
    <div>
      <div className="mt-6 mb-2">
        <p className="text-[#fff] text-center">Your email has been verified zainab@gmail.com</p>
      </div>
      <p className="text-[#fff] mb-4 text-center">Let&apos;s setup your account</p>
      <form onSubmit={createUser}>
        <div className={style.con} style={userInput.containerStyle}>
          <BiSolidUser className="text-[#F10191]" />
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
          <BiSolidLockAlt className="text-[#F10191]" />
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
          <BiSolidLockAlt className="text-[#F10191]" />
          <input
            type="password"
            placeholder="confirm-password"
            required
            className={style.input}
            onFocus={confirmPasswordInput.handleFocus}
            onBlur={confirmPasswordInput.handleBlur}
          />
        </div>
        <button
          type="submit"
          className="bg-[#F10191] w-full mt-2 py-2 px-6 text-[#fff] rounded-[20px]"
        >Create Account</button>
      </form>
    </div>
  );
};

export default Password;