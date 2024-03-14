import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import DateTime from 'react-datetime';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddEventModal.css'
export default function AddEventModal({ isOpen, onClose, onEventAdded, status, onEventUpdated, updateEventInfo, deleteEvent }) {
    const [onDelete, setOndDelete] = useState(false);
    const [title, setTitle] = useState('');
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [content, setContent] = useState('');
    const [patientName, setPatientName] = useState('');
    const [patientPhone, setPatientPhone] = useState('');

    useEffect(() => {
        if (status === 'update' && updateEventInfo) {
            console.log(updateEventInfo.event.start);
            console.log(updateEventInfo.event.end);
            const updateEvent = updateEventInfo.event._def.extendedProps;
            setTitle(updateEventInfo.event._def.title);
            setContent(updateEvent.content);
            setStart(updateEventInfo.event.start);
            setEnd(updateEventInfo.event.end);
            setPatientName(updateEvent.patientName);
            setPatientPhone(updateEvent.patientPhone);
        }
        else {
            resetVariable();
        }
    }, [status, updateEventInfo]);
    const onSubmit = async (event) => {
        event.preventDefault();
        if (end <= start) {
            toast.warning("Thời gian không hợp lệ", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            return;
        }
        if (onDelete) {
            console.log("Đây là updateInfo",updateEventInfo);
            await deleteEvent(updateEventInfo.event.id);
            setOndDelete(false);
        }
        else {
            if (status === 'create') {
                await onEventAdded({
                    title,
                    start,
                    end,
                    content,
                    patientName,
                    patientPhone
                })
            }
            if (status === 'update') {
                await onEventUpdated({
                    id: updateEventInfo.event._def.extendedProps._id,
                    title,
                    start,
                    end,
                    content,
                    patientName,
                    patientPhone
                });
            }
        }
        resetVariable();

        onClose();

    };
    const resetVariable = () => {
        setTitle('');
        setStart(new Date());
        setEnd(new Date());
        setContent('');
        setPatientName('');
        setPatientPhone('');
    }
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} >
            <ToastContainer />
            <form onSubmit={onSubmit} className='form-modal'>

                <div className="form-group">
                    <div className='close-icon' onClick={() => { onClose(); resetVariable() }}>
                        <box-icon type='solid' name='x-circle' color='red' size='lg'></box-icon>
                    </div>
                    <label>Tiêu đề</label>
                    <input className='form-control w-50' placeholder='Nhập tiêu đề' value={title} onChange={ev => { setTitle(ev.target.value) }}></input>
                </div>

                <div className="form-group">
                    <label>Ngày giờ bắt đầu</label>
                    <DateTime className='w-75' value={start} onChange={date => { setStart(date) }}></DateTime>
                </div>
                <div className="form-group">
                    <label>Ngày giờ kết thúc</label>
                    <DateTime className='w-75' value={end} onChange={date => { setEnd(date) }} aria-describedby="endTimeDescribe"></DateTime>
                    <div id="endTimeDescribe" class="form-text mt-1">
                        Thời gian kết thúc phải sau thời gian bắt đầu.
                    </div>
                </div>
                <div class="form-group">
                    <label htmlFor="content">Nội dung khám bệnh</label>
                    <input type="text" className="form-control" id="content" placeholder="Nội dung khám" value={content} onChange={event => { setContent(event.target.value) }} />
                </div>
                <div class="form-group">
                    <label htmlFor="patient-name">Họ tên bệnh nhân</label>
                    <input type="text" className="form-control" id="patient name" placeholder="Họ tên bệnh nhân" value={patientName} onChange={event => { setPatientName(event.target.value) }} />
                </div>
                <div class="form-group">
                    <label htmlFor="patient-name">Số điện thoại bệnh nhân</label>
                    <input type="text" className="form-control" id="patient name" placeholder="Số điện thoại bệnh nhân" value={patientPhone} onChange={event => { setPatientPhone(event.target.value) }} />
                </div>

                {status === 'create' && (<div className='btn-group'> <button type="submit" className='btn btn-success'>Tạo lịch</button> </div>)}
                {status === 'update' && (
                    <div className='btn-group'>
                        <button className='btn btn-warning' onClick={() => setOndDelete(true)}>Xóa lịch</button>
                        <button type="submit" className='btn btn-success'>Cập nhật</button>
                    </div>
                )}

            </form>
        </Modal>
    );
}
