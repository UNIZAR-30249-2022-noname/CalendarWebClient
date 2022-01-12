import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { httpServices } from "../../../../../../../core/backend/http/services";
import { icalData } from "../../../../../../../features/scheduler/exportData/ical/infraestructure/data_sources/Ical.data";
import { fixtures } from "./fixtures";

describe("ExportData", () => {
  let mock: MockAdapter;
  let serviceGetIcal: string = httpServices.ical;


  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  describe("Get ical", () => {
    describe("Good request", () => {
      test("should return a string", async () => {
        // Given
        
        mock.onGet(serviceGetIcal ).reply(200,"calendar")  ;
        // When
        let file = await icalData.getIcal(
            fixtures.params
        );
        // Then
        if (file.isError) {
          throw Error();
        }
        expect(file.value ).toBe("calendar");
      });
    });

    describe("Bad request", () => {
      test("should fail when trying to get an ics string - Network Error", async () => {
        // Given
     
        mock.onGet(serviceGetIcal ).networkErrorOnce();
        // When
        let file = await icalData.getIcal(
            fixtures.params
        );
        // Then
        if (!file.isError) {
          throw Error();
        }
        expect(file.error).toEqual(Error("Network Error"));
      });

      test("should fail when trying to get an ics string - timeout", async () => {
        // Given
       
        mock.onGet(serviceGetIcal ).timeoutOnce();
        // When
        let file = await icalData.getIcal(
            fixtures.params
        );
        // Then
        if (!file.isError) {
          throw Error();
        }
        expect(file.error).toEqual(Error("timeout of 0ms exceeded"));
      });

      test("should fail when is a bad response", async () => {
        // Given
        
        mock.onGet(serviceGetIcal ).reply(500);
        // When
        let file = await icalData.getIcal(
            fixtures.params
        );
        // Then
        if (!file.isError) {
          throw Error();
        }
        expect(file.error).toEqual(Error("Request failed with status code 500"));
      });

      test("should fail when is a good response but no the expected one", async () => {
        // Given
        
        mock.onGet(serviceGetIcal ).reply(201);
        // When
        let file = await icalData.getIcal(
            fixtures.params
        );
        // Then
        if (!file.isError) {
          throw Error();
        }
        expect(file.error).toEqual(Error());
      });
    });
  });

});

export {};
