import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer, SlotInfo } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Container, Typography } from "@mui/material";
import FormDialogCalendar from "./FormDialogCalendar";
import { Event } from "../models/types/studentTypes";
import eventStyleGetter from "./EventStyleGetter";
import useStudents from "../hooks/useStudents";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";

const localizer = momentLocalizer(moment);

const MyCalendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [eventName, setEventName] = useState("");
  const [price, setPrice] = useState("");
  const [durationOfLesson, setDurationOfLesson] = useState("");
  const [allowedAbsences, setAllowedAbsences] = useState("");
  const [isDialogOpen, setDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [inputNewDateValue, setInputNewDateValue] = useState("");
  const [isUpdateButtonClicked, setisUpdateButtonClicked] = useState(false);
  const [isChangeDayButtonClicked, setisChangeDayButtonClicked] =
    useState(false);
  const [inputNewHourValue, setInputNewHourValue] = useState("");

  const {
    handleCreateStudent,
    handleGetMyStudents,
    handleUpdateStudent,
    handleUpdateStudentDay,
    value,
  } = useStudents();
  const { isLoading, error, students } = value;

  useEffect(() => {
    handleGetMyStudents().then(() => {
      if (students && students.length > 0) {
        const allEvents = students.flatMap((student) =>
          student.MyArray.map((event) => ({
            ...event,
            start: new Date(event.start),
            end: new Date(event.end),
            absences: event.absences ? new Date(event.absences) : null,
          }))
        );
        setEvents(allEvents);
      }
    });
  }, [isLoading]);

  if (isLoading) return <Spinner />;
  if (error) return <Error errorMessage={error} />;

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    setSelectedStartDate(slotInfo.start);
  };

  const handleEventCreation = async () => {
    if (selectedStartDate && eventName && price) {
      const day = moment(selectedStartDate).day();
      const recurringEvents: Event[] = [];

      let currentDate = moment(selectedStartDate);

      while (currentDate.year() <= new Date().getFullYear() + 1) {
        recurringEvents.push({
          title: eventName,
          start: currentDate.toDate(),
          end: moment(currentDate).add(durationOfLesson, "minutes").toDate(),
          price: +price,
          isAttended: false,
          payment: 0,
          absences: null,
          id: events.length + 1,
          allowedAbsences: +allowedAbsences,
          durationOfLesson: +durationOfLesson,
        });

        currentDate = moment(currentDate).add(1, "week").day(day);
      }

      setEvents((prevEvents) => [...prevEvents, ...recurringEvents]);
      setSelectedStartDate(null);
      setEventName("");
      setPrice("");
      setDurationOfLesson("");
      setAllowedAbsences("");
      await handleCreateStudent(recurringEvents);
      await handleGetMyStudents();
    }
  };

  const handleEventFromDialog = async (action: string, event: Event) => {
    if (action === "lessonTookPlace") {
      event.title = event.title.concat("✅");
      event.title = event.title.replace(/❌|❗/g, "");
      event.payment = event.price;
      event.isAttended = true;
      event.absences = null;
    } else if (action === "lessonCancelledByStudent") {
      event.isAttended = false;
      event.title = event.title.concat("❌");
      event.title = event.title.replace("✅", "");
      event.payment = 0;
      event.absences = event.start;
      const allStudentlessons = events.filter((obj) => obj.id === event.id);
      const cancelledLessons = allStudentlessons.filter(
        (obj) => obj.absences !== null
      );
      if (cancelledLessons.length > event.allowedAbsences) {
        event.payment = event.price;
        event.title = event.title.replace("❌", "❗");
      }
    } else if (action === "reset") {
      event.isAttended = false;
      event.title = event.title.replace(/✅|❌|❗/g, "");
      event.payment = 0;
      event.absences = null;
    }

    await handleUpdateStudent(event);
    await handleGetMyStudents();
  };

  const handleUpdateDateButtons = async (event: Event) => {
    if (isUpdateButtonClicked) {
      const [hours, minutes] = inputNewHourValue.split(":");
      const startDate = new Date(inputNewDateValue);
      startDate.setHours(parseInt(hours, 10));
      startDate.setMinutes(parseInt(minutes, 10));
      event.start = startDate;
      const endDate = new Date(
        startDate.getTime() + event.durationOfLesson * 60000
      );
      event.end = endDate;
      await handleUpdateStudent(event);
      await handleGetMyStudents();
      setisUpdateButtonClicked(false);
      setInputNewHourValue("");
      setInputNewDateValue("");
    } else if (isChangeDayButtonClicked) {
      const [hours, minutes] = inputNewHourValue.split(":");
      const startDate = new Date(inputNewDateValue);
      startDate.setHours(parseInt(hours, 10));
      startDate.setMinutes(parseInt(minutes, 10));
      const gap = startDate.getTime() - event.start.getTime();
      const num = Math.floor(gap / (1000 * 3600 * 24));

      const allStudentEvents = events.filter(
        (student) => student.id === event.id
      );

      allStudentEvents.map(
        (lesson) =>
          lesson.start >= event.start &&
          lesson.start.setDate(lesson.start.getDate() + num) &&
          (lesson.end = new Date(
            lesson.start.getTime() + lesson.durationOfLesson * 60000
          ))
      );
      await handleUpdateStudentDay(allStudentEvents);
      await handleGetMyStudents();
      setisChangeDayButtonClicked(false);
      setInputNewHourValue("");
      setInputNewDateValue("");
    } else {
      setSelectedEvent(event);
      setDialog(true);
    }
  };

  return (
    <div>
      <Container>
        <Typography textAlign={"left"} padding={2} variant="h4">
          Administrative Calendar
        </Typography>
        <div>
          <button
            className="update_buttons"
            onClick={() => setisUpdateButtonClicked(!isUpdateButtonClicked)}
          >
            One time change
          </button>
          {isUpdateButtonClicked && (
            <div>
              <input
                type="date"
                value={inputNewDateValue}
                onChange={(e) => setInputNewDateValue(e.target.value)}
              />
              <input
                type="time"
                value={inputNewHourValue}
                onChange={(e) => setInputNewHourValue(e.target.value)}
              />
            </div>
          )}
        </div>
        <div>
          <button
            className="update_buttons"
            onClick={() =>
              setisChangeDayButtonClicked(!isChangeDayButtonClicked)
            }
          >
            Permanent time change
          </button>
          {isChangeDayButtonClicked && (
            <div>
              <input
                type="date"
                value={inputNewDateValue}
                onChange={(e) => setInputNewDateValue(e.target.value)}
              />
              <input
                type="time"
                value={inputNewHourValue}
                onChange={(e) => setInputNewHourValue(e.target.value)}
              />
            </div>
          )}
        </div>
        {selectedStartDate && (
          <div style={{ marginBottom: 6 }}>
            <p>Selected Start Date: {selectedStartDate.toLocaleString()}</p>
            <input
              type="text"
              placeholder="Student Name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Price for lesson"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="Duration of lesson in minutes"
              value={durationOfLesson}
              onChange={(e) => setDurationOfLesson(e.target.value)}
            />
            <input
              type="number"
              placeholder="Allowed Absences"
              value={allowedAbsences}
              onChange={(e) => setAllowedAbsences(e.target.value)}
            />
            <button
              onClick={handleEventCreation}
              disabled={
                !eventName || !price || !durationOfLesson || !allowedAbsences
              }
            >
              Create Event
            </button>
          </div>
        )}
        <Calendar
          localizer={localizer}
          selectable={true}
          onSelectSlot={handleSelectSlot}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "80vh", width: "80vw" }}
          onSelectEvent={handleUpdateDateButtons}
          eventPropGetter={eventStyleGetter}
          step={15}
        />
        <FormDialogCalendar
          isDialogOpen={isDialogOpen}
          onCloseDialog={() => setDialog(false)}
          onActionSelected={handleEventFromDialog}
          selectedEvent={selectedEvent}
        />
      </Container>
    </div>
  );
};

export default React.memo(MyCalendar);
