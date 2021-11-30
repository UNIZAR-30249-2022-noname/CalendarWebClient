import AvailableHoursParamsDTO from "../../../../../../src/features/scheduler/degrees/infraestructure/dto/AvailableHoursParamsDTO";
import SubjectAvailableHoursDTO from "../../../../../../src/features/scheduler/degrees/infraestructure/dto/SubjectAvailableHoursDTO";
import DegreePropertiesDTO from "../../../../../../src/features/scheduler/degrees/infraestructure/dto/DegreePropertiesDTO";
import { SubjectKind } from "../../../../../../src/features/scheduler/entries/domain/models/Entry";
const Params: AvailableHoursParamsDTO = {
  titulacion: "Ingeniería informática",
  curso: 1,
  grupo: "Mañanas",
};

const Params2: AvailableHoursParamsDTO = {
  titulacion: "Arquitectura",
  curso: 1,
  grupo: "Mañanas",
};

const ResponseGood: SubjectAvailableHoursDTO[] = [
  {
    Subject: "Verificación y validación",
    Kind: SubjectKind.theory,
    Remaining: 4,
    Max: 4,
  },
  {
    Subject: "Arquitectura sotfware",
    Kind: SubjectKind.problems,
    Remaining: 2,
    Max: 4,
  },
  {
    Subject: "Matemáticas 2",
    Kind: SubjectKind.practices,
    Remaining: 3,
    Max: 4,
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
