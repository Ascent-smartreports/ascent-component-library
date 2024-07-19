import type { Meta, StoryObj } from "@storybook/react";
import { Heading } from ".";

const meta: Meta<typeof Heading> = {
  component: Heading,
};

export default meta;
type Story = StoryObj<typeof Heading>;
export const HeadingText: Story = {
  args: {
    children: "Hello i'm a Heading",
  },
};

export const HeadingWithStyles: Story = {
  args: {
    children: "Hello i'm a Heading with styles",
    className: "text-backgroundDarkGreen",
  },
};
