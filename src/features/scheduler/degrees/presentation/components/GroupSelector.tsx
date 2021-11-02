import { Radio } from "antd";
import { FC, useEffect, useState } from "react";

type Props = {
  activeGroup: number;
  setActiveGroup: Function;
};

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
    <Radio.Button key={i} value={group.value}>
      {group.name}
    </Radio.Button>
  ));

  return (
    <Radio.Group
      value={activeGroup}
      defaultValue={activeGroup}
      onChange={(e) => selectGroup(e.target.value)}
    >
      {menu}
    </Radio.Group>
  );
};
