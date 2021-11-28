import { http } from "../../../../../../core/backend/http/http";
import { httpServices } from "../../../../../../core/backend/http/services";
import { Result } from "../../../../../../core/config/result";
import DegreePropertiesDTO from "../../dto/DegreePropertiesDTO";

let service = httpServices.listDegrees;

export const degreePropertiesData = {
  getDegrees: async (): Promise<Result<DegreePropertiesDTO[]>> => {
    try {
      const res = await http.get(service);
      //TODO casos de error
      if (res.status === 200) {
        return { isError: false, value: res.data };
      } else {
        return { isError: true, error: new Error() };
      }
    } catch (e) {
      return { isError: true, error: e as Error };
    }
  },
};
