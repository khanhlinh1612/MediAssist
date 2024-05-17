import React, { useState, useRef, useEffect, useContext } from 'react';
import Sidebar from "../../../components/Sidebar";
import { format } from 'date-fns';
import './DoctorUpdate.css';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../../../context/UserContext';
const DoctorUpdate = () => {
    const { setUserInfo, userInfo } = useContext(UserContext);
    const navigate = useNavigate();
    const [avaImage, setAvaImage] = useState('https://mhchealthcare.org/wp-content/uploads/2019/05/doctor-avatar-1.jpg');
    const [formData, setFormData] = useState({
        fullname: '',
        gender: '',
        birthday: '',
        age: '',
        email: '',
        phone_number: '',
        first_name: '',
        last_name: '',
        address: '',
        idNumber: '',
        avatar: '',
        experienced_year: '',
        specialist: [],
        position: '',
        workplace: '',
        description: '',
    });

    useEffect(() => {
        if (userInfo) {
            const updatedFormData = { ...userInfo };
            if (Array.isArray(userInfo.specialist)) {
                updatedFormData.specialist = handleArray(userInfo.specialist);
            }
            setAvaImage('http://localhost:4000/' + updatedFormData.avatar);
            setFormData(updatedFormData);
        }
    }, [userInfo]);

    const fullnameRef = useRef(null);
    const genderRef = useRef(null);
    const birthdayRef = useRef(null);
    const emailRef = useRef(null);
    const phone_numberRef = useRef(null);
    const addressRef = useRef(null);
    const idNumberRef = useRef(null);
    const avatarRef = useRef(null);
    const avaImageRef = useRef(null);
    const experienced_yearRef = useRef(null);
    const specialistRef = useRef(null);
    const positionRef = useRef(null);
    const workplaceRef = useRef(null);
    const descriptionRef = useRef(null);
    const refs = {
        fullname: fullnameRef,
        gender: genderRef,
        birthday: birthdayRef,
        email: emailRef,
        phone_number: phone_numberRef,
        address: addressRef,
        idNumber: idNumberRef,
        avatar: avatarRef,
        avaImage: avaImageRef,
        experienced_year: experienced_yearRef,
        specialist: specialistRef,
        position: positionRef,
        workplace: workplaceRef,
        description: descriptionRef,
    };

    const formattedBirthday = formData.birthday ? format(new Date(formData.birthday), 'yyyy-MM-dd') : '';
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
            [`${name}Valid`]: true
        }));
    };
    const handleArray = (specialityArray) => {
        let specialityString = '';
        specialityArray.forEach((element, index) => {
            if (index === 0) {
                specialityString += element;
            }
            else {
                specialityString += ', ' + element;
            }
        });
        return specialityString;
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateFormData()) {
            const { first_name, last_name, age } = calculateAgeAndSeparateName({ fullname: formData.fullname, birthday: formData.birthday });
            const specialist = parseSpecialities(formData.specialist);
            const updatedFormData = {
                ...formData,
                first_name: first_name,
                last_name: last_name,
                age: age,
                specialist: specialist,
            };
            const data = new FormData();
            data.set('file', updatedFormData.avatar);
            data.set("fullname", updatedFormData.fullname);
            data.set("gender", updatedFormData.gender);
            data.set("birthday", updatedFormData.birthday);
            data.set("age", updatedFormData.age);
            data.set("email", updatedFormData.email);
            data.set("phone_number", updatedFormData.phone_number);
            data.set("password", updatedFormData.pasword);
            data.set("first_name", updatedFormData.first_name);
            data.set("last_name", updatedFormData.last_name);
            data.set("address", updatedFormData.address);
            data.set("idNumber", updatedFormData.idNumber);
            data.set("experienced_year", updatedFormData.experienced_year);
            data.set("position", updatedFormData.position);
            data.set("workplace", updatedFormData.workplace);
            data.set("description", updatedFormData.description);
            updatedFormData.specialist.forEach((speciality, index) => {
                data.append('specialist[]',speciality );
            });
            fetch(`http://localhost:4000/profile/${updatedFormData._id}`, {
                method: 'PUT',
                body: data,
                credentials: 'include',
            })
                .then(async response => {
                    if (response.ok) {
                        await setUserInfo(response.data);
                        window.location.reload();
                    }
                })
                .catch(error => {
                    alert(error.response.data.error);
                    console.error("Request failed:", error);
                }
                )
        }

    };

    const validateFormData = () => {
        const requiredFields = ['fullname', 'gender', 'birthday', 'email', 'phone_number', 'address', 'idNumber', 'avatar', 'experienced_year', 'specialist', 'position', 'workplace', 'description'];
        const emptyField = requiredFields.find(field => !formData[field]);
        if (emptyField) {
            const emptyFieldRef = refs[emptyField].current;
            emptyFieldRef.focus();
            showWarningToast("Vui lòng nhập đầy đủ thông tin.");
            return false;
        }

        if (!isValidIdNumber(formData.idNumber)) {
            idNumberRef.current.focus();
            showWarningToast("Số căn cước công dân phải có đúng 12 số.");
            return false;
        }

        if (!isValidPhoneNumber(formData.phone_number)) {
            phone_numberRef.current.focus();
            showWarningToast("Số điện thoại phải có đúng 10 số.");
            return false;
        }

        if (!isValidExperienceYear(formData.experienced_year, formData.age)) {
            experienced_yearRef.current.focus();
            showWarningToast("Số năm kinh nghiệm phải nhỏ hơn số tuổi.");
            return false;
        }

        if (!isValidBirthday(formData.birthday)) {
            birthdayRef.current.focus();
            showWarningToast("Tuổi phải từ 18 trở lên.");
            return false;
        }

        return true;
    };
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const clearForm = () => {
        setFormData({
            fullname: '',
            gender: '',
            birthday: '',
            age: '',
            email: '',
            phone_number: '',
            first_name: '',
            last_name: '',
            address: '',
            idNumber: '',
            avatar: '',
            experienced_year: '',
            specialist: [],
            position: '',
            workplace: '',
            description: '',
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

    const parseSpecialities = (input) => {
        if (!input) {
            return [];
        }
        const specialtiesArray = input.split(',');
        const trimmedSpecialties = specialtiesArray.map((specialty) => specialty.trim()).filter((specialty) => specialty !== '');
        return trimmedSpecialties;
    };

    const calculateAgeAndSeparateName = function ({ fullname, birthday }) {
        let first_name = '';
        let last_name = '';
        let age = '';
        if (fullname) {
            const names = fullname.split(' ');
            last_name = names[0];
            first_name = names[names.length - 1];
        }
        if (birthday) {
            const today = new Date();
            const birthDate = new Date(birthday);
            age = today.getFullYear() - birthDate.getFullYear();
        }
        return { first_name, last_name, age };
    };

    const isValidIdNumber = (idNumber) => {
        return !isNaN(idNumber) && idNumber.length === 12;
    };

    const isValidPhoneNumber = (phoneNumber) => {
        return !isNaN(phoneNumber) && phoneNumber.length === 10;
    };

    const isValidExperienceYear = (experienceYear, age) => {
        const today = new Date();
        const birthDate = new Date(formData.birthday);
        age = today.getFullYear() - birthDate.getFullYear();
        return experienceYear <= age;
    };

    const isValidBirthday = (birthday) => {
        const today = new Date();
        const birthDate = new Date(birthday);
        const age = today.getFullYear() - birthDate.getFullYear();
        return age >= 18;
    };


    const handleBlur = (e) => {
        const { name, value } = e.target;
        let isValid = true;
        // Kiểm tra tính hợp lệ của từng trường dữ liệu
        if (name === 'email' && !isValidEmail(value)) {
            isValid = false;
        } else if (name === 'idNumber' && !isValidIdNumber(value)) {
            isValid = false;

        } else if (name === 'phone_number' && !isValidPhoneNumber(value)) {
            isValid = false;

        } else if (name === 'experienced_year' && !isValidExperienceYear(value, formData.age)) {
            isValid = false;

        } else if (name === 'birthday' && !isValidBirthday(value)) {
            isValid = false;

        }
        // Cập nhật trạng thái tính hợp lệ của trường dữ liệu
        setFormData(prevFormData => ({
            ...prevFormData,
            [`${name}Valid`]: isValid,
        }));
    };

    const handleChooseAvatar = () => {
        // Kích hoạt sự kiện click cho input type=file
        avaImageRef.current.click();
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvaImage(reader.result);
                setFormData(prevFormData => ({
                    ...prevFormData,
                    avatar: file,
                }));
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <div className='create-patient-page row'>
            <div className="col-md-2 col-3">
                <Sidebar />
            </div>
            <div className="col-md-10 col-9 show-post-box">
                <ToastContainer />
                <div className="create-patient-title">
                    <h3 className="title_part_show-post">Thông Tin Cá Nhân</h3>
                </div>

                <div className='create-patient-content'>
                    <div className='btn-box-avatar'>
                        {/* <Avatar
                            alt="Remy Sharp"
                            src={avaImage}
                            sx={{
                                width: 200,
                                height: 200,
                                borderRadius: '50%',
                                border: '2px solid #ccc'
                            }}
                        /> */}

                            <img alt="" src={avaImage} className="avatar-update"/>


                        <input type="file" onChange={handleAvatarChange} ref={avaImageRef} style={{ display: 'none' }} />
                        <button className='btn pick-img' onClick={handleChooseAvatar}>Chọn ảnh</button>
                    </div>
                    <form onSubmit={handleSubmit} className='row justify-content-between'>
                        <div className='col-6'>
                            <div className="mb-3">
                                <label htmlFor="fullname" className="form-label fw-medium">Họ và tên</label>
                                <input type="text" className="form-control" id="fullname" name="fullname" value={formData.fullname} onChange={handleChange} ref={fullnameRef} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="birthday" className="form-label fw-medium">Ngày sinh</label>
                                <input type="date" className={`form-control ${formData.birthdayValid === false ? 'is-invalid' : ''}`} onBlur={handleBlur} id="birthday" name="birthday" value={formattedBirthday} onChange={handleChange} ref={birthdayRef} />
                                {formData.birthdayValid === false && (
                                    <div className="invalid-feedback">Tuổi phải từ 18 trở lên.</div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label fw-medium">Email</label>
                                <input
                                    type="email"
                                    className={`form-control ${formData.emailValid === false ? 'is-invalid' : ''}`}
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    ref={emailRef}
                                />
                                {formData.emailValid === false && (
                                    <div className="invalid-feedback">Email không hợp lệ.</div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="position" className="form-label fw-medium">Chức vụ</label>
                                <input type="text" className="form-control" id="position" name="position" value={formData.position} onChange={handleChange} ref={positionRef} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="specialist" className="form-label fw-medium">Chuyên Ngành</label>
                                <input type="text" className="form-control" id="specialist" name="specialist" value={formData.specialist} onChange={handleChange} ref={specialistRef} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label fw-medium">Giới Thiệu</label>
                                <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} ref={descriptionRef} />
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className="mb-3">
                                <label htmlFor="gender" className="form-label fw-medium">Giới tính</label>
                                <input type="text" className="form-control" id="gender" name="gender" value={formData.gender} onChange={handleChange} ref={genderRef} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="idNumber" className="form-label fw-medium">Số CCCD</label>
                                <input type="text" className={`form-control ${formData.idNumberValid === false ? 'is-invalid' : ''}`} onBlur={handleBlur} id="idNumber" name="idNumber" value={formData.idNumber} onChange={handleChange} ref={idNumberRef} />
                                {formData.idNumberValid === false && (
                                    <div className="invalid-feedback">Số căn cước công dân phải có đúng 12 số.</div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone_number" className="form-label fw-medium">Số điện thoại</label>
                                <input type="text" className={`form-control ${formData.phone_numberValid === false ? 'is-invalid' : ''}`} onBlur={handleBlur} id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleChange} ref={phone_numberRef} />
                                {formData.phone_numberValid === false && (
                                    <div className="invalid-feedback">Số điện thoại phải có đúng 10 chữ số.</div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="experienced_year" className="form-label fw-medium">Số năm kinh nghiệm</label>
                                <input type="number" className={`form-control ${formData.experienced_yearValid === false ? 'is-invalid' : ''}`} onBlur={handleBlur} id="experienced_year" name="experienced_year" value={formData.experienced_year} onChange={handleChange} ref={experienced_yearRef} />
                                {formData.experienced_yearValid === false && (
                                    <div className="invalid-feedback">Số năm kinh nghiệm phải nhỏ hơn số tuổi.</div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="workplace" className="form-label fw-medium">Nơi làm việc</label>
                                <input type="text" className="form-control" id="workplace" name="workplace" value={formData.workplace} onChange={handleChange} ref={workplaceRef} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label fw-medium">Địa chỉ</label>
                                <input type="text" className="form-control" id="address" name="address" value={formData.address} onChange={handleChange} ref={addressRef} />
                            </div>
                        </div>
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
export default DoctorUpdate;
