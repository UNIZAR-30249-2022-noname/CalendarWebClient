import { degreePropertiesData } from "../../../../../../features/scheduler/degrees/infraestructure/data_sources/http/DegreeProperties.data";
import { degreePropertiesRepo } from "../../../../../../features/scheduler/degrees/infraestructure/repositories/degreeProperties.repositories";
import { fixtures } from "./fixtures";

describe("Degree properties repository tests", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("should get a [AvailableHours] model from [degreeAvailableHoursRepo] repo", async () => {
    // Given
    jest
      .spyOn(degreePropertiesData, "getDegrees")
      .mockReturnValue(Promise.resolve(fixtures.getDegreePropertiesDTO));
    jest.spyOn(degreePropertiesRepo, "getDegrees");
    // When
    const subjectListRes = await degreePropertiesRepo.getDegrees();
    // Then
    if (subjectListRes.isError) {
      throw Error();
    }
    let subjectList = subjectListRes.value;
    expect(degreePropertiesData.getDegrees).toBeCalled();
    expect(degreePropertiesRepo.getDegrees).toBeCalled();
    expect(subjectList.list.sort()).toEqual(
      fixtures.getDegreeProperties.value.list.sort()
    );
  });

  test("should get an [Error] from [degreeAvailableHoursRepo] repo", async () => {
    // Given
    jest
      .spyOn(degreePropertiesData, "getDegrees")
      .mockReturnValue(Promise.resolve(fixtures.getDegreePropertiesError));
    jest.spyOn(degreePropertiesRepo, "getDegrees");
    // When
    const subjectListRes = await degreePropertiesRepo.getDegrees();
    // Then
    if (!subjectListRes.isError) {
      throw Error();
    }
    expect(degreePropertiesData.getDegrees).toBeCalled();
    expect(degreePropertiesRepo.getDegrees).toBeCalled();
    expect(subjectListRes.error).toEqual(Error("degrees error"));
  });
});

export {};
