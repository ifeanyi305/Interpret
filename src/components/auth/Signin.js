import React, { useState } from 'react';
import axios from 'axios';
import "./styles/auth.css";
import { Link, useNavigate } from 'react-router-dom';
import { useInputWithFocus } from '../../App';
import signin from '../../redux/auth/signin';
import { BiSolidUser } from "react-icons/bi";
import { BiSolidLockAlt } from "react-icons/bi";
import Annovate from "../../assets/auth/AnnoVateLogo.png";
import LoadingPage from "../../assets/auth/loading.png";

const setToken = (token) => {
  localStorage.setItem('user', JSON.stringify({ token }));
}

export const getToken = () => JSON.parse(localStorage.getItem('user'))?.token;

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const emailInput = useInputWithFocus('');
  const passwordInput = useInputWithFocus('');

  const navigate = useNavigate();

  const signinUser = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    setLoading(true);

    axios.post('https://annovate-backend-production.up.railway.app/api/auth/', data)
      .then((response) => {
        console.log('Response:', response.data);
        setResponse(response.data);

        const userDetails = {
          token: response.data.token,
          id: response.data.id,
        };

        localStorage.setItem('user', JSON.stringify(userDetails));
        setToken(userDetails);
        navigate('/');
        window.location.reload();
      })
      .catch((error) => {
        console.error('There was a problem with the POST request:', error.response.data.msg);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const style = {
    con: "mb-2 flex items-center gap-2 py-2 px-6 text-[#fff] rounded-[20px]",
    input: "bg-transparent w-full border-none focus:outline-none",
  }

  return (
    <>
      {loading ? (
        <div className="loading fixed w-full h-full">
          <div className="flex justify-center items-center h-full">
            <div>
              <img src={Annovate} className="m-auto" alt="annovate logo" />
              <img src={LoadingPage} className="m-auto mt-4" alt="loading" />
            </div>
          </div>
        </div>
      ) : (
        <div className="signin fixed w-full h-full px-[10%] py-[15%]">
          <div className="md:w-[30%]">
            <div>
              <h1>
                <Link to="/"><img src={Annovate} className="m-auto" alt="annovate logo" /></Link>
              </h1>
            </div>
            <div className="mt-6 mb-4">
              <p className="text-[#fff] text-[28px] font-extrabold text-center">Welcome back!</p>
              <p className="text-[#fff] text-center">Login to your account</p>
            </div>
            <form onSubmit={signinUser}>
              <div className={style.con} style={emailInput.containerStyle}>
                <BiSolidUser className="text-[#F10191]" />
                <input
                  type="text"
                  placeholder="E-mail"
                  className={style.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={emailInput.handleFocus}
                  onBlur={emailInput.handleBlur}
                />
              </div>
              <div className={style.con} style={passwordInput.containerStyle}>
                <BiSolidLockAlt className="text-[#F10191]" />
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
              <div className="flex mt-6 items-center justify-between">
                <button
                  type="submit"
                  className="bg-[#F10191] py-2 px-6 text-[#fff] rounded-[20px]"
                >Login</button>
                <p className="text-[#fff] underline">Forgot password</p>
              </div>
            </form>
            <div className="my-2">
              <p className="text-[#fff]">Don't have an account?
                <Link className="underline ml-[7%] text-[#F10191]" to="/auth/signup">Signup here</Link>
              </p>
            </div>
          </div>
        </div>
      )
      }
    </>
  );
};

export default Signin;
