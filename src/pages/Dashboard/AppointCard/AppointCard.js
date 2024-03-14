import React from 'react';
import './AppointCard.css';
const AppointList = ({appointment}) => {
    return (
        <div className='col-3 card-item'>
            <p><b>Bệnh nhân :</b> {appointment.patientName}</p>
            <p><b>Ngày khám :</b> {appointment.appointmentDate}</p>
            <p><b>Giờ khám :</b> {appointment.appointmentTime}</p>
            <p><b>Nội dung :</b> {appointment.appointmentDetails}</p>
        </div>
    );
}

export default AppointList;
