import { Result } from "../../../../../../core/config/result";
import { icalData } from "../data_sources/Ical.data";
import IcalParamsDTO from "../dto/IcalParamsDTO";

export const icalRepo= {
    getIcal:async(params:IcalParamsDTO):Promise<Result<String>>=>{
        
        return await icalData.getIcal(params);
        
    }
}