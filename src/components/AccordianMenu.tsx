import React, { Dispatch, SetStateAction, useState } from "react";
import { Label } from "../../lib/main";
import DownArrow from "../../lib/assets/images/down-arrow.svg";
import { AnyObject } from "yup";
import CustomCheckbox from "./CustomCheckbox";

interface AccordionProps {
  menu: AnyObject;
  setResponse: Dispatch<SetStateAction<AnyObject[]>>;
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

const updateParentState = (state: AnyObject, path: string[]): AnyObject => {
  const parentPath = path.slice(0, -1);

  if (parentPath.length === 0) {
    return state;
  }

  const parent = getNestedProperty(state, parentPath);

  const isAtleastOneSubMenuSelected = Object.keys(parent.subMenu).some(
    (key) =>
      parent.subMenu[key].isChecked ||
      parent.subMenu[key].isAtleastOneSubMenuSelected
  );

  const areAllSiblingsChecked = Object.keys(parent.subMenu).every(
    (key) => parent.subMenu[key].isChecked
  );

  const updatedState = updateNestedState(state, parentPath, {
    isChecked: areAllSiblingsChecked,
    isAtleastOneSubMenuSelected,
  });

  return updateParentState(updatedState, parentPath);
};

const AccordionMenu3: React.FC<AccordionProps> = ({ menu, setResponse }) => {
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
    setMenuState((prevState) => updateParentState(prevState, path));

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
          <div className="cursor-pointer flex items-center gap-2">
            {!isObjectEmpty(menuItem?.subMenu) ? (
              <div
                onClick={() => toggleAccordion(currentPath)}
                className="flex items-center"
              >
                <img
                  src={DownArrow}
                  alt={menuItem.isAccordianOpen ? "down arrow" : "right arrow"}
                  className="h-3 w-3"
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
            <CustomCheckbox
              isChecked={menuItem.isChecked}
              isAtleastOneSubMenuSelected={menuItem.isAtleastOneSubMenuSelected}
              onChange={(isSelected) =>
                handleMenuClick(currentPath, isSelected)
              }
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
