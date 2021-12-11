import Text from "antd/lib/typography/Text";
import { Form, Select } from "antd";
import { useContext } from "react";
import {
  DegreeInfoContext,
  SelectedDegreeContext,
} from "../../../../../core/context/context";

const { Option } = Select;

export const YearSelector = () => {
  const context = useContext(DegreeInfoContext);
  const contextSelectedDegree = useContext(SelectedDegreeContext);
  const yearList = context.store.properties.get(
    contextSelectedDegree.store.degree
  );

  const onChange = (selectedYear: number) => {
    const selectedDegree = contextSelectedDegree.store.degree;
    const degreePropsList = context.store.properties.get(selectedDegree);
    if (degreePropsList == null || degreePropsList.length === 0) return;
    const degreeProps = degreePropsList[selectedYear - 1];

    contextSelectedDegree.actions.setSelectedDegree({
      degree: selectedDegree,
      year: selectedYear,
      group: degreeProps.groups[0],
    });
  };

  const menu = yearList?.map((degree, i) => (
    <Option key={i} children={<Text>{degree.name}</Text>} value={degree.name} />
  ));

  return (
    <Form.Item
      name="year"
      required
      rules={[
        {
          required: true,
          message: "Elige el curso!",
        },
      ]}
    >
      <Select
        optionFilterProp="children"
        placeholder={"Elige el curso..."}
        onChange={onChange}
        style={{ minWidth: 110 }}
      >
        {menu}
      </Select>
    </Form.Item>
  );
};
