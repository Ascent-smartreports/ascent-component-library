import React from "react";
import styles from "../../assets/button.module.scss";
import { twMerge } from "tailwind-merge";
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
  customStyle = "",
  isDisabled,
  type,
  testId,
  icon,
}) => {
  let buttonTypeClasses =
    buttonType === "outlined"
      ? isDisabled
        ? "bg-[#ccc] text-backgroundLight border-[1px] border-backgroundDark"
        : "bg-backgroundLight border-backgroundDark text-backgroundDark border-[1px]"
      : isDisabled
        ? "bg-disabledPrimaryBtn text-backgroundLight"
        : "bg-backgroundTheme border-none text-backgroundLight";

  if (isDisabled) {
    buttonTypeClasses = "bg-[#ccc] text-[#666] border-none cursor-not-allowed";
  }

  const finalCustomButtonClass = twMerge(
    `${styles.button} ${buttonTypeClasses} `,
    customStyle
  );

  return (
    <button
      onClick={onClick}
      className={`${finalCustomButtonClass} additional-class h-[44px]`}
      disabled={isDisabled}
      type={type ? type : "submit"}
      data-testid={testId}
    >
      {label}
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  );
};
