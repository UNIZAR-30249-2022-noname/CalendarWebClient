import { Radio, Select } from "antd";
import Text from "antd/lib/typography/Text";
import { FC, useEffect, useState } from "react";

type Props = {
  activeGroup: number;
  setActiveGroup: Function;
};

const { Option } = Select;

export const GroupSelector: FC<Props> = ({ activeGroup, setActiveGroup }) => {
  const [groupList, setGroupList] = useState([{ value: 0, name: "" }]);

  useEffect(() => {
    //TODO: get degree groups
    let groupListRes = [
      { value: 0, name: "Mañanas" },
      { value: 1, name: "Tardes" },
      { value: 2, name: "Único" },
    ];
    setGroupList(groupListRes);
  }, []);

  const selectGroup = (selectedGroup: string) => {
    setActiveGroup(selectedGroup);
  };

  const menu = groupList.map((group, i) => (
    <Option key={i} children={<Text>{group.name}</Text>} value={group.value} />
  ));

  return (
    <Select
      optionFilterProp="children"
      placeholder="Elige grupo..."
      value={groupList[activeGroup] ? groupList[activeGroup].name : ""}
      defaultValue={""}
      onChange={selectGroup}
      style={{ minWidth: 110 }}
    >
      {menu}
    </Select>
  );
};
