import { FC } from "react";
import { Tabs } from "antd";
import { LogoutButton } from "../../../../../features/auth/presentation/components/LogoutButton";
import { routerManager } from "../../../../router/user-control/router-manager";

type Props = {
  handleOnClick: Function;
  activeTab: string;
};

const { TabPane } = Tabs;

export const NavTabs: FC<Props> = ({ handleOnClick, activeTab }) => {
  return (
    <Tabs
      activeKey={activeTab}
      style={{
        paddingLeft: 20,
      }}
      size="large"
      onTabClick={(key, _) => handleOnClick(key)}
      tabBarExtraContent={<LogoutButton />}
    >
      {routerManager().map((e) => {
        return e.name && <TabPane tab={e.name} key={e.path} />;
      })}
    </Tabs>
  );
};
