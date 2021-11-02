import { Result } from "../../../../../../core/config/result";
import SubjectAvailableHours from "../../../../../../features/scheduler/available-hours/domain/models/SubjectAvailableHours";
import AvailableHoursParamsDTO from "../../../../../../features/scheduler/available-hours/infraestructure/dto/AvailableHoursParamsDTO";

const DegreeParams: AvailableHoursParamsDTO = {
  titulacion: "Verificación y validación",
  curso: 1,
  grupo: 2,
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

const getAvailableHoursError: Result<SubjectAvailableHours[]> = {
  isError: true,
  error: Error("available hours error"),
};

export const fixtures = {
  getAvailableHours,
  getAvailableHoursError,
  DegreeParams,
};
