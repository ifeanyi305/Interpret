import React, { useState, useEffect } from 'react';
import UploadIcon from "../../../../../assets/annovate/upload.png";
import Upload from "../../../../../assets/annovate/pinkupload.png";
import FileIcon from "../../../../../assets/annovate/fileIcon.png";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { flash } from '../../../../../redux/flash/flash';
import FolderIcon from "../../../../../assets/annovate/folderIcon.png";
import "./style.css";

const DropImages = () => {
  const [imageFiles, setImageFiles] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedImagesPreview = JSON.parse(localStorage.getItem('imagesPreview'));
    const storedImageFiles = JSON.parse(localStorage.getItem('imageFiles'));

    if (storedImagesPreview) {
      setImagesPreview(storedImagesPreview);
      setImageFiles(storedImageFiles);
    }
  }, []);

  const saveDataToLocalStorage = () => {
    localStorage.setItem('imagesPreview', JSON.stringify(imagesPreview));
    localStorage.setItem('imageFiles', JSON.stringify(imageFiles));
  };

  const handleFileSelection = (selectedFiles) => {
    const allowedFileTypes = ['image/png', 'image/jpeg', 'image/bmp'];

    const validFiles = Array.from(selectedFiles).filter((file) =>
      allowedFileTypes.includes(file.type)
    );

    if (validFiles.length > 0) {
      setIsLoading(true);
      setTimeout(() => {
        setImageFiles(validFiles);

        const imageUrls = validFiles.map((file) => URL.createObjectURL(file));
        setImagesPreview(imageUrls);
        setIsLoading(false);
        saveDataToLocalStorage();
      }, 4000)
    } else {
      flash('warning', 'No valid file types selected. Please select PNG, JPEG, or BMP files.');
    }
  };

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;

    if (selectedFiles.length > 0) {
      const updatedFiles = [...imageFiles, ...selectedFiles];
      handleFileSelection(updatedFiles);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const droppedFiles = e.dataTransfer.files;

    if (droppedFiles.length > 0) {
      const updatedFiles = [...imageFiles, ...droppedFiles];
      handleFileSelection(updatedFiles);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  useEffect(() => {
    return () => {
      imageFiles.forEach((file) => URL.revokeObjectURL(file));
    };
  }, [imageFiles]);

  const style = {
    input: "text-[13px] font-[600] file_input text-[#252525a6]",
    list: "text-[12px] font-[500] text-[#252525a6]",
    inputCon: "border-[1px] w-[50%] border-[#252525a6] py-2 px-4 rounded-[5px] flex gap-4",
  };

  const customStyles = {
    animation: isLoading ? 'file-slide 4s ease-in-out' : '',
  };


  return (
    <div>
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
      <div className="flex items-start gap-2">
        <img src={UploadIcon} alt='upload_icon' />
        <div>
          <div className="border-[#fff] m-auto mt-4 border-[1px] rounded-[70px] h-[8px] bg-[#fff] w-[149px]">
            <div
              style={customStyles}
              className="border-[#fff] border-[1px] bg-[#f10191d9] rounded-[75px] h-[8px] mt-[-1px] w-[0px]"
            ></div>
          </div>
          <p className="text-[20px] font-[500] text-[#252525b3]">Upload Images</p>
          <p className="text-[12px] font-[500] text-[#252525b3]">Supported formats: PNG, JPEG, BMP</p>
        </div>
      </div>
      <div
        className={`bg-[#fff] flex justify-center items-center px-4 file_container rounded-[10px] ${isDraggingOver ? 'bg-gray-200' : ''}`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div>
          <div className="px-6 py-4 text-center md:w-[45%] m-auto">
            <img src={Upload} className="m-auto" alt="upload" />
            <p className="text-[25px] font-[400] text-[#f10191d9]">Drag and drop images here</p>
            <p className="text-[20px] font-[400] text-[#252525a6]">Or</p>
            <div className="flex justify-between items-center gap-2">
              <div className={style.inputCon}>
                <img src={FileIcon} alt="fileicon" />
                <input
                  type="file"
                  accept=".png, .jpeg, .jpg, .bmp"
                  multiple
                  className={style.input}
                  onChange={handleFileChange}
                />
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
                />
              </div>
            </div>
          </div>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div>
              {imageFiles.length > 0 && (
                <div>
                  {imageFiles.map((file, index) => (
                    <div key={index}>
                      <p>{file.name}</p>
                      <img src={imagesPreview[index]} alt={`Selected Preview ${index}`} style={{ maxWidth: '100%' }} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          <div>
            <p className="text-[13px] font-[600] text-[#252525a6]">Instructions</p>
            <ul className="ml-[7px] instruction_list">
              <li className={style.list}>upload dataset with similar objects ghjjkjj,nsjncshk.</li>
              <li className={style.list}>ikljk;puo8tu.kljoyiu.kjl.</li>
              <li className={style.list}>gtiuyt8uououofyfyjh.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropImages;