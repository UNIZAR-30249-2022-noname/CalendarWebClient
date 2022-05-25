import { Result } from "../../../../../../core/config/result";
import { SubjectAvailableHours } from "../../../../../../features/scheduler/degrees/domain/models/SubjectAvailableHours";
import DegreeProperties, {
  YearProperties,
} from "../../../../../../features/scheduler/degrees/domain/models/SubjectDegrees";
import AvailableHoursParamsDTO from "../../../../../../features/scheduler/degrees/infraestructure/dto/AvailableHoursParamsDTO";

const DegreeParams: AvailableHoursParamsDTO = {
  degree: "Verificación y validación",
  year: 1,
  group: "Mañanas",
};

const getAvailableHours: Result<SubjectAvailableHours[]> = {
  isError: false,
  value: [
    {
      
      subject: "Verificación y validación",
      theory: {
        remaining: 10,
        total: 20,
      },
      exercises: {
        remaining: 10,
        total: 20,
      },
      practice: {
        remaining: 10,
        total: 20,
      },
    },

  ],
};

const createYearsList = () => {
  let years = new Map<string, YearProperties[]>();
  years.set("Verificación y validación", [
    { name: 1, groups: ["mañana", "tarde"] },
  ]);

  return years;
};

const getDegreeProperties: Result<DegreeProperties> = {
  isError: false,
  value: {
    list: ["Verificación y validación"],
    properties: createYearsList(),
  },
};

const getAvailableHoursError: Result<SubjectAvailableHours[]> = {
  isError: true,
  error: Error("available hours error"),
};

const getDegreePropertiesError: Result<SubjectAvailableHours[]> = {
  isError: true,
  error: Error("degrees error"),
};

export const fixtures = {
  getAvailableHours,
  getAvailableHoursError,
  DegreeParams,
  getDegreePropertiesError,
  getDegreeProperties,
};
