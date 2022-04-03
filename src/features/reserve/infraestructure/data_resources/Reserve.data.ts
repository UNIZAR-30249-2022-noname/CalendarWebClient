import { http } from "../../../../core/backend/http/http";
import { httpServices } from "../../../../core/backend/http/services";
import { Result } from "../../../../core/config/result";
import { Reserve } from "../../domain/models/Reserve";

let serviceReservePerOwner = httpServices.requestReservesPerOwner;

export const ReserveData = {
    getPerUser: async (name: string): Promise<Result<Reserve[]>> => {
    try {
      const res = await http.get(serviceReservePerOwner,name);
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

};
