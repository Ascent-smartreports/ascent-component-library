import type { Meta, StoryObj } from "@storybook/react";
import { SubHeading } from ".";

const meta: Meta<typeof SubHeading> = {
  component: SubHeading,
};

export default meta;
type Story = StoryObj<typeof SubHeading>;
export const SubHeadingText: Story = {
  args: {
    children: "Hello i'm a sub heading",
  },
};

export const SubHeadingWithStyles: Story = {
  args: {
    children: "Hello i'm a subheading with styles",
    className: "text-backgroundDarkGreen",
  },
};
