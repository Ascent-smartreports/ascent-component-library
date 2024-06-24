import type { Meta, StoryObj } from "@storybook/react";
import "../../assets/button.module.scss";
import Button from ".";

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: "Button",
    onClick: () => {
      alert("being tapped");
    },
  },
};

export const OutLined: Story = {
  args: {
    label: "outlinedButton",
    onClick: () => {
      alert("outlined button");
    },
    buttonType: "outlined",
  },
};

export const CustomStyled: Story = {
  args: {
    label: "custom button",
    onClick: () => {
      alert("Im a custom button");
    },
    customStyle:
      "bg-backgroundLight py-6 px-3 border-2  shadow-broundTheme shadow-md rounded-md",
  },
};