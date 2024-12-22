import React from "react";
import { twMerge } from "tailwind-merge";

interface cardProps {
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<cardProps> = ({ children, className = "" }) => {
  const finalClassName = twMerge(
    "rounded-md p-5 border border-[#F3F3F3]",
    className
  );
  return <div className={finalClassName}>{children}</div>;
};
