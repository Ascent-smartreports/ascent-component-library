import type { Meta, StoryObj } from "@storybook/react";
import "../../assets/groupRadio.module.scss";
import "../../assets/texts.module.scss";
import { GroupRadio } from ".";
import { groupRadioData } from "../../../src/App";

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
