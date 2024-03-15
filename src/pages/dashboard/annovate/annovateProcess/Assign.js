import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateProgress } from "../../../../redux/annotateProgress/progress";
import { createProject } from '../../../../redux/project/createProject';

const Assign = ({
  imageFiles, imagesPreview, setNumber,
  setSelectedItem, manualImages, autoImages, imageURLs
}) => {
  const { projectId } = useParams();
  const dispatch = useDispatch();

  const filteredImageNames = imageURLs.map(img_url => {
    const urlParts = img_url.split('/');
    const imageName = urlParts[urlParts.length - 1];
    return imageName.slice(0, imageName.indexOf('.'));
  });
  
  // console.log(filteredImageNames);

  const handleScreenChange = () => {
    setNumber(2);
    setSelectedItem(2);
    const data = {
      projectId,
      newKey: "splitDatasets",
    }
    dispatch(updateProgress(data));
  }

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
      <div className="flex items-center gap-4 mt-6">
        <div className="w-full">
          <p className="text-center py-2 text-[14px] font-[700] text-[#252525b3]">
            15% of your data to be labeled manually by you
          </p>
          <div className="border-[1px] bg-white assign_con w-full border-[#f10191d9] overflow-y-auto h[80%] rounded-[5px] px-6 py-[4px]">
            <div className="px-[7%] my-4">
              <div className="flex gap-2 flex-wrap">
                {manualImages?.map((imageUrl, index) => (
                  <div key={index}>
                    <div className="w-[54px] h-[36px] border-[1px] border-[#000000]">
                      <img
                        src={imageUrl}
                        alt={`blobImages ${index + 1}`}
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <p className="text-center py-2 text-[14px] font-[700] text-[#252525b3]">
            85% of your data to be annotated by AI
          </p>
          <div className="border-[1px] bg-white w-full assign_con border-[#f10191d9] overflow-y-auto h[80%] rounded-[5px] px-6 py-[4px]">
            <div className="px-[7%] my-4">
              <div className="flex gap-2 flex-wrap">
                {autoImages?.map((imageUrl, index) => (
                  <div key={index}>
                    <div className="w-[54px] h-[36px] border-[1px] border-[#000000]">
                      <img
                        src={imageUrl}
                        alt={`blobImages ${index + 1}`}
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end my-4">
        <button
          onClick={() => handleScreenChange()}
          className="rounded-[204px] text-[#fff] font-[600] verify_email text-[14px] bg-[#f10191d9] px-6 py-2"
          type="button"
        >Continue</button>
      </div>
    </div>
  );
};

export default Assign;