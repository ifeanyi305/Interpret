import React, { useState } from 'react';
import { BiSolidLockAlt } from "react-icons/bi";
import { BiSolidUser } from "react-icons/bi";
import { useInputWithFocus } from '../../../App';

const Password = () => {
  const userInput = useInputWithFocus('');
  const passwordInput = useInputWithFocus('');
  const confirmPasswordInput = useInputWithFocus('');

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
      <div className={style.con} style={userInput.containerStyle}>
        <BiSolidUser className="text-[#F10191]" />
        <input
          type="text"
          placeholder="Zainab"
          className={style.input}
          onFocus={userInput.handleFocus}
          onBlur={userInput.handleBlur}
        />
      </div>
      <div className={style.con} style={passwordInput.containerStyle}>
        <BiSolidLockAlt className="text-[#F10191]" />
        <input
          type="password"
          placeholder="password"
          className={style.input}
          onFocus={passwordInput.handleFocus}
          onBlur={passwordInput.handleBlur}
        />
      </div>
      <div className={style.con} style={confirmPasswordInput.containerStyle}>
        <BiSolidLockAlt className="text-[#F10191]" />
        <input
          type="password"
          placeholder="confirm-password"
          className={style.input}
          onFocus={confirmPasswordInput.handleFocus}
          onBlur={confirmPasswordInput.handleBlur}
        />
      </div>
      <button
        className="bg-[#F10191] w-full mt-2 py-2 px-6 text-[#fff] rounded-[20px]"
      >Create Account</button>
    </div>
  );
};

export default Password;