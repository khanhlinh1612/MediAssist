import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import axios from 'axios';
import { Tabs } from 'antd';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import Sidebar from "../../../components/Sidebar";
import AddPrescriptionModal from '../CreateHistory/AddPrescriptionModal/AddPrescriptionModal';
import AddServiceModal from '../CreateHistory/AddServiceModal/AddServiceModal';
import 'react-toastify/dist/ReactToastify.css';
import './HistoryDetail.css';
import InvoiceContent from './ShowInvoiceModal/InvoiceContent';
import PrescriptionTable from '../CreateHistory/AddPrescriptionModal/PrescriptionTable';
import ServiceTable from '../CreateHistory/AddServiceModal/ServiceTable';
const { TabPane } = Tabs;

const HistoryDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [services, setServices] = useState([]);
    const [drugs, setDrugs] = useState([]);
    const [modalPrescriptionOpen, setModalPrescriptionOpen] = useState(false);
    const [modalServiceOpen, setModalServiceOpen] = useState(false);
    const [patientInfo, setPatientInfo] = useState(null);
    const [doctorInfo, setDoctorInfo] = useState(null);
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

    const refs = {
        fullname: useRef(null),
        phoneNumber: useRef(null),
        examDate: useRef(null),
        examContent: useRef(null),
        symptom: useRef(null),
        diagnosis: useRef(null),
        reExamDate: useRef(null),
        prescription: useRef(null),
        service: useRef(null),
    };

    const formattedExamDate = formData.examDate ? format(new Date(formData.examDate), 'yyyy-MM-dd') : '';
    const formattedReExamDate = formData.reExamDate ? format(new Date(formData.reExamDate), 'yyyy-MM-dd') : '';

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/history/${id}`)
            .then(response => {
                const { medicalServices, total, status } = response.data.invoice;
                const medicines = JSON.parse(JSON.stringify(response.data.invoice.medicines));
                setPatientInfo(response.data.patient);
                setDoctorInfo(response.data.doctor);
                setFormData({
                    ...response.data,
                    prescription: JSON.parse(JSON.stringify(response.data.invoice.medicines)) || [],
                    service: medicalServices || []
                });
                setPrescriptionData(JSON.parse(JSON.stringify(response.data.invoice.medicines)) || []);
                console.log("This is serviceResult",response.data.serviceResult);
                setServiceData(response.data.serviceResult || medicalServices || []);
                setInvoiceData({ medicines, medicalServices, total, status });
            })
            .catch(error => {
                console.error("Request failed:", error);
            }
            );

        // Gọi API để lấy danh sách tên các dịch vụ
        axios.get(`${process.env.REACT_APP_API_URL}/history/services`)
            .then(response => {
                const options = response.data.map(name => ({ value: name, label: name }));
                setServices(options);
            })
            .catch(error => {
                console.error("Request failed:", error);
            });

        // Gọi API để lấy danh sách tên các thuốc
        axios.get(`${process.env.REACT_APP_API_URL}/history/drugs`)
            .then(response => {
                const options = response.data.map(name => ({ value: name, label: name }));
                setDrugs(options);
            })
            .catch(error => {
                console.error("Request failed:", error);
            });
    }, [id]);




    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Thiss isss formdata", formData);
        if (validateFormData()) {
            axios.put(`${process.env.REACT_APP_API_URL}/history/${formData._id}`, formData, { withCredentials: true })
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
        const requiredFields = ['fullname', 'phoneNumber', 'examDate', 'examContent', 'symptom', 'diagnosis', 'reExamDate'];
        for (const field of requiredFields) {
            if (!formData[field]) {
                refs[field].current.focus();
                showWarningToast("Vui lòng nhập đầy đủ thông tin.");
                return false;
            }
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
        navigate("/history/show");
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
        console.log("Data of service",data);
        setServiceData(data);
        setFormData(prevFormData => ({
            ...prevFormData,
            service: data
        }));
    };
    const renderInfoRow = (name, value) => (
        <div className='col-3 d-flex flex-row mb-2'>
            <p className='fw-bold'>{name}:</p>
            <p className='ms-2'>{value}</p>
        </div>
    );

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

                <div className='history-patient-content'>
                    <div className='general-info'>
                        <h3 className='mb-3'>Thông tin chung</h3>
                        <div className='row patient-info'>
                            {renderInfoRow("Bệnh nhân", patientInfo?.fullname)}
                            {renderInfoRow("Tuổi", patientInfo?.age)}
                            {renderInfoRow("Giới tính", patientInfo?.gender)}
                            {/* {renderInfoRow("Số điện thoại", patientInfo?.phone_number)} */}
                        </div>
                        <div className='row history-info'>
                            {renderInfoRow("Bác sĩ khám", doctorInfo?.fullname)}
                            {/* {renderInfoRow("Tuổi", patientInfo?.gender)}
                            {renderInfoRow("Giới tính", patientInfo?.age)} */}
                        </div>
                    </div>

                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Thông tin thăm khám" key="1" className="tab-content">
                            <form onSubmit={handleSubmit} className='row'>
                                <div className='col-12'>
                                    <div className="mb-3">
                                        <label htmlFor="examDate" className="form-label fw-medium">Ngày thăm khám</label>
                                        <input type="date" className="form-control" id="examDate" name="examDate" value={formattedExamDate} onChange={handleChange} ref={refs.examDate} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="examContent" className="form-label fw-medium">Nội dung khám</label>
                                        <input type="text" className="form-control" id="examContent" name="examContent" value={formData.examContent} onChange={handleChange} ref={refs.examContent} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="symptom" className="form-label fw-medium">Triệu chứng</label>
                                        <input type="text" className="form-control" id="symptom" name="symptom" value={formData.symptom} onChange={handleChange} ref={refs.symptom} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="diagnosis" className="form-label fw-medium">Chẩn đoán</label>
                                        <input type="text" className="form-control" id="diagnosis" name="diagnosis" value={formData.diagnosis} onChange={handleChange} ref={refs.diagnosis} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="reExamDate" className="form-label fw-medium">Ngày tái khám</label>
                                        <input type="date" className="form-control" id="reExamDate" name="reExamDate" value={formattedReExamDate} onChange={handleChange} ref={refs.reExamDate} />
                                    </div>
                                </div>
                            </form>
                        </TabPane>
                        <TabPane tab="Đơn thuốc" key="2" className="tab-content">
                            <div className="mb-3">
                                <label htmlFor="prescription" className="form-label fw-medium">Đơn thuốc</label>
                                <div className='prescription-box update'>
                                    {/* <input type="text" className="form-control" id="prescription" name="prescription" placeholder={`Số lượng thuốc đã tạo:  ${prescriptionData.length}`} onChange={handleChange} ref={refs.prescription} /> */}
                                    <div className="title-info-tab form-control">{`Số lượng thuốc đã tạo:  ${prescriptionData.length}`}</div>

                                    <button type="button" className='btn btn-to-invoice btn-secondary' onClick={() => setModalPrescriptionOpen(true)}>
                                        {prescriptionData.length > 0 ? 'Cập Nhật' : 'Tạo mới'}</button>

                                </div>
                            </div>
                            <AddPrescriptionModal
                                isOpen={modalPrescriptionOpen}
                                onClose={closePrescriptionModal}
                                onSubmit={getValuePrescription}
                                data={JSON.parse(JSON.stringify(prescriptionData))}
                                drugNames={drugs}
                                status={prescriptionData.length > 0 ? statusModal : 'create'}
                            />
                            <PrescriptionTable
                                data={JSON.parse(JSON.stringify(prescriptionData))}
                            />
                        </TabPane>

                        <TabPane tab="Dịch vụ" key="3" className="tab-content">
                            <div className="mb-3">
                                <label htmlFor="service" className="form-label fw-medium">Dịch vụ</label>
                                <div className='invoice-box update'>
                                    <div className="title-info-tab form-control">{`Số lượng dịch vụ đã tạo:  ${serviceData.length}`}</div>
                                    <button type="button" className='btn btn-to-prescription btn-secondary' onClick={() => setModalServiceOpen(true)}>{serviceData.length > 0 ? 'Cập Nhật' : 'Tạo mới'}</button>
                                </div>
                            </div>
                            <AddServiceModal
                                isOpen={modalServiceOpen}
                                onClose={closeServiceModal}
                                onSubmit={getValueService}
                                data={JSON.parse(JSON.stringify(serviceData))}
                                serviceNames={services}
                                status={serviceData.length > 0 ? statusModal : 'create'}
                            />
                            <ServiceTable
                                data={JSON.parse(JSON.stringify(serviceData))}
                            />
                        </TabPane>

                        <TabPane tab="Hóa đơn" key="4" className="tab-content">
                            <InvoiceContent data={invoiceData} />
                        </TabPane>
                    </Tabs>

                    <form onSubmit={handleSubmit} className='row justify-content-between'>
                        <div className='submit-box'>
                            <button className="btn btn-warning cancel" onClick={onCancel}>Huỷ</button>
                            <button type="submit" className="btn submit">Xác nhận</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default HistoryDetail;
