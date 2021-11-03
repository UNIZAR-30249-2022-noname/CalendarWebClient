import AvailableHoursParamsDTO from "../../../../../../../features/scheduler/degrees/infraestructure/dto/AvailableHoursParamsDTO";
import SubjectAvailableHoursDTO from "../../../../../../../features/scheduler/degrees/infraestructure/dto/SubjectAvailableHoursDTO";

const DegreeParams: AvailableHoursParamsDTO = {
  titulacion: "Verificación y validación",
  curso: 1,
  grupo: 2,
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

export const fixtures = {
  getAvailableHours,
  DegreeParams,
};
