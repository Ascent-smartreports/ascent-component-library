import React from "react";
import { Label } from "../Texts";
import styles from "../../assets/groupRadio.module.scss";
import textStyles from "../../assets/texts.module.scss";
import { twMerge } from "tailwind-merge";
interface GroupRadioButtonInterface {
  label: string;
  data: { label: string; value: string }[];
  handleOptionChange: (label: string, value: string) => void;
  selectedValue: string;
  testId: string;
  disabled?: boolean;
  className?: string;
}

export const GroupRadio: React.FC<GroupRadioButtonInterface> = ({
  label,
  data,
  handleOptionChange,
  selectedValue,
  testId,
  disabled = false,
  className = "",
}) => {
  const inputId = `input_${label}`;
  const finalClassName = twMerge("h-32", className);
  return (
    <div className={finalClassName}>
      <div className="flex flex-col items-start justify-start">
        <div className="flex justify-start">
          <Label htmlFor={inputId}>{label}</Label>
        </div>
        <div className={styles.radioInnerContainer}>
          {data.map((item) => (
            <div key={item.value} className={`${styles.radioInnerContainer}`}>
              <input
                type="radio"
                id={inputId}
                data-testid={testId}
                className={styles.radioIcon}
                name={label}
                value={item.value}
                checked={selectedValue === item.value}
                onChange={() => {
                  if (!disabled) handleOptionChange(item.label, item.value);
                }}
              />
              <Label className={`${(textStyles.label, "mx-2 mb-1 mr-24")}`}>
                {item.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
