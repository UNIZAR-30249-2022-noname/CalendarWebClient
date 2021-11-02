type Kind = 0 | 1 | 2;

type Entry = {
  subject: string;
  week: string;
  room: string;
  kind: Kind;
  group: string;
  initTime: Date;
  endTime: Date;
};
export default Entry;
