import React from 'react';
import DropImages from "./uploadProcess/DropImages";
import SaveImages from "./uploadProcess/SaveImages";

const Upload = ({
  imageFiles, imagesPreview, isDraggingOver, isLoading,
  handleFileChange, handleDragEnter, handleDragOver,
  handleDrop, handleDragLeave, setPage, page, setNumber, setSelectedItem,
  uploadingImg, setUploadingImg, uploadingImgModal, setUploadingImgModal,
  imageURLs, saveImages, saveImgStyle
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
          setPage={setPage}
          setNumber={setNumber}
          imageFiles={imageFiles}
          imagesPreview={imagesPreview}
          uploadingImg={uploadingImg}
          setUploadingImg={setUploadingImg}
          uploadingImgModal={uploadingImgModal}
          setUploadingImgModal={setUploadingImgModal}
          imageURLs={imageURLs}
          saveImages={saveImages}
          saveImgStyle={saveImgStyle}
          isDraggingOver={isDraggingOver}
          isLoading={isLoading}
          handleFileChange={handleFileChange} handleDragEnter={handleDragEnter}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop} handleDragLeave={handleDragLeave}
          setSelectedItem={setSelectedItem}
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