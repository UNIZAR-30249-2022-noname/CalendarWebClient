import { IndexSignatureDeclaration } from "typescript";
import { Result } from "../../../../core/config/result";
import { IssueRepo } from "../../infraestructure/repositories/Issue.repository";
import { CurrentIssue, Issue, IssuesLists } from "../models/Issue";

export const IssueService = {
  create: async (params:Issue) :Promise<Result<boolean>> => {
    const data: Result<boolean> =  await IssueRepo.create(params)
    return data;
  },
  delete: async (params:Issue) :Promise<Result<boolean>> => {
    const data: Result<boolean> =  await IssueRepo.delete(params)
    return data;
  },


  getAll: async () :Promise<Result<IssuesLists>> => {
    const data: Result<Issue[]> =  await IssueRepo.getAll()
    var lists:IssuesLists={new:[],current:[],completed:[]}
    if(!data.isError){
      data.value.forEach((issue)=>{
        if(issue.state===CurrentIssue){
          lists.current.push(issue)
        }
        else if(issue.state===CurrentIssue){
          lists.completed.push(issue)
        }
        else{
          lists.new.push(issue)
        }
      })

      return {isError:false,value:lists}

    }else{
      return { isError: true, error:data.error};
    }
    
    
  },
};
