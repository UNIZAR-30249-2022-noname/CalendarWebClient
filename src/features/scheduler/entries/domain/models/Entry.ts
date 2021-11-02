type Kind = 0 | 1 | 2;
type Time = {
  hour: number;
  min: number;
};

type Entry = {
  subject: string;
  week: string;
  room: string;
  kind: Kind;
  group: string;
  initTime: Time;
  endTime: Time;
};
export default Entry;
