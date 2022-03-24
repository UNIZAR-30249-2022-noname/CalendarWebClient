import { http } from "../../../../core/backend/http/http";
import { httpServices } from "../../../../core/backend/http/services";
import { Result } from "../../../../core/config/result";
import { Reserve } from "../../domain/models/InfoSlots";

let service = httpServices.reserve;
let service2 = httpServices.reserveArray;

export const testData = {
  //TODO
  requestInfoSlots: async (params: Reserve[]): Promise<Result<Reserve[]>> => {
    try {
      let res;
      if (params.length === 1) {
        res = await http.get(service, params);
      } else {
        res = await http.get(service2, params);
      }
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
  reserve: async (params: Reserve[]): Promise<Result<Reserve[]>> => {
    try {
      let res;
      if (params.length === 1) {
        res = await http.get(service, params);
      } else {
        res = await http.get(service2, params);
      }
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
