import AvailableHoursParamsDTO from "../../../../../../../features/scheduler/degrees/infraestructure/dto/AvailableHoursParamsDTO";
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

const getListEntriesParams: AvailableHoursParamsDTO = {
  degree: "Arquitectura",
  year: 3,
  group: "A34",
};

const getListEntries: EntryDTO[] = [
  {
    kind: SubjectKind.practices,
    subject: "Verificación y validación",
    semana: Week.B,
    room: "23",
    initMin: 50,
    initHour: 8,
    grupo: "Tardes",
    endMin: 40,
    endHour: 9,
    weekday: WeekDay.MONDAY,
  },
  {
    kind: SubjectKind.practices,
    subject: "Informática 2",
    semana: Week.A,
    room: "23",
    initMin: 50,
    initHour: 8,
    grupo: "Tardes",
    endMin: 40,
    endHour: 9,
    weekday: WeekDay.WEDNESDAY,
  },
  {
    kind: SubjectKind.practices,
    subject: "Matemáticas 2",
    semana: Week.B,
    room: "1.34",
    initMin: 40,
    initHour: 8,
    grupo: "Tardes",
    endMin: 40,
    endHour: 9,
    weekday: WeekDay.THURSDAY,
  },
];

export const fixtures = {
  postEntriesBody,
  getListEntries,
  getListEntriesParams,
};
