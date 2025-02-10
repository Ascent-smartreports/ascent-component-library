import toast from "react-hot-toast";
import success from "../../assets/images/toast_success.png";
import error from "../../assets/images/toast_error.png";
import warning from "../../assets/images/toast_warning.png";
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
}

export const Notify = ({
  message,
  type,
  position = "top-right",
  toastType = "solid",
  duration,
}: ToastProps): void => {
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
        };
      default:
        return {
          iconSrc: "",
          bgColor: "",
          textColor: "",
        };
    }
  };

  const { iconSrc, bgColor, textColor, borderColor } = getIconAndStyles();

  const CustomToast: FC<CustomToastProps> = ({
    message,
    iconSrc,
    bgColor,
    textColor,
  }) => (
    <div
      className={`flex flex-row items-center max-w-[25%] min-w-[250px] ${bgColor} ${borderColor} rounded-[8px] p-4`}
      style={{
        width: "auto",
        height: "auto",
      }}
    >
      <div className="flex flex-row items-center flex-grow">
        <img src={iconSrc} alt="Custom Icon" className="w-5 h-5 mr-4" />
        <div className="justify-start">
          <p className={`${textColor} text-lg`}>{message}</p>
        </div>
      </div>
    </div>
  );

  toast.custom(
    () => (
      <CustomToast
        message={message}
        iconSrc={iconSrc}
        bgColor={bgColor}
        textColor={textColor}
      />
    ),
    {
      position: position,
      duration: duration,
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
): void => {
  Notify({
    message,
    type: "SUCCESS",
    toastType: toastType ? toastType : "solid",
    duration: duration ? duration : toastFlexiDuration(message),
  });
};

export const NotifyError = (
  message: string,
  duration?: number,
  toastType?: "solid" | "outlined"
): void => {
  Notify({
    message,
    type: "ERROR",
    toastType: toastType ? toastType : "solid",
    duration: duration ? duration : toastFlexiDuration(message),
  });
};

export const NotifyWarning = (
  message: string,
  duration?: number,
  toastType?: "solid" | "outlined"
): void => {
  Notify({
    message,
    type: "WARNING",
    toastType: toastType ? toastType : "solid",
    duration: duration ? duration : toastFlexiDuration(message),
  });
};
