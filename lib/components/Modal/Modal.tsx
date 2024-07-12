import React from "react";
import styles from "../../assets/modal.module.scss";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  size: "sm" | "lg" | "md";
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, size }) => {
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
    <div className={styles.modalScreen}>
      <div className={`${styles.modalContainer} ${getSizeClass(size)}`}>
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
