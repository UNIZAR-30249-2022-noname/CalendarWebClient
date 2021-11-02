import AvailableHoursParamsDTO from "../../infraestructure/dto/AvailableHoursParamsDTO";
import { degreeAvailableHoursRepo } from "../../infraestructure/repositories/AvailableHours.repositories";

export const degreeAvailableHoursService = {
  getDegreeAvailableHours: async (params: AvailableHoursParamsDTO) => {
    const titleList = await degreeAvailableHoursRepo.getDegreeAvailableHours(
      params
    );
    // Proccess data

    // return it to component
    return titleList;
  },
};
