import React from "react";
import styles from "../../assets/modal.module.scss";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  size: "sm" | "lg" | "md";
  closeModal: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  size,
  closeModal,
}) => {
  if (!isOpen) return null;

  const getSizeClass = (size: "sm" | "lg" | "md") => {
    switch (size) {
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
    <div className={styles.container}>
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
