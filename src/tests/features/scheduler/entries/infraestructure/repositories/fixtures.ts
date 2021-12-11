import { Result } from "../../../../../../core/config/result";
import AvailableHoursParamsDTO from "../../../../../../features/scheduler/degrees/infraestructure/dto/AvailableHoursParamsDTO";
import Entry, {
  SubjectKind,
  Week,
  WeekDay,
} from "../../../../../../features/scheduler/entries/domain/models/Entry";
import EntryDTO from "../../../../../../features/scheduler/entries/infraestructure/dto/EntryDTO";

const getListEntriesParams: AvailableHoursParamsDTO = {
  degree: "Arquitectura",
  year: 3,
  group: "A34",
};

const postEntriesBodyDTO: EntryDTO[] = [
  {
    kind: SubjectKind.theory,
    subject: "Verificación y validación",
    semana: "A",
    room: "23",
    initMin: 50,
    initHour: 8,
    grupo: "Tardes",
    endMin: 40,
    endHour: 9,
    weekday: WeekDay.FRIDAY,
  },
];

const postEntriesBody: Entry[] = [
  {
    kind: SubjectKind.theory,
    subject: "Verificación y validación",
    room: "23",
    weekDay: WeekDay.FRIDAY,
    initTime: {
      hour: 8,
      min: 50,
    },
    endTime: {
      hour: 9,
      min: 40,
    },
    group: "Tardes",
    week: Week.A,
  },
];

const resEntries: Result<true> = {
  isError: false,
  value: true,
};

const resGetEntriesDTO: Result<EntryDTO[]> = {
  isError: false,
  value: postEntriesBodyDTO,
};

const resGetEntries: Result<Entry[]> = {
  isError: false,
  value: postEntriesBody,
};

const resEntriesError: Result<boolean> = {
  isError: true,
  error: Error(),
};

export const fixtures = {
  postEntriesBodyDTO,
  postEntriesBody,
  resEntries,
  resEntriesError,
  getListEntriesParams,
  resGetEntries,
  resGetEntriesDTO,
};
