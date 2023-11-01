import React from 'react';

const PrevAnnotate = ({
  imageFiles, imagesPreview, setAnnotPage
}) => {
  return (
    <div>
      <div className="w-full border-[#f10191d9] bg-white annotate_container scrollbar rounded-[10px] border-[1px] px-6 py-2">
        <p className="text-[15px] font-[600] text-[#f10191d9]">All Images</p>
        <hr className="w-full my-4" />
        <div className="px-[3%] my-4">
          {imageFiles?.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {imageFiles?.map((file, index) => (
                <div key={index}>
                  <p className="hidden">{file.name}</p>
                  <img
                    src={imagesPreview[index]}
                    alt={`Selected Preview ${index}`}
                    className="w-[54px] h-[34px]"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end my-4">
        <button
          onClick={() => setAnnotPage(1)}
          className="rounded-[204px] text-[#fff] font-[600] verify_email text-[14px] bg-[#f10191d9] px-6 py-2"
          type="button"
        >Start Annotating</button>
      </div>
    </div>
  );
};

export default PrevAnnotate;