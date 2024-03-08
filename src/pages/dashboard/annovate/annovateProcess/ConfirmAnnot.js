import React, { useState } from 'react';
import "./style.css";
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateProgress } from "../../../../redux/annotateProgress/progress";

const ConfirmAnnot = ({ imageFiles, imagesPreview, setNumber, setSelectedItem, manualImages }) => {
  const [selectedImage, setSelectedImage] = useState(manualImages[0]);
  const [imgPreviewModal, setImgPreviewModal] = useState(false);
  const { projectId } = useParams();
  const dispatch = useDispatch();

  const handlePage = () => {
    setNumber(5);
    setSelectedItem(5)
    const data = {
      projectId,
      newKey: "confirm",
    }
    dispatch(updateProgress(data));
  }

  const editImage = () => {
    setNumber(2);
    setSelectedItem(2)
  }

  const handleImgPreview = (index) => {
    setSelectedImage(manualImages[index]);
    setImgPreviewModal(true)
  }

  const style = {
    nav_list: 'text-[15px] font-[600] px-4 text-[#f10191d9]',
    button: 'flex items-center gap-2 px-4',
  }

  return (
    <div className="annotate_container mt-[-1.5%]">
      <div className="w-full border-[#f10191d9] blur_imgPreview bg-white h-[80%] max-h-[433px] scrollbar overflow-y-auto rounded-[10px] border-[1px] py-2">
        <nav className="my-2 px-6">
          <ul className="flex items-center gap-4">
            <li className={style.nav_list}>Annotated Images</li>
          </ul>
        </nav>
        <hr className="w-full my-4" />
        <div className="px-[4%] my-4">
          <div className="flex gap-2 flex-wrap">
            {manualImages?.map((file, index) => (
              <div key={index}>
                <div
                  onClick={() => handleImgPreview(index)}
                  className="w-[94px] h-[63px] border-[1px] border-[#000000] cursor-pointer img_hover"
                >
                  <img
                    src={file}
                    alt={`Selected Preview ${index}`}
                    className="w-full h-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex blur_imgPreview justify-end my-4 start_annotating_btn">
        <button
          onClick={() => handlePage()}
          className="rounded-[204px] text-[#fff] font-[600] verify_email text-[14px] bg-[#f10191d9] px-6 py-2"
          type="button"
        >Confirm</button>
      </div>
      {
        imgPreviewModal ? (
          <div className="flex imgPreviewModal justify-center">
            <div className="border-[1px] mt-[-35%] border-[#F10191D9] fixed w-fit rounded-[10px] bg-[#FFFFFF]">
              <div className="bg-[#211F53] imgPreview_header">
                <p className="text-center text-[15px] font-[600] text-[#FFFFFF] py-2">Images preview</p>
              </div>
              <div className="p-4">
                <img className="w-[481px] h-[327px] rounded-[10px] border-[0.5px] border-[#000000]" src={selectedImage} alt="annotated_image" />
              </div>
              <hr />
              <div className="flex justify-center items-center gap-4 my-4">
                <button
                  type="button"
                  onClick={() => setImgPreviewModal(!imgPreviewModal)}
                  className="rounded-[100px] border-[1px] border-[#252525A6] px-6 py-[5px] text-[12px] text-[#252525A6] font-[700]"
                >Close</button>
                <button
                  type="button"
                  onClick={editImage}
                  className="rounded-[100px] bg-[#F10191D9] px-6 py-[6px] text-[12px] font-[600] text-[#FFFFFF]"
                >Edit image</button>
              </div>
            </div>
          </div>
        ) : (<></>)
      }
    </div>
  );
};

export default ConfirmAnnot;
