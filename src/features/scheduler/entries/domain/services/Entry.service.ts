import { entriesRepo } from "../../infraestructure/repositories/Entry.repository";
import Entry from "../models/Entry";

export const entriesService = {
  postNewEntries: async (body: Entry[]) => {
    return await entriesRepo.postNewEntries(body);
  },
};
