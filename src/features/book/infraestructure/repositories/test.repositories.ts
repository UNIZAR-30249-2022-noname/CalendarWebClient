
import { Result } from "../../../../core/config/result";
import { testData } from "../data_sources/test.data";


export const testRepo = {
  getInf: async (): Promise<Result<String>> => {
    const res = await testData.get();
    if (res.isError) {
      return { isError: true, error: res.error };
    }
    return res

  },
};
