import { Col, Row } from "antd";
import { CSSProperties, FC } from "react";
import { useMediaQuery } from "react-responsive";
import { NotesDrawer } from "../components/notes-drawer/Drawer";
import { NavbarMobile } from "../components/navbar/navbar-movile/NavbarMobile";
import { NavbarWeb } from "../components/navbar/navbar-web/NavbarWeb";
import { RightSidebar } from "../components/RightSidebar";

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
      <NotesDrawer>{/*TODO: Notes */}</NotesDrawer>
    </>
  );
};
