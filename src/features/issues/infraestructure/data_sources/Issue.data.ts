import { http } from "../../../../core/backend/http/http";
import { httpServices } from "../../../../core/backend/http/services";
import { Result } from "../../../../core/config/result";
import { Issue } from "../../domain/models/Issue";


let serviceCreate = httpServices.createIssue
let serviceDelete = httpServices.deleteIssue
let serviceGetAll = httpServices.getAllIssues

export const issueData = {
    create:  async (params:Issue) :Promise<Result<boolean>> => {
        try {
            const res = await http.get(serviceCreate,params);
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
    delete:  async (params:Issue) :Promise<Result<boolean>> => {
      try {
          const res = await http.get(serviceDelete,params);
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

  getAll:  async () :Promise<Result<Issue[]>> => {
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
  
}