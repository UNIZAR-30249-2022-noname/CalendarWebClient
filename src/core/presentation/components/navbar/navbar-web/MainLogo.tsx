import { Row } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import Text from "antd/lib/typography/Text";

export const MainLogo = () => {
  return (
    <Row align="middle">
      <CalendarOutlined
        style={{ fontSize: 45, color: "#1890FF", marginRight: 10 }}
      />
      <Text strong style={{ fontSize: 30, color: "#1890FF" }}>
        D & D Calendar
      </Text>
    </Row>
  );
};
