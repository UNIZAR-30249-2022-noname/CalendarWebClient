import AvailableHoursParamsDTO from "../../../../../../../features/scheduler/degrees/infraestructure/dto/AvailableHoursParamsDTO";
import DegreePropertiesDTO from "../../../../../../../features/scheduler/degrees/infraestructure/dto/DegreePropertiesDTO";
import SubjectAvailableHoursDTO from "../../../../../../../features/scheduler/degrees/infraestructure/dto/SubjectAvailableHoursDTO";

const DegreeParams: AvailableHoursParamsDTO = {
  degree: "Verificación y validación",
  year: 1,
  group: "Mañanas",
};

const getAvailableHours: SubjectAvailableHoursDTO[] = [
  {

    Subject: {Name:"Verificación y validación",Kind:2},
    RemainingHours: 10,
    MaxHours: 20,
    MaxMin:0,
    RemainingMin:0
  },
  {

    Subject: {Name:"Programación 1",Kind:1},
    RemainingHours: 10,
    MaxHours: 20,
    MaxMin:0,
    RemainingMin:0
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
