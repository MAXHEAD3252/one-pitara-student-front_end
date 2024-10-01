/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for event click functionality
import moment from "moment";
import { DOMAIN } from "../../../../../app/routing/ApiEndpoints";
import { useAuth } from "../../../../../app/modules/auth";
import './SchoolEventsCalendar.css'; // Custom CSS file for styling

interface Event {
  title: string;
  start: string; // ISO date string
  end: string;   // ISO date string
  description?: string;
  backgroundColor?: string; // FullCalendar expects backgroundColor property for styling
  borderColor?: string;     // FullCalendar expects borderColor property for styling
}

export default function SchoolEventsCalendar() {
  const [events, setEvents] = useState<Event[]>([]);
  const { currentUser } = useAuth();
  const schoolID = currentUser?.school_id;

  // Fetch events from the server or your database
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${DOMAIN}/api/school/all-events/${schoolID}`);
        const eventData = await response.json();

        // Map the data from your backend and include backgroundColor and borderColor
        const formattedEvents = eventData.map((event: any) => ({
          title: event.event_title,  // Event title
          start: moment(event.start_date).format('YYYY-MM-DDTHH:mm:ss'),  // Format the start date
          end: moment(event.end_date).format('YYYY-MM-DDTHH:mm:ss'),      // Format the end date
          description: event.event_description, // Optional description field
          backgroundColor: event.event_color || '#3b82f6',  // Event color from backend or default to blue
          borderColor: event.event_color || '#000',         // Event border color from backend or default to black
        }));

        setEvents(formattedEvents); // Update the state with formatted events
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [schoolID]);

  return (
    <Fragment>
      <div
        className="calendar-container"
        style={{
          padding: "20px",
          backgroundColor: "rgb(242, 246, 255)",
          borderRadius: "16px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          fontFamily:'Manrope'
        }}
      >
        <h3 className="calendar-title" style={{textAlign:'start'}}>School Events Calendar</h3>
        <div className="calendar-wrapper">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events} // Use the state for events
            dateClick={(info) => alert(`Clicked on: ${info.dateStr}`)} // Handle date click
            eventClick={(info) => alert(`Event: ${info.event.title}`)} // Handle event click

            // Customize the header toolbar
            headerToolbar={{
              left: 'prev,next today',
              center: 'title', // The title will be the month and year
              right: 'dayGridMonth,dayGridWeek,dayGridDay'
            }}

            height="auto"
            // Customize the title rendering (Month and Year)
            titleFormat={{ 
              year: 'numeric', 
              month: 'long' 
            }}  // Example: "September 2024"
          />
        </div>
      </div>
    </Fragment>
  );
}
