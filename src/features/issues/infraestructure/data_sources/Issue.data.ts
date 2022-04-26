import { http } from "../../../../core/backend/http/http";
import { httpServices } from "../../../../core/backend/http/services";
import { Result } from "../../../../core/config/result";
import { Issue } from "../../domain/models/Issue";

let serviceCreate = httpServices.createIssue;
let serviceDelete = httpServices.deleteIssue;
let serviceGetAll = httpServices.getAllIssues;
let serviceChangeState = httpServices.changeIssueState;
let serviceDownload = httpServices.downloadIssues;

export const issueData = {
  create: async (issue: Issue): Promise<Result<boolean>> => {
    try {
      const res = await http.post(serviceCreate, issue);
      if (res.status === 200) {
        return { isError: false, value: true };
      } else {
        return { isError: true, error: new Error() };
      }
    } catch (e) {
      console.error((e as Error).message);
      return { isError: true, error: e as Error };
    }
  },
  delete: async (issue: string): Promise<Result<boolean>> => {
    try {
      const res = await http.get(serviceDelete, issue);
      if (res.status === 200) {
        return { isError: false, value: true };
      } else {
        return { isError: true, error: new Error() };
      }
    } catch (e) {
      console.error((e as Error).message);
      return { isError: true, error: e as Error };
    }
  },

  changeState: async (
    issue: string,
    newState: number
  ): Promise<Result<boolean>> => {
    try {
      const res = await http.get(serviceChangeState, {
        issue: issue,
        state: newState,
      });
      console.log(res);

      if (res.status === 200) {
        return { isError: false, value: true };
      } else {
        return { isError: true, error: new Error() };
      }
    } catch (e) {
      console.error((e as Error).message);

      return { isError: true, error: e as Error };
    }
  },

  getAll: async (): Promise<Result<Issue[]>> => {
    try {
      const res = await http.get(serviceGetAll);
      if (res.status === 200) {
        return { isError: false, value: res.data };
      } else {
        return { isError: true, error: new Error() };
      }
    } catch (e) {
      console.error((e as Error).message);
      return { isError: true, error: e as Error };
    }
  },

  download: async (): Promise<Result<Uint8Array>> => {
    try {
      const res = await http.get(serviceDownload, {
        responseType: "arraybuffer",
      });
      if (res.status === 200) {
        return { isError: false, value: res.data };
      } else {
        return { isError: true, error: new Error() };
      }
    } catch (e) {
      console.error((e as Error).message);
      return { isError: true, error: e as Error };
    }
  },
};
