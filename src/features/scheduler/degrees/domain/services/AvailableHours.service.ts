import { colors } from "../../../../../core/config/constants";
import { SubjectKind } from "../../../entries/domain/models/Entry";
import AvailableHoursParamsDTO, {
  Group,
} from "../../infraestructure/dto/AvailableHoursParamsDTO";
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
  getSubjectColor: (kind: SubjectKind): string => {
    switch (kind) {
      case SubjectKind.theory:
        return colors.subjectType.theory;

      case SubjectKind.practices:
        return colors.subjectType.practices;

      case SubjectKind.problems:
        return colors.subjectType.exercices;

      default:
        return colors.subjectType.theory;
    }
  },
};
