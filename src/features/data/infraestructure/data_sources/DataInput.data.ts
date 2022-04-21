import { http } from "../../../../core/backend/http/http";
import { httpServices } from "../../../../core/backend/http/services";
import { Result } from "../../../../core/config/result";

export const entriesData = {
  postCSV: async (body: string): Promise<Result<true>> => {
    const service = httpServices.uploadData;
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
};
