import { http } from "../../../../../../core/backend/http/http";
import { httpServices } from "../../../../../../core/backend/http/services";
import { Result } from "../../../../../../core/config/result";
import SubjectAvailableHoursDTO from "../../dto/SubjectAvailableHoursDTO";

let service = httpServices.degreeAvailableHours;

export const degreeAvailableHoursData = {
  getDegreeAvailableHours: async (): Promise<
    Result<SubjectAvailableHoursDTO[]>
  > => {
    try {
      const res = await http.get(service);
      if (res.status === 200) {
        return { isError: false, value: res.data };
      } else {
        return { isError: true, error: new Error("Pepe") };
      }
    } catch (e) {
      return { isError: true, error: new Error() };
    }
  },
};
