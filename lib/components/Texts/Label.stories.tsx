import type { Meta, StoryObj } from "@storybook/react";
import { Label } from ".";

const meta: Meta<typeof Label> = {
  component: Label,
};

export default meta;
type Story = StoryObj<typeof Label>;
export const LabelText: Story = {
  args: {
    children: "Hello i'm a Label",
  },
};

export const ParagraphWithStyles: Story = {
  args: {
    children: "Hello i'm a label with styles",
    className: "text-backgroundDarkGreen",
  },
};
