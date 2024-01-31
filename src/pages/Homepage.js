import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import welcomeillustration from '../images/welcomeillustration.jpg';
import './styles.css'
const HomePage = () => {
    return (

        <div className='main-content'>
            <div className='home-container row'>
                <div className="col-6">
                    <img alt="" src={welcomeillustration} className="welillustration"/>
                </div>

                <div className="col-6 home-content">
                        <h1 className='home-title'>Chào mừng đến với MediAssist</h1>
                        <p className="home-script">Chúng tôi sẽ cung cấp các giải pháp hiện đại và thuận tiện để hỗ trợ các y bác sĩ trong việc quản lý phòng khám.</p>
                        <p className="home-script">Với giao diện thân thiện và tính năng linh hoạt, trang web sẽ tạo ra một môi trường làm việc hiệu quả và thoải mái cho các chuyên gia y tế. Hãy đồng hành cùng chúng tôi để xây dựng cộng đồng y tế mạnh mẽ và phát triển! </p>
                    <Link to='/login' className="home-btn-box">
                        <button type="button" className='home-btn btn btn-lg btn-block btn-outline-warning'>Hãy bắt đầu nào</button>
                    </Link>

                </div>

            </div>

        </div>
    );
}
export default HomePage;
