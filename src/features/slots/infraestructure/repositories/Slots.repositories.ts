import { Result } from "../../../../core/config/result";
import { Reserve } from "../../../reserve/domain/models/Reserve";
import { AllInfoSlot, ReqInfoSlot } from "../../domain/models/InfoSlots";
import { Slots } from "../../domain/models/Slots";
import { SlotsFilterForm } from "../../domain/models/SlotsFilterForm";
import { SlotData } from "../data_sources/Slots.data";

export const SlotsRepo = {
  filterBy: async (params: SlotsFilterForm): Promise<Result<Slots[]>> => {
    const res = await SlotData.filterBy(params);
    if (res.isError) {
      return { isError: true, error: res.error };
    }
    return res

  },

  requestInfoSlots: async (
    params: ReqInfoSlot
  ): Promise<Result<AllInfoSlot>> => {
    const res = await SlotData.requestInfoSlots(params);
    if (res.isError) {
      return { isError: true, error: res.error };
    }
    return res;
  },
  reserve: async (params: Reserve[]): Promise<Result<Reserve[]>> => {
    const res = await SlotData.reserve(params);
    if (res.isError) {
      return { isError: true, error: res.error };
    }
    return res;
  },

};
