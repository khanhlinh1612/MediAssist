import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './Login.css';
import loginImg from '../../images/loginImg2.svg';
import { FaPenClip } from "react-icons/fa6";
const Login = () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
    }
    return (
        <div className='main-login'>
            <div className="login-contain">
                <div className="left-side">
                    <div className="icon-box">
                        <FaPenClip className="login-icon" />
                    </div>

                    <form onSubmit={handleSubmit}>
                        <label for="phone" className='label-login'>Phone Number</label>
                            <input placeholder='Enter you phone...' type='tel' className="input-login" id="phone" value={phone} onChange={(e) => {setPhone(e.target.value)}}/>
                        <label className='label-login' for="email">Email</label>
                            <input placeholder='Enter password...' type='password' className='input-login' id="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                        <Link to="/dashboard"><button type='submit' id="sub-button">Log in</button></Link>
                    </form>
                </div>
                <div className="right-side">
                    <div className='loginNote'>
                        <h2 className='text-note'>Chào mừng quay trở lại !</h2>

                    </div>
                    <div className='loginImgBox'>
                        <img alt="" src={loginImg} id="loginImg"/>
                    </div>
                </div>
            </div>

        </div>
    );
}
export default Login;
