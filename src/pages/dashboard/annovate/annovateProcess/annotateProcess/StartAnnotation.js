import React, { useState } from 'react';
import {
  ReactPictureAnnotation,
  defaultShapeStyle,
} from "react-picture-annotation";

const StartAnnotation = ({
  imageFiles, imagesPreview
}) => {
  const [ann, setAnn] = useState([]);

  const onSelect = (selectedId) => {
    console.log("selected id",selectedId);
  };
  const onChange = (data) => {
    console.log("annotation data",data);
    setAnn(data);
  };
  const imagePath = "https://as2.ftcdn.net/v2/jpg/04/33/36/05/1000_F_433360513_EyYtlNaz3fCJU5UHaPhURBodPCwNIMVN.jpg";

  return (
    <div>
      Start Annotation
      <ReactPictureAnnotation
        image={imagePath}
        onSelect={onSelect}
        onChange={onChange}
        scrollSpeed={0.0005}
        width={500}
        height={500}
        annotationStyle={{
          ...defaultShapeStyle,
          shapeStrokeStyle: "#FF9E80",
          transformerBackground: "black",
          lineWidth: 1,
          fontBackground: "#9f82ff"
        }}
        annotationData={ann}
      />
    </div>
  );
};

export default StartAnnotation;