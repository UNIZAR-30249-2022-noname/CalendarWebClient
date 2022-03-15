
import { http } from "../../../../core/backend/http/http";
import { httpServices } from "../../../../core/backend/http/services";
import { Result } from "../../../../core/config/result";
import { Slots } from "../../domain/models/Slots";
import { SlotsFilterForm } from "../../domain/models/SlotsFilterForm";

let service = httpServices.filterSlots ;

export const testData = {
  filterBy: async (params: SlotsFilterForm): Promise<Result<Slots[]>> => {
    try {
      const res = await http.get(service,params);
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
