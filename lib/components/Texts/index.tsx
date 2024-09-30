import React, { useState } from "react";
import styles from "../../assets/texts.module.scss";

interface TextProps {
  children: React.ReactNode;
  className?: string;
  type?: "error";
  onTextClick?: () => void;
  htmlFor?: string;
}

interface TooltipTextProps {
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
      onClick={onTextClick}
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
      onClick={onTextClick}
    >
      {children}
    </h4>
  );
};

export const Label: React.FC<TextProps> = ({
  children,
  className,
  onTextClick,
  htmlFor,
}) => {
  return (
    <label
      className={className || styles.label}
      onClick={onTextClick}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};

export const ToolTipLabel: React.FC<TooltipTextProps> = ({
  children,
  className,
  onTextClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const isString = typeof children === "string";

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <label
        className={className || styles.label}
        onClick={onTextClick}
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          cursor: onTextClick ? "pointer" : "default",
          maxWidth: "120px",
          display: "inline-block",
          verticalAlign: "middle",
        }}
      >
        {children}
      </label>
      {isString && isHovered && (
        <div
          className="absolute z-10 p-2 text-white bg-black rounded shadow-lg tooltip bg-backgroundTheme text-backgroundLight"
          style={{
            top: "50%",
            left: "100%",
            marginLeft: "10px",
            transform: "translateY(-50%)",
            whiteSpace: "nowrap",
          }}
        >
          {children}
          <div
            className="absolute w-0 h-0"
            style={{
              borderTop: "8px solid transparent",
              borderBottom: "8px solid transparent",
              borderRight: "8px solid #21294C",
              top: "50%",
              left: "-6px",
              transform: "translateY(-50%)",
            }}
          />
        </div>
      )}
    </div>
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
