import { Field, FieldProps } from "formik";
import InputField from ".";
import { AnyObject, AnySchema } from "yup";
import React, { ReactNode } from "react";

export interface FormikFieldProps {
  name: string;
  error: Record<string, string>;
  validationSchema: AnySchema<AnyObject>;
  label: string;
  type?: string;
  autoFocus?: boolean;
  placeholder?: string;
  disabled?: boolean;
  isPassword?: boolean;
  maxLength?: number;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
  onBlur?: () => void;
}

const FormikField: React.FC<FormikFieldProps> = ({
  name,
  error,
  validationSchema,
  label,
  type,
  autoFocus,
  placeholder,
  disabled,
  isPassword,
  maxLength,
  rightIcon,
  leftIcon,
  onBlur,
}) => {
  return (
    <Field name={name} autoComplete="none">
      {({ field }: FieldProps) => (
        <InputField
          validationSchema={validationSchema}
          label={label}
          error={error[name]}
          type={type}
          autoFocus={autoFocus}
          placeholder={placeholder}
          disabled={disabled}
          isPassword={isPassword}
          maxLength={maxLength}
          rightIcon={rightIcon}
          leftIcon={leftIcon}
          onBlur={onBlur}
          field={field}
        />
      )}
    </Field>
  );
};

export default FormikField;
