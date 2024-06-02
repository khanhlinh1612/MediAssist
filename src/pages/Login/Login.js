import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import loginImg from "../../assets/loginImg2.svg";
import { FaPenClip } from "react-icons/fa6";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../context/UserContext";

const Login = () => {

  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validatePhone = () => {
    if (!phone) {
      setPhoneError("Please enter your phone number");
      return false;
    } else if (!/^\d{10}$/.test(phone)) {
      setPhoneError("Phone number must be 10 digits");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("Please enter your password");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleBlur = (field) => () => {
    switch (field) {
      case "phone":
        validatePhone();
        break;
      case "password":
        validatePassword();
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isPhoneValid = validatePhone();
    const isPasswordValid = validatePassword();

    if (!isPhoneValid || !isPasswordValid) {
      return;
    }

    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ phone_number: phone, password: password }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const userInfo = await response.json();
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      setUserInfo(userInfo);
      toast.success("Đăng nhập thành công!", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 2500);
    } catch (error) {
      toast.warning("Thông tin đăng nhập sai!", {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      console.error("Request failed:", error);
    }
  };

  return (
    <div className="main-login">
      <div className="login-contain row">
        <ToastContainer />
        <div className="col-sm-4 left-side">
          <div className="icon-box">
            <FaPenClip className="login-icon" />
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="phone" className="label-login">
              Phone Number
            </label>
            <input
              placeholder="Enter your phone..."
              type="tel"
              className={`input-login ${phoneError ? "is-invalid" : ""}`}
              id="phone"
              value={phone}
              onBlur={handleBlur("phone")}
              onChange={handlePhoneChange}
            />
            {phoneError && <span className="invalid-feedback text-danger">{phoneError}</span>}

            <label htmlFor="password" className="label-login mt-4">
              Password
            </label>
            <input
              placeholder="Enter password..."
              type="password"
              className={`input-login ${passwordError ? "is-invalid" : ""}`}
              id="password"
              onBlur={handleBlur("password")}
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordError && <span className="invalid-feedback text-danger">{passwordError}</span>}

            <button type="submit" id="sub-button" className="mt-4">
              Log in
            </button>
          </form>
        </div>
        <div className="right-side d-none d-sm-block col-4">
          <div className="loginNote">
            <h2 className="text-note">Welcome back!</h2>
          </div>
          <div className="loginImgBox">
            <img alt="" src={loginImg} id="loginImg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
