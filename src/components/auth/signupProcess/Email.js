import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { verifyEmail } from '../../../redux/auth/verifyEmail';
import { BiSolidUser } from "react-icons/bi";

const Email = () => {
  const [signupModal, setSignupModal] = useState(false)
  const [email, setEmail] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const containerStyle = {
    backgroundColor: '#000',
    border: `1px solid ${isFocused ? '#F10191' : '#fff'}`,
  };

  const verifyEmailAddress = (e) => {
    e.preventDefault();
    const data = {
      email: email,
    }
    dispatch(verifyEmail(data)).then((res) => {
      if (res.error) {
        console.log('error', res);
      } else {
        console.log('success', res);
      }
    })
    setEmail("");
    setSignupModal(!signupModal)
    setButtonClicked(!buttonClicked);
  }

  return (
    <div>
      <div className="email_con">
        <p className="text-[#fff] text-center">Don&apos;t annotate, let&apos;s annovate</p>
        <div className="my-6">
          <p className="text-[#fff] text-center">Hey there!</p>
          <p className="text-[#fff] text-center">Create an account with us</p>
        </div>
        <form onSubmit={verifyEmailAddress}>
          <div
            className="mb-4 flex items-center gap-2 bg-[#000] py-2 px-6 text-[#fff] rounded-[20px]"
            style={containerStyle}
          >
            <BiSolidUser className="text-[#F10191]" />
            <input
              placeholder="E-mail"
              className="bg-transparent w-full border-none focus:outline-none"
              value={email}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
          <button
            onClick={verifyEmailAddress}
            className={`py-2 px-6 text-[#fff] rounded-[20px] w-full ${buttonClicked ? 'bg-[#f1019199]' : 'bg-[#f10191d9]'}`}
          >Verify Email Address</button>
        </form>
        <div className="my-6 flex justify-between items-center">
          <p className="text-[#fff]">Already have an account?</p>
          <Link className="underline text-[#f10191d9]" to="/auth/signin">Login here</Link>
        </div>
      </div>
      {
        signupModal ? (
          <div className="bg-[#AAA2BDBF] email_sent_con w-[70%] md:w-[40%] fixed top-[20%] left-[15%] md:left-[30%] rounded-[20px] px-[5%] py-4">
            <h1 className="text-[#211F53] text-center text-[23px] font-[700] my-6">Thank you for considering us</h1>
            <p className="text-[#FFFFFF] text-[14px] text-center font-[600]">
              A confirmation mail has been
              sent to your Email address, kindly follow
              the instructions provided in that mail
              to register yourself in AnnoVate.
            </p>
            <p className="my-4 text-[#FFFFFF] text-center text-[12px] my-6 font-[600]">
              If you&apos;ve not received any mail from AnnoVate,
              <button type="button" className="text-[#211f53] ml-[3px] underline">Click here!</button>
            </p>
          </div>
        ) : (<></>)
      }
    </div>
  );
};

export default Email;