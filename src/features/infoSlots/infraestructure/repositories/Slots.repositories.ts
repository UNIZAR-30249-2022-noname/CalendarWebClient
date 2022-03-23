import { Result } from "../../../../core/config/result";
import {
  InfoSlots,
  InfoSlotsKey,
  Reserve,
} from "../../domain/models/InfoSlots";

import { testData } from "../data_sources/InfoSlots.data";

export const InfoSlotsRepo = {
  reserve: async (params: Reserve[]): Promise<Result<Reserve[]>> => {
    const res = await testData.reserve(params);
    if (res.isError) {
      return { isError: true, error: res.error };
    }
    return res;
  },
};
