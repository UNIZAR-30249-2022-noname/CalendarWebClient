import AvailableHoursParamsDTO from "../../../degrees/infraestructure/dto/AvailableHoursParamsDTO";
import { entriesRepo } from "../../infraestructure/repositories/Entry.repository";
import Entry, { Week } from "../models/Entry";
import { EntryScheduler } from "../models/EntryScheduler";

export const entriesService = {
  postNewEntries: async (body: Entry[], params: AvailableHoursParamsDTO) => {
    return await entriesRepo.postNewEntries(body, params);
  },
  getListEntries: async (body: AvailableHoursParamsDTO) => {
    return await entriesRepo.getListEntries(body);
  },
  loadEntries: (listEntriesDTO: Entry[]): EntryScheduler[] => {
    return listEntriesDTO.map((entry): EntryScheduler => {
      let start = getWeekDay(entry.weekDay);
      var end = new Date(start);
      start.setHours(entry.initTime.hour, entry.initTime.min);
      end.setHours(entry.endTime.hour, entry.endTime.min);
      return {
        id: Math.random() * 50,
        title: entry.subject,
        start: start,
        end: end,
        week: entry.week,
        kind: entry.kind,
        room: entry.room,
        group: entry.group,
      };
    });
  },

  saveEntries: (entryList: EntryScheduler[]) => {
    return entryList.map((entry): Entry => {
      return {
        subject: entry.title,
        initTime: {
          hour: entry.start.getHours(),
          min: entry.start.getMinutes(),
        },
        endTime: {
          hour: entry.end.getHours(),
          min: entry.end.getMinutes(),
        },
        weekDay: entry.start.getDay() - 1,
        week: entry.week as Week,
        kind: entry.kind,
        room: entry.room!,
        group: entry.group!,
      };
    });
  },
};

const getWeekDay = (weekDay: number): Date => {
  let date = new Date();
  const currentDay = date.getDay();
  const distance = weekDay - currentDay + 1;
  date.setDate(date.getDate() + distance);
  return date;
};
