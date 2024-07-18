import React, { useState } from "react";
import { Label } from "../Texts";
import DownArrow from "../../assets/images/down-arrow.svg";
import RightArrow from "../../assets/images/right-arrow.svg";

interface AccordionProps {
  menu: { label: string; value: string }[];
  handleSelectedMenu: (label: string, value: string) => void;
  subMenu?: { label: string; value: string }[];
  handleSelectedSubMenu: (label: string, value: string) => void;
  customStyle?: string;
}

export const AccordionMenu: React.FC<AccordionProps> = ({
  menu,
  handleSelectedMenu,
  subMenu = [],
  handleSelectedSubMenu,
  customStyle,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleMenuClick = (value: string, label: string) => {
    setSelectedOption((prevSelected) => (prevSelected === value ? "" : value));
    handleSelectedMenu(label, value);
  };

  return (
    <div className="w-full flex flex-wrap">
      {menu.map((item) => (
        <div key={item.value} className="w-full">
          <div
            className={` cursor-pointer  w-min-72 ${customStyle}`}
            onClick={() => handleMenuClick(item.value, item.label)}
          >
            {item.value === selectedOption ? (
              <>
                <img
                  src={DownArrow}
                  alt="down arrow"
                  className="h-5 w-5 mx-1"
                />
                <div className="bg-backgroundTheme h-[10px] w-[10px] absolute ml-[31px]" />
              </>
            ) : (
              <img
                src={RightArrow}
                alt="right arrow"
                className="h-3 w-3 mx-1"
              />
            )}
            <div className="h-4 w-4 rounded-[3px] border-backgroundTheme border-2 mr-2" />
            <Label>{item.label}</Label>
          </div>
          {item.value === selectedOption && subMenu.length > 0 && (
            <div className="ml-8 mt-2">
              {subMenu.map((subItem) => (
                <div
                  key={subItem.value}
                  className="flex items-center cursor-pointer  w-64 pl-2"
                  onClick={() =>
                    handleSelectedSubMenu(subItem.label, subItem.value)
                  }
                >
                  <div className="h-4 w-4 rounded-[3px] border-backgroundTheme border-2 mr-2" />
                  <Label>{subItem.label}</Label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
