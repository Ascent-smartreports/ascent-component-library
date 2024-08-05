import React, { Dispatch, SetStateAction } from "react";
import { Label } from "../../lib/main";
// import DownArrow from "../../assets/images/down-arrow.svg";
// import RightArrow from "../../assets/images/right-arrow.svg";
import TriangleIcon from "./TriangleIcon";
import { AnyObject } from "yup";

interface Response {
  reportId: string;
  sortId: number;
}
interface AccordionProps {
  menu: AnyObject;
  response: AnyObject;
  setResponse: Dispatch<SetStateAction<Response[]>>;
  customStyle?: string;
}

export const AccordionMenu: React.FC<AccordionProps> = ({
  menu,
  response,
  setResponse,
  customStyle,
}) => {
  const handleOnMenuClick = (submenu: AnyObject[]) => {
    // const updatedResponse=response.
    const selectedMenu = [];
    submenu.map((menu) => {
      selectedMenu.push({
        reportId: menu.id,
        sortId: menu.iddd});
    });
    setResponse((prevState) => [...prevState]);
  };
  return (
    <div className="w-full flex flex-wrap">
      {menu.map((item: AnyObject) => (
        <div key={item.value} className="w-full">
          <div
            className={` cursor-pointer  w-min-72 ${customStyle}`}
            onClick={() => {
              handleOnMenuClick();
            }}
          >
            {/* {item.value === selectedOption ? (
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
            )} */}
            <TriangleIcon />
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
