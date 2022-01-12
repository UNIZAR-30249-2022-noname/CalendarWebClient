import { Form, Select } from "antd";
import Text from "antd/lib/typography/Text";
import { useContext } from "react";
import {
  DegreeInfoContext,
  SelectedDegreeContext,
} from "../../../../../core/context/context";

const { Option } = Select;

export const GroupSelector = () => {
  const context = useContext(DegreeInfoContext);
  const contextSelectedDegree = useContext(SelectedDegreeContext);
  const { degree, year } = contextSelectedDegree.store;

  const group = context.store.properties.get(degree);
  const groupList = group ? group[year - 1].groups : [];

  const menu = groupList.map((group, i) => (
    <Option key={i} children={<Text>{group}</Text>} value={group} />
  ));

  const onChange = (selectedGroup: string) => {
    contextSelectedDegree.actions.setSelectedDegree({
      degree,
      year,
      group: selectedGroup,
    });
  };

  return (
    <Form.Item
      name="group"
      required
      rules={[
        {
          required: true,
          message: "Elige el grupo!",
        },
      ]}
    >
      <Select
        optionFilterProp="children"
        placeholder="Elige grupo..."
        onChange={onChange}
        style={{ minWidth: 110 }}
      >
        {menu}
      </Select>
    </Form.Item>
  );
};
