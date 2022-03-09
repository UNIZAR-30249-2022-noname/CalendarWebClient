import Text from "antd/lib/typography/Text";
import { LoggingForm } from "../../../features/auth/presentation/components/LoggingForm";

export const LoginPage = () => {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LoggingForm />
    </div>
  );
};
