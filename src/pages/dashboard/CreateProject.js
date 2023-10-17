import React from 'react';
import Nav from '../../components/authNav/Nav';
import "./styles/dashboard.css";
import { Link } from 'react-router-dom';

const CreateProject = () => {
  const style = {
    label: "block text-[#545454] text-[12px] font-[700]",
    input: "w-full bg-white py-2 px-4 mt-[7px] text-[#252525a8] rounded-[5px] border-[1px] border-[#252525a8]"
  }
  return (
    <div className="flex">
      <Nav />
      <div className="md:ml-[23%] px-6">
        <div className="bg-[#fff] border-[0.3px] border-[#0000004d] rounded-[13px] w-full md:w-[603px] md:ml-[23%] py-4 mt-[139px] create_project_con">
          <p className="text-center text-[16px] py-6 text-[#545454] font-[400]">Let's create a new project</p>
          <div className="m-auto w-[70%]">
            <form>
              <div className="mb-4">
                <label htmlFor="label" className={style.label}>Project type</label>
                <select className={style.input}>
                  <option>Object Detection</option>
                  <option>Single Object Detection</option>
                  <option>Multi Object Detection</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="label" className={style.label}>What are you detecting?</label>
                <input type="text" className={style.input} placeholder="E.g. 'car' or 'football' or 'traffic light' " />
              </div>
              <div >
                <label htmlFor="label" className={style.label}>Project name</label>
                <input type="text" className={style.input} placeholder="E.g. 'car parking' or 'Solar system'" />
              </div>
            </form>
            <div className="flex justify-center items-center gap-6 mt-6 mb-4">
              <Link to="/dashboard">
                <button
                  type="button"
                  className="rounded-[5px] text-[#252525a8] font-[700] text-[12px] px-6 py-2 border-[1px] border-[#252525a8]"
                >Cancel</button>
              </Link>
              <button
                className="rounded-[5px] text-[#252525a8] font-[700] text-[12px] px-6 py-2 bg-[#e8e8e8]"
                type="button"
              >Continue</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;