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
  icon?: React.ReactNode;
}
export const Button: React.FC<buttonProps> = ({
  label,
  onClick,
  buttonType,
  customStyle,
  isDisabled,
  type,
  testId,
  icon,
}) => {
  const customClasses = customStyle ? `${customStyle} ` : "";
  let buttonTypeClasses =
    buttonType === "outlined"
      ? isDisabled
        ? "text-backgroundLight border-[1px] border-backgroundDark"
        : "bg-backgroundLight border-backgroundDark text-backgroundDark border-[1px]"
      : isDisabled
        ? "bg-disabledPrimaryBtn text-backgroundLight"
        : "bg-backgroundTheme border-none text-backgroundLight";

  if (isDisabled) {
    buttonTypeClasses =
      "bg-buttonDisabled border-'backgroundTheme' text-'backgroundTheme' cursor-not-allowed";
  }

  return (
    <button
      onClick={onClick}
      className={`${customClasses}${styles.button} ${buttonTypeClasses}`}
      disabled={isDisabled}
      type={type ? type : "submit"}
      data-testid={testId}
    >
      {label}
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  );
};
