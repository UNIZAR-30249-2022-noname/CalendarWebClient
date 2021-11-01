import { degreeAvailableHoursService } from "../../../../../../features/scheduler/available-hours/domain/services/AvailableHours.service";
import { fixtures } from "./fixtures";

describe("Degree available hours service tests", () => {
  test("should get a [AvailableHours] model from [degreeAvailableHoursService] service", async () => {
    // Given
    jest
      .spyOn(degreeAvailableHoursService, "getDegreeAvailableHours")
      .mockReturnValue(Promise.resolve(fixtures.getAvailableHours));
    // When
    const subjectListRes =
      await degreeAvailableHoursService.getDegreeAvailableHours();
    // Then
    if (subjectListRes.isError) {
      throw Error();
    }
    let subjectList = subjectListRes.value;
    expect(degreeAvailableHoursService.getDegreeAvailableHours).toBeCalled();
    expect(subjectList.sort()).toEqual(fixtures.getAvailableHours.value.sort());
  });

  test("should get an [Error] from title service", async () => {
    // Given
    jest
      .spyOn(degreeAvailableHoursService, "getDegreeAvailableHours")
      .mockReturnValue(Promise.resolve(fixtures.getAvailableHoursError));
    // When
    const subjectListRes =
      await degreeAvailableHoursService.getDegreeAvailableHours();
    // Then
    if (!subjectListRes.isError) {
      throw Error();
    }
    expect(degreeAvailableHoursService.getDegreeAvailableHours).toBeCalled();
    expect(subjectListRes.error).toEqual(Error("available hours error"));
  });
});

export {};
