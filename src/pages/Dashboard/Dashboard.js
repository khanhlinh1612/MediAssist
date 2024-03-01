import React from "react";
import Sidebar from "../../components/Sidebar";
import Doctor from "../../images/doctor.svg";
import AppointCard from "./AppointCard/AppointCard";
import localData from "./localData.json";
import "./Dashboard.css";


const Dashboard = () => {
  const Appointments = localData.appoinments;
  const AppointList = Appointments.map((appointment) => (
    <AppointCard appointment={appointment} />
  )).slice(0, 3);

  return (
    <div className="row dashboard-page">
      <div className="col-md-2 col-3">
        <Sidebar />
      </div>
      <div className="col-md-10 col-9 dashboard-content">
        <div className="info-page row">
          <div className="col-8 text-box">
            <h3>Xin chào Hiếu Nguyễn</h3>
            <p>Hôm nay là Thứ hai, ngày 20 tháng 12 năm 2023</p>
          </div>
          <div className="col-4 img-box">
            <img alt="" src={Doctor} className="doctor_avatar" />
          </div>
        </div>

        <div className="appointment row gx-5">
          <h3 className="title_part">Lịch Khám Hôm Nay</h3>
          {AppointList}
        </div>

        <div className="">
          <h3 className="title_part">Lịch làm việc</h3>
          <div className="work-schedule w-75">Hi</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
