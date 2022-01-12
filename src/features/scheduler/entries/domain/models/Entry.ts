enum SubjectKind {
  error,
  theory,
  problems,
  practices,
  seminar,
}
type Time = {
  hour: number;
  min: number;
};

enum WeekDay {
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
}

enum Week {
  A = "A",
  B = "B",
  UNIQUE = "Unico",
}

type Entry = {
  subject: string;
  week: Week;
  room: string;
  kind: SubjectKind;
  group: string;
  initTime: Time;
  endTime: Time;
  weekDay: WeekDay;
  desc?: string;
};
export default Entry;
export type { Time };
export { SubjectKind, Week, WeekDay };
