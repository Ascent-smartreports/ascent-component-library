// import { getIn } from "formik";
import { ChangeEvent, ReactNode, useState } from "react";
import { AnyObject, AnySchema } from "yup";
import styles from "../../assets/input.module.scss";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
export interface InputProps {
  validationSchema?: AnySchema<AnyObject> | undefined;
  label: string;
  type?: string;
  field?: {
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  };
  isValid?: boolean;
  error?: string | undefined;
  autoFocus?: boolean;
  placeholder?: string;
  component?: ReactNode;
  disabled?: boolean;
  isPassword?: boolean;
  setPasswordIcon?: (data: boolean) => void;
  passwordIcon?: boolean;
  maxLength?: number;
  rightIcon?: ReactNode;
  onBlur?: () => void;
  leftIcon?: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const isRequiredField = (validationSchema: any, name: string) => {
//   return !!getIn(validationSchema.describe().fields, name)?.tests?.find(
//     (obj: { name: string }) => obj.name === "required"
//   );
// };

const InputField: React.FC<InputProps> = ({
  label,
  // validationSchema,
  type = "text",
  field,
  autoFocus,
  error,
  placeholder,
  disabled = false,
  isPassword,
  //   setPasswordIcon,
  //   passwordIcon,
  maxLength,
  rightIcon,
  onBlur,
  leftIcon,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  return (
    <>
      <p>
        {/* {isRequiredField(validationSchema, field.name) && "*"} */}
        {label}
      </p>
      <div>
        {leftIcon && <div className={styles.leftIcon}>{leftIcon}</div>}
        <input
          type={isPassword && !isPasswordVisible ? "password" : type}
          autoFocus={!!autoFocus}
          security="true"
          value={field && field.value ? field?.value : "jier"}
          onChange={
            field && field.onChange
              ? field.onChange
              : (e) => {
                  console.log(e);
                }
          }
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          autoComplete="none"
          onBlur={onBlur}
          className={`${styles.input}`}
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
      {error && <p className={`form-text text-danger form_error`}>{error}</p>}
    </>
  );
};
export default InputField;
