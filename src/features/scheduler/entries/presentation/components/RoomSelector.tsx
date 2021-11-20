import { Form, Select } from "antd";
import Text from "antd/lib/typography/Text";

const { Option } = Select;

export const RoomSelector = () => {
  const roomList = ["0.23", "1.34", "A.34", "20.0"];

  const menu = roomList.map((room, i) => (
    <Option key={i} children={<Text>{room}</Text>} value={room} />
  ));

  return (
    <Form.Item
      name="room"
      label="Sala"
      required
      rules={[
        {
          required: true,
          message: "Elige un aula!",
        },
      ]}
    >
      <Select
        optionFilterProp="children"
        placeholder={"Elige el aula..."}
        style={{ minWidth: 110 }}
      >
        {menu}
      </Select>
    </Form.Item>
  );
};
