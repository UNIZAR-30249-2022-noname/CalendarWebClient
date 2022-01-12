import { Form, Select } from "antd";
import Text from "antd/lib/typography/Text";
import { useContext } from "react";
import { DegreeSubjectsContext } from "../../../../../core/context/context";

const { Option } = Select;

export const SubjectSelector = () => {
  const subjectList = useContext(DegreeSubjectsContext).store;

  const menu = subjectList?.map((subject, i) => (
    <Option
      key={i}
      children={<Text>{subject.subject}</Text>}
      value={subject.subject}
    />
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
