/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, ReactNode, useState } from "react";
import { AnyObject, AnySchema } from "yup";
import styles from "../../assets/input.module.scss";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { getIn } from "formik";
import { Label, Paragraph } from "../Texts";
import { twMerge } from "tailwind-merge";

export interface InputProps {
  validationSchema?: AnySchema<AnyObject> | undefined;
  label: string;
  type?: string;
  className?: string;
  field: {
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: ChangeEvent<HTMLInputElement>) => void;
  };
  form: {
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean
    ) => void;
  };
  testId: string;
  error: string | undefined;
  autoFocus?: boolean;
  placeholder?: string;
  component?: ReactNode;
  disabled?: boolean;
  isPassword?: boolean;
  maxLength?: number;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components
export const isRequiredField = (validationSchema: any, name: string) => {
  return !!getIn(validationSchema.describe().fields, name)?.tests?.find(
    (obj: { name: string }) => obj.name === "required"
  );
};

export const InputField: React.FC<InputProps> = ({
  label,
  validationSchema,
  type = "text",
  field,
  form,
  autoFocus,
  error,
  placeholder,
  disabled = false,
  isPassword,
  maxLength,
  rightIcon,
  className,
  leftIcon,
  testId,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const finalCustomInputClass = twMerge(
    `${styles.input} ${leftIcon ? "px-9" : ""}`,
    className
  );

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue(field.name, e.target.value);
    field.onChange(e);
  };

  return (
    <div className={className || "my-4"}>
      <Label>
        {label}
        {isRequiredField(validationSchema, field.name) && "*"}
      </Label>
      <div className={styles.inputWrapper}>
        {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
        <input
          type={isPassword && !isPasswordVisible ? "password" : type}
          autoFocus={!!autoFocus}
          value={field.value}
          onChange={onChangeText}
          placeholder={placeholder ? placeholder : `Enter ${label}`}
          disabled={disabled}
          maxLength={maxLength}
          autoComplete="off"
          onBlur={field.onBlur}
          data-testid={testId}
          className={finalCustomInputClass}
          onFocus={field.onBlur}
        />
        {isPassword ? (
          <>
            {!isPasswordVisible ? (
              <IoEyeOutline
                className={styles.rightIcon}
                size={22}
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              />
            ) : (
              <IoEyeOffOutline
                className={styles.rightIcon}
                size={22}
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              />
            )}
          </>
        ) : rightIcon ? (
          <div className={styles.rightIcon}>{rightIcon}</div>
        ) : null}
      </div>
      <div className="my-2 h-8">
        {error && <Paragraph type="error">{error}</Paragraph>}
      </div>
    </div>
  );
};
