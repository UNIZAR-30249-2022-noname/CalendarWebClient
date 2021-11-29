import AvailableHoursParamsDTO from "../../../../../../../features/scheduler/degrees/infraestructure/dto/AvailableHoursParamsDTO";
import DegreePropertiesDTO from "../../../../../../../features/scheduler/degrees/infraestructure/dto/DegreePropertiesDTO";
import SubjectAvailableHoursDTO from "../../../../../../../features/scheduler/degrees/infraestructure/dto/SubjectAvailableHoursDTO";

const DegreeParams: AvailableHoursParamsDTO = {
  titulacion: "Verificación y validación",
  curso: 1,
  grupo: "Mañanas",
};

const getAvailableHours: SubjectAvailableHoursDTO[] = [
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
];

const listDegrees: DegreePropertiesDTO[] = [
  {
    name: "Verificación y validación",
    years: [
      {
        name: 1,
        groups: ["mañana", "tardes"],
      },
    ],
  },
];

export const fixtures = {
  getAvailableHours,
  DegreeParams,
  listDegrees,
};
