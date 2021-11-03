import { notification } from "antd";

export const notifications = {
  error: (message: String) => {
    notification.destroy();
    notification.open({
      placement: "bottomLeft",
      duration: 5,
      type: "error",
      message: "Error",
      description: message,
      style: { padding: 10, border: "1px solid red" },
    });
  },
};
