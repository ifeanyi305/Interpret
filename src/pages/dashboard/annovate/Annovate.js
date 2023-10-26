import React, { useState } from 'react';
import Upload from './annovateProcess/Upload';

const Annovate = () => {
  const [number, setNumber] = useState(0);
  const currentState = () => {
    switch (number) {
      case 0:
        return <Upload setNumber={setNumber} />
      default:
        return <Upload />  
    }
  }

  return (
    <div className="mt-[10%]">
      {currentState()}
    </div>
  );
};

export default Annovate;