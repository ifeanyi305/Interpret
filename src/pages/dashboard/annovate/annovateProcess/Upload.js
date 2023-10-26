import React from 'react';
import DropImages from "./uploadProcess/DropImages";
import SaveImages from "./uploadProcess/SaveImages";

const Upload = ({
  imageFiles, imagesPreview, isDraggingOver, isLoading,
  handleFileChange, handleDragEnter, handleDragOver,
  handleDrop, handleDragLeave, setPage, page, setNumber
}) => {

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
          setNumber={setNumber}
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
      {currentPage()}
    </div>
  );
};

export default Upload;