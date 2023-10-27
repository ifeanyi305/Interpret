import React, { useEffect, useState } from 'react';
import { FiExternalLink } from "react-icons/fi";
import "./styles/navbar.css";
import { FaUpload } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { FaShapes } from "react-icons/fa";
import { MdOutlineAutorenew } from "react-icons/md";
import { AiOutlineCheckSquare } from "react-icons/ai";
import { FaFileExport } from "react-icons/fa";
import ProjectImage from "../../assets/nav/projectImage.png";
import { useParams } from 'react-router-dom';
import { getToken } from '../../components/auth/Signin';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProject } from '../../redux/project/userProject';

const Sidebar = () => {
  const { projects, loading } = useSelector((state) => state.userProject);
  const recentProjects = projects?.length > 0 ? projects?.slice().reverse() : [];
  const { projectId } = useParams();
  console.log("project id", projectId);
  const project = projects?.filter((project) => (project._id === projectId))
  console.log("pro", project[0]?.projectName);

  const dispatch = useDispatch();
  const userDetails = getToken();
  const userId = userDetails?.id;

  useEffect(() => {
    if (projects?.length === 0) {
      dispatch(fetchProject(userId));
    }
  }, [projects, userId, dispatch]);

  const annovateOptions = [
    {
      name: "upload",
      icon: <FaUpload />,
    },
    {
      name: "Assign",
      icon: <FiSearch />,
    },
    {
      name: "Annotate",
      icon: <FaShapes />,
    },
    {
      name: "Auto annotate",
      icon: <MdOutlineAutorenew />,
    },
    {
      name: "Confirm",
      icon: <AiOutlineCheckSquare />,
    },
    {
      name: "Export",
      icon: <FaFileExport />,
    },
  ]
  const style = {
    list: "border-[#F10191] border-[2px] rounded-[7px] w-full",
    cursor: "cursor-pointer"
  }

  const [selectedItem, setSelectedItem] = useState(0);

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  useEffect(() => {
    setSelectedItem(0);
  }, []);

  return (
    <div>
      <div className="px-[4%] bg-[#373564] md:w-[23%] h-full fixed overflow-y-auto scrollbar">
        {
          projectId === undefined ? (
            <div>
              <div className="mb-4 pt-[80px]">
                <p className="text-[#fff] mb-[15px] text-[15px] font-[700]">Recent Projects</p>
                <div>
                  {
                    loading ? (
                      <p className="text-white">loading projects...</p>
                    ) : projects && projects.length > 0 ? (
                      recentProjects.slice(0, 3).map((project, index) => (
                        <div key={index}>
                          <p className="mb-[10px] text-[13px] font-[600] project_name text-[#fff] border-[1px] border-[#211f53b3] bg-[#211f53b3] py-[3px] px-6 rounded-[4px]">{project.projectName}</p>
                        </div>
                      ))
                    ) : (<p className="text-white">No Projects</p>)
                  }
                </div>
              </div>
              <div className="flex justify-center my-6">
                <button type="button" className="text-[#fff] verify_email bg-[#F10191B2] py-[3px] px-6 rounded-[20px]">See more</button>
              </div>
              <div>
                <div className="flex mb-[12px] items-center gap-2">
                  <p className="text-[#fff] text-[15px] font-[700]">Quick Tips</p>
                  <FiExternalLink className="text-[#fff] text-[20px] font-[700]" />
                </div>
                <div className="my-6">
                  <p className="text-[#fff] mb-[6px] text-[15px] font-[700]">Settings</p>
                  <p className="ml-[12px] text-white">Account Settings</p>
                </div>
                <div>
                  <p className="text-[#fff] mb-[6px] text-[15px] font-[700]">Resources</p>
                  <ul className="ml-[12px] text-white">
                    <li>Getting started</li>
                    <li className="py-2">Tutorials</li>
                    <li>Public dataset & models</li>
                    <li className="pt-2">Library</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="pt-[80px]">
              {loading ? (
                <p className="text-white">Loading projects...</p>
              ) : (
                <div>
                  <div>
                    <img src={ProjectImage} alt="projectImage" />
                  </div>
                  <div className="mt-6 mb-4">
                    <p className="text-[#fff] mb-[6px] text-[15px] font-[600]">Project Name</p>
                    <p className="ml-[14px] font-[500] text-white">{project[0]?.projectName || ""}</p>
                  </div>
                  <div className="mt-2">
                    <p className="text-[#fff] mb-[6px] text-[15px] font-[600]">Project Type</p>
                    <p className="ml-[14px] font-[500] text-white">{project[0]?.projectType || ""}</p>
                  </div>
                  <hr className="mt-4 mb-6" />
                  <ul className="my-4">
                    {
                      annovateOptions.map((annovate, index) => (
                        <button
                          onClick={() => handleItemClick(index)}
                          key={index}
                          className={`flex mb-4 px-4 py-[4px] items-center gap-4 ${selectedItem === index ? style.list : ''}`}
                        >
                          <button
                            type="button"
                            className={selectedItem === index ? "text-[#F10191]" : 'text-white'}>
                            {annovate.icon}
                          </button>
                          <li
                            className={selectedItem === index ? "text-[#F10191] font-[400] text-[16px]" : 'font-[400] text-[16px] text-white'}
                          >{annovate.name}</li>
                        </button>
                      ))
                    }
                  </ul>
                </div>
              )}
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Sidebar;