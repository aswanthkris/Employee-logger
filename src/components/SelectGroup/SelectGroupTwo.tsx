"use client";
import React, { useState } from "react";

interface SelectGroupTwoProps {
  options: {
    icon: React.ReactNode;
    placeholder: string;
    items: string[];
  };
  getChoosedStatus: (status: string) => void;
}
const SelectGroupTwo: React.FC<SelectGroupTwoProps> = ({
  options,
  getChoosedStatus,
  ...props
}) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  return (
    <div>
      <div className="relative z-20 bg-white dark:bg-form-input">
        <span className="absolute left-4 top-1/2 z-30 -translate-y-1/2">
          {options.icon}
        </span>

        <select
          value={selectedOption}
          onChange={(e) => {
            setSelectedOption(e.target.value);
            getChoosedStatus(e.target.value);
            changeTextColor();
          }}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
            isOptionSelected ? "text-black dark:text-white" : ""
          }`}
        >
          <option value="" disabled className="text-body dark:text-bodydark">
            {options?.placeholder}
          </option>
          {options?.items.map((item, index) => (
            <option
              key={index}
              value={item}
              className="text-body dark:text-bodydark"
            >
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectGroupTwo;
