import React, { useState } from 'react';
import DropImages from "./uploadProcess/DropImages";
import SaveImages from "./uploadProcess/SaveImages";

const Upload = () => {
  const [page, setPage] = useState(0);

  const currentPage = () => {
    switch (page) {
      case 0:
        return <DropImages />
      case 1:
        return <SaveImages />
      default:
        <DropImages />    
    }
  };

  return (
    <div>
      {currentPage()}
    </div>
  );
};

export default Upload;