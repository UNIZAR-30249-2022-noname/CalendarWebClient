import { Row } from "antd";
import { Link } from "react-router-dom";
import { MainLogo } from "./MainLogo";
import NavTabs from "./Tabs";

export const NavbarWeb = () => {
  return (
    <Row align="middle" justify="space-between" style={{ padding: 10 }}>
      <Link to="/" id="mainLogo" style={{ cursor: "pointer" }}>
        <MainLogo />
      </Link>
      <NavTabs />
    </Row>
  );
};
