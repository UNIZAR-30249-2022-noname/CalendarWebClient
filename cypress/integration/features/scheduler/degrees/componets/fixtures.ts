import AvailableHoursParamsDTO from "../../../../../../src/features/scheduler/degrees/infraestructure/dto/AvailableHoursParamsDTO";
import SubjectAvailableHoursDTO from "../../../../../../src/features/scheduler/degrees/infraestructure/dto/SubjectAvailableHoursDTO";
import DegreePropertiesDTO from "../../../../../../src/features/scheduler/degrees/infraestructure/dto/DegreePropertiesDTO";
import { SubjectKind } from "../../../../../../src/features/scheduler/entries/domain/models/Entry";
const Params: AvailableHoursParamsDTO = {
  degree: "Ingeniería informática",
  year: 1,
  group: "Mañanas",
};

const Params2: AvailableHoursParamsDTO = {
  degree: "Arquitectura",
  year: 1,
  group: "Mañanas",
};

const ResponseGood: SubjectAvailableHoursDTO[] = [
  {
    Subject: {
      Name: "Verificación y validación",
      Kind: SubjectKind.theory,
    },
    RemainingHours: 4,
    RemainingMin: 0,
    MaxHours: 4,
    MaxMin: 0,
  },
  {
    Subject: {
      Name: "Arquitectura sotfware",
      Kind: SubjectKind.problems,
    },
    RemainingHours: 2,
    RemainingMin: 0,
    MaxHours: 4,
    MaxMin: 0,
  },
  {
    Subject: {
      Name: "Matemáticas 2",
      Kind: SubjectKind.problems,
    },
    RemainingHours: 3,
    RemainingMin: 0,
    MaxHours: 4,
    MaxMin: 0,
  },
];

const ResponseDegreesGood: DegreePropertiesDTO[] = [
  {
    name: "Ingeniería informática",
    years: [
      {
        groups: ["Mañanas", "Tardes"],
        name: 1,
      },
      {
        groups: ["Mañanas", "Tardes"],
        name: 2,
      },
    ],
  },
  {
    name: "Arquitectura",
    years: [
      {
        groups: ["Mañanas", "Tardes"],
        name: 1,
      },
      {
        groups: ["Mañanas", "Tardes"],
        name: 2,
      },
    ],
  },
];

export const fixtures = {
  ResponseGood,
  Params,
  Params2,
  ResponseDegreesGood,
};
