import React, { useState, useEffect } from 'react';
import DropImages from "./uploadProcess/DropImages";
import SaveImages from "./uploadProcess/SaveImages";
import { flash } from '../../../../redux/flash/flash';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Upload = () => {
  const [page, setPage] = useState(0);

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
        // setPage(1);
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

  const currentPage = () => {
    switch (page) {
      case 0:
        return <DropImages
          setPage={setPage}
          imageFiles={imageFiles}
          imagesPreview={imagesPreview} isDraggingOver={isDraggingOver}
          isLoading={isLoading}
          handleFileChange={handleFileChange} handleDragEnter={handleDragEnter}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop} handleDragLeave={handleDragLeave}
        />
      case 1:
        return <SaveImages
          setPage={setPage}
          imageFiles={imageFiles}
          imagesPreview={imagesPreview} isDraggingOver={isDraggingOver}
          isLoading={isLoading}
          handleFileChange={handleFileChange} handleDragEnter={handleDragEnter}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop} handleDragLeave={handleDragLeave}
        />
      default:
        <DropImages />
    }
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
      {currentPage()}
    </div>
  );
};

export default Upload;