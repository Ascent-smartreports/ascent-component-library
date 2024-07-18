import type { Meta, StoryObj } from "@storybook/react";
import "../../assets/modal.module.scss";
import { Modal } from "./Modal";
import { ModalChildComp } from "./helpers/ModalChildComp";

const meta: Meta<typeof Modal> = {
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Modal_Large: Story = {
  args: {
    children: <ModalChildComp />,
    isOpen: true,
    size: "lg",
    closeModal: () => {
      alert("this is large size modal");
    },
  },
};

export const Modal_Medium: Story = {
  args: {
    children: <ModalChildComp />,
    isOpen: true,
    size: "md",
    closeModal: () => {
      alert("this is medium size modal");
    },
  },
};

export const Modal_Small: Story = {
  args: {
    children: <ModalChildComp />,
    isOpen: true,
    size: "sm",
    closeModal: () => {
      alert("this is small size modal");
    },
  },
};
