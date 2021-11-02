import { Row, Space, Col, Layout, Card, notification } from "antd";
import Text from "antd/lib/typography/Text";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import SubjectAvailableHours from "../../../features/scheduler/available-hours/domain/models/SubjectAvailableHours";
import { degreeAvailableHoursService } from "../../../features/scheduler/available-hours/domain/services/AvailableHours.service";

import { DegreesSelector } from "../../../features/scheduler/available-hours/presentation/components/DegreesSelector";
import { GroupSelector } from "../../../features/scheduler/available-hours/presentation/components/GroupSelector";
import { SearchDegreeInfo } from "../../../features/scheduler/available-hours/presentation/components/SearchDegreeInfo";
import { YearSelector } from "../../../features/scheduler/available-hours/presentation/components/YearSelector";
import { leftDrawerContext } from "../../context/leftDrawerContext";
import { LeftDrawer } from "../../../features/scheduler/available-hours/presentation/components/LeftDrawer";
import { ButtonToggleND } from "../components/notes-drawer/ButtonToggleND";

export const Scheduler = () => {
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

  useEffect(() => {
    loadDegreeInfo();
    fetchDegrees();
    fetchDegreeInfo();
  }, []);

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
    // let degreeInfoRes: Result<SubjectAvailableHours[]> = {
    //   isError: false,
    //   value: [
    //     {
    //       subject: "Verificación y validación",
    //       kind: 2,
    //       hours: {
    //         remaining: 3,
    //         total: 5,
    //       },
    //     },
    //     {
    //       subject: "Arquitectura de computadores",
    //       kind: 2,
    //       hours: {
    //         remaining: 1,
    //         total: 5,
    //       },
    //     },
    //     {
    //       subject: "Teoría de la computación",
    //       kind: 2,
    //       hours: {
    //         remaining: 4,
    //         total: 5,
    //       },
    //     },
    //   ],
    // };
    if (degreeInfoRes.isError) {
      setLoaded(true);
      notification.destroy();
      notification.open({
        placement: "bottomLeft",
        duration: 5,
        type: "error",
        message: "Error",
        description: "Error al cargar la información",
        style: { padding: 10 },
      });
      return;
    }
    setDegreeInfo({ name: degree, subjects: degreeInfoRes.value });
    setLoaded(true);
  };

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
            <Col flex={1}>
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
          <Card style={{ height: "100%", width: "100%" }}>horario :3</Card>
        </Row>
      </Col>
    </Layout>
  );
};
