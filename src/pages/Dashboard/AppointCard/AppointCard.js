import React from "react";
import "./AppointCard.css";
const moment = require("moment");

const AppointList = ({ appointment }) => {
    const dateTime = moment(appointment.start);
    const date = dateTime.format("DD/MM/YYYY");
    const time = dateTime.format("HH:mm");

    return (
        <div className="col-3 card-item">
            <p>
                <b>Bệnh nhân :</b> {appointment.patientName}
            </p>
            <p>
                <b>Ngày khám :</b> {date}
            </p>
            <p>
                <b>Giờ khám :</b> {time}
            </p>
            <p>
                <b>Nội dung :</b> {appointment.content}
            </p>
        </div>
    );
};

export default AppointList;
