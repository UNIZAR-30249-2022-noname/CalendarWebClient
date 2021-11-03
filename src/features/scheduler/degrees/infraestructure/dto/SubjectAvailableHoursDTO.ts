type SubjectKind = 0 | 1 | 2;

type SubjectAvailableHoursDTO = {
  Kind: SubjectKind;
  Subject: string;
  Remaining: number;
  Max: number;
};

export default SubjectAvailableHoursDTO;
