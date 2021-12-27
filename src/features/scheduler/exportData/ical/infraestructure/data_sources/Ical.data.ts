import { http } from "../../../../../../core/backend/http/http";
import { httpServices } from "../../../../../../core/backend/http/services";
import { Result } from "../../../../../../core/config/result";
import IcalParamsDTO from "../dto/IcalParamsDTO";

let service = httpServices.ical;

export const icalData = {

  
    getIcal: async (
    params: IcalParamsDTO
  ): Promise<Result<String>> => {
    return { isError: false, value: "Jorge wapo" }
    /*
    try {
      const res = await http.get(service, params);
      if (res.status === 200) {
        return { isError: false, value: res.data };
      } else {
        return { isError: true, error: new Error() };
      }
    } catch (e) {
      console.error((e as Error).message);
      return { isError: true, error: e as Error };
    }*/
  },
};
