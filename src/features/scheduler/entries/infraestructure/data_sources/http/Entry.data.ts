import { http } from "../../../../../../core/backend/http/http";
import { httpServices } from "../../../../../../core/backend/http/services";
import { Result } from "../../../../../../core/config/result";
import AvailableHoursParamsDTO from "../../../../degrees/infraestructure/dto/AvailableHoursParamsDTO";
import EntryDTO from "../../dto/EntryDTO";

export const entriesData = {
  postNewEntries: async (body: EntryDTO[]): Promise<Result<true>> => {
    const service = httpServices.entries;
    try {
      const res = await http.post(service, body);
      if (res.status === 200) {
        return { isError: false, value: true };
      } else {
        return { isError: true, error: new Error() };
      }
    } catch (e) {
      console.error((e as Error).message);
      return { isError: true, error: e as Error };
    }
  },
  getListEntries: async (
    body: AvailableHoursParamsDTO
  ): Promise<Result<EntryDTO[]>> => {
    const service = httpServices.getEntries;
    try {
      const res = await http.get(service, body);
      if (res.status === 200) {
        return { isError: false, value: res.data };
      } else {
        return { isError: true, error: new Error() };
      }
    } catch (e) {
      console.error((e as Error).message);
      return { isError: true, error: e as Error };
    }
  },
};
