import { Result } from "../../../../core/config/result";
import { CreateIssueFormValues } from "../models/CreateIssueFormValues";

export const IssueService = {
  create: async (params:CreateIssueFormValues) :Promise<Result<boolean>> => {
    const data: Result<boolean> =  {isError: false, value: true}
    return data;
  },
};
