import React from 'react';

const AnnotatedImg = ({
  filteredImages
}) => {
  return (
    <div>
      <div className="px-[4%] my-4">
        <div className="flex gap-2 flex-wrap">
          {filteredImages?.map((file, index) => (
            <div key={index}>
              <div className="w-[94px] h-[63px] border-[1px] border-[#000000]">
                <img
                  src={file}
                  alt={`Selected Preview ${index}`}
                  className="w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnnotatedImg;
