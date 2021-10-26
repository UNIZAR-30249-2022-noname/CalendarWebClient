import { Col, Drawer, Row, Tabs } from "antd";
import { CSSProperties, FC } from "react";

import { Navbar } from "../components/navbar/Navbar";
import { RightSidebar } from "../components/RightSidebar";

const { TabPane } = Tabs;

type Props = {
  user: String;
  theme: CSSProperties;
  path: string;
};

export const ProfessorLayout: FC<Props> = ({ children, user, theme, path }) => {
  return (
    <>
      <Navbar path={path} />

      <Row>
        <Col flex={50}>
          <div style={{ ...theme, height: "100vh" }}>{children}</div>
        </Col>
        <Col flex="auto">
          <RightSidebar />
        </Col>
      </Row>

      <Drawer title="Basic drawer" placement="right">
        {/*TODO: hacer el componente de notas en features para anyadirlo*/}
      </Drawer>
    </>
  );
};
