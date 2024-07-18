/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import Select, { MultiValue, SingleValue } from "react-select";
import makeAnimated from "react-select/animated";
import { isRequiredField } from "../Input";
import { AnyObject, AnySchema } from "yup";
// import { useFormikContext } from "formik";
import styles from "../../assets/dropdown.module.scss";
import { Label, Paragraph } from "../Texts";
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
    value: string | Option | Option[];
  };
  form: {
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean
    ) => void;
    setFieldTouched: (
      field: string,
      isTouched?: boolean,
      shouldValidate?: boolean
    ) => void;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
  isMulti?: boolean;
  defaultValue?: Option[];
}

const animatedComponents = makeAnimated();

export const DropDown: React.FC<dropdownProps> = ({
  placeholder,
  options,
  validationSchema,
  field,
  label,
  error,
  isMulti,
  defaultValue,
  form,
}) => {
  useEffect(() => {
    if (defaultValue) {
      form.setFieldValue(field.name, defaultValue);
    }
  }, [defaultValue, field.name, form]);

  const handleChange = (newValue: MultiValue<Option> | SingleValue<Option>) => {
    const value = isMulti ? newValue : (newValue as Option);
    form.setFieldValue(field.name, value);
    form.setFieldTouched(field.name, true, false);
  };
  const customStyles = {
    option: (_provided: unknown, state: { isFocused: boolean }) => ({
      color: state.isFocused ? "#FFFFFF" : "#21294C",
      fontSize: 16,
      padding: 10,
    }),
  };
  return (
    <>
      <Label>
        {label}
        {isRequiredField(validationSchema, field.name) && "*"}
      </Label>
      <Select
        classNames={{
          control: (state) =>
            state.isFocused
              ? `${styles.dropdownContainer}`
              : `${styles.dropdownContainer}`,
          option: (state) => (state.isFocused ? `${styles.active}` : ""),
        }}
        options={options}
        components={animatedComponents}
        isMulti={isMulti}
        styles={customStyles}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={handleChange}
      />
      {error && <Paragraph type="error">{error}</Paragraph>}
    </>
  );
};
