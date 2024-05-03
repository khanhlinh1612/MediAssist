import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../images/logo.png';
import { UserContext } from '../UserContext';
import './Navbar.css';

function NavbarApp() {
  const navigate = useNavigate();
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [userInfoUpdated, setUserInfoUpdated] = useState(false);
  const userName = userInfo?.first_name + ' ' + userInfo?.last_name;
  const userAvatar = userInfo?.avatar;

  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    })
      .then(response =>
        response.json().then(userInfo => {
          console.log(userInfo);
          if (userInfo.status === 'valid') {
            setUserInfo(userInfo.Doctor);
            setUserInfoUpdated(true); // Đánh dấu rằng userInfo đã được cập nhật
          }
        })
      )
      .catch(error => {
        console.error('Error fetching profile:', error);
      });
  }, [setUserInfo]);

  function Logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    })
      .then(() => {
        setUserInfo(null);
        setUserInfoUpdated(false); // Đánh dấu rằng userInfo đã được cập nhật
        navigate('/');
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  }

  return (
    <Navbar expand="lg" className="navbar">
      <Container>
        <Navbar.Brand href="home" className="brand">
          <img alt="" src={logo} width="35" height="35" className="d-inline-block align-top me-1" /> MediAssist
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="info-container w-100">
            {userInfoUpdated ? (
              userInfo ? (
                <div className="info-user">
                  <img alt="" src={'http://localhost:4000/'+userAvatar} width="35" height="35" className="avatar" />
                  <Link to={'/infor'} className='nav-script ms-2'>
                    {userName}
                  </Link>
                </div>
              ) : (
                <Link to="/login" className="nav-script">
                  Đăng nhập
                </Link>
              )
            ) : (
              <Link to="/login" className="nav-script">
                Đăng nhập
              </Link>
            )}
            {userInfoUpdated ? (
              <Link onClick={Logout} className="nav-script ms-4">
                Đăng xuất
              </Link>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarApp;
