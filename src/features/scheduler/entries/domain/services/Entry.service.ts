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
        start,
        end,
        events: [
          {
            subject: entry.subject,
            initTime: {
              hour: start.getHours(),
              min: start.getMinutes(),
            },
            endTime: {
              hour: end.getHours(),
              min: end.getMinutes(),
            },
            weekDay: entry.weekDay,
            week: entry.week,
            kind: entry.kind,
            room: entry.room,
            group: entry.group,
          },
        ],
      };
    });
  },

  saveEntries: (entryList: EntryScheduler[]) => {
    return entryList.map((entry): Entry => {
      return {
        subject: entry.events[0].subject,
        initTime: {
          hour: entry.start.getHours(),
          min: entry.start.getMinutes(),
        },
        endTime: {
          hour: entry.end.getHours(),
          min: entry.end.getMinutes(),
        },
        weekDay: entry.start.getDay() - 1,
        week: entry.events[0].week as Week,
        kind: entry.events[0].kind,
        room: entry.events[0].room!,
        group: entry.events[0].group!,
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
