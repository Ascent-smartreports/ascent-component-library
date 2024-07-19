import React from "react";

interface cardProps {
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<cardProps> = ({ children, className = "" }) => {
  return <div className={` rounded-md p-6 m-2  ${className}`}>{children}</div>;
};
