import { Row, Space, Col } from "antd";
import Text from "antd/lib/typography/Text";
import { useState } from "react";
import { ProSidebar } from "react-pro-sidebar";
import { useMediaQuery } from "react-responsive";
import { leftDrawerContext } from "../../context/leftDrawerContext";
import { LeftDrawer } from "../components/left-drawer/LeftDrawer";
import { ButtonToggleND } from "../components/notes-drawer/ButtonToggleND";

export const Scheduler = () => {
  const isDrawerClosed = useMediaQuery({ query: "(min-width: 600px)" });
  const [visible, setvisible] = useState(leftDrawerContext.getVisibility());

  const toggleVisibility = () => {
    setvisible(!visible);
    leftDrawerContext.setVisibility(!visible);
  };

  return (
    <Row align="top">
      {isDrawerClosed && (
        <ProSidebar
          style={{
            height: "100vh",
            borderRight: "2px solid #C5C5C5",
            zIndex: 0,
          }}
          collapsed={visible}
          width={200}
          collapsedWidth={0.1}
        >
          <LeftDrawer />
        </ProSidebar>
      )}
      <Row align="middle">
        <Col>
          <Space style={{ padding: 10 }} align="center">
            {isDrawerClosed && (
              <ButtonToggleND
                toggleDrawer={toggleVisibility}
                visibility={!visible}
              />
            )}
            <Text style={{ fontSize: 30, color: "#464646" }}>Horario</Text>
          </Space>
        </Col>
        {/* <Col>
          <TitleSelector />
        </Col>
        <Col>
          <GroupSelector />
        </Col>
        <Col>
          <DocentGroupSelector />
        </Col> */}
      </Row>
    </Row>
  );
};
