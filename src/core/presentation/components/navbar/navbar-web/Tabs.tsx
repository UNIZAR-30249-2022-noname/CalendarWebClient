import { AuthButton } from "../../../../../features/auth/presentation/components/AuthButton";
import { routerManager } from "../../../../router/user-control/router-manager";
import { NavLink } from "react-router-dom";
import { Space } from "antd";
import { UserContext } from "../../../../context/context";
import { useContext } from "react";

const NavTabs = () => {
  const contextUser = useContext(UserContext);
  return (
    <Space size={30}>
      {routerManager(contextUser.usr).map((e) => {
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
      <AuthButton/>
    </Space>
  );
};

export default NavTabs;
