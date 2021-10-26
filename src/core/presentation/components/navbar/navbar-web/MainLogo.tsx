import { Space } from "antd";
import { CalendarFilled } from "@ant-design/icons";
import Text from "antd/lib/typography/Text";

export const MainLogo = () => {
  return (
    <Space align="center" size="middle">
      <CalendarFilled style={{ fontSize: 45, color: "#1890FF" }} />
      <Text strong style={{ fontSize: 30, color: "grey" }}>
        D & D Calendar
      </Text>
    </Space>
  );
};
