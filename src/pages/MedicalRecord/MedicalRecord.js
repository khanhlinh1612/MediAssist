import React, { useState, useRef, useEffect } from 'react';
import Sidebar from "../../components/Sidebar";
import './MedicalRecord.css';
import axios from 'axios';
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

    const URL_API_AI = "https://predictapi.onrender.com/api/predict";
    useEffect(() => {
        axios.get(`http://localhost:4000/medicalRecord/${id}`)
            .then(response => {
                setFormData(prevState => ({
                    ...prevState,
                    age: response.data.age,
                    gender: response.data.gender,
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
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {

        e.preventDefault();
        console.log('ok');
        if (validateFormData()) {
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

    const validateFormData = () => {
        const numberFields = ['age', 'restBloodPressure', 'cholesterol', 'maxHeartRate', 'oldPeak', 'numOfVessels'];
        for (const fieldName in refs) {
            const fieldRef = refs[fieldName].current;
            if (!fieldRef.value || fieldRef.value === "-1") {
                fieldRef.focus();
                showWarningToast("Vui lòng nhập đầy đủ thông tin.");
                return false;
            }
            else {
                if (numberFields.includes(fieldName)) {
                    const fieldValue = refs[fieldName].current.value;
                    if (isNaN(fieldValue)) {
                        refs[fieldName].current.focus();
                        showWarningToast(`Trường ${fieldName} phải có giá trị là số.`);
                        return false;
                    }
                }
            }
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
            console.log('This is formData nhen',formData);
            const sendData = {
                "age": parseInt(formData.age),
                "sex": parseInt(formData.gender),
                "cp": parseInt(formData.chestPain),
                "trestbps": parseInt(formData.restBloodPressure),
                "chol": parseInt(formData.cholesterol),
                "fbs": parseInt(formData.bloodSugar),
                "restecg": parseInt(formData.restElectrocardiographicResult),
                "thalach": parseInt(formData.maxHeartRate),
                "exang": parseInt(formData.exerciseAngina),
                "oldpeak": parseInt(formData.oldPeak),
                "slope": parseInt(formData.slope),
                "ca": parseInt(formData.numOfVessels),
                "thal": parseInt(formData.thalRate),
            };

            try {
                console.log(sendData);
                const response = await axios.post(URL_API_AI, sendData);

                if (response.data.prediction === 1) {
                    setResult(1);
                }
                else {
                    setResult(0);
                }
            } catch (error) {
                console.error('Error:', error);
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

                <div className='create-patient-content'>
                    <div className='result'>
                        <h4>Kết quả:</h4>
                        {
                            result === 1 ? (
                                <h6 className="result-detail">Có xu hướng nhồi máu cơ tim</h6>
                            ) : result === 0 ? (
                                <h6 className="result-detail">Không có xu hướng nhồi máu cơ tim</h6>
                            ) : (
                                <h6 className="result-detail">Chưa chẩn đoán</h6>
                            )
                        }

                    </div>
                    <form onSubmit={handleSubmit} className='row justify-content-between'>
                        <div className="mb-3" id='age'>
                            <label htmlFor="age" className="form-label fw-medium">Độ tuổi</label>
                            <input type="number" id="age" name="age" value={formData.age} ref={ageRef} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="mb-3" id='gender'>
                            <label htmlFor="gender" className="form-label fw-medium">Giới tính</label>
                            <select id="gender" name="gender" as="select" value={formData.gender} ref={genderRef} onChange={handleChange} className="form-control">
                                <option value="0">Nữ</option>
                                <option value="1">Nam</option>
                            </select>
                        </div>
                        <div className="mb-3" id='chestPain'>
                            <label htmlFor="chestPain" className="form-label fw-medium">Dạng đau ngực - Chest Pain</label>
                            <select id="chestPain" name="chestPain" as="select" className="form-control" ref={chestPainRef} value={formData.chestPain} onChange={handleChange}>
                                <option value='-1'>-----------------------------</option>
                                <option value="0">Đau thắt ngực điển hình</option>
                                <option value="1">Đau thắt ngực không điển hình</option>
                                <option value="2">Đau nhưng không thắt ngực</option>
                                <option value="3">Không có triệu chứng đau ngực</option>
                            </select>
                        </div>

                        <div className="mb-3" id='restBloodPressure'>
                            <label htmlFor="restBloodPressure" className="form-label fw-medium">Huyết áp lúc nghỉ (mm Hg)</label>
                            <input type="number" id="restBloodPressure" name="restBloodPressure" className="form-control" ref={restBloodPressureRef} value={formData.restBloodPressure} onChange={handleChange} />
                        </div>

                        <div className="mb-3" id='cholesterol'>
                            <label htmlFor="cholesterol" className="form-label fw-medium">Mỡ trong máu - Cholesterol (mg/dl)</label>
                            <input type="number" id="cholesterol" name="cholesterol" className="form-control" ref={cholesterolRef} value={formData.cholesterol} onChange={handleChange} />
                        </div>

                        <div className="mb-3" id='bloodSugar'>
                            <label htmlFor="bloodSugar" className="form-label fw-medium">Đường huyết (mg/dl)</label>
                            <select id="bloodSugar" name="bloodSugar" as="select" className="form-control" ref={bloodSugarRef} value={formData.bloodSugar} onChange={handleChange}>
                                <option value='-1'>-----------------------------</option>
                                <option value="0">Lượng đường huyết nhỏ hơn hoặc bằng 120 mg/dl</option>
                                <option value="1">Lượng đường huyết lớn hơn 120 mg/dl</option>
                            </select>
                        </div>

                        <div className="mb-3" id='restElectrocardiographicResult'>
                            <label htmlFor="restElectrocardiographicResult" className="form-label fw-medium">Kết quả điện tâm đồ - ECG </label>
                            <select id="restElectrocardiographicResult" name="restElectrocardiographicResult" as="select" className="form-control" ref={restElectrocardiographicResultRef} value={formData.restElectrocardiographicResult} onChange={handleChange}>
                                <option value='-1'>-----------------------------</option>
                                <option value="0">Bình thường</option>
                                <option value="1">Có sóng bất thường</option>
                                <option value="2">Có thể xảy ra phì đại thất trái</option>
                            </select>
                        </div>

                        <div className="mb-3" id='maxHeartRate'>
                            <label htmlFor="maxHeartRate" className="form-label fw-medium">Nhịp tim tối đa đạt được (bpm)</label>
                            <input type="number" id="maxHeartRate" name="maxHeartRate" className="form-control" ref={maxHeartRateRef} value={formData.maxHeartRate} onChange={handleChange} />
                        </div>

                        <div className="mb-3" id='exerciseAngina'>
                            <label htmlFor="exerciseAngina" className="form-label fw-medium">Đau thắt ngực khi tập thể dục</label>
                            <select id="exerciseAngina" name="exerciseAngina" as="select" className="form-control" ref={exerciseAnginaRef} value={formData.exerciseAngina} onChange={handleChange}>
                                <option value='-1'>-----------------------------</option>
                                <option value="0">Không đau thắt ngực khi tập thể dục</option>
                                <option value="1">Có đau thắt ngực khi tập thể dục</option>
                            </select>
                        </div>

                        <div className="mb-3" id='oldPeak'>
                            <label htmlFor="oldPeak" className="form-label fw-medium">Độ suy giảm của đoạn sóng ST - OldPeak (mm)</label>
                            <input type="number" id="oldPeak" name="oldPeak" className="form-control" ref={oldPeakRef} value={formData.oldPeak} onChange={handleChange} />
                        </div>

                        <div className="mb-3" id='slope'>
                            <label htmlFor="slope" className="form-label fw-medium">Độ dốc của đoạn sóng ST - Slope</label>
                            <select id="slope" name="slope" as="select" className="form-control" ref={slopeRef} value={formData.slope} onChange={handleChange}>
                                <option value='-1'>-----------------------------</option>
                                <option value="0">Độ dốc lên - Positive Slope</option>
                                <option value="1">Độ dốc phẳng - Flat Slope</option>
                                <option value="2">Độ dốc xuống - Negative Slope</option>
                            </select>
                        </div>

                        <div className="mb-3" id='numOfVessels'>
                            <label htmlFor="numOfVessels" className="form-label fw-medium">Số lượng mạch máu lớn ở tim</label>
                            <select id="numOfVessels" name="numOfVessels" as="select" className="form-control" ref={numOfVesselsRef} value={formData.numOfVessels} onChange={handleChange}>
                                <option value='-1'>-----------------------------</option>
                                <option value="0">Không có mạch máu lớn ở tim</option>
                                <option value="1">Một mạch máu lớn ở tim</option>
                                <option value="2">Hai mạch máu lớn ở tim</option>
                                <option value="3">Ba mạch máu lớn ở tim</option>
                            </select>
                        </div>

                        <div className="mb-3" id='thalRate'>
                            <label htmlFor="thalRate" className="form-label fw-medium">Mức độ thalassemia (bệnh máu di truyền)</label>
                            <select id="thalRate" name="thalRate" as="select" className="form-control" ref={thalRateRef} value={formData.thalRate} onChange={handleChange}>
                                <option value='-1'>-----------------------------</option>
                                <option value="1">Có bị thalassemia</option>
                                <option value="2">Không có dấu hiệu</option>
                                <option value="3">Bị thalassemia nhưng đang phục hồi</option>
                            </select>
                        </div>
                        <div className='button-group'>
                            <button onClick={handlePredict} className='btn btn-warning'>Chẩn Đoán</button>
                            <button type="submit" className='btn btn-success ms-2'>Cập Nhật</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MedicalRecord;
