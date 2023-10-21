import React, { useEffect } from 'react';
import "./styles/dashboard.css";
import Nav from '../../components/authNav/Nav';
import { getToken } from '../../components/auth/Signin';
import { fetchProject } from '../../redux/project/userProject';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { projects, loading } = useSelector((state) => state.userProject);

  const dispatch = useDispatch();
  const userDetails = getToken();
  const userId = userDetails?.id;

  useEffect(() => {
    dispatch(fetchProject(userId));
  }, [dispatch, userId]);

  const style = {
    projectObjects: "text-[12px] text-[#252525a6] font-[400]",
    projectCon: "shadow w-full flex justify-between gap-4 items-center cursor-pointer project border-[#0000004d] border-[0.3px] bg-white md:w-[49%] px-4 py-2 rounded-[8px]",
  }
  return (
    <div className="flex">
      <Nav />
      <div className="md:ml-[23%] px-[4%] bg-[#000] project_container">
        <div className="px-6">
          <div className="bg-[#fff] shadow w-full mt-[14%] rounded-[8px] border-[0.3px] border-[#0000004d]">
            <div className="px-6 py-4">
              <p className="text-[18px] mb-4 font-[600] text-[#252525b3]">Welcome Abroad</p>
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
          <Link to="/dashboard/create_project">
            <button
              type="button"
              className="text-[#fff] bg-[#f10191d9] text-[15px] font-[600] py-[5px] px-4 rounded-[204px]"
            >
              <span className="text-[20px] px-[3px] font-[600] text-[#FFFFFF]">+</span>
              Create new project
            </button>
          </Link>
        </div>
        <div>
          <div className="flex justify-between gap-4 flex-wrap items-center">
            {
              loading ? (
                <>loading projects...</>
              ) : projects && projects.length > 0 ? (
                projects.map((project, index) => (
                  <div key={index} className={style.projectCon}>
                    <div>
                      <p className="text-[15px] text-[#252525a6] font-[600]">{project.projectName}</p>
                      <p className={style.projectObjects}>{project.projectType}</p>
                      <div className="flex items-center gap-4">
                        <small className={style.projectObjects}>{project.objectName}</small>
                        <small className={style.projectObjects}>200 images</small>
                      </div>
                    </div>
                    <div className="flex gap-4 items-center">
                      <p className={style.projectObjects}>Edit 2 hours ago</p>
                      <FaArrowRight className="text-[#f10191d9] text-[22px]" />
                    </div>
                  </div>
                ))
              ) : (<p className="text-[#000]">No Projects</p>)
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;