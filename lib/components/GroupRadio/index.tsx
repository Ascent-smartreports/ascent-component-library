import React from "react";
import { Label, SubHeading } from "../Texts";
import styles from "../../assets/groupRadio.module.scss";
import textStyles from "../../assets/texts.module.scss";
interface GroupRadioButtonInterface {
  label: string;
  data: { label: string; value: string }[];
  handleOptionChange: (label: string, value: string) => void;
  selectedValue: string;
  testId: string;
}

export const GroupRadio: React.FC<GroupRadioButtonInterface> = ({
  label,
  data,
  handleOptionChange,
  selectedValue,
  testId,
}) => {
  return (
    <div>
      <SubHeading>{label}</SubHeading>
      <div className={styles.radioInnerContainer}>
        {data.map((item) => (
          <div key={item.value} className={`${styles.radioInnerContainer}`}>
            <input
              type="radio"
              data-testid={testId}
              className={styles.radioIcon}
              name={label}
              value={item.value}
              checked={selectedValue === item.value}
              onChange={() => {
                handleOptionChange(item.label, item.value);
              }}
            />
            <Label className={`${(textStyles.label, "mx-2 mb-1 mr-24")}`}>
              {item.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};
