import Text from "antd/lib/typography/Text";
import { Redirect } from "react-router-dom";
import { ProfessorLayout } from "../presentation/layouts/ProfessorLayout";
import { CalendarPage } from "../presentation/pages/CalendarPage";
import { DataPage } from "../presentation/pages/DataPage";
import { SchedulerPage } from "../presentation/pages/SchedulerPage";
import RouteType from "./models/RouteType";

const index: RouteType = {
  path: "/",
  exact: true,
  layout: ProfessorLayout,
  component: () => <Redirect to="/scheduler" />,
};

const scheduler: RouteType = {
  name: "Horario",
  path: "/scheduler",
  layout: ProfessorLayout,
  component: SchedulerPage,
};

const calendar: RouteType = {
  name: "Calendario",
  path: "/calendar",
  layout: ProfessorLayout,
  component: CalendarPage,
};

const data: RouteType = {
  name: "Datos",
  path: "/data",
  layout: ProfessorLayout,
  component: DataPage,
};

const error: RouteType = {
  path: "",
  layout: () => <div></div>,
  component: () => (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text type="danger" strong>
        ERROR
      </Text>
    </div>
  ),
};

export const routes = { index, scheduler, calendar, data, error };
