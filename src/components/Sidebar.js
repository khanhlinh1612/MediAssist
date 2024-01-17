import React from 'react';
import './Sidebar.css'
const Sidebar = () => {
  return (
    <div className='container-sidebar'>
        <div className='element'>Trang Chủ</div>
        <div className='element'>Quản Lý Bài Viết</div>
        <div className='element'>Quản Lý Bệnh Nhân</div>
        <div className='element'>Quản Lý Lịch Hẹn</div>
    </div>
  );
}

export default Sidebar;
