import { CSSProperties, useContext, useEffect, useState } from "react";
import { Calendar, DateRange, momentLocalizer, View } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import PopupAddEntry from "./PopUpAddEntry";
import { SubjectKind } from "../../domain/models/Entry";
import EntryContent from "./EntryContent";
import moment from "moment";
import dateFormat from "dateformat";
import { entriesService } from "../../domain/services/Entry.service";
import {
  DegreeSubjectsContext,
  SelectedDegreeContext,
} from "../../../../../core/context/context";
import { notifications } from "../../../../../core/presentation/components/notifications/notifications";
import { Button, Row, Spin } from "antd";
import { SaveFilled } from "@ant-design/icons";
require("moment/locale/es.js");
const DragAndDropCalendar = withDragAndDrop(Calendar as any);

type Props = {
  draggedEvent: any;
};
// Sources: https://github.com/jquense/react-big-calendar/blob/master/examples/demos/dndOutsideSource.js

const SchedulerCard = ({ draggedEvent }: Props) => {
  const selectedDegree = useContext(SelectedDegreeContext).store;
  const subjectLists = useContext(DegreeSubjectsContext).store;
  const [selectedEvent, setSelectedEved] = useState<any>({});
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(selectedDegree.degree != null);
  const [loadingPost, setLoadingPost] = useState(false);

  useEffect(() => {
    if (subjectLists.length === 0) return;
    loadEntryList();
  }, [subjectLists]);

  const loadEntryList = async () => {
    setLoading(true);
    const entryListRes = await entriesService.getListEntries(selectedDegree);
    if (entryListRes.isError) {
      notifications.error("No se puedieron cargar las entradas del horario");
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
    }
  };

  const onCreateEvent = (event: any) => {
    setVisiblePopup(false);
    setEvents([...events, event]);
  };

  const onCancelCreateEvent = () => {
    setVisiblePopup(false);
  };

  const onDropFromOutside = (start: Date, end: Date) => {
    newEvent({
      title: draggedEvent.title,
      kind: draggedEvent.kind,
      start,
      end,
    });
  };

  const newEvent = (event: any) => {
    event.end.setMinutes(event.end.getMinutes());
    setSelectedEved(event);
    setVisiblePopup(true);
  };

  const removeEvent = (event: any) => {
    console.log(events);
    // FIXME: Drag and Drop calendar bug when removing events
    // const nextEvents = events?.filter((e) => e.id !== event.id);
    // setEvents(nextEvents);
  };

  const selectEvent = (event: any) => {
    setVisiblePopup(true);
    setSelectedEved(event);
  };

  const moveEvent = ({ event, start, end }: any) => {
    const nextEvents = events?.map((existingEvent) => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });
    setEvents(nextEvents);
  };

  const resizeEvent = ({ event, start, end }: any) => {
    const nextEvents = events?.map((existingEvent: any) => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });
    setEvents(nextEvents);
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
          events={events}
          onEventDrop={moveEvent}
          onEventResize={resizeEvent}
          onSelectSlot={newEvent}
          onSelectEvent={selectEvent}
          onDropFromOutside={({ start, end }) =>
            onDropFromOutside(start as Date, end as Date)
          }
          components={{
            toolbar: () => null,
            event: (e) => (
              <EntryContent event={e.event} removeEvent={removeEvent} />
            ),
          }}
        />
      )}
      <Row style={{ paddingTop: 5 }}>
        <Button
          type="primary"
          loading={loadingPost}
          onClick={saveEntryList}
          icon={<SaveFilled />}
          size="small"
        >
          Guardar
        </Button>
      </Row>
      <PopupAddEntry
        event={selectedEvent}
        visible={visiblePopup}
        onOk={onCreateEvent}
        onCancel={onCancelCreateEvent}
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
      backgroundColor: getBackGroundColor(e.kind),
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
