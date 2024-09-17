/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent } from "react";
import { AnyObject, AnySchema } from "yup";
import styles from "../../assets/input.module.scss";
import { Label, Paragraph } from "../Texts";
import { isRequiredField } from "../Input";

export interface TextAreaProps {
  validationSchema?: AnySchema<AnyObject> | undefined;
  label: string;
  field: {
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  };
  className?: string;
  form: {
    submitCount: number;
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean
    ) => void;
  };
  error: string | undefined;
  autoFocus?: boolean;
  placeholder?: string;
  disabled?: boolean;
  height: string;
  testId: string;
  maxLength?: number;
}

export const TextAreaInput: React.FC<TextAreaProps> = ({
  label,
  validationSchema,
  field,
  form,
  autoFocus,
  error,
  placeholder,
  disabled = false,
  height = "100px",
  maxLength,
  testId,
  className,
}) => {
  const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    form.setFieldValue(field.name, e.target.value);
    field.onChange(e);
  };
  const inputId = `input_${field.name}`;

  return (
    <div className={className}>
      <Label htmlFor={inputId}>
        {label}
        {isRequiredField(validationSchema, field.name) && "*"}
      </Label>
      <div>
        <textarea
          id={inputId}
          value={field.value}
          onChange={onChangeText}
          placeholder={placeholder || `Enter ${field.name}`}
          disabled={disabled}
          maxLength={maxLength}
          autoComplete="off"
          onBlur={field.onBlur}
          className={styles.input}
          autoFocus={!!autoFocus}
          style={{ height, paddingLeft: "15px", paddingTop: "10px" }}
          data-testid={testId}
        />
      </div>
      {error && <Paragraph type="error">{error}</Paragraph>}
    </div>
  );
};
