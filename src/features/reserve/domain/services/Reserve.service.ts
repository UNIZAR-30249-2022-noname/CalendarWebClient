import { Result } from "../../../../core/config/result";
import { ReserveRepo } from "../../infraestructure/repositories/Reserve.repositories";
import { Reserve } from "../models/Reserve";


export const ReserveService = {
  getPerUser: async (user: string): Promise<Result<Reserve[]>>=> {
    const data = await ReserveRepo.getPerUser(user);
    return data;
  },
};
