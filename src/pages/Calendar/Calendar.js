import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

const Calendar = () => {
  const handleDateClick = (arg) => { // bind with an arrow function
    alert(arg.dateStr)
  }

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin]}
      initialView="timeGridDay"  // Chế độ xem ngày với chế độ nằm ngang
      headerToolbar={{
        start: 'sidebarToggle, prev, next, title',
        end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
      }}
      weekends={false}
      events={[
        { title: 'event 1', date: '2019-04-01' },
        { title: 'event 2', date: '2019-04-02' }
      ]}
      dateClick={handleDateClick}
    />
  );
}

export default Calendar;
