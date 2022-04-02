import { InfoSlots, ReqInfoSlot, Reserve } from "../models/InfoSlots";

import { InfoSlotsRepo } from "../../infraestructure/repositories/Slots.repositories";

export const infoSlotsService = {
  requestInfoSlots: async (params: ReqInfoSlot) => {
    const data = await InfoSlotsRepo.requestInfoSlots(params);
    return data;
  },

  reserve: async (params: Reserve[]) => {
    const data = await InfoSlotsRepo.reserve(params);
    return data;
  },
};
