import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./styles/auth.css";
import { ToastContainer } from 'react-toastify';
import { flash } from '../../redux/flash/flash';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { useInputWithFocus } from '../../App';
import { BiSolidUser } from "react-icons/bi";
import { BiSolidLockAlt } from "react-icons/bi";
import Annovate from "../../assets/auth/AnnoVateLogo.png";

const setToken = (token) => {
  localStorage.setItem('user', JSON.stringify({ token }));
}

export const getToken = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr).token : null;
};

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const emailInput = useInputWithFocus('');
  const passwordInput = useInputWithFocus('');

  const navigate = useNavigate();

  const handleButtonClick = () => {
    setButtonClicked(!buttonClicked);
  };

  const signinUser = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    setLoading(true);
    if (!navigator.onLine) {
      flash("warning", "You are currently offline. Please check your internet connection");
      setEmail("");
      setPassword("");
      setLoading(false);
      return;
    }

    axios.post('http://43.205.196.7:9000/api/auth/', data)
      .then((response) => {
        setResponse(response.data);

        const userDetails = {
          token: response.data.token,
          id: response.data.id,
          userName: response.data.userName,
          email: response.data.email,
        };

        localStorage.setItem('user', JSON.stringify(userDetails));
        setToken(userDetails);
        flash('success', "Login successful")
      })
      .catch((error) => {
        flash('error', error.response?.data.msg);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    if (response && response !== null) {
      setLoadingPage(true);

      setTimeout(() => {
        setLoadingPage(false);
        navigate('/');
        window.location.reload();
      }, 3000);
    }
  }, [response, navigate]);

  const style = {
    con: "mb-4 flex items-center gap-2 py-2 px-6 text-[#fff] rounded-[70px]",
    input: "bg-transparent text-[#CACACA] font-[700] text-[15px] w-full border-none focus:outline-none",
  }

  return (
    <>
      {loadingPage ? (
        <div className="loading fixed w-full h-full">
          <div className="flex justify-center items-center h-full">
            <div>
              <img src={Annovate} className="m-auto" alt="annovate logo" />
              <div className="border-[#fff] m-auto mt-4 border-[1px] rounded-[70px] h-[8px] bg-[#fff] w-[149px]">
                <div
                  className="border-[#fff] border-[1px] bg-[#f10191d9] rounded-[75px] h-[8px] mt-[-1px] w-[0px] animate-slide"
                ></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="signin w-full h-full px-[12%]">
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
          <div className="flex items-center h-full">
            <div className="md:w-[31%]">
              <div>
                <h1>
                  <Link to="/"><img src={Annovate} className="m-auto" alt="annovate logo" /></Link>
                </h1>
              </div>
              <div className="mt-8 mb-6">
                <p className="text-[#CACACA] text-[28px] font-extrabold text-center">Welcome back!</p>
                <p className="text-[#ffffffd9] text-center text-[17px] font-[600]">Login to your account</p>
              </div>
              <form onSubmit={signinUser}>
                <div className={style.con} style={emailInput.containerStyle}>
                  <BiSolidUser className="text-[#F10191] text-[30px]" />
                  <input
                    type="email"
                    placeholder="E-mail"
                    required
                    className={style.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={emailInput.handleFocus}
                    onBlur={emailInput.handleBlur}
                  />
                </div>
                <div className={style.con} style={passwordInput.containerStyle}>
                  <BiSolidLockAlt className="text-[#F10191] text-[30px]" />
                  <input
                    type="password"
                    placeholder="password"
                    className={style.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={passwordInput.handleFocus}
                    onBlur={passwordInput.handleBlur}
                  />
                </div>
                <div className="flex mt-8 items-center justify-between">
                  <button
                    type="submit"
                    onClick={handleButtonClick}
                    className={`py-[7px] px-6 text[16px] verify_email font-[700] text-[#ffffff] rounded-[20px] ${buttonClicked ? 'bg-[#f1019199]' : 'bg-[#f10191d9]'}`}
                  >{loading ? (<>loading...</>) : (<>Login</>)}</button>
                  <p className="text-[#CACACA] underline">Forgot password?</p>
                </div>
              </form>
              <div className="my-2 flex gap-2 items-center justify-between">
                <p className="text-[#ffffff]">Don't have an account?</p>
                <p><Link className="underline text-[#f10191d9]" to="/auth/signup">Signup here</Link></p>
              </div>
            </div>
          </div>
        </div>
      )
      }
    </>
  );
};

export default Signin;
