import { http } from "../../../../../../core/backend/http/http";
import { httpServices } from "../../../../../../core/backend/http/services";
import { Result } from "../../../../../../core/config/result";
import AvailableHoursParamsDTO from "../../dto/AvailableHoursParamsDTO";
import SubjectAvailableHoursDTO from "../../dto/SubjectAvailableHoursDTO";

let service = httpServices.degreeAvailableHours;

export const degreeAvailableHoursData = {
  getDegreeAvailableHours: async (
    params: AvailableHoursParamsDTO
  ): Promise<Result<SubjectAvailableHoursDTO[]>> => {
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
    }
  },
};
