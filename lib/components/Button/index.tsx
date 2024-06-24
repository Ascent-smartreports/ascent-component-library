import React from "react";
import styles from "../../assets/button.module.scss";

interface buttonProps {
  label: string;
  onClick: () => void;
  buttonType?: "outlined";
  customStyle?: string;
}
const Button: React.FC<buttonProps> = ({
  label,
  onClick,
  buttonType,
  customStyle,
}) => {
  const customClasses = customStyle ? `${customStyle} ` : "";
  const buttonTypeClasses =
    buttonType === "outlined"
      ? "bg-backgroundLight border-backgroundTheme text-backgroundTheme border-[1px]"
      : "bg-backgroundTheme border-none text-backgroundLight";

  return (
    <button
      onClick={onClick}
      className={`${customClasses}${styles.button} ${buttonTypeClasses}`}
    >
      {label}
    </button>
  );
};
export default Button;
