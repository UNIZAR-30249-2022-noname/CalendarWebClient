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
    console.log(res.value[0]);
    // Parse to domain models, where bussines logic can understand the data
    try {
      const value = res.value.map(
        (subjectAvailableHoursDto): SubjectAvailableHours => {
          nullCheck(subjectAvailableHoursDto);
          console.log(subjectAvailableHoursDto);
          return {
            kind: subjectAvailableHoursDto.kind,
            subject: subjectAvailableHoursDto.subject,
            hours: {
              remaining: subjectAvailableHoursDto.remaining,
              total: subjectAvailableHoursDto.max,
            },
          };
        }
      );
      return {
        isError: false,
        value: value,
      };
    } catch (e) {
      return {
        isError: true,
        error: Error("parse error"),
      };
    }
  },
};

// Manually check undefined and null xd
const nullCheck = (subjectAvailableHoursDto: SubjectAvailableHoursDTO) => {
  if (
    subjectAvailableHoursDto.kind == null ||
    subjectAvailableHoursDto.remaining == null ||
    subjectAvailableHoursDto.subject == null ||
    subjectAvailableHoursDto.max == null
  )
    throw Error();
};
