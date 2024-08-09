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
  disabled?: boolean;
  className?: string;
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
  testId: string;
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
  disabled,
  testId,
  className,
}) => {
  useEffect(() => {
    if (defaultValue) {
      form.setFieldValue(field.name, defaultValue);
    }
  }, [defaultValue, field.name, form]);

  const handleChange = (newValue: MultiValue<Option> | SingleValue<Option>) => {
    if (!disabled) {
      const value = isMulti ? newValue : (newValue as Option);
      form.setFieldValue(field.name, value);
      form.setFieldTouched(field.name, true, false);
    }
  };

  const customStyles = {
    control: (provided: AnyObject, state: { isFocused: boolean }) => ({
      ...provided,
      borderColor: state.isFocused ? "#E4E5E9" : "#dfe1e5",
      fontSize: 16,
      padding: "6px 7px",
      textColor: "green",
    }),
    option: (_: AnyObject, state: { isFocused: boolean }) => ({
      backgroundColor: state.isFocused ? "#21294C" : "#FFFFFF",
      color: state.isFocused ? "#FFFFFF" : "#21294C",
      fontSize: 16,
      padding: 10,
      cursor: "pointer",
    }),
    placeholder: (provided: AnyObject) => ({
      ...provided,
      color: "#8D91A3",
    }),
    menu: (provided: AnyObject) => ({
      ...provided,
      marginTop: 10,
      borderRadius: 4,
      boxShadow: "0 4px 11px rgba(0, 0, 0, 0.1)",
    }),
    multiValue: (provided: AnyObject) => ({
      ...provided,
      backgroundColor: "#E0E0E0",
      borderRadius: 4,
      padding: "2px 5px",
    }),
    multiValueLabel: (provided: AnyObject) => ({
      ...provided,
      color: "#21294C",
    }),
    multiValueRemove: () => ({
      color: "#666666",
      cursor: "pointer",
      "&:hover": {
        color: "#FF0000",
      },
    }),
  };

  return (
    <div className={className || "my-4"}>
      <Label>
        {label}
        {isRequiredField(validationSchema, field.name) && " *"}
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
        data-testid={testId}
        styles={customStyles}
        placeholder={placeholder ? placeholder : `Enter ${label}`}
        defaultValue={defaultValue}
        onChange={handleChange}
      />
      <div className="my-2 h-8">
        {error && <Paragraph type="error">{error}</Paragraph>}
      </div>
    </div>
  );
};
