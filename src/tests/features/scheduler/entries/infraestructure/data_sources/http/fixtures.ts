import AvailableHoursParamsDTO from "../../../../../../../features/scheduler/degrees/infraestructure/dto/AvailableHoursParamsDTO";
import EntryDTO from "../../../../../../../features/scheduler/entries/infraestructure/dto/EntryDTO";

const DegreeParams: AvailableHoursParamsDTO = {
  titulacion: "Verificación y validación",
  curso: 1,
  grupo: 2,
};

const postEntriesBody: EntryDTO[] = [
  {
    kind: 2,
    subject: "Verificación y validación",
    semana: "A",
    room: "23",
    initMin: 50,
    initHour: 8,
    grupo: "Tardes",
    endMin: 40,
    endHour: 9,
  },
];

export const fixtures = {
  postEntriesBody,
  DegreeParams,
};
