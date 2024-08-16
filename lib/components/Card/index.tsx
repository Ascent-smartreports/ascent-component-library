import React from "react";
import { twMerge } from "tailwind-merge";

interface cardProps {
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<cardProps> = ({ children, className = "" }) => {
  const finalClassName = twMerge("rounded-md p-6 m-2", className);
  return <div className={finalClassName}>{children}</div>;
};
