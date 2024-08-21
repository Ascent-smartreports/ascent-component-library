import { AnyObject } from "yup";

export const roleResponse=[
    {
        "id": 1,
        "menuName": "Admin",
        "isSelected": false,
        "isAccordianOpen": true,
        "isAtleastOneSubmenuSelected":true,
        "children": [
            {
                "id": 10,
                "menuName": "Client",
                "isSelected": false,
                "isAtleastOneSubmenuSelected": false,
                "isAccordianOpen": true,
                "children": [
                    {
                        "id": 12,
                        "menuName": "View",
                        "isSelected": false,
                        "isAtleastOneSubmenuSelected": false,
                        "isAccordianOpen": true,
                        "children": []
                    },
                    {
                        "id": 14,
                        "menuName": "Add",
                        "isSelected": false,
                        "isAtleastOneSubmenuSelected": false,
                        "isAccordianOpen": true,
                        "children": []
                    },
                    {
                        "id": 16,
                        "menuName": "Modify",
                        "isSelected": false,
                        "isAtleastOneSubmenuSelected": false,
                        "isAccordianOpen": true,
                        "children": []
                    },
                    {
                        "id": 18,
                        "menuName": "Delete",
                        "isSelected": false,
                        "isAtleastOneSubmenuSelected": false,
                        "isAccordianOpen": true,
                        "children": []
                    }
                ]
            },
            {
                "id": 20,
                "menuName": "User",
                "isSelected": false,
                "isAtleastOneSubmenuSelected": false,
                "isAccordianOpen": true,
                "children": [
                    {
                        "id": 22,
                        "menuName": "View",
                        "isSelected": false,
                        "isAtleastOneSubmenuSelected": false,
                        "isAccordianOpen": true,
                        "children": []
                    },
                    {
                        "id": 24,
                        "menuName": "Add",
                        "isSelected": false,
                        "isAtleastOneSubmenuSelected": false,
                        "isAccordianOpen": true,
                        "children": []
                    },
                    {
                        "id": 26,
                        "menuName": "Modify",
                        "isSelected": false,
                        "isAtleastOneSubmenuSelected": false,
                        "isAccordianOpen": true,
                        "children": []
                    },
                    {
                        "id": 28,
                        "menuName": "Delete",
                        "isSelected": false,
                        "isAtleastOneSubmenuSelected": false,
                        "isAccordianOpen": true,
                        "children": []
                    }
                ]
            },
            {
                "id": 30,
                "menuName": "Role",
                "isSelected": false,
                "isAtleastOneSubmenuSelected": false,
                "isAccordianOpen": true,
                "children": [
                    {
                        "id": 32,
                        "menuName": "View",
                        "isSelected": false,
                        "isAtleastOneSubmenuSelected": false,
                        "isAccordianOpen": true,
                        "children": []
                    },
                    {
                        "id": 34,
                        "menuName": "Add",
                        "isSelected": false,
                        "isAtleastOneSubmenuSelected": false,
                        "isAccordianOpen": true,
                        "children": []
                    },
                    {
                        "id": 36,
                        "menuName": "Modify",
                        "isSelected": false,
                        "isAtleastOneSubmenuSelected": false,
                        "isAccordianOpen": true,
                        "children": []
                    },
                    {
                        "id": 38,
                        "menuName": "Delete",
                        "isSelected": false,
                        "isAtleastOneSubmenuSelected": false,
                        "isAccordianOpen": true,
                        "children": []
                    }
                ]
            },
            {
                "id": 40,
                "menuName": "UrlReferrer",
                "isSelected": false,
                "isAtleastOneSubmenuSelected": false,
                "isAccordianOpen": true,
                "children": []
            },
            {
                "id": 1000,
                "menuName": "Dashboard",
                "isSelected": false,
                "isAtleastOneSubmenuSelected": false,
                "isAccordianOpen": true,
                "children": []
            },
            {
                "id": 1100,
                "menuName": "Configure",
                "isSelected": false,
                "isAtleastOneSubmenuSelected": true,
                "isAccordianOpen": true,
                "children": [
                    {
                        "id": 1110,
                        "menuName": "User Reports",
                        "isSelected": false,
                        "isAtleastOneSubmenuSelected": true,
                        "isAccordianOpen": true,
                        "children": [
                            {
                                "id": 1112,
                                "menuName": "View",
                                "isSelected": true,
                                "isAtleastOneSubmenuSelected": false,
                                "isAccordianOpen": true,
                                "children": []
                            },
                            {
                                "id": 1114,
                                "menuName": "Add",
                                "isSelected": false,
                                "isAtleastOneSubmenuSelected": false,
                                "isAccordianOpen": true,
                                "children": []
                            },
                            {
                                "id": 1116,
                                "menuName": "Modify",
                                "isSelected": false,
                                "isAtleastOneSubmenuSelected": false,
                                "isAccordianOpen": true,
                                "children": []
                            },
                            {
                                "id": 1118,
                                "menuName": "Delete",
                                "isSelected": false,
                                "isAtleastOneSubmenuSelected": false,
                                "isAccordianOpen": true,
                                "children": []
                            }
                        ]
                    },
                    {
                        "id": 1120,
                        "menuName": "DataSource",
                        "isSelected": false,
                        "isAtleastOneSubmenuSelected": false,
                        "isAccordianOpen": true,
                        "children": [
                            {
                                "id": 1122,
                                "menuName": "View",
                                "isSelected": false,
                                "isAtleastOneSubmenuSelected": false,
                                "isAccordianOpen": true,
                                "children": []
                            },
                            {
                                "id": 1124,
                                "menuName": "Add",
                                "isSelected": false,
                                "isAtleastOneSubmenuSelected": false,
                                "isAccordianOpen": true,
                                "children": []
                            },
                            {
                                "id": 1126,
                                "menuName": "Modify",
                                "isSelected": false,
                                "isAtleastOneSubmenuSelected": false,
                                "isAccordianOpen": true,
                                "children": []
                            },
                            {
                                "id": 1128,
                                "menuName": "Delete",
                                "isSelected": false,
                                "isAtleastOneSubmenuSelected": false,
                                "isAccordianOpen": true,
                                "children": []
                            }
                        ]
                    },
                    {
                        "id": 1130,
                        "menuName": "Report",
                        "isSelected": false,
                        "isAtleastOneSubmenuSelected": false,
                        "isAccordianOpen": true,
                        "children": [
                            {
                                "id": 1132,
                                "menuName": "View",
                                "isSelected": false,
                                "isAtleastOneSubmenuSelected": false,
                                "isAccordianOpen": true,
                                "children": []
                            },
                            {
                                "id": 1134,
                                "menuName": "Add",
                                "isSelected": false,
                                "isAtleastOneSubmenuSelected": false,
                                "isAccordianOpen": true,
                                "children": []
                            },
                            {
                                "id": 1136,
                                "menuName": "Modify",
                                "isSelected": false,
                                "isAtleastOneSubmenuSelected": false,
                                "isAccordianOpen": true,
                                "children": []
                            },
                            {
                                "id": 1138,
                                "menuName": "Delete",
                                "isSelected": false,
                                "isAtleastOneSubmenuSelected": false,
                                "isAccordianOpen": true,
                                "children": []
                            },
                            {
                                "id": 1140,
                                "menuName": "Copy",
                                "isSelected": false,
                                "isAtleastOneSubmenuSelected": false,
                                "isAccordianOpen": true,
                                "children": []
                            }
                        ]
                    },
                    {
                        "id": 1150,
                        "menuName": "Publish Report",
                        "isSelected": false,
                        "isAtleastOneSubmenuSelected": false,
                        "isAccordianOpen": true,
                        "children": [
                            {
                                "id": 1152,
                                "menuName": "View",
                                "isSelected": false,
                                "isAtleastOneSubmenuSelected": false,
                                "isAccordianOpen": true,
                                "children": []
                            },
                            {
                                "id": 1154,
                                "menuName": "Add",
                                "isSelected": false,
                                "isAtleastOneSubmenuSelected": false,
                                "isAccordianOpen": true,
                                "children": []
                            },
                            {
                                "id": 1156,
                                "menuName": "Modify",
                                "isSelected": false,
                                "isAtleastOneSubmenuSelected": false,
                                "isAccordianOpen": true,
                                "children": []
                            },
                            {
                                "id": 1158,
                                "menuName": "Delete",
                                "isSelected": false,
                                "isAtleastOneSubmenuSelected": false,
                                "isAccordianOpen": true,
                                "children": []
                            }
                        ]
                    },
                    {
                        "id": 1160,
                        "menuName": "Report Group",
                        "isSelected": false,
                        "isAtleastOneSubmenuSelected": false,
                        "isAccordianOpen": true,
                        "children": [
                            {
                                "id": 1162,
                                "menuName": "View",
                                "isSelected": false,
                                "isAtleastOneSubmenuSelected": false,
                                "isAccordianOpen": true,
                                "children": []
                            },
                            {
                                "id": 1164,
                                "menuName": "Add",
                                "isSelected": false,
                                "isAtleastOneSubmenuSelected": false,
                                "isAccordianOpen": true,
                                "children": []
                            },
                            {
                                "id": 1166,
                                "menuName": "Modify",
                                "isSelected": false,
                                "isAtleastOneSubmenuSelected": false,
                                "isAccordianOpen": true,
                                "children": []
                            },
                            {
                                "id": 1168,
                                "menuName": "Delete",
                                "isSelected": false,
                                "isAtleastOneSubmenuSelected": false,
                                "isAccordianOpen": true,
                                "children": []
                            }
                        ]
                    },
                    {
                        "id": 2101,
                        "menuName": "Report Upload",
                        "isSelected": false,
                        "isAtleastOneSubmenuSelected": false,
                        "isAccordianOpen": true,
                        "children": [
                            {
                                "id": 2103,
                                "menuName": "View",
                                "isSelected": false,
                                "isAtleastOneSubmenuSelected": false,
                                "isAccordianOpen": true,
                                "children": []
                            },
                            {
                                "id": 2104,
                                "menuName": "Upload",
                                "isSelected": false,
                                "isAtleastOneSubmenuSelected": false,
                                "isAccordianOpen": true,
                                "children": []
                            }
                        ]
                    },
                    {
                        "id": 2105,
                        "menuName": "Upload Folder",
                        "isSelected": false,
                        "isAtleastOneSubmenuSelected": false,
                        "isAccordianOpen": true,
                        "children": [
                            {
                                "id": 2106,
                                "menuName": "View",
                                "isSelected": false,
                                "isAtleastOneSubmenuSelected": false,
                                "isAccordianOpen": true,
                                "children": []
                            },
                            {
                                "id": 2107,
                                "menuName": "Map to User",
                                "isSelected": false,
                                "isAtleastOneSubmenuSelected": false,
                                "isAccordianOpen": true,
                                "children": []
                            },
                            {
                                "id": 2108,
                                "menuName": "Add",
                                "isSelected": false,
                                "isAtleastOneSubmenuSelected": false,
                                "isAccordianOpen": true,
                                "children": []
                            }
                        ]
                    },
                    {
                        "id": 2109,
                        "menuName": "Message",
                        "isSelected": false,
                        "isAtleastOneSubmenuSelected": false,
                        "isAccordianOpen": true,
                        "children": []
                    },
                    {
                        "id": 2122,
                        "menuName": "LookUpData",
                        "isSelected": false,
                        "isAtleastOneSubmenuSelected": false,
                        "isAccordianOpen": true,
                        "children": [
                            {
                                "id": 2123,
                                "menuName": "Edit",
                                "isSelected": false,
                                "isAtleastOneSubmenuSelected": false,
                                "isAccordianOpen": true,
                                "children": []
                            }
                        ]
                    },
                    {
                        "id": 2124,
                        "menuName": "Email Schedule",
                        "isSelected": false,
                        "isAtleastOneSubmenuSelected": false,
                        "isAccordianOpen": true,
                        "children": [
                            {
                                "id": 2125,
                                "menuName": "Save",
                                "isSelected": false,
                                "isAtleastOneSubmenuSelected": false,
                                "isAccordianOpen": true,
                                "children": []
                            }
                        ]
                    },
                    {
                        "id": 2126,
                        "menuName": "Restart System",
                        "isSelected": false,
                        "isAtleastOneSubmenuSelected": false,
                        "isAccordianOpen": true,
                        "children": []
                    }
                ]
            },
            {
                "id": 1180,
                "menuName": "Powerpay DB",
                "isSelected": false,
                "isAtleastOneSubmenuSelected": false,
                "isAccordianOpen": true,
                "children": []
            },
            {
                "id": 2117,
                "menuName": "Utilisation Statistics",
                "isSelected": false,
                "isAtleastOneSubmenuSelected": false,
                "isAccordianOpen": true,
                "children": [
                    {
                        "id": 2118,
                        "menuName": "View",
                        "isSelected": false,
                        "isAtleastOneSubmenuSelected": false,
                        "isAccordianOpen": true,
                        "children": []
                    },
                    {
                        "id": 2119,
                        "menuName": "Search",
                        "isSelected": false,
                        "isAtleastOneSubmenuSelected": false,
                        "isAccordianOpen": true,
                        "children": []
                    },
                    {
                        "id": 2120,
                        "menuName": "Export",
                        "isSelected": false,
                        "isAtleastOneSubmenuSelected": false,
                        "isAccordianOpen": true,
                        "children": []
                    }
                ]
            },
            {
                "id": 2121,
                "menuName": " PowerPay Last  Month",
                "isSelected": false,
                "isAtleastOneSubmenuSelected": false,
                "isAccordianOpen": true,
                "children": []
            },
            {
                "id": 2127,
                "menuName": "DifferentialReport",
                "isSelected": false,
                "isAtleastOneSubmenuSelected": false,
                "isAccordianOpen": true,
                "children": []
            }
        ]
    },
    {
        "id": 2,
        "menuName": "Client",
        "isSelected": false,
        "isAccordianOpen": true,
        "isAtleastOneSubmenuSelected":false,
        "children": [
            {
                "id": 2000,
                "menuName": "Dashboard",
                "isSelected": false,
                "isAtleastOneSubmenuSelected": false,
                "isAccordianOpen": true,
                "children": []
            },
            {
                "id": 2100,
                "menuName": "Reports",
                "isSelected": false,
                "isAtleastOneSubmenuSelected": false,
                "isAccordianOpen": true,
                "children": []
            },
            {
                "id": 2102,
                "menuName": "Downloads",
                "isSelected": false,
                "isAtleastOneSubmenuSelected": false,
                "isAccordianOpen": true,
                "children": []
            }
        ]
    }
]


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
