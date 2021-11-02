import { http } from "../../../../../../core/backend/http/http";
import { httpServices } from "../../../../../../core/backend/http/services";
import { Result } from "../../../../../../core/config/result";
import EntryDTO from "../../dto/EntryDTO";

let service = httpServices.entries;

export const entriesData = {
  postNewEntries: async (body: EntryDTO[]): Promise<Result<boolean>> => {
    try {
      const res = await http.post(service, body);
      if (res.status === 200) {
        return { isError: false, value: true };
      } else {
        return { isError: true, error: new Error("Pepe") };
      }
    } catch (e) {
      return { isError: true, error: new Error() };
    }
  },
};
