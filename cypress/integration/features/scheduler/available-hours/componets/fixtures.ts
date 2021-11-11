import AvailableHoursParamsDTO from "../../../../../../src/features/scheduler/degrees/infraestructure/dto/AvailableHoursParamsDTO";
import SubjectAvailableHoursDTO from "../../../../../../src/features/scheduler/degrees/infraestructure/dto/SubjectAvailableHoursDTO";

const Params: AvailableHoursParamsDTO = {
  titulacion: "Ingeniería informática",
  curso: 1,
  grupo: 1,
};

const Params2: AvailableHoursParamsDTO = {
  titulacion: "Arquitectura",
  curso: 2,
  grupo: 1,
};

const ResponseGood: SubjectAvailableHoursDTO[] = [
  {
    Subject: "Verificación y validación",
    Kind: 2,
    Remaining: 2,
    Max: 4,
  },
];

export const fixtures = {
  ResponseGood,
  Params,
  Params2,
};
