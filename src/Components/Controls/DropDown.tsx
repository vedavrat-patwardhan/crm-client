import React, { useState } from "react";
import { DropDownModel } from "../../Models/ComponentsModel";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";

export const DropDown: React.FC<DropDownModel> = (props) => {
  const { placeholder, options, handleInput, btnClass, dropClsss } = props;
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <div className="dropdown">
      <button
        className={`dropdown-btn ${btnClass}`}
        onClick={() => setIsActive(!isActive)}
      >
        {placeholder}
        {isActive ? <ArrowDropUp /> : <ArrowDropDown />}
      </button>
      {isActive && (
        <div className={`dropdown-box ${dropClsss}`}>
          {options.map((option) => (
            <button
              className="dropdown-box__content"
              onClick={() => {
                handleInput(option);
                setIsActive(false);
              }}
              key={option}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
