import RouteType from "../models/RouteType";
import { routes } from "../routes";

export const userControlRoutes = {
  defaultRoutes: (): RouteType[] => {
    return [
      routes.index,
      routes.scheduler,
      routes.calendar,
      routes.data,
      routes.error,
    ];
  },
  professorRoutes: (): RouteType[] => {
    return [
      routes.index,
      routes.scheduler,
      routes.calendar,
      routes.data,
      routes.error,
    ];
  },
  coordinatorRoutes: (): RouteType[] => {
    return [routes.index, routes.error];
  },
};
