import type { Meta, StoryObj } from "@storybook/react";
import "../../assets/input.module.scss";
import { TextAreaInput } from ".";
import * as Yup from "yup" 

const meta: Meta<typeof TextAreaInput> = {
  component: TextAreaInput,
};

export default meta;
type Story = StoryObj<typeof TextAreaInput>;

const validationSchema = Yup.object().shape({
description: Yup.string().required("description is required"),
});

export const TextArea: Story = {
  args: {
    label:'TextArea',
  validationSchema:validationSchema,
  field:{
    name:'description',
    value:'',
    onBlur:()=>{},
    onChange:()=>{}
  },
  autoFocus:false,
  error:"",
  placeholder:'Enter the text Input',
  disabled : false,
  height :"120px",
  },
};
