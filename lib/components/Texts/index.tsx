import React from "react";
import "../../assets/texts.css";
interface textProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  className?: string;
}
export const Heading: React.FC<textProps> = ({ children, className }) => {
  return (
    <h2 className={className} style={{ fontWeight: "bold" }}>
      {children}
    </h2>
  );
};

export const SubHeading: React.FC<textProps> = ({ children, className }) => {
  return (
    <h4 className={className} style={{ fontWeight: "bold" }}>
      {children}
    </h4>
  );
};

export const Label: React.FC<textProps> = ({ children, className }) => {
  return (
    <h6 className={className} style={{ fontWeight: "normal" }}>
      {children}
    </h6>
  );
};

export const Paragraph: React.FC<textProps> = ({ children, className }) => {
  return (
    <p className={className} style={{ fontWeight: "lighter" }}>
      {children}
    </p>
  );
};
