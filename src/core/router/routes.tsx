import Text from "antd/lib/typography/Text";
import { Redirect } from "react-router-dom";
import { EmptyLayout } from "../presentation/layouts/EmptyLayout ";
import { ProfessorLayout } from "../presentation/layouts/ProfessorLayout";
import { SlotsPage } from "../presentation/pages/SlotsPage";
import { ReservePage } from "../presentation/pages/ReservePage";
import { DataPage } from "../presentation/pages/DataPage";
import { IssuesPage } from "../presentation/pages/IssuesPage";
import { LoginPage } from "../presentation/pages/LoginPage";
import { MapPage } from "../presentation/pages/MapPage";

import { SchedulerPage } from "../presentation/pages/SchedulerPage";
import RouteType from "./models/RouteType";
import { InfoSlotPage } from "../presentation/pages/InfoSlotsPage";
import { CreateIssuePage } from "../presentation/pages/CreateIssuePage";

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

const reserve: RouteType = {
  name: "Reservas",
  path: "/reserve",
  layout: ProfessorLayout,
  component: ReservePage,
};

const data: RouteType = {
  name: "Datos",
  path: "/data",
  layout: ProfessorLayout,
  component: DataPage,
};

const issues: RouteType = {
  name: "Incidencias",
  path: "/issues",
  layout: ProfessorLayout,
  component: IssuesPage,
};
const slots: RouteType = {
  name: "Espacios",
  path: "/slots",
  layout: ProfessorLayout,
  component: SlotsPage,
};


const map: RouteType = {
  name: "Mapa",
  path: "/map",
  layout: ProfessorLayout,
  component: MapPage,
};

const infoSlot: RouteType = {
  path: "/infoSlot",
  layout: ProfessorLayout,
  component: InfoSlotPage,
};

const crateIssue: RouteType = {
  path: "/createIssue",
  layout: ProfessorLayout,
  component: CreateIssuePage,
};


const login: RouteType = {
  path: "/login",
layout: EmptyLayout,
  component: LoginPage
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

export const routes = { index, scheduler, reserve, data, error, issues,map, slots,login ,infoSlot, crateIssue};
