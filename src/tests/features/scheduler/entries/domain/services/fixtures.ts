import { Result } from "../../../../../../core/config/result";
import Entry, {
  Week,
} from "../../../../../../features/scheduler/entries/domain/models/Entry";

const postNewEntries: Result<boolean> = {
  isError: false,
  value: true,
};

const entriesBody: Entry[] = [
  {
    subject: "Ingeniería de requisitos",
    week: Week.A,
    room: "234-de",
    kind: 1,
    group: "Mañanas",
    initTime: {
      hour: 20,
      min: 12,
    },
    endTime: {
      hour: 21,
      min: 30,
    },
  },
  {
    subject: "Gestión de proyecto software",
    week: Week.B,
    room: "22-e",
    kind: 0,
    group: "Tardes",
    initTime: {
      hour: 12,
      min: 0,
    },
    endTime: {
      hour: 13,
      min: 0,
    },
  },
];

const postNewEntriesError: Result<Entry[]> = {
  isError: true,
  error: Error(),
};

export const fixtures = {
  postNewEntries,
  entriesBody,
  postNewEntriesError,
};
