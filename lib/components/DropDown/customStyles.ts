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
      color: isSelected
        ? "#ffffff"
        : isFocused
        ? "#21294c"              
        : undefined,
    };
  },
  control: (provided: any) => {
    let baseStyles = {
      ...provided,
      backgroundColor:  "#ffffff",
    };
    if (window.matchMedia("(min-width: 1920px)").matches) {
      baseStyles = {
        ...baseStyles,
        minHeight: "54px",
        fontSize: "16px",
      };
    } else if (
      window.matchMedia("(max-width: 1400px) and (min-width: 1025px)").matches
    ) {
      baseStyles = {
        ...baseStyles,
        height: "50px",
        fontSize: "14px",
      };
    } else if (window.matchMedia("(max-width: 1024px)").matches) {
      baseStyles = {
        ...baseStyles,
        height: "48px",
        fontSize: "14px",
      };
    } else if (window.matchMedia("(max-width: 768px)").matches) {
      baseStyles = {
        ...baseStyles,
        height: "42px",
        fontSize: "13px",
      };
    }

    return baseStyles;
  },
  menuList: (styles: any) => ({
    ...styles,
    backgroundColor:  "#ffffff",
  }),
};
