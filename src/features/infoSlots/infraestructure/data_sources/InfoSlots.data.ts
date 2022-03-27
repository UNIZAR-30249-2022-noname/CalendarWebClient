import { http } from "../../../../core/backend/http/http";
import { message } from "antd";
import { httpServices } from "../../../../core/backend/http/services";
import { Result } from "../../../../core/config/result";
import {
  AllInfoSlot,
  ReqInfoSlot,
  Reserve,
} from "../../domain/models/InfoSlots";

let service = httpServices.reserve;
//let service2 = httpServices.reserveArray;
let service3 = httpServices.requestInfoSlots;

export const testData = {
  //TODO
  requestInfoSlots: async (
    params: ReqInfoSlot
  ): Promise<Result<AllInfoSlot>> => {
    try {
      //return { isError: false, value: resDummy };

      let res;
      res = await http.get(service3, params);
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
        res = await http.get(service, params[0]);
        if (res.status !== 200) {
          return { isError: true, error: new Error() };
        }
      } else {
        //Esto ahora es un bucle pero cuando nos pongamos
        //de acuerdo con el back será reserva array
        for (var i in params) {
          res = await http.get(service, params[i]);
          if (res.status !== 200) {
            message.info("Ha reventao " + i);
            return { isError: true, error: new Error() };
          }
        }
      }
      return { isError: false, value: params };
    } catch (e) {
      console.error((e as Error).message);
      return { isError: true, error: e as Error };
    }
  },
};
