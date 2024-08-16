/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent } from "react";
import DatePicker from "react-datepicker";
import { AnyObject, AnySchema } from "yup";
import { isRequiredField } from "../Input";
import "../../assets/datePickers.css";
import CalendarIcon from "../../assets/images/calendar.png";
import moment from "moment";
import { Label, Paragraph } from "../Texts";
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
  dateFormat: "DD-MM-YYYY" | "YYYY-MM-DD" | "DD/MM/YYYY" | "YYYY/MM/DD";
  handleOnChange?: (date: string) => void;
}

const CustomInput = React.forwardRef<HTMLInputElement, any>(
  ({ value, onClick, onChange, autoFocus, disabled }, ref) => (
    <div className="relative w-[100%] border-border text-textLightGray border-[1.5px] rounded-md">
      <input
        ref={ref}
        value={value}
        onClick={onClick}
        onChange={onChange}
        placeholder={"DD/MM/YYYY"}
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
  field,
  form,
  testId,
  className,
  handleOnChange,
}) => {
  const selectedDate = field.value
    ? moment(field.value, dateFormat).toDate()
    : null;

  return (
    <div className={`${className} h-24`}>
      <Label>
        {label}
        {isRequiredField(validationSchema, field.name) && "*"}
      </Label>
      <DatePicker
        autoFocus={autoFocus}
        disabled={disabled}
        data-testid={testId}
        dateFormat={"dd/MM/yyyy"}
        minDate={minDate}
        maxDate={maxDate}
        selected={selectedDate}
        onChange={(date: Date | null) => {
          form.setFieldValue(field.name, moment(date).format(dateFormat));
          if (handleOnChange) {
            handleOnChange(moment(date).format(dateFormat));
          }
        }}
        customInput={<CustomInput />}
        wrapperClassName="w-[100%] border-border text-textLightGray border-[1.5px]"
        className="rounded-md h-[54px] focus:outline-none border-[1.5px] border-border text-textLightGray w-[100%]"
      />
      <div className="my-2">
        {error && <Paragraph type="error">{error}</Paragraph>}
      </div>
    </div>
  );
};
