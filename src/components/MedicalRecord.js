import React, { useState } from 'react';
import axios from 'axios';
import './MedicalRecord.css';
import Form from 'react-bootstrap/Form';
const MedicalRecord = () => {
  const [result, setResult] = useState(0);
  const [formData, setFormData] = useState({
    age: "",
    gender: "0",
    maxHeartRate: "",
    restElectrocardiographicResult: "0",
    exerciseAngina: "0",
    cholesterol: "",
    chestPain: "0",
    restBloodPressure: "",
    bloodSugar: "0",
    oldPeak: "",
    slope: "0",
    numOfVessels: "0",
    thalRate: "0",
  });
  const URL_API_AI = "https://predictapi.onrender.com/api/predict" ;
  const handleSubmit = async () => {

    const sendData ={
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
    console.log(formData);
    console.log(sendData);
    try {
      // Gửi yêu cầu đến server AI và xử lý kết quả
      const response = await axios.post(URL_API_AI, sendData);
      console.log(response.data);
      if (response.data.prediction === 1){
        setResult(1);
      }
      else {
        setResult(0);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="main-record">
      <div className="title">
        <h3>Hồ Sơ Bệnh Án</h3>
        <div className='result'>
          <h4>Kết quả:</h4>
          {
            result === 1 ? (
              <h6 className="result-detail">Có xu hướng nhồi máu cơ tim</h6>
            ):(
              <h6 className="result-detail">Không có xu hướng nhồi máu cơ tim</h6>
            )
          }

        </div>
      </div>

      <Form>
        <Form.Group className='form-control-element' controlId='age' >
          <Form.Label className='mt-1 fw-medium w-25'>Độ tuổi</Form.Label>
          <Form.Control type="number" value={formData.age} onChange={(e)=>setFormData({...formData, age: e.target.value})} className='w-50' />
        </Form.Group>
        {/* <span class="form-message age">Hi</span> */}
        <Form.Group className='form-control-element' controlId='exampleForm.ControlInput1' >
          <Form.Label className='mt-1 fw-medium w-25'>Giới tính</Form.Label>
          <Form.Control as="select" value={formData.gender} onChange={(e)=>setFormData({...formData, gender: e.target.value})} className='w-50'>
            <option value="0">Nữ</option>
            <option value="1">Nam</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className='form-control-element' controlId='exampleForm.ControlInput2' >
          <Form.Label className='mt-1 fw-medium w-25'>Dạng đau ngực - Chest Pain</Form.Label>
          <Form.Control as="select" className='w-50' value={formData.chestPain} onChange={(e)=>setFormData({...formData, chestPain: e.target.value})}>
            <option value="0">Đau thắt ngực điển hình</option>
            <option value="1">Đau thắt ngực không điển hình</option>
            <option value="2">Đau nhưng không thắt ngực</option>
            <option value="3">Không có triệu chứng đau ngực</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className='form-control-element' controlId='exampleForm.ControlInput2' >
          <Form.Label className='mt-1 fw-medium w-25'>Huyết áp lúc nghỉ (mm Hg)</Form.Label>
          <Form.Control type="number" className='w-50' value={formData.restBloodPressure} onChange={(e) => setFormData({...formData, restBloodPressure: e.target.value})}/>
        </Form.Group>

        <Form.Group className='form-control-element' controlId='exampleForm.ControlInput2' >
          <Form.Label className='mt-1 fw-medium w-25'>Mỡ trong máu - Cholesterol (mg/dl)</Form.Label>
          <Form.Control type="text" className='w-50' value={formData.cholesterol} onChange={(e)=>setFormData({...formData, cholesterol: e.target.value})}/>
        </Form.Group>

        <Form.Group className='form-control-element' controlId='exampleForm.ControlInput2' >
          <Form.Label className='mt-1 fw-medium w-25'>Đường huyết (mg/dl)</Form.Label>
          <Form.Control as="select" className='w-50' value={formData.bloodSugar} onChange={(e) => setFormData({...formData, bloodSugar: e.target.value})}>
            <option value="0">Lượng đường huyết nhỏ hơn hoặc bằng 120 mg/dl</option>
            <option value="1">Lượng đường huyết lớn hơn 120 mg/dl</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className='form-control-element' controlId='exampleForm.ControlInput2' >
          <Form.Label className='mt-1 fw-medium w-25'>Kết quả điện tâm đồ - ECG </Form.Label>
          <Form.Control as="select" className='w-50' value={formData.restElectrocardiographicResult} onChange={(e)=>setFormData({...formData, restElectrocardiographicResult: e.target.value})}>
              <option value="0">Bình thường</option>
              <option value="1">Có sóng bất thường</option>
              <option value="2">Có thể xảy ra phì đại thất trái</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className='form-control-element' controlId='exampleForm.ControlInput1' >
          <Form.Label className='mt-1 fw-medium w-25'>Nhịp tim tối đa đạt được (bpm)</Form.Label>
          <Form.Control type="number" value={formData.maxHeartRate} onChange={(e)=>setFormData({...formData, maxHeartRate: e.target.value})} className='w-50' />
        </Form.Group>

        <Form.Group className='form-control-element' controlId='exampleForm.ControlInput2' >
          <Form.Label className='mt-1 fw-medium w-25'>Đau thắt ngực khi tập thể dục</Form.Label>
          <Form.Control as="select" className='w-50' value={formData.exerciseAngina} onChange={(e)=>setFormData({...formData, exerciseAngina: e.target.value})}>
              <option value="0">Không đau thắt ngực khi tập thể dục</option>
              <option value="1">Có đau thắt ngực khi tập thể dục</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className='form-control-element' controlId='exampleForm.ControlInput2' >
          <Form.Label className='mt-1 fw-medium w-25'>Độ suy giảm của đoạn sóng ST - OldPeak (mm)</Form.Label>
          <Form.Control type="text" className='w-50' value={formData.oldPeak} onChange={(e) => setFormData({...formData, oldPeak: e.target.value})}/>
        </Form.Group>

        <Form.Group className='form-control-element' controlId='exampleForm.ControlInput2' >
          <Form.Label className='mt-1 fw-medium w-25'>Độ dốc của đoạn sóng ST - Slope</Form.Label>
          <Form.Control as="select" className='w-50' value={formData.slope} onChange={(e) => setFormData({...formData, slope: e.target.value})}>
            <option value="0">Độ dốc xuống - Negative Slope</option>
            <option value="1">Độ dốc phẳng - Flat Slope</option>
            <option value="2">Độ dốc lên - Positive Slope</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className='form-control-element' controlId='exampleForm.ControlInput2' >
          <Form.Label className='mt-1 fw-medium w-25'>Số lượng mạch máu lớn ở tim bị tắc nghẽn hoặc ảnh hưởng</Form.Label>
          <Form.Control as="select" className='w-50' value={formData.numOfVessels} onChange={(e) => setFormData({...formData, numOfVessels: e.target.value})}>
              <option value="0">Không có mạch máu lớn nào bị tắc nghẽn hoặc ảnh hưởng</option>
              <option value="1">Một mạch máu lớn bị tắc nghẽn hoặc ảnh hưởng</option>
              <option value="2">Hai mạch máu lớn bị tắc nghẽn hoặc ảnh hưởng</option>
              <option value="3">Ba mạch máu lớn bị tắc nghẽn hoặc ảnh hưởng</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className='form-control-element' controlId='exampleForm.ControlInput2' >
          <Form.Label className='mt-1 fw-medium w-25'>Mức độ thalassemia (bệnh máu di truyển)</Form.Label>
          <Form.Control as="select" className='w-50' value={formData.thalRate} onChange={(e) => setFormData({...formData, thalRate: e.target.value})}>
            <option value="1">Mức độ thalassemia nhẹ</option>
            <option value="2">Mức độ thalassemia trung bình</option>
            <option value="3">Mức độ thalassemia nặng</option>
          </Form.Control>
        </Form.Group>
      </Form>

      <div className='button-group'>
        <button onClick={handleSubmit} className='btn btn-warning'>Chẩn Đoán</button>
        <button onClick={handleSubmit} className='btn btn-success ms-2'>Cập Nhật</button>
      </div>

    </div>
  );
}

export default MedicalRecord;
