import { Form, Select } from "antd";
import Text from "antd/lib/typography/Text";

const { Option } = Select;

export const RoomSelector = () => {
  const roomList = ["1", "2", "3"];

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
        showSearch
        filterOption={(input, option) =>
          option
            ? option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
            : false
        }
      >
        {menu}
      </Select>
    </Form.Item>
  );
};
