import { Form, Select } from "antd";
import Text from "antd/lib/typography/Text";
import { Week } from "../../domain/models/Entry";

const { Option } = Select;

export const WeekSelector = () => {
  return (
    <Form.Item
      name="week"
      label="Semana"
      required
      rules={[
        {
          required: true,
          message: "Elige semana A o B!",
        },
      ]}
    >
      <Select
        optionFilterProp="children"
        placeholder={"Elige la semana..."}
        style={{ minWidth: 110 }}
      >
        <Option key={Week.A} children={<Text>{Week.A}</Text>} value={Week.A} />
        <Option key={Week.B} children={<Text>{Week.B}</Text>} value={Week.B} />
      </Select>
    </Form.Item>
  );
};
