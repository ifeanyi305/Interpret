import React from 'react';
import LabelIcon from "../../../../../../assets/annovate/labelEmpty.png";

const EmptyLabel = () => {
  return (
    <div>
      <div className="my-8 ml-[-8%]">
        <img className="m-auto" src={LabelIcon} alt="label icon" />
        <p className="text-center text-[19px] text-[#fff] font-[400]">Label list is empty</p>
      </div>
    </div>
  );
};

export default EmptyLabel;