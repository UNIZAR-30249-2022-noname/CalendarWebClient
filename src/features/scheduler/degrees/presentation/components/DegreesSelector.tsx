import { Form, Select } from "antd";
import Text from "antd/lib/typography/Text";
import { useContext } from "react";
import {
  DegreeInfoContext,
  SelectedDegreeContext,
} from "../../../../../core/context/context";

const { Option } = Select;

export const DegreesSelector = () => {
  const context = useContext(DegreeInfoContext);
  const contextSelectedDegree = useContext(SelectedDegreeContext);
  const degreesList = context.store.list;

  const onChange = (selectedDegree: string) => {
    const degreePropsList = context.store.properties.get(selectedDegree);
    if (degreePropsList == null || degreePropsList.length === 0) return;

    const degreeProps = degreePropsList[0];
    contextSelectedDegree.actions.setSelectedDegree({
      degree: selectedDegree,
      year: degreeProps.name,
      group: degreeProps.groups[0],
    });
  };

  const menu = degreesList.map((degree, i) => (
    <Option key={i} children={<Text>{degree}</Text>} value={degree} />
  ));

  return (
    <Form.Item
      name="degree"
      required
      rules={[
        {
          required: true,
          message: "Elige la titulación!",
        },
      ]}
    >
      <Select
        style={{ width: 215 }}
        showSearch
        optionFilterProp="children"
        placeholder={"Elige una titulación"}
        onChange={onChange}
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
