import { SubjectKind, Week } from "./Entry";

export type EntryScheduler = {
  id?: number;
  title: string;
  week?: Week;
  room?: string;
  kind: SubjectKind;
  group?: string;
  start: Date;
  end: Date;
};
