import React from 'react';
import { BiSolidLockAlt } from "react-icons/bi";
import { BiSolidUser } from "react-icons/bi"

const Password = () => {
  const style = {
    con: "bg-[#000] mb-2 flex items-center gap-2 border-[1px] border-[#F10191] py-2 px-6 text-[#fff] rounded-[20px]",
    input: "bg-transparent w-full border-none focus:outline-none",
  }
  return (
    <div>
      <div className="my-6">
        <p className="text-[#fff]">Your email has been verified zainab@gmail.com</p>
      </div>
      <p className="text-[#fff] mb-4">Let&apos;s setup your account</p>
      <div className={style.con}>
        <BiSolidUser className="text-[#F10191]" />
        <input
          type="text"
          placeholder="Zainab"
          className={style.input}
        />
      </div>
      <div className={style.con}>
        <BiSolidLockAlt className="text-[#F10191]" />
        <input
          type="password"
          placeholder="password"
          className={style.input}
        />
      </div>
      <div className={style.con}>
        <BiSolidLockAlt className="text-[#F10191]" />
        <input
          type="password"
          placeholder="confirm-password"
          className={style.input}
        />
      </div>
      <button
        className="bg-[#F10191] w-full py-2 px-6 text-[#fff] rounded-[20px]"
      >Create Account</button>
    </div>
  );
};

export default Password;