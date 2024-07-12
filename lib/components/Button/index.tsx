import React from "react";
import styles from "../../assets/button.module.scss";
interface buttonProps {
  label: string;
  onClick: () => void;
  buttonType?: "outlined";
  customStyle?: string;
  isDisabled?: boolean;
  type?: "button" | "submit" | "reset";
  testId: string;
}
const Button: React.FC<buttonProps> = ({
  label,
  onClick,
  buttonType,
  customStyle,
  isDisabled,
  type,
  testId,
}) => {
  const customClasses = customStyle ? `${customStyle} ` : "";
  const buttonTypeClasses =
    buttonType === "outlined"
      ? isDisabled
        ? "text-backgroundLight border-[1px] border-backgroundDark"
        : "bg-backgroundLight border-backgroundDark text-backgroundDark border-[1px]"
      : isDisabled
        ? "bg-disabledPrimaryBtn text-backgroundLight"
        : "bg-backgroundTheme border-none text-backgroundLight";

  return (
    <button
      onClick={onClick}
      className={`${customClasses}${styles.button} ${buttonTypeClasses}`}
      disabled={isDisabled}
      type={type ? type : "submit"}
      data-testid={testId}
    >
      {label}
    </button>
  );
};
export default Button;
