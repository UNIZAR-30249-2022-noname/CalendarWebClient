import { degreePropertiesRepo } from "../../infraestructure/repositories/degreeProperties.repositories";

export const degreePropertiesService = {
  getDegrees: async () => {
    const degreeProperties = await degreePropertiesRepo.getDegrees();
    // Proccess data

    // return it to component
    return degreeProperties;
  },
};
