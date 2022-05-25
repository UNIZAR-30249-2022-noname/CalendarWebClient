import { SubjectKind } from "../../../entries/domain/models/Entry";

type SubjectAvailableHours = {
  subject: string;
  theory: {
    remaining: number;
    total: number;
  };
  practice: {
    remaining: number;
    total: number;
  };
  exercises: {
    remaining: number;
    total: number;
  };
};
const newSubjectAvailableHours=(name:string):SubjectAvailableHours=>{
  return {
    subject:name,
    theory:{
      remaining:0,
      total:0},
    practice:{
      remaining:0,
      total:0},
    exercises:{
      remaining:0,
      total:0},
    }
  
  
  
}


export type { SubjectAvailableHours };
export {newSubjectAvailableHours}
