import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { httpServices } from "../../../../../../../core/backend/http/services";
import { entriesData } from "../../../../../../../features/scheduler/entries/infraestructure/data_sources/http/Entry.data";
import { fixtures } from "./fixtures";

describe("Entries", () => {
  let mock: MockAdapter;
  let service: string = httpServices.entries;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  describe("Post new entries", () => {
    describe("Good request", () => {
      test("should post a list of new [Entry] correctly", async () => {
        // Given
        let body = fixtures.postEntriesBody;
        mock.onPost(service, body).reply(200);
        // When
        let subjectList = await entriesData.postNewEntries(body);
        // Then
        if (subjectList.isError) {
          throw Error();
        }
        expect(subjectList.value).toBe(true);
      });
    });

    describe("Bad request", () => {
      test("should fail when trying to post new [Entry] - Network Error", async () => {
        // Given
        let body = fixtures.postEntriesBody;
        mock.onPost(service, body).networkErrorOnce();
        // When
        const res = await entriesData.postNewEntries(body);
        // Then
        if (!res.isError) {
          throw Error();
        }
        expect(res.error).toEqual(Error());
      });

      test("should fail when trying to post new [Entry] - timeout", async () => {
        // Given
        let body = fixtures.postEntriesBody;
        mock.onGet(service, body).timeoutOnce();
        // When
        const res = await entriesData.postNewEntries(body);
        // Then
        if (!res.isError) {
          throw Error();
        }
        expect(res.error).toEqual(Error());
      });

      test("should fail when trying to post new [Entry] - Not found", async () => {
        // Given
        let body = fixtures.postEntriesBody;
        mock.onGet(service, body).reply(404);
        // When
        const res = await entriesData.postNewEntries(body);
        // Then
        if (!res.isError) {
          throw Error();
        }
        expect(res.error).toEqual(Error());
      });
    });
  });
});

export {};
