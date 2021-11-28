import { Form, Select } from "antd";
import Text from "antd/lib/typography/Text";

const { Option } = Select;

type Props = {
  disabled: boolean;
};

export const ProblemsGroupSelector = ({ disabled }: Props) => {
  const roomList = ["1", "2", "3", "3B"];

  const menu = roomList.map((room, i) => (
    <Option key={i} children={<Text>{room}</Text>} value={room} />
  ));

  return (
    <Form.Item
      name="problems"
      label="Grupo"
      required
      rules={[
        {
          required: !disabled,
          message: "Elige un grupo!",
        },
      ]}
    >
      <Select
        optionFilterProp="children"
        placeholder={"Elige el grupo..."}
        style={{ minWidth: 110 }}
        disabled={disabled}
      >
        {menu}
      </Select>
    </Form.Item>
  );
};
