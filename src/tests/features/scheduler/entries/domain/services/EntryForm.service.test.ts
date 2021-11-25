import {
  SubjectKind,
  Week,
} from "../../../../../../features/scheduler/entries/domain/models/Entry";
import { entryForm } from "../../../../../../features/scheduler/entries/domain/services/EntryForm.service";

describe("Entry form", () => {
  const event = {
    start: new Date(),
    end: new Date(),
    title: "Gestión de proyecto software",
    kind: SubjectKind.theory,
    week: Week.A,
    room: "0.01",
  };
  let loadedEvent: any;
  let newEntry: any;

  describe("should check if problems are disabled", () => {
    test("should return true if [SubjectKind] is [SubjectKind.theory]", () => {
      const res = entryForm.checkIfProblemsDisabled(SubjectKind.theory);
      expect(res).toBe(true);
    });

    test("should return false if [SubjectKind] is different from [SubjectKind.theory]", () => {
      let res = entryForm.checkIfProblemsDisabled(SubjectKind.practices);
      expect(res).toBe(false);
      res = entryForm.checkIfProblemsDisabled(SubjectKind.problems);
      expect(res).toBe(false);
    });
  });

  describe("load info", () => {
    test("should load an entry information correctly to the form", () => {
      loadedEvent = entryForm.loadData(event);
    });
  });

  describe("create entry", () => {
    test("should create an entry information correctly from the form", () => {
      newEntry = {
        id: 0,
        title: loadedEvent.subject,
        slots: "addas",
        start: event.start,
        end: event.end,
        week: loadedEvent.week,
        kind: loadedEvent.kind,
        room: loadedEvent.room,
      };
      entryForm.createEntry(event, loadedEvent, (newEvent: any) => {
        newEvent["id"] = 0;
        expect(newEvent).toEqual(newEntry);
      });
    });
  });
});
