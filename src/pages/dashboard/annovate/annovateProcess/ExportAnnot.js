import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateProgress } from "../../../../redux/annotateProgress/progress";
import aiIcon from "../../../../assets/annovate/ai_icon.png";
import datasetIcon from "../../../../assets/annovate/datasetIcon.png";
import "./style.css";

const ExportAnnot = ({ annotations }) => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const [datasets, setDatasets] = useState([]);
  const [exportModal, setExportModal] = useState(false);
  const [showFormat, setShowFormat] = useState(false);
  const [selectedText, setSelectedText] = useState('COCO');
  const style = {
    formatTitle: "text-[#252525A6] text-[15px] font-[600] px-4",
    formatText: "text-[#252525A6] text-[14px] font-[400] py-[1.5px] pl-8 cursor-pointer hover:bg-[#E8E8E8]",
  }

  const handleClick = (text, isTitle) => {
    if (!isTitle) {
      setSelectedText(text);
    }
    setShowFormat(!showFormat);
  };

  const toggleFormat = () => {
    setShowFormat(!showFormat);
  }

  const toggleExportModal = () => {
    setExportModal(!exportModal);
  }

  const renderFormatItem = (text, formatTitle = false) => {
    return (
      <div key={text} onClick={() => handleClick(text, formatTitle)}>
        {formatTitle ? (
          <p className={style.formatTitle}>{text}</p>
        ) : (
          <p className={style.formatText}>{text}</p>
        )}
      </div>
    );
  };

  useEffect(() => {
    const filteredDatasets = annotations?.filter(annotation => annotation?.projectId.includes(projectId));

    setDatasets(filteredDatasets);
  }, [annotations, projectId]);

  const exportAnnot = [
    {
      title: "Annoted Dataset",
      icon: datasetIcon,
      desc: "Lorem ipsum dolor sit amet consectetur. Orci nec lectus commodo natoque amet"
    },
    {
      title: "Trained AI Model",
      icon: aiIcon,
      desc: "Lorem ipsum dolor sit amet consectetur. Orci nec lectus commodo natoque amet"
    }
  ];

  const handleDownload = () => {
    const data = {
      projectId,
      newKey: "export",
    }
    dispatch(updateProgress(data));
  };

  return (
    <div>
      {exportModal ? (
        <div className="flex exportModal z-50 justify-center items-center h-full fixed mt-[-6%] w-full ml-[-26%]">
          <div className="bg-[#FFFFFF] rounded-[10px] py-4 px-6 w-[478px] h-[250px]">
            <div className="mb-4 mt-2">
              <h1 className="text-[#545454] font-[600] text-[20px] text-center">Export Dataset</h1>
            </div>
            <div>
              <p className="text-[#252525A6] font-[700] text-[15px]">Format:</p>
              <div onClick={() => toggleFormat()} className="flex cursor-pointer justify-between items-center gap-2 border-[1px] border-[#252525A8] rounded-[5px] px-6 py-[4px] bg-[#D9D9D900]">
                <p className="text-[#252525A6] font-[400] text-[15px]">{selectedText}</p>
                <span className="cursor-pointer" onClick={() => toggleFormat()}>{showFormat ? <>&uarr;</> : <>&darr;</>}</span>
              </div>
              {showFormat && (
                <div className="fixed">
                  <div className="border-[#252525A8] border-[1px] mt-[2px] w-[397px] py-2 h-[278px] overflow-y-auto rounded-[5px] bg-[#FEFEFE]">
                    {renderFormatItem('JSON', true)}
                    {renderFormatItem('COCO')}
                    {renderFormatItem('XML', true)}
                    {renderFormatItem('YOLOv5 Oriented Bounding Boxes')}
                    {renderFormatItem('TXT', true)}
                    <div className="py-2">
                      {[
                        'YOLO Darknet',
                        'YOLO v3 Keras',
                        'YOLO v4 PyTorch',
                        'Scaled-YOLOv4',
                        'YOLOv5 Oriented Bounding Boxes',
                        'meituan/YOLOv6',
                        'YOLO v5 PyTorch',
                        'YOLO v7 PyTorch',
                        'YOLOv8',
                      ].map((item) => renderFormatItem(item))}
                    </div>
                    {renderFormatItem('CSV', true)}
                    {renderFormatItem('Tensorflow Object Detection')}
                  </div>
                </div>
              )}
            </div>
            <p className="text-[#252525A6] my-2 text-[15px] font-[400]">TXT annotations and YAML config used with {selectedText}</p>
            <div className="flex items-center justify-center gap-4 my-6">
              <button onClick={() => toggleExportModal()} className="rounded-[20px] border-[1px] border-[#252525A6] px-6 py-[5px] text-[15px] text-[#252525A6] font-[500]">Cancel</button>
              <button className="rounded-[20px] bg-[#F10191D9] px-6 py-[6px] text-[15px] font-[500] text-[#FFFFFF]">Continue</button>
            </div>
          </div>
        </div>
      ) : <></>}
      <div className="blur_exportModal">
        <h1 className="text-[25px] font-[500] text-[#F10191D9] text-center">Hey, It&apos;s a success!</h1>
        <div className="w-[85%] m-auto my-2">
          <p className="text-[18px] font-[500] text-[#252525A6] text-center">
            Your dataset has been annotated successfully.
            Now you can export your annotated dataset and also,
            an object detection model that is trained on your dataset.
          </p>
        </div>
        <div className="flex items-center gap-4 mt-6">
          {exportAnnot.map((annot, index) => (
            <div key={index} className="w-full bg-[#fff] py-4 border-[#F10191] export_con border-[1px] rounded-[10px]">
              <div className="w-[75%] m-auto">
                <p className="text-[18px] font-[600] text-[#252525B2] text-center">{annot.title}</p>
                <img src={annot.icon} className="m-auto my-4" alt="dataset icon" />
                <p className="text-[18px] font-[400] text-[#252525A6] text-center">{annot.desc}</p>
                <div className="flex justify-center my-4 items-center">
                  <button
                    type='button'
                    onClick={annot.title === "Annoted Dataset" ? () => toggleExportModal() : undefined}
                    className="bg-[#F10191D9] rounded-[204px] px-8 py-2 font-[700] text-[15px] text-[#fff]"
                  >
                    Export
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExportAnnot;
