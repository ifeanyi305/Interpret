import React, { useState } from "react";
import PrevAutoAnnot from "./autoAnnotProcess/PrevAutoAnnot";
import StartAutoAnnot from "./autoAnnotProcess/StartAutoAnnot";

const AutoAnnot = ({ imageFiles, imagesPreview, manualImages, autoImages }) => {
  const [autoAnnotPage, setAutoAnnotPage] = useState(0);

  const currentAnnotPage = () => {
    switch (autoAnnotPage) {
      case 0:
        return <PrevAutoAnnot
          imagesPreview={imagesPreview}
          imageFiles={imageFiles}
          setAutoAnnotPage={setAutoAnnotPage}
          manualImages={manualImages}
          autoImages={autoImages}
        />
      case 1:
        return <StartAutoAnnot
          imagesPreview={imagesPreview}
          imageFiles={imageFiles}
          setAutoAnnotPage={setAutoAnnotPage}
        />
      default:
        return <PrevAutoAnnot />
    }
  }

  return (
    <div>
      {currentAnnotPage()}
    </div>
  );
};

export default AutoAnnot;
