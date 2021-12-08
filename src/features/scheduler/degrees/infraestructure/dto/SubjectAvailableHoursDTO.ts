import { SubjectKind } from "../../../entries/domain/models/Entry";

type SubjectAvailableHoursDTO = {
  MaxHours: number;
  MaxMin: number;
  Subject: Subject;
  RemainingHours: number;
  RemainingMin: number;
 
};


type Subject = {
  Kind : SubjectKind
  Name: string

}

export default SubjectAvailableHoursDTO;
