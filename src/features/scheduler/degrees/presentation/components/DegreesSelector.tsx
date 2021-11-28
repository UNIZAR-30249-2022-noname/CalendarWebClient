import { Select } from "antd";
import Text from "antd/lib/typography/Text";
import { FC } from "react";

type Props = {
  activeDegree: string;
  setActiveDegree: Function;
  degreesList: string[];
};
const { Option } = Select;

export const DegreesSelector: FC<Props> = ({
  activeDegree,
  setActiveDegree,
  degreesList,
}) => {
  const selectDegree = (selectedDegree: string) => {
    setActiveDegree(selectedDegree);
  };

  const menu = degreesList.map((degree, i) => (
    <Option key={i} children={<Text>{degree}</Text>} value={degree} />
  ));

  const emptyMenu = <Option key={0} children={null} value={"ede"} />;

  return (
    <Select
      style={{ width: 215 }}
      showSearch
      optionFilterProp="children"
      value={activeDegree}
      placeholder={"Elige una titulación"}
      onChange={selectDegree}
      notFoundContent={emptyMenu}
      filterOption={(input, option) =>
        option != null &&
        option !== undefined &&
        (option?.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
          option?.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0)
      }
    >
      {menu}
    </Select>
  );
};
