import { createContext } from "react";
import User from "../../features/auth/domain/models/User";
import { SubjectAvailableHours } from "../../features/scheduler/degrees/domain/models/SubjectAvailableHours";
import DegreeProperties from "../../features/scheduler/degrees/domain/models/SubjectDegrees";
import AvailableHoursParamsDTO from "../../features/scheduler/degrees/infraestructure/dto/AvailableHoursParamsDTO";
import { SubjectKind, Time } from "../../features/scheduler/entries/domain/models/Entry";
import { AppTheme } from "../config/themes";
import { DefaultUser } from "./UserContext";

const UserContext = createContext({} as IContextUser);
const ThemeContext = createContext(AppTheme.getTheme());
const NotesDrawerContext = createContext({
  visibleDrawer: false,
  setVisibleDrawer: Object(),
});

interface IContextDegreeSubjects {
  store: SubjectAvailableHours[] | undefined;
  actions: { 
    setDegreeSubjects: (subject: SubjectAvailableHours[]) => void 
    updateSubject:(subject: string, time: Time, kind: SubjectKind)=>void
  
  };
    
}

const DegreeSubjectsContext = createContext({} as IContextDegreeSubjects);

interface IContextDegreeProps {
  store: DegreeProperties;
  actions: { setDegreeProperties: (subject: DegreeProperties) => void };
}

const DegreeInfoContext = createContext({} as IContextDegreeProps);

interface IContextSelectedDegree {
  store: AvailableHoursParamsDTO;
  actions: { setSelectedDegree: (subject: AvailableHoursParamsDTO) => void };
}

interface IContextUser {
  usr: User;
  actions: { login: (usr: User) => void, logout: ()=> void  };
}



const SelectedDegreeContext = createContext({} as IContextSelectedDegree);

export {
  UserContext,
  ThemeContext,
  NotesDrawerContext,
  DegreeSubjectsContext,
  DegreeInfoContext,
  SelectedDegreeContext,
};
