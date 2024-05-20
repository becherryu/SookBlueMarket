import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 임포트
import FooterNav from "../components/footer";

const Home = () => {
  return (
    <div className="home-screen">
      <h1>홈페이지입니다.</h1>
      <FooterNav />
    </div>
  );
};

export default Home;
