import React from "react";
import DatePicker from "react-datepicker";
import { AnyObject, AnySchema } from "yup";
import { Field, FieldProps, useFormikContext } from "formik";
import { isRequiredField } from "../Input";
import "../../assets/datePickers.css";

interface formikDateProps {
  name: string;
  error: string | undefined;
  validationSchema: AnySchema<AnyObject>;
  label: string;
  disabled?: boolean;
  autoFocus?: boolean;
  minDate?: Date;
  maxDate?: Date;
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
}) => {
  const { setFieldValue } = useFormikContext();

  return (
    <Field name={name}>
      {({ field }: FieldProps) => (
        <>
          <p>
            {label}
            {isRequiredField(validationSchema, field.name) && "*"}
          </p>
          <DatePicker
            autoFocus={autoFocus}
            disabled={disabled}
            dateFormat={"dd/MM/yyyy"}
            minDate={minDate}
            selected={field.value}
            onChange={(e) => {
              setFieldValue(field.name, e);
            }}
            maxDate={maxDate}
            showIcon
            wrapperClassName="w-[100%] border-border text-textLightGray border-[1.5px]"
            className=" rounded-md h-[54px] focus:outline-none border-[1.5px] border-border text-textLightGray w-[100%] my-2"
          />
          {error && <p>{error}</p>}
        </>
      )}
    </Field>
  );
};
export default FormikDateField;
