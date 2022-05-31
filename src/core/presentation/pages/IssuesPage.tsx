import { Button, message, Tabs } from "antd";
import { useEffect, useState } from "react";
import {
  CompletedIssue,
  CurrentIssue,
  Issue,
} from "../../../features/issues/domain/models/Issue";
import { IssueService } from "../../../features/issues/domain/service/Issues.services";
import DownloadReportButton from "../../../features/issues/presentation/components/DownloadReportButton";
import IssueTable from "../../../features/issues/presentation/components/IssueTable";
const { TabPane } = Tabs;

export const IssuesPage = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [newIssues, setNewIssues] = useState<Issue[]>([]);
  const [completedIssues, setCompletedIssues] = useState<Issue[]>([]);

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    loadFields();
  }, []);

  const loadFields = async () => {
    const key = "update";
    message.loading({ content: "Actualizando datos...", key });
    const lists = await IssueService.getAll();
    if (lists.isError) message.error("Error al obtener las inicidencias");
    else {
      await delay(500);
      message.success({ content: "Datos actualizados", key, duration: 1 });
      setNewIssues(lists.value.new);
      setIssues(lists.value.current);
      setCompletedIssues(lists.value.completed);
    }
  };

  const acceptIssue = async (issue: Issue) => {
    console.log("issue aceptada " + issue.title);
    const res = await IssueService.changeState(issue.key, CurrentIssue);
    if (res.isError) {
      message.error("Error al eliminar inicidencia");
    } else {
      if (res.value) {
        setIssues((state) => [...state, issue]);
        setNewIssues(newIssues.filter((value) => value.key != issue.key));
      } else {
        message.error("Error al eliminar inicidencia");
      }
    }
  };

  const completIssue = async (issue: Issue) => {
    console.log("issue completada " + issue.title);

    const res = await IssueService.changeState(issue.key, CompletedIssue);
    if (res.isError) {
      message.error("Error al completar la incidencia");
    } else {
      if (res.value) {
        setCompletedIssues((state) => [...state, issue]);
        setIssues(issues.filter((value) => value.key != issue.key));
      } else {
        message.error("Error al eliminar inicidencia");
      }
    }
  };

  const reopenIssue = async (issue: Issue) => {
    console.log("issue reabierto " + issue.title);

    const res = await IssueService.changeState(issue.key, CurrentIssue);
    if (res.isError) {
      message.error("Error al eliminar inicidencia");
    } else {
      if (res.value) {
        setIssues((state) => [...state, issue]);
        setCompletedIssues(
          completedIssues.filter((value) => value.key != issue.key)
        );
      } else {
        message.error("Error al eliminar inicidencia");
      }
    }
  };

  const cancelIssue = async (issue: Issue) => {
    console.log("issue cancelado " + issue.title);
    const res = await IssueService.delete(issue.key);
    if (res.isError) {
      message.error("Error al eliminar inicidencia");
    } else {
      if (res.value) {
        setIssues(issues.filter((value) => value.key != issue.key));
      } else {
        message.error("Error al eliminar inicidencia");
      }
    }
  };
  const cancelNewIssue = async (issue: Issue) => {
    console.log("issue cancelado " + issue.title);
    const res = await IssueService.delete(issue.key);
    if (res.isError) {
      message.error("Error al eliminar inicidencia");
    } else {
      if (res.value) {
        setNewIssues(newIssues.filter((value) => value.key != issue.key));
      } else {
        message.error("Error al eliminar inicidencia");
      }
    }
  };
  const cancelCompletedIssue = async (issue: Issue) => {
    console.log("issue cancelado " + issue.title);
    const res = await IssueService.delete(issue.key);
    if (res.isError) {
      message.error("Error al eliminar inicidencia");
    } else {
      if (res.value) {
        setCompletedIssues(
          completedIssues.filter((value) => value.key != issue.key)
        );
      } else {
        message.error("Error al eliminar inicidencia");
      }
    }
  };

  const contentTab1 = () => {
    return (
      <IssueTable
        issues={issues}
        deleteAction={cancelIssue}
        actionName="Completar"
        action={completIssue}
      />
    );
  };

  const contentTab2 = () => {
    return (
      <IssueTable
        issues={newIssues}
        deleteAction={cancelNewIssue}
        actionName="Aceptar"
        action={acceptIssue}
      />
    );
  };

  const contentTab3 = () => {
    return (
      <IssueTable
        issues={completedIssues}
        deleteAction={cancelCompletedIssue}
        actionName="Reabrir"
        action={reopenIssue}
      />
    );
  };

  return (
    <div style={{ marginLeft: "100px" }}>
      <Tabs
        defaultActiveKey="1"
        type="card"
        size={"small"}
        tabBarExtraContent={<DownloadReportButton />}
      >
        <TabPane tab="Actuales" key="1">
          {contentTab1()}
        </TabPane>
        <TabPane tab="Nuevas" key="2">
          {contentTab2()}
        </TabPane>
        <TabPane tab="Completadas" key="3">
          {contentTab3()}
        </TabPane>
      </Tabs>
    </div>
  );
};
