import Text from "antd/lib/typography/Text";
import { LoginForm } from "../../../features/auth/presentation/components/LoginForm";

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
      <LoginForm />
    </div>
  );
};
