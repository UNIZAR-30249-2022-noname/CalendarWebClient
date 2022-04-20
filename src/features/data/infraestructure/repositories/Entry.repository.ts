import { Result } from "../../../../core/config/result";
import { entriesData } from "../data_sources/DataInput.data";

export const entriesRepo = {
  postCSV: async (body: string): Promise<Result<boolean>> => {
    try {
      const res = await entriesData.postCSV(body);
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
