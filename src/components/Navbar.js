import React from 'react';
import {Link} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../images/logo.png';
import avatar from '../images/avatar.jpg';
import './Navbar.css';
function NavbarApp(){
    return (
        <Navbar expand="lg" className="navbar" >
            <Container>
          <Navbar.Brand href="home" className="brand">
            <img
              alt=""
              src={logo}
              width="35"
              height="35"
              className="d-inline-block align-top me-1"
            />{' '}
            MediAssist
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="info-container w-100">
                <div className='info-user'>
                    <img alt="" src={avatar} width="35" height="35" className="avatar"/>
                    <Nav.Link href="profile-form" className="nav-script">Hieu Nguyen</Nav.Link>
                </div>
                <Link to="/" className="nav-script">Đăng xuất</Link>
            </Nav>
        </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}
export default NavbarApp;
