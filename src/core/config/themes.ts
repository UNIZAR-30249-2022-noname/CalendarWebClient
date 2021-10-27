import { CSSProperties } from "react";

const lightMode: CSSProperties = {
  backgroundColor: "#E1E2E3",
  color: "#585858",
};

const darkmode: CSSProperties = {
  backgroundColor: "#D6D6D6",
  color: "#585858",
};

const AppTheme = {
  getTheme: () => {
    let theme = localStorage.getItem("theme") ?? "Light";
    return theme === "Light" ? lightMode : darkmode;
  },
};

//NOTE: DarkMode anyadiendo variable a React Context
export { AppTheme };
