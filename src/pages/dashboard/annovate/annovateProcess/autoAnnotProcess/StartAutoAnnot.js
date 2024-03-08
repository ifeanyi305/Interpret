import React from 'react';
import roboticAnnimation from "../../../../../assets/annovate/roboticAnnimation.gif";

const StartAutoAnnot = ({ setAutoAnnotPage }) => {
  return (
    <div className="annotate_container mt-[2%]">
      <div className="w-full border-[#f10191d9] bg-white h-[80%] rounded-[10px] border-[1px] py-2 px-4">
        <div className="mb-2 mt-6">
          <h1 className="text-center text-[#252525A6] font-[700] text-[22px]">AnnoVate is labeling the rest of your data</h1>
        </div>
        <div>
          <img src={roboticAnnimation} alt="robotic annimation" className="m-auto w-fit h-[270px]" />
        </div>
        <div>
          <p className="text-[18px] font-[400] text-center text-[#252525A6]">
            You will be notified once your data is labeled, then
            you can export your dataset and a trained model.
            Do you want to cancel this process?
            <button type="button"><span className="text-[#F10191D9] ml-[3px]">click here</span></button>
          </p>
        </div>
      </div>
      <div className="flex justify-between my-4 start_annotating_btn">
        <button
          onClick={() => setAutoAnnotPage(0)}
          className="rounded-[100px] border-[2px] bg-[#fff] border-[#252525A6] text-[#252525A6] font-[700] text-[14px] px-6 py-2"
          type="button"
        >Cancel</button>
        <p className="text-[18px] text-[#252525A6] font-[600]">Remaining time: 5 hrs 16 mins</p>
      </div>
    </div>
  );
};

export default StartAutoAnnot;