/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent } from "react";
import DatePicker from "react-datepicker";
import { AnyObject, AnySchema } from "yup";
import { isRequiredField } from "../TextAreaInput/isRequired";
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
    <div className="relative w-[100%] border-border text-textLightGray border-[1.5px] rounded-md">
      <input
        ref={ref}
        value={value}
        onClick={onClick}
        onChange={onChange}
        placeholder={pickerType === "date" ? "DD/MM/YYYY" : "MMM YYYY"}
        autoFocus={autoFocus}
        disabled={disabled}
        className="rounded-md h-[54px] focus:outline-none border-none text-textLightGray w-[100%] pl-4"
      />
      <img
        src={CalendarIcon}
        alt="Calendar Icon"
        className="absolute right-4 top-4 w-4 h-5 cursor-pointer"
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
  const finalClassName = twMerge("h-32", className);

  return (
    <div className={finalClassName}>
      <Label htmlFor={inputId}>
        {label}
        {isRequiredField(validationSchema, field.name) && "*"}
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
        className="rounded-md h-[54px] focus:outline-none border-[1.5px] border-border text-textLightGray w-[100%]"
      />
      <div className="my-2">
        {error && <Paragraph type="error">{error}</Paragraph>}
      </div>
    </div>
  );
};
