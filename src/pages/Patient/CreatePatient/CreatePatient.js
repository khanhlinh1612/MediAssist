import React, { useState, useRef } from 'react';
import Sidebar from "../../../components/Sidebar";
import './CreatePatient.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreatePatient = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullname: '',
        birthday: '',
        gender: '',
        phone_number: '',
        address: '',
        idNumber: '',
        password: '',
    });

    const refs = {
        fullname: useRef(null),
        birthday: useRef(null),
        gender: useRef(null),
        address: useRef(null),
        idNumber: useRef(null),
        phone_number: useRef(null),
        password: useRef(null),
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Form validation
            const basicInfoFields = ['fullname', 'birthday', 'gender', 'address', 'idNumber'];
            const emptyBasicInfoField = basicInfoFields.find(field => !formData[field]);
            if (emptyBasicInfoField) {
                const emptyFieldRef = refs[emptyBasicInfoField].current;
                emptyFieldRef.focus();
                throw new Error("Vui lòng nhập đầy đủ thông tin cơ bản.");
            }

            // Validate ID number
            if (!formData.idNumber || !/^\d{12}$/.test(formData.idNumber)) {
                throw new Error("Vui lòng nhập số căn cước hợp lệ (12 chữ số).");
            }

            // Validate phone number
            if (!formData.phone_number || !/^\d{10}$/.test(formData.phone_number)) {
                throw new Error("Vui lòng nhập số điện thoại hợp lệ (10 chữ số).");
            }
            // Validate password
            if (!formData.password) {
                throw new Error("Vui lòng nhập mật khẩu.");
            }

            // Submit form
            await axios.post(`${process.env.REACT_APP_API_URL}/patient/`, formData);
            setFormData({ fullname: '', birthday: '', gender: '', phone_number: '', address: '', idNumber: '', password: '' });
            navigate("/patients/show");
        } catch (error) {
            let errorMessage = error.response ?  "Failed create patient" : error.message;
            if(error?.response?.data?.message?.includes('User validation failed: phone_number: Error, expected `phone_number` to be unique')){
                errorMessage = "Số điện thoại đã được đăng ký"
            }

            if(error?.response?.data?.message?.includes('User validation failed: idNumber: Error, expected `idNumber` to be unique')){
                errorMessage = "Số căn cước công dân đã được đăng ký"
            }
            toast.error(errorMessage, {
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
        }
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

    return (
        <div className='create-patient-page row'>
            <div className="col-md-2 col-3">
                <Sidebar />
            </div>
            <div className="col-md-10 col-9 show-post-box">
                <ToastContainer />
                <div className="create-patient-title">
                    <h3 className="title_part_show-post">Đăng kí bệnh nhân</h3>
                </div>

                <div className='create-patient-content'>
                    <form onSubmit={handleSubmit} className='row justify-content-between'>
                        <div className='col-7'>
                            <h4 className="title_create_patient">Thông tin cơ bản</h4>
                            <BasicInfoForm formData={formData} handleChange={handleChange} refs={refs} />
                        </div>
                        <div className='col-4'>
                            <h4 className="title_create_patient">Thông tin tài khoản</h4>
                            <AccountInfoForm formData={formData} handleChange={handleChange} refs={refs} />
                        </div>
                        <div className='btn-create-patient'>
                            <button className="btn btn-warning cancel" onClick={onCancel}>Huỷ</button>
                            <button type="submit" className="btn submit">Tạo mới</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const BasicInfoForm = ({ formData, handleChange, refs }) => (
    <>
        <div className="mb-3">
            <label htmlFor="fullname" className="form-label fw-medium">Họ và tên</label>
            <input type="text" className="form-control" id="fullname" name="fullname" value={formData.fullname} onChange={handleChange} ref={refs.fullname} />
        </div>
        <div className="mb-3">
            <label htmlFor="birthday" className="form-label fw-medium">Ngày sinh</label>
            <input type="date" className="form-control" id="birthday" name="birthday" value={formData.birthday} onChange={handleChange} ref={refs.birthday} />
        </div>
        <div className="mb-3">
            <label htmlFor="gender" className="form-label fw-medium">Giới tính</label>
            <select className="form-control" id="gender" name="gender" value={formData.gender} onChange={handleChange} ref={refs.gender}>
                <option value="">Chọn giới tính</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
            </select>
        </div>
        <div className="mb-3">
            <label htmlFor="address" className="form-label fw-medium">Địa chỉ</label>
            <input type="text" className="form-control" id="address" name="address" value={formData.address} onChange={handleChange} ref={refs.address} />
        </div>
        <div className="mb-3">
            <label htmlFor="idNumber" className="form-label fw-medium">Số căn cước</label>
            <input type="text" className="form-control" id="idNumber" name="idNumber" value={formData.idNumber} onChange={handleChange} ref={refs.idNumber} />
        </div>
    </>
);

const AccountInfoForm = ({ formData, handleChange, refs }) => (
    <>
        <div className="mb-3">
            <label htmlFor="phone_number" className="form-label fw-medium">Số điện thoại</label>
            <input type="tel" className="form-control" id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleChange} ref={refs.phone_number} />
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label fw-medium">Mật khẩu</label>
            <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} ref={refs.password} />
        </div>
    </>
);

export default CreatePatient;
