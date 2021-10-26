import { Tabs } from "antd";

const { TabPane } = Tabs;

export const TabGroup = () => {
  return (
    <>
      <TabPane tab="Horario" key="/scheduler" />
      <TabPane tab="Calendario" key="/calendar" />
      <TabPane tab="Datos" key="/data" />
    </>
  );
};
