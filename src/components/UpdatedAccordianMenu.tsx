/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Label } from "ascent-component-library";
import DownArrow from "../../lib/assets/images/down-arrow.svg";
import CustomCheckbox from "./CustomCheckbox";
import { AnyObject } from "yup";
import { updateMenuState } from "./updatedNewResponseObj";

interface MenuKeys {
  idKeys: string[];
  nameKeys: string[];
}

type BaseMenuItem = {
  isSelected: boolean;
  isAtleastOneSubmenuSelected: boolean;
  isAccordianOpen: boolean;
  children: BaseMenuItem[];
};

type ResponseBaseMenuItem = {
  isSelected: boolean;
  children: ResponseBaseMenuItem[];
};

type MenuItem<K extends MenuKeys> = BaseMenuItem & {
  [key: string]: any;
  children: MenuItem<K>[];
};

type ResponseMenuItem<K extends MenuKeys> = ResponseBaseMenuItem & {
  [key: string]: any;
  children: ResponseMenuItem<K>[];
};

interface AccordionProps<K extends MenuKeys> {
  menus: MenuItem<K>[];
  setResponse: Dispatch<SetStateAction<ResponseMenuItem<K>[]>>;
  menuKeys: K;
}

const getDynamicKey = (item: AnyObject, keys: string[]): string | undefined => {
  return keys.find((key) => Object.prototype.hasOwnProperty.call(item, key));
};

const AccordionMenu = <K extends MenuKeys>({
  menus,
  setResponse,
  menuKeys,
}: AccordionProps<K>): React.JSX.Element => {
  const [menuState, setMenuState] = useState<MenuItem<K>[]>(menus);

  useEffect(() => {
    const updatedResponse = removeProperties(menuState);
    setResponse(updatedResponse);
  }, [menuState]);

  const removeProperties = (menus: MenuItem<K>[]): ResponseMenuItem<K>[] => {
    return menus.map((menu) => {
      const { isAtleastOneSubmenuSelected, isAccordianOpen, ...rest } = menu;

      const updatedChildren = removeProperties(menu.children || []);

      return {
        ...rest,
        children: updatedChildren,
      };
    });
  };

  const findSelectedMenu = (
    items: MenuItem<K>[],
    path: number[]
  ): MenuItem<K> | null => {
    let currentItem = items[path[0]];
    for (let i = 1; i < path.length; i++) {
      currentItem = currentItem.children[path[i]];
      if (!currentItem) {
        return null;
      }
    }
    return currentItem;
  };

  const updateNestedState = (
    items: MenuItem<K>[],
    path: number[],
    value: AnyObject
  ): MenuItem<K>[] => {
    const [head, ...rest] = path;

    return items.map((item, index) => {
      if (index === head) {
        if (rest.length > 0) {
          return {
            ...item,
            children: updateNestedState(item.children, rest, value),
          };
        } else {
          return { ...item, ...value };
        }
      } else {
        return item;
      }
    });
  };

  const updateParentState = (
    state: MenuItem<K>[],
    path: number[]
  ): MenuItem<K>[] => {
    const parentPath = path.slice(0, -1);

    if (parentPath.length === 0) return state;

    const parent = findSelectedMenu(state, parentPath)!;

    const isAtleastOneSubmenuSelected = parent.children.some(
      (child) => child.isSelected || child.isAtleastOneSubmenuSelected
    );
    const areAllSiblingsChecked = parent.children.every(
      (child) => child.isSelected
    );

    const updatedState = updateNestedState(state, parentPath, {
      isSelected: areAllSiblingsChecked,
      isAtleastOneSubmenuSelected,
    });

    return updateParentState(updatedState, parentPath);
  };

  const toggleAccordion = (path: number[]) => {
    setMenuState((prevState) =>
      updateNestedState(prevState, path, {
        isAccordianOpen: !findSelectedMenu(prevState, path)?.isAccordianOpen,
      })
    );
  };

  const handleMenuClick = (path: number[], isSelected: boolean) => {
    const selectedMenu = findSelectedMenu(menuState, path);

    if (!selectedMenu) return;

    setMenuState((prevState) =>
      updateNestedState(prevState, path, {
        isSelected,
      })
    );
    setMenuState((prevState) => updateParentState(prevState, path));
    setMenuState((prevState) => updateMenuState(prevState));

    if (selectedMenu.children.length > 0) {
      selectedMenu.children.map((_, key) => {
        handleMenuClick([...path, key], isSelected);
      });
    }
  };

  const renderMenuItems = (items: MenuItem<K>[], path: number[] = []) =>
    items.map((menuItem, index) => {
      const currentPath = [...path, index];
      const nameKey = getDynamicKey(menuItem, menuKeys.nameKeys);

      return (
        <div
          key={menuItem[nameKey as keyof MenuItem<K>]}
          className="flex flex-col w-full mt-3 pl-7"
        >
          <div className="cursor-pointer flex items-center gap-2">
            {menuItem.children.length > 0 ? (
              <div
                onClick={() => toggleAccordion(currentPath)}
                className="flex items-center"
              >
                <img
                  src={DownArrow}
                  alt={menuItem.isAccordianOpen ? "down arrow" : "right arrow"}
                  className="h-[10px] w-[10px]"
                  style={{
                    transform: menuItem.isAccordianOpen
                      ? "rotate(0deg)"
                      : "rotate(-90deg)",
                  }}
                />
              </div>
            ) : (
              <div className="flex items-center h-[10px] w-[10px]" />
            )}
            <CustomCheckbox
              isChecked={menuItem.isSelected}
              isAtleastOneSubMenuSelected={menuItem.isAtleastOneSubmenuSelected}
              onChange={(isSelected: boolean) =>
                handleMenuClick(currentPath, isSelected)
              }
            />
            <div onClick={() => toggleAccordion(currentPath)}>
              <Label className="text-md text-textDarkGray">
                {menuItem[nameKey as keyof MenuItem<K>]}
              </Label>
            </div>
          </div>
          {menuItem.isAccordianOpen &&
            menuItem.children.length > 0 &&
            renderMenuItems(menuItem.children, currentPath)}
        </div>
      );
    });

  return (
    <div className={`w-full flex flex-col`}>{renderMenuItems(menuState)}</div>
  );
};

export default AccordionMenu;
