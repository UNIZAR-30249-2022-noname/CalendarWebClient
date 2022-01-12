import IcalParamsDTO from "../../infraestructure/dto/IcalParamsDTO";
import { icalRepo } from "../../infraestructure/repositories/Ical.repositories";

export const IcalService = {
  getIcal: async (params: IcalParamsDTO) => {
    return await icalRepo.getIcal(params);
  },
};
