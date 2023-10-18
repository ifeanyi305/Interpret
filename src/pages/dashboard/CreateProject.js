import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../../components/auth/Signin';
import Nav from '../../components/authNav/Nav';
import { createProject } from '../../redux/project/createProject';
import "./styles/dashboard.css";
import { Link } from 'react-router-dom';

const CreateProject = () => {
  const [projectData, setProjectData] = useState({
    projectType: "Object Detection",
    objectName: "",
    projectName: "",
  })
  const { loading } = useSelector((state) => state.project);
  const userDetails = getToken();
  const userId = userDetails?.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        console.log('error', res);
      } else {
        console.log('success', res);
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
    label: "block text-[#545454] text-[12px] font-[700]",
    input: "w-full bg-white py-2 px-4 mt-[7px] text-[#252525a8] rounded-[5px] border-[1px] border-[#252525a8]"
  }
  return (
    <div className="flex">
      <Nav />
      <div className="md:ml-[23%] px-6">
        <div className="bg-[#fff] border-[0.3px] border-[#0000004d] rounded-[13px] w-full md:w-[603px] md:ml-[23%] py-4 mt-[139px] create_project_con">
          <p className="text-center text-[16px] py-6 text-[#545454] font-[400]">Let's create a new project</p>
          <div className="m-auto md:w-[70%]">
            <form onSubmit={submitProject}>
              <div className="mb-4">
                <label htmlFor="label" className={style.label}>Project type</label>
                <select
                  name="projectType"
                  className={style.input}
                  value={projectData.projectType}
                  onChange={handleChange}
                  required
                >
                  <option value="Object Detection">Object Detection</option>
                  <option value="Single Object Detection">Single Object Detection</option>
                  <option value="Multi Object Detection">Multi Object Detection</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="label" className={style.label}>What are you detecting?</label>
                <input
                  type="text"
                  name="objectName"
                  className={style.input}
                  required
                  placeholder="E.g. 'car' or 'football' or 'traffic light' "
                  value={projectData.objectName}
                  onChange={handleChange}
                />
              </div>
              <div >
                <label htmlFor="label" className={style.label}>Project name</label>
                <input
                  type="text"
                  name="projectName"
                  required
                  className={style.input}
                  placeholder="E.g. 'car parking' or 'Solar system'"
                  value={projectData.projectName}
                  onChange={handleChange}
                />
              </div>
              <div className="flex justify-center items-center gap-6 mt-6 mb-4">
                <Link to="/">
                  <button
                    type="button"
                    className="rounded-[5px] text-[#252525a8] font-[700] text-[12px] px-6 py-2 border-[1px] border-[#252525a8]"
                  >Cancel</button>
                </Link>
                <button
                  className="rounded-[5px] text-[#252525a8] font-[700] text-[12px] px-6 py-2 bg-[#e8e8e8]"
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