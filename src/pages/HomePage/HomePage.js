import React from 'react';
import {Link} from 'react-router-dom';
import welcomeillustration from '../../images/welcomeillustration.jpg';
import './HomePage.css'
const HomePage = () => {
    return (

        <div className='main-content'>
            <div className='home-container row'>
                <div className="col-sm-6 col-12">
                    <img alt="" src={welcomeillustration} className="welillustration"/>
                </div>

                <div className="col-sm-6 col-12 home-content">
                    <div className='mb-4 home-box'>
                        <h1 className='mb-3'>Chào mừng đến với MediAssist</h1>
                        <p className="home-script">Chúng tôi sẽ cung cấp các giải pháp hiện đại và thuận tiện để hỗ trợ các y bác sĩ trong việc quản lý phòng khám.</p>
                        <p className="home-script">Với giao diện thân thiện và tính năng linh hoạt, trang web sẽ tạo ra một môi trường làm việc hiệu quả và thoải mái cho các chuyên gia y tế. Hãy đồng hành cùng chúng tôi để xây dựng cộng đồng y tế mạnh mẽ và phát triển! </p>
                    </div>

                    <Link to='/login' className="home-btn-box">
                        <button type="button" className='home-btn btn btn-lg btn-block btn-outline-secondary'>Hãy bắt đầu nào</button>
                    </Link>
                </div>

            </div>

        </div>
    );
}
export default HomePage;
