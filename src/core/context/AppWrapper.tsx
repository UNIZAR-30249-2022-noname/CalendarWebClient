import { useEffect, useState } from "react";
import { AppTheme } from "../config/themes";
import { ThemeContext, UserContext } from "../context/context";
import { RoutesApp } from "../router/Routes-App";
import { UserContextWrapper } from "./UserContext";

export const AppWrapper = () => {
  const [theme, setTheme] = useState(AppTheme.getTheme());

  useEffect(() => {
    setTheme(AppTheme.getTheme());
  }, []);

  return (
    <UserContextWrapper >
      <ThemeContext.Provider value={theme}>
        <RoutesApp  theme={theme} />
      </ThemeContext.Provider>
    </UserContextWrapper>
  );
};
