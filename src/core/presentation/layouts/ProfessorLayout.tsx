import { Col, Drawer, Row, Tabs } from "antd";
import { CSSProperties, FC } from "react";
import { useMediaQuery } from "react-responsive";
import { NavbarMobile } from "../components/navbar/navbar-movile/NavbarMovile";
import { NavbarWeb } from "../components/navbar/navbar-web/NavbarWeb";
import { RightSidebar } from "../components/RightSidebar";

const { TabPane } = Tabs;

type Props = {
  user: String;
  theme: CSSProperties;
  path: string;
};

export const ProfessorLayout: FC<Props> = ({ children, user, theme, path }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });

  return (
    <>
      {!isMobile ? <NavbarWeb path={path} /> : <NavbarMobile path={path} />}

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
