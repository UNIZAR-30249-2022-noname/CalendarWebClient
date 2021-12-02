import { useContext, useEffect, useState } from "react";
import { Calendar, DateRange, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import PopupAddEntry from "./PopUpAddEntry";
import { SubjectKind } from "../../domain/models/Entry";
import { EntryContent } from "./EntryContent";
import moment from "moment";
import dateFormat from "dateformat";
import { entriesService } from "../../domain/services/Entry.service";
import {
  DegreeSubjectsContext,
  SelectedDegreeContext,
} from "../../../../../core/context/context";
import { notifications } from "../../../../../core/presentation/components/notifications/notifications";
import { Button, Layout, Spin } from "antd";
import { SaveFilled } from "@ant-design/icons";
require("moment/locale/es.js");
const DragAndDropCalendar = withDragAndDrop(Calendar as any);

const localizer = momentLocalizer(moment);

type Props = {
  draggedEvent: any;
};
const today = new Date();
const formats = {
  timeGutterFormat: "H:mm",
  eventTimeRangeFormat: (e: DateRange) => {
    return dateFormat(e.start, "H:MM") + " - " + dateFormat(e.end, "H:MM");
  },
  dayFormat: "dddd",
};

const { Footer, Content } = Layout;
// Sources: https://github.com/jquense/react-big-calendar/blob/master/examples/demos/dndOutsideSource.js

const SchedulerCard = ({ draggedEvent }: Props) => {
  const selectedDegree = useContext(SelectedDegreeContext).store;
  const subjectLists = useContext(DegreeSubjectsContext).store;
  const [selectedEvent, setselectedEvent] = useState<any>({});
  const [visiblePopup, setvisiblePopup] = useState(false);
  const [events, setevents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingPost, setLoadingPost] = useState(false);

  useEffect(() => {
    if (subjectLists.length === 0) return;
    loadEntryList();
  }, [subjectLists]);

  const loadEntryList = async () => {
    setLoading(true);
    const entryListRes = await entriesService.getListEntries(selectedDegree);
    setLoading(false);
    if (entryListRes.isError) {
      notifications.error("No se puedieron cargar las entradas del horario");
      return;
    }
    setevents(entriesService.loadEntries(entryListRes.value));
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

  const onDropFromOutside = (start: Date, end: Date) => {
    newEvent({
      title: draggedEvent.title,
      kind: draggedEvent.kind,
      start,
      end,
    });
  };

  const moveEvent = ({ event, start, end }: any) => {
    const nextEvents = events?.map((existingEvent) => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });
    setevents(nextEvents);
  };

  const resizeEvent = ({ event, start, end }: any) => {
    const nextEvents = events?.map((existingEvent: any) => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });
    setevents(nextEvents);
  };

  const newEvent = (event: any) => {
    event.end.setMinutes(event.end.getMinutes() + 40);
    setselectedEvent(event);
    setvisiblePopup(true);
  };

  const selectEvent = (event: any) => {
    setvisiblePopup(true);
    setselectedEvent(event);
  };

  const onCreateEvent = (event: any) => {
    setvisiblePopup(false);
    setevents([...events, event]);
  };

  const onCancelCreateEvent = () => {
    setvisiblePopup(false);
  };

  return (
    <Layout style={{ height: "100%", padding: 10 }}>
      <Content>
        {loading ? (
          <Spin spinning={loading} size="large" />
        ) : (
          <DragAndDropCalendar
            selectable
            formats={formats}
            step={10}
            timeslots={6}
            localizer={localizer}
            events={events}
            onEventDrop={moveEvent}
            resizable
            onEventResize={resizeEvent}
            onSelectSlot={newEvent}
            onSelectEvent={(event) => selectEvent(event)}
            defaultView={"work_week"}
            views={["work_week"]}
            showMultiDayTimes={false}
            defaultDate={moment().toDate()}
            min={
              new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate(),
                7
              )
            }
            max={
              new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate(),
                21
              )
            }
            eventPropGetter={(e: any) => ({
              style: {
                backgroundColor:
                  e.kind === SubjectKind.practices ? "#FFE8B8" : "#C0E0FF",
              },
            })}
            onDropFromOutside={({ start, end }) =>
              onDropFromOutside(start as Date, end as Date)
            }
            components={{
              toolbar: () => null,
              event: (e) => <EntryContent event={e.event} />,
            }}
            style={{
              height: "100%",
              overflowY: "scroll",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              border: "2px #9b9b9b solid",
            }}
          />
        )}

        <PopupAddEntry
          event={selectedEvent}
          visible={visiblePopup}
          onOk={onCreateEvent}
          onCancel={onCancelCreateEvent}
        />
      </Content>
      <Footer style={{ padding: 0, paddingTop: 5 }}>
        <Button
          type="primary"
          loading={loadingPost}
          onClick={saveEntryList}
          icon={<SaveFilled />}
          size="small"
        >
          Guardar
        </Button>
      </Footer>
    </Layout>
  );
};

export default SchedulerCard;
