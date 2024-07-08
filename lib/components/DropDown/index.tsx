import React, { useEffect } from "react";
import Select, { MultiValue, SingleValue } from "react-select";
import makeAnimated from "react-select/animated";
import { isRequiredField } from "../Input";
import { AnyObject, AnySchema } from "yup";
import { useFormikContext } from "formik";
import styles from "../../assets/dropdown.module.scss";

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
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
  const { setFieldValue, setFieldTouched } = useFormikContext();

  useEffect(() => {
    if (defaultValue) {
      setFieldValue(field.name, defaultValue);
    }
  }, [defaultValue, setFieldValue, field.name]);

  const handleChange = (newValue: MultiValue<Option> | SingleValue<Option>) => {
    const value = isMulti ? newValue : (newValue as Option);
    setFieldValue(field.name, value);
    setFieldTouched(field.name, true, false);
  };

  return (
    <>
      <p>
        {label}
        {isRequiredField(validationSchema, field.name) && "*"}
      </p>
      <Select
        classNames={{
          control: (state) =>
            state.isFocused
              ? `${styles.dropdownContainer}`
              : `${styles.dropdownContainer}`,
          option: (state) =>
            state.isSelected
              ? `${styles.active}`
              : state.isFocused
                ? `${styles.active}`
                : "",
          menuList: () => `${styles.active}`,
        }}
        options={options}
        components={animatedComponents}
        isMulti={isMulti}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={handleChange}
      />
      {error && <p>{error}</p>}
    </>
  );
};

export default DropDown;
