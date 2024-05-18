import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState("active-sidebar");
  const {logout} = useContext(AuthContext);
  const toggleSidebar = () => {
    setSidebar(
      sidebar === "active-sidebar" ? "inactive-sidebar" : "active-sidebar"
    );
  };

  const logoutHandle = async () => {
    try {
      const response = await fetch('http://localhost:4000/logout', {
        credentials: 'include',
        method: 'POST',
      });

      if (response.ok) {
        logout();
        navigate('/');
      } else {
        console.error('Failed to log out:', response.statusText);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className={`container-sidebar ${sidebar}`}>
      <div className="top-sidebar" onClick={toggleSidebar} id="btn-sidebar">
        <box-icon name="menu" size="lg" color="#3AA8A8"></box-icon>
      </div>

      <div className="list-content-sidebar">
        <ul>
          <li>
            <Link to="/dashboard">
              <box-icon name="home" color="#3AA8A8"></box-icon>
              <span className="item-nav">Trang Chủ</span>
            </Link>
          </li>

          <li className="mt-2">
            <Link to="/posts/show">
              <box-icon type="solid" name="file-plus" color="#3AA8A8"></box-icon>
              <span className="item-nav">Quản lý bài viết</span>
            </Link>
          </li>

          <li className="mt-2">
            <Link to="/patients/show">
              <box-icon type="solid" name="contact" color="#3AA8A8"></box-icon>
              <span className="item-nav">Quản lý bệnh nhân</span>
            </Link>
          </li>

          <li className="mt-2">
            <Link to="/calendar">
              <box-icon color="#3AA8A8" name="calendar-event" className="icon-sidebar" type="solid"></box-icon>
              <span className="item-nav">Quản lý lịch hẹn</span>
            </Link>
          </li>

          <li className="mt-2">
            <Link to="/history/show">
              <box-icon name='history' color="#3AA8A8"></box-icon>
              <span className="item-nav">Lịch sử thăm khám</span>
            </Link>
          </li>

          <li className="mt-2">
            <Link onClick={logoutHandle}>
              <box-icon name="log-out" className="icon-sidebar" color="#3AA8A8"></box-icon>
              <span className="item-nav">Đăng xuất</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
