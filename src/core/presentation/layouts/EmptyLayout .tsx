import { Col, Layout, Row } from "antd";
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

export const EmptyLayout: FC<Props> = ({ children, user, theme, path }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });
  const [notesDrawerVisibility, setnotesDrawerVisibility] = useState(false);

  const openNotesDrawer = () => {
    setnotesDrawerVisibility(true);
  };

  const closeNotesDrawer = () => {
    setnotesDrawerVisibility(false);
  };

  const { Header, Sider, Content } = Layout;

  return (
    <>
      <Layout style={{ height: "100vh" }}>
        <Layout>
          <Content style={{ ...theme }}>{children}</Content>
        </Layout>
      </Layout>
    </>
  );
};
