import React from 'react';
import Elipse from "../../../../../../assets/annovate/Ellipse.png";


const LabelPrev = ({ label }) => {

  return (
    <div>
      <div className="h-[140px] scrollbar overflow-y-auto">
        {
          label.map((data, index) => (
            <div key={index} className="flex items-center rounded-[8px] gap-2 hover:bg-[#F101914D] py-[4px]">
              <img src={Elipse} alt="elipse" />
              <p className="text-[15px] font-[400] label_text text-[#fff]">{data}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default LabelPrev;