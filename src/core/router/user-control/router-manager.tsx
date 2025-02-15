import User from "../../../features/auth/domain/models/User";
import { userControlRoutes } from "./user-control.routes";

export const routerManager = (user?: User) => {
  if (user) {
    switch (user.privileges) {
      case "coordinator":
        return userControlRoutes.coordinatorRoutes();
      case "janitor":
        return userControlRoutes.janitorRoutes();
      case "professor":
        return userControlRoutes.professorRoutes();
      case "logged":
        return userControlRoutes.loggedRoutes();

    }
  }
  return userControlRoutes.defaultRoutes();
};
