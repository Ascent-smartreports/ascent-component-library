import React from "react";
import styles from "../../assets/texts.module.scss";

interface TextProps {
  children: React.ReactNode;
  className?: string;
  type?: "error";
  onTextClick?: () => void;
}

export const Heading: React.FC<TextProps> = ({
  children,
  className,
  onTextClick,
}) => {
  return (
    <h2
      className={className || styles.heading}
      style={{ fontWeight: "bold" }}
      onClick={() => onTextClick}
    >
      {children}
    </h2>
  );
};

export const SubHeading: React.FC<TextProps> = ({
  children,
  className,
  onTextClick,
}) => {
  return (
    <h4
      className={className || styles.subHeading}
      style={{ fontWeight: "bold" }}
      onClick={() => onTextClick}
    >
      {children}
    </h4>
  );
};

export const Label: React.FC<TextProps> = ({
  children,
  className,
  onTextClick,
}) => {
  return (
    <h6 className={className || styles.label} onClick={() => onTextClick}>
      {children}
    </h6>
  );
};

export const Paragraph: React.FC<TextProps> = ({
  children,
  className,
  type,
  onTextClick,
}) => {
  return (
    <p
      className={type ? styles.errorText : className || styles.paragraph}
      onClick={onTextClick}
    >
      {children}
    </p>
  );
};
