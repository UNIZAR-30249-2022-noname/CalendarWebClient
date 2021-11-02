import { Result } from "../../../../../core/config/result";
import Entry from "../../domain/models/Entry";
import { entriesData } from "../data_sources/http/Entry.data";
import EntryDTO from "../dto/EntryDTO";

export const entriesRepo = {
  postNewEntries: async (body: Entry[]): Promise<Result<boolean>> => {
    try {
      const bodyDto = body.map((entry): EntryDTO => {
        // nullCheck(subjectAvailableHoursDto);
        return {
          subject: entry.subject,
          semana: entry.week,
          initHour: entry.initTime.getHours(),
          initMin: entry.initTime.getMinutes(),
          endHour: entry.endTime.getHours(),
          endMin: entry.endTime.getMinutes(),
          grupo: entry.group,
          room: entry.room,
          kind: entry.kind,
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
};
