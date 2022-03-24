import { http } from "../../../../core/backend/http/http";
import { httpServices } from "../../../../core/backend/http/services";
import { Result } from "../../../../core/config/result";
import {
  AllInfoSlot,
  InfoSlotsKey,
  ReqInfoSlot,
  Reserve,
  SlotData,
} from "../../domain/models/InfoSlots";

let service = httpServices.reserve;
let service2 = httpServices.reserveArray;
let service3 = httpServices.requestInfoSlots;

const sd: SlotData = {
  name: "A1",
  capacity: 5,
  description: "Lorem ipsum no leas mas porque esto es dummy text",
  building: "Ada",
  floor: "baja",
};

const is: InfoSlotsKey[] = [
  {
    key: 8,
    hour: 8,
    occupied: false,
  },
  {
    key: 9,
    hour: 9,
    occupied: true,
    person: "Urriku",
  },
  {
    key: 10,

    hour: 10,
    occupied: false,
  },
  {
    key: 11,
    hour: 11,
    occupied: false,
  },
  {
    key: 12,
    hour: 12,
    occupied: true,
    person: "Urriku",
  },
  {
    key: 13,
    hour: 13,
    occupied: false,
  },
  {
    key: 14,
    hour: 14,
    occupied: false,
  },
  {
    key: 15,
    hour: 15,
    occupied: true,
    person: "Urriku",
  },
  {
    key: 16,
    hour: 16,
    occupied: false,
  },
  {
    key: 17,
    hour: 17,
    occupied: false,
  },
  {
    key: 18,
    hour: 18,
    occupied: true,
    person: "Urriku",
  },
  {
    key: 19,
    hour: 19,
    occupied: false,
  },
  {
    key: 20,
    hour: 20,
    occupied: false,
  },
];

const resDummy: AllInfoSlot = {
  slotData: sd,
  infoSlots: is,
};

export const testData = {
  //TODO
  requestInfoSlots: async (
    params: ReqInfoSlot
  ): Promise<Result<AllInfoSlot>> => {
    try {
      return { isError: false, value: resDummy };

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
