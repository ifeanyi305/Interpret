import React, {useState} from 'react';
import { Link } from "react-router-dom";
import "./styles/auth.css";
import Annovate from "../../assets/auth/AnnoVateLogo.png";
import Email from "./signupProcess/Email";
import Password from "./signupProcess/Password";

const Signup = () => {
  const [number, setNumber] = useState(0);
  const signinForm = () => {
    switch (number) {
      case 0:
        return <Email setNumber={setNumber} />
      case 1:
        return <Password />
      default:
        return <Email />
    }
  }

  return (
    <div className="signup fixed w-full h-full px-[10%] py-[15%]">
      <div className="md:w-[30%]">
        <div>
          <h1 className="email_con">
            <Link to="/"><img src={Annovate} className="m-auto" alt="annovate logo" /></Link>
          </h1>
        </div>
        <div className="">{signinForm()}</div>
      </div>
    </div>
  );
};

export default Signup;