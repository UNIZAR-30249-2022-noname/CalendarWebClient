import RouteType from "../models/RouteType";
import { routes } from "../routes";

export const userControlRoutes = {
  defaultRoutes: (): RouteType[] => {
    return [
      routes.index,
      routes.scheduler,
      routes.map,
      routes.login,
      routes.slots,
      routes.infoSlot,
      routes.error,
    ];
  },
  professorRoutes: (): RouteType[] => {
    return [
      routes.index,
      routes.scheduler,
      routes.reserve,
      routes.slots,
      routes.map,
      routes.infoSlot,
      routes.crateIssue,
      routes.error,
    ];
  },
  coordinatorRoutes: (): RouteType[] => {
    return [
      routes.index,
      routes.scheduler,
      routes.reserve,
      routes.data,
      routes.slots,
      routes.map,
      routes.infoSlot,
      routes.crateIssue,
      routes.error,
    ];
  },

  janitorRoutes: (): RouteType[] => {
    return [
      routes.index,
      routes.scheduler,
      routes.reserve,
      routes.data,
      routes.slots,
      routes.issues,
      routes.map,
      routes.infoSlot,
      routes.crateIssue,
      routes.error,
    ];
  },

  loggedRoutes: (): RouteType[] => {
    return [
      routes.index,
      routes.scheduler,
      routes.slots,
      routes.map,
      routes.infoSlot,
      routes.crateIssue,
      routes.error,
    ];
  },
};
