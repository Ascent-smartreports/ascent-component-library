/* eslint-disable @typescript-eslint/no-explicit-any */
interface CustomStylesProps {
  isFocused: boolean;
  isSelected: boolean;
}

export const CustomStyles = {
  option: (styles: any, { isFocused, isSelected }: CustomStylesProps) => {
    return {
      ...styles,
      backgroundColor: isSelected
        ? "#21294c"
        : isFocused
          ? "#e9eaed"
          : undefined,
      color: isSelected ? "#ffffff" : isFocused ? "#21294c" : undefined,
    };
  },
  menuList: (styles: any) => ({
    ...styles,
    backgroundColor: "#ffffff",
  }),
};
