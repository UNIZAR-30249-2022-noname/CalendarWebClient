import { session } from "../../../../features/auth/domain/services/session.service";

//FIXME: hardcoded
describe("Session", () => {
  test("should recover session", () => {
    const user = session.getUser();
    expect(user).toEqual({
      name: "Jorge",
      privileges: "professor",
    });
  });
});

export {};
