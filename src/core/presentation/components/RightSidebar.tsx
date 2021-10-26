import { ProfileOutlined } from "@ant-design/icons";
import { Col } from "antd";

export const RightSidebar = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#D6D6D6",
        height: "100vh",
        borderLeft: "2px solid #1890FF",
      }}
    >
      <ProfileOutlined onClick={() => {}} />
    </div>
  );
};
