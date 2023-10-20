import React from 'react';
import { Link } from "react-router-dom";
import "./styles/auth.css";
import Annovate from "../../assets/auth/AnnoVateLogo.png";
import Email from "./signupProcess/Email";

const Signup = () => {
  return (
    <div className="signup fixed w-full h-full px-[10%] py-[15%]">
      <div className="md:w-[30%]">
        <div>
          <h1 className="email_con">
            <Link to="/"><img src={Annovate} className="m-auto" alt="annovate logo" /></Link>
          </h1>
        </div>
        <div className=""><Email /></div>
      </div>
    </div>
  );
};

export default Signup;
