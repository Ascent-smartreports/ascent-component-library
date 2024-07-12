import React from "react";

interface groupRadioButtonInterface {
  label: string;
}
export const GroupRadio: React.FC<groupRadioButtonInterface> = ({ label }) => {
  return <div>{label}</div>;
};
