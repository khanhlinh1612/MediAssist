import React, { useState, useRef, useEffect } from 'react';
import Sidebar from "../../../components/Sidebar";
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import './HistoryDetail.css';
import axios from 'axios';
import AddPrescriptionModal from '../CreateHistory//AddPrescriptionModal/AddPrescriptionModal';
import AddServiceModal from '../CreateHistory/AddServiceModal/AddServiceModal';
import ShowInvoiceModal from './ShowInvoiceModal/ShowInvoiceModal';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HistoryDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [modalPrescriptionOpen, setModalPrescriptionOpen] = useState(false);
    const [modalServiceOpen, setModalServiceOpen] = useState(false);
    const [modalInvoiceOpen, setModalInvoiceOpen] = useState(false);
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
    const [prescriptionData, setPrescriptionData] = useState([]);
    const [serviceData, setServiceData] = useState([]);
    const [invoiceData, setInvoiceData] = useState({});
    const statusModal = 'update';
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
    const formattedExamDate = formData.examDate ? format(new Date(formData.examDate), 'yyyy-MM-dd') : '';
    const formattedReExamDate = formData.reExamDate ? format(new Date(formData.reExamDate), 'yyyy-MM-dd') : '';
    useEffect(() => {
        axios.get(`http://localhost:4000/history/${id}`)
            .then(response => {
                console.log('Data from server: ', response.data);
                const { medicalServices, medicines, total, status } = response.data.invoice;
                setFormData({
                    ...response.data,
                    prescription: medicines ? medicines : [],
                    service: medicalServices ? medicalServices : []
                });
                setPrescriptionData(medicines);
                setServiceData(medicalServices);
                setInvoiceData({medicines, medicalServices, total, status});
                console.log('This is data from server', response.data);
                console.log('This is data from FormData', formData);
            })
            .catch(error => {
                console.error("Request failed:", error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id,]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Đây là dữ liệu của formData sau update', formData);
        if (validateFormData()) {
            axios.put(`http://localhost:4000/history/${formData._id}`, formData, {
                withCredentials: true // Cho phép gửi và nhận cookie
            })
                .then(response => {
                    if (response.status === 200) {
                        clearForm();
                        navigate("/history/show");
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
    console.log(formData);
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


    //function of invoiec Modal
    const closeInvoiceModal = () => {
        setModalInvoiceOpen(false);
    };


    return (
        <div className='create-patient-page row'>
            <div className="col-md-2 col-3">
                <Sidebar />
            </div>
            <div className="col-md-10 col-9 show-post-box">
                <ToastContainer />
                <div className="create-patient-title">
                    <h3 className="title_part_show-post">Chi Tiết Lịch Sử Thăm Khám</h3>
                </div>

                <div className='create-patient-content'>
                    <div className='btn-box'>
                        <button className='patient-create-button btn btn-primary' onClick={() => setModalInvoiceOpen(true)}>Xem hóa đơn</button>
                    </div>
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
                                <input type="date" className="form-control" id="examDate" name="examDate" value={formattedExamDate} onChange={handleChange} ref={examDateRef} />
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
                                    {prescriptionData.length > 0 && (

                                        <button type="button" className='btn btn-to-invoice btn-secondary' onClick={() => setModalPrescriptionOpen(true)}>{'Cập Nhật'}</button>
                                    )}

                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="service" className="form-label fw-medium">Dịch vụ</label>
                                <div className='invoice-box'>
                                    <input type="text" className="form-control" id="service" name="service" placeholder={`Số lượng dịch vụ đã tạo:  ${serviceData ? serviceData.length : 0}`} onChange={handleChange} ref={serviceRef} />
                                    {serviceData.length > 0 && (
                                        <button type="button" className='btn btn-to-prescription btn-secondary' onClick={() => setModalServiceOpen(true)}>Cập Nhật</button>
                                    )}

                                </div>

                            </div>

                            <div className="mb-3">
                                <label htmlFor="reExamDate" className="form-label fw-medium">Ngày tái khám</label>
                                <input type="date" className="form-control" id="reExamDate" name="reExamDate" value={formattedReExamDate} onChange={handleChange} ref={reExamDateRef} />
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
                        data={prescriptionData}
                        drugNames={[]}
                        status={statusModal}
                    />

                    <AddServiceModal
                        isOpen={modalServiceOpen}
                        onClose={closeServiceModal}
                        onSubmit={getValueService}
                        data={serviceData}
                        serviceNames={[]}
                        status={statusModal}
                    />
                    <ShowInvoiceModal
                        isOpen={modalInvoiceOpen}
                        onClose={closeInvoiceModal}
                        data={invoiceData}
                    />
                </div>
            </div>
        </div>
    );
};

export default HistoryDetail;
