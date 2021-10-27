import { createContext } from "react";
import { session } from "../../features/auth/domain/services/session";
import { AppTheme } from "../config/themes";

const UserContext = createContext(session.getUser());
const ThemeContext = createContext(AppTheme.getTheme());
const DrawerContext = createContext({
  visibleDrawer: false,
  setVisibleDrawer: Object(),
});

export { UserContext, ThemeContext, DrawerContext };
