import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import PopupAddEntry from "./PopUpAddEntry";
import { SubjectKind } from "../../domain/models/Entry";
import { EntryContent } from "./EntryContent";
import moment from "moment";
import dateFormat from "dateformat";
const DragAndDropCalendar = withDragAndDrop(Calendar as any);

const localizer = momentLocalizer(moment);

type Props = {
  draggedEvent: any;
};

// Sources: https://github.com/jquense/react-big-calendar/blob/master/examples/demos/dndOutsideSource.js
let today = new Date();
//FIXME: refactor component
const SchedulerCard = ({ draggedEvent }: Props) => {
  const [selectedEvent, setselectedEvent] = useState<any>({});
  const [visiblePopup, setvisiblePopup] = useState(false);
  const [events, setevents] = useState<any[]>([]);

  const onDropFromOutside = ({ start, end, allDay }: any) => {
    newEvent({
      title: draggedEvent.title,
      kind: draggedEvent.kind,
      start,
      end,
      allDay,
    });
  };

  const moveEvent = ({
    event,
    start,
    end,
    isAllDay: droppedOnAllDaySlot,
  }: any) => {
    let allDay = event.allDay;

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true;
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false;
    }

    const nextEvents = events!.map((existingEvent) => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end, allDay }
        : existingEvent;
    });
    setevents(nextEvents);
  };

  const resizeEvent = ({ event, start, end, isAllDay }: any) => {
    const nextEvents = events!.map((existingEvent: any) => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });
    setevents(nextEvents);
  };

  const newEvent = (event: any) => {
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
    <>
      <DragAndDropCalendar
        selectable
        formats={{
          timeGutterFormat: "H:mm",
          eventTimeRangeFormat: (e) => {
            return (
              dateFormat(e.start, "H:MM") + " - " + dateFormat(e.end, "H:MM")
            );
          },
        }}
        step={10}
        timeslots={6}
        localizer={localizer}
        events={events}
        onEventDrop={moveEvent}
        resizable
        onEventResize={resizeEvent}
        onSelectSlot={newEvent}
        onSelectEvent={(event) => selectEvent(event)}
        onDragStart={console.log}
        defaultView={"work_week"}
        views={["work_week"]}
        showMultiDayTimes={false}
        defaultDate={moment().toDate()}
        min={
          new Date(today.getFullYear(), today.getMonth(), today.getDate(), 7)
        }
        max={
          new Date(today.getFullYear(), today.getMonth(), today.getDate(), 21)
        }
        eventPropGetter={(e: any) => ({
          style: {
            backgroundColor:
              e.kind === SubjectKind.practices ? "#FFE8B8" : "#C0E0FF",
          },
        })}
        onDropFromOutside={onDropFromOutside}
        style={{ height: "80vh", overflowX: "scroll" }}
        components={{
          toolbar: () => <></>,
          event: (e) => <EntryContent event={e.event} />,
        }}
      />
      <PopupAddEntry
        event={selectedEvent}
        visible={visiblePopup}
        onOk={onCreateEvent}
        onCancel={onCancelCreateEvent}
      />
    </>
  );
};

export default SchedulerCard;
