import type { Meta, StoryObj } from "@storybook/react";
import "../../assets/button.module.scss";
import { CustomCheckbox } from ".";

const meta: Meta<typeof CustomCheckbox> = {
  component: CustomCheckbox,
};

export default meta;
type Story = StoryObj<typeof CustomCheckbox>;

export const DoubleClickCheckbox: Story = {
  args: {
    labelText: "Test",
    clickType: "double",
  },
};

export const FourClickCheckBox: Story = {
  args: {
    labelText: "4 click",
    clickType: "quadruple",
  },
};

export const DisabledCheckbox: Story = {
  args: {
    labelText: "disabled",
    isDisabled: true,
  },
};

export const CheckboxWithSelectedType: Story = {
  args: {
    labelText: "selectedType",
    onStateChange: (newState) => alert(newState),
    labelColor: "red",
  },
};
