import React, { useEffect } from 'react';
import { FiExternalLink } from "react-icons/fi";
import "../../../../components/authNav/styles/navbar.css";
import uploadIcon from "../../../../assets/nav/uploadIcon.png"
import splitIcon from "../../../../assets/nav/splitIcon.png";
import annotIcon from "../../../../assets/nav/annotate.png"
import autoAnnotateIcon from "../../../../assets/nav/autoAnnotate.png"
import confirmIcon from "../../../../assets/nav/confirm.png"
import exportIcon from "../../../../assets/nav/exportIcon.png"
import ProjectImage from "../../../../assets/nav/projectImage.png";
import { useParams } from 'react-router-dom';
import { getToken } from "../../../../components/auth/Signin";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProject } from '../../../../redux/project/userProject';
import greenCheck from "../../../../assets/annovate/greenCheck.png"

const Sidebar = ({
  imageFiles, imagesPreview,
  number, setNumber, selectedItem, setSelectedItem
}) => {
  const { projects, loading } = useSelector((state) => state.userProject);
  const annotateProgressStr = localStorage.getItem("annotateProgress");
  const annotateProgress = annotateProgressStr ? JSON.parse(annotateProgressStr) : {};
  
  const projectThumbnailStr = localStorage.getItem("imageURLs");
  const projectThumbnail = projectThumbnailStr ? JSON.parse(projectThumbnailStr) : {};
  
  const recentProjects = projects?.length > 0 ? projects?.slice().reverse() : [];
  const { projectId } = useParams();
  const project = projects?.filter((project) => (project._id === projectId));

  const dispatch = useDispatch();
  const userDetails = getToken();
  const userId = userDetails?.id;

  useEffect(() => {
    if (projects?.length === 0) {
      dispatch(fetchProject(userId));
    }
  }, [projects, userId, dispatch]);

  const style = {
    list: "bg-[#211F53B2] annotFlow rounded-[7px] w-full",
    cursor: "cursor-pointer",
    icon: "text-[20px] font-extrabold"
  }

  const annovateOptions = [
    {
      name: "upload",
      icon: uploadIcon,
      projectKey: "upload",
    },
    {
      name: "Split datasets",
      icon: splitIcon,
      projectKey: "splitDatasets",
    },
    {
      name: "Annotate",
      icon: annotIcon,
      projectKey: "annotate",
    },
    {
      name: "Auto annotate",
      icon: autoAnnotateIcon,
      projectKey: "autoAnnotate",
    },
    {
      name: "Confirm",
      icon: confirmIcon,
      projectKey: "confirm",
    },
    {
      name: "Export",
      icon: exportIcon,
      projectKey: "export",
    },
  ]

  const handleItemClick = (index) => {
    setSelectedItem(index);
    setNumber(index)
  };

  useEffect(() => {
    setSelectedItem(0);
  }, [setSelectedItem]);

  return (
    <div>
      <div className="px-[3%] blur_con bg-[#373564] md:w-[23%] h-full fixed overflow-y-auto scrollbar">
        {
          projectId === undefined ? (
            <div>
              <div className="mb-4 pt-[80px]">
                <p className="text-[#fff] mb-[15px] text-[16px] font-[700]">Recent Projects</p>
                <div>
                  {
                    loading ? (
                      <p className="text-white">loading projects...</p>
                    ) : projects && projects.length > 0 ? (
                      recentProjects.slice(0, 3).map((project, index) => (
                        <div key={index}>
                          <p className="mb-[10px] text-[13px] font-[600] project_name text-[#fff] border-[1px] border-[#211f53b3] bg-[#211f53b3] py-[5px] px-6 rounded-[4px]">{project.projectName}</p>
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
                    {
                      projectThumbnail?.length > 0 ? (
                        <div>
                          {projectThumbnail?.slice(0, 1).map((file, index) => (
                            <div key={index}>
                              <p className="hidden">{file.name}</p>
                              <div className="h-[20%] w-full">
                                <img
                                  src={projectThumbnail[0] || ProjectImage}
                                  alt={`Selected Preview ${index}`}
                                  className="w-full h-full rounded-[14px]"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div>
                          <img className="w-full" src={ProjectImage} alt="projectImage" />
                        </div>)
                    }
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
                        <div
                          key={index}
                          className={`flex mb-4 px-4 py-[8px] items-center gap-2 justify-between ${selectedItem === index ? style.list : ''}`}>
                          <button
                            onClick={() => handleItemClick(index)}
                            className={`flex items-center gap-4`}
                          >
                            <img
                              src={annovate.icon}
                              alt="annovate options icon"
                              className={selectedItem === index ? "text-[#F10191]" : 'text-white'}
                            />
                            <li
                              className={selectedItem === index ? "text-[#F10191] font-[600] text-[16px]" : 'font-[600] text-[16px] text-white'}
                            >{annovate.name}</li>
                          </button>
                          {annotateProgress[projectId] && annotateProgress[projectId][annovate.projectKey] && (
                            <img className="w-[18px]" src={greenCheck} alt="green check" />
                          )}
                        </div>
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