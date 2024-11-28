import React from 'react';
import '../styles/BarWithButton.css';
import { IoIosArrowDown } from "react-icons/io";

const BarWithButton = () => {
  return (
    <div className="bar-container">
      <div className="circle-button"><IoIosArrowDown />
      </div>
      <div className="bar">
        <span>Check Our Products</span>
      </div>
    </div>
  );
};

export default BarWithButton;
