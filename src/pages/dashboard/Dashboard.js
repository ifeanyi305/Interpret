import React, { useEffect } from 'react';
import "./styles/dashboard.css";
import { getToken } from '../../components/auth/Signin';
import { fetchProject } from '../../redux/project/userProject';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Thumbnail from "../../assets/dashboard/Bthumbnail.png";
import Label from "../../assets/dashboard/label.png";
import Trash from "../../assets/dashboard/trash.png";
import Upload from "../../assets/dashboard/export.png";
import greenElipses from "../../assets/dashboard/greenElipses.png";
import redElipses from "../../assets/dashboard/redElipses.png";
import reset from "../../assets/dashboard/reset.png";
import user from "../../assets/dashboard/user.png";
import logoutIcon from "../../assets/dashboard/logout.png";
import upgrade from "../../assets/dashboard/upgrade.png";
import settings from "../../assets/dashboard/settings.png";
import { useNavigate } from 'react-router-dom';
import { signout } from '../../redux/auth/signin';

const Dashboard = ({ notifications, profile, closeModal, modalActive }) => {
  const { projects, loading } = useSelector((state) => state.userProject);
  const recentProjects = projects?.length > 0 ? projects?.slice().reverse() : [];

  const dispatch = useDispatch();
  const userDetails = getToken();
  const userId = userDetails?.id;

  useEffect(() => {
    dispatch(fetchProject(userId));
  }, [dispatch, userId]);

  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(signout());
    navigate('/auth/signin');
    window.location.reload();
  };

  const style = {
    projectObjects: "text-[10px] text-[#252525a6] font-[600]",
    projectCon: "shadow w-full cursor-pointer project border-[#0000004d] border-[0.3px] bg-white md:w-[49%] px-4 py-2 rounded-[8px]",
    flex: "flex items-center gap-2",
    list: "flex items-center gap-4 rounded-[9px] option py-2 cursor-pointer",
    options: "text-[15px] font-[500] text-[#252525e6]",
  }
  return (
    <div className="project_container">
      {
        modalActive && (
          <button onClick={closeModal} className="fixed w-screen closeModal_button h-screen top-0 bottom-0">&apos;</button>
        )
      }
      {
        notifications ? (
          <div className="border-[#0000004d] user_notification fixed bg-[#fff] rounded-[9px] border-[0.3px] right-0 mt-[6%] mr-[2%] w-[65%] md:w-[30%]">
            <div>
              <div className="px-4 py-6">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex items-start gap-2">
                    <img src={greenElipses} className="mt-[7px]" alt="elipses" />
                    <img src={Upload} alt="upload" />
                    <div>
                      <p className="text-[15px] font-[500] text-[#000]">File Uploaded</p>
                      <p className="text-[14px] font-[400] text-[#7F7F7F]">Your file has been uploaded successfully</p>
                    </div>
                  </div>
                  <p className="text-[14px] font-[400] text-[#7F7F7F]">1 day</p>
                </div>
                <hr className="my-6" />
                <div className="flex justify-between items-start gap-2">
                  <div className="flex items-start gap-2">
                    <img src={redElipses} className="mt-[7px]" alt="elipses" />
                    <img src={reset} alt="upload" />
                    <div>
                      <p className="text-[15px] font-[500] text-[#000]">Password Reset</p>
                      <p className="text-[14px] font-[400] text-[#7F7F7F]">Your password has been restored successfully</p>
                    </div>
                  </div>
                  <p className="text-[14px] font-[400] text-[#7F7F7F]">4 days</p>
                </div>
              </div>
              <div className="bg-[#373564] border-[#0000004d] border-[0.3px] w-full py-2 text-center text-[15px] text-[#fff] font-[500]">
                <button type="button">View all</button>
              </div>
            </div>
          </div>
        ) : (<></>)
      }
      <button>
        {
          profile ? (
            <div className="border-[#0000004d] user_profile fixed bg-[#fff] rounded-[9px] border-[0.3px] right-0 mt-[6%] mr-[2%] p-4">
              <div className="flex justify-between items-center gap-2">
                <img src={user} alt="user" />
                <div>
                  <p className="text-[15px] font-[500] text-[#252525e6]">Noor</p>
                  <p className="text-[13px] font-[500] text-[#999999]">noor@gmail.com</p>
                </div>
              </div>
              <hr className="my-2" />
              <ul>
                <li className={style.list}>
                  <img src={logoutIcon} alt="logout" />
                  <p className={style.options}>Dashboard</p>
                </li>
                <li className={style.list}>
                  <img src={settings} alt='settings' />
                  <p className={style.options}>Profile Setting</p>
                </li>
                <li className={style.list}>
                  <img src={upgrade} alt="upgrade" />
                  <p className={style.options}>Upgrade Plan</p>
                </li>
                <li className={style.list} onClick={handleLogout}>
                  <img src={logoutIcon} alt="logout" />
                  <button
                    type="button"
                    className={style.options}
                  >Log out</button>
                </li>
              </ul>
            </div>
          ) : (<></>)
        }
      </button>
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
          <div className="flex gap-2 items-center text-[#fff] bg-[#f10191d9] py-[8px] px-4 rounded-[204px]">
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
                <div key={index} className={style.projectCon}>
                  <Link to={`/annovate/${project._id}`}>
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex items-center gap-4 mb-2">
                        <img src={Thumbnail} alt="thumbnail" />
                        <div>
                          <p className="text-[15px] text-[#252525a6] font-[600]">{project.projectName}</p>
                          <p className="text-[10px] text-[#252525a6] font-[400]">{project.projectType}</p>
                        </div>
                      </div>
                      <img src={Trash} className="mt-[4px]" alt="trash" />
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
                  </Link>
                </div>
              ))
            ) : (<p className="text-[#000]">No Projects</p>)
          }
        </div>
      </div>
    </div>
  );
};

export default Dashboard;