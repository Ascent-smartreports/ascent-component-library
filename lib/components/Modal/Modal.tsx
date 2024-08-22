import React from "react";
import styles from "../../assets/modal.module.scss";

interface ModalProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  size: "xs" | "sm" | "lg" | "md";
  closeModal: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  size,
  closeModal,
  className,
}) => {
  if (!isOpen) return null;

  const getSizeClass = (size: "xs" | "sm" | "lg" | "md") => {
    switch (size) {
      case "xs":
        return styles.modalXs;
      case "sm":
        return styles.modalSm;
      case "md":
        return styles.modalMd;
      case "lg":
        return styles.modalLg;
      default:
        return styles.modalMd;
    }
  };

  return (
    <div className={`${className} flex items-center justify-center w-screen`}>
      <div
        className={styles.modalScreen}
        onClick={() => {
          closeModal();
        }}
      ></div>
      <div
        className={`${styles.modalContainer} ${getSizeClass(size)}`}
        onClick={() => {}}
      >
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  );
};
