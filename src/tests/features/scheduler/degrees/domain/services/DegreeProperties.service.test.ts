import { degreePropertiesService } from "../../../../../../features/scheduler/degrees/domain/services/DegreeProperties.service";
import { degreePropertiesRepo } from "../../../../../../features/scheduler/degrees/infraestructure/repositories/degreeProperties.repositories";
import { fixtures } from "./fixtures";

describe("Degree Properties service tests", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("should get a [AvailableHours] model from [degreeAvailableHoursService] service", async () => {
    // Given
    jest
      .spyOn(degreePropertiesRepo, "getDegrees")
      .mockReturnValue(Promise.resolve(fixtures.getDegreeProperties));
    jest.spyOn(degreePropertiesService, "getDegrees");
    // When
    const subjectListRes = await degreePropertiesService.getDegrees();
    // Then
    if (subjectListRes.isError) {
      throw Error();
    }
    let subjectList = subjectListRes.value;
    expect(degreePropertiesRepo.getDegrees).toBeCalled();
    expect(degreePropertiesService.getDegrees).toBeCalled();
    expect(subjectList.list.sort()).toEqual(
      fixtures.getDegreeProperties.value.list.sort()
    );
  });

  test("should get an [Error] from title service", async () => {
    // Given
    jest
      .spyOn(degreePropertiesRepo, "getDegrees")
      .mockReturnValue(Promise.resolve(fixtures.getDegreePropertiesError));
    jest.spyOn(degreePropertiesService, "getDegrees");
    // When
    const subjectListRes = await degreePropertiesService.getDegrees();
    // Then
    if (!subjectListRes.isError) {
      throw Error();
    }
    expect(degreePropertiesRepo.getDegrees).toBeCalled();
    expect(degreePropertiesService.getDegrees).toBeCalled();
    expect(subjectListRes.error).toEqual(Error("degrees error"));
  });
});

export {};
