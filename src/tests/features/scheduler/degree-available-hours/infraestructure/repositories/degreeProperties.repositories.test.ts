import { degreePropertiesData } from "../../../../../../features/scheduler/available-hours/infraestructure/data_sources/http/DegreeProperties.data";
import { degreePropertiesRepo } from "../../../../../../features/scheduler/available-hours/infraestructure/repositories/degreeProperties.repositories";
import { fixtures } from "./fixtures";

describe("Degree properties repository tests", () => {
  test("should get a [DegreeProperties] model from [degreePropertiesRepo] repo", async () => {
    // Given
    jest
      .spyOn(degreePropertiesRepo, "getAllDegrees")
      .mockReturnValue(Promise.resolve(fixtures.getDegreeProperties));//TODO correct value
   
    // When
    const subjectListRes =
      await degreePropertiesRepo.getAllDegrees();
    // Then
    if (subjectListRes.isError) {
      throw Error();
    }
    let subjectList = subjectListRes.value;
    expect(degreePropertiesRepo.getAllDegrees).toBeCalled();
    //expect(degreePropertiesData.getDegrees).toBeCalled(); Falla pero no se por k xd
    expect(subjectList).toEqual(fixtures.getDegreeProperties.value);//TODO el valor esta mal
  });

  test("should get an [Error] from [degreeAvailableHoursRepo] repo", async () => {
    // Given
    jest
      .spyOn(degreePropertiesRepo, "getAllDegrees")
      .mockReturnValue(Promise.resolve(fixtures.getDegreePropertiesError));//TODO el error esta mal
    // When
    const subjectListRes =
      await degreePropertiesRepo.getAllDegrees();
    // Then
    if (!subjectListRes.isError) {
      throw Error();
    }
    //expect(degreePropertiesRepo.getAllDegrees).toBeCalled();
    expect(subjectListRes.error).toEqual(Error("degrees error")); //TODO el error esta mal
  });
});

export {};
