import { Row, Menu } from "antd";
import { CalendarOutlined, AppstoreOutlined } from "@ant-design/icons";
import { routerManager } from "../../../../router/user-control/router-manager";
import SubMenu from "antd/lib/menu/SubMenu";
import { NavLink } from "react-router-dom";

export const NavbarMobile = () => {
  return (
    <Row align="middle" justify="space-between" style={{ padding: 5 }}>
      <NavLink to="/">
        <CalendarOutlined style={{ fontSize: 35, color: "#1890FF" }} />
      </NavLink>
      <Menu
        triggerSubMenuAction="click"
        expandIcon={
          <AppstoreOutlined style={{ color: "666666", fontSize: 25 }} />
        }
        mode="vertical"
      >
        <SubMenu key="submenu" popupOffset={[-50, 50]}>
          {routerManager().map((e) => {
            return (
              e.name && (
                <Menu.Item key={e.path}>
                  <NavLink to={e.path} activeStyle={{ color: "#1890ff" }}>
                    {e.name}
                  </NavLink>
                </Menu.Item>
              )
            );
          })}
        </SubMenu>
      </Menu>
    </Row>
  );
};
