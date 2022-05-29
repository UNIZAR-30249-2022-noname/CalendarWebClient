import { CSSProperties, useContext, useEffect, useState } from "react";
import { Calendar, DateRange, momentLocalizer, View } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import PopupAddEntry from "./PopUpAddEntry";
import Entry, { SubjectKind, Week } from "../../domain/models/Entry";
import EntryContent from "./EntryContent";
import moment from "moment";
import dateFormat from "dateformat";
import { entriesService } from "../../domain/services/Entry.service";
import {
  DegreeSubjectsContext,
  SelectedDegreeContext,
} from "../../../../../core/context/context";
import { notifications } from "../../../../../core/presentation/components/notifications/notifications";
import { Button, message, Row, Spin } from "antd";
import { SaveFilled } from "@ant-design/icons";
import { EntryScheduler } from "../../domain/models/EntryScheduler";
import { IcalButton } from "../../../exportData/ical/presentation/IcalButton";
require("moment/locale/es.js");
const DragAndDropCalendar = withDragAndDrop(Calendar as any);

type Props = {
  draggedEvent: any | null;
};
// Sources: https://github.com/jquense/react-big-calendar/blob/master/examples/demos/dndOutsideSource.js

const SchedulerCard = ({ draggedEvent }: Props) => {
  const selectedDegree = useContext(SelectedDegreeContext).store;
  const subjectList = useContext(DegreeSubjectsContext).store;
  const [selectedEvent, setSelectedEved] = useState<
    EntryScheduler | undefined
  >();
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [events, setEvents] = useState<EntryScheduler[]>([]);
  const [loading, setLoading] = useState(selectedDegree.degree != null);
  const [loadingPost, setLoadingPost] = useState(false);
  const [edittedEvent, setEdittedEvent] = useState(false);

  useEffect(() => {
    if (!subjectList) return;
    loadEntryList();
  }, [subjectList]);

  const loadEntryList = async () => {
    setLoading(true);
    const entryListRes = await entriesService.getListEntries(selectedDegree);
    if (entryListRes.isError) {
      setEvents([]);
      notifications.error("No se puedieron cargar las entradas del horario");
      setLoading(false);
      return;
    }
    setEvents(entriesService.loadEntries(entryListRes.value));
    setLoading(false);
  };

  const saveEntryList = async () => {
    setLoadingPost(true);
    const res = await entriesService.postNewEntries(
      entriesService.saveEntries(events),
      selectedDegree
    );
    setLoadingPost(false);
    if (res.isError) {
      notifications.error("Error al guardar los datos del horario");
    } else {
      message.success({ content: "Datos actualizados", duration: 1 });
    }
  };

  const onCreateEvent = (event: EntryScheduler, edit: boolean) => {
    setVisiblePopup(false);
    edit ? editEvent(event) : setEvents([...events, event]);
  };

  const onCancelCreateEvent = () => {
    setVisiblePopup(false);
  };

  const onDropFromOutside = (start: Date, end: Date) => {
    if (draggedEvent == null) return;
    newEvent({
      start,
      end,
      events: [
        {
          subject: draggedEvent.title,
          kind: draggedEvent.kind,
        },
      ],
    });
  };

  const newEvent = (event: any) => {
    event.end.setMinutes(event.end.getMinutes());
    setSelectedEved(event);
    setEdittedEvent(false);
    setVisiblePopup(true);
  };

  const removeEvent = (event: EntryScheduler, eventToRemove: Entry) => {
    let nextEvents: EntryScheduler[] = [];
    if (event.events.length === 1) {
      nextEvents = events?.filter((e) => e.id !== event.id);
      setEvents(nextEvents);
    } else {
      nextEvents = events.map((e) => {
        if (e.id === event.id) {
          e.events.filter((e) => e !== eventToRemove);
        }
        return e;
      });
      setEvents([...nextEvents, setNewDates(event, eventToRemove)]);
    }
  };

  const selectEvent = (event: EntryScheduler) => {
    setSelectedEved(event);
    setEdittedEvent(true);
    setVisiblePopup(true);
  };

  const moveEvent = ({ event, start, end }: any) => {
    let joined = false;
    let nextEvents = events.map((e) => {
      if (e.id !== event.id && checkJoinEvents(start, end, e)) {
        joined = true;
        return joinEvents(event, e);
      }
      if (e.id === event.id) return { ...e, start, end };
      return e;
    });
    if (joined) nextEvents = nextEvents.filter((e) => e.id !== event.id);
    setEvents(nextEvents);
  };

  const editEvent = (event: EntryScheduler) => {
    const nextEvents = events?.map((existingEvent) => {
      return existingEvent.id === event.id ? event : existingEvent;
    });
    setEvents(nextEvents);
  };

  const joinEvents = (
    event1: EntryScheduler,
    event2: EntryScheduler
  ): EntryScheduler => {
    return {
      id: event2.id,
      start: event2.start,
      end: event2.end,
      events: [...event2.events, ...event1.events],
    };
  };

  const checkJoinEvents = (
    start: Date,
    end: Date,
    event2: EntryScheduler
  ): boolean => {
    if (start.getDay() !== event2.start.getDay()) return false;
    if (
      dateFormat(end, "H:MM") === dateFormat(event2.end, "H:MM") &&
      dateFormat(start, "H:MM") === dateFormat(event2.start, "H:MM")
    )
      return true;
    return false;
  };

  const setNewDates = (
    event: EntryScheduler,
    eventToRemove: Entry
  ): EntryScheduler => {
    let start, end;
    // Friday
    if (event.start.getDay() === 4) {
      start = new Date(event.start.getDay() - 1);
    }
    start = new Date(event.start.getDay() + 1);
    end = new Date(event.start.getDay() + 1);
    end.setMinutes(start.getMinutes() + 20);
    return {
      id: Math.random() * 30,
      start,
      end,
      events: [eventToRemove],
    };
  };

  return (
    <div
      style={{
        padding: 10,
        paddingTop: 0,
        height: "calc(100% - 25px)",
      }}
    >
      {loading ? (
        <Spin spinning={loading} size="large" />
      ) : (
        <DragAndDropCalendar
          {...schedulerProps}
          events={events as any}
          onEventDrop={moveEvent}
          onEventResize={moveEvent}
          onSelectSlot={(e) =>
            newEvent({
              start: e.start as Date,
              end: e.end as Date,
              events: [],
            })
          }
          onSelectEvent={(e) => selectEvent(e as EntryScheduler)}
          onDropFromOutside={({ start, end }) =>
            onDropFromOutside(start as Date, end as Date)
          }
          components={{
            toolbar: () => null,
            event: (e) => (
              <EntryContent
                entry={e.event as EntryScheduler}
                removeEvent={removeEvent}
              />
            ),
          }}
        />
      )}
      <Row style={{ paddingTop: 5 }} justify="space-between">
        <Button
          type="primary"
          loading={loadingPost}
          onClick={saveEntryList}
          icon={<SaveFilled />}
          size="small"
        >
          Guardar
        </Button>
        <IcalButton />
      </Row>
      <PopupAddEntry
        event={selectedEvent}
        visible={visiblePopup}
        onOk={onCreateEvent}
        onCancel={onCancelCreateEvent}
        edit={edittedEvent}
      />
    </div>
  );
};

