import moment from "moment";
import { SubjectKind } from "../models/Entry";

export const entryForm = {
  createEntry: (event: any, values: any, onOk: Function) => {
    event.start.setHours(values.time[0].hours());
    event.start.setMinutes(values.time[0].minutes());
    event.end.setHours(values.time[1].hours());
    event.end.setMinutes(values.time[1].minutes());
    onOk({
      id: Math.random() * 30,
      title: values.subject,
      slots: "addas",
      start: event.start,
      end: event.end,
      week: values.week,
      kind: values.kind,
      room: values.room,
      group: values.group,
    });
  },
  loadData: (event: any) => {
    return {
      time: [
        event.start &&
          moment(
            `${event.start.getHours()}:${event.start.getMinutes()}`,
            "HH:mm"
          ),
        event.end &&
          moment(`${event.end.getHours()}:${event.end.getMinutes()}`, "HH:mm"),
      ],
      subject: event.title,
      kind: event.kind ?? SubjectKind.theory,
      week: event.week,
      room: event.room,
      group: event.group,
    };
  },
  checkIfProblemsDisabled: (kind: SubjectKind) => {
    return kind == null || kind === SubjectKind.theory;
  },
};
