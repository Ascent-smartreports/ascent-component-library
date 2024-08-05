import React, { Dispatch, SetStateAction } from "react";
import { Label } from "../../lib/main";
import DownArrow from "../../assets/images/down-arrow.svg";
import RightArrow from "../../assets/images/right-arrow.svg";
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

const AccordionMenu: React.FC<AccordionProps> = ({
  menu,
  response,
  setResponse,
  customStyle,
}) => {
  const toggleAccordion = (id: string) => {
    menu[id].isAccordianOpen = !menu[id].isAccordianOpen;
  };

  const handleOnMenuClick = (selectedMenu: AnyObject) => {
    if (selectedMenu.isChecked) {
      menu[String(selectedMenu.value)].isChecked = false;
      menu[String(selectedMenu.value)].isAtleastOneSubMenuSelected = false;
      if (menu[String(selectedMenu.value)]?.subMenu) {
        menu[String(selectedMenu.value)].subMenu.forEach(
          (subMenu: AnyObject) => {
            const updatedResponse = response.filter(
              (resObj: Response) => resObj.reportId === subMenu.value
            );
            setResponse(updatedResponse);
            subMenu.isChecked = false;
          }
        );
      } else {
        const updatedResponse = response.filter(
          (resObj: Response) =>
            resObj.reportId === menu[String(selectedMenu.value)].value
        );
        setResponse(updatedResponse);
      }
    } else {
      menu[String(selectedMenu.value)].isChecked = true;
      menu[String(selectedMenu.value)].isAtleastOneSubMenuSelected = true;
      if (menu[String(selectedMenu.value)]?.subMenu) {
        menu[String(selectedMenu.value)].subMenu.forEach(
          (subMenu: AnyObject) => {
            const selectedMenuResponse: Response[] = [];
            selectedMenuResponse.push({
              reportId: subMenu.value,
              sortId: subMenu.id,
            });
            setResponse((prevState) => [...prevState, ...selectedMenuResponse]);
            subMenu.isChecked = true;
          }
        );
      } else {
        const selectedMenuResponse: Response[] = [];
        selectedMenuResponse.push({
          reportId: selectedMenu.value,
          sortId: selectedMenu.id,
        });
        setResponse((prevState) => [...prevState, ...selectedMenuResponse]);
        menu[String(selectedMenu.value)].isChecked = true;
      }
    }
  };
  const handleOnSubMenuClick = (
    selectedSubMenu: AnyObject,
    parentMenu: AnyObject
  ) => {
    if (selectedSubMenu.isChecked) {
      const isAllSubmenuSelected = menu[String(parentMenu.value)].isChecked;

      if (
        menu[String(parentMenu.value)].subMenu.length === 1 &&
        menu[String(parentMenu.value)].isAtleastOneSubMenuSelected === true
      ) {
        menu[String(parentMenu.value)].isAtleastOneSubMenuSelected = false;
      } else if (
        menu[String(parentMenu.value)].subMenu.length > 1 &&
        isAllSubmenuSelected === false
      ) {
        let countSelectedSubmenu = 0;
        menu[String(parentMenu.value)].subMenu.map((subMenu: AnyObject) => {
          if (subMenu.isChecked) {
            countSelectedSubmenu = countSelectedSubmenu + 1;
          }
        });
        if (countSelectedSubmenu === 1) {
          menu[String(parentMenu.value)].isAtleastOneSubMenuSelected = false;
        } else {
          menu[String(parentMenu.value)].isAtleastOneSubMenuSelected = true;
        }
      } else if (
        menu[String(parentMenu.value)].subMenu.length > 1 &&
        isAllSubmenuSelected === true
      ) {
        menu[String(parentMenu.value)].isAtleastOneSubMenuSelected = true;
      }

      menu[String(parentMenu.value)].subMenu.forEach((subMenu: AnyObject) => {
        if (selectedSubMenu.value === subMenu.value) {
          const updatedResponse = response.filter(
            (resObj: Response) => resObj.reportId === subMenu.value
          );
          setResponse(updatedResponse);
          subMenu.isChecked = false;
          if (isAllSubmenuSelected) {
            menu[String(parentMenu.value)].isChecked = false;
          }
        }
      });
    } else {
      menu[String(parentMenu.value)].isAtleastOneSubMenuSelected = true;
      menu[String(parentMenu.value)].subMenu.forEach((subMenu: AnyObject) => {
        if (selectedSubMenu.value === subMenu.value) {
          const selectedMenu: Response[] = [];
          selectedMenu.push({
            reportId: subMenu.value,
            sortId: subMenu.value,
          });
          setResponse((prevState) => [...prevState, ...selectedMenu]);
          subMenu.isChecked = true;
        }
      });
    }
  };
  return (
    <div className="w-full flex flex-wrap">
      {Object.entries(menu).map(([key, menuItem]) => (
        <div key={key} className="w-full">
          <div
            className={` cursor-pointer  w-min-72 ${customStyle}`}
            onClick={() => {
              handleOnMenuClick(menuItem);
            }}
          >
            {!menu[key].isAccordianOpen ? (
              <div
                onClick={() => {
                  toggleAccordion(key);
                }}
              >
                <img
                  src={DownArrow}
                  alt="down arrow"
                  className="h-5 w-5 mx-1"
                />
                <div className="bg-backgroundTheme h-[10px] w-[10px] absolute ml-[31px]" />
              </div>
            ) : (
              <div
                onClick={() => {
                  toggleAccordion(key);
                }}
              >
                <img
                  src={RightArrow}
                  alt="right arrow"
                  className="h-3 w-3 mx-1"
                />
              </div>
            )}
            <div className="h-4 w-4 rounded-[3px] border-backgroundTheme border-2 mr-2" />
            <Label>{menuItem.label}</Label>
          </div>
          {menu[key].isAccordianOpen && (
            <div className="ml-8 mt-2">
              {menuItem.subMenu.map((subMenu: AnyObject) => (
                <div
                  key={subMenu.id}
                  className="flex items-center cursor-pointer  w-64 pl-2"
                  onClick={() => handleOnSubMenuClick(subMenu, menuItem)}
                >
                  <div className="h-4 w-4 rounded-[3px] border-backgroundTheme border-2 mr-2" />
                  <Label>{subMenu.label}</Label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AccordionMenu;

const menuExample = {
  "-6": {
    value: -6,
    label: "Bank Advice2",
    isChecked: false,
    isAccordianOpen: false,
    submenu: [
      { value: 297, label: "Bank Advice Active", isChecked: false },
      { value: 296, label: "Bank Advice Consolidated", isChecked: false },
    ],
  },
  "-16": {
    value: -16,
    label: "Bank Advice3",
    isChecked: false,
    isAccordianOpen: false,
    submenu: [
      { value: 297, label: "Bank Advice Active", isChecked: false },
      { value: 296, label: "Bank Advice Consolidated", isChecked: false },
    ],
  },
  "-116": {
    value: -116,
    label: "Bank Advice",
    isChecked: false,
    isAccordianOpen: false,
    submenu: [
      { value: 297, label: "Bank Advice Active", isChecked: false },
      { value: 296, label: "Bank Advice Consolidated", isChecked: false },
    ],
  },
};
console.log(menuExample);
