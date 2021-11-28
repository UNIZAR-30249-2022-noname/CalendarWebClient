import { Result } from "../../../../../../core/config/result";
import { SubjectAvailableHours } from "../../../../../../features/scheduler/degrees/domain/models/SubjectAvailableHours";
import DegreeProperties, {
  YearProperties,
} from "../../../../../../features/scheduler/degrees/domain/models/SubjectDegrees";
import AvailableHoursParamsDTO from "../../../../../../features/scheduler/degrees/infraestructure/dto/AvailableHoursParamsDTO";
import DegreePropertiesDTO from "../../../../../../features/scheduler/degrees/infraestructure/dto/DegreePropertiesDTO";
import SubjectAvailableHoursDTO from "../../../../../../features/scheduler/degrees/infraestructure/dto/SubjectAvailableHoursDTO";

const DegreeParams: AvailableHoursParamsDTO = {
  titulacion: "Verificación y validación",
  curso: 1,
  grupo: 2,
};

const getAvailableHoursDTO: Result<SubjectAvailableHoursDTO[]> = {
  isError: false,
  value: [
    {
      Kind: 2,
      Subject: "Verificación y validación",
      Remaining: 10,
      Max: 20,
    },
    {
      Kind: 1,
      Subject: "Introducción a computadores",
      Remaining: 23,
      Max: 60,
    },
  ],
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

const getAvailableHoursError: Result<SubjectAvailableHoursDTO[]> = {
  isError: true,
  error: Error("available hours error"),
};

const createYearsList = () => {
  let years = new Map<string, YearProperties[]>();
  years.set("Verificación y validación", [
    { name: 1, groups: ["mañana", "tarde"] },
  ]);

  return years;
};

const getDegreePropertiesDTO: Result<DegreePropertiesDTO[]> = {
  isError: false,
  value: [
    {
      name: "Verificación y validación",
      years: [
        {
          groups: ["Mañanas", "Tardes", "Único"],
          name: 1,
        },
      ],
    },
  ],
};

const getDegreeProperties: Result<DegreeProperties> = {
  isError: false,
  value: {
    list: ["Verificación y validación"],
    properties: createYearsList(),
  },
};

const getDegreePropertiesError: Result<SubjectAvailableHours[]> = {
  isError: true,
  error: Error("degrees error"),
};

export const fixtures = {
  getAvailableHours,
  getAvailableHoursDTO,
  getAvailableHoursError,
  DegreeParams,
  getDegreeProperties,
  getDegreePropertiesDTO,
  getDegreePropertiesError,
};
