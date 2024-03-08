import React, { useState } from 'react';
import ManualAnnot from './prevAutoAnnot/ManualAnnot';
import AutoAnnot from './prevAutoAnnot/AutoAnnot';
import Pinkline from "../../../../../assets/dashboard/pinkline.png";
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateProgress } from '../../../../../redux/annotateProgress/progress';

const PrevAutoAnnot = ({ imageFiles, imagesPreview,
  setAutoAnnotPage, manualImages, autoImages }) => {
  const [autoAnnotatedPage, setAutoAnnotatedPage] = useState(0);
  const [selectedItem, setSelectedItem] = useState(0);
  const { projectId } = useParams();
  const dispatch = useDispatch();

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  const handleChange = () => {
    setAutoAnnotPage(1);
    const data = {
      projectId,
      newKey: "autoAnnotate",
    }
    dispatch(updateProgress(data));
  }

  const CurrentAnnotedPage = () => {
    switch (autoAnnotatedPage) {
      case 0:
        return <ManualAnnot
          imagesPreview={imagesPreview}
          imageFiles={imageFiles}
          manualImages={manualImages}
        />
      case 1:
        return <AutoAnnot
          imagesPreview={imagesPreview}
          imageFiles={imageFiles}
          autoImages={autoImages}
        />
      default:
        return <ManualAnnot />
    }
  }

  const style = {
    nav_list: 'text-[15px] font-[600] text-[#f10191d9]',
    nav_list_inactive: 'text-[#252525a6] text-[15px] font-[400]',
    button: 'flex items-center gap-2 px-4',
    span_active: "bg-[#f10191d9] rounded-[22px] font-[700] text-[12px] text-[#fff] px-2 py-[2px]",
    span_inactive: "bg-[#D9D9D9] rounded-[22px] font-[700] text-[12px] text-[#252525a6] px-2 py-[2px]"
  }

  return (
    <div className="annotate_container mt-[-1.5%]">
      <div className="w-full border-[#f10191d9] bg-white h-[80%] max-h-[433px] scrollbar overflow-y-auto rounded-[10px] border-[1px] py-2">
        <nav className="my-2 px-6">
          <ul className="flex items-center gap-4">
            <div>
              <button className={style.button} onClick={() => setAutoAnnotatedPage(0)}>
                <li onClick={() => handleItemClick(0)} className={selectedItem === 0 ? style.nav_list : style.nav_list_inactive}>Manually Annotated</li>
                <span className={selectedItem === 0 ? style.span_active : style.span_inactive}>{manualImages?.length}</span>
              </button>
              <img src={Pinkline} alt="pink line" className={selectedItem === 0 ? "absolute mt-4 w-[232px] h-[2px]" : "hidden"} />
            </div>
            <div>
              <button className={style.button} onClick={() => setAutoAnnotatedPage(1)}>
                <li onClick={() => handleItemClick(1)} className={selectedItem === 1 ? style.nav_list : style.nav_list_inactive}>To be auto annotated</li>
                <span className={selectedItem === 1 ? style.span_active : style.span_inactive}>{autoImages?.length}</span>
              </button>
              <img src={Pinkline} alt="pink line" className={selectedItem === 1 ? "absolute mt-4 w-[242px] h-[2px]" : "hidden"} />
            </div>
          </ul>
        </nav>
        <hr className="w-full my-4" />
        {CurrentAnnotedPage()}
      </div>
      <div className="flex justify-end my-4 start_annotating_btn">
        <button
          onClick={() => handleChange()}
          className="rounded-[204px] text-[#fff] font-[600] verify_email text-[14px] bg-[#f10191d9] px-6 py-2"
          type="button"
        >Auto Annotate</button>
      </div>
    </div>
  );
};

export default PrevAutoAnnot;