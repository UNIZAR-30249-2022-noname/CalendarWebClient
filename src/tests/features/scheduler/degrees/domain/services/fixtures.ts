import { Result } from "../../../../../../core/config/result";
import { SubjectAvailableHours } from "../../../../../../features/scheduler/degrees/domain/models/SubjectAvailableHours";
import DegreeProperties, {
  YearProperties,
} from "../../../../../../features/scheduler/degrees/domain/models/SubjectDegrees";
import AvailableHoursParamsDTO from "../../../../../../features/scheduler/degrees/infraestructure/dto/AvailableHoursParamsDTO";

const DegreeParams: AvailableHoursParamsDTO = {
  titulacion: "Verificación y validación",
  curso: 1,
  grupo: "Mañanas",
};

const getAvailableHours: Result<SubjectAvailableHours[]> = {
  isError: false,
  value: [
    {
      kind: 2,
      subject: "Verificación y validación",
      hours: {
        remaining: 10,
        total: 20,
      },
    },
    {
      kind: 1,
      subject: "Introducción a computadores",
      hours: {
        remaining: 23,
        total: 60,
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
