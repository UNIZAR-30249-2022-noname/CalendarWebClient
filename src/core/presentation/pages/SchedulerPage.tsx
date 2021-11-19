/* eslint-disable react-hooks/exhaustive-deps */
import { Row, Space, Col, Layout, Card, notification } from "antd";
import Text from "antd/lib/typography/Text";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { SubjectAvailableHours } from "../../../features/scheduler/degrees/domain/models/SubjectAvailableHours";
import { degreeAvailableHoursService } from "../../../features/scheduler/degrees/domain/services/AvailableHours.service";

import { DegreesSelector } from "../../../features/scheduler/degrees/presentation/components/DegreesSelector";
import { GroupSelector } from "../../../features/scheduler/degrees/presentation/components/GroupSelector";
import { SearchDegreeInfo } from "../../../features/scheduler/degrees/presentation/components/SearchDegreeInfo";
import { YearSelector } from "../../../features/scheduler/degrees/presentation/components/YearSelector";
import { leftDrawerContext } from "../../context/leftDrawerContext";
import { LeftDrawer } from "../../../features/scheduler/degrees/presentation/components/LeftDrawer";
import { ButtonToggleND } from "../components/notes-drawer/ButtonToggleND";
import { notifications } from "../components/notifications/notifications";
import { SchedulerCard } from "../../../features/scheduler/entries/presentation/components/SchedulerCard";

export const SchedulerPage = () => {
  const isDrawerClosed = useMediaQuery({ query: "(min-width: 600px)" });
  const [visible, setvisible] = useState(leftDrawerContext.getVisibility());
  const [group, setGroup] = useState(1);
  const [year, setYear] = useState(1);
  const [degree, setDegree] = useState("Ingeniería informática");
  const [degreesList, setDegreeList] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(true);
  const [degreeInfo, setDegreeInfo] = useState<{
    name: string;
    subjects: SubjectAvailableHours[];
  }>({ name: "", subjects: [] });

  const loadDegreeInfo = () => {
    //TODO: load from localstorage
    // setDegree("Ingeniería informática");
    // setYear(2);
    // setGroup(1);
  };

  const fetchDegrees = async () => {
    //TODO: fetch degrees
    setDegreeList(["Arquitectura", "Ingenería informática", "Matemáticas"]);
  };

  const fetchDegreeInfo = async () => {
    //TODO: finish
    setLoaded(false);
    let degreeInfoRes =
      await degreeAvailableHoursService.getDegreeAvailableHours({
        titulacion: degree,
        curso: year,
        grupo: group,
      });
    if (degreeInfoRes.isError) {
      setLoaded(true);
      notifications.error(`Error al cargar los datos de ${degree}`);
      return;
    }
    setDegreeInfo({ name: degree, subjects: degreeInfoRes.value });
    setLoaded(true);
  };

  useEffect(() => {
    loadDegreeInfo();
    fetchDegrees();
    fetchDegreeInfo();
  }, []);

  const toggleVisibility = () => {
    setvisible(!visible);
    leftDrawerContext.setVisibility(!visible);
  };

  return (
    <Layout style={{ height: "100%", backgroundColor: "transparent" }}>
      {isDrawerClosed && (
        <Layout.Sider
          theme="light"
          collapsed={visible}
          collapsedWidth={0}
          trigger={null}
          style={{ height: "100%", borderRight: "2px solid #1890FF" }}
        >
          <LeftDrawer degreeInfo={degreeInfo} />
        </Layout.Sider>
      )}
      <Col flex="auto" style={{ padding: 15 }}>
        <Col>
          <Row
            align="middle"
            style={{
              height: "100%",
              width: "100%",
            }}
          >
            <Col flex={2}>
              <Space align="center">
                {isDrawerClosed && (
                  <ButtonToggleND
                    toggleDrawer={toggleVisibility}
                    visibility={!visible}
                  />
                )}
                <Text style={{ fontSize: 30, color: "#464646" }}>Horario</Text>
              </Space>
            </Col>
            <Col flex="auto" style={{ marginBottom: 10 }}>
              <Row gutter={[8, 8]}>
                <Col flex={3}>
                  <DegreesSelector
                    activeDegree={degree}
                    setActiveDegree={setDegree}
                    degreesList={degreesList}
                  />
                </Col>
                <Col flex={3}>
                  <YearSelector activeYear={year} setActiveYear={setYear} />
                </Col>
                <Col flex={3}>
                  <GroupSelector
                    activeGroup={group}
                    setActiveGroup={setGroup}
                  />
                </Col>
                <Col flex={1}>
                  <SearchDegreeInfo
                    loading={!loaded}
                    onClick={fetchDegreeInfo}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Row>
          <Card style={{ height: "100%", width: "100%" }}>
            <SchedulerCard />
          </Card>
        </Row>
      </Col>
    </Layout>
  );
};
