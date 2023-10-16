import React from 'react';
import "./styles/dashboard.css";
import Sidebar from '../../components/authNav/Sidebar';

const Dashboard = () => {
  const style = {
    projectObjects: "text-[12px] text-[#252525a6] font-[400]",
  }
  return (
    <div className="flex">
      <Sidebar />
      <div className="md:ml-[23%] px-6">
        <div className="px-6">
          <div className="bg-[#fff] shadow w-full mt-[14%] rounded-[8px] border-[0.3px] border-[#0000004d]">
            <div className="px-6 py-4">
              <p className="text-[15px] mb-4 font-[500] text-[##252525b3]">Welcome Abroad</p>
              <div className="bg-[#f1019140] rounded-[10px] w-full px-6 py-4">
                <p className="text-[#211f53] font-[400]">
                  <span className="text-[#000] font-[600]">Tip of the Day!</span> Lorem ipsum dolor sit amet consectetur.
                  Praesent vitae quam urna faucibus egestas
                  molestie adipiscing. Consectetur varius faucibus
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="my-6">
          <hr />
        </div>
        <div className="mb-6 flex justify-center items-center">
          <button
            type="button"
            className="text-[#fff] bg-[#f10191d9] py-[3px] px-4 rounded-[20px]"
          ><span>+</span> Create new project</button>
        </div>
        <div>
          <div className="shadow border-[#0000004d] border-[0.3px] bg-white w-full px-4 py-2 rounded-[8px] flex justify-between items-center">
            <div>
              <p className="text-[15px] text-[#252525a6] font-[600]">Hello 1</p>
              <p className={style.projectObjects}>object Detection</p>
              <div className="flex items-center gap-4">
                <small className={style.projectObjects}>Cat</small>
                <small className={style.projectObjects}>200 images</small>
              </div>
            </div>
            <div>
              <p className={style.projectObjects}>Edit 2 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;