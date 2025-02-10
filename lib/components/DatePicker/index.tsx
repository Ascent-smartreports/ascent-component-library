/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent } from "react";
import DatePicker from "react-datepicker";
import { AnyObject, AnySchema } from "yup";
import { isRequiredField } from "../Input";
import "../../assets/datePickers.css";
import CalendarIcon from "../../assets/images/calendar.png";
import moment from "moment";
import { Label, Paragraph } from "../Texts";
import { twMerge } from "tailwind-merge";

interface formikDateProps {
  name: string;
  error: string | undefined;
  validationSchema: AnySchema<AnyObject>;
  label: string;
  disabled?: boolean;
  className?: string;
  field: {
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: ChangeEvent<HTMLInputElement>) => void;
  };
  testId: string;
  form: {
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean
    ) => void;
  };
  autoFocus?: boolean;
  minDate?: Date;
  maxDate?: Date;
  dateFormat:
    | "DD-MM-YYYY"
    | "YYYY-MM-DD"
    | "DD/MM/YYYY"
    | "YYYY/MM/DD"
    | "MMM yyyy"
    | "yyyy MMM";
  pickerType?: "date" | "month-year";
  handleOnChange?: (date: string) => void;
}

const CustomInput = React.forwardRef<HTMLInputElement, any>(
  ({ value, onClick, onChange, autoFocus, disabled, pickerType }, ref) => (
    <div className="relative w-[100%] border-border border-[1.5px] rounded min-w-48">
      <input
        ref={ref}
        value={value}
        onClick={onClick}
        onChange={onChange}
        placeholder={pickerType === "date" ? "DD/MM/YYYY" : "MMM YYYY"}
        autoFocus={autoFocus}
        disabled={disabled}
        className="rounded min-w-48 inputHeight focus:outline-none border-none text-backgroundTheme w-[100%] pl-4 placeholder:text-textLightGray placeholder:fs14"
      />
      <img
        src={CalendarIcon}
        alt="Calendar Icon"
        className="absolute right-4 top-3 w-4 h-4 cursor-pointer"
        onClick={onClick}
      />
    </div>
  )
);

export const FormikDateField: React.FC<formikDateProps> = ({
  error,
  validationSchema,
  label,
  autoFocus,
  disabled,
  minDate,
  maxDate,
  dateFormat,
  pickerType = "date",
  field,
  form,
  testId,
  className = "",
  handleOnChange,
}) => {
  const selectedDate =
    pickerType === "month-year" && field.value
      ? moment(field.value, ["YYYY MMM", "MMM YYYY"], true).isValid()
        ? moment(field.value, ["YYYY MMM", "MMM YYYY"])
            .startOf("month")
            .toDate()
        : null
      : field.value && moment(field.value, dateFormat, true).isValid()
        ? moment(field.value, dateFormat).toDate()
        : null;

  const inputId = `input_${field.name}`;
  const finalClassName = twMerge("", className);

  return (
    <div className={finalClassName}>
      <Label
        htmlFor={inputId}
        className="mb-[.5rem] inline-block  font-normal text-backgroundTheme"
      >
        {label}
        {isRequiredField(validationSchema, field.name) && " *"}
      </Label>
      <DatePicker
        id={inputId}
        autoFocus={autoFocus}
        disabled={disabled}
        data-testid={testId}
        dateFormat={pickerType === "month-year" ? "MMM yyyy" : "dd/MM/yyyy"}
        minDate={minDate}
        maxDate={maxDate}
        selected={selectedDate}
        onChange={(date: Date | null) => {
          if (pickerType === "month-year") {
            const formattedDate = date ? moment(date).format(dateFormat) : "";
            form.setFieldValue(field.name, formattedDate);
            if (handleOnChange) {
              handleOnChange(formattedDate);
            }
          } else {
            const formattedDate = date ? moment(date).format(dateFormat) : "";
            form.setFieldValue(field.name, formattedDate);
            if (handleOnChange) {
              handleOnChange(formattedDate);
            }
          }
        }}
        customInput={
          <CustomInput
            value={
              pickerType === "month-year" && field.value
                ? moment(field.value, ["YYYY MMM", "MMM YYYY"]).format(
                    "MMM YYYY"
                  )
                : field.value
            }
            pickerType={pickerType}
          />
        }
        showMonthYearPicker={pickerType === "month-year"}
        wrapperClassName="w-[100%] border-border text-textLightGray border-[1.5px]"
        className="rounded text-backgroundTheme min-w-48 inputHeight focus:outline-none border-[1.5px] border-border  w-[100%]"
      />
      {error && (
        <div className="my-2">
          <Paragraph type="error">{error}</Paragraph>
        </div>
      )}
    </div>
  );
};
