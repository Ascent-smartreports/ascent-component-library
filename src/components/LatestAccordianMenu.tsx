/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ToolTipLabel } from "ascent-component-library";
import DownArrow from "./down-arrow.svg";
import PlusIcon from "./plus.svg";
import { AnyObject } from "yup";

interface MenuKeys {
  idKeys: string[];
  nameKeys: string[];
  childrenKeys: string[];
}

type MenuItem<K extends MenuKeys> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
} & {
  [P in K["childrenKeys"][number]]?: MenuItem<K>[];
};

type ResponseMenuItem<K extends MenuKeys> = {
  [key: string]: any;
} & {
  [P in K["childrenKeys"][number]]?: ResponseMenuItem<K>[];
};

interface AccordionProps<K extends MenuKeys> {
  resetMenus?: boolean;
  menus: MenuItem<K>[];
  setResponse?: Dispatch<SetStateAction<ResponseMenuItem<K>[]>>;
  menuKeys: K;
}

const getDynamicKey = (item: AnyObject, keys: string[]): string | undefined => {
  return keys.find((key) => Object.prototype.hasOwnProperty.call(item, key));
};

const getChildrenKey = (
  item: AnyObject,
  keys: string[]
): string | undefined => {
  return keys.find((key) => Array.isArray(item[key]));
};

function isEqual(obj1: AnyObject, obj2: AnyObject) {
  if (typeof obj1 !== typeof obj2) return false;
  if (typeof obj1 !== "object" || obj1 === null || obj2 === null) {
    return obj1 === obj2;
  }
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) return false;
    for (let i = 0; i < obj1.length; i++) {
      if (!isEqual(obj1[i], obj2[i])) return false;
    }
    return true;
  }
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;
  for (const key of keys1) {
    // eslint-disable-next-line no-prototype-builtins
    if (!obj2.hasOwnProperty(key) || !isEqual(obj1[key], obj2[key])) {
      return false;
    }
  }
  return true;
}

const AccordionMenu = <K extends MenuKeys>({
  resetMenus = false,
  menus,
  menuKeys,
}: AccordionProps<K>): React.JSX.Element => {
  const [menuState, setMenuState] = useState<MenuItem<K>[]>(
    JSON.parse(JSON.stringify(menus))
  );
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (!isEqual(menus, menuState) && count === 0) {
      setMenuState(JSON.parse(JSON.stringify(menus)));
    }
  }, [JSON.stringify(menus)]);

  useEffect(() => {
    if (resetMenus) {
      setMenuState(menus);
      setCount(0);
    }
  }, [resetMenus]);

  const removeProperties = (menus: MenuItem<K>[]): ResponseMenuItem<K>[] => {
    return menus?.map((menu) => {
      const { isAccordianOpen, ...rest } = menu;

      const childrenKey = getChildrenKey(menu, menuKeys.childrenKeys);
      const updatedChildren = childrenKey
        ? removeProperties(menu[childrenKey as keyof MenuItem<K>] || [])
        : [];

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
      const childrenKey = getChildrenKey(currentItem, menuKeys.childrenKeys);
      if (!childrenKey) return null;

      currentItem = currentItem[childrenKey][path[i]];
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

    return items?.map((item, index) => {
      if (index === head) {
        const childrenKey = getChildrenKey(item, menuKeys.childrenKeys);
        if (rest.length > 0 && childrenKey) {
          return {
            ...item,
            [childrenKey]: updateNestedState(item[childrenKey], rest, value),
          };
        } else {
          return { ...item, ...value };
        }
      } else {
        return item;
      }
    });
  };

  const toggleAccordion = (path: number[]) => {
    setMenuState((prevState) =>
      updateNestedState(prevState, path, {
        isAccordianOpen: !findSelectedMenu(prevState, path)?.isAccordianOpen,
      })
    );
    setCount((prev) => prev + 1);
  };

  const renderMenuItems = (items: MenuItem<K>[], path: number[] = []) =>
    items?.map((menuItem, index) => {
      const currentPath = [...path, index];
      const nameKey = getDynamicKey(menuItem, menuKeys.nameKeys);
      const childrenKey = getChildrenKey(menuItem, menuKeys.childrenKeys);

      // Identify if it's a filter or custom fields label
      const isFilterOrCustomField =
        menuItem[nameKey as keyof MenuItem<K>] === "Filters" ||
        menuItem[nameKey as keyof MenuItem<K>] === "CustomFields";

      return (
        <div
          key={`${menuItem[nameKey as keyof MenuItem<K>]}`}
          className="flex flex-col w-full mt-3 pl-5"
        >
          <div className="cursor-pointer flex items-center gap-2">
            {childrenKey && menuItem[childrenKey].length > 0 ? (
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
            <div onClick={() => toggleAccordion(currentPath)}>
              <ToolTipLabel className="text-md text-textDarkGray">
                {menuItem[nameKey as keyof MenuItem<K>]}
              </ToolTipLabel>
            </div>

            {/* Add the plus icon next to Filters or CustomFields */}
            {isFilterOrCustomField && (
              <div
                className="ml-2 cursor-pointer"
                onClick={() => {
                  // Perform your plus icon operation here
                  console.log(
                    `${menuItem[nameKey as keyof MenuItem<K>]} clicked`
                  );
                }}
              >
                <img
                  src={PlusIcon}
                  alt="plus icon"
                  className="h-[10px] w-[10px]" // Adjust size as needed
                />
              </div>
            )}
          </div>
          {menuItem?.isAccordianOpen &&
            childrenKey &&
            menuItem[childrenKey]?.length > 0 &&
            renderMenuItems(menuItem[childrenKey], currentPath)}
        </div>
      );
    });

  return (
    <div className={`w-full flex flex-col`}>{renderMenuItems(menuState)}</div>
  );
};

export default AccordionMenu;
