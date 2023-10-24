import React from 'react';
import { Link } from "react-router-dom";
import "./styles/auth.css";
import Annovate from "../../assets/auth/AnnoVateLogo.png";
import Email from "./signupProcess/Email";

const Signup = () => {
  return (
    <div className="signup w-full h-full px-[12%]">
      <div className="flex items-center h-full">
        <div className="md:w-[31%]">
          <div>
            <h1 className="email_con">
              <Link to="/"><img src={Annovate} className="m-auto" alt="annovate logo" /></Link>
            </h1>
          </div>
          <div className=""><Email /></div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
