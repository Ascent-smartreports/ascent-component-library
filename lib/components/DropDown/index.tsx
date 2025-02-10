/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Select, { MultiValue, SingleValue } from "react-select";
import makeAnimated from "react-select/animated";
import { isRequiredField } from "../Input";
import { AnyObject, AnySchema } from "yup";
import styles from "../../assets/dropdown.module.scss";
import { Label, Paragraph } from "../Texts";
// import { CustomStyles } from "./customStyles";
export interface Option {
  label: string;
  value: string;
  additionalInfo?: Record<string, string>;
}

interface dropdownProps {
  placeholder?: string;
  options: Option[];
  validationSchema?: AnySchema<AnyObject> | undefined;
  label?: string;
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
  error: any;
  isMulti?: boolean;
  testId: string;
  onChange?: (value: any) => void;
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
  form,
  disabled,
  testId,
  className = "",
  onChange,
}) => {
  const [defaultValue, setDefaultValue] = useState(field.value);

  useEffect(() => {
    setDefaultValue(field.value);
  }, [field.value]);

  const handleChange = (newValue: MultiValue<Option> | SingleValue<Option>) => {
    if (!disabled) {
      const value = isMulti ? newValue : (newValue as Option);
      form.setFieldValue(field.name, value);
      form.setFieldTouched(field.name, true, false);
      if (onChange) {
        onChange(value);
      }
    }
  };

  const formatOptionLabel = (
    option: Option,
    { context }: { context: "menu" | "value" }
  ) => {
    if (context === "menu") {
      return (
        <div className="flex flex-col">
          <span className="font-medium">{option.label}</span>
          {option.additionalInfo &&
            Object.entries(option.additionalInfo).map(([key, value]) => (
              <span
                key={key}
                className="text-sm text-gray-500"
              >{`${key}: ${value}`}</span>
            ))}
        </div>
      );
    }
    return <span>{option.label}</span>;
  };

  const inputId = `input_${field.name}`;
  return (
    <div className={className}>
      {label && (
        <Label
          htmlFor={inputId}
          className="mb-[4px] inline-block  font-normal text-backgroundTheme"
        >
          {label}
          {isRequiredField(validationSchema, field.name) && " *"}
        </Label>
      )}
      <Select
        id={inputId}
        classNames={{
          control: () => styles.dropdownContainer,
          placeholder: () => "fs14",
          option: (state) => (state.isFocused ? `${styles.active}` : ""),
        }}
        options={options}
        components={{
          ...animatedComponents,
          IndicatorSeparator: () => null,
        }}
        isMulti={isMulti}
        data-testid={testId}
        classNamePrefix={"custom_select_input"}
        placeholder={placeholder ? placeholder : `Select ${label}`}
        onChange={handleChange}
        value={defaultValue as Option | Option[]}
        formatOptionLabel={formatOptionLabel}
        isDisabled={disabled}
      />
      {error?.value && (
        <div className="my-2 h-4">
          <Paragraph type="error">{error?.value}</Paragraph>
        </div>
      )}
    </div>
  );
};
