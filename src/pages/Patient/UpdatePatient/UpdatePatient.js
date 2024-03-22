import React, { useState, useEffect, useRef } from 'react';
import Sidebar from "../../../components/Sidebar";
import './UpdatePatient.css';
import axios from 'axios';
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const UpdatePatient = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        fullname: '',
        birthday: '',
        gender: '',
        phone_number: '',
        address: '',
        idNumber: '',
        password: '',
    });

    const fullnameRef = useRef(null);
    const birthdayRef = useRef(null);
    const genderRef = useRef(null);
    const addressRef = useRef(null);
    const idNumberRef = useRef(null);
    const phone_numberRef = useRef(null);
    const passwordRef = useRef(null);

    useEffect(() => {
        axios.get('http://localhost:4000/patient/' + id)
            .then(response => {
                const birthday = new Date(response.data.birthday);
                if (!isNaN(birthday.getTime())) {
                    const formattedDate = format(birthday, 'yyyy-MM-dd');
                    setFormData({ ...response.data, birthday: formattedDate });
                } else {
                    console.error('Invalid birthday value:', response.data.birthday);
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, [id]);

    const refs = {
        fullname: fullnameRef,
        birthday: birthdayRef,
        gender: genderRef,
        address: addressRef,
        idNumber: idNumberRef,
        phone_number: phone_numberRef,
        password: passwordRef,
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const basicInfoFields = ['fullname', 'birthday', 'gender', 'address', 'idNumber'];
        const emptyBasicInfoField = basicInfoFields.find(field => !formData[field]);
        if (emptyBasicInfoField) {
            const emptyFieldRef = refs[emptyBasicInfoField].current;
            emptyFieldRef.focus();
            toast.warning("Vui lòng nhập đầy đủ thông tin cơ bản.", {
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

        if (!formData.phone_number || !formData.password) {
            phone_numberRef.current.focus();
            toast.warning("Vui lòng nhập số điện thoại và mật khẩu.", {
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
        axios.put('http://localhost:4000/patient/' + id, formData)
            .then(response => {
                if (response.status === 200) {
                    setFormData({
                        fullname: '',
                        birthday: '',
                        gender: '',
                        phone_number: '',
                        address: '',
                        idNumber: '',
                        password: '',
                    });
                    navigate("/patients/show");
                }
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.message && error.response.data.message.includes("expected `phone_number` to be unique")) {
                    alert("Số điện thoại này đã được đăng ký");
                } else {
                    // Nếu không, hiển thị thông báo lỗi mặc định
                    alert("Failed to create patient.");
                }
                console.error("Request failed:", error);
            });
    };

    const onCancel = (e) => {
        e.preventDefault();
        setFormData({
            fullname: '',
            birthday: '',
            gender: '',
            phone_number: '',
            address: '',
            idNumber: '',
            password: '',
        });
        navigate("/patients/show");
    };


    const handleToHistory = () => {
        navigate('/history/show',  { state: {patientId: formData._id, patientName: formData.fullname, patientPhone: formData.phone_number} });
    }
    return (
        <div className='create-patient-page row'>
            <div className="col-md-2 col-3">
                <Sidebar />
            </div>
            <div className="col-md-10 col-9 show-post-box">
                <ToastContainer />
                <div className="create-patient-title">
                    <h3 className="title_part_show-post">Cập nhật bệnh nhân</h3>
                </div>
                <div className='create-patient-content'>
                    <div className='btn-group-patient-info'>
                        <button type="button" className='btn btn-to-history btn-secondary' onClick={handleToHistory}>Lịch sử thăm khám</button>

                        <button className='btn btn-to-record btn-secondary'>Hồ sơ bệnh án</button>
                    </div>
                    <form onSubmit={handleSubmit} className='row justify-content-between'>
                        <div className='col-7'>
                            <h4 className="title_create_patient">Thông tin cơ bản</h4>
                            <div className="mb-3">
                                <label htmlFor="fullname" className="form-label fw-medium">Họ và tên</label>
                                <input type="text" className="form-control" id="fullname" name="fullname" value={formData.fullname} onChange={handleChange} ref={fullnameRef} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="birthday" className="form-label fw-medium">Ngày sinh</label>
                                <input type="date" className="form-control" id="birthday" name="birthday" value={formData.birthday} onChange={handleChange} ref={birthdayRef} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="gender" className="form-label fw-medium">Giới tính</label>
                                <select className="form-control" id="gender" name="gender" value={formData.gender} onChange={handleChange} ref={genderRef}>
                                    <option value="">Chọn giới tính</option>
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                    <option value="Khác">Khác</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="address" className="form-label fw-medium">Địa chỉ</label>
                                <input type="text" className="form-control" id="address" name="address" value={formData.address} onChange={handleChange} ref={addressRef} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="idNumber" className="form-label fw-medium">Số căn cước</label>
                                <input type="text" className="form-control" id="idNumber" name="idNumber" value={formData.idNumber} onChange={handleChange} ref={idNumberRef} />
                            </div>
                        </div>
                        <div className='col-4'>
                            <h4 className="title_create_patient">Thông tin tài khoản</h4>

                            <div className="mb-3">
                                <label htmlFor="phone_number" className="form-label fw-medium">Số điện thoại</label>
                                <input type="tel" className="form-control" id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleChange} ref={phone_numberRef} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label fw-medium">Mật khẩu</label>
                                <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} ref={passwordRef} />
                            </div>

                        </div>
                        <div className='btn-create-patient'>
                            <button className="btn btn-warning cancel" onClick={onCancel}>Huỷ</button>
                            <button type="submit" className="btn submit">Cập nhật</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdatePatient;
