import { colors } from "../../../../../core/config/constants";
import { SubjectKind } from "../../../entries/domain/models/Entry";
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
