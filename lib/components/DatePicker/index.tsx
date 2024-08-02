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
  handleOnChange?: (date: Date | null) => void;
}

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
  const selectedDate = moment(field.value, dateFormat).toDate();
  return (
    <div className={className || "my-4"}>
      <Label>
        {label}
        {isRequiredField(validationSchema, field.name) && "*"}
      </Label>
      <DatePicker
        autoFocus={autoFocus}
        disabled={disabled}
        data-testid={testId}
        icon={
          <img src={CalendarIcon} alt="Custom Icon" className="w-4 h-4 mr-4" />
        }
        dateFormat={"DD/MM/YYYY"}
        minDate={minDate}
        placeholderText="DD/MM/YYYY"
        value={selectedDate ? moment(selectedDate).format("DD/MM/YYYY") : ""}
        onChange={(date: Date | null) => {
          form.setFieldValue(field.name, moment(date).format(dateFormat));
          if (handleOnChange) {
            handleOnChange(date);
          }
        }}
        maxDate={maxDate}
        showIcon
        wrapperClassName="w-[100%] border-border text-textLightGray border-[1.5px]"
        className="rounded-md h-[54px] focus:outline-none border-[1.5px] border-border text-textLightGray w-[100%]"
      />
      {error && <Paragraph type="error">{error}</Paragraph>}
    </div>
  );
};
