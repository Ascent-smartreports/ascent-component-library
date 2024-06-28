import { ChangeEvent, ReactNode, useState } from "react";
import { AnyObject, AnySchema } from "yup";
import styles from "../../assets/input.module.scss";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { getIn, useFormikContext } from "formik";

export interface InputProps {
  validationSchema?: AnySchema<AnyObject> | undefined;
  label: string;
  type?: string;
  field: {
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  };
  error: string | undefined;
  autoFocus?: boolean;
  placeholder?: string;
  component?: ReactNode;
  disabled?: boolean;
  isPassword?: boolean;
  maxLength?: number;
  rightIcon?: ReactNode;
  onBlur?: () => void;
  leftIcon?: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isRequiredField = (validationSchema: any, name: string) => {
  return !!getIn(validationSchema.describe().fields, name)?.tests?.find(
    (obj: { name: string }) => obj.name === "required"
  );
};

const InputField: React.FC<InputProps> = ({
  label,
  validationSchema,
  type = "text",
  field,
  autoFocus,
  error,
  placeholder,
  disabled = false,
  isPassword,
  maxLength,
  rightIcon,
  onBlur,
  leftIcon,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const { handleChange } = useFormikContext();

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(field.name)(e);
  };

  return (
    <>
      <p className={styles.label}>
        {label}
        {isRequiredField(validationSchema, field.name) && "*"}
      </p>
      <div>
        {leftIcon && <div className={styles.leftIcon}>{leftIcon}</div>}
        <input
          type={isPassword && !isPasswordVisible ? "password" : type}
          autoFocus={!!autoFocus}
          security="true"
          value={field.value}
          onChange={onChangeText}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          autoComplete="none"
          onBlur={onBlur}
          className={`${styles.input} ${leftIcon ? "px-8" : "px-2"}`}
          onFocus={onBlur}
        />
        {isPassword ? (
          <>
            {!isPasswordVisible ? (
              <IoEyeOutline
                className={styles.passwordIcon}
                size={22}
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              />
            ) : (
              <IoEyeOffOutline
                className={styles.passwordIcon}
                size={22}
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              />
            )}
          </>
        ) : rightIcon ? (
          <div className={styles.passwordIcon}>{rightIcon}</div>
        ) : null}
      </div>
      {error && <p className={styles.errorText}>{error}</p>}
    </>
  );
};

export default InputField;
