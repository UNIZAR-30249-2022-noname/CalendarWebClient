import { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { session } from "../../features/auth/domain/services/session";
import { AppTheme } from "../config/themes";
import { ThemeContext, UserContext } from "../context/userContext";
import { routerManager } from "./user-control/router-manager";

export const RoutesApp = () => {
  const [user, setUser] = useState(session.getUser());
  const [theme, setTheme] = useState(AppTheme.getTheme());

  useEffect(() => {
    setUser(session.getUser());
    setTheme(AppTheme.getTheme());
  }, []);

  return (
    <UserContext.Provider value={user}>
      <ThemeContext.Provider value={theme}>
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
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
};