export default SchedulerCard;

/** --- Scheduler props **/

const localizer = momentLocalizer(moment);
const today = new Date();
const formats = {
  timeGutterFormat: "H:mm",
  eventTimeRangeFormat: (e: DateRange) => {
    return dateFormat(e.start, "H:MM") + " - " + dateFormat(e.end, "H:MM");
  },
  dayFormat: "dddd",
};

const schedulerProps = {
  selectable: true,
  formats: formats,
  step: 10,
  timeslots: 6,
  localizer: localizer,
  resizable: true,
  defaultView: "work_week" as View,
  views: ["work_week"] as View[],
  showMultiDayTimes: false,
  defaultDate: moment().toDate(),
  min: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 7),
  max: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 21),
  eventPropGetter: (e: any) => ({
    style: {
      backgroundColor: getBackGroundColor(e.events[0].kind),
    },
  }),
  style: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    border: "2px #9b9b9b solid",
    backgroundColor: "white",
    minWidth: 1000,
  } as CSSProperties,
};

const getBackGroundColor = (kind: SubjectKind) => {
  switch (kind) {
    case SubjectKind.theory:
    case SubjectKind.problems:
      return "#C0E0FF";
    case SubjectKind.practices:
      return "#FFE8B8";
    default:
      return "#626262";
  }
};
