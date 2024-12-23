/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Select, { MultiValue, SingleValue } from "react-select";
import makeAnimated from "react-select/animated";
import { isRequiredField } from "../Input";
import { AnyObject, AnySchema } from "yup";
import styles from "../../assets/dropdown.module.scss";
import { Label, Paragraph } from "../Texts";
import { twMerge } from "tailwind-merge";
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

  const customStyles = {
    control: (
      provided: any,
      state: { isFocused: boolean; isDisabled: boolean }
    ) => {
      return {
        ...provided,
        borderColor: state.isFocused ? "#E4E5E9" : "#dfe1e5",
        fontSize: 16,
        padding: "6px 7px",
        color: "green",
        backgroundColor: state.isDisabled ? "#fcfcfc" : "#ffffff",
      };
    },
    option: (
      provided: any,
      state: { isFocused: boolean; isSelected: boolean }
    ) => {
      return {
        ...provided,
        backgroundColor: state.isSelected ? "#21294C" : "#FFFFFF",
        color: state.isSelected ? "#FFFFFF" : "#21294C",
        ":active": {
          backgroundColor: "#21294C",
          color: "#FFFFFF",
        },
        fontSize: 16,
        padding: 10,
        cursor: "pointer",
      };
    },
    placeholder: (provided: any) => ({
      ...provided,
      color: "#8D91A3",
    }),
    menu: (provided: any) => ({
      ...provided,
      marginTop: 10,
      borderRadius: 4,
      boxShadow: "0 4px 11px rgba(0, 0, 0, 0.1)",
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: "#E0E0E0",
      borderRadius: 4,
      padding: "2px 5px",
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: "#21294C",
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      color: "#666666",
      cursor: "pointer",
      "&:hover": {
        color: "#4A90E2",
      },
    }),
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
  const finalClassName = twMerge("", className);
  return (
    <div className={finalClassName}>
      {label && (
        <Label htmlFor={inputId} className="mb-2 inline-block">
          {label}
          {isRequiredField(validationSchema, field.name) && " *"}
        </Label>
      )}
      <Select
        id={inputId}
        classNames={{
          control: (state) =>
            state.isFocused
              ? `${styles.dropdownContainer}`
              : `${styles.dropdownContainer}`,
          option: (state) => (state.isFocused ? `${styles.active}` : ""),
        }}
        options={options}
        // components={animatedComponents}
        components={{
          ...animatedComponents, // Include any animated components here if needed
          IndicatorSeparator: () => null, // Correct way to remove the separator
        }}
        isMulti={isMulti}
        data-testid={testId}
        styles={customStyles}
        placeholder={placeholder ? placeholder : `Select ${label}`}
        onChange={handleChange}
        value={defaultValue as Option | Option[]}
        formatOptionLabel={formatOptionLabel}
        isDisabled={disabled}
      />
      {error?.value && (
        <div className="my-2">
          <Paragraph type="error">{error?.value}</Paragraph>
        </div>
      )}
    </div>
  );
};
