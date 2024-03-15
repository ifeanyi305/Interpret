import React from "react";
import "./style.css"
import annovateLogo from "../../assets/home/annoVateLogo.png";
import annovateLogo2 from "../../assets/dashboard/AnnoVate.png";
import aiAnnotating from "../../assets/home/robotAnnotate.png";
import openSourceComputer from "../../assets/home/openSourceComputer.png";
import curvedArrow from "../../assets/home/curvedArrow.png";
import annotLaptop from "../../assets/home/Laptop.png";
import lineIcon from "../../assets/home/lineIcon.png";
import signUserIcon from "../../assets/home/signUser.png";
import uploadIcon from "../../assets/home/uploadDataIcon.png";
import splitIcon from "../../assets/home/split.png";
import manualIcon from "../../assets/home/annotateIcon.png";
import autoIcon from "../../assets/home/autoAnnotateIcon.png";
import exportIcon from "../../assets/home/exportDataIcon.png";
import { Link } from 'react-router-dom';

const Homepage = () => {
  const styles = {
    button1: "rounded-[20px] text-[16px] font-[700] text-[#ffffff]",
    list: "px-8"
  }

  const annovateOpt = [
    {
      title: "Open Source",
    },
    {
      title: "Just browser",
    },
    {
      title: "Security",
    },
    {
      title: "Label types",
    },
    {
      title: "Output formats",
    },
    {
      title: "Artificial Intelligence",
    },
  ]

  const annovateInst = [
    {
      icon: signUserIcon,
      title: "Sign up",
      desc: "Lorem ipsum dolor sit amet, consectetur",
      num: "1",
    },
    {
      icon: uploadIcon,
      title: "Upload datasets",
      desc: "Lorem ipsum dolor sit amet, consectetur",
      num: "2",
    },
    {
      icon: splitIcon,
      title: "Split dataset",
      desc: "Lorem ipsum dolor sit amet, consectetur",
      num: "3",
    },
    {
      icon: manualIcon,
      title: "Manual annoatate",
      desc: "Lorem ipsum dolor sit amet, consectetur",
      num: "4",
    },
    {
      icon: autoIcon,
      title: "Auto annotate",
      desc: "Lorem ipsum dolor sit amet, consectetur",
      num: "5",
    },
    {
      icon: exportIcon,
      title: "Export",
      desc: "Lorem ipsum dolor sit amet, consectetur",
      num: "6",
    },
  ]

  return (
    <div className="homepage">
      <nav className="flex bg-[#201E50] gap-2 justify-between flex-wrap items-center top-0 sticky px-[5%] py-4">
        <div>
          <img src={annovateLogo} alt="Annovate logo" />
        </div>
        <ul className="flex flex-wrap items-center text-[#ffffff] text-[16px] font-[700]">
          <li className={styles.list}>Projects</li>
          <li className={styles.list}>Universal</li>
          <li className={styles.list}>Explore</li>
          <li className={styles.list}>Contact</li>
        </ul>
        <div className="flex gap-2 items-center">
          <button type="button" className={`border-[1px] border-[#FFFFFF] py-[6px] px-6 ${styles.button1}`}><Link to="/auth/signin">Login</Link></button>
          <button type="button" className={`signup_btn py-[7px] px-6 ${styles.button1}`}><Link to="/auth/signup">Sign up</Link></button>
        </div>
      </nav>
      <section className="headerBackground pt-[4%]">
        <div className="md:flex gap-2 items-start mt-">
          <div className="pl-[5%] md:mt-[6%]">
            <p className="text-[38px] font-[600] header mb-6">
              Everything you need to build and deploy computer vision models
            </p>
            <p className="text-[24px] font-[400] text-[#fff] mb-6">
              Used by over 24000 engineers to create datasets, train models, and deploy to production.
            </p>
            <button type="button" className="py-[9px] getStarted_btn text-[17px] font-[500] px-8 mt-4 mb-[4px] text-[#ffffff] rounded-[20px]"><Link to="/auth/signup">Get started</Link></button>
          </div>
          <div>
            <img src={aiAnnotating} className="md:w-[980px] md:h-[440px] w-full" alt="robot annotating" />
          </div>
        </div>
      </section>
      <section className="container2">
        <img src={curvedArrow} className="mt-[-8%]" alt="curvedArrow" />
        <section className="py-[10%] px-[7%]">
          <div className="flex justify-center mb-[7%]">
            <img className="md:w-[533px]" src={openSourceComputer} alt="open source computer" />
          </div>
          <div className="flex justify-between gap-5 items-start max-md:flex-wrap">
            {
              annovateOpt.map((annovate, index) => (
                <div key={index} className="flex grow basis-[0%] flex-col justify-center items-stretch">
                  <div className={`text-white text-center text-sm border-[1px] border-[#FFFFFF] font-semibold whitespace-nowrap bg-opacity-90 justify-center items-stretch px-9 py-3.5 rounded-[100px] max-md:px-5 ${annovate.title === "Open Source" ? 'bg-pink-600 border-[0px]' : ''}`}>
                    {annovate.title}
                  </div>
                </div>
              ))
            }
          </div>
        </section>
      </section>
      <section className="container3">
        <div className="md:flex justify-between items-start py-8">
          <div className="pl-[5%] mt-4">
            <p className="text-[38px] mb-8 font-[600] header">
              Annotate manually small amount of data
            </p>
            <p className="text-[21px] text-[#D9D9D9] mb-6 font-[400]">
              AnnoVate requires you to label a small proportion of your data, The rest of your data will be auto labeled by AI.
            </p>
            <p className="text-[21px] text-[#D9D9D9] font-[400]">Let’s get started</p>
            <button type="button" className="py-[9px] getStarted_btn text-[17px] font-[500] px-8 mt-4 mb-[4px] text-[#ffffff] rounded-[20px]"><Link to="/auth/signup">Try for free</Link></button>
          </div>
          <div>
            <img src={annotLaptop} alt="annovate computer" />
          </div>
        </div>
      </section>
      <section className="py-[7%] px-8 container4">
        <div className="flex-col justify-center mb-[5%]">
          <p className="text-[38px] text-center font-[600] text-[#C2D1D9]">How it works</p>
          <img src={lineIcon} className="m-auto" alt="line" />
        </div>
        <div className="items-stretch flex gap-4 pb-5 flex-wrap">
          {
            annovateInst.map((instruction, index) => (
              <div key={index} className="flex grow basis-[0%] flex-col items-center px-5 self-start">
                <div className="bg-[#201E50] rounded-[50%] p-4">
                  <img
                    loading="lazy"
                    alt="instruction icon"
                    src={ instruction.icon }
                    className="aspect-square object-contain object-center w-[54px] overflow-hidden max-w-full"
                  />
                </div>
                <p className="bg-[#201E50] text-[13px] my-2 text-center m-auto w-fit font-[400] text-[#fff] rounded-[50%] py-[1px] px-2">{instruction.num}</p>
                <div className="text-yellow-400 text-xl font-[400] whitespace-nowrap mt-3">
                  {instruction.title}
                </div>
                <div className="text-slate-300 font-[400] text-center text-sm self-stretch mt-3">
                  {instruction.desc}
                </div>
              </div>
            ))
          }
        </div>
      </section>
      <footer className="py-[5%] px-8 container3">
        <img className="m-auto" src={annovateLogo2} alt="Annovate logo" />
        <p className="text-[#C2D1D9] text-center my-6 text-[14px] font-[400]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut laboreet.
        </p>
        <ul className="flex items-center text-white justify-center gap-2">
          <li className="px-4">Projects</li>
          <li className="px-4">Universal</li>
          <li className="px-4">Explore</li>
          <li className="px-4">Contact</li>
        </ul>
      </footer>
    </div>
  );
}

export default Homepage;
