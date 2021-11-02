import { useEffect, useState } from "react";
import { session } from "../../features/auth/domain/services/session";
import { AppTheme } from "../config/themes";
import { ThemeContext, UserContext } from "../context/context";
import { RoutesApp } from "../router/Routes-App";

export const AppWrapper = () => {
  const [user, setUser] = useState(session.getUser());
  const [theme, setTheme] = useState(AppTheme.getTheme());

  useEffect(() => {
    setUser(session.getUser());
    setTheme(AppTheme.getTheme());
  }, []);

  return (
    <UserContext.Provider value={user}>
      <ThemeContext.Provider value={theme}>
        <RoutesApp user={user} theme={theme} />
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
};
