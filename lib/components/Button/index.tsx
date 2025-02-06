import React from "react";
import styles from "../../assets/button.module.scss";
import textStyles from "../../assets/texts.module.scss";
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
        ? "bg-[#ccc] text-backgroundLight border-[1px] border-backgroundDark font-semibold"
        : "bg-backgroundLight border-backgroundDark text-backgroundDark border-[1px] font-semibold"
      : isDisabled
        ? "bg-disabledPrimaryBtn text-backgroundLight font-semibold"
        : "bg-backgroundTheme border-none text-backgroundLight font-semibold";

  if (isDisabled) {
    buttonTypeClasses = "bg-[#ccc] text-[#666] border-none cursor-not-allowed";
  }

  const finalCustomButtonClass = twMerge(
    `${styles.button} ${buttonTypeClasses} ${textStyles.label} `,
    customStyle
  );

  return (
    <button
      onClick={onClick}
      className={`${finalCustomButtonClass}`}
      disabled={isDisabled}
      type={type ? type : "submit"}
      data-testid={testId}
    >
      {label}
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  );
};
