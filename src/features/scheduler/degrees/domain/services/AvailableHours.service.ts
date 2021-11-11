import { colors } from "../../../../../core/config/constants";
import AvailableHoursParamsDTO from "../../infraestructure/dto/AvailableHoursParamsDTO";
import { degreeAvailableHoursRepo } from "../../infraestructure/repositories/AvailableHours.repositories";
import { SubjectKind } from "../models/SubjectAvailableHours";

export const degreeAvailableHoursService = {
  getDegreeAvailableHours: async (params: AvailableHoursParamsDTO) => {
    const titleList = await degreeAvailableHoursRepo.getDegreeAvailableHours(
      params
    );
    // Proccess data

    // return it to component
    return titleList;
  },
  getSubjectColor: (kind: SubjectKind): string => {
    switch (kind) {
      case 0:
        return colors.subjectType.theory;

      case 1:
        return colors.subjectType.practices;

      case 2:
        return colors.subjectType.exercices;

      default:
        return colors.subjectType.theory;
    }
  },
};
