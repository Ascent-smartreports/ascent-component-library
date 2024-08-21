import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Label } from "../../lib/main";
import DownArrow from "../../lib/assets/images/down-arrow.svg";
import CustomCheckbox from "./CustomCheckbox";
import { AnyObject } from "yup";

interface MenuKeys {
  idKey: string;
  menuNameKey: string;
}

type BaseMenuItem = {
  isSelected: boolean;
  isAtleastOneSubmenuSelected: boolean;
  isAccordianOpen: boolean;
  children: BaseMenuItem[];
};

type MenuItem<K extends MenuKeys> = BaseMenuItem & {
  [key in K["idKey"]]: number;
} & {
  [key in K["menuNameKey"]]: string;
} & {
  children: MenuItem<K>[];
};

interface AccordionProps<K extends MenuKeys> {
  menus: MenuItem<K>[];
  setResponse: Dispatch<SetStateAction<MenuItem<K>[]>>;
  menuKeys: K;
}

const UpdatedAccordionMenu = <K extends MenuKeys>({
  menus,
  setResponse,
  menuKeys,
}: AccordionProps<K>) => {
  const [menuState, setMenuState] = useState<MenuItem<K>[]>(menus);

  useEffect(() => {
    setResponse(menuState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuState]);

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

    if (selectedMenu.children.length > 0) {
      selectedMenu.children.map((_, key) => {
        handleMenuClick([...path, key], isSelected);
      });
    }
  };

  const renderMenuItems = (items: MenuItem<K>[], path: number[] = []) =>
    items.map((menuItem, index) => {
      const currentPath = [...path, index];

      return (
        <div
          key={menuItem[menuKeys.idKey as keyof MenuItem<K>]}
          className="flex flex-col w-full mt-3"
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
              onChange={(isSelected) =>
                handleMenuClick(currentPath, isSelected)
              }
            />
            <div onClick={() => toggleAccordion(currentPath)}>
              <Label className="text-md text-textDarkGray">
                {menuItem[menuKeys.menuNameKey as keyof MenuItem<K>]}
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

// checkbox,radio buttons and  onselect of label it should get selected
// for input if we click on label , innput should be focussed
// for all inputs,dropdown,dateinput   height should be increased h-24 to h-40

