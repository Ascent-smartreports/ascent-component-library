// import { useFormikContext } from "formik";
import React from "react";
import Select from "react-select";

export interface Option {
  label: string;
  value: string;
}

interface dropdownProps {
  placeholder?: string;
  options: Option[];
}

const DropDown: React.FC<dropdownProps> = ({ placeholder, options }) => {
  return <Select placeholder={placeholder} options={options} />;
};
export default DropDown;
