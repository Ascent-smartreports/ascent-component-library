import type { Meta, StoryObj } from "@storybook/react";
import { InputField } from ".";
import { IoEyeOffOutline } from "react-icons/io5";
import * as Yup from "yup";
const meta: Meta<typeof InputField> = {
  component: InputField,
};

export default meta;
type Story = StoryObj<typeof InputField>;
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});

export const Input: Story = {
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
  },
};

export const DisabledInput: Story = {
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
    disabled: true,
  },
};

export const MaxLengthInput: Story = {
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
    maxLength: 10,
  },
};

export const InputWithPlaceholde: Story = {
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
    placeholder: "Enter your name",
  },
};

export const PasswordInput: Story = {
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
    isPassword: true,
    rightIcon: <IoEyeOffOutline />,
  },
};
