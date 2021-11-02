import { Col, Row } from "antd";
import { CSSProperties, FC, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { NotesDrawer } from "../components/notes-drawer/NotesDrawer";
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
  const [notesDrawerVisibility, setnotesDrawerVisibility] = useState(false);

  const openNotesDrawer = () => {
    setnotesDrawerVisibility(true);
  };

  const closeNotesDrawer = () => {
    setnotesDrawerVisibility(false);
  };

  return (
    <>
      <Row>
        <Col flex="auto">
          {!isMobile ? <NavbarWeb path={path} /> : <NavbarMobile path={path} />}
          <Row>
            <div
              style={{
                ...theme,
                height: "100vh",
                width: "100%",
                paddingRight: 30,
              }}
            >
              {children}
            </div>
            <div style={{ position: "absolute", right: 0 }}>
              <RightSidebar openNotesDrawer={openNotesDrawer} />
            </div>
          </Row>
        </Col>
      </Row>
      <NotesDrawer
        visible={notesDrawerVisibility}
        closeNotesDrawer={closeNotesDrawer}
      >
        {/*TODO: Notes */}
      </NotesDrawer>
    </>
  );
};
