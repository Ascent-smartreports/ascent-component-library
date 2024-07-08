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
    buttonType !== "outlined"
      ? "bg-backgroundTheme border-none text-backgroundLight"
      : isDisabled
        ? "text-backgroundLight border-[1px] border-backgroundTheme"
        : isDisabled && buttonType === "outlined"
          ? "bg-disabledPrimaryBtn text-backgroundLight"
          : "bg-backgroundLight border-backgroundTheme text-backgroundTheme border-[1px]";

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
