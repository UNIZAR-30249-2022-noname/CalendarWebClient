import { Result } from "../../../../../core/config/result";
import AvailableHoursParamsDTO from "../../../degrees/infraestructure/dto/AvailableHoursParamsDTO";
import Entry, { Week } from "../../domain/models/Entry";
import { entriesData } from "../data_sources/http/Entry.data";
import EntryDTO from "../dto/EntryDTO";

export const entriesRepo = {
  postNewEntries: async (body: Entry[]): Promise<Result<boolean>> => {
    try {
      const bodyDto = body.map((entry): EntryDTO => {
        return {
          subject: entry.subject,
          semana: entry.week,
          initHour: entry.initTime.hour,
          initMin: entry.initTime.min,
          endHour: entry.endTime.hour,
          endMin: entry.endTime.min,
          grupo: entry.group,
          room: entry.room,
          kind: entry.kind,
          weekday: entry.weekDay,
        };
      });
      const res = await entriesData.postNewEntries(bodyDto);
      if (res.isError) {
        return { isError: true, error: res.error };
      }
      // Parse to domain models, where bussines logic can understand the data
      return {
        isError: false,
        value: true,
      };
    } catch (e) {
      return {
        isError: true,
        error: Error("parse error"),
      };
    }
  },

  getListEntries: async (
    body: AvailableHoursParamsDTO
  ): Promise<Result<Entry[]>> => {
    try {
      const res = await entriesData.getListEntries(body);
      if (res.isError) {
        return { isError: true, error: res.error };
      }
      const listEntriesDTO = res.value;
      const listEntries = listEntriesDTO.map((entryDTO): Entry => {
        return {
          subject: entryDTO.subject,
          week: entryDTO.semana as Week,
          room: entryDTO.room,
          kind: entryDTO.kind,
          group: entryDTO.grupo,
          weekDay: entryDTO.weekday,
          initTime: {
            hour: entryDTO.initHour,
            min: entryDTO.initMin,
          },
          endTime: {
            hour: entryDTO.endHour,
            min: entryDTO.endMin,
          },
        };
      });

      return {
        isError: false,
        value: listEntries,
      };
    } catch (e) {
      return {
        isError: true,
        error: Error("parse error"),
      };
    }
  },
};
