import React from 'react';
import { Link } from "react-router-dom";
import { BiSolidUser } from "react-icons/bi";

const Email = ({ setNumber }) => {
  return (
    <div>
      <p className="text-[#fff] text-center">Don&apos;t annotate, let&apos;s annovate</p>
      <div className="my-6">
        <p className="text-[#fff] text-center">Hey there!</p>
        <p className="text-[#fff] text-center">Create an account with us</p>
      </div>
      <div
        className="mb-4 flex items-center gap-2 bg-[#000] border-[1px] border-[#F10191] py-2 px-6 text-[#fff] rounded-[20px]"
      >
        <BiSolidUser className="text-[#F10191]" />
        <input
          placeholder="E-mail"
          className="bg-transparent w-full border-none focus:outline-none"
        />
      </div>
      <button
        onClick={() => setNumber(1)}
        className="bg-[#F10191] w-full py-2 px-6 text-[#fff] rounded-[20px]"
      >Verify Email Address</button>
      <div className="my-6 flex justify-between items-center">
        <p className="text-[#fff]">Already have an account?</p>
        <Link className="underline text-[#F10191]" to="/auth/signin">Login here</Link>
      </div>
    </div>
  );
};

export default Email;