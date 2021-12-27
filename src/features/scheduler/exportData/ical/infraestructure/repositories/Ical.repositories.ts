import { isCallSignatureDeclaration } from "typescript";
import { Result } from "../../../../../../core/config/result";
import { icalData } from "../data_sources/Ical.data";
import IcalParamsDTO from "../dto/IcalParamsDTO";

export const icalRepo= {
    getIcal:async(params:IcalParamsDTO):Promise<String>=>{
        return "sapo";
       /* const res = await icalData.getIcal(params);
        if(res.isError){
            return Promise.reject("Error al obtener calendario"); 
        }
        return Promise.resolve(res.value);*/
    }
}