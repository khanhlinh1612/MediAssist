import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './MedicalRecord.css';
import Sidebar from '../../components/Sidebar';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const MedicalRecord = () => {
  const { id } = useParams();
  const [result, setResult] = useState(2);
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


  const URL_API_AI = "https://predictapi.onrender.com/api/predict";

  useEffect(() => {
    axios.get(`http://localhost:4000/medicalRecord/${id}`)
      .then(response => {
        setFormData(response.data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    if(validateFormData()){
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
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log('This is updated formData', formData); // sử dụng giá trị mới nhất của formData
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

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  }

  return (
    <div className='row'>
      <div className='sidebar col-2'>
        <Sidebar />
      </div>
      <div className="main-record col-10">
        <div className="title">
          <h3>Hồ Sơ Bệnh Án</h3>
          <ToastContainer />
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
        </div>

        <form>
          <div className="mb-3 form-control-element" controlId='age' >
            <label className='mt-1 fw-medium w-25'>Độ tuổi</label>
            <input type="number" value={formData.age} ref={ageRef} onChange={handleChange} className='w-50' />
          </div>
          <div className="mb-3 form-control-element" controlId='exampleinputInput1' >
            <label className='mt-1 fw-medium w-25'>Giới tính</label>
            <select as="select" value={formData.gender} ref={genderRef} onChange={handleChange} className='w-50'>
              <option value="0">Nữ</option>
              <option value="1">Nam</option>
            </select>
          </div>

          <div className="mb-3 form-control-element" controlId='exampleinputInput2' >
            <label className='mt-1 fw-medium w-25'>Dạng đau ngực - Chest Pain</label>
            <select as="select" className='w-50' ref={chestPainRef} value={formData.chestPain} onChange={handleChange}>
              <option value='-1'>-----------------------------</option>
              <option value="0">Đau thắt ngực điển hình</option>
              <option value="1">Đau thắt ngực không điển hình</option>
              <option value="2">Đau nhưng không thắt ngực</option>
              <option value="3">Không có triệu chứng đau ngực</option>
            </select>
          </div>

          <div className="mb-3 form-control-element" controlId='exampleinputInput2' >
            <label className='mt-1 fw-medium w-25'>Huyết áp lúc nghỉ (mm Hg)</label>
            <input type="number" className='w-50' ref={restBloodPressureRef} value={formData.restBloodPressure} onChange={handleChange} />
          </div>

          <div className="mb-3 form-control-element" controlId='exampleinputInput2' >
            <label className='mt-1 fw-medium w-25'>Mỡ trong máu - Cholesterol (mg/dl)</label>
            <input type="number" className='w-50' ref={cholesterolRef} value={formData.cholesterol} onChange={handleChange} />
          </div>

          <div className="mb-3 form-control-element" controlId='exampleinputInput2' >
            <label className='mt-1 fw-medium w-25'>Đường huyết (mg/dl)</label>
            <select as="select" className='w-50' ref={bloodSugarRef} value={formData.bloodSugar} onChange={handleChange}>
              <option value='-1'>-----------------------------</option>
              <option value="0">Lượng đường huyết nhỏ hơn hoặc bằng 120 mg/dl</option>
              <option value="1">Lượng đường huyết lớn hơn 120 mg/dl</option>
            </select>
          </div>

          <div className="mb-3 form-control-element" controlId='exampleinputInput2' >
            <label className='mt-1 fw-medium w-25'>Kết quả điện tâm đồ - ECG </label>
            <select as="select" className='w-50' ref={restElectrocardiographicResultRef} value={formData.restElectrocardiographicResult} onChange={handleChange}>
              <option value='-1'>-----------------------------</option>
              <option value="0">Bình thường</option>
              <option value="1">Có sóng bất thường</option>
              <option value="2">Có thể xảy ra phì đại thất trái</option>
            </select>
          </div>

          <div className="mb-3 form-control-element" controlId='exampleinputInput1' >
            <label className='mt-1 fw-medium w-25'>Nhịp tim tối đa đạt được (bpm)</label>
            <input type="number" value={formData.maxHeartRate} ref={maxHeartRateRef} onChange={handleChange} className='w-50' />
          </div>

          <div className="mb-3 form-control-element" controlId='exampleinputInput2' >
            <label className='mt-1 fw-medium w-25'>Đau thắt ngực khi tập thể dục</label>
            <select as="select" className='w-50' ref={exerciseAnginaRef} value={formData.exerciseAngina} onChange={handleChange}>
              <option value='-1'>-----------------------------</option>
              <option value="0">Không đau thắt ngực khi tập thể dục</option>
              <option value="1">Có đau thắt ngực khi tập thể dục</option>
            </select>
          </div>

          <div className="mb-3 form-control-element" controlId='exampleinputInput2' >
            <label className='mt-1 fw-medium w-25'>Độ suy giảm của đoạn sóng ST - OldPeak (mm)</label>
            <input type="number" className='w-50' ref={oldPeakRef} value={formData.oldPeak} onChange={handleChange} />
          </div>

          <div className="mb-3 form-control-element" controlId='exampleinputInput2' >
            <label className='mt-1 fw-medium w-25'>Độ dốc của đoạn sóng ST - Slope</label>
            <select as="select" className='w-50' ref={slopeRef} value={formData.slope} onChange={handleChange}>
              <option value='-1'>-----------------------------</option>
              <option value="0">Độ dốc lên - Positive Slope</option>
              <option value="1">Độ dốc phẳng - Flat Slope</option>
              <option value="2">Độ dốc xuống - Negative Slope</option>
            </select>
          </div>

          <div className="mb-3 form-control-element" controlId='exampleinputInput2' >
            <label className='mt-1 fw-medium w-25'>Số lượng mạch máu lớn ở tim</label>
            <select as="select" className='w-50' ref={numOfVesselsRef} value={formData.numOfVessels} onChange={handleChange}>
              <option value='-1'>-----------------------------</option>
              <option value="0">Không có mạch máu lớn ở tim</option>
              <option value="1">Một mạch máu lớn ở tim</option>
              <option value="2">Hai mạch máu lớn ở tim</option>
              <option value="3">Ba mạch máu lớn ở tim</option>
            </select>
          </div>

          <div className="mb-3 form-control-element" controlId='exampleinputInput2' >
            <label className='mt-1 fw-medium w-25'>Mức độ thalassemia (bệnh máu di truyển)</label>
            <select as="select" className='w-50' ref={thalRateRef} value={formData.thalRate} onChange={handleChange}>
              <option value='-1'>-----------------------------</option>
              <option value="1">Có bị thalassemia</option>
              <option value="2">Không có dấu hiệu</option>
              <option value="3">Bị thalassemia nhưng đang phục hồi</option>
            </select>
          </div>
        </form>

        <div className='button-group'>
          <button onClick={handleSubmit} className='btn btn-warning'>Chẩn Đoán</button>
          <button onClick={handleUpdate} className='btn btn-success ms-2'>Cập Nhật</button>
        </div>

      </div>
    </div>


  );
}

export default MedicalRecord;
