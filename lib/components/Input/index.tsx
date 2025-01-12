/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { AnyObject, AnySchema } from "yup";
import styles from "../../assets/input.module.scss";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { getIn } from "formik";
import { Label, Paragraph } from "../Texts";
import { BsUpload } from "react-icons/bs";

export interface InputProps {
  validationSchema?: AnySchema<AnyObject> | undefined;
  label: string;
  type?: string;
  className?: string;
  field: {
    name: string;
    value: string | File | File[];
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: ChangeEvent<HTMLInputElement>) => void;
  };
  form: {
    setFieldTouched(name: string, arg1: boolean): unknown;
    validateField: (
      field: string
    ) => Promise<void> | Promise<string | undefined>;
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
  accept?: string; // Prop for accepted file types
  multiple?: boolean; // Prop for allowing multiple files
  onFileChange?: (files: File | File[]) => void; // Custom handler for file change
}

// eslint-disable-next-line react-refresh/only-export-components
export const isRequiredField = (
  validationSchema: any,
  name: string
): boolean => {
  try {
    const field = getIn(validationSchema.describe().fields, name);

    if (!field) {
      return false;
    }

    if (field.tests?.some((obj: { name: string }) => obj.name === "required")) {
      return true;
    }

    if (field.type === "array") {
      if (field.tests?.some((obj: { name: string }) => obj.name === "min")) {
        return true;
      }
      const arrayItem = field.of;
      if (arrayItem && arrayItem.type === "object") {
        const nestedFields = arrayItem.fields || {};
        return Object.keys(nestedFields).some((key) =>
          nestedFields[key]?.tests?.some(
            (obj: { name: string }) => obj.name === "required"
          )
        );
      }
    }
    if (field.type === "object") {
      if (
        field.tests?.some((obj: { name: string }) => obj.name === "required")
      ) {
        return true;
      }

      const nestedFields = field.fields || {};
      return Object.keys(nestedFields).some((key) =>
        nestedFields[key]?.tests?.some(
          (obj: { name: string }) => obj.name === "required"
        )
      );
    }
    return false;
  } catch (error) {
    console.error("Error checking required field:", error);
    return false;
  }
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
  accept,
  multiple = false,
  onFileChange,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<string | string[] | null>(
    null
  );
  const inputId = `input_${field.name}`;
  const [error1, setError] = useState<string | undefined>();

  const finalCustomInputClass = `${styles.input} ${leftIcon ? "pl-9" : ""}`;

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (type === "file" && files) {
      const fileList = multiple ? Array.from(files) : files[0];
      setSelectedFiles(
        multiple ? Array.from(files).map((file) => file.name) : files[0].name
      );
      await form.setFieldValue(field.name, fileList, false);
      form.setFieldTouched(field.name, true);
      form.validateField(field.name);
      onFileChange?.(fileList);
    } else {
      await form.setFieldValue(field.name, e.target.value, false);
      form.setFieldTouched(field.name, true);
      form.validateField(field.name);
    }
    field.onChange(e);
  };

  useEffect(() => {
    if (field.value === null) {
      setSelectedFiles(null);
    }
  }, [field.value]);

  useEffect(() => {
    setError(error);
  }, [error]);

  return (
    <div className={className}>
      <Label
        htmlFor={inputId}
        className="mb-[3px] inline-block text-base font-normal text-[#21294C]"
      >
        {label}
        {isRequiredField(validationSchema, field.name) && " *"}
      </Label>
      <div className={styles.inputWrapper}>
        {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}

        {type === "file" ? (
          <div className="flex items-center w-full">
            <input
              id={inputId}
              type="file"
              className="hidden text-base font-normal text-[#21294C]"
              onChange={handleChange}
              accept={accept}
              multiple={multiple}
              disabled={disabled}
            />
            <div className="flex items-center justify-between w-full border rounded-sm overflow-hidden h-[48px] px-1 border-border">
              <div className="flex-grow">
                <input
                  type="text"
                  readOnly
                  value={
                    selectedFiles
                      ? Array.isArray(selectedFiles)
                        ? selectedFiles.join(", ")
                        : selectedFiles
                      : multiple
                        ? "Choose files"
                        : "Choose file"
                  }
                  className="w-full px-3 py-2 border-none focus:outline-none bg-[#ffffff] text-border placeholder-textLightDark min-w-48"
                  placeholder={multiple ? "Choose files" : "Choose file"}
                  style={{
                    color: selectedFiles ? "inherit" : "#9CA3AF",
                  }}
                />
              </div>
              <label
                htmlFor={inputId}
                className="flex justify-center items-center h-[30px] w-[30px] mr-1 bg-backgroundTheme text-[#ffffff] rounded-sm cursor-pointer"
              >
                <BsUpload size={16} className="text-[#ffffff]" />
              </label>
            </div>
          </div>
        ) : (
          <input
            id={inputId}
            type={isPassword && !isPasswordVisible ? "password" : type}
            autoFocus={autoFocus}
            value={
              type === "file"
                ? undefined
                : (field.value as
                    | string
                    | number
                    | readonly string[]
                    | undefined)
            }
            onChange={handleChange}
            placeholder={placeholder || `Enter ${label}`}
            disabled={disabled}
            maxLength={maxLength}
            autoComplete="off"
            onBlur={field.onBlur}
            data-testid={testId}
            className={`w-full h-[48px] px-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary ${finalCustomInputClass}`}
          />
        )}

        {isPassword ? (
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? (
              <IoEyeOffOutline size={22} />
            ) : (
              <IoEyeOutline size={22} />
            )}
          </span>
        ) : rightIcon ? (
          <div className={styles.rightIcon}>{rightIcon}</div>
        ) : null}
      </div>
      {error1 && (
        <div className="my-2">
          <Paragraph type="error">{error1}</Paragraph>
        </div>
      )}
    </div>
  );
};
