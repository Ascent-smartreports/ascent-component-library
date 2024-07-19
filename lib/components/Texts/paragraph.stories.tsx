import type { Meta, StoryObj } from "@storybook/react";
import { Paragraph } from ".";

const meta: Meta<typeof Paragraph> = {
  component: Paragraph,
};

export default meta;
type Story = StoryObj<typeof Paragraph>;
export const ParagraphText: Story = {
  args: {
    children: "Hello i'm a paragraph",
  },
};

export const ParagraphWithStyles: Story = {
  args: {
    children: "Hello i'm a paragraph with styles",
    className: "text-backgroundDarkGreen",
  },
};
