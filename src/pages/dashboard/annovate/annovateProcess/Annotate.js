import React, { useState } from 'react';
import PrevAnnotatedImg from './annotateProcess/PrevAnnotatedImg';
import StartAnnotation from './annotateProcess/StartAnnotation';

const Annotate = ({
  imageFiles, imagesPreview, manualImages,
   autoImages, setNumber, setSelectedItem, annotations, setAnnotations,
   annotatedImages, setAnnotatedImages
}) => {
  const [annotPage, setAnnotPage] = useState(0);
  const [showLabel, setShowLabel] = useState(false);


  const currentPage = () => {
    switch (annotPage) {
      case 0:
        return <PrevAnnotatedImg
          imagesPreview={imagesPreview}
          imageFiles={imageFiles}
          manualImages={manualImages}
          autoImages={autoImages}
          setAnnotPage={setAnnotPage}
          setShowLabel={setShowLabel}
          annotatedImages={annotatedImages}
        />
      case 1:
        return <StartAnnotation
          setAnnotPage={setAnnotPage}
          imagesPreview={imagesPreview}
          manualImages={manualImages}
          setNumber={setNumber}
          setSelectedItem={setSelectedItem}
          imageFiles={imageFiles} setShowLabel={setShowLabel}
          showLabel={showLabel}
          annotatedImages={annotatedImages}
          setAnnotatedImages={setAnnotatedImages}
          annotations={annotations}
          setAnnotations={setAnnotations}
        />
      default:
        return <PrevAnnotatedImg />
    }
  }

  return (
    <div>
      {currentPage()}
    </div>
  );
};

export default Annotate;