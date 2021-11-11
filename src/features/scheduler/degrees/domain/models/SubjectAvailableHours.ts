type SubjectKind = 0 | 1 | 2;

type SubjectAvailableHours = {
  kind: SubjectKind;
  subject: string;
  hours: {
    remaining: number;
    total: number;
  };
};

export type { SubjectAvailableHours, SubjectKind };
