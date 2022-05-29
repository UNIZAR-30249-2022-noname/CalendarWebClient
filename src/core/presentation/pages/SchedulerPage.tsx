/* eslint-disable react-hooks/exhaustive-deps */
import { Layout, Row } from "antd";
import { useMediaQuery } from "react-responsive";
import { leftDrawerContext } from "../../context/leftDrawerContext";
import { DegreeSubjectsContextWrapper } from "../../context/DegreeSubjectsContext";
import { DegreePropertiesContextWrapper } from "../../context/DegreePropertiesContextWrapper";
import { SelectedDegreeContextWrapper } from "../../context/DegreeSelectedContext";
import LeftDrawer from "../../../features/scheduler/degrees/presentation/components/LeftDrawer";
import SchedulerCard from "../../../features/scheduler/entries/presentation/components/SchedulerCard";
import { useContext, useState } from "react";
import { SiderTheme } from "antd/lib/layout/Sider";
import { ButtonToggleND } from "../components/notes-drawer/ButtonToggleND";
import Text from "antd/lib/typography/Text";
import DegreeForm from "../../../features/scheduler/degrees/presentation/components/DegreeForm";
import { IcalButton } from "../../../features/scheduler/exportData/ical/presentation/IcalButton";
import { EntryScheduler } from "../../../features/scheduler/entries/domain/models/EntryScheduler";
import { UserContext } from "../../context/context";
import User, { Privileges } from "../../../features/auth/domain/models/User";

const { Sider, Content, Header } = Layout;

export const SchedulerPage = () => {
  const isDrawerClosed = useMediaQuery({ query: "(min-width: 600px)" });
  const [visible, setvisible] = useState(leftDrawerContext.getVisibility());
  const [draggedEvent, setDraggedEvent] = useState<any | null>(null);
  const user:User = useContext(UserContext).usr;


  const toggleVisibility = () => {
    setvisible(!visible);
    leftDrawerContext.setVisibility(!visible);
  };

  const siderProps = {
    theme: "light" as SiderTheme,
    collapsed: visible,
    hidden: !isDrawerClosed,
    collapsedWidth: 0,
    width: 230,
    id: "leftSider",
    trigger: null,
  };

  return (
    <DegreeSubjectsContextWrapper>
      <DegreePropertiesContextWrapper>
        <SelectedDegreeContextWrapper>
          <Layout
            style={{
              height: "100%",
              backgroundColor: "#E1E2E3",
            }}
          >
            {isDrawerClosed && user.privileges==="coordinator"  && (
              <Sider
                {...siderProps}
                style={{
                  height: "100%",
                  borderRight: "2px solid #1890FF",
                  overflowY: "scroll",
                  backgroundColor: "#E6E7EA",
                }}
              >
                <LeftDrawer setDraggedEvent={setDraggedEvent} />
              </Sider>
            )}
            <Layout style={{ backgroundColor: "transparent" }}>
              <Header
                style={{
                  height: "auto",
                  backgroundColor: "transparent",
                  paddingRight: 10,
                  paddingLeft: 10,
                }}
              >
                <Row justify="space-between" align="middle">
                  <Row align="middle">
                    {isDrawerClosed && (
                      
                      <ButtonToggleND
                        toggleDrawer={toggleVisibility}
                        visibility={!visible}
                      />
                    )}
                    <Text
                      style={{ fontSize: 30, color: "#464646", marginLeft: 10 }}
                    >
                      Horario
                    </Text>
                  </Row>
                  <DegreeForm />
                </Row>
              </Header>
              <Content style={{ overflowX: "scroll" }}>
                <SchedulerCard draggedEvent={draggedEvent} />
              </Content>
            </Layout>
          </Layout>
        </SelectedDegreeContextWrapper>
      </DegreePropertiesContextWrapper>
    </DegreeSubjectsContextWrapper>
  );
};
