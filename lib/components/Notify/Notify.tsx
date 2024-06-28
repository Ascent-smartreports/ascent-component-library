import { toast } from "react-toastify";
import success from "../../Assets/toast_success.png";
import error from "../../Assets/toast_error.png";

export interface ToastProps {
  message: string;
  type: "SUCCESS" | "ERROR" | "LOADING";
  position?:
    | "top-right"
    | "top-center"
    | "top-left"
    | "bottom-right"
    | "bottom-center"
    | "bottom-left";
}

const Notify = ({ message, type, position = "top-right" }: ToastProps) => {
  const getIconAndStyles = () => {
    switch (type) {
      case "SUCCESS":
        return {
          iconSrc: success,
          bgColor: "bg-green-500",
          textColor: "text-white",
        };
      case "ERROR":
        return {
          iconSrc: error,
          bgColor: "bg-red-500",
          textColor: "text-white",
        };
      case "LOADING":
        return { iconSrc: error, bgColor: "bg-white", textColor: "text-black" };
    }
  };

  const { iconSrc, bgColor, textColor } = getIconAndStyles();

  toast(message, {
    position: position,
    icon: <img src={iconSrc} alt="Custom Icon" className="w-6 h-6" />,
    className: `${bgColor} ${textColor} rounded-full p-4 w-fit`,
    autoClose: 3000,
    closeButton: false,
    hideProgressBar: true,
    containerId: message,
  });
};

export default Notify;
