import { degreeAvailableHoursData } from "../../../../../../features/scheduler/degrees/infraestructure/data_sources/http/AvailableHours.data";
import { degreeAvailableHoursRepo } from "../../../../../../features/scheduler/degrees/infraestructure/repositories/AvailableHours.repositories";
import { fixtures } from "./fixtures";

describe("Degree available hours repository tests", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("should get a [AvailableHours] model from [degreeAvailableHoursRepo] repo", async () => {
    // Given
    jest
      .spyOn(degreeAvailableHoursData, "getDegreeAvailableHours")
      .mockReturnValue(Promise.resolve(fixtures.getAvailableHoursDTO));
    jest.
    spyOn(degreeAvailableHoursRepo, "getDegreeAvailableHours");
    // When
    const subjectListRes =
      await degreeAvailableHoursRepo.getDegreeAvailableHours(
        fixtures.DegreeParams
      );
    // Then
    if (subjectListRes.isError) {
      throw Error();
    }
    let subjectList = subjectListRes.value;
    expect(degreeAvailableHoursRepo.getDegreeAvailableHours).toBeCalled();
    expect(degreeAvailableHoursData.getDegreeAvailableHours).toBeCalled();
    expect(subjectList.sort()).toEqual(fixtures.getAvailableHours.value.sort());
  });

  test("should get an [Error] from [degreeAvailableHoursRepo] repo", async () => {
    // Given
    jest
      .spyOn(degreeAvailableHoursData, "getDegreeAvailableHours")
      .mockReturnValue(Promise.resolve(fixtures.getAvailableHoursError));
    jest.spyOn(degreeAvailableHoursRepo, "getDegreeAvailableHours");
    // When
    const subjectListRes =
      await degreeAvailableHoursRepo.getDegreeAvailableHours(
        fixtures.DegreeParams
      );
    // Then
    if (!subjectListRes.isError) {
      throw Error();
    }
    expect(degreeAvailableHoursRepo.getDegreeAvailableHours).toBeCalled();
    expect(degreeAvailableHoursData.getDegreeAvailableHours).toBeCalled();
    expect(subjectListRes.error).toEqual(Error("available hours error"));
  });
});

export {};
