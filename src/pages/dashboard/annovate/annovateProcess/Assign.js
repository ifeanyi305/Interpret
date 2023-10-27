import React from 'react';

const Assign = ({
  imageFiles, imagesPreview, setNumber
}) => {
  return (
    <div>
      <div className="w-full px-[9%] pt-[2%] pb-[4%] rounded-[100px] bg-[#fff] border-[1px] border-[#f10191d9]">
        <p className="font-[700] text-[18px] text-[#252525b3] text-center">
          AnnoVate requires you to label a small
          proportion of your data, The rest of your data
          will be auto labeled by AI.
        </p>
      </div>
      <p className="text-[16px] mt-[-20px] font-[700] text-center w-fit m-auto rounded-[200px] text-[#fff] bg-[#f10191d9] px-4 py-2">
        Here we have assigned two proportions of your data
      </p>
      <div className="flex justify-between items-center gap-4 mt-6">
        <div>
          <p className="text-center py-2 text-[14px] font-[700] text-[#252525b3]">
            15% of your data to be labeled manually by you
          </p>
          <div className="border-[1px] border-[#f10191d9] rounded-[5px] px-6 py-[4px]">
            <div className="px-[7%] my-4">
              {imageFiles.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {imageFiles.map((file, index) => (
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
        </div>
        <div>
          <p className="text-center py-2 text-[14px] font-[700] text-[#252525b3]">
            85% of your data to be annotated by AI
          </p>
          <div className="border-[1px] border-[#f10191d9] rounded-[5px] px-6 py-[4px]">
            <div className="px-[7%] my-4">
              {imageFiles.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {imageFiles.map((file, index) => (
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
        </div>
      </div>
      <div className="flex justify-end my-4">
        <button
          onClick={() => setNumber(2)}
          className="rounded-[204px] text-[#fff] font-[600] verify_email text-[14px] bg-[#f10191d9] px-6 py-2"
          type="button"
        >Continue</button>
      </div>
    </div>
  );
};

export default Assign;