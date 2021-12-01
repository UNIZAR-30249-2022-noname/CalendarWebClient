import {
  SubjectKind,
  Week,
  WeekDay,
} from "../../../../../../../features/scheduler/entries/domain/models/Entry";
import EntryDTO from "../../../../../../../features/scheduler/entries/infraestructure/dto/EntryDTO";

const postEntriesBody: EntryDTO[] = [
  {
    kind: SubjectKind.practices,
    subject: "Verificación y validación",
    semana: Week.A,
    room: "23",
    initMin: 50,
    initHour: 8,
    grupo: "Tardes",
    endMin: 40,
    endHour: 9,
    weekday: WeekDay.THURSDAY,
  },
];

export const fixtures = {
  postEntriesBody,
};
