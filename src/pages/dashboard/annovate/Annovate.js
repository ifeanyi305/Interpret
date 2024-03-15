import React, { useState, useEffect } from 'react';
import { getToken } from '../../../components/auth/Signin';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { BlobServiceClient } from "@azure/storage-blob";
import Upload from './annovateProcess/Upload';
import Assign from './annovateProcess/Assign';
import Annotate from './annovateProcess/Annotate';
import AutoAnnot from './annovateProcess/AutoAnnot';
import ConfirmAnnot from './annovateProcess/ConfirmAnnot';
import ExportAnnot from './annovateProcess/ExportAnnot';
import { flash } from '../../../redux/flash/flash';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./annovateProcess/uploadProcess/style.css";
import { updateProgress } from "../../../redux/annotateProgress/progress";

const Annovate = ({
  imageFiles, imagesPreview,
  setImageFiles, setImagesPreview,
  number, setNumber, selectedItem, setSelectedItem
}) => {
  const [page, setPage] = useState(0);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [annotations, setAnnotations] = useState([]);
  const [annotatedImages, setAnnotatedImages] = useState([]);
  const [uploadingImgModal, setUploadingImgModal] = useState(false);
  const [imageURLs, setImageURLs] = useState([]);
  const dispatch = useDispatch();

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
        setPage(1);
      }, 4000)
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

  const userDetails = getToken();
  const user_Id = userDetails?.id;
  const { projectId } = useParams();
  const containerName = "datasets";
  const storageAccountName = "datasetstorage";
  const sasToken = "sp=racwli&st=2024-01-09T11:22:10Z&se=2024-03-31T19:22:10Z&sv=2022-11-02&sr=c&sig=3a9ClLup3FPsjOtarZ1JwxusWjdhP0Do%2BgwNPMJSTVw%3D";
  const userId = user_Id;
  const blobServiceClient = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
  );
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const uploadFiles = async (files) => {
    const startTime = performance.now(); //start time recording

    const uploadPromises = files.map(async (file, index) => {
      let blobName = `${userId}/${projectId}/`;

      if (index < Math.ceil(files.length * 0.2)) {
        blobName += "manual/" + file?.name;
      } else {
        blobName += "auto/" + file?.name;
      }

      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      await blockBlobClient.uploadBrowserData(file);
    });

    await Promise.all(uploadPromises); // Waiting for all uploads to complete

    const endTime = performance.now(); // end time recording
    const uploadTime = (endTime - startTime) / 1000;

    return uploadTime;
  };

  const [animationDuration, setAnimationDuration] = useState(0)
  const [uploadTimeForTimeout, setUploadTimeForTimeout] = useState(0);

  const saveImages = async () => {
    try {
      setUploadingImg(true);

      const uploadTime = await uploadFiles(imageFiles);

      setAnimationDuration(uploadTime);
      setUploadTimeForTimeout(uploadTime);

      setUploadingImgModal(true);
      setUploadingImg(false);
      setTimeout(() => {
        const data = {
          projectId,
          newKey: "upload",
        }
        dispatch(updateProgress(data));
        setUploadingImgModal(false);
        setNumber(1);
        setSelectedItem(1);
      }, uploadTimeForTimeout + 1500);
    } catch (error) {
      flash("error", `Error uploading images: ${error.message}`);
    }
  };
  const [saveImgStyle, setSaveImgStyle] = useState({});

  useEffect(() => {
    const saveImgStyle = {
      animation: `file-slide ${animationDuration}s ease-in-out`,
    };

    setSaveImgStyle(saveImgStyle);
  }, [animationDuration]);

  useEffect(() => {
    const getImages = async () => {
      try {
        let blobPrefix = `${userId}/${projectId}/`;
        const iter = containerClient.listBlobsFlat({ prefix: blobPrefix });
        let images = [];
        for await (const blob of iter) {
          if (blob.name.includes(projectId)) {
            images.push(blob.name);
          }
        }
        const imageURLs = images.map(blobName => {
          return `https://datasetstorage.blob.core.windows.net/datasets/${blobName}`;
        });

        // Checking if the component is still mounted before updating state
        if (!isComponentUnmounted.current) {
          setImageURLs(imageURLs);
          localStorage.setItem('imageURLs', JSON.stringify(imageURLs));
        }
      } catch (error) {

      }
    };

    const isComponentUnmounted = { current: false };

    getImages();

    // Cleanup function to set the flag when the component is unmounted
    return () => {
      isComponentUnmounted.current = true;
    };
  }, [projectId, userId, containerClient]);

  const manualImages = imageURLs.filter(url => url.includes('/manual/'));
  const autoImages = imageURLs.filter(url => url.includes('/auto/'));

  useEffect(() => {
    const storedAnnotations = localStorage.getItem('annotations');
    const storedAnnotatedImages = localStorage.getItem('annotatedImages');

    if (storedAnnotations) {
      setAnnotations(JSON.parse(storedAnnotations));
    }

    if (storedAnnotatedImages) {
      setAnnotatedImages(JSON.parse(storedAnnotatedImages));
    }
  }, [setAnnotatedImages]);

  useEffect(() => {
    localStorage.setItem('annotations', JSON.stringify(annotations));
  }, [annotations]);

  useEffect(() => {
    localStorage.setItem('annotatedImages', JSON.stringify(annotatedImages));
  }, [annotatedImages]);

  const currentState = () => {
    switch (number) {
      case 0:
        return <Upload
          setNumber={setNumber}
          page={page}
          setPage={setPage}
          imageFiles={imageFiles}
          imagesPreview={imagesPreview}
          imageURLs={imageURLs}
          setImageURLs={setImageURLs}
          uploadingImg={uploadingImg}
          setUploadingImg={setUploadingImg}
          uploadingImgModal={uploadingImgModal}
          setUploadingImgModal={setUploadingImgModal}
          saveImages={saveImages}
          saveImgStyle={saveImgStyle}
          isDraggingOver={isDraggingOver}
          isLoading={isLoading}
          handleFileChange={handleFileChange} handleDragEnter={handleDragEnter}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop} handleDragLeave={handleDragLeave}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      case 1:
        return <Assign
          imageFiles={imageFiles}
          imagesPreview={imagesPreview}
          manualImages={manualImages}
          autoImages={autoImages}
          imageURLs={imageURLs}
          setNumber={setNumber}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      case 2:
        return <Annotate
          imageFiles={imageFiles}
          imagesPreview={imagesPreview}
          manualImages={manualImages}
          autoImages={autoImages}
          setNumber={setNumber}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          annotations={annotations}
          setAnnotations={setAnnotations}
          annotatedImages={annotatedImages}
          setAnnotatedImages={setAnnotatedImages}
        />
      case 3:
        return <AutoAnnot
          imageFiles={imageFiles}
          imagesPreview={imagesPreview}
          manualImages={manualImages}
          autoImages={autoImages}
          setNumber={setNumber}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      case 4:
        return <ConfirmAnnot
          imageFiles={imageFiles}
          imagesPreview={imagesPreview}
          manualImages={manualImages}
          autoImages={autoImages}
          setNumber={setNumber}
          setSelectedItem={setSelectedItem}
        />
      case 5:
        return <ExportAnnot
          annotations={annotations}
        />
      default:
        return <Upload />
    }
  }

  return (
    <div className="mt-[10%] px-[8%]">
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