import React, { useState, useRef } from 'react';
import Sidebar from "../../../components/Sidebar";
import './CreateHistory.css';
import axios from 'axios';
import AddPrescriptionModal from './AddPrescriptionModal/AddPrescriptionModal';
import AddServiceModal from './AddServiceModal/AddServiceModal';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateHistory = () => {
    const navigate = useNavigate();
    const [modalPrescriptionOpen, setModalPrescriptionOpen] = useState(false);
    const [modalServiceOpen, setModalServiceOpen] = useState(false);
    const [formData, setFormData] = useState({
        fullname: '',
        phoneNumber: '',
        examDate: '',
        examContent: '',
        symptom: '',
        diagnosis: '',
        reExamDate: '',
        prescription: [],
        service: [],
    });
    const [prescriptionData, setPrescriptionData] = useState(null);
    const [serviceData, setServiceData] = useState(null);

    const fullnameRef = useRef(null);
    const phoneNumberRef = useRef(null);
    const examDateRef = useRef(null);
    const examContentRef = useRef(null);
    const symptomRef = useRef(null);
    const diagnosisRef = useRef(null);
    const reExamDateRef = useRef(null);
    const prescriptionRef = useRef(null);
    const serviceRef = useRef(null);

    const refs = {
        fullname: fullnameRef,
        phoneNumber: phoneNumberRef,
        examDate: examDateRef,
        examContent: examContentRef,
        symptom: symptomRef,
        diagnosis: diagnosisRef,
        reExamDate: reExamDateRef,
        prescription: prescriptionRef,
        service: serviceRef,
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateFormData()) {
            axios.post('http://localhost:4000/history/', formData, {
                withCredentials: true // Cho phép gửi và nhận cookie
            })
                .then(response => {
                    if (response.status === 200) {
                        // clearForm();
                        // navigate("/history/show");
                    }
                })
                .catch(error => {
                    alert(error.response.data.error);
                    console.error("Request failed:", error);
                });
        }
    };

    const validateFormData = () => {
        const basicInfoFields = ['fullname', 'phoneNumber', 'examDate', 'examContent', 'symptom', 'diagnosis', 'reExamDate'];
        const emptyBasicInfoField = basicInfoFields.find(field => !formData[field]);
        if (emptyBasicInfoField) {
            const emptyFieldRef = refs[emptyBasicInfoField].current;
            emptyFieldRef.focus();
            showWarningToast("Vui lòng nhập đầy đủ thông tin.");
            return false;
        }
        if (formData.reExamDate <= formData.examDate) {
            showWarningToast("Thời gian không hợp lệ");
            return false;
        }
        return true;
    };

    const clearForm = () => {
        setFormData({
            fullname: '',
            phoneNumber: '',
            examDate: '',
            examContent: '',
            symptom: '',
            diagnosis: '',
            reExamDate: '',
            prescription: [],
            service: []
        });
    };

    const onCancel = (e) => {
        e.preventDefault();
        clearForm();
        navigate("/patients/show");
    };

    const showWarningToast = (message) => {
        toast.warning(message, {
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
    };

    //function of Prescription Modal
        const closePrescriptionModal = () => {
            setModalPrescriptionOpen(false);
        };
        const getValuePrescription = (data) => {
            setPrescriptionData(data);
            setFormData(prevFormData => ({
                ...prevFormData,
                prescription: data
            }));
        };

    //function of service Modal
        const closeServiceModal = () => {
            setModalServiceOpen(false);
        };
        const getValueService = (data) => {
            setServiceData(data);
            setFormData(prevFormData => ({
                ...prevFormData,
                service: data
            }));
        };

    return (
        <div className='create-patient-page row'>
            <div className="col-md-2 col-3">
                <Sidebar />
            </div>
            <div className="col-md-10 col-9 show-post-box">
                <ToastContainer />
                <div className="create-patient-title">
                    <h3 className="title_part_show-post">Lịch Sử Thăm Khám</h3>
                </div>

                <div className='create-patient-content'>
                    <form onSubmit={handleSubmit} className='row justify-content-between'>
                        <div className='col-7'>
                            <div className="mb-3">
                                <label htmlFor="fullname" className="form-label fw-medium">Họ và tên</label>
                                <input type="text" className="form-control" id="fullname" name="fullname" value={formData.fullname} onChange={handleChange} ref={fullnameRef} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phoneNumber" className="form-label fw-medium">Số điện thoại</label>
                                <input type="text" className="form-control" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} ref={phoneNumberRef} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="examDate" className="form-label fw-medium">Ngày thăm khám </label>
                                <input type="date" className="form-control" id="examDate" name="examDate" value={formData.examDate} onChange={handleChange} ref={examDateRef} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="examContent" className="form-label fw-medium">Nội dung khám</label>
                                <input type="text" className="form-control" id="examContent" name="examContent" value={formData.examContent} onChange={handleChange} ref={examContentRef} />
                            </div>


                            <div className="mb-3">
                                <label htmlFor="symptom" className="form-label fw-medium">Triệu chứng</label>
                                <input type="text" className="form-control" id="symptom" name="symptom" value={formData.symptom} onChange={handleChange} ref={symptomRef} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="diagnosis" className="form-label fw-medium">Chẩn đoán</label>
                                <input type="text" className="form-control" id="diagnosis" name="diagnosis" value={formData.diagnosis} onChange={handleChange} ref={diagnosisRef} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="prescription" className="form-label fw-medium">Đơn thuốc</label>
                                <div className='prescription-box'>
                                    <input type="text" className="form-control" id="prescription" name="prescription" placeholder={`Số lượng thuốc đã tạo:  ${prescriptionData ? prescriptionData.length : 0}`} onChange={handleChange} ref={prescriptionRef} />
                                    <button type="button" className='btn btn-to-invoice btn-secondary' onClick={() => setModalPrescriptionOpen(true)}>{prescriptionData ? 'Cập Nhật' : 'Tạo mới'}</button>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="service" className="form-label fw-medium">Dịch vụ</label>
                                <div className='invoice-box'>
                                    <input type="text" className="form-control" id="service" name="service" placeholder={`Số lượng dịch vụ đã tạo:  ${serviceData ? serviceData.length : 0}`} onChange={handleChange} ref={serviceRef} />
                                    <button type="button" className='btn btn-to-prescription btn-secondary' onClick={() => setModalServiceOpen(true)}>{serviceData ? 'Cập Nhật' : 'Tạo mới'}</button>
                                </div>

                            </div>

                            <div className="mb-3">
                                <label htmlFor="reExamDate" className="form-label fw-medium">Ngày tái khám</label>
                                <input type="date" className="form-control" id="reExamDate" name="reExamDate" value={formData.reExamDate} onChange={handleChange} ref={reExamDateRef} />
                            </div>

                        </div>

                        <div className='submit-box'>
                            <button className="btn btn-warning cancel" onClick={onCancel}>Huỷ</button>
                            <button type="submit" className="btn submit">Xác nhận</button>
                        </div>
                    </form>

                    <AddPrescriptionModal
                        isOpen={modalPrescriptionOpen}
                        onClose={closePrescriptionModal}
                        onSubmit={getValuePrescription}
                    />

                    <AddServiceModal
                        isOpen={modalServiceOpen}
                        onClose={closeServiceModal}
                        onSubmit={getValueService}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateHistory;
