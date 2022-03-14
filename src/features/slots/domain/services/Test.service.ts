import { testRepo } from "../../infraestructure/repositories/test.repositories";

export const testService = {
  get: async () => {
    const data = await testRepo.getInf();
    return data;
  },
};
