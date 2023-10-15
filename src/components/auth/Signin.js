import React from 'react';
import "./styles/auth.css";
import { Link } from "react-router-dom";
import { BiSolidUser } from "react-icons/bi";
import { BiSolidLockAlt } from "react-icons/bi";
import Annovate from "../../assets/auth/AnnoVateLogo.png";

const Signin = () => {
  const style = {
    con: "bg-[#000] mb-2 flex items-center gap-2 border-[1px] border-[#F10191] py-2 px-6 text-[#fff] rounded-[20px]",
    input: "bg-transparent w-full border-none focus:outline-none",
  }

  return (
    <div className="signin px-[10%] py-[15%]">
      <div className="w-[30%]">
        <div>
          <h1>
            <Link to="/"><img src={Annovate} alt="annovate logo" /></Link>
          </h1>
        </div>
        <div className="my-6">
          <p className="text-[#fff] text-[28px] font-extrabold">Welcome back!</p>
          <p className="text-[#fff]">Login to your account</p>
        </div>
        <div className={style.con}>
          <BiSolidUser className="text-[#F10191]" />
          <input
            type="text"
            placeholder="E-mail"
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
        <div className="flex mt-6 items-center justify-between">
          <button
            className="bg-[#F10191] py-2 px-6 text-[#fff] rounded-[20px]"
          >Login</button>
          <p className="text-[#fff] underline">Forgot password</p>
        </div>
        <div className="my-6">
          <p className="text-[#fff]">Don't have an account?
            <Link className="underline ml-[3px] text-[#F10191]" to="/auth/signup">Signup here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;