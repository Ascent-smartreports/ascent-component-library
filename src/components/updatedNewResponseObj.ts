import { AnyObject } from "yup";

export const roleResponse = [
  {
    roleId: 1,
    roleName: "Admin",
        isSelected: false,
    
    isAccordianOpen: true,
    isAtleastOneSubmenuSelected: true,
    children: [
      {
        menuId: 10,
        menuName: "Client",
        isSelected: false,
        isAtleastOneSubmenuSelected: false,
        isAccordianOpen: true,
        children: [
          {
            permissionId: 12,
            permissionName: "View",
            isSelected: true,
            isAtleastOneSubmenuSelected: false,
            isAccordianOpen: true,
            children: [],
          },
          {
            permissionId: 14,
            permissionName: "Add",
            isSelected: true,
            isAtleastOneSubmenuSelected: false,
            isAccordianOpen: true,
            children: [],
          },
          {
            permissionId: 16,
            permissionName: "Modify",
            isSelected: true,
            isAtleastOneSubmenuSelected: false,
            isAccordianOpen: true,
            children: [],
          },
          {
            permissionId: 18,
            permissionName: "Delete",
            isSelected: true,
            isAtleastOneSubmenuSelected: false,
            isAccordianOpen: true,
            children: [],
          },
        ],
      },
      {
        menuId: 20,
        menuName: "User",
        isSelected: false,
        isAtleastOneSubmenuSelected: false,
        isAccordianOpen: true,
        children: [
          {
            permissionId: 22,
            permissionName: "View",
            isSelected: false,
            isAtleastOneSubmenuSelected: false,
            isAccordianOpen: true,
            children: [],
          },
          {
            permissionId: 24,
            permissionName: "Add",
            isSelected: false,
            isAtleastOneSubmenuSelected: false,
            isAccordianOpen: true,
            children: [],
          },
          {
            permissionId: 26,
            permissionName: "Modify",
            isSelected: false,
            isAtleastOneSubmenuSelected: false,
            isAccordianOpen: true,
            children: [],
          },
          {
            permissionId: 28,
            permissionName: "Delete",
            isSelected: false,
            isAtleastOneSubmenuSelected: false,
            isAccordianOpen: true,
            children: [],
          },
        ],
      },
      {
        menuId: 30,
        menuName: "Role",
        isSelected: false,
        isAtleastOneSubmenuSelected: false,
        isAccordianOpen: true,
        children: [
          {
            permissionId: 32,
            permissionName: "View",
            isSelected: false,
            isAtleastOneSubmenuSelected: false,
            isAccordianOpen: true,
            children: [],
          },
          {
            permissionId: 34,
            permissionName: "Add",
            isSelected: false,
            isAtleastOneSubmenuSelected: false,
            isAccordianOpen: true,
            children: [],
          },
          {
            permissionId: 36,
            permissionName: "Modify",
            isSelected: true,
            isAtleastOneSubmenuSelected: false,
            isAccordianOpen: true,
            children: [],
          },
          {
            permissionId: 38,
            permissionName: "Delete",
            isSelected: false,
            isAtleastOneSubmenuSelected: false,
            isAccordianOpen: true,
            children: [],
          },
        ],
      },
      {
        menuId: 40,
        menuName: "UrlReferrer",
        isSelected: false,
        isAtleastOneSubmenuSelected: false,
        isAccordianOpen: true,
        children: [],
      },
      {
        menuId: 1000,
        menuName: "Dashboard",
        isSelected: false,
        isAtleastOneSubmenuSelected: false,
        isAccordianOpen: true,
        children: [],
      },
      {
        menuId: 1100,
        menuName: "Configure",
        isSelected: false,
        isAtleastOneSubmenuSelected: true,
        isAccordianOpen: true,
        children: [
          {
            subMenuId: 1110,
            subMenuName: "User Reports",
            isSelected: false,
            isAtleastOneSubmenuSelected: true,
            isAccordianOpen: true,
            children: [
              {
                permissionId: 1112,
                permissionName: "View",
                isSelected: true,
                isAtleastOneSubmenuSelected: false,
                isAccordianOpen: true,
                children: [],
              },
              {
                permissionId: 1114,
                permissionName: "Add",
                isSelected: false,
                isAtleastOneSubmenuSelected: false,
                isAccordianOpen: true,
                children: [],
              },
              {
                permissionId: 1116,
                permissionName: "Modify",
                isSelected: true,
                isAtleastOneSubmenuSelected: false,
                isAccordianOpen: true,
                children: [],
              },
              {
                permissionId: 1118,
                permissionName: "Delete",
                isSelected: false,
                isAtleastOneSubmenuSelected: false,
                isAccordianOpen: true,
                children: [],
              },
            ],
          },
          {
            subMenuId: 1120,
            subMenuName: "DataSource",
            isSelected: false,
            isAtleastOneSubmenuSelected: false,
            isAccordianOpen: true,
            children: [
              {
                permissionId: 1122,
                permissionName: "View",
                isSelected: false,
                isAtleastOneSubmenuSelected: false,
                isAccordianOpen: true,
                children: [],
              },
              {
                permissionId: 1124,
                permissionName: "Add",
                isSelected: false,
                isAtleastOneSubmenuSelected: false,
                isAccordianOpen: true,
                children: [],
              },
              {
                permissionId: 1126,
                permissionName: "Modify",
                isSelected: false,
                isAtleastOneSubmenuSelected: false,
                isAccordianOpen: true,
                children: [],
              },
              {
                permissionId: 1128,
                permissionName: "Delete",
                isSelected: false,
                isAtleastOneSubmenuSelected: false,
                isAccordianOpen: true,
                children: [],
              },
            ],
          },
          {
            subMenuId: 1130,
            subMenuName: "Report",
            isSelected: false,
            isAtleastOneSubmenuSelected: false,
            isAccordianOpen: true,
            children: [
              {
                permissionId: 1132,
                permissionName: "View",
                isSelected: true,
                isAtleastOneSubmenuSelected: false,
                isAccordianOpen: true,
                children: [],
              },
              {
                permissionId: 1134,
                permissionName: "Add",
                isSelected: false,
                isAtleastOneSubmenuSelected: false,
                isAccordianOpen: true,
                children: [],
              },
              {
                permissionId: 1136,
                permissionName: "Modify",
                isSelected: false,
                isAtleastOneSubmenuSelected: false,
                isAccordianOpen: true,
                children: [],
              },
              {
                permissionId: 1138,
                permissionName: "Delete",
                isSelected: false,
                isAtleastOneSubmenuSelected: false,
                isAccordianOpen: true,
                children: [],
              },
              {
                id: 1140,
                permissionName: "Copy",
                isSelected: false,
                isAtleastOneSubmenuSelected: false,
                isAccordianOpen: true,
                children: [],
              },
            ],
          },
          {
            subMenuId: 1150,
            subMenuName: "Publish Report",
            isSelected: false,
            isAtleastOneSubmenuSelected: false,
            isAccordianOpen: true,
            children: [
              {
                permissionId: 1152,
                permissionName: "View",
                isSelected: false,
                isAtleastOneSubmenuSelected: false,
                isAccordianOpen: true,
                children: [],
              },
              {
                permissionId: 1154,
                permissionName: "Add",
                isSelected: false,
                isAtleastOneSubmenuSelected: false,
                isAccordianOpen: true,
                children: [],
              },
              {
                permissionId: 1156,
                permissionName: "Modify",
                isSelected: false,
                isAtleastOneSubmenuSelected: false,
                isAccordianOpen: true,
                children: [],
              },
              {
                permissionId: 1158,
                permissionName: "Delete",
                isSelected: false,
                isAtleastOneSubmenuSelected: false,
                isAccordianOpen: true,
                children: [],
              },
            ],
          },
          {
            subMenuId: 1160,
            subMenuName: "Report Group",
            isSelected: false,
            isAtleastOneSubmenuSelected: false,
            isAccordianOpen: true,
            children: [
              {
                permissionId: 1162,
                permissionName: "View",
                isSelected: false,
                isAtleastOneSubmenuSelected: false,
                isAccordianOpen: true,
                children: [],
              },
              {
                permissionId: 1164,
                permissionName: "Add",
                isSelected: false,
                isAtleastOneSubmenuSelected: false,
                isAccordianOpen: true,
                children: [],
              },
              {
                permissionId: 1166,
                permissionName: "Modify",
                isSelected: false,
                isAtleastOneSubmenuSelected: false,
                isAccordianOpen: true,
                children: [],
              },
              {
                permissionId: 1168,
                permissionName: "Delete",
                isSelected: false,
                isAtleastOneSubmenuSelected: false,
                isAccordianOpen: true,
                children: [],
              },
            ],
          },
          {
            subMenuId: 2101,
            subMenuName: "Report Upload",
            isSelected: false,
            isAtleastOneSubmenuSelected: false,
            isAccordianOpen: true,
            children: [
              {
                permissionId: 2103,
                permissionName: "View",
                isSelected: false,
                isAtleastOneSubmenuSelected: false,
                isAccordianOpen: true,
                children: [],
              },
              {
                permissionId: 2104,
                permissionName: "Upload",
                isSelected: false,
                isAtleastOneSubmenuSelected: false,
                isAccordianOpen: true,
                children: [],
              },
            ],
          },
          {
            subMenuId: 2105,
            subMenuName: "Upload Folder",
            isSelected: false,
            isAtleastOneSubmenuSelected: false,
            isAccordianOpen: true,
            children: [
              {
                permissionId: 2106,
                permissionName: "View",
                isSelected: false,
                isAtleastOneSubmenuSelected: false,
                isAccordianOpen: true,
                children: [],
              },
              {
                permissionId: 2107,
                permissionName: "Map to User",
                isSelected: false,
                isAtleastOneSubmenuSelected: false,
                isAccordianOpen: true,
                children: [],
              },
              {
                permissionId: 2108,
                permissionName: "Add",
                isSelected: false,
                isAtleastOneSubmenuSelected: false,
                isAccordianOpen: true,
                children: [],
              },
            ],
          },
          {
            subMenuId: 2109,
            subMenuName: "Message",
            isSelected: false,
            isAtleastOneSubmenuSelected: false,
            isAccordianOpen: true,
            children: [],
          },
          {
            subMenuId: 2122,
            subMenuName: "LookUpData",
            isSelected: false,
            isAtleastOneSubmenuSelected: false,
            isAccordianOpen: true,
            children: [
              {
                permissionId: 2123,
                permissionName: "Edit",
                isSelected: false,
                isAtleastOneSubmenuSelected: false,
                isAccordianOpen: true,
                children: [],
              },
            ],
          },
          {
            subMenuId: 2124,
            subMenuName: "Email Schedule",
            isSelected: false,
            isAtleastOneSubmenuSelected: false,
            isAccordianOpen: true,
            children: [
              {
                permissionId: 2125,
                permissionName: "Save",
                isSelected: false,
                isAtleastOneSubmenuSelected: false,
                isAccordianOpen: true,
                children: [],
              },
            ],
          },
          {
            subMenuId: 2126,
            subMenuName: "Restart System",
            isSelected: false,
            isAtleastOneSubmenuSelected: false,
            isAccordianOpen: true,
            children: [],
          },
        ],
      },
      {
        menuId: 1180,
        menuName: "Powerpay DB",
        isSelected: false,
        isAtleastOneSubmenuSelected: false,
        isAccordianOpen: true,
        children: [],
      },
      {
        menuId: 2117,
        menuName: "Utilisation Statistics",
        isSelected: false,
        isAtleastOneSubmenuSelected: false,
        isAccordianOpen: true,
        children: [
          {
            permissionId: 2118,
            permissionName: "View",
            isSelected: false,
            isAtleastOneSubmenuSelected: false,
            isAccordianOpen: true,
            children: [],
          },
          {
            permissionId: 2119,
            permissionName: "Search",
            isSelected: false,
            isAtleastOneSubmenuSelected: false,
            isAccordianOpen: true,
            children: [],
          },
          {
            permissionId: 2120,
            permissionName: "Export",
            isSelected: false,
            isAtleastOneSubmenuSelected: false,
            isAccordianOpen: true,
            children: [],
          },
        ],
      },
      {
        menuId: 2121,
        menuName: " PowerPay Last  Month",
        isSelected: false,
        isAtleastOneSubmenuSelected: false,
        isAccordianOpen: true,
        children: [],
      },
      {
        menuId: 2127,
        menuName: "DifferentialReport",
        isSelected: false,
        isAtleastOneSubmenuSelected: false,
        isAccordianOpen: true,
        children: [],
      },
    ],
  },
  {
    roleId: 2,
    roleName: "Client",
    isSelected: false,
    isAccordianOpen: true,
    isAtleastOneSubmenuSelected: false,
    children: [
      {
        menuId: 2000,
        menuName: "Dashboard",
        isSelected: false,
        isAtleastOneSubmenuSelected: false,
        isAccordianOpen: true,
        children: [],
      },
      {
        menuId: 2100,
        menuName: "Reports",
        isSelected: false,
        isAtleastOneSubmenuSelected: false,
        isAccordianOpen: true,
        children: [],
      },
      {
        menuId: 2102,
        menuName: "Downloads",
        isSelected: false,
        isAtleastOneSubmenuSelected: false,
        isAccordianOpen: true,
        children: [],
      },
    ],
  },
];

/* eslint-disable no-unused-vars */
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

export const updateMenuState = <K extends MenuKeys>(
  menus: AnyObject[]
): MenuItem<K>[] => {
  return menus.map((menu) => {
    const updatedChildren = updateMenuState(menu.children);

    const isAtleastOneSubmenuSelected = updatedChildren.some(
      (child) => child.isSelected || child.isAtleastOneSubmenuSelected
    );
    const areAllChildrenSelected = updatedChildren.every(
      (child) => child.isSelected
    );

    const isAccordianOpen = menu.isSelected || isAtleastOneSubmenuSelected;

    return {
      ...menu,
        isAccordianOpen,
      isSelected:areAllChildrenSelected,
      isAtleastOneSubmenuSelected,
      children: updatedChildren,
    } as MenuItem<K>;
  });
};

export const updatedResponse = updateMenuState(roleResponse);
console.log(updatedResponse, "updatedResponse");
