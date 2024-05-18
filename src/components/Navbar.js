import React, { useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/logo.png';
import { UserContext } from '../context/UserContext';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

function NavbarApp() {
  const navigate = useNavigate();
  const {userInfo} = useContext(UserContext);
  const {logout} = useContext(AuthContext);
  const userName = `${userInfo?.first_name ?? ''} ${userInfo?.last_name ?? ''}`;
  const userAvatar = userInfo?.avatar;


  const logoutHandle = () => {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    })
      .then(() => {
        logout();
        navigate('/');
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  };

  return (
    <Navbar expand="lg" className="navbar">
      <Container>
        <Navbar.Brand href={userInfo ? '/dashboard' : '/'} className="brand">
          <img
            alt=""
            src={logo}
            width="35"
            height="35"
            className="d-inline-block align-top me-1"
          />
          MediAssist
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="info-container w-100">
            {userInfo ? (
              <div className="info-user">
                <img
                  alt=""
                  src={`http://localhost:4000/${userAvatar}`}
                  width="35"
                  height="35"
                  className="avatar"
                />
                <Link to={'/infor'} className='nav-script ms-2'>
                  {userName}
                </Link>
                <span onClick={logoutHandle} className="nav-script ms-4">
                  Đăng xuất
                </span>
              </div>
            ) : (
              <Link to="/login" className="nav-script">
                Đăng nhập
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarApp;
