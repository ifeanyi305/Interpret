import React from 'react';
import UploadIcon from "../../../../../assets/annovate/upload.png";
import Upload from "../../../../../assets/annovate/pinkupload.png";
import FileIcon from "../../../../../assets/annovate/fileIcon.png";
import FolderIcon from "../../../../../assets/annovate/folderIcon.png";
import "./style.css";

const DropImages = () => {
  const style = {
    input: "text-[13px] font-[600] text-[#252525a6]",
    list: "text-[12px] font-[500] text-[#252525a6]",
  };

  return (
    <div>
      <div className="flex items-start gap-2">
        <img src={UploadIcon} alt='upload_icon' />
        <div>
          <p className="text-[20px] font-[500] text-[#252525b3]">Upload Images</p>
          <p className="text-[12px] font-[500] text-[#252525b3]">Supported formats: PNG, JPEG, BMP</p>
        </div>
      </div>
      <div className="bg-[#fff] flex justify-center items-center px-4 file_container rounded-[10px]">
        <div className="px-6 py-4 text-center">
          <img src={Upload} className="m-auto" alt="upload" />
          <p className="text-[25px] font-[400] text-[#f10191d9]">Drag and drop images here</p>
          <p className="text-[20px] font-[400] text-[#252525a6]">Or</p>
          <div className="flex justify-between items-center gap-2">
            <div className="border-[1px] border-[#252525a6] py-2 px-4 rounded-[5px]">
              <img src={FileIcon} alt="fileicon" />
              <input
                type="file"
                className={style.input}
              />
            </div>
            <div className="border-[1px] border-[#252525a6] py-2 px-4 rounded-[5px]">
              <img src={FolderIcon} alt="FolderIcon" />
              <input
                type="file"
                className={style.input}
              />
            </div>
          </div>
        </div>
        <div>
          <p className="text-[13px] font-[600] text-[#252525a6]">Instructions</p>
          <ul className="ml-[7px] instruction_list">
            <li className={style.list}>upload dataset with similar objects ghjjkjj,nsjncshk.</li>
            <li className={style.list}>ikljk;puo8tu.kljoyiu.kjl.</li>
            <li className={style.list}>gtiuyt8uououofyfyjh.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DropImages;