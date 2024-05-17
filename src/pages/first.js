import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 임포트
import "../css/LoginScreen.css";

const First = () => {
  const navigate = useNavigate(); // navigate 함수 초기화

  // 회원가입 페이지로 이동하는 함수
  const handleSignupClick = () => {
    navigate("/register");
  };

  // 로그인 페이지로 이동하는 함수
  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="login-screen">
      <header className="header">
        {/* Your back arrow and menu icon will go here, you can use svg or icons from a library */}
      </header>
      <main className="main-content">
        <div className="logo-container">
          <img src="logo.png" alt="Logo" />
          <p>물결처럼 흐르는 파란 장터</p>
        </div>
        <div className="form-container">
          <button className="signup-button" onClick={handleSignupClick}>
            회원가입
          </button>
          <button className="login-button" onClick={handleLoginClick}>
            로그인
          </button>
          <a href="/forgot-password" className="forgot-password-link">
            비밀번호를 잊으셨습니까?
          </a>
        </div>
      </main>
    </div>
  );
};

export default First;
