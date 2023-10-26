import React, { useState, useEffect } from 'react';
import Upload from './annovateProcess/Upload';
import Assign from './annovateProcess/Assign';
import { flash } from '../../../redux/flash/flash';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Annovate = () => {
  const [number, setNumber] = useState(0);
  const [page, setPage] = useState(0);

  const [imageFiles, setImageFiles] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelection = (selectedFiles) => {
    const allowedFileTypes = ['image/png', 'image/jpeg', 'image/bmp'];

    const validFiles = Array.from(selectedFiles).filter((file) =>
      allowedFileTypes.includes(file.type)
    );

    if (validFiles?.length > 0) {
      setIsLoading(true);
      setTimeout(() => {
        setImageFiles(validFiles);
        const imageUrls = validFiles.map((file) => URL.createObjectURL(file));
        setImagesPreview(imageUrls);
        setIsLoading(false);
      }, 4000)
      setTimeout(() => {
        setPage(1);
      }, 5500)
    } else {
      flash('warning', 'No valid file types selected. Please select PNG, JPEG, or BMP files.');
    }
  };

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;

    if (selectedFiles?.length > 0) {
      const updatedFiles = [...imageFiles, ...selectedFiles];
      handleFileSelection(updatedFiles);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const droppedFiles = e.dataTransfer.files;

    if (droppedFiles?.length > 0) {
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

  const currentState = () => {
    switch (number) {
      case 0:
        return <Upload
          setNumber={setNumber}
          page={page}
          setPage={setPage}
          imageFiles={imageFiles}
          imagesPreview={imagesPreview} isDraggingOver={isDraggingOver}
          isLoading={isLoading}
          handleFileChange={handleFileChange} handleDragEnter={handleDragEnter}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop} handleDragLeave={handleDragLeave}
        />
      case 1:
        return <Assign
        />
      default:
        return <Upload />
    }
  }

  return (
    <div className="mt-[10%]">
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
      {currentState()}
    </div>
  );
};

export default Annovate;