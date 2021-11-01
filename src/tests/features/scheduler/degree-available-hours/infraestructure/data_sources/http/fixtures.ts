import SubjectAvailableHoursDTO from "../../../../../../../features/scheduler/available-hours/infraestructure/dto/SubjectAvailableHoursDTO";

const getAvailableHours: SubjectAvailableHoursDTO[] = [
  {
    kind: 2,
    subject: "Verificación y validación",
    remaining: 10,
    total: 20,
  },
  {
    kind: 1,
    subject: "Introducción a computadores",
    remaining: 23,
    total: 60,
  },
];

export const fixtures = {
  getAvailableHours,
};
