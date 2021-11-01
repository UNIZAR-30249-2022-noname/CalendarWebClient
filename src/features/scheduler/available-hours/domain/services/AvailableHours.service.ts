import { degreeAvailableHoursRepo } from "../../infraestructure/repositories/AvailableHours.repositories";

export const degreeAvailableHoursService = {
  getDegreeAvailableHours: async () => {
    const titleList = await degreeAvailableHoursRepo.getDegreeAvailableHours();
    // Proccess data

    // return it to component
    console.log(titleList);
    return titleList;
  },
};
