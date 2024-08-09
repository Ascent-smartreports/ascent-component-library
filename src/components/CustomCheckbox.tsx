import { useEffect, useState } from "react";

const INPUT_STATES = {
  CHECKED: "checked",
  UNCHECKED_WHITE: "unchecked_white",
  UNCHECKED_BLACK: "unchecked_black",
};

interface CustomCheckboxProps {
  isChecked: boolean;
  isAtleastOneSubMenuSelected: boolean;
  onChange?: (isChecked: boolean) => void;
}

const CustomCheckbox = ({
  isChecked,
  isAtleastOneSubMenuSelected,
  onChange,
}: CustomCheckboxProps) => {
  const getCurrentState = () => {
    if (isChecked) return INPUT_STATES.CHECKED;
    return isAtleastOneSubMenuSelected
      ? INPUT_STATES.UNCHECKED_BLACK
      : INPUT_STATES.UNCHECKED_WHITE;
  };

  const [inputState, setInputState] = useState(getCurrentState());

  useEffect(() => {
    setInputState(getCurrentState());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked, isAtleastOneSubMenuSelected]);

  const handleClick = () => {
    const newState =
      inputState === INPUT_STATES.CHECKED
        ? INPUT_STATES.UNCHECKED_WHITE
        : INPUT_STATES.CHECKED;
    setInputState(newState);
    if (onChange) onChange(newState === INPUT_STATES.CHECKED);
  };

  return (
    <div
      onClick={handleClick}
      className={`w-4 h-4 border cursor-pointer flex items-center justify-center
        ${inputState === INPUT_STATES.CHECKED ? "bg-blue-500" : "bg-backgroundLight"}
      `}
      style={{
        borderRadius: "4px",
        borderColor: "#ccc",
        borderWidth: "2px",
      }}
    >
      {inputState === INPUT_STATES.CHECKED && (
        <span className="text-white">&#10003;</span>
      )}
      {inputState === INPUT_STATES.UNCHECKED_BLACK && (
        <div className="w-2 h-2 bg-textLightDark" />
      )}
    </div>
  );
};

export default CustomCheckbox;
