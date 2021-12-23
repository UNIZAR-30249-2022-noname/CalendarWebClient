import {
  SubjectKind,
  Week,
  WeekDay,
} from "../../../../../../src/features/scheduler/entries/domain/models/Entry";
import EntryDTO from "../../../../../../src/features/scheduler/entries/infraestructure/dto/EntryDTO";

const fetchEntriesListDTO: EntryDTO[] = [
  {
    subject: "Verificación y validación",
    semana: Week.A,
    room: "A.32",
    kind: SubjectKind.theory,
    initHour: 8,
    initMin: 0,
    grupo: "2",
    endHour: 8,
    endMin: 50,
    weekday: WeekDay.MONDAY,
  },
  {
    subject: "Verificación y validación",
    semana: Week.B,
    room: "A.22",
    kind: SubjectKind.problems,
    initHour: 9,
    initMin: 0,
    grupo: "3",
    endHour: 9,
    endMin: 50,
    weekday: WeekDay.MONDAY,
  },
  {
    subject: "Ingeniería software",
    semana: Week.A,
    room: "A.32",
    kind: SubjectKind.theory,
    initHour: 8,
    initMin: 0,
    grupo: "4",
    endHour: 8,
    endMin: 50,
    weekday: WeekDay.TUESDAY,
  },
  {
    subject: "Gestión de proyecto software",
    semana: Week.B,
    room: "1.23",
    kind: SubjectKind.practices,
    initHour: 8,
    initMin: 0,
    grupo: "1",
    endHour: 9,
    endMin: 30,
    weekday: WeekDay.WEDNESDAY,
  },
];

const fetchEntriesListDTOD_Delete: EntryDTO[] = [
  {
    subject: "Verificación y validación",
    semana: Week.A,
    room: "A.32",
    kind: SubjectKind.theory,
    initHour: 7,
    initMin: 0,
    grupo: "2",
    endHour: 7,
    endMin: 50,
    weekday: WeekDay.MONDAY,
  },
  {
    subject: "Ingeniería del software",
    semana: Week.B,
    room: "A.22",
    kind: SubjectKind.problems,
    initHour: 8,
    initMin: 0,
    grupo: "3",
    endHour: 8,
    endMin: 50,
    weekday: WeekDay.MONDAY,
  },
];
export const fixtures1 = {
  fetchEntriesListDTO,
  fetchEntriesListDTOD_Delete,
};
