import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../../components/auth/Signin';
import { ToastContainer } from 'react-toastify';
import { useInputWithFocus } from '../../App';
import { flash } from '../../redux/flash/flash';
import 'react-toastify/dist/ReactToastify.css';
import { createProject } from '../../redux/project/createProject';
import "./styles/dashboard.css";
import { Link } from 'react-router-dom';

const CreateProject = () => {
  const [projectData, setProjectData] = useState({
    projectType: "",
    objectName: "",
    projectName: "",
  })
  const projectTypeInput = useInputWithFocus('');
  const objectNameInput = useInputWithFocus('');
  const projectNameInput = useInputWithFocus('');

  const validateForm = () => {
    return projectData.projectType !== ""
     || projectData.objectName !== ""
      || projectData.projectName !== ""
  };

  const { loading } = useSelector((state) => state.project);
  const userDetails = getToken();
  const [buttonClicked, setButtonClicked] = useState(false);
  const userId = userDetails?.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    setButtonClicked(!buttonClicked);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const submitProject = (e) => {
    e.preventDefault();
    const data = {
      userId,
      projectType: projectData.projectType,
      objectName: projectData.objectName,
      projectName: projectData.projectName,
    }
    dispatch(createProject(data)).then((res) => {
      if (res.error) {
        flash('error', res.error.message);
      } else {
        flash('success', 'project created');
        navigate('/');
      }
    })
    setProjectData({
      projectType: "",
      objectName: "",
      projectName: "",
    })
  }

  const style = {
    label: "block text-[#252525A6] text-[14px] font-[700]",
    input: "w-full select_input bg-[#fff] py-2 px-4 mt-[7px] text-[#252525a8] rounded-[5px] border-[1px] border-[#252525a8]",
    noFocus: "w-full focus:outline-none bg-[#fff]",
  }
  return (
    <div className="createProject">
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
      <div className="flex justify-center items-center h-full">
        <div className="bg-[#fff] w-[63%] border-[0.3px] border-[#0000004d] rounded-[13px] py-4 create_project_con">
          <p className="text-center text-[20px] py-6 text-[#545454] font-[600]">Let's create a new project</p>
          <div className="m-auto md:w-[70%]">
            <form onSubmit={submitProject}>
              <div className="mb-4">
                <label htmlFor="label" className={style.label}>Project type</label>
                <div
                  className="w-full select_input bg-white py-2 px-2 mt-[7px] text-[#252525a8] rounded-[5px] border-[1px] border-[#252525a8]"
                  style={projectTypeInput.projectStyle}
                >
                  <select
                    name="projectType"
                    className={style.noFocus}
                    value={projectData.projectType}
                    onChange={handleChange}
                    onFocus={projectTypeInput.handleFocus}
                    onBlur={projectTypeInput.handleBlur}
                    required
                  >
                    <option value="">Select Project Type</option>
                    <option value="Object Detection">Object Detection</option>
                    <option value="Single Object Detection">Single Object Detection</option>
                    <option value="Multi Object Detection">Multi Object Detection</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="label" className={style.label}>What are you detecting?</label>
                <div className={style.input} style={objectNameInput.projectStyle}>
                  <input
                    type="text"
                    name="objectName"
                    className={style.noFocus}
                    required
                    placeholder="E.g. 'car' or 'football' or 'traffic light' "
                    value={projectData.objectName}
                    onChange={handleChange}
                    onFocus={objectNameInput.handleFocus}
                    onBlur={objectNameInput.handleBlur}
                  />
                </div>
              </div>
              <div >
                <label htmlFor="label" className={style.label}>Project name</label>
                <div className={style.input} style={projectNameInput.projectStyle}>
                  <input
                    type="text"
                    name="projectName"
                    required
                    className={style.noFocus}
                    placeholder="E.g. 'car parking' or 'Solar system'"
                    value={projectData.projectName}
                    onChange={handleChange}
                    onFocus={projectNameInput.handleFocus}
                    onBlur={projectNameInput.handleBlur}
                  />
                </div>
              </div>
              <div className="flex justify-center items-center gap-6 mt-6 mb-4">
                <Link to="/">
                  <button
                    type="button"
                    className="rounded-[5px] text-[#252525a8] font-[700] text-[12px] px-6 py-2 border-[1px] border-[#252525a8]"
                  >Cancel</button>
                </Link>
                <button
                  onClick={handleButtonClick}
                  className={`rounded-[5px] text-[#252525a8] font-[700] text-[12px] px-6 py-2 ${validateForm() ? 'bg-[#f1019199]' : 'bg-[#e8e8e8]'}`}
                  type="submit"
                >{loading ? "loading..." : "continue"}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;