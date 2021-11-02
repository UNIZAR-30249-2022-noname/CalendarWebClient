import { entriesData } from "../../../../../../features/scheduler/entries/infraestructure/data_sources/http/Entry.data";
import { entriesRepo } from "../../../../../../features/scheduler/entries/infraestructure/repositories/Entry.repository";
import { fixtures } from "./fixtures";

describe("Degree available hours repository tests", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("should get a [AvailableHours] model from [degreeAvailableHoursRepo] repo", async () => {
    // Given
    jest
      .spyOn(entriesData, "postNewEntries")
      .mockReturnValue(Promise.resolve(fixtures.resEntries));
    jest.spyOn(entriesRepo, "postNewEntries");
    // When
    const res = await entriesRepo.postNewEntries(fixtures.postEntriesBody);
    // Then
    if (res.isError) {
      throw Error();
    }
    expect(entriesData.postNewEntries).toBeCalledWith(
      fixtures.postEntriesBodyDTO
    );
    expect(entriesRepo.postNewEntries).toBeCalled();
    expect(res.value).toBe(true);
  });

  test("should get an [Error] from [degreeAvailableHoursRepo] repo", async () => {
    // Given
    jest
      .spyOn(entriesData, "postNewEntries")
      .mockReturnValue(Promise.resolve(fixtures.resEntriesError));
    jest.spyOn(entriesRepo, "postNewEntries");
    // When
    const res = await entriesRepo.postNewEntries(fixtures.postEntriesBody);
    // Then
    if (!res.isError) {
      throw Error();
    }
    expect(entriesData.postNewEntries).toBeCalledWith(
      fixtures.postEntriesBodyDTO
    );
    expect(entriesRepo.postNewEntries).toBeCalled();
    expect(res.error).toEqual(Error());
  });
});

export {};

export {};
