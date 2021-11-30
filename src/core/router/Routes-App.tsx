import { CSSProperties } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import User from "../../features/auth/domain/models/User";
import { routerManager } from "./user-control/router-manager";

type Props = {
  user: User;
  theme: CSSProperties;
};

export const RoutesApp = ({ user, theme }: Props) => {
  return (
    <BrowserRouter>
      <Switch>
        {routerManager(user).map((route, index) => {
          return (
            <Route
              exact={route.exact}
              path={route.path}
              key={index}
              component={(props: any) => {
                return (
                  <route.layout {...props} theme={theme} path={route.path}>
                    <route.component {...props} user={user} theme={theme} />
                  </route.layout>
                );
              }}
            />
          );
        })}
      </Switch>
    </BrowserRouter>
  );
};
