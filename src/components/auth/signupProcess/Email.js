import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { flash } from '../../../redux/flash/flash';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { verifyEmail } from '../../../redux/auth/verifyEmail';
import { BiSolidUser } from "react-icons/bi";

const Email = () => {
  const [signupModal, setSignupModal] = useState(false)
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
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

  const closeModal = () => {
    setSignupModal(false);
    setEmail("");
  }

  const containerStyle = {
    backgroundColor: `${isFocused ? '#000' : '#252525'}`,
    border: `2px solid ${isFocused ? '#F10191' : '#cacacab3'}`,
  };

  const verifyEmailAddress = (e) => {
    e.preventDefault();
    const data = {
      email: email,
    }
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    setLoading(true);

    if (!email.match(emailPattern)) {
      setLoading(false);
      flash('warning', 'Invalid email address');
      return;
    }

    dispatch(verifyEmail(data)).then((res) => {
      if (res?.error) {
        setLoading(false);
        let errorMessage = "An error occurred";
        if (res?.error) {
          errorMessage = res?.error.message;
        }
      
        flash('error', errorMessage);
      } else {
        setLoading(false);
        flash('success', "email sent for verification");
        setSignupModal(!signupModal);
      }
    }).finally(() => {
      setLoading(false);
    });
    setButtonClicked(!buttonClicked);
  }

  return (
    <div>
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
      {
        signupModal ? (
          <div className="w-full">
            <div className="bg-[#AAA2BDBF] px-10 py-8 email_sent_con w-[70%] md:w-[40%] md:left-[30%] m-auto fixed rounded-[20px]">
              <div className="flex justify-end">
                <button type="button" onClick={closeModal}>
                  <AiOutlineClose className="text-[20px] font-[900] text-[#211F53]" />
                </button>
              </div>
              <div className="mt-[4px] px-[3%]">
                <h1 className="text-[#211F53] text-center text-[23px] font-[700] mb-8">Thank you for considering us!</h1>
                <p className="text-[#FFFFFF] mb-4 text-[14px] text-center font-[600]">
                  A confirmation mail has been
                  sent to your Email address, kindly follow
                  the instructions provided in that mail
                  to register yourself in AnnoVate.
                </p>
                <p className="mt-6 text-[#FFFFFF] text-center text-[12px] mb-[7%] font-[600]">
                  If you&apos;ve not received any mail from AnnoVate,
                  <button
                    type="button"
                    onClick={verifyEmailAddress}
                    className="text-[#211f53] ml-[3px] underline">Click here!</button>
                </p>
              </div>
            </div>
          </div>
        ) : (<></>)
      }
      <div className="email_con">
        <p className="text-[#CACACA] text-[17px] font-[700] text-center mb-2 mt-[4px]">Don&apos;t annotate, let&apos;s annovate</p>
        <div className="mb-8 mt-[11%]">
          <p className="text-[#CACACA] font-[500] text-[20px] text-center">Hey there!</p>
          <p className="text-[#fff] text-center text-[18px] font-[500]">Create an account with us</p>
        </div>
        <form onSubmit={verifyEmailAddress}>
          <div
            className="mb-4 flex items-center gap-2 py-2 px-6 rounded-[70px]"
            style={containerStyle}
          >
            <BiSolidUser className="text-[#F10191] text-[30px]" />
            <input
              placeholder="E-mail"
              className="bg-transparent text-[#CACACA] font-[700] text-[15px] w-full border-none focus:outline-none"
              value={email}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
          <button
            onClick={verifyEmailAddress}
            className="py-2 verify_email px-6 text-[#fff] font-[700] text-[16px] mb-2 rounded-[70px] w-full bg-[#f10191d9]"
          >{loading ? (<>loading...</>) : (<>Verify Email Address</>)}</button>
        </form>
        <div className="my-8 flex justify-between items-center">
          <p className="text-[#fff] font-[500] text-[16px]">Already have an account?</p>
          <Link className="underline text-[#f10191d9]" to="/auth/signin">Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default Email;