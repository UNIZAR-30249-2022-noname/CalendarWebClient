import { Result } from "../../../../core/config/result";
import { Reserve } from "../../domain/models/Reserve";
import { ReserveData } from "../data_resources/Reserve.data";

export const ReserveRepo = {
    getPerUser: async (name: string): Promise<Result<Reserve[]>> => {
      const res = await ReserveData.getPerUser(name);
      if (res.isError) {
        return { isError: true, error: res.error };
      }
      return res
  
    },
  
  
  };
  