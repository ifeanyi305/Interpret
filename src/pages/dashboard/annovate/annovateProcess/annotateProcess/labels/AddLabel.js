import React from 'react';

const AddLabel = ({ setLabelStep, label, setLabel, labelInput, setLabelInput }) => {

  const handleAddLabel = (e) => {
    e.preventDefault();
    setLabel([...label, labelInput]);
    setLabelInput("");
    setLabelStep(2);
  };

  return (
    <div className="ml-[-8%]">
      <div className="bg-[#1D2244] border-[1px] my-8 w-fit m-auto border-[#F10191] rounded-[8px] p-4">
        <form onSubmit={handleAddLabel}>
          <input
            type="text"
            placeholder="Insert label"
            className="bg-[#110E55] block mb-4 border-[1px] border-[#F10191B2] rounded-[8px] px-6 py-[4px] text-[#D9D9D9] text-[15px] font-[400]"
            value={labelInput}
            required
            onChange={(e) => setLabelInput(e.target.value)} />
          <div className="flex justify-end">
            <button
              className="rounded-[12px] text-[#fff] font-[600] text-[14px] bg-[#f10191d9] px-6 py-[3px]"
              type="submit"
            >Enter</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLabel;