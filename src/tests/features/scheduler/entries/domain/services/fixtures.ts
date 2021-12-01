import { Result } from "../../../../../../core/config/result";
import AvailableHoursParamsDTO from "../../../../../../features/scheduler/degrees/infraestructure/dto/AvailableHoursParamsDTO";
import Entry, {
  Week,
  WeekDay,
} from "../../../../../../features/scheduler/entries/domain/models/Entry";

const postNewEntries: Result<boolean> = {
  isError: false,
  value: true,
};

const entriesBody: Result<Entry[]> = {
  isError: false,
  value: [
    {
      subject: "Ingeniería de requisitos",
      week: Week.A,
      room: "234.de",
      kind: 1,
      group: "Mañanas",
      weekDay: WeekDay.MONDAY,
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
      room: "22.e",
      kind: 0,
      weekDay: WeekDay.FRIDAY,
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
  ],
};

const getListEntriesParams: AvailableHoursParamsDTO = {
  titulacion: "Arquitectura",
  curso: 3,
  grupo: "A34",
};

const postNewEntriesError: Result<Entry[]> = {
  isError: true,
  error: Error(),
};

export const fixtures = {
  postNewEntries,
  entriesBody,
  postNewEntriesError,
  getListEntriesParams,
};
