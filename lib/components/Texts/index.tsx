import React from "react";
import styles from "../../assets/texts.module.scss";

interface TextProps {
  children: React.ReactNode;
  className?: string;
  type?: "error";
}

export const Heading: React.FC<TextProps> = ({ children, className }) => {
  return (
    <h2 className={className || styles.heading} style={{ fontWeight: "bold" }}>
      {children}
    </h2>
  );
};

export const SubHeading: React.FC<TextProps> = ({ children, className }) => {
  return (
    <h4
      className={className || styles.subHeading}
      style={{ fontWeight: "bold" }}
    >
      {children}
    </h4>
  );
};

export const Label: React.FC<TextProps> = ({ children, className }) => {
  return <h6 className={className || styles.label}>{children}</h6>;
};

export const Paragraph: React.FC<TextProps> = ({
  children,
  className,
  type,
}) => {
  return (
    <p className={className || type ? styles.errorText : styles.paragraph}>
      {children}
    </p>
  );
};
