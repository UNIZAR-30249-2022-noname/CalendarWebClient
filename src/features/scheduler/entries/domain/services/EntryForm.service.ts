import moment from "moment";
import { SubjectKind } from "../models/Entry";
import { EntryScheduler } from "../models/EntryScheduler";

export const entryForm = {
  createEntry: (
    event: EntryScheduler,
    values: any,
    onOk: (e: EntryScheduler, edit: boolean) => void,
    edit: boolean
  ) => {
    event.start.setHours(values.time[0].hours(), values.time[0].minutes());
    event.end.setHours(values.time[1].hours(), values.time[1].minutes());
    onOk(
      {
        id: Math.random() * 30,
        start: event.start,
        end: event.end,
        events: [
          {
            subject: values.subject,
            week: values.week,
            kind: values.kind,
            room: values.room,
            group: values.group,
            weekDay: event.events[0]?.weekDay ?? 1,
            desc: values.desc,
            initTime: {
              hour: values.time[0].hours(),
              min: values.time[0].minutes(),
            },
            endTime: {
              hour: values.time[1].hours(),
              min: values.time[1].minutes(),
            },
          },
        ],
      },
      edit
    );
  },
  loadData: (event: EntryScheduler) => {
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
      subject: event.events[0]?.subject,
      kind: event.events[0]?.kind ?? SubjectKind.theory,
      week: event.events[0]?.week,
      room: event.events[0]?.room,
      group: event.events[0]?.group,
      desc: event.events[0]?.desc,
    };
  },
  checkIfProblemsDisabled: (kind: SubjectKind) => {
    return kind == null || kind === SubjectKind.theory;
  },
  checkIfNotPractices: (kind: SubjectKind) => {
    return kind == null || kind !== SubjectKind.practices;
  },
};
