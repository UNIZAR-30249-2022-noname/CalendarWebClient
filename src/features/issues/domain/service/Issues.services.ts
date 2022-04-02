import { Result } from "../../../../core/config/result";
import { IssueRepo } from "../../infraestructure/repositories/Issue.repository";
import { CreateIssueFormValues } from "../models/CreateIssueFormValues";

export const IssueService = {
  create: async (params:CreateIssueFormValues) :Promise<Result<boolean>> => {
    const data: Result<boolean> =  await IssueRepo.create(params)
    return data;
  },
};
