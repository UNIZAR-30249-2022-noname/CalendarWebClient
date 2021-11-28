import { SubjectKind } from "../../../entries/domain/models/Entry";

type SubjectAvailableHours = {
  kind: SubjectKind;
  subject: string;
  hours: {
    remaining: number;
    total: number;
  };
};

export type { SubjectAvailableHours };
