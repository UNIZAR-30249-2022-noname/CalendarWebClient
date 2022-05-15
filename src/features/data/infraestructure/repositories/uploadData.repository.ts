import { Result } from "../../../../core/config/result";
import { entriesData } from "../data_sources/DataInput.data";

export const uploadDataRepo = {
  postCSV: async (
    body: string,
    privileges: string
  ): Promise<Result<boolean>> => {
    try {
      const res = await entriesData.postCSV(body, privileges);
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
