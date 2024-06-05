import React from "react";
import styles from "../../assets/button.module.scss";

interface buttonProps {
  label: string;
}
const Button: React.FC<buttonProps> = ({ label }) => {
  return (
    <button
      onClick={() => alert("im being tapped!!")}
      className={styles.button}
    >
      {label}
    </button>
  );
};
export default Button;
