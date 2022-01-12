import IcalParamsDTO from "../../infraestructure/dto/IcalParamsDTO"
import { icalRepo } from "../../infraestructure/repositories/Ical.repositories";

export const IcalService = {
    getIcal: async (params:IcalParamsDTO)=>{
        const res = await icalRepo.getIcal(params);
    //Process data

    //Return it to component
    return res;
    }

}