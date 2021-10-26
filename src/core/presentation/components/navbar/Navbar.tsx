import { Button, Row, Space, Tabs } from "antd";
import { FC, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { routerManager } from "../../../router/user-control/router-manager";
import { MainLogo } from "./MainLogo";

const { TabPane } = Tabs;

type Props = {
  path: string;
};

export const Navbar: FC<Props> = ({ path }) => {
  const history = useHistory();
  const [selectedTab, setselectedTab] = useState("/calendar");

  const handleOnClick = (path: string) => {
    history.push(path);
  };

  useEffect(() => {
    setselectedTab(path);
  }, []);

  return (
    <Row
      align="middle"
      justify="space-between"
      style={{ paddingLeft: 20, paddingRight: 20 }}
    >
      <MainLogo />
      <Tabs
        activeKey={selectedTab}
        style={{
          paddingLeft: 20,
        }}
        size="large"
        onTabClick={(key, _) => handleOnClick(key)}
        tabBarExtraContent={
          <Button type="primary" danger size="large" style={{ marginLeft: 30 }}>
            Salir
          </Button>
        }
      >
        {routerManager().map((e) => {
          return <TabPane tab={e.name} key={e.path} />;
        })}
      </Tabs>
    </Row>
  );
};
