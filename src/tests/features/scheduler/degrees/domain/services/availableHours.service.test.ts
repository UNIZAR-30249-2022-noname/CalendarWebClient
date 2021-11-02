import { degreeAvailableHoursService } from "../../../../../../features/scheduler/degrees/domain/services/AvailableHours.service";
import { degreeAvailableHoursRepo } from "../../../../../../features/scheduler/degrees/infraestructure/repositories/AvailableHours.repositories";
import { fixtures } from "./fixtures";

describe("Degree available hours service tests", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("should get a [AvailableHours] model from [degreeAvailableHoursService] service", async () => {
    // Given
    jest
      .spyOn(degreeAvailableHoursRepo, "getDegreeAvailableHours")
      .mockReturnValue(Promise.resolve(fixtures.getAvailableHours));
    jest.spyOn(degreeAvailableHoursService, "getDegreeAvailableHours");
    // When
    const subjectListRes =
      await degreeAvailableHoursService.getDegreeAvailableHours(
        fixtures.DegreeParams
      );
    // Then
    if (subjectListRes.isError) {
      throw Error();
    }
    let subjectList = subjectListRes.value;
    expect(degreeAvailableHoursService.getDegreeAvailableHours).toBeCalled();
    expect(degreeAvailableHoursRepo.getDegreeAvailableHours).toBeCalled();
    expect(subjectList.sort()).toEqual(fixtures.getAvailableHours.value.sort());
  });

  test("should get an [Error] from title service", async () => {
    // Given
    jest
      .spyOn(degreeAvailableHoursRepo, "getDegreeAvailableHours")
      .mockReturnValue(Promise.resolve(fixtures.getAvailableHoursError));
    jest.spyOn(degreeAvailableHoursService, "getDegreeAvailableHours");
    // When
    const subjectListRes =
      await degreeAvailableHoursService.getDegreeAvailableHours(
        fixtures.DegreeParams
      );
    // Then
    if (!subjectListRes.isError) {
      throw Error();
    }
    expect(degreeAvailableHoursService.getDegreeAvailableHours).toBeCalled();
    expect(degreeAvailableHoursRepo.getDegreeAvailableHours).toBeCalled();
    expect(subjectListRes.error).toEqual(Error("available hours error"));
  });
});

export {};
