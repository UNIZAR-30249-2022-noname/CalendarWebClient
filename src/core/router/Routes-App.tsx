import { CSSProperties } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import User from "../../features/auth/domain/models/User";
import { routerManager } from "./user-control/router-manager";

type Props = {
  user: User;
  theme: CSSProperties;
};

export const RoutesApp = (propsMain: Props) => {
  return (
    <BrowserRouter>
      <Switch>
        {routerManager(propsMain.user).map((route, index) => {
          return (
            <Route
              exact={route.exact}
              path={route.path}
              key={index}
              component={(props: any) => {
                return (
                  <route.layout
                    {...props}
                    theme={propsMain.theme}
                    path={route.path}
                  >
                    <route.component
                      {...props}
                      user={propsMain.user}
                      theme={propsMain.theme}
                    />
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
