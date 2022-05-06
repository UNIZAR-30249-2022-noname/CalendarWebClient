import { CSSProperties, useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import User from "../../features/auth/domain/models/User";
import { UserContext } from "../context/context";
import { routerManager } from "./user-control/router-manager";

type Props = {
  theme: CSSProperties;
};

export const RoutesApp = ({  theme }: Props) => {
  const contextUser = useContext(UserContext);
  return (
    <BrowserRouter>
      <Switch>
        {routerManager(contextUser.usr).map((route, index) => {
          return (
            <Route
              exact={route.exact}
              path={route.path}
              key={index}
              component={(props: any) => {
                return (
                  <route.layout {...props} theme={theme} path={route.path}>
                    <route.component {...props} user={contextUser.usr} theme={theme} />
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
