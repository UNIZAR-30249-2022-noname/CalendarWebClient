import { Result } from "../../../../core/config/result";
import User, { Privileges } from "../../domain/models/User";
import { loginData } from "../data_sources/Login.data";

const setPrivileges = (privilegeName: String): Privileges => {
  switch (privilegeName) {
    case "professor":
      return "professor";
    case "janitor":
      return "janitor";
    case "coordinator":
      return "coordinator";

    default:
      return "none";
  }
};

export const UserRepo = {
  getCredentials: async (username: String): Promise<Result<User>> => {
    const res = await loginData.login(username);
    if (res.isError) return { isError: true, error: res.error };

    const user = {
      name: res.value.name,
      privileges: setPrivileges(res.value.privileges),
    };
    return { isError: false, value: user };
  },
};
