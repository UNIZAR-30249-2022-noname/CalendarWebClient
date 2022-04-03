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

        
    },

    delete: async (issue:string) :Promise<Result<boolean>> => {
        const res = await issueData.delete(issue)
        if (res.isError) {
            return { isError: true, error: res.error };
          }
          return res

        
    },

    changeState: async (issue:string,newState: number) :Promise<Result<boolean>> => {
        
        const res = await issueData.changeState(issue,newState)
        if (res.isError) {
            return { isError: true, error: res.error };
          }
          return res

        
    },

    getAll: async () :Promise<Result<Issue[]>> => {
        const res = await issueData.getAll()
        if (res.isError) {
            return { isError: true, error: res.error };
          }
          return res

    }
}