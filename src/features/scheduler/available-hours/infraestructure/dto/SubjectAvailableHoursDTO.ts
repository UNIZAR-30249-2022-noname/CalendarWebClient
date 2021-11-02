type SubjectKind = 0 | 1 | 2;

type SubjectAvailableHoursDTO = {
  kind: SubjectKind;
  subject: string;
  remaining: number;
  total: number;
};

export default SubjectAvailableHoursDTO;
