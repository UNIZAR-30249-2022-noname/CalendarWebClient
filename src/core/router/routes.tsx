import Text from "antd/lib/typography/Text";
import { Redirect } from "react-router-dom";
import { ProfessorLayout } from "../presentation/layouts/ProfessorLayout";
import { Calendar } from "../presentation/pages/CalendarPage";
import { Data } from "../presentation/pages/DataPage";
import { Scheduler } from "../presentation/pages/SchedulerPage";
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
  component: Scheduler,
};

const calendar: RouteType = {
  name: "Calendario",
  path: "/calendar",
  layout: ProfessorLayout,
  component: Calendar,
};

const data: RouteType = {
  name: "Datos",
  path: "/data",
  layout: ProfessorLayout,
  component: Data,
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
