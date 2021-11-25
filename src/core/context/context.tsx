import { createContext } from "react";
import { session } from "../../features/auth/domain/services/session.service";
import { AppTheme } from "../config/themes";

const UserContext = createContext(session.getUser());
const ThemeContext = createContext(AppTheme.getTheme());
const NotesDrawerContext = createContext({
  visibleDrawer: false,
  setVisibleDrawer: Object(),
});

export { UserContext, ThemeContext, NotesDrawerContext };
