import React, { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Sidebar from "../../components/Sidebar";
import AddEventModal from './AddEventModal/AddEventModal';
import './Calendar.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
const Calendar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [clickedEventInfo, setClickedEventInfo] = useState(null);
  const isFirstRun = useRef(true);
  const calendarRef = useRef(null);
  const onEventAdded = async (event) => {
    const { isAdded, data } = await handleEventAdd(event);
    if (isAdded) {
      let newEvents = events.map((item) => {
        if (item._id === data._id) {
          return data;
        }
        else {
          return item;
        }
      });
      setEvents(newEvents);
      calendarRef.current.getApi().refetchEvents();
      setStatus(null);
      isFirstRun.current = false;
      navigate("/calendar", { state: '' });
      return true;
    }
    else{
      return false;
    }

  }
  async function handleEventAdd(data) {
    try {
      const response = await axios.post('http://localhost:4000/appointments/', data, {
        withCredentials: true
      });
      return { isAdded: true, data: response.data };
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert(error.message);
      }
      return { isAdded: false, data: null };
    }
  }

  async function handleDatesSet(data) {
    const response = await axios.get('http://localhost:4000/appointments/?start=' + moment(data.start).toISOString() + '&end=' + moment(data.end).toISOString());
    setEvents(response.data);
  }
  useEffect(() => {
    console.log(isFirstRun.current);

    if (isFirstRun.current) {
      if (location.state && location.state === 'create') {
        setModalOpen(true);
        setStatus('create');
      }

    }
    isFirstRun.current = false;
    fetch('http://localhost:4000/appointments/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        response.json().then(eventInfo => {
          setEvents(eventInfo);
        })
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setEvents(null);
      });

    calendarRef.current.getApi().refetchEvents();
  }, [location.key, location.state]);


  async function updateEvent(info) {
    const response = await axios.put('http://localhost:4000/appointments/' + info.id, info);
    if (response.status === 200) {
      let newEvents = events.map((item) => {
        if (item._id === response.data._id) {
          return response.data;
        }
        else {
          return item;
        }
      });
      setEvents(newEvents);
      calendarRef.current.getApi().refetchEvents();
      setModalOpen(false);
      setStatus(null);
      return true;
    }
    else{
      return false;
    }

  }

  async function deleteEvent(id) {
    try {
      await axios.delete('http://localhost:4000/appointments/' + id);
      const newEvents = events.filter(event => event._id !== id);
      setEvents(newEvents);
      calendarRef.current.getApi().refetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
    setModalOpen(false);
    setStatus(null);
    window.location.reload();
  }

  return (
    <div className='show-post-page row'>
      <div className="col-md-2 col-3">
        <Sidebar />
      </div>
      <div className="col-md-10 col-9 show-post-box">
        <div className="show-post-title">
          <h3 className="title_part_show-post">Quản lý lịch hẹn</h3>
        </div>
        <button className='btn-add-event btn btn-warning mb-2' onClick={() => { setModalOpen(true); setStatus('create') }}>Tạo lịch hẹn</button>
        <div className="calendar-content">
          <FullCalendar
            ref={calendarRef}
            plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin]}
            initialView={location.state === 'list' ? 'listMonth' : 'dayGridMonth'}
            headerToolbar={{
              start: 'prev,next today',
              center: 'title',
              end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
            }}
            views={{
              week: {
                titleFormat: { year: 'numeric', month: 'long', day: 'numeric' }
              }
            }}
            eventBackgroundColor={"#fce3e3"}
            editable={true}
            eventResizableFromStart={true}
            nextDayThreshold={"00:00:00"}
            navLinks={true}
            // weekends={false}
            dayMaxEvents={true}
            eventClick={event => { setModalOpen(true); setStatus('update'); setClickedEventInfo(event) }}
            datesSet={(date) => handleDatesSet(date)}
            events={events}
          />
        </div>

      </div>
      <div className="modal-content">
        <AddEventModal
          isOpen={modalOpen}
          shouldCloseOnOverlayClick={false}
          onClose={() => { setModalOpen(false); setStatus(null); navigate("/calendar", { state: '' }); }}
          onEventAdded={event => onEventAdded(event)}
          onEventUpdated={event => updateEvent(event)}
          status={status}
          updateEventInfo={clickedEventInfo}
          deleteEvent={deleteEvent}
        />
      </div>

    </div>
  );
}

export default Calendar;
