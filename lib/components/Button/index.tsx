import React from 'react';

type ButtonProps = {
  text: string;
  icon?: React.ReactNode;
  onClick: () => void;
  buttonType?: "outlined";
  customStyle?: string;
  className?: string;
  isDisabled?: boolean;
  testId?: string;
};

const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  onClick,
  customStyle,
  buttonType,
  className,
  isDisabled = false,
  testId,
}) => {
  const customClasses = customStyle ? `${customStyle} ` : "";
  let buttonTypeClasses =
    buttonType === "outlined"
      ? "bg-backgroundLight border-backgroundTheme text-backgroundTheme border-[2px]"
      : "bg-backgroundTheme border-none text-backgroundLight";


  if (isDisabled) {
    buttonTypeClasses = "bg-buttonDisabled border-'backgroundTheme' text-'backgroundTheme' cursor-not-allowed";
  }

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center p-2 px-8 rounded ${customClasses} ${buttonTypeClasses} ${className}`}
      disabled={isDisabled}
      data-testid={testId}
    >
      {text}
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default Button;



