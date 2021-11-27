import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { httpServices } from "../../../../../../../core/backend/http/services";
import { degreePropertiesData } from "../../../../../../../features/scheduler/available-hours/infraestructure/data_sources/http/DegreeProperties.data";
import { fixtures } from "./fixtures";

describe("get all degrees", () => {
  let mock: MockAdapter;
  let service: string = httpServices.listDegrees;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  describe.only("Good request", () => {
    test("should get all degrees with them properties", async () => {
      // Given
      let res = fixtures.listDegrees;
      mock.onGet(service).reply(200, res);
      // When
      let subjectList = await degreePropertiesData.getDegrees();
      // Then
      if (subjectList.isError) {
        throw Error();
      }
      expect(subjectList.value.sort()).toEqual(res.sort());
    });
  });

  describe("Bad request", () => {
    test("should fail when trying to get  all degrees - Network Error", async () => {
      // Given
      mock.onGet(service).networkErrorOnce();
      // When
      const res = await degreePropertiesData.getDegrees(); 
      // Then
      if (!res.isError) {
        throw Error();
      }
      expect(res.error).toEqual(Error());
    });

    test("should fail when traying to get  all degrees - timeout", async () => {
      // Given
      mock.onGet(service).timeoutOnce();
      // When
      const res = await degreePropertiesData.getDegrees();
      // Then
      if (!res.isError) {
        throw Error();
      }
      expect(res.error).toEqual(Error());
    });
  });
});

export {};
