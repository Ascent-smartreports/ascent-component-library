// import { useFormikContext } from "formik";
import React, { ChangeEvent } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { isRequiredField } from "../Input";
import { AnyObject, AnySchema } from "yup";

export interface Option {
  label: string;
  value: string;
}

interface dropdownProps {
  placeholder?: string;
  options: Option[];

  validationSchema?: AnySchema<AnyObject> | undefined;
  label: string;
  field: {
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  };
  error: string | undefined;
  isMulti?: boolean;
  defaultValue?: Option[];
}
const animatedComponents = makeAnimated();
const DropDown: React.FC<dropdownProps> = ({
  placeholder,
  options,
  validationSchema,
  field,
  label,
  error,
  isMulti,
  defaultValue,
}) => {
  return (
    <>
      <p>
        {label}
        {isRequiredField(validationSchema, field.name) && "*"}
      </p>
      <div>
        <Select
          options={options}
          components={animatedComponents}
          isMulti={isMulti}
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
        {error && <p>{error}</p>}
      </div>
    </>
  );
};
export default DropDown;
