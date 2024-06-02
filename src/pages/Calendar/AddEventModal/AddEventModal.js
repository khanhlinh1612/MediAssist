import React, { useState, useEffect } from 'react';
import { Drawer, Button, Input, DatePicker, Space, Modal } from 'antd';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddEventModal.css';
import moment from 'moment';
import axios from 'axios';
const { TextArea } = Input;

export default function AddEventDrawer({ isOpen, onClose, onEventAdded, status, onEventUpdated, updateEventInfo, deleteEvent }) {
    const [onDelete, setOnDelete] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [content, setContent] = useState('');
    const [patientName, setPatientName] = useState('');
    const [patientPhone, setPatientPhone] = useState('');
    const [patientNames, setPatientNames] = useState([]);
    const [patientPhones, setPatientPhones] = useState([]);
    useEffect(() => {
        if (status === 'update' && updateEventInfo) {
            const updateEvent = updateEventInfo.event._def.extendedProps;
            setTitle(updateEventInfo.event._def.title);
            setContent(updateEvent.content);
            setStart(updateEventInfo.event.start);
            setEnd(updateEventInfo.event.end);
            setPatientName(updateEvent.patientName);
            setPatientPhone(updateEvent.patientPhone);
        } else {
            resetVariable();
        }
    }, [status, updateEventInfo]);

    useEffect(() => {
        // Gọi API để lấy danh sách tên các bệnh nhân
        axios.get(`${process.env.REACT_APP_API_URL}/patient/names`)
            .then(response => {
                const options = response.data.fullnames.map(name => ({ value: name, label: name }));
                setPatientNames(options);
                setPatientPhones(response.data.phoneNumbers);
            })
            .catch(error => {
                console.error("Request failed:", error);
            });
    },[])
    useEffect(() => {
        const handleDelete = async () => {
            if (onDelete) {
                let info_id = '';
                if (updateEventInfo.event._def.extendedProps._id === '') {
                    info_id = updateEventInfo.event.id;
                } else {
                    info_id = updateEventInfo.event._def.extendedProps._id;
                }
                await deleteEvent(info_id);
                setOnDelete(false);
            }
        };
        handleDelete();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onDelete]);

    const onSubmit = async (event) => {
        let result = true;
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

        if (status === 'create') {
            result = await onEventAdded({
                title,
                start,
                end,
                content,
                patientName,
                patientPhone
            });
        }
        if (status === 'update') {
            let info_id = '';
            if (updateEventInfo.event._def.extendedProps._id === '') {
                info_id = updateEventInfo.event.id;
            } else {
                info_id = updateEventInfo.event._def.extendedProps._id;
            }
            result = await onEventUpdated({
                id: info_id,
                title,
                start,
                end,
                content,
                patientName,
                patientPhone
            });
        }

        if (result) {
            resetVariable();
            onClose();
        }
    };

    const resetVariable = () => {
        setTitle('');
        setStart(new Date());
        setEnd(new Date());
        setContent('');
        setPatientName('');
        setPatientPhone('');
    };

    const showDeleteModal = () => {
        setIsModalVisible(true);
    };

    const handleDeleteOk = () => {
        setOnDelete(true);
        setIsModalVisible(false);
    };

    const handleDeleteCancel = () => {
        setIsModalVisible(false);
    };

    const handleChangeName = (event) => {
        setPatientName(event.target.value)
        const phone_number = patientPhones.find(entry => {
            const fullName = Object.keys(entry)[0];
            return fullName === event.target.value;
        });
        if (phone_number) {
           setPatientPhone(phone_number[event.target.value]);
        } else {
            setPatientPhone('');
        }
    }
    return (
        <Drawer
            title={<div className="custom-drawer-title">{status === 'create' ? 'Thêm lịch hẹn' : 'Cập nhật lịch hẹn'}</div>}
            width={720}
            onClose={() => { onClose(); resetVariable() }}
            open={isOpen}
            styles={{ body: { paddingBottom: 80, backgroundColor: 'rgba(232,230,253,255)' } }}
        >
            <ToastContainer />
            <form onSubmit={onSubmit} className='form-modal-add-event'>
                <div className="form-group">
                    <label className='label-event'>Tiêu đề</label>
                    <Input
                        className='form-control w-50'
                        placeholder='Nhập tiêu đề'
                        value={title}
                        onChange={ev => setTitle(ev.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label className='label-event'>Ngày giờ bắt đầu</label>
                    <DatePicker
                        showTime
                        className='w-75'
                        needConfirm
                        value={moment(start)}
                        onChange={(date, dateString) => setStart(dateString ? moment(dateString).toDate() : null)}
                    />
                </div>

                <div className="form-group">
                    <label className='label-event'>Ngày giờ kết thúc</label>
                    <DatePicker
                        showTime
                        className='w-75'
                        needConfirm
                        value={moment(end)}
                        onChange={(date, dateString) => setEnd(dateString ? moment(dateString).toDate() : null)}
                    />
                    <div id="endTimeDescribe" className="form-text mt-1">
                        Thời gian kết thúc phải sau thời gian bắt đầu.
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="content" className='label-event'>Nội dung khám bệnh</label>
                    <TextArea
                        className="form-control"
                        id="content"
                        rows={4}
                        placeholder="Nội dung khám"
                        value={content}
                        onChange={event => setContent(event.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="patient-name" className='label-event'>Họ tên bệnh nhân</label>
                    <input className="form-control" list="patientNames" id="patient-name" value={patientName} onChange={event => handleChangeName(event)} placeholder="Chọn bệnh nhân..." />
                        <datalist id="patientNames">
                            {patientNames.map((patient, index) => (
                                <option key={index} value={patient.value} />
                            ))}
                            {/* event => setPatientName(event.target.value) */}
                        </datalist>
                </div>

                <div className="form-group mb-4">
                    <label htmlFor="patient-phone" className='label-event'>Số điện thoại bệnh nhân</label>
                    <Input
                        className="form-control"
                        id="patient-phone"
                        placeholder="Số điện thoại bệnh nhân"
                        value={patientPhone}
                        onChange={event => setPatientPhone(event.target.value)}
                    />
                </div>

                <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {status === 'create' && (
                        <Button type="primary" htmlType="submit" className="buttonCreateEvent">
                            Tạo lịch
                        </Button>
                    )}
                    {status === 'update' && (
                        <>
                            <Button danger onClick={showDeleteModal}>
                                Xóa lịch
                            </Button>
                            <Modal
                                title="Xác nhận"
                                open={isModalVisible}
                                onOk={handleDeleteOk}
                                onCancel={handleDeleteCancel}
                                okText="Có"
                                cancelText="Không"
                            >
                                <p>Bạn có chắc chắn muốn xóa lịch hẹn này không?</p>
                            </Modal>
                            <Button type="primary" htmlType="submit" className='buttonCreateEvent'>
                                Cập nhật
                            </Button>
                        </>
                    )}
                </Space>
            </form>
        </Drawer>
    );
}
