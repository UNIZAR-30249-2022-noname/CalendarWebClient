import { SubjectKind } from "../../../entries/domain/models/Entry";

type SubjectAvailableHoursDTO = {
  Kind: SubjectKind;
  Subject: string;
  Remaining: number;
  Max: number;
};

export default SubjectAvailableHoursDTO;
