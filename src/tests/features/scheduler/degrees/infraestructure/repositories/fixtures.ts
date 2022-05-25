import { Result } from "../../../../../../core/config/result";
import { SubjectAvailableHours } from "../../../../../../features/scheduler/degrees/domain/models/SubjectAvailableHours";
import DegreeProperties, {
  YearProperties,
} from "../../../../../../features/scheduler/degrees/domain/models/SubjectDegrees";
import AvailableHoursParamsDTO from "../../../../../../features/scheduler/degrees/infraestructure/dto/AvailableHoursParamsDTO";
import DegreePropertiesDTO from "../../../../../../features/scheduler/degrees/infraestructure/dto/DegreePropertiesDTO";
import SubjectAvailableHoursDTO from "../../../../../../features/scheduler/degrees/infraestructure/dto/SubjectAvailableHoursDTO";
import { SubjectKind } from "../../../../../../features/scheduler/entries/domain/models/Entry";

const DegreeParams: AvailableHoursParamsDTO = {
  degree: "Verificación y validación",
  year: 1,
  group: "Mañanas",
};

const getAvailableHoursDTO: Result<SubjectAvailableHoursDTO[]> = {
  isError: false,
  value: [
    {
      Subject: { Name: "Programación 1", Kind: SubjectKind.theory },
      RemainingHours: 10,
      MaxHours: 20,
      MaxMin: 0,
      RemainingMin: 0,
    },
    {
      Subject: { Name: "Programación 1", Kind: SubjectKind.practices },
      RemainingHours: 10,
      MaxHours: 20,
      MaxMin: 0,
      RemainingMin: 0,
    },
    {
      Subject: { Name: "Programación 1", Kind: SubjectKind.problems },
      RemainingHours: 10,
      MaxHours: 20,
      MaxMin: 0,
      RemainingMin: 0,
    },
  ],
};

const getAvailableHours: Result<SubjectAvailableHours[]> = {
  isError: false,
  value: [
    {
      
      subject: "Programación 1",
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

const getAvailableHoursError: Result<SubjectAvailableHoursDTO[]> = {
  isError: true,
  error: Error("available hours error"),
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
