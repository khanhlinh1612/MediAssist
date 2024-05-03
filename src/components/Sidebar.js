import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
const Sidebar = () => {
  const [sidebar, setSidebar] = useState("active-sidebar");
  const toggleSidebar = () => {
    setSidebar(
      sidebar === "active-sidebar" ? "inactive-sidebar" : "active-sidebar"
    );
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
              <box-icon
                type="solid"
                name="contact"
                color="#3AA8A8"
              ></box-icon>
              <span className="item-nav">Quản lý bệnh nhân</span>
            </Link>
          </li>

          <li className="mt-2">
            <Link to="/history/show">
              <box-icon name='history'  color="#3AA8A8"></box-icon>
              <span className="item-nav">Lịch sử thăm khám</span>
            </Link>
          </li>
          <li className="mt-2">
            <Link to="/history/show">
              <box-icon name='history'  color="#3AA8A8"></box-icon>
              <span className="item-nav">Hồ sơ bệnh án</span>
            </Link>
          </li>

          <li className="mt-2">
            <Link to="/calendar">
              <box-icon
                color="#3AA8A8"
                name="calendar-event"
                className="icon-sidebar"
                type="solid"
              ></box-icon>
              <span className="item-nav">Quản lý lịch hẹn</span>
            </Link>
          </li>

          <li className="mt-2">
            <Link to="/">
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
