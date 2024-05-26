import React, { useContext, useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar";
import { Link } from "react-router-dom";
import "./DoctorDetail.css";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from '../../../context/UserContext';

const Speciality = ({ specialities }) => {
  return (
    <div className="mt-3">
      {specialities.map((speciality, index) => (
        <button key={index} type="button" className="btn special-btn">
          {speciality}
        </button>
      ))}
    </div>
  );
};

const DoctorDetail = () => {
  const { userInfo } = useContext(UserContext);
  const [doctorInfo, setDoctorInfo] = useState(null);

  useEffect(() => {
    if (userInfo) {
      setDoctorInfo(userInfo);
    }
  }, [userInfo]);

  return (
    <div className="create-patient-page row">
      <div className="col-md-2 col-3">
        <Sidebar />
      </div>
      <div className="col-md-10 col-9 show-post-box">
        <div className="create-patient-title">
          <h3 className="title_part_show-post">Hồ Sơ Cá Nhân</h3>
        </div>
        <div className="doctor-detail-content row">
          <div className="btn-box">
            <Link to={"/updateInfor"}>
              <button className="patient-create-button btn btn-warning">
                Cập Nhật
              </button>
            </Link>
          </div>
          {doctorInfo && (
            <>
              <div className="avatar-box col-6 col-md-4 mb-5">
                <img
                  alt="Remy Sharp"
                  src= {doctorInfo.avatar}
                  style={{
                    width: "100%",
                    height: "100%",
                    maxHeight: "60vh",
                    objectFit: "cover",
                    borderRadius: "10%",
                  }}
                />
              </div>
              <div className="info-box col-12 col-md-8">
                <div className="main-box">
                  <div className="main-title">
                    <h2 className="title-info">Bác sĩ {doctorInfo.fullname}</h2>
                    <h5 className="description-info">{doctorInfo.description}</h5>
                  </div>
                  <div className="container-info">
                    <label className="label-info">Giới Tính</label>
                    <div className="content-info">{doctorInfo.gender}</div>
                  </div>
                  <div className="container-info">
                    <label className="label-info">Tuổi Tác</label>
                    <div className="content-info">{doctorInfo.age} năm</div>
                  </div>
                  <div className="container-info">
                    <label className="label-info">Kinh Nghiệm</label>
                    <div className="content-info">{doctorInfo.experienced_year} năm</div>
                  </div>
                  <div className="container-info">
                    <label className="label-info">Chức Vụ</label>
                    <div className="content-info">{doctorInfo.position}</div>
                  </div>
                  <div className="container-info">
                    <label className="label-info">Nơi Công Tác</label>
                    <div className="content-info">{doctorInfo.workplace}</div>
                  </div>
                  <div className="container-info">
                    <label className="label-info">Chuyên Ngành</label>
                    <div className="content-info">
                      <Speciality specialities={doctorInfo.specialist} />
                    </div>
                  </div>
                  <div className="container-info">
                    <label className="label-info">Số Điện Thoại</label>
                    <div className="content-info">{doctorInfo.phone_number}</div>
                  </div>
                  <div className="container-info">
                    <label className="label-info">Email</label>
                    <div className="content-info">{doctorInfo.email}</div>
                  </div>
                  <div className="container-info mb-4">
                    <label className="label-info">Địa Chỉ</label>
                    <div className="content-info">{doctorInfo.address}</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;
