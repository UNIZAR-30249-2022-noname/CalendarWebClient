import { Row, Menu } from "antd";
import { FC, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { CalendarOutlined, AppstoreOutlined } from "@ant-design/icons";
import { routerManager } from "../../../../router/user-control/router-manager";
import SubMenu from "antd/lib/menu/SubMenu";

type Props = {
  path: string;
};

export const NavbarMobile: FC<Props> = ({ path }) => {
  const history = useHistory();
  const [selectedTab, setselectedTab] = useState("/calendar");

  const handleOnClick = (path: string) => {
    console.log(path);
    history.push(path);
  };

  useEffect(() => {
    setselectedTab(path);
  }, [path]);

  return (
    <Row align="middle" justify="space-between" style={{ padding: 5 }}>
      <CalendarOutlined
        style={{ fontSize: 35, color: "#1890FF" }}
        onClick={() => history.push("/")}
      />
      <Menu
        triggerSubMenuAction="click"
        expandIcon={
          <AppstoreOutlined style={{ color: "666666", fontSize: 25 }} />
        }
        selectedKeys={[selectedTab]}
        mode="vertical"
      >
        <SubMenu key="submenu" popupOffset={[-50, 50]}>
          {routerManager().map((e) => {
            return (
              e.name && (
                <Menu.Item key={e.path} onClick={(e) => handleOnClick(e.key)}>
                  {e.name}
                </Menu.Item>
              )
            );
          })}
        </SubMenu>
      </Menu>
    </Row>
  );
};
