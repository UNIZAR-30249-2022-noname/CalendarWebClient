/* eslint-disable react-hooks/exhaustive-deps */
import { Row, Space, Col, Layout, Card } from "antd";
import { lazy, Suspense, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { leftDrawerContext } from "../../context/leftDrawerContext";
import DegreeForm from "../../../features/scheduler/degrees/presentation/components/DegreeForm";
import { ButtonToggleND } from "../components/notes-drawer/ButtonToggleND";
import Text from "antd/lib/typography/Text";
import { DegreeSubjectsContextWrapper } from "../../context/DegreeSubjectsContext";
import { DegreePropertiesContextWrapper } from "../../context/DegreePropertiesContextWrapper";
import { SelectedDegreeContextWrapper } from "../../context/DegreeSelectedContext";

const LazyLeftDrawer = lazy(
  () =>
    import(
      "../../../features/scheduler/degrees/presentation/components/LeftDrawer"
    )
);

const LazySchedulerCard = lazy(
  () =>
    import(
      "../../../features/scheduler/entries/presentation/components/SchedulerCard"
    )
);

export const SchedulerPage = () => {
  const isDrawerClosed = useMediaQuery({ query: "(min-width: 600px)" });
  const [visible, setvisible] = useState(leftDrawerContext.getVisibility());
  const [draggedEvent, setDraggedEvent] = useState(null);

  const toggleVisibility = () => {
    setvisible(!visible);
    leftDrawerContext.setVisibility(!visible);
  };

  return (
    <DegreeSubjectsContextWrapper>
      <DegreePropertiesContextWrapper>
        <SelectedDegreeContextWrapper>
          <Suspense fallback="Cargando...">
            <Layout style={{ height: "100%", backgroundColor: "transparent" }}>
              {isDrawerClosed && (
                <Layout.Sider
                  theme="light"
                  collapsed={visible}
                  collapsedWidth={0}
                  width={225}
                  trigger={null}
                  style={{
                    height: "100%",
                    borderRight: "2px solid #1890FF",
                  }}
                >
                  <LazyLeftDrawer setDraggedEvent={setDraggedEvent} />
                </Layout.Sider>
              )}
              <Col flex="auto" style={{ padding: 15 }}>
                <Row justify="space-between">
                  <Col>
                    <Space align="center">
                      {isDrawerClosed && (
                        <ButtonToggleND
                          toggleDrawer={toggleVisibility}
                          visibility={!visible}
                        />
                      )}
                      <Text style={{ fontSize: 30, color: "#464646" }}>
                        Horario
                      </Text>
                    </Space>
                  </Col>
                  <Col>
                    <DegreeForm />
                  </Col>
                </Row>
                <Row>
                  <Card style={{ height: "100%", width: "100%" }}>
                    <LazySchedulerCard draggedEvent={draggedEvent} />
                  </Card>
                </Row>
              </Col>
            </Layout>
          </Suspense>
        </SelectedDegreeContextWrapper>
      </DegreePropertiesContextWrapper>
    </DegreeSubjectsContextWrapper>
  );
};
