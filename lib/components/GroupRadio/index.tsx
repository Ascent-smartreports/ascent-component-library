import React from "react";
import { Label, SubHeading } from "../Texts";
import styles from "../../assets/groupRadio.module.scss";
interface groupRadioButtonInterface {
  label: string;
  data: { label: string; value: string }[];
}
export const GroupRadio: React.FC<groupRadioButtonInterface> = ({
  label,
  data,
}) => {
  return (
    <div>
      <SubHeading>{label}</SubHeading>
      <div className={styles.radioInnerContainer}>
        {data.map((item) => (
          <>
            <input type="radio" className={styles.radioIcon} />
            <Label>{item.label}</Label>
          </>
        ))}
      </div>
    </div>
  );
};
