import Entry, { SubjectKind, Week } from "./Entry";

export type EntryScheduler = {
  id?: number;
  start: Date;
  end: Date;
  events: Entry[];
};
