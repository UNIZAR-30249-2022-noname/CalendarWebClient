import { Result } from "../../../../core/config/result";
import { IssueRepo } from "../../infraestructure/repositories/Issue.repository";
import { Issue } from "../models/Issue";

export const IssueService = {
  create: async (params:Issue) :Promise<Result<boolean>> => {
    const data: Result<boolean> =  await IssueRepo.create(params)
    return data;
  },
};
