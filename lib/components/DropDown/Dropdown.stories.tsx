import type { Meta, StoryObj } from "@storybook/react";
import { DropDown } from ".";
import * as Yup from "yup";
const meta: Meta<typeof DropDown> = {
  component: DropDown,
};

export default meta;
type Story = StoryObj<typeof DropDown>;
const validationSchema = Yup.object().shape({
  topic: Yup.string().required("Topic is required"),
});

const data = [
  { label: "CS", value: "cs" },
  { label: "JAVA", value: "java" },
  { label: "Content", value: "content" },
];
export const Dropdown: Story = {
  args: {
    label: "Topic",
    field: {
      name: "topic",
      value: "",
    },
    options: data,
    error: "Select a valid topic",
    validationSchema: validationSchema,
  },
};

export const MultiSelectDropdown: Story = {
  args: {
    label: "Topic",
    field: {
      name: "topic",
      value: "",
    },
    options: data,
    error: "Select a valid topic",
    validationSchema: validationSchema,
    isMulti: true,
  },
};

export const DefaultValueDropdown: Story = {
  args: {
    label: "Topic",
    field: {
      name: "topic",
      value: "",
    },
    options: data,
    error: "Select a valid topic",
    validationSchema: validationSchema,
    isMulti: true,
    form: {
      setFieldTouched: () => {},
      setFieldValue: () => {},
    },
  },
};
