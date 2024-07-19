import type { Meta, StoryObj } from "@storybook/react";
import { FormikDateField } from ".";
import * as Yup from "yup";
const meta: Meta<typeof FormikDateField> = {
  component: FormikDateField,
};

export default meta;
type Story = StoryObj<typeof FormikDateField>;
const validationSchema = Yup.object().shape({
  dob: Yup.string().required("Date of birth is required"),
});

export const Input: Story = {
  args: {
    label: "DOB",
    field: {
      name: "dob",
      value: "",
      onBlur: () => {},
      onChange: () => {},
    },
    error: "Enter a valid date",
    validationSchema: validationSchema,
  },
};

export const DisabledInput: Story = {
  args: {
    label: "DOB",
    field: {
      name: "dob",
      value: "",
      onBlur: () => {},
      onChange: () => {},
    },
    error: "Enter a valid date",
    validationSchema: validationSchema,
    disabled: true,
  },
};

export const CustomFormatDate: Story = {
  args: {
    label: "Name",
    field: {
      name: "name",
      value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      onBlur: () => {},
      onChange: () => {},
    },
    error: "Name exceeds maximum length",
    validationSchema: validationSchema,
    dateFormat: "DD/MM/YYYY",
  },
};
const date = new Date();
export const MinDate: Story = {
  args: {
    label: "Name",
    field: {
      name: "name",
      value: "",
      onBlur: () => {},
      onChange: () => {},
    },
    error: "Enter a valid name",
    validationSchema: validationSchema,
    minDate: date,
  },
};

export const MaxDate: Story = {
  args: {
    label: "Password",
    field: {
      name: "password",
      value: "",
      onBlur: () => {},
      onChange: () => {},
    },
    error: "Password is required",
    validationSchema: validationSchema,
    maxDate: date,
  },
};
