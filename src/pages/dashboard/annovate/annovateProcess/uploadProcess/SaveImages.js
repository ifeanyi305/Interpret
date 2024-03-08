import React, { useState } from 'react';
import UploadIcon from "../../../../../assets/annovate/upload.png";
import FileIcon from "../../../../../assets/annovate/fileIcon.png";
import FolderIcon from "../../../../../assets/annovate/folderIcon.png";
import trashIcon from "../../../../../assets/dashboard/trashCan.png";
import "./style.css";

const SaveImages = ({
  imageFiles, imagesPreview, isDraggingOver, isLoading,
  handleFileChange, handleDragEnter, handleDragOver,
  handleDrop, handleDragLeave,
  uploadingImg, uploadingImgModal,
  saveImages, saveImgStyle, setPage
}) => {

  const style = {
    inputCon: "border-[1px] border-[#252525a6] py-2 px-4 rounded-[5px] flex gap-4",
    customLabel: "text-[13px] font-[600] text-[#252525a6]"
  };

  const customStyles = {
    animation: isLoading ? 'file-slide 4s ease-in-out' : '',
  };

  const [hoveredTool, setHoveredTool] = useState(null);

  const handleToolsHover = (index) => {
    setHoveredTool(index);
  };

  const handleDeleteImage = (index) => {
    imageFiles.splice(index, 1);
    imagesPreview.splice(index, 1);
  };

  return (
    <div>
      <div className="flex justify-center">
        <div className="w-[100%]">
          {
            uploadingImgModal ? (
              <div className="flex justify-center">
                <div className="py-[5%] bg-[#ABA4BBD9] uploadImgCon fixed m-auto flex justify-center items-center mt-[10%] w-fit rounded-[20px]">
                  <div className="w-[75%]">
                    <h1 className="mb-4 text-center font-[700] text-[23px] text-[#211F53]">THANK YOU</h1>
                    <p className="text-center text-[#211F53] text-[19px] font-[700]">
                      Images have been uploaded successfully, let’s AnnoVate!
                    </p>
                  </div>
                </div>
              </div>
            ) : (<></>)
          }
          <div className="saveImg_con">
            <div className="flex justify-between items-center mt-[-2%]">
              <div className="flex items-start gap-2 mb-4">
                <img className="pt-[3%]" src={UploadIcon} alt='upload_icon' />
                <div>
                  <p className="text-[20px] font-[500] text-[#252525b3]">Upload Images</p>
                  <p className="text-[12px] font-[500] text-[#252525b3]">Supported formats: PNG, JPEG, BMP</p>
                </div>
              </div>
              <div className={uploadingImg ? 'hidden' : 'flex gap-4 items-center'}>
                <button
                  type="button"
                  onClick={() => setPage(0)}
                  className="rounded-[100px] text-[#252525b3] font-[600] text-[14px] border-[1px] border-[#252525b3] px-6 py-2"
                >Cancel</button>
                <button
                  type="button"
                  onClick={() => saveImages()}
                  className="rounded-[204px] verify_email text-[#fff] font-[600] text-[14px] bg-[#f10191d9] px-6 py-2"
                >Save and Continue</button>
              </div>
            </div>
            <div
              className={`bg-[#fff] px-4 file_container rounded-[10px] ${isDraggingOver ? 'bg-gray-200' : ''}`}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className={uploadingImg ? "hidden" : "flex justify-between items-center my-4 gap-2"}>
                <p className="text-[25px] font-[400] text-[#f10191d9]">Drag and drop images here</p>
                <div className="flex items-center gap-4">
                  <div className={style.inputCon}>
                    <img src={FileIcon} alt="fileicon" />
                    <input
                      type="file"
                      id="ctl"
                      accept=".png, .jpeg, .jpg, .bmp"
                      multiple
                      className={style.input}
                      onChange={handleFileChange}
                      style={{
                        opacity: 0,
                        position: 'absolute',
                        zIndex: -1,
                        // cursor: 'pointer',
                      }}
                    />
                    <label htmlFor="ctl" className={style.customLabel}>
                      Select Files
                    </label>
                  </div>
                  <div className={style.inputCon} >
                    <img src={FolderIcon} alt="FolderIcon" />
                    <input
                      type="file"
                      id="ctrl"
                      webkitdirectory="true"
                      directory=""
                      multiple
                      className={style.input}
                      onChange={handleFileChange}
                      style={{
                        opacity: 0,
                        position: 'absolute',
                        zIndex: -1,
                        // cursor: 'pointer',
                      }}
                    />
                    <label htmlFor="ctrl" className={style.customLabel}>
                      Select Folder
                    </label>
                  </div>
                </div>
              </div>
              <div>
                {
                  isLoading ? (
                    <div>
                      <div className="border-[#fff] m-auto my-4 border-[1px] rounded-[70px] h-[8px] bg-[#fff] w-full">
                        <div
                          style={customStyles}
                          className="border-[#fff] border-[1px] bg-[#f10191d9] rounded-[75px] h-[8px] mt-[-1px] w-[0px]"
                        ></div>
                      </div>
                    </div>
                  ) : (<></>)
                }
              </div>
              {imagesPreview.length > 0 ? (
                <div>
                  <div>
                    {
                      uploadingImg ? (
                        <div>
                          <div className="border-[#fff] m-auto my-4 border-[1px] rounded-[70px] h-[8px] bg-[#fff] w-full">
                            <p className="text-[13px] font-[500] text-[#252525b3]">Uploading images...</p>
                            <div
                              style={saveImgStyle}
                              className="border-[#fff] border-[1px] bg-[#f10191d9] rounded-[75px] h-[8px] mt-[-1px] w-[0px]"
                            ></div>
                          </div>
                        </div>
                      ) : (<></>)
                    }
                  </div>
                  <hr className="mb-4" />
                  <div className="px-[7%] my-4 overflow-y-auto max-h-[389px] h-[389px] scrollbar">
                    {imageFiles?.length > 0 && (
                      <div className="flex gap-2 flex-wrap" onMouseLeave={() => handleToolsHover(null)}>
                        {imageFiles?.map((file, index) => (
                          <div key={index}>
                            <div
                              className="w-[54px] h-[36px]"
                              onMouseEnter={() => handleToolsHover(index)}
                            >
                              <img
                                src={imagesPreview[index]}
                                alt={file.name}
                                className="w-full h-full cursor-pointer"
                              />
                            </div>
                            {hoveredTool === index && (
                              <div className="relative mt-[-36px] bg-[#EBF1F1] trashShadow">
                                <img
                                  onClick={() => handleDeleteImage(index)}
                                  src={trashIcon}
                                  alt="trash icon"
                                  className="m-auto py-2 cursor-pointer" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (<></>)
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveImages;