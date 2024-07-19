import type { Meta, StoryObj } from "@storybook/react";
import "../../assets/groupRadio.module.scss";
import "../../assets/texts.module.scss";
import { GroupRadio } from ".";
 const groupRadioData = [
   { label: "Male", value: "male" },
   { label: "Female", value: "female" },
   { label: "Others", value: "others" },
 ];

const meta: Meta<typeof GroupRadio> = {
  component: GroupRadio,
};

export default meta;
type Story = StoryObj<typeof GroupRadio>;

export const GroupRadioDefault: Story = {
  args: {
    label: "Gender",
    data: groupRadioData,
    handleOptionChange: (_label: string, value: string) => alert(value),
    selectedValue: "male",
    testId: "gender",
  },
};
