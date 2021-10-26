import { Row, Menu } from "antd";
import { FC, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { CalendarFilled, MoreOutlined } from "@ant-design/icons";
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
  }, []);

  return (
    <Row align="middle" justify="space-between" style={{ padding: 5 }}>
      <CalendarFilled style={{ fontSize: 35, color: "#1890FF" }} />
      <Menu
        triggerSubMenuAction="click"
        expandIcon={<MoreOutlined style={{ color: "black", fontSize: 25 }} />}
        selectedKeys={[selectedTab]}
      >
        <SubMenu key="submenu" popupOffset={[-50, 50]}>
          {routerManager().map((e) => {
            return (
              <Menu.Item key={e.path} onClick={(e) => handleOnClick(e.key)}>
                {e.name}
              </Menu.Item>
            );
          })}
        </SubMenu>
      </Menu>
    </Row>
  );
};
