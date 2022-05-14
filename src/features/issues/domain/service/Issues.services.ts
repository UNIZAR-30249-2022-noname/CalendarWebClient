import { IndexSignatureDeclaration } from "typescript";
import { Result } from "../../../../core/config/result";
import { IssueRepo } from "../../infraestructure/repositories/Issue.repository";
import {
  CompletedIssue,
  CurrentIssue,
  Issue,
  IssuesLists,
} from "../models/Issue";

export const IssueService = {
  create: async (issue: Issue): Promise<Result<boolean>> => {
    const data: Result<boolean> = await IssueRepo.create(issue);
    return data;
  },
  delete: async (issue: string): Promise<Result<boolean>> => {
    const data: Result<boolean> = await IssueRepo.delete(issue);
    return data;
  },

  changeState: async (
    issue: string,
    newState: number
  ): Promise<Result<boolean>> => {
    const data: Result<boolean> = await IssueRepo.changeState(issue, newState);
    return data;
  },

  getAll: async (): Promise<Result<IssuesLists>> => {
    const data: Result<Issue[]> = await IssueRepo.getAll();
    var lists: IssuesLists = { new: [], current: [], completed: [] };
    if (!data.isError) {
      data.value.forEach((issue) => {
        if (issue.state === CurrentIssue) {
          lists.current.push(issue);
        } else if (issue.state === CompletedIssue) {
          lists.completed.push(issue);
        } else {
          lists.new.push(issue);
        }
      });

      return { isError: false, value: lists };
    } else {
      return { isError: true, error: data.error };
    }
  },

  download: async (building: string): Promise<Result<Uint8Array>> => {
    const data: Result<Uint8Array> = await IssueRepo.download(building);
    if (!data.isError) {
      return { isError: false, value: data.value };
    } else {
      return { isError: true, error: data.error };
    }
  },
};
