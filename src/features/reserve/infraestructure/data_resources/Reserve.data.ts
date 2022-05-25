import { http } from "../../../../core/backend/http/http";
import { httpServices } from "../../../../core/backend/http/services";
import { Result } from "../../../../core/config/result";
import { Reserve } from "../../domain/models/Reserve";

let serviceReservePerOwner = httpServices.requestReservesPerOwner;
let cancelReserve = httpServices.cancelReserve;


export const ReserveData = {
    getPerUser: async (name: string): Promise<Result<Reserve[]>> => {
    try {
      const res = await http.get(serviceReservePerOwner,{name:name});
      if (res.status === 200) {
        return { isError: false, value: res.data };
      } else {
        return { isError: true, error: new Error() };
      }
    } catch (e) {
      console.error((e as Error).message);
      return { isError: true, error: e as Error };
    }
  },

  cancel: async (reserve: string): Promise<Result<Boolean>> => {
    try {
      const res = await http.get(cancelReserve,reserve);
      if (res.status === 200) {
        return { isError: false, value: true};
      } else {
        return { isError: true, error: new Error() };
      }
    } catch (e) {
      console.error((e as Error).message);
      return { isError: true, error: e as Error };
    }
  },

};
