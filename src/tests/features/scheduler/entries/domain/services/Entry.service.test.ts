import { entriesService } from "../../../../../../features/scheduler/entries/domain/services/Entry.service";
import { entriesRepo } from "../../../../../../features/scheduler/entries/infraestructure/repositories/Entry.repository";
import { fixtures } from "./fixtures";

describe.only("Entry service tests", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("should get a [true] from [postNewEntries] service", async () => {
    // Given
    jest
      .spyOn(entriesRepo, "postNewEntries")
      .mockReturnValue(Promise.resolve(fixtures.postNewEntries));
    jest.spyOn(entriesService, "postNewEntries");
    // When
    const res = await entriesService.postNewEntries(fixtures.entriesBody.value);
    // Then
    if (res.isError) {
      throw Error();
    }
    expect(entriesRepo.postNewEntries).toBeCalled();
    expect(entriesService.postNewEntries).toBeCalled();
    expect(res.value).toBe(true);
  });

  test("should get an [Error] from postNewWEntries service", async () => {
    // Given
    jest
      .spyOn(entriesRepo, "postNewEntries")
      .mockReturnValue(Promise.resolve(fixtures.postNewEntriesError));
    jest.spyOn(entriesService, "postNewEntries");
    // When
    const res = await entriesService.postNewEntries(fixtures.entriesBody.value);
    // Then
    if (!res.isError) {
      throw Error();
    }
    expect(entriesRepo.postNewEntries).toBeCalled();
    expect(entriesService.postNewEntries).toBeCalled();
    expect(res.error).toEqual(Error());
  });

  test("should get a [Entry[]] model from [getListEntries] service", async () => {
    // Given
    jest
      .spyOn(entriesRepo, "getListEntries")
      .mockReturnValue(Promise.resolve(fixtures.entriesBody));
    jest.spyOn(entriesService, "getListEntries");
    // When
    const res = await entriesService.getListEntries(
      fixtures.getListEntriesParams
    );
    // Then
    if (res.isError) {
      throw Error();
    }
    expect(entriesRepo.getListEntries).toBeCalled();
    expect(entriesService.getListEntries).toBeCalled();
    expect(res.value).toEqual(fixtures.entriesBody.value);
  });

  test("should get an [Error] from getListEntries service", async () => {
    // Given
    jest
      .spyOn(entriesRepo, "getListEntries")
      .mockReturnValue(Promise.resolve(fixtures.postNewEntriesError));
    jest.spyOn(entriesService, "getListEntries");
    // When
    const res = await entriesService.getListEntries(
      fixtures.getListEntriesParams
    );
    // Then
    if (!res.isError) {
      throw Error();
    }
    expect(entriesRepo.getListEntries).toBeCalled();
    expect(entriesService.getListEntries).toBeCalled();
    expect(res.error).toEqual(Error());
  });
});

export {};
