import { debuglog } from "util";
import { Result } from "../../../../../core/config/result";
import SubjectAvailableHours from "../../domain/models/SubjectAvailableHours";
import { degreeAvailableHoursData } from "../data_sources/http/AvailableHours.data";
import AvailableHoursParamsDTO from "../dto/AvailableHoursParamsDTO";
import SubjectAvailableHoursDTO from "../dto/SubjectAvailableHoursDTO";

export const degreeAvailableHoursRepo = {
  getDegreeAvailableHours: async (
    params: AvailableHoursParamsDTO
  ): Promise<Result<SubjectAvailableHours[]>> => {
    const res = await degreeAvailableHoursData.getDegreeAvailableHours(params);
    if (res.isError) {
      return { isError: true, error: res.error };
    }
    // Parse to domain models, where bussines logic can understand the data
    try {
      const value = res.value.map(
        (subjectAvailableHoursDto): SubjectAvailableHours => {
          nullCheck(subjectAvailableHoursDto);
          return {
            kind: subjectAvailableHoursDto.Kind,
            subject: subjectAvailableHoursDto.Subject,
            hours: {
              remaining: subjectAvailableHoursDto.Remaining,
              total: subjectAvailableHoursDto.Max,
            },
          };
        }
      );
      return {
        isError: false,
        value: value,
      };
    } catch (e) {
      console.error((e as Error).message);
      return {
        isError: true,
        error: e as Error,
      };
    }
  },
};

// Manually check undefined and null xd
const nullCheck = (subjectAvailableHoursDto: SubjectAvailableHoursDTO) => {
  if (
    subjectAvailableHoursDto.Kind == null ||
    subjectAvailableHoursDto.Remaining == null ||
    subjectAvailableHoursDto.Subject == null ||
    subjectAvailableHoursDto.Max == null
  )
    throw Error();
};
