import RouteType from "../models/RouteType";
import { routes } from "../routes";

export const userControlRoutes = {
  defaultRoutes: (): RouteType[] => {
    return [
      routes.index,
      routes.scheduler,
      routes.reserve,
      routes.map,
      routes.login,
      routes.slots,
      routes.infoSlot,
      routes.crateIssue,
      routes.error,
     
    ];
  },
  professorRoutes: (): RouteType[] => {
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
  coordinatorRoutes: (): RouteType[] => {
    return [routes.index, routes.error,];
  },
};
