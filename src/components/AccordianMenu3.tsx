import React, { Dispatch, SetStateAction, useState } from "react";
import { Label } from "../../lib/main";
import DownArrow from "../../lib/assets/images/down-arrow.svg";
import { AnyObject } from "yup";

interface MenuObject {
  value: number;
  label: string;
  isChecked: boolean;
  isAccordianOpen: boolean;
  isAtleastOneSubMenuSelected: boolean;
  parentId: number;
  subMenu: AnyObject;
}
interface AccordionProps {
  menu: AnyObject;
  response: AnyObject;
  setResponse: Dispatch<SetStateAction<AnyObject[]>>;
  menuMap: Map<string, MenuObject>;
  customStyle?: string;
}

const isObjectEmpty = (obj: AnyObject): boolean => {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }
  if (Array.isArray(obj)) {
    return obj.length === 0;
  }
  return Object.keys(obj).length === 0;
};

const getNestedProperty = (obj: AnyObject, path: string[]): AnyObject => {
  let menuObj: AnyObject = {};
  Object.assign(menuObj, obj);
  path.map((p) => {
    if (p === path[path.length - 1]) {
      menuObj = menuObj[p];
    } else {
      Object.assign(menuObj, menuObj[p].subMenu);
    }
  });
  return menuObj;
};

const updateNestedState = (
  state: AnyObject,
  path: string[],
  value: AnyObject
): AnyObject => {
  const [head, ...rest] = path;
  return path.length === 1
    ? {
        ...state,
        [head]: {
          ...state[head],
          ...value,
          subMenu: state[head].subMenu,
        },
      }
    : {
        ...state,
        [head]: {
          ...state[head],
          subMenu: updateNestedState(state[head].subMenu, rest, value),
        },
      };
};

const AccordionMenu3: React.FC<AccordionProps> = ({
  menu,
  //   response,
  setResponse,
  //   customStyle,
  // menuMap,
}) => {
  const [menuState, setMenuState] = useState(menu);

  const toggleAccordion = (path: string[]) => {
    setMenuState((prevState) => {
      return updateNestedState(prevState, path, {
        isAccordianOpen: !getNestedProperty(prevState, path)?.isAccordianOpen,
      });
    });
  };

  const handleMenuClick = (path: string[], isSelected: boolean) => {
    const selectedMenu = getNestedProperty(menuState, path);
    setMenuState((prevState) =>
      updateNestedState(prevState, path, {
        isChecked: isSelected,
      })
    );

    if (!isObjectEmpty(selectedMenu.subMenu)) {
      Object.keys(selectedMenu.subMenu).map((key) => {
        handleMenuClick([...path, key], isSelected);
      });
    } else {
      if (!isSelected) {
        setResponse((prevState) => {
          return prevState.filter((menu) => menu.id !== selectedMenu.value);
        });
      } else {
        setResponse((prevState) => {
          const isAlreadyPresent = prevState.some(
            (menu) => menu.id === selectedMenu.value
          );
          if (!isAlreadyPresent) {
            return [...prevState, { id: selectedMenu.value }];
          } else {
            return prevState;
          }
        });
      }
    }
  };

  const renderMenuItems = (menu: AnyObject, path: string[] = []) =>
    Object.entries(menu).map(([key, menuItem]) => {
      const currentPath = [...path, key];

      return (
        <div key={key} className="flex flex-col w-full">
          <div className="cursor-pointer flex items-center">
            {!isObjectEmpty(menuItem?.subMenu) ? (
              <div
                onClick={() => toggleAccordion(currentPath)}
                className="flex items-center"
              >
                <img
                  src={DownArrow}
                  alt={menuItem.isAccordianOpen ? "down arrow" : "right arrow"}
                  className="h-3 w-3 mx-1"
                  style={{
                    transform: menuItem.isAccordianOpen
                      ? "rotate(0deg)"
                      : "rotate(-90deg)",
                  }}
                />
              </div>
            ) : (
              <div className="flex items-center h-3 w-3 mx-1" />
            )}
            <input
              type="checkbox"
              checked={menuItem.isChecked}
              onChange={() => handleMenuClick(currentPath, !menuItem.isChecked)}
              className="mr-2"
            />
            <Label>{menuItem.label}</Label>
          </div>
          {menuItem.isAccordianOpen &&
            menuItem.subMenu &&
            !isObjectEmpty(menuItem.subMenu) && (
              <div className="pl-7">
                {renderMenuItems(menuItem.subMenu, currentPath)}
              </div>
            )}
        </div>
      );
    });

  return (
    <div className={`w-full flex flex-col`}>{renderMenuItems(menuState)}</div>
  );
};

export default AccordionMenu3;
