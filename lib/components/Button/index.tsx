import React from "react";
import styles from "../../assets/button.module.scss";
const Button: React.FC = () => {
  return (
    <button
      onClick={() => alert("im being tapped!!")}
      className={styles.button}
    >
      tap me
    </button>
  );
};
export default Button;
