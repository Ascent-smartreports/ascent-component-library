/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent } from "react";
import { AnyObject, AnySchema } from "yup";
import styles from "../../assets/input.module.scss";
import { Label, Paragraph } from "../Texts";
import { getIn } from "formik";

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

// eslint-disable-next-line react-refresh/only-export-components
export const isRequiredField = (validationSchema: any, name: string) => {
  return !!getIn(validationSchema.describe().fields, name)?.tests?.find(
    (obj: { name: string }) => obj.name === "required"
  );
};

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

  return (
    <div className={className}>
      <Label>
        {label}
        {isRequiredField(validationSchema, field.name) && "*"}
      </Label>
      <div>
        <textarea
          value={field.value}
          onChange={onChangeText}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          autoComplete="off"
          onBlur={field.onBlur}
          className={styles.input}
          autoFocus={!!autoFocus}
          style={{ height }}
          data-testid={testId}
        />
      </div>
      {error && <Paragraph type="error">{error}</Paragraph>}
    </div>
  );
};
