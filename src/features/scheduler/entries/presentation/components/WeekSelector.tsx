import { Form, Select } from "antd";
import Text from "antd/lib/typography/Text";
import { Week } from "../../domain/models/Entry";

const { Option } = Select;

type Props = {
  disabled: boolean;
};

export const WeekSelector = ({ disabled }: Props) => {
  return (
    <Form.Item
      name="week"
      label="Semana"
      required
      rules={[
        {
          required: true,
          message: "Elige semana!",
        },
      ]}
    >
      <Select
        optionFilterProp="children"
        placeholder={"Elige la semana..."}
        disabled={disabled}
        style={{ minWidth: 110 }}
      >
        <Option key={Week.A} children={<Text>{Week.A}</Text>} value={Week.A} />
        <Option key={Week.B} children={<Text>{Week.B}</Text>} value={Week.B} />
        <Option
          key={Week.UNIQUE}
          children={<Text>{Week.UNIQUE}</Text>}
          value={Week.UNIQUE}
        />
      </Select>
    </Form.Item>
  );
};
