import React from 'react';
import UploadIcon from "../../../../../assets/annovate/upload.png";
import Upload from "../../../../../assets/annovate/pinkupload.png";
import FileIcon from "../../../../../assets/annovate/fileIcon.png";
import 'react-toastify/dist/ReactToastify.css';
import FolderIcon from "../../../../../assets/annovate/folderIcon.png";
import "./style.css";

const DropImages = ({
  imageFiles, imagesPreview, isDraggingOver, isLoading,
  handleFileChange, handleDragEnter, handleDragOver,
  handleDrop, handleDragLeave
}) => {
  const style = {
    input: "cursor-pointer",
    list: "text-[12px] font-[500] text-[#252525a6]",
    inputCon: "border-[1px] border-[#252525a6] py-2 cursor-pointer px-4 rounded-[5px] flex gap-4",
    customLabel: "text-[13px] font-[600] text-[#252525a6]",
  };

  const customStyles = {
    animation: isLoading ? 'file-slide 4s ease-in-out' : '',
  };

  return (
    <div>
      <div className="flex justify-center">
        <div className="w-full">
          <div className="flex items-start gap-2 mb-4">
            <img className="pt-[1%]" src={UploadIcon} alt='upload_icon' />
            <div>
              <p className="text-[20px] font-[500] text-[#252525b3]">Upload Images</p>
              <p className="text-[12px] font-[500] text-[#252525b3]">Supported formats: PNG, JPEG, BMP</p>
            </div>
          </div>
          <div
            className={`bg-[#fff] px-4 file_container rounded-[10px] ${isDraggingOver ? 'bg-gray-200' : ''}`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div>
              {
                isLoading ? (
                  <div>
                    <p className="font-[700] text-[25px] text-center mt-4 text-[#f10191d9]">Processing Files...</p>
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
                <div className="px-[7%] my-4">
                  {imageFiles.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                      {imageFiles.map((file, index) => (
                        <div key={index}>
                          <p className="hidden">{file.name}</p>
                          <img
                            src={imagesPreview[index]}
                            alt={`Selected Preview ${index}`}
                            className="w-[54px] h-[34px]"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <div className="px-6 py-4 text-center mt-2 md:w-[45%] m-auto">
                  <img src={Upload} className="m-auto my-2 bg-[#f1019140] rounded-[50%] p-4" alt="upload" />
                  <p className="text-[25px] font-[400] text-[#f10191d9]">Drag and drop images here</p>
                  <p className="text-[20px] font-[400] mb-2 text-[#252525a6]">Or</p>
                  <div className="flex justify-center items-center gap-4">
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
                        }}
                      />
                      <label htmlFor="ctl" className={style.customLabel}>
                        Select Files
                      </label>
                    </div>
                    <div className={style.inputCon}>
                      <img src={FolderIcon} alt="FolderIcon" />
                      <input
                        type="file"
                        id="ctrl"
                        webkitdirectory
                        directory
                        multiple
                        className={style.input}
                        onChange={handleFileChange}
                        style={{
                          opacity: 0,
                          position: 'absolute',
                          zIndex: -1,
                        }}
                      />
                      <label htmlFor="ctrl" className={style.customLabel}>
                        Select Folder
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-2 mb-[7%]">
                  <div>
                    <p className="text-[13px] font-[600] text-[#252525a6]">Instructions</p>
                    <ul className="ml-[9%] instruction_list">
                      <li className={style.list}>upload dataset with similar objects ghjjkjj,nsjncshk.</li>
                      <li className={style.list}>ikljk;puo8tu.kljoyiu.kjl.</li>
                      <li className={style.list}>gtiuyt8uououofyfyjh.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropImages;