import { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { session } from "../../features/auth/domain/services/session";
import { AppTheme } from "../config/themes";
import { DrawerContext, ThemeContext, UserContext } from "../context/context";
import { routerManager } from "./user-control/router-manager";

export const RoutesApp = () => {
  const [user, setUser] = useState(session.getUser());
  const [theme, setTheme] = useState(AppTheme.getTheme());
  const [visibleDrawer, setvisibleDrawer] = useState(false);

  useEffect(() => {
    setUser(session.getUser());
    setTheme(AppTheme.getTheme());
  }, []);

  return (
    <UserContext.Provider value={user}>
      <ThemeContext.Provider value={theme}>
        <DrawerContext.Provider
          value={{
            visibleDrawer: visibleDrawer,
            setVisibleDrawer: setvisibleDrawer,
          }}
        >
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
                        <route.layout
                          {...props}
                          theme={theme}
                          path={route.path}
                        >
                          <route.component
                            {...props}
                            user={user}
                            theme={theme}
                          />
                        </route.layout>
                      );
                    }}
                  />
                );
              })}
            </Switch>
          </BrowserRouter>
        </DrawerContext.Provider>
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
};
