import { SlotsRepo } from "../../infraestructure/repositories/Slots.repositories";
import { Slots } from "../models/Slots";
import { SlotsFilterForm } from "../models/SlotsFilterForm";

export const searchSlotsService = {
  filterBy: async (params: SlotsFilterForm) => {
    const data = await SlotsRepo.filterBy(params);
    return data;
  },
};
