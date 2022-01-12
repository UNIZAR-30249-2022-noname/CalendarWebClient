import { IcalService } from "../../../../../../../features/scheduler/exportData/ical/domain/services/Ical.service";
import { icalRepo } from "../../../../../../../features/scheduler/exportData/ical/infraestructure/repositories/Ical.repositories";
import { fixtures } from "./fixtures";

describe("Degree available hours service tests", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("should get a [AvailableHours] model from [degreeAvailableHoursService] service", async () => {
    // Given
    jest
      .spyOn(icalRepo, "getIcal")
      .mockReturnValue(Promise.resolve({ isError: false, value: fixtures.fileConent }));
    jest.spyOn(IcalService, "getIcal");
    // When
    const file =
      await IcalService.getIcal(
        fixtures.params
      );
    // Then
    if (file.isError) {
      throw Error();
    }
    let fileConent = file.value;
    expect(IcalService.getIcal).toBeCalled();
    expect(icalRepo.getIcal).toBeCalled();
    expect(fileConent).toEqual(
        fixtures.fileConent);
  });

  test("should get an [Error] from title service", async () => {
    // Given
    jest
    .spyOn(icalRepo, "getIcal")
      .mockReturnValue(Promise.resolve({ isError: true, error: new Error() }));
      jest.spyOn(IcalService, "getIcal");
    // When
    const subjectListRes =
    await IcalService.getIcal(
        fixtures.params
      );
    // Then
    if (!subjectListRes.isError) {
      throw Error();
    }
    expect(IcalService.getIcal).toBeCalled();
    expect(icalRepo.getIcal).toBeCalled();
    expect(subjectListRes.error).toEqual(Error());
  });
});

export {};
