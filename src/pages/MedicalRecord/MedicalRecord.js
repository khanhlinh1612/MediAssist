import React, { useState, useRef, useEffect } from 'react';
import Sidebar from "../../components/Sidebar";
import './MedicalRecord.css';
import axios from 'axios';
import { Input, Result, Button, Modal, Spin } from 'antd';
import { useParams } from "react-router-dom";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MedicalRecord = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        age: "",
        gender: "-1",
        maxHeartRate: "",
        restElectrocardiographicResult: "-1",
        exerciseAngina: "-1",
        cholesterol: "",
        chestPain: "-1",
        restBloodPressure: "",
        bloodSugar: "-1",
        oldPeak: "",
        slope: "-1",
        numOfVessels: "-1",
        thalRate: "-1",
    });
    const [loading, setLoading] = useState(false); // State để kiểm soát hiển thị Spin

    const [modalVisible, setModalVisible] = useState(false); // State để kiểm soát hiển thị Modal
    const URL_API_AI = "https://mediassist-model.onrender.com/api/predict";
    // const URL_API_AI = "http://127.0.0.1:8000/api/predict";
    // Hàm mở Modal
    const showModal = () => {
        setModalVisible(true);
    };

    // Hàm đóng Modal
    const handleCancel = () => {
        setModalVisible(false);
    };
    useEffect(() => {
        axios.get(`http://localhost:4000/medicalRecord/${id}`)
            .then(response => {
                setFormData(prevState => ({
                    ...prevState,
                    age: response.data.age,
                    gender: response.data.gender,
                    maxHeartRate: response.data.maxHeartRate,
                    restElectrocardiographicResult: response.data.restElectrocardiographicResult,
                    exerciseAngina: response.data.exerciseAngina,
                    cholesterol: response.data.cholesterol,
                    chestPain: response.data.chestPain,
                    restBloodPressure: response.data.restBloodPressure,
                    bloodSugar: response.data.bloodSugar,
                    oldPeak: response.data.oldPeak,
                    slope: response.data.slope,
                    numOfVessels: response.data.numOfVessels,
                    thalRate: response.data.thalRate,
                }));
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, [id]);

    const ageRef = useRef(null);
    const genderRef = useRef(null);
    const chestPainRef = useRef(null);
    const restBloodPressureRef = useRef(null);
    const cholesterolRef = useRef(null);
    const bloodSugarRef = useRef(null);
    const restElectrocardiographicResultRef = useRef(null);
    const maxHeartRateRef = useRef(null);
    const exerciseAnginaRef = useRef(null);
    const oldPeakRef = useRef(null);
    const slopeRef = useRef(null);
    const numOfVesselsRef = useRef(null);
    const thalRateRef = useRef(null);

    const refs = {
        age: ageRef,
        gender: genderRef,
        chestPain: chestPainRef,
        restBloodPressure: restBloodPressureRef,
        cholesterol: cholesterolRef,
        bloodSugar: bloodSugarRef,
        restElectrocardiographicResult: restElectrocardiographicResultRef,
        maxHeartRate: maxHeartRateRef,
        exerciseAngina: exerciseAnginaRef,
        oldPeak: oldPeakRef,
        slope: slopeRef,
        numOfVessels: numOfVesselsRef,
        thalRate: thalRateRef,
    };
    const [result, setResult] = useState(2);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value,
            [`${name}Valid`]: true
        });
    };

    const handleSubmit = (e) => {

        e.preventDefault();
        if (validateFormData()) {
            console.log("This is data of medical record", formData)
            axios.put(`http://localhost:4000/medicalRecord/${id}`, formData, {
                withCredentials: true // Cho phép gửi và nhận cookie
            })
                .then(response => {
                    if (response.status === 200) {
                        showSuccessToast('Cập Nhật Thành Công')
                    }
                })
                .catch(error => {
                    alert(error.response.data.error);
                    console.error("Request failed:", error);
                });
        }
    };

    const isValidAge = (age) => {
        return !isNaN(age) && age >= 0 && age <= 150;
    };

    const isValidRestBloodPressure = (restBloodPressure) => {
        return !isNaN(restBloodPressure) && restBloodPressure >= 90 && restBloodPressure <= 200;
    };

    const isValidCholesterol = (cholesterol) => {
        return !isNaN(cholesterol) && cholesterol >= 130 && cholesterol <= 550;
    };

    const isValidMaxHeartRate = (maxHeartRate) => {
        return !isNaN(maxHeartRate) && maxHeartRate >= 60 && maxHeartRate <= 220;
    };

    const isValidOldPeak = (oldPeak) => {
        return !isNaN(oldPeak) && oldPeak >= 0 && oldPeak <= 10;
    };

    const isValidNumOfVessels = (numOfVessels) => {
        return !isNaN(numOfVessels) && numOfVessels >= 0 && numOfVessels <= 3;
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        let isValid = true;

        // Kiểm tra tính hợp lệ của từng trường dữ liệu
        if (name === 'age' && !isValidAge(value)) {
            isValid = false;
        } else if (name === 'restBloodPressure' && !isValidRestBloodPressure(value)) {
            isValid = false;
        } else if (name === 'cholesterol' && !isValidCholesterol(value)) {
            isValid = false;
        } else if (name === 'maxHeartRate' && !isValidMaxHeartRate(value)) {
            isValid = false;
        } else if (name === 'oldPeak' && !isValidOldPeak(value)) {
            isValid = false;
        } else if (name === 'numOfVessels' && !isValidNumOfVessels(value)) {
            isValid = false;
        }

        // Cập nhật trạng thái tính hợp lệ của trường dữ liệu
        setFormData(prevFormData => ({
            ...prevFormData,
            [`${name}Valid`]: isValid,
        }));
    };

    const validateFormData = () => {
        const requiredFields = ['age', 'gender', 'chestPain', 'restBloodPressure', 'cholesterol', 'bloodSugar', 'restElectrocardiographicResult', 'maxHeartRate', 'exerciseAngina', 'oldPeak', 'slope', 'numOfVessels', 'thalRate'];
        const emptyField = requiredFields.find(field => !field || formData[field] === '-1' || formData[field] < 0 || formData[field] === "");

        if (emptyField !== undefined) {
            const emptyFieldRef = refs[emptyField]?.current;
            emptyFieldRef?.focus();
            showWarningToast(`Vui lòng nhập đầy đủ thông tin ${emptyField}`);
            return false;
        }
        const numberFields = ['age', 'restBloodPressure', 'cholesterol', 'maxHeartRate', 'oldPeak', 'numOfVessels'];
        for (const fieldName of numberFields) {
            const fieldValue = parseFloat(formData[fieldName]);
            if (isNaN(fieldValue)) {
                const fieldRef = refs[fieldName].current;
                fieldRef.focus();
                showWarningToast(`Trường ${fieldName} phải có giá trị là số.`);
                return false;
            }
        }
        if (!isValidAge(formData.age)) {
            ageRef.current.focus();
            showWarningToast("Tuổi phải nằm giữa khoảng 0 - 150 năm.");
            return false;
        }

        if (!isValidRestBloodPressure(formData.restBloodPressure)) {
            restBloodPressureRef.current.focus();
            showWarningToast("Huyết áp lúc nghỉ phải nằm giữa 90 - 200 mmHg.");
            return false;
        }

        if (!isValidCholesterol(formData.cholesterol)) {
            cholesterolRef.current.focus();
            showWarningToast("Tổng lượng mỡ trong máu phải nằm giữa 130 - 550 mg/Dl.");
            return false;
        }

        if (!isValidMaxHeartRate(formData.maxHeartRate)) {
            maxHeartRateRef.current.focus();
            showWarningToast("Nhịp tim tối đa phải nằm giữa 130 - 230 bpm.");
            return false;
        }

        if (!isValidOldPeak(formData.oldPeak)) {
            oldPeakRef.current.focus();
            showWarningToast("Độ suy giảm của đoạn sóng ST phải nằm giữa 0-10 mm.");
            return false;
        }


        return true;
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

    const showSuccessToast = (message) => {
        toast.success(message, {
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

    const handlePredict = async (e) => {
        e.preventDefault();
        if (validateFormData()) {
            setLoading(true); // Bắt đầu hiển thị Spin khi bắt đầu gửi yêu cầu
            try {
                const sendData = {
                    "age": parseFloat(formData.age),
                    "sex": parseFloat(formData.gender),
                    "cp": parseFloat(formData.chestPain),
                    "trestbps": parseFloat(formData.restBloodPressure),
                    "chol": parseFloat(formData.cholesterol),
                    "fbs": parseFloat(formData.bloodSugar),
                    "restecg": parseFloat(formData.restElectrocardiographicResult),
                    "thalach": parseFloat(formData.maxHeartRate),
                    "exang": parseFloat(formData.exerciseAngina),
                    "oldpeak": parseFloat(formData.oldPeak),
                    "slope": parseFloat(formData.slope),
                    "ca": parseFloat(formData.numOfVessels),
                    "thal": parseFloat(formData.thalRate),
                };

                const response = await axios.post(URL_API_AI, sendData);
                if (response.data.prediction === 1) {
                    setResult(1);
                }
                else {
                    setResult(0);
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false); // Dừng hiển thị Spin khi kết quả đã được nhận
                showModal(); // Hiển thị Modal với kết quả chẩn đoán
            }
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
                    <h3 className="title_part_show-post">Hồ Sơ Bệnh Án</h3>
                </div>

                <div className='create-patient-content ps-5'>
                    <form onSubmit={handleSubmit} className='row mt-3 ms-5 justify-content-center medicalRecord'>
                        <div className="mb-3" id='age'>
                            <label htmlFor="age" className="form-label fw-medium">Độ tuổi</label>
                            <Input
                                type="number"
                                id="age"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                suffix="years"
                                className={`form-control ${formData.ageValid === false ? 'is-invalid' : ''}`}
                                onBlur={handleBlur}
                                ref={input => ageRef.current = input}
                            />
                            {formData.ageValid === false && (
                                <div className="invalid-feedback">Tuổi phải nằm giữa khoảng 0 - 150 năm.</div>
                            )}
                        </div>
                        <div className="mb-3" id='gender'>
                            <label className="form-label fw-medium">Giới tính</label>
                            <div className='d-flex align-items-center'>
                                <div className="form-check me-5">
                                    <input className="form-check-input" type="radio" id="female" name="gender" value="0" checked={formData.gender?.toString() === "0"} onChange={handleChange} />
                                    <label className="form-check-label" htmlFor="female">Nữ</label>
                                </div>
                                <div className="form-check ms-5">
                                    <input className="form-check-input" type="radio" id="male" name="gender" value="1" checked={formData.gender?.toString() === "1"} onChange={handleChange} />
                                    <label className="form-check-label" htmlFor="male">Nam</label>
                                </div>
                            </div>
                        </div>

                        <div className="mb-3" id='chestPain'>
                            <label className="form-label fw-medium">Dạng đau ngực - Chest Pain</label>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="chestPain_0" name="chestPain" value="0" checked={formData.chestPain?.toString() === "0"} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="chestPain_0">Đau thắt ngực điển hình</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="chestPain_1" name="chestPain" value="1" checked={formData.chestPain?.toString() === "1"} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="chestPain_1">Đau thắt ngực không điển hình</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="chestPain_2" name="chestPain" value="2" checked={formData.chestPain?.toString() === "2"} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="chestPain_2">Đau nhưng không thắt ngực</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="chestPain_3" name="chestPain" value="3" checked={formData.chestPain?.toString() === "3"} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="chestPain_3">Không có triệu chứng đau ngực</label>
                            </div>
                        </div>


                        <div className="mb-3" id='restBloodPressure'>
                            <label htmlFor="restBloodPressure" className="form-label fw-medium">Huyết áp lúc nghỉ</label>
                            <Input suffix="mmHg" type="number" id="restBloodPressure" onBlur={handleBlur} name="restBloodPressure" className={`form-control ${formData.restBloodPressureValid === false ? 'is-invalid' : ''}`} ref={restBloodPressureRef} value={formData.restBloodPressure} onChange={handleChange} placeholder="90-200" />
                            {formData.restBloodPressureValid === false && (
                                <div className="invalid-feedback">Huyết áp lúc nghỉ phải nằm giữa 90 - 200 mmHg.</div>
                            )}
                        </div>

                        <div className="mb-3" id='cholesterol'>
                            <label htmlFor="cholesterol" className="form-label fw-medium">Tổng lượng mỡ trong máu - Total Cholesterol</label>
                            <Input suffix="mg/dL" type="number" id="cholesterol" onBlur={handleBlur} name="cholesterol" className={`form-control ${formData.cholesterolValid === false ? 'is-invalid' : ''}`} ref={cholesterolRef} value={formData.cholesterol} onChange={handleChange} placeholder='130-550' />
                            {formData.cholesterolValid === false && (
                                <div className="invalid-feedback">Tổng lượng mỡ trong máu phải nằm giữa 130 - 550 mg/Dl.</div>
                            )}
                        </div>

                        <div className="mb-3" id='bloodSugar'>
                            <label className="form-label fw-medium">Đường huyết - Blood Sugar (mg/dl)</label>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="bloodSugar_0" name="bloodSugar" value="0" checked={formData.bloodSugar?.toString() === "0"} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="bloodSugar_0">Lượng đường huyết nhỏ hơn hoặc bằng 120 mg/dl</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="bloodSugar_1" name="bloodSugar" value="1" checked={formData.bloodSugar?.toString() === "1"} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="bloodSugar_1">Lượng đường huyết lớn hơn 120 mg/dl</label>
                            </div>
                        </div>


                        <div className="mb-3" id='restElectrocardiographicResult'>
                            <label className="form-label fw-medium">Kết quả điện tâm đồ - ECG</label>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="restElectrocardiographicResult_0" name="restElectrocardiographicResult" value="0" checked={formData.restElectrocardiographicResult?.toString() === "0"} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="restElectrocardiographicResult_0">Bình thường</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="restElectrocardiographicResult_1" name="restElectrocardiographicResult" value="1" checked={formData.restElectrocardiographicResult?.toString() === "1"} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="restElectrocardiographicResult_1">Có sóng bất thường</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="restElectrocardiographicResult_2" name="restElectrocardiographicResult" value="2" checked={formData.restElectrocardiographicResult?.toString() === "2"} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="restElectrocardiographicResult_2">Có thể xảy ra phì đại thất trái</label>
                            </div>
                        </div>


                        <div className="mb-3" id='maxHeartRate'>
                            <label htmlFor="maxHeartRate" className="form-label fw-medium">Nhịp tim tối đa đạt được</label>
                            <Input type="number" id="maxHeartRate" onBlur={handleBlur} name="maxHeartRate" className={`form-control ${formData.maxHeartRateValid === false ? 'is-invalid' : ''}`} ref={maxHeartRateRef} value={formData.maxHeartRate} onChange={handleChange} suffix="bpm" placeholder="60 -220" />
                            {formData.maxHeartRateValid === false && (
                                <div className="invalid-feedback">Nhịp tim tối đa phải nằm giữa 130 - 230 bpm.</div>
                            )}
                        </div>

                        <div className="mb-3" id='exerciseAngina'>
                            <label className="form-label fw-medium">Đau thắt ngực khi tập thể dục - exerciseAngina</label>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="exerciseAngina_0" name="exerciseAngina" value="0" checked={formData.exerciseAngina?.toString() === "0"} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="exerciseAngina_0">Không đau thắt ngực khi tập thể dục</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="exerciseAngina_1" name="exerciseAngina" value="1" checked={formData.exerciseAngina?.toString() === "1"} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="exerciseAngina_1">Có đau thắt ngực khi tập thể dục</label>
                            </div>
                        </div>


                        <div className="mb-3" id='oldPeak'>
                            <label htmlFor="oldPeak" className="form-label fw-medium">Độ suy giảm của đoạn sóng ST - OldPeak</label>
                            <Input type="number" id="oldPeak" name="oldPeak" onBlur={handleBlur} className={`form-control ${formData.oldPeakValid === false ? 'is-invalid' : ''}`} ref={oldPeakRef} value={formData.oldPeak} onChange={handleChange} suffix="mm" placeholder="0-10" />
                            {formData.oldPeakValid === false && (
                                <div className="invalid-feedback">Độ suy giảm của đoạn sóng ST phải nằm giữa 0-10 mm.</div>
                            )}
                        </div>

                        <div className="mb-3" id='slope'>
                            <label className="form-label fw-medium">Độ dốc của đoạn sóng ST - Slope</label>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="slope_0" name="slope" value="0" checked={formData.slope?.toString() === "0"} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="slope_0">Độ dốc lên - Positive Slope</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="slope_1" name="slope" value="1" checked={formData.slope?.toString() === "1"} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="slope_1">Độ dốc phẳng - Flat Slope</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="slope_2" name="slope" value="2" checked={formData.slope?.toString() === "2"} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="slope_2">Độ dốc xuống - Negative Slope</label>
                            </div>
                        </div>


                        <div className="mb-3" id='numOfVessels'>
                            <label className="form-label fw-medium">Số lượng mạch máu lớn ở tim - numOfVessels</label>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="numOfVessels_0" name="numOfVessels" value="0" checked={formData.numOfVessels?.toString() === "0"} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="numOfVessels_0">Không có mạch máu lớn ở tim</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="numOfVessels_1" name="numOfVessels" value="1" checked={formData.numOfVessels?.toString() === "1"} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="numOfVessels_1">Một mạch máu lớn ở tim</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="numOfVessels_2" name="numOfVessels" value="2" checked={formData.numOfVessels?.toString() === "2"} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="numOfVessels_2">Hai mạch máu lớn ở tim</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="numOfVessels_3" name="numOfVessels" value="3" checked={formData.numOfVessels?.toString() === "3"} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="numOfVessels_3">Ba mạch máu lớn ở tim</label>
                            </div>
                        </div>


                        <div className="mb-3" id='thalRate'>
                            <label className="form-label fw-medium">Mức độ thalassemia (bệnh máu di truyền)</label>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="thalRate_1" name="thalRate" value="1" checked={formData.thalRate?.toString() === "1"} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="thalRate_1">Có bị thalassemia</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="thalRate_2" name="thalRate" value="2" checked={formData.thalRate?.toString() === "2"} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="thalRate_2">Không có dấu hiệu</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="thalRate_3" name="thalRate" value="3" checked={formData.thalRate?.toString() === "3"} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="thalRate_3">Bị thalassemia nhưng đang phục hồi</label>
                            </div>
                        </div>

                        <div className='button-group'>
                            <button onClick={handlePredict} className='btn btn-warning d-flex align-items-center justify-content-center'><box-icon name='heart' type='solid' className="me-4" ></box-icon> Chẩn Đoán</button>
                            <button type="submit" className='btn btn-success ms-2'>Cập Nhật</button>
                        </div>
                    </form>
                </div>
            </div>
            <Modal
                title="Kết Quả Chẩn Đoán"
                open={modalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Đóng
                    </Button>,
                ]}
            >
                {loading ? (
                    <Spin size="large" />
                ) : (
                    result === 1 ? (
                        <Result
                            status="warning"
                            className='text-danger'
                            title="Có xu hướng nhồi máu cơ tim"
                        />
                    ) : result === 0 ? (

                        <Result
                            status="success"
                            title="Không có xu hướng nhồi máu cơ tim"
                        />
                    ) : (
                        <h6 className="result-detail">Chưa chẩn đoán</h6>
                    )
                )}
            </Modal>
        </div>
    );
};

export default MedicalRecord;
