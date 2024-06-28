import React from "react";
import styles from "../../assets/button.module.scss";

interface buttonProps {
  label: string;
  onClick: () => void;
  buttonType?: "outlined";
  customStyle?: string;
  isDisabled?: boolean;
}
const Button: React.FC<buttonProps> = ({
  label,
  onClick,
  buttonType,
  customStyle,
  isDisabled,
}) => {
  const customClasses = customStyle ? `${customStyle} ` : "";
  const buttonTypeClasses =
    buttonType === "outlined"
      ? "bg-backgroundLight border-backgroundTheme text-backgroundTheme border-[1px]"
      : isDisabled
        ? "bg-disabledPrimaryBtn text-backgroundLight"
        : buttonType === "outlined" && isDisabled
          ? "text-disabledSecondaryBtn border-[1px] border-backgroundTheme"
          : "bg-backgroundTheme border-none text-backgroundLight";

  return (
    <button
      onClick={onClick}
      className={`${customClasses}${styles.button} ${buttonTypeClasses}`}
      disabled={isDisabled}
    >
      {label}
    </button>
  );
};
export default Button;
