import { useEffect, useState } from "react";
import WHiteTick from "../../lib/assets/images/whiteTick2.svg";

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
      className={`w-5 h-5 border cursor-pointer flex items-center justify-center
        ${inputState === INPUT_STATES.CHECKED ? "bg-[#1E2A54]" : inputState === INPUT_STATES.UNCHECKED_BLACK ? "bg-white border-[#1E2A54]" : "bg-white"}
      `}
      style={{
        borderRadius: "5px",
        borderColor:
          inputState === INPUT_STATES.CHECKED ||
          inputState === INPUT_STATES.UNCHECKED_BLACK
            ? "#1E2A54"
            : "#C3C7D1",
        borderWidth: "1px",
      }}
    >
      {inputState === INPUT_STATES.CHECKED && (
        <img
          src={WHiteTick}
          alt="Checked"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      )}
      {inputState === INPUT_STATES.UNCHECKED_BLACK && (
        <div className="w-[10px] h-[10px] bg-backgroundTheme" />
      )}
    </div>
  );
};

export default CustomCheckbox;
