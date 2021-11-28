import Text from "antd/lib/typography/Text";
import { FC, useEffect, useState } from "react";
import { Select } from "antd";

type Props = {
  activeYear: number;
  setActiveYear: Function;
};

const { Option } = Select;

export const YearSelector: FC<Props> = ({ activeYear, setActiveYear }) => {
  const [yearList, setYearList] = useState([{ value: 1, name: "Cargando..." }]);

  useEffect(() => {
    //TODO: get degree years
    let yearListRes = [
      { value: 1, name: "Primero" },
      { value: 2, name: "Segundo" },
      { value: 3, name: "Tercero" },
      { value: 4, name: "Cuarto" },
    ];
    setYearList(yearListRes);
  }, []);

  const selectDegree = (selectedDegree: number) => {
    setActiveYear(selectedDegree);
  };

  const menu = yearList.map((degree, i) => (
    <Option
      key={i}
      children={<Text>{degree.name}</Text>}
      value={degree.value}
    />
  ));

  return (
    <Select
      optionFilterProp="children"
      placeholder={"Elige el año..."}
      //value={activeYear}
      defaultValue={activeYear}
      onChange={selectDegree}
      style={{ minWidth: 110 }}
    >
      {menu}
    </Select>
  );
};
