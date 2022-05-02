import { uploadDataRepo } from "../../infraestructure/repositories/uploadData.repository";

export const UploadCSVService = {
  uploadCSV: async (params: string) => {
    const success = await uploadDataRepo.postCSV(params);
    // Proccess data

    // return it to component
    return success;
  },
};
