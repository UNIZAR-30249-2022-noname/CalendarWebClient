import { uploadDataRepo } from "../../infraestructure/repositories/uploadData.repository";

export const UploadCSVService = {
  uploadCSV: async (params: string, privileges: string) => {
    const success = await uploadDataRepo.postCSV(params, privileges);
    // Proccess data

    // return it to component
    return success;
  },
};
