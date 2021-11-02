import { Result } from "../../../../../../core/config/result";
import SubjectAvailableHours from "../../../../../../features/scheduler/degrees/domain/models/SubjectAvailableHours";
import AvailableHoursParamsDTO from "../../../../../../features/scheduler/degrees/infraestructure/dto/AvailableHoursParamsDTO";
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
      kind: 2,
      subject: "Verificación y validación",
      remaining: 10,
      max: 20,
    },
    {
      kind: 1,
      subject: "Introducción a computadores",
      remaining: 23,
      max: 60,
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

export const fixtures = {
  getAvailableHours,
  getAvailableHoursDTO,
  getAvailableHoursError,
  DegreeParams,
};
