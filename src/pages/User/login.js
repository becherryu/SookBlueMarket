import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Avatar,
  CssBaseline,
  Box,
  Typography,
  Container,
  Link,
  Grid,
} from "@mui/material/";
import styled from "styled-components";
import { Person } from "@mui/icons-material";
import { jwtDecode } from "jwt-decode";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

// 구글 OAuth 클라이언트 ID 설정
const clientId = process.env.REACT_APP_GOOGLE_CLIENT;
const redirectUri = "https://localhost:3000/home";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href=".">
        Sook Blule Market
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const FormHelperTexts = styled.div`
  width: 100%;
  padding-left: 16px;
  font-weight: 700;
  color: #ff4747;
`;

const CenteredGrid = styled(Grid)`
  display: flex;
  justify-content: center;
`;

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [googleToken, setGoogleToken] = useState(null);

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const decodedToken = jwtDecode(credentialResponse.credential);
    const userEmail = decodedToken.email;

    // 숙명여자대학교 이메일 확인
    if (!userEmail.endsWith("@sookmyung.ac.kr")) {
      alert("숙명여자대학교 이메일을 사용해서 인증해주세요.");
      return;
    }

    setEmail(userEmail);
    setGoogleToken(credentialResponse.credential);

    try {
      const response = await axios.post("http://localhost:5001/auth/login", {
        token: credentialResponse.credential,
      });

      if (response.data.needsNickname) {
        // 사용자의 정보가 없는 경우 닉네임 설정으로 이동, 닉네임이 null인 경우
        localStorage.setItem("userToken", response.data.userToken);
        navigate("/nickSetting"); // 닉네임 설정으로 이동
      } else if (response.data.userToken) {
        // 아님 그냥 로그인 됨
        alert("로그인 완료되었습니다.");
        localStorage.setItem("userToken", response.data.userToken);
        navigate("/home");
      } else {
        alert("문제가 생겼습니다! 다음에 다시 시도해주세요.");
        navigate("/");
      }
    } catch (err) {
      console.error("서버 통신 에러:", err);
    }
  };

  return (
    <div className="screen">
      <Container component="main" maxWidth="xs" sx={{ mt: 20 }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            minHeight: "85vh",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <Person />
          </Avatar>
          <Typography component="h1" variant="h5">
            시작하기
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            숙명이메일로만 참여가 가능합니다!
          </Typography>

          <GoogleOAuthProvider clientId={clientId}>
            <Box sx={{ mt: 5 }}>
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={() => console.log("로그인 실패")}
                theme="filled_blue"
                className="login_box"
              />
            </Box>
          </GoogleOAuthProvider>

          <CenteredGrid item xs sx={{ mt: 5 }}>
            <Link href="/" variant="body2">
              홈으로 이동
            </Link>
          </CenteredGrid>
        </Box>
        <Copyright />
      </Container>
    </div>
  );
}

export default Login;
