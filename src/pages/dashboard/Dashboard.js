import React, { useEffect, useState } from 'react';
import "./styles/dashboard.css";
import { getToken } from '../../components/auth/Signin';
import { fetchProject } from '../../redux/project/userProject';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { flash } from '../../redux/flash/flash';
import { deleteProject } from '../../redux/project/deleteProject';
import 'react-toastify/dist/ReactToastify.css';
import Thumbnail from "../../assets/dashboard/Bthumbnail.png";
import Warning from "../../assets/dashboard/warning.png";
import WarningIcon from "../../assets/dashboard/warningIcon.png";
import Label from "../../assets/dashboard/label.png";
import Trash from "../../assets/dashboard/trash.png";

const Dashboard = () => {
  const { projects, loading } = useSelector((state) => state.userProject);
  const recentProjects = projects?.length > 0 ? projects?.slice().reverse() : [];
  const [deleteModal, setDeleteModal] = useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const dispatch = useDispatch();
  const userDetails = getToken();
  const userId = userDetails?.id;

  const handleDeleteModal = (id, e) => {
    e.stopPropagation();
    setDeleteModal(true);
    setSelectedProject(id)
  }

  const closeDeleteModal = () => {
    setDeleteModal(!deleteModal);
  }

  const handleConfirmDelModal = () => {
    setConfirmDeleteModal(!confirmDeleteModal)
    setDeleteModal(false);
  }

  const deleteUserProject = () => {
    if (selectedProject) {
      dispatch(deleteProject(selectedProject._id)).then((res) => {
        if (res.error) {
          flash('error', res.error.message);
        } else {
          flash('success', `${selectedProject.projectName} project deleted`);
        }
      })
      setSelectedProject(null);
      setConfirmDeleteModal(false)
      setDeleteModal(false);
    }
  }

  useEffect(() => {
    if (projects?.length === 0) {
      dispatch(fetchProject(userId));
    }
  }, [dispatch, userId, projects?.length]);

  const navigate = useNavigate();

  const style = {
    projectObjects: "text-[10px] text-[#252525a6] font-[600]",
    projectCon: "shadow cursor-pointer w-full project border-[#0000004d] border-[0.3px] bg-white md:w-[49%] px-4 py-2 rounded-[8px]",
    flex: "flex items-center gap-2",
    list: "flex items-center gap-4 rounded-[9px] option py-2 cursor-pointer",
    options: "text-[15px] font-[500] text-[#252525e6]",
  }
  return (
    <div className="project_container px-[8%] pb-[5%]">
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
        deleteModal ? (
          <div className="w-full flex delete_project_modal delete_modal justify-center items-center h-full fixed">
            <div className="bg-[#fff] flex justify-center items-center md:right-[58%] py-[2%] px-[1%] absolute md:w-[37%] md:h-[37%] m-auto rounded-[20px]">
              <div className="w-[70%] m-auto">
                <img className="m-auto mb-4" src={Warning} alt="warning" />
                <p className="text-center mt-4 mb-6 font-[500] text-[18px] text-[#252525b3]">
                  Are you sure you want to delete this project?
                </p>
                <div className="flex mt-6 justify-center items-center gap-4">
                  <button
                    type="button"
                    onClick={closeDeleteModal}
                    className="text-[#fff] verify_email bg-[#f10191d9] text-[14px] font-[600] px-4 py-[5px] rounded-[100px]"
                  >Cancel</button>
                  <button
                    type="button"
                    onClick={handleConfirmDelModal}
                    className="border-[1px] border-[#252525b3] text-[#252525b3] text-[14px] font-[600] bg-[#fff] px-4 py-[5px] rounded-[100px]"
                  >Delete</button>
                </div>
              </div>
            </div>
          </div>
        ) : (<></>)
      }
      {
        confirmDeleteModal ? (
          <div className="w-full flex delete_project_modal delete_modal justify-center items-center h-full fixed">
            <div className="bg-[#fff] border-[1px] border-[#252525b3] delete_modal_con flex justify-center items-center md:right-[60%] py-[1%] px-[1%] absolute w-[30%] m-auto rounded-[20px]">
              <div className="m-auto">
                <p className="text-center font-[500] text-[12px] text-[#252525b3]">
                  AI is currently annotating your
                  dataset in the background.
                  Once you confirm, you&apos;ll lose
                  all your manual and ongoing automated annotations.
                </p>
                <img className="m-auto my-2" src={WarningIcon} alt="warning" />
                <p className="text-[#FF0000F7] font-[500] text-[13px] text-center">This process can’t be undone.</p>
                <div className="flex mt-2 justify-center items-center gap-4">
                  <button
                    type="button"
                    onClick={handleConfirmDelModal}
                    className="text-[#fff] verify_email bg-[#f10191d9] text-[14px] font-[600] px-4 py-[5px] rounded-[100px]"
                  >Cancel</button>
                  <button
                    type="button"
                    onClick={deleteUserProject}
                    className="border-[1px] border-[#252525b3] text-[#252525b3] text-[14px] font-[600] bg-[#fff] px-4 py-[5px] rounded-[100px]"
                  >Confirm</button>
                </div>
              </div>
            </div>
          </div>
        ) : (<></>)
      }
      <div className="blur_con">
        <div className="px-[7%] pt-[12%]">
          <div className="bg-[#fff] shadow w-full rounded-[8px] border-[0.3px] border-[#0000004d]">
            <div className="px-6 py-4">
              <p className="text-[18px] mb-4 font-[600] text-[#252525b3]">Welcome Abroad!</p>
              <div className="bg-[#f1019140] rounded-[10px] w-full px-6 py-4">
                <p className="text-[#211f53] text-center font-[400]">
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
            <div className="flex gap-2 items-center verify_email text-[#fff] bg-[#f10191d9] py-[8px] px-4 rounded-[204px]">
              <span className="font-[600]">+</span>
              <button type="button" className="text-[15px] font-[600]">Create new project</button>
            </div>
          </Link>
        </div>
        <div>
          <div className="flex justify-between gap-4 flex-wrap items-center">
            {
              loading ? (
                <>loading projects...</>
              ) : projects && projects.length > 0 ? (
                recentProjects.map((project, index) => (
                  <div onClick={() => navigate(`/annovate/${project._id}`)} key={index} className={style.projectCon}>
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex items-center gap-4 mb-2">
                        <img src={Thumbnail} alt="thumbnail" />
                        <div>
                          <p className="text-[15px] text-[#252525a6] font-[600]">{project.projectName}</p>
                          <p className="text-[10px] text-[#252525a6] font-[400]">{project.projectType}</p>
                        </div>
                      </div>
                      <button onClick={(e) => handleDeleteModal(project, e)} className="mt-[4px] trash_btn">
                        <img src={Trash} className="trash_icon" alt="trash" />
                      </button>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <div className="flex items-center gap-4">
                        <div className={style.flex}>
                          <img src={Label} alt="label" />
                          <p className={style.projectObjects}>{project.objectName}</p>
                        </div>
                        <div className={style.flex}>
                          <img src={Thumbnail} className="w-[12px]" alt="thumbnail" />
                          <p className={style.projectObjects}>200 images</p>
                        </div>
                      </div>
                      <p className={style.projectObjects}>Edit 2 hours ago</p>
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