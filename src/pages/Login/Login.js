import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import loginImg from "../../images/loginImg2.svg";
import { FaPenClip } from "react-icons/fa6";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../UserContext";
const Login = () => {
  const {setUserInfo} = useContext(UserContext);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function loginHandler(event) {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ phone_number: phone, password: password }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      response.json().then(userInfo=>{
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
          navigate("/dashboard"); // Điều hướng tới trang Dashboard sau khi đã hiển thị Toast
        }, 2500); // Chờ 3 giây trước khi điều hướng
      })


    } catch (error) {
      alert("Wrong Credentials Error");
      console.error("Request failed:", error);
    }
  }

  return (
    <div className="main-login">
      <div className="login-contain row">
        <ToastContainer />
        <div className="col-sm-4 left-side">
          <div className="icon-box">
            <FaPenClip className="login-icon" />
          </div>
          <form onSubmit={loginHandler}>
            <label htmlFor="phone" className="label-login">
              Phone Number
            </label>
            <input
              placeholder="Enter your phone..."
              type="tel"
              className="input-login"
              id="phone"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
            <label htmlFor="password" className="label-login">
              Password
            </label>
            <input
              placeholder="Enter password..."
              type="password"
              className="input-login"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button type="submit" id="sub-button">
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
