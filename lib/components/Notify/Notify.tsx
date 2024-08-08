import { toast } from "react-toastify";
import success from "../../assets/images/toast_success.png";
import error from "../../assets/images/toast_error.png";
import warning from "../../assets/images/toast_warning.png";
import "../../assets/ReactToastify.css";
import { FC } from "react";

export interface ToastProps {
  message: string;
  type: "SUCCESS" | "ERROR" | "WARNING";
  position?:
    | "top-right"
    | "top-center"
    | "top-left"
    | "bottom-right"
    | "bottom-center"
    | "bottom-left";
  toastType?: "solid" | "outlined";
  duration?: number;
}
interface CustomToastProps {
  message: string;
  iconSrc: string;
  bgColor: string;
  textColor: string;
  bgColorCloseBtn: string;
  textColorCloseBtn: string;
  borderColorCloseBtn: string;
  closeToast: () => void;
}

export const Notify = ({
  message,
  type,
  position = "top-right",
  toastType = "solid",
  duration = 3000,
}: ToastProps) => {
  const getIconAndStyles = () => {
    switch (type) {
      case "SUCCESS":
        return {
          iconSrc: success,
          bgColor:
            toastType === "solid"
              ? "bg-backgroundTheme"
              : "bg-backgroundLightGreen",
          textColor:
            toastType === "solid"
              ? "text-backgroundLight"
              : "text-backgroundDarkGreen",
          borderColor:
            toastType === "solid"
              ? ""
              : "border-[1px] border-backgroundDarkGreen",
          borderColorCloseBtn: toastType === "solid" ? "border-[1px]" : "",
          bgColorCloseBtn:
            toastType === "solid"
              ? "bg-backgroundLight"
              : "bg-backgroundDarkGreen",
          textColorCloseBtn:
            toastType === "solid"
              ? "text-backgroundTheme"
              : "text-backgroundLight",
        };
      case "ERROR":
        return {
          iconSrc: error,
          bgColor:
            toastType === "solid"
              ? "bg-backgroundTheme"
              : "bg-backgroundLightRed",
          textColor:
            toastType === "solid"
              ? "text-backgroundLight"
              : "text-backgroundDarkRed",
          borderColor:
            toastType === "solid"
              ? ""
              : "border-[1px] border-backgroundDarkRed",
          borderColorCloseBtn: toastType === "solid" ? "border-[1px]" : "",
          bgColorCloseBtn:
            toastType === "solid"
              ? "bg-backgroundLight"
              : "bg-backgroundDarkRed",
          textColorCloseBtn:
            toastType === "solid"
              ? "text-backgroundTheme"
              : "text-backgroundLight",
        };
      case "WARNING":
        return {
          iconSrc: warning,
          bgColor:
            toastType === "solid"
              ? "bg-backgroundTheme"
              : "bg-backgroundLightYellow",
          textColor:
            toastType === "solid"
              ? "text-backgroundLight"
              : "text-backgroundDarkYellow",
          borderColor:
            toastType === "solid"
              ? ""
              : "border-[1px] border-backgroundDarkYellow",
          borderColorCloseBtn: toastType === "solid" ? "border-[1px]" : "",
          bgColorCloseBtn:
            toastType === "solid"
              ? "bg-backgroundLight"
              : "bg-backgroundDarkYellow",
          textColorCloseBtn:
            toastType === "solid"
              ? "text-backgroundTheme"
              : "text-backgroundLight",
        };
      default:
        return {
          iconSrc: "",
          bgColor: "",
          textColor: "",
          bgColorCloseBtn: "",
          textColorCloseBtn: "",
          borderColorCloseBtn: "",
        };
    }
  };

  const {
    iconSrc,
    bgColor,
    textColor,
    borderColor,
    bgColorCloseBtn,
    textColorCloseBtn,
    borderColorCloseBtn,
  } = getIconAndStyles();

  const CustomToast: FC<CustomToastProps> = ({
    message,
    iconSrc,
    bgColor,
    textColor,
    bgColorCloseBtn,
    textColorCloseBtn,
    borderColorCloseBtn,
    closeToast,
  }) => (
    <div
      className={`flex flex-row items-center w-full ${bgColor} ${borderColor} rounded-[6px] p-2 h-14`}
    >
      <div className="flex flex-row items-center flex-grow">
        <img src={iconSrc} alt="Custom Icon" className="w-5 h-5 mr-4" />
        <div className="justify-start">
          <p className={`${textColor} text-xs`}>{message}</p>
        </div>
      </div>
      <div
        onClick={closeToast}
        className={`flex flex-row w-auto items-center justify-center ${bgColorCloseBtn} ${borderColorCloseBtn} h-8 p-2 rounded-[4px]`}
      >
        <p className={`text-xs ${textColorCloseBtn}`}>close</p>
      </div>
    </div>
  );

  toast(
    ({ closeToast }) => (
      <CustomToast
        message={message}
        iconSrc={iconSrc}
        bgColor={bgColor}
        textColor={textColor}
        bgColorCloseBtn={bgColorCloseBtn}
        textColorCloseBtn={textColorCloseBtn}
        borderColorCloseBtn={borderColorCloseBtn}
        closeToast={closeToast}
      />
    ),
    {
      position: position,
      autoClose: duration,
      hideProgressBar: true,
      closeButton: false,
    }
  );
};

const toastFlexiDuration = (msg: string) => {
  const msgLength = msg.length;
  return msgLength * 0.09 * 1000 > 3000 ? msgLength * 0.09 * 1000 : 3000;
};

export const NotifySuccess = (
  message: string,
  duration?: number,
  toastType?: "solid" | "outlined"
) => {
  Notify({
    message,
    type: "SUCCESS",
    position: "top-right",
    toastType: toastType ? toastType : "solid",
    duration: duration ? duration : toastFlexiDuration(message),
  });
};

export const NotifyError = (
  message: string,
  duration?: number,
  toastType?: "solid" | "outlined"
) => {
  Notify({
    message,
    type: "ERROR",
    position: "top-right",
    toastType: toastType ? toastType : "solid",
    duration: duration ? duration : toastFlexiDuration(message),
  });
};

export const NotifyWarning = (
  message: string,
  duration?: number,
  toastType?: "solid" | "outlined"
) => {
  Notify({
    message,
    type: "WARNING",
    position: "top-right",
    toastType: toastType ? toastType : "solid",
    duration: duration ? duration : toastFlexiDuration(message),
  });
};
