import type { Meta, StoryObj } from "@storybook/react";
import { Card } from ".";

const meta: Meta<typeof Card> = {
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const NormalCard: Story = {
  args: {
    children: <div>hello</div>,
  },
};

export const CardWithStyles: Story = {
  args: {
    children: <div>card with custom styles</div>,
    className: "bg-backgroundLight",
  },
};
