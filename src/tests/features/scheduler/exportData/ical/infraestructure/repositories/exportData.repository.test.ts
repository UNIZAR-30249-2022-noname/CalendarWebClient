import { Result } from "../../../../../../../core/config/result";
import { icalData } from "../../../../../../../features/scheduler/exportData/ical/infraestructure/data_sources/Ical.data";
import { icalRepo } from "../../../../../../../features/scheduler/exportData/ical/infraestructure/repositories/Ical.repositories";


describe("Export data on ics format", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("should get a String from [icalRepo] repo", async () => {
    // Given
    jest
      .spyOn(icalData, "getIcal")
      .mockReturnValue(Promise.resolve({ isError: false, value: "calendar" }));
    jest.spyOn(icalRepo, "getIcal");
    // When
    const subjectListRes = await icalRepo.getIcal({degree:"Ing.Infor",group:"1",year:1});
    // Then
    if (subjectListRes.isError) {
      throw Error();
    }
    let res = subjectListRes.value;
    expect(icalData.getIcal).toBeCalled();
    expect(icalRepo.getIcal).toBeCalled();
    expect(res).toEqual("calendar");
  });

  test("should get an [Error] from [degreeAvailableHoursRepo] repo", async () => {
    // Given
    jest
      .spyOn(icalData, "getIcal")
      .mockReturnValue(Promise.resolve({ isError: true, error: new Error()}));
    jest.spyOn(icalRepo, "getIcal");
    // When
    const subjectListRes = await icalRepo.getIcal({degree:"Ing.Infor",group:"1",year:1});
    // Then
    if (!subjectListRes.isError) {
      throw Error();
    }
    expect(icalData.getIcal).toBeCalled();
    expect(icalRepo.getIcal).toBeCalled();
    expect(subjectListRes.error).toEqual(Error());
  });
});

export {};
