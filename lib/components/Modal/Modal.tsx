import React from "react";
import Button from "../Button";
import styles from "../../assets/modal.module.scss";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  heading: string;
}

const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  onSave,
  heading,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalScreen}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeading}>
          <h2 className={styles.modalHeadingText}>{heading}</h2>
        </div>
        <div className={styles.modalHeading}>{children}</div>
        <div className={styles.buttonsContainer}>
          <div className={styles.buttonsSubContainer}>
            <Button
              label={"close"}
              type="submit"
              onClick={onClose}
              buttonType="outlined"
            />
            <Button label={"Save"} type="submit" onClick={onSave} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
