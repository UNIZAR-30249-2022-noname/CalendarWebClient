import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { httpServices } from "../../../../../../../core/backend/http/services";
import { degreeAvailableHoursData } from "../../../../../../../features/scheduler/available-hours/infraestructure/data_sources/http/AvailableHours.data";
import { fixtures } from "./fixtures";

describe("get available hours", () => {
  let mock: MockAdapter;
  let service: string = httpServices.degreeAvailableHours;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  describe.only("Good request", () => {
    test("should get all degree subjects with their available hours", async () => {
      // Given
      let res = fixtures.getAvailableHours;
      mock.onGet(service).reply(200, res);
      // When
      let subjectList = await degreeAvailableHoursData.getDegreeAvailableHours(
        fixtures.DegreeParams
      );
      // Then
      if (subjectList.isError) {
        throw Error();
      }
      expect(subjectList.value.sort()).toEqual(res.sort());
    });
  });

  describe("Bad request", () => {
    test("should fail when trying to get available hours - Network Error", async () => {
      // Given
      mock.onGet(service).networkErrorOnce();
      // When
      const res = await degreeAvailableHoursData.getDegreeAvailableHours(
        fixtures.DegreeParams
      );
      // Then
      if (!res.isError) {
        throw Error();
      }
      expect(res.error).toEqual(Error());
    });

    test("should fail when traying to get available hours - timeout", async () => {
      // Given
      mock.onGet(service).timeoutOnce();
      // When
      const res = await degreeAvailableHoursData.getDegreeAvailableHours(
        fixtures.DegreeParams
      );
      // Then
      if (!res.isError) {
        throw Error();
      }
      expect(res.error).toEqual(Error());
    });
  });
});

export {};
