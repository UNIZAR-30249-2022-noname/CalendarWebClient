import AvailableHoursParamsDTO from "../../../degrees/infraestructure/dto/AvailableHoursParamsDTO";
import { entriesRepo } from "../../infraestructure/repositories/Entry.repository";
import Entry from "../models/Entry";
import { EntryScheduler } from "../models/EntryScheduler";

export const entriesService = {
  postNewEntries: async (body: Entry[]) => {
    return await entriesRepo.postNewEntries(body);
  },
  getListEntries: async (body: AvailableHoursParamsDTO) => {
    return await entriesRepo.getListEntries(body);
  },
  loadEntries: (listEntriesDTO: Entry[]): EntryScheduler[] => {
    const entryList = listEntriesDTO;
    let events: EntryScheduler[] = [];
    entryList.forEach((entry) => {
      let start = getWeekDay(entry.weekDay);
      var end = new Date(start);
      start.setHours(entry.initTime.hour, entry.initTime.min);
      end.setHours(entry.endTime.hour, entry.endTime.min);
      let event: EntryScheduler = {
        title: entry.subject,
        start: start,
        end: end,
        week: entry.week,
        kind: entry.kind,
        room: entry.room,
        group: entry.group,
      };
      events = [...events, event];
    });
    return events;
  },
};

const getWeekDay = (weekDay: number): Date => {
  let date = new Date();
  const currentDay = date.getDay();
  const distance = weekDay - currentDay + 1;
  date.setDate(date.getDate() + distance);
  return date;
};
