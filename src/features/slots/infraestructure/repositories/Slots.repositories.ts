
import { Result } from "../../../../core/config/result";
import { Slots } from "../../domain/models/Slots";
import { SlotsFilterForm } from "../../domain/models/SlotsFilterForm";
import { testData } from "../data_sources/Slots.data";


export const SlotsRepo = {
  filterBy: async (params: SlotsFilterForm): Promise<Result<Slots[]>> => {
    const res = await testData.filterBy(params);
    if (res.isError) {
      return { isError: true, error: res.error };
    }
    return res

  },
};
