/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Dispatch, SetStateAction, useState } from "react";
import { Label } from "../../lib/main";
import DownArrow from "../../lib/assets/images/down-arrow.svg";
import CustomCheckbox from "./CustomCheckbox";
import { AnyObject } from "yup";

interface AccordionProps {
  menus: MenuItem[];
  setResponse: Dispatch<SetStateAction<AnyObject[]>>;
}

interface MenuItem {
  id: number;
  menuName: string;
  isSelected: boolean;
  isAtleastOneSubmenuSelected: boolean;
  isAccordianOpen: boolean;
  children: MenuItem[];
}

const findSelectedMenu = (
  items: MenuItem[],
  path: number[]
): MenuItem | null => {
  let currentItem = items[path[0]];
  for (let i = 1; i < path.length; i++) {
    currentItem = currentItem.children[path[i]];
    if (!currentItem) {
      return null;
    }
  }
  return currentItem;
};

const updateStateRecursively = (
  items: MenuItem[],
  path: number[],
  value: AnyObject
  //   updateFunc: (item: MenuItem) => MenuItem
): MenuItem[] => {
  const [head, ...rest] = path;
  //   return path.length === 1?[...items]
  return items.map((item, index) => {
    if (index === head) {
      if (rest.length > 0) {
        return {
          ...item,
          children: updateStateRecursively(
            item.children,
            rest,
            value
            // updateFunc
          ),
        };
      } else {
        return { ...item, ...value };
      }
    } else {
      return item;
    }
  });
};

const updateParentState = (state: MenuItem[], path: number[]): MenuItem[] => {
  const parentPath = path.slice(0, -1);

  if (parentPath.length === 0) return state;

  const parent = findSelectedMenu(state, parentPath)!;

  const isAtleastOneSubmenuSelected = parent.children.some(
    (child: MenuItem) => child.isSelected || child.isAtleastOneSubmenuSelected
  );
  const areAllSiblingsChecked = parent.children.every(
    (child: MenuItem) => child.isSelected
  );

  const updatedState = updateStateRecursively(state, path, {
    isSelected: areAllSiblingsChecked,
    isAtleastOneSubmenuSelected,
  });

  return updateParentState(updatedState, parentPath);
};

const UpdatedAccordionMenu: React.FC<AccordionProps> = ({
  menus,
  setResponse,
}) => {
  const [menuState, setMenuState] = useState<MenuItem[]>(menus);

  const toggleAccordion = (path: number[]) => {
    setMenuState((prevState) =>
      updateStateRecursively(prevState, path, {
        isAccordianOpen: !findSelectedMenu(prevState, path)?.isAccordianOpen,
      })
    );
  };

  const handleMenuClick = (path: number[], isSelected: boolean) => {
    // Find the selected menu
    const selectedMenu = findSelectedMenu(menuState, path);

    if (!selectedMenu) {
      return;
    }
    // const selectChildren = (
    //   items: MenuItem[],
    //   selected: boolean
    // ): MenuItem[] => {
    //   return items.map((item) => ({
    //     ...item,
    //     isSelected: selected,
    //     // isAtleastOneSubmenuSelected: selected,
    //     children: selectChildren(item.children, selected),
    //   }));
    // };

    // setMenuState((prevState) => selectChildren(prevState, isSelected));

    // const updatedMenuState = updateStateRecursively(
    //   menuState,
    //   path,
    //   { isSelected }
    //   //   (item) => ({
    //   //     ...item,
    //   //     isSelected,
    //   //     children: selectChildren(item.children, isSelected),
    //   //   })
    // );
    console.log(selectedMenu, isSelected);

    setMenuState((prevState) =>
      updateStateRecursively(prevState, path, { isSelected })
    );
    //   const updatedStateWithParents = updateParentState(updatedMenuState, path);
    console.log(menuState, "PPPPP");

    setMenuState((prevState) => updateParentState(prevState, path));
    // setMenuState(updatedStateWithParents);

    if (selectedMenu.children.length > 0) {
      selectedMenu.children.map((_, key) => {
        handleMenuClick([...path, key], isSelected);
      });
    } else {
      setResponse(menuState);
    }

    // const collectLeafNodeIds = (items: MenuItem[]): number[] => {
    //   return items.reduce<number[]>((acc, item) => {
    //     if (item.children.length === 0 && item.isSelected) {
    //       return [...acc, item.id];
    //     }
    //     return [...acc, ...collectLeafNodeIds(item.children)];
    //   }, []);
    // };

    // const leafNodeIds = collectLeafNodeIds(updatedStateWithParents);

    // setResponse((prevState) => {
    //   if (isSelected) {
    //     const newIds = leafNodeIds.filter(
    //       (id) => !prevState.some((menu) => menu.id === id)
    //     );
    //     return [...prevState, ...newIds.map((id) => ({ id }))];
    //   } else {
    //     return prevState.filter((menu) => leafNodeIds.includes(menu.id));
    //   }
    // });
  };

  const renderMenuItems = (items: MenuItem[], path: number[] = []) =>
    items.map((menuItem, index) => {
      const currentPath = [...path, index];

      return (
        <div key={menuItem.id} className="flex flex-col w-full mt-3">
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
              onChange={(isSelected) =>
                handleMenuClick(currentPath, isSelected)
              }
            />
            <div onClick={() => toggleAccordion(currentPath)}>
              <Label className="text-md text-textDarkGray">
                {menuItem.menuName}
              </Label>
            </div>
          </div>
          {menuItem.isAccordianOpen && menuItem.children.length > 0 && (
            <div className="pl-7">
              {renderMenuItems(menuItem.children, currentPath)}
            </div>
          )}
        </div>
      );
    });

  return (
    <div className={`w-full flex flex-col`}>{renderMenuItems(menuState)}</div>
  );
};

export default UpdatedAccordionMenu;
