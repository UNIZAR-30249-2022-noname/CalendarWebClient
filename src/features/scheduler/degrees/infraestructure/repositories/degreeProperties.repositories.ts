import { Result } from "../../../../../core/config/result";
import DegreeProperties, {
  YearProperties,
} from "../../domain/models/SubjectDegrees";
import { degreePropertiesData } from "../data_sources/http/DegreeProperties.data";

export const degreePropertiesRepo = {
  getDegrees: async (): Promise<Result<DegreeProperties>> => {
    const res = await degreePropertiesData.getDegrees();
    if (res.isError) {
      return { isError: true, error: res.error };
    }

    // Parse to domain models, where bussines logic can understand the data
    try {
      //inicializo los valores a devolver
      let degreesList: string[] = [];
      let degreeProperties = new Map<string, YearProperties[]>();
      //iterate all  DTO for getting the equivalent  model
      res.value.forEach(function (element) {
        //get the name
        degreesList.push(element.name);
        //get the properties
        const properties = element.years.map(
          (yearPropertiesDTO): YearProperties => {
            return {
              name: yearPropertiesDTO.name,
              groups: yearPropertiesDTO.groups,
            };
          }
        );
        degreeProperties.set(element.name, properties);
      });

      return {
        isError: false,
        value: {
          list: degreesList,
          properties: degreeProperties,
        },
      };
    } catch (e) {
      return {
        isError: true,
        error: Error("parse error"),
      };
    }
  },
};
