import RouteType from "../models/RouteType";
import { routes } from "../routes";

export const userControlRoutes = {
  defaultRoutes: (): RouteType[] => {
    return [
      routes.index,
      routes.scheduler,
      routes.calendar,
      routes.data,
      routes.book,
      routes.issues,
      routes.map,
      routes.login,
      routes.error,
     
    ];
  },
  professorRoutes: (): RouteType[] => {
    return [
      routes.index,
      routes.scheduler,
      routes.calendar,
      routes.data,
      routes.book,
      routes.issues,
      routes.map,
      routes.error,
     
    ];
  },
  coordinatorRoutes: (): RouteType[] => {
    return [routes.index, routes.error,];
  },
};
