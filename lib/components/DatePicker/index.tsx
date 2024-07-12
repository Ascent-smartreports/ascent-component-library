import React from "react";
import DatePicker from "react-datepicker";
import { AnyObject, AnySchema } from "yup";
import { Field, FieldProps, useFormikContext } from "formik";
import { isRequiredField } from "../Input";
import "../../assets/datePickers.css";
import moment from "moment";
import { Label, Paragraph } from "../Texts";
interface formikDateProps {
  name: string;
  error: string | undefined;
  validationSchema: AnySchema<AnyObject>;
  label: string;
  disabled?: boolean;
  autoFocus?: boolean;
  minDate?: Date;
  maxDate?: Date;
  dateFormat: "DD-MM-YYYY" | "YYYY-MM-DD" | "DD/MM/YYYY" | "YYYY/MM/DD";
}

const FormikDateField: React.FC<formikDateProps> = ({
  name,
  error,
  validationSchema,
  label,
  autoFocus,
  disabled,
  minDate,
  maxDate,
  dateFormat,
}) => {
  const { setFieldValue } = useFormikContext();

  return (
    <Field name={name}>
      {({ field }: FieldProps) => (
        <>
          <Label>
            {label}
            {isRequiredField(validationSchema, field.name) && "*"}
          </Label>
          <DatePicker
            autoFocus={autoFocus}
            disabled={disabled}
            dateFormat={"dd/MM/yyyy"}
            minDate={minDate}
            placeholderText="test"
            value={moment(new Date(field.value)).format("DD/MM/YYYY")}
            onChange={(date: Date | null) => {
              setFieldValue(field.name, moment(date).format(dateFormat));
            }}
            maxDate={maxDate}
            showIcon
            wrapperClassName="w-[100%] border-border text-textLightGray border-[1.5px]"
            className="rounded-md h-[54px] focus:outline-none border-[1.5px] border-border text-textLightGray w-[100%] my-2"
          />
          {error && <Paragraph type="error">{error}</Paragraph>}
        </>
      )}
    </Field>
  );
};

export default FormikDateField;
