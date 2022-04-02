import { Result } from "../../../../core/config/result";
import {
  Reserve,
  ReqInfoSlot,
  AllInfoSlot,
} from "../../domain/models/InfoSlots";

import { testData } from "../data_sources/InfoSlots.data";

export const InfoSlotsRepo = {
  requestInfoSlots: async (
    params: ReqInfoSlot
  ): Promise<Result<AllInfoSlot>> => {
    const res = await testData.requestInfoSlots(params);
    if (res.isError) {
      return { isError: true, error: res.error };
    }
    return res;
  },
  reserve: async (params: Reserve[]): Promise<Result<Reserve[]>> => {
    const res = await testData.reserve(params);
    if (res.isError) {
      return { isError: true, error: res.error };
    }
    return res;
  },
};
