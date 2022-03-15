import { SlotsRepo } from "../../infraestructure/repositories/Slots.repositories";
import { Slots } from "../models/Slots";
import { SlotsFilterForm } from "../models/SlotsFilterForm";

const fakeData:Slots[]=[{
  name:"hola",
  capacity:20,
  building: "lo k sea",
  kind: "aula"

  


}]

export const searchSlotsService = {
  filterBy: async (params: SlotsFilterForm) => {
    const data = await SlotsRepo.filterBy(params);
    return fakeData;
  },
};
