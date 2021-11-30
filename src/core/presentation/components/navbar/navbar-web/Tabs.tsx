import { LogoutButton } from "../../../../../features/auth/presentation/components/LogoutButton";
import { routerManager } from "../../../../router/user-control/router-manager";
import { NavLink } from "react-router-dom";
import { Space } from "antd";

const NavTabs = () => {
  return (
    <Space size={30}>
      {routerManager().map((e) => {
        return (
          e.name && (
            <NavLink
              key={e.path}
              to={e.path}
              style={{ fontSize: 20, color: "#444444" }}
              activeStyle={{
                color: "#1890ff",
              }}
            >
              {e.name}
            </NavLink>
          )
        );
      })}
      <LogoutButton />
    </Space>
  );
};

export default NavTabs;
