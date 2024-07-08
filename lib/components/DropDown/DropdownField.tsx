import { Field, FieldProps } from "formik";
import DropDown, { Option } from ".";
import { AnyObject, AnySchema } from "yup";
import React from "react";

interface DropdownFieldProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
  validationSchema: AnySchema<AnyObject>;
  label: string;
  options: Option[];
  isMulti?: boolean;
  defaultValue?: Option[];
}

const DropdownField: React.FC<DropdownFieldProps> = ({
  name,
  error,
  validationSchema,
  defaultValue,
  label,
  isMulti,
  options,
}) => {
  return (
    <Field name={name} autoComplete="none">
      {({ field }: FieldProps) => (
        <DropDown
          validationSchema={validationSchema}
          label={label}
          defaultValue={defaultValue}
          options={options}
          field={field}
          isMulti={isMulti}
          error={error}
        />
      )}
    </Field>
  );
};

export default DropdownField;