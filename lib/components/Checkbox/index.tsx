import { useState, useEffect, CSSProperties } from "react";

export interface CheckboxProps {
  labelText: string;
  name?: string;
  checkedColor?: string;
  uncheckedColor?: string;
  labelColor?: string;
  disabledColor?: string;
  isDisabled?: boolean;
  isChecked?: boolean;
  clickType?: "double" | "quadruple";
  customStyleCheckBox?: string;
  customStyleLabel?: string;
  testId: string;
  onStateChange?: (
    newState: "unselected" | "selected" | "mandatory" | "uneditable"
  ) => void;
}

export const CustomCheckbox = ({
  labelText,
  name,
  checkedColor = "#344054",
  uncheckedColor = "#E4E5E9",
  customStyleCheckBox,
  customStyleLabel,
  clickType = "double",
  isDisabled,
  isChecked = false,
  testId,
  onStateChange,
}: CheckboxProps) => {
  const [state, setState] = useState<
    "unselected" | "selected" | "mandatory" | "uneditable"
  >(isChecked ? "selected" : "unselected");

  useEffect(() => {
    setState(isChecked ? "selected" : "unselected");
  }, [isChecked]);

  const handleChange = () => {
    const newState = getNextState(state, clickType);
    setState(newState ? newState : "unselected");
    if (onStateChange) {
      onStateChange(newState ? newState : "unselected");
    }
  };

  const handleBoxClick = () => {
    handleChange();
  };

  const getNextState = (
    currentState: "unselected" | "selected" | "mandatory" | "uneditable",
    clickType: "double" | "quadruple"
  ) => {
    if (clickType === "double" && !isDisabled) {
      switch (currentState) {
        case "unselected":
          return "selected";
        case "selected":
          return "unselected";
        case "uneditable":
          return "unselected"; // Allow transition from uneditable to unselected
        default:
          return currentState;
      }
    } else if (clickType === "quadruple" && !isDisabled) {
      switch (currentState) {
        case "unselected":
          return "selected";
        case "selected":
          return "mandatory";
        case "mandatory":
          return "uneditable";
        case "uneditable":
          return "unselected"; // Allow transition from uneditable to unselected
        default:
          return currentState;
      }
    }
  };

  const containerStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    marginRight: "20px",
  };

  const checkboxStyle: CSSProperties = {
    display: "none",
  };

  const labelStyle: CSSProperties = {
    position: "relative",
    fontWeight: 400,
    fontSize: "14px",
    paddingRight: "10px",
    marginBottom: "3px",
  };

  const getBoxStyle = (): CSSProperties => {
    switch (state) {
      case "uneditable":
        return {
          width: "20px",
          height: "20px",
          backgroundColor: "#E4E5E9",
          border: "0.001px solid #e0e0e0",
          display: "inline-block",
          position: "relative",
          verticalAlign: "middle",
          cursor: "pointer", // Changed to pointer
          borderRadius: "4px",
          marginRight: "6px",
          marginBottom: "3px",
        };
      case "mandatory":
        return {
          width: "20px",
          height: "20px",
          backgroundColor: "#36465d",
          border: "0.001px solid #36465d",
          display: "inline-block",
          position: "relative",
          verticalAlign: "middle",
          cursor: "pointer",
          borderRadius: "4px",
          marginRight: "6px",
          marginBottom: "3px",
        };
      case "selected":
        return {
          width: "20px",
          height: "20px",
          backgroundColor: "transparent",
          border: `1.5px solid ${checkedColor}`,
          display: "inline-block",
          position: "relative",
          verticalAlign: "middle",
          cursor: "pointer",
          borderRadius: "4px",
          marginRight: "6px",
          marginBottom: "3px",
        };
      case "unselected":
      default:
        return {
          width: "20px",
          height: "20px",
          backgroundColor: "transparent",
          border: `1.5px solid ${uncheckedColor}`,
          display: "inline-block",
          position: "relative",
          verticalAlign: "middle",
          cursor: "pointer",
          borderRadius: "4px",
          marginRight: "6px",
          marginBottom: "3px",
        };
    }
  };

  const getIconStyle = (): CSSProperties => {
    if (state === "mandatory") {
      return {
        content: '""',
        display: "block",
        position: "absolute",
        top: "9px",
        left: "4px",
        width: "12px",
        height: "2px",
        backgroundColor: "#fff",
        marginBottom: "3px",
      };
    } else if (state === "selected") {
      return {
        content: '""',
        display: "block",
        position: "absolute",
        top: "-4px",
        left: "7.75px",
        width: "7px",
        height: "18px",
        border: "solid #344054",
        borderWidth: "0 2px 2px 0",
        transform: "rotate(45deg)",
        zIndex: 101,
      };
    } else if (state === "uneditable") {
      return {
        content: '""',
        display: "block",
        position: "absolute",
        top: "9px",
        left: "4px",
        width: "12px",
        height: "2px",
        backgroundColor: "#fff",
        marginBottom: "3px",
      };
    } else {
      return {};
    }
  };

  const backgroundStyle: CSSProperties = {
    content: '""',
    display: "block",
    position: "absolute",
    top: "-3px",
    left: "10px",
    width: "10px",
    height: "10px",
    backgroundColor: "#ffffff",
    zIndex: 100,
  };

  return (
    <div style={containerStyle}>
      <input
        type="checkbox"
        id={name}
        checked={state !== "unselected"}
        onChange={handleChange}
        data-testid={testId}
        style={checkboxStyle}
        disabled={state === "uneditable"}
      />
      <div
        onClick={handleBoxClick}
        className={`${customStyleCheckBox}`}
        style={getBoxStyle()}
      >
        {state === "selected" && <span style={backgroundStyle}></span>}
        <span style={getIconStyle()}></span>
      </div>
      <label
        htmlFor={name}
        style={labelStyle}
        className={`${customStyleLabel}`}
      >
        {labelText}
      </label>
    </div>
  );
};
