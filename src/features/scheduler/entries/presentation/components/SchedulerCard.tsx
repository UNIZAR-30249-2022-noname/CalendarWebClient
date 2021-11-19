import { useState } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
const DragAndDropCalendar = withDragAndDrop(Calendar as any);
const localizer = momentLocalizer(moment);

//FIXME: refactor component
export const SchedulerCard = () => {
  const [draggedEvent, setdraggedEvent] = useState<any | null>();
  const [events, setevents] = useState<any[]>([
    {
      start: new Date(),
      end: new Date(),
      title: "special event",
    },
  ]);

  const handleDragStart = (event: any) => {
    setdraggedEvent(event);
  };

  const dragFromOutsideItem = () => {
    return draggedEvent;
  };

  const onDropFromOutside = ({ start, end, allDay }: any) => {
    const event = {
      id: draggedEvent.id,
      title: draggedEvent.title,
      start,
      end,
      allDay: allDay,
    };

    setdraggedEvent(null);
    moveEvent({ event, start, end });
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
    let idList = events.map((a) => a.id);
    let newId = Math.max(...idList) + 1;
    let hour = {
      id: newId,
      title: "New Event",
      allDay: event.slots.length == 1,
      start: event.start,
      end: event.end,
    };
    setevents(events.concat([hour]));
  };

  return (
    <DragAndDropCalendar
      selectable
      localizer={localizer}
      events={events}
      onEventDrop={moveEvent}
      resizable
      onEventResize={resizeEvent}
      onSelectSlot={newEvent}
      onDragStart={console.log}
      defaultView={Views.WEEK}
      showMultiDayTimes={false}
      defaultDate={moment().toDate()}
      popup={true}
      // dragFromOutsideItem={
      //   this.state.displayDragItemInCell ? this.dragFromOutsideItem : null
      // }
      onDropFromOutside={onDropFromOutside}
      handleDragStart={handleDragStart}
      style={{ height: "80vh", overflowX: "scroll" }}
      components={{
        toolbar: () => <></>,
      }}
    />
  );
};
