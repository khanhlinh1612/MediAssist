import React, { useContext,useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Doctor from "../../images/doctor.svg";
import AppointCard from "./AppointCard/AppointCard";
import moment from 'moment';
import { NavLink } from "react-router-dom";
import "./Dashboard.css";
import { UserContext } from '../../UserContext';
const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const {userInfo } = useContext(UserContext);
  const userName = userInfo?.first_name + ' ' + userInfo?.last_name;
  let currentDate = new Date();
  const currentTime = moment();
  const [formattedDate, setFormattedDate] = useState("");
  let currentDateStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0, 0);
  let currentDateEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59, 999);
  useEffect(() => {
    fetch(`http://localhost:4000/appointments?start=${moment(currentDateStart).toISOString()}&end=${moment(currentDateEnd).toISOString()}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        response.json().then(eventInfo => {
          setAppointments(eventInfo);
        })
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setAppointments([]);
      });
    setFormattedDate(currentTime.format("dddd, DD [tháng] MM [năm] YYYY"));
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  const AppointList = appointments.map((appointment) => (
    <AppointCard key={appointment._id} appointment={appointment} />
  )).slice(0, 3);

  return (
    <div className="row dashboard-page">
      <div className="col-md-2 col-3">
        <Sidebar />
      </div>
      <div className="col-md-10 col-9 dashboard-content">
        <div className="info-page row">
          <div className="col-8 text-box">
            <h3>Xin chào {userName}</h3>
            <p>Hôm nay là {formattedDate}</p>
          </div>
          <div className="col-4 img-box">
            <img alt="" src={Doctor} className="doctor_avatar" />
          </div>
        </div>
          <h3 className="title_part">Lịch Khám Hôm Nay</h3>

          {appointments.length > 0 && (
            <div className="appointment row gx-5">
              {appointments.length > 3 && (
              <NavLink to="/calendar" state={'list'}>
                <button className="btn btn-outline-dark detail-btn-dashboard">Xem thêm</button>
              </NavLink>
              )}

              {AppointList}
            </div>

          )}
          {appointments.length === 0 && (
            <div className="none-event-box">
              <h4>Hôm nay chưa có lịch hẹn nào được đặt.
                Tạo lịch hẹn ngay tại đây</h4>
              <NavLink to="/calendar" state={`create`}>
                <button className="btn btn-warning add-btn-dashboard">Thêm lịch</button>
              </NavLink>
            </div>
          )}
        <div className="">
          <h3 className="title_part">Lịch làm việc</h3>
          <div className="work-schedule w-75">Hi</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
