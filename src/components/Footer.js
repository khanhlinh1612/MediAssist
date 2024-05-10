import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

function FooterApp() {
    return (
        <div className="Footer">
            <MDBFooter bgColor='#3AA8A8' className='text-center text-lg-start text-muted'>
                <div className='ps-5 d-flex justify-content-center px-5 py-4 border-bottom'>
                    {/* <div className='d-none d-lg-block ms-5'>
                        <span className='text-light'><b>Liên hệ</b></span>
                    </div> */}
                    <div className='ms-4 me-5'>
                        <Link to='/' className='me-4 text-reset'>
                            <box-icon type='logo' name='facebook-circle' color="white"></box-icon>
                        </Link>
                        <Link to='/' className='me-4 text-reset'>
                            <box-icon name='twitter' type='logo' color="white"></box-icon>
                        </Link>
                        <Link to='/' className='me-4 text-reset'>
                            <box-icon type='logo' name='google' color="white"></box-icon>
                        </Link>
                        <Link to='/' className='me-4 text-reset'>
                            <box-icon name='instagram-alt' type='logo' color="white"></box-icon>
                        </Link>
                        <Link to='/' className='me-4 text-reset'>
                            <box-icon name='linkedin-square' type='logo' color="white"></box-icon>
                        </Link>
                        <Link to='/' className='me-4 text-reset'>
                            <box-icon type='logo' name='github' color="white"></box-icon>
                        </Link>
                    </div>
                </div>
                <MDBContainer className='text-center text-md-start text-light'>
                    <MDBRow className='pt-3'>
                        <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>
                                <MDBIcon icon="gem" className="me-3" />
                                MediAssist
                            </h6>
                            <p className="text-light">
                                Chúng tôi cung cấp các dịch vụ quản lý phòng khám chuyên nghiệp, giúp bác sĩ và nhân viên y tế quản lý thông tin bệnh nhân, lịch hẹn và nhiều hơn nữa.
                            </p>
                        </MDBCol>

                        <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Sản phẩm</h6>
                            <p>
                                <Link to='/' className='text-reset text-white'>
                                    Hệ thống quản lý phòng khám
                                </Link>
                            </p>
                            <p>
                                <Link to='/' className='text-reset text-white'>
                                    Appointments
                                </Link>
                            </p>
                            <p>
                                <Link to='/' className='text-reset text-white'>
                                    Chăm sóc sức khỏe
                                </Link>
                            </p>
                            <p>
                                <Link to='/' className='text-reset text-white'>
                                    Hóa đơn và thanh toán
                                </Link>
                            </p>
                        </MDBCol>

                        <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Liên kết hữu ích</h6>
                            <p>
                                <Link to='/' className='text-reset text-white'>
                                    Giá cả
                                </Link>
                            </p>
                            <p>
                                <Link to='/' className='text-reset text-white'>
                                    Cài đặt
                                </Link>
                            </p>
                            <p>
                                <Link to='/' className='text-reset text-white'>
                                    Đơn đặt hàng
                                </Link>
                            </p>
                            <p>
                                <Link to='/' className='text-reset text-white'>
                                    Trợ giúp
                                </Link>
                            </p>
                        </MDBCol>

                        <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-2'>
                            <h6 className='text-uppercase fw-bold mb-4'>Liên hệ</h6>
                            <p>
                                <MDBIcon icon="home" className="me-2" />
                                Thành Phố Hồ Chí Minh, Việt Nam
                            </p>
                            <p>
                                <MDBIcon icon="envelope" className="me-3" />
                                info@mediassist.com
                            </p>
                            <p>
                                <MDBIcon icon="phone" className="me-3" /> +84 234 567 89
                            </p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                <div className='text-center p-4 text-light' style={{ backgroundColor: '#3AA8A8' }}>
                    ©2024 Copyright: {
                        <Link className='text-reset fw-bold' href='https://mdbootstrap.com/'>
                        MediAssist
                    </Link>
                    }

                </div>
            </MDBFooter>
        </div>
    );
}

export default FooterApp;
