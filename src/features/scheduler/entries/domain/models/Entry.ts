enum SubjectKind {
  theory,
  practices,
  problems,
}
type Time = {
  hour: number;
  min: number;
};

enum Week {
  A = "A",
  B = "B",
}

type Entry = {
  subject: string;
  week: Week;
  room: string;
  kind: SubjectKind;
  group: string;
  initTime: Time;
  endTime: Time;
};
export default Entry;
export type { Time };
export { SubjectKind, Week };
