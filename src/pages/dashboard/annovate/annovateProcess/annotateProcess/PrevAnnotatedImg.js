import React, { useState } from 'react';
import AllAnnotate from './prevAnnot/AllAnnotate';
import NotAnnotated from './prevAnnot/NotAnnotated';
import AnnotatedImg from './prevAnnot/AnnotatedImg';
import Pinkline from "../../../../../assets/dashboard/pinkline.png"

const PrevAnnotatedImg = ({ imageFiles, imagesPreview,
   setAnnotPage, setShowLabel, manualImages, autoImages,
   annotatedImages
   }) => {
  const [annotatedPage, setAnnotatedPage] = useState(0);
  const [selectedItem, setSelectedItem] = useState(0);
  const filteredImages = manualImages?.filter(file => annotatedImages.includes(file));
  const unAnnotedImages = manualImages?.filter(file => !annotatedImages.includes(file));

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  const handleChange = () => {
    setAnnotPage(1)
    setShowLabel(true)
  }

  const CurrentAnnotedPage = () => {
    switch (annotatedPage) {
      case 0:
        return <AllAnnotate
          imagesPreview={imagesPreview}
          imageFiles={imageFiles}
          manualImages={manualImages}
          autoImages={autoImages}
        />
      case 1:
        return <NotAnnotated
          imagesPreview={imagesPreview}
          imageFiles={imageFiles}
          manualImages={manualImages}
          annotatedImages={annotatedImages}
          autoImages={autoImages}
          unAnnotedImages={unAnnotedImages}
        />
      case 2:
        return <AnnotatedImg
          imagesPreview={imagesPreview}
          imageFiles={imageFiles}
          manualImages={manualImages}
          annotatedImages={annotatedImages}
          autoImages={autoImages}
          filteredImages={filteredImages}
        />
      default:
        return <AllAnnotate />
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
              <button onClick={() => setAnnotatedPage(0)}>
                <li onClick={() => handleItemClick(0)} className={selectedItem === 0 ? style.nav_list : style.nav_list_inactive}>All Images</li>
              </button>
              <img src={Pinkline} alt="pink line" className={selectedItem === 0 ? "absolute mt-4" : "hidden"} />
            </div>
            <div>
              <button className={style.button} onClick={() => setAnnotatedPage(1)}>
                <li onClick={() => handleItemClick(1)} className={selectedItem === 1 ? style.nav_list : style.nav_list_inactive}>Not Annotated</li>
                <span className={selectedItem === 1 ? style.span_active : style.span_inactive}>{unAnnotedImages?.length}</span>
              </button>
              <img src={Pinkline} alt="pink line" className={selectedItem === 1 ? 'absolute mt-4 ml-4 w-[133px] h-[2px]' : 'hidden'} />
            </div>
            <div>
              <button className={style.button} onClick={() => setAnnotatedPage(2)}>
                <li onClick={() => handleItemClick(2)} className={selectedItem === 2 ? style.nav_list : style.nav_list_inactive}>Annotated</li>
                <span className={selectedItem === 2 ? style.span_active : style.span_inactive}>{filteredImages?.length}</span>
              </button>
              <img src={Pinkline} alt="pink line" className={selectedItem === 2 ? 'absolute mt-4 ml-4 w-[99px]' : 'hidden'} />
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
        >Start Annotating</button>
      </div>
    </div>
  );
};

export default PrevAnnotatedImg;