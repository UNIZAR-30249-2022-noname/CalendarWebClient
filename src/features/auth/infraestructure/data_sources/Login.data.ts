import { http } from "../../../../core/backend/http/http";
import { httpServices } from "../../../../core/backend/http/services";
import { Result } from "../../../../core/config/result";
import UserDTO from "../dto/UserDTO";

let service = httpServices.login
export const loginData = {
    login: async (username: String):Promise<Result<UserDTO>>=>{
        try {
            const res = await http.get(service, {username: username});
            if (res.status === 200) {
              return { isError: false, value: res.data };
            } else {
              return { isError: true, error: new Error() };
            }
          } catch (e) {
            console.error((e as Error).message);
            return { isError: true, error: e as Error };
          }
    },
}