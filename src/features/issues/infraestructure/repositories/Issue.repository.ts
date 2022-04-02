import { Result } from "../../../../core/config/result";
import { Issue } from "../../domain/models/Issue";
import { issueData } from "../data_sources/Issue.data";

export const IssueRepo = {
    create: async (params:Issue) :Promise<Result<boolean>> => {
        const res = await issueData.create(params)
        if (res.isError) {
            return { isError: true, error: res.error };
          }
          return res

        
    }
}