import React, { useState } from 'react';
import PrevAnnotate from './annotateProcess/PrevAnnotate';
import StartAnnotation from './annotateProcess/StartAnnotation';

const Annotate = ({
  imageFiles, imagesPreview
}) => {
  const [annotPage, setAnnotPage] = useState(0);

  const currentPage = () => {
    switch (annotPage) {
      case 0:
        return <PrevAnnotate
          imagesPreview={imagesPreview}
          imageFiles={imageFiles}
          setAnnotPage={setAnnotPage}
        />
      case 1:
        return <StartAnnotation imagesPreview={imagesPreview} imageFiles={imageFiles} />
      default:
        return <PrevAnnotate />
    }
  }

  return (
    <div>
      {currentPage()}
    </div>
  );
};

export default Annotate;