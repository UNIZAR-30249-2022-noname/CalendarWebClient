import { Row } from "antd";
import { FC, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { MainLogo } from "./MainLogo";
import { NavTabs } from "./Tabs";

type Props = {
  path: string;
};

export const NavbarWeb: FC<Props> = ({ path }) => {
  const history = useHistory();
  const [selectedTab, setselectedTab] = useState("/calendar");

  const handleOnClick = (path: string) => {
    history.push(path);
  };

  useEffect(() => {
    setselectedTab(path);
  }, [path]);

  return (
    <Row
      align="middle"
      justify="space-between"
      style={{ paddingLeft: 20, paddingRight: 20 }}
    >
      <div
        id="mainLogo"
        onClick={() => handleOnClick("/")}
        style={{ cursor: "pointer" }}
      >
        <MainLogo />
      </div>
      <NavTabs activeTab={selectedTab} handleOnClick={handleOnClick} />
    </Row>
  );
};
