import { AuthButton } from "../../../../../features/auth/presentation/components/AuthButton";
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
      <AuthButton logged= {false}/>
    </Space>
  );
};

export default NavTabs;
