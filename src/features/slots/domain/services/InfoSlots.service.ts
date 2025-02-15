import { Reserve } from "../../../reserve/domain/models/Reserve";
import { SlotsRepo } from "../../infraestructure/repositories/Slots.repositories";
import { InfoSlots, ReqInfoSlot } from "../models/InfoSlots";


export const infoSlotsService = {
  requestInfoSlots: async (params: ReqInfoSlot) => {
    const data = await SlotsRepo.requestInfoSlots(params);
    return data;
  },

  reserve: async (params: Reserve[]) => {
    const data = await SlotsRepo.reserve(params);
    return data;
  },
};
