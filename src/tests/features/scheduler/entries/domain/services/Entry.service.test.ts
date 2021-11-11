import { entriesService } from "../../../../../../features/scheduler/entries/domain/services/Entry.service";
import { entriesRepo } from "../../../../../../features/scheduler/entries/infraestructure/repositories/Entry.repository";
import { fixtures } from "./fixtures";

describe("Entry service tests", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("should get a [AvailableHours] model from [degreeAvailableHoursService] service", async () => {
    // Given
    jest
      .spyOn(entriesRepo, "postNewEntries")
      .mockReturnValue(Promise.resolve(fixtures.postNewEntries));
    jest.spyOn(entriesService, "postNewEntries");
    // When
    const res = await entriesService.postNewEntries(fixtures.entriesBody);
    // Then
    if (res.isError) {
      throw Error();
    }
    expect(entriesRepo.postNewEntries).toBeCalled();
    expect(entriesService.postNewEntries).toBeCalled();
    expect(res.value).toBe(true);
  });

  test("should get an [Error] from entries service", async () => {
    // Given
    jest
      .spyOn(entriesRepo, "postNewEntries")
      .mockReturnValue(Promise.resolve(fixtures.postNewEntriesError));
    jest.spyOn(entriesService, "postNewEntries");
    // When
    const res = await entriesService.postNewEntries(fixtures.entriesBody);
    // Then
    if (!res.isError) {
      throw Error();
    }
    expect(entriesRepo.postNewEntries).toBeCalled();
    expect(entriesService.postNewEntries).toBeCalled();
    expect(res.error).toEqual(Error());
  });
});

export {};
