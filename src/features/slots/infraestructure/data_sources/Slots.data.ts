import { message } from "antd";
import { http } from "../../../../core/backend/http/http";
import { httpServices } from "../../../../core/backend/http/services";
import { Result } from "../../../../core/config/result";
import { Reserve } from "../../../reserve/domain/models/Reserve";
import { AllInfoSlot, ReqInfoSlot } from "../../domain/models/InfoSlots";
import { Slots } from "../../domain/models/Slots";
import { SlotsFilterForm } from "../../domain/models/SlotsFilterForm";

let serviceFilter = httpServices.filterSlots;
let serviceReserve = httpServices.reserve;
let serviceRequestInfo = httpServices.requestInfoSlots;

export const SlotData = {
  filterBy: async (params: SlotsFilterForm): Promise<Result<Slots[]>> => {
    try {
      const res = await http.get(serviceFilter, params);
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

  requestInfoSlots: async (
    params: ReqInfoSlot
  ): Promise<Result<AllInfoSlot>> => {
    try {
      //return { isError: false, value: resDummy };

      let res;
      res = await http.get(serviceRequestInfo, params);
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
        res = await http.post(serviceReserve, params[0]);
        if (res.status !== 200) {
          return { isError: true, error: new Error() };
        }
      } else {
        //Esto ahora es un bucle pero cuando nos pongamos
        //de acuerdo con el back será reserva array
        for (var i in params) {
          res = await http.post(serviceReserve, params[i]);
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
