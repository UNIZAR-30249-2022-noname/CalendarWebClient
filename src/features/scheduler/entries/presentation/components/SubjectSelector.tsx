import { Form, Select } from "antd";
import Text from "antd/lib/typography/Text";

const { Option } = Select;

export const SubjectSelector = () => {
  // TODO: use redux to recover the info
  const subjectList = [
    "Arquitectura de Computadores",
    "Verificación y validación",
    "Matemáticas 2",
  ];

  const menu = subjectList.map((room, i) => (
    <Option key={i} children={<Text>{room}</Text>} value={room} />
  ));

  return (
    <Form.Item
      name="subject"
      label="Asignatura"
      required
      rules={[
        {
          required: true,
          message: "Elige una asignatura!",
        },
      ]}
    >
      <Select
        optionFilterProp="children"
        placeholder={"Buscar la asignatura.."}
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
