import { createContext } from "react";
import { session } from "../../features/auth/domain/services/session.service";
import { SubjectAvailableHours } from "../../features/scheduler/degrees/domain/models/SubjectAvailableHours";
import DegreeProperties from "../../features/scheduler/degrees/domain/models/SubjectDegrees";
import AvailableHoursParamsDTO from "../../features/scheduler/degrees/infraestructure/dto/AvailableHoursParamsDTO";
import { AppTheme } from "../config/themes";

const UserContext = createContext(session.getUser());
const ThemeContext = createContext(AppTheme.getTheme());
const NotesDrawerContext = createContext({
  visibleDrawer: false,
  setVisibleDrawer: Object(),
});

interface IContextDegreeSubjects {
  store: SubjectAvailableHours[] | undefined;
  actions: { setDegreeSubjects: (subject: SubjectAvailableHours[]) => void };
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

const SelectedDegreeContext = createContext({} as IContextSelectedDegree);

export {
  UserContext,
  ThemeContext,
  NotesDrawerContext,
  DegreeSubjectsContext,
  DegreeInfoContext,
  SelectedDegreeContext,
};
