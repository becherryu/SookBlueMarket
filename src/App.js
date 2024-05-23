import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
//import Header from "./Header"; //공통헤더
import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import First from "./pages/first";
import FindPwd from "./pages/findpwd";
import Chat from "./pages/chat";
import Favorite from "./pages/favorite";
import Search from "./pages/search";
import Notifications from "./pages/notifications";
import Settings from "./pages/settings";
import Profile from "./pages/profile";
import WritePost from "./pages/WritePost";
import Mypage from "./pages/mypage";
import Sell from "./pages/sell";
import Buy from "./pages/buy";
import Report from "./pages/report";
import ChatRoom from "./pages/chatRoom";
import PostDetail from "./pages/postDetail";
function App() {
  //우클릭 방지
  useEffect(() => {
    document.oncontextmenu = function () {
      return false;
    };
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#3F51B5",
      },
      secondary: {
        main: "#7986CB",
        light: "#E8EAF6",
      },
      error: {
        main: "#ff4747",
      },
      // 추가적으로 필요한 색상 정의
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<First />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/findpwd" element={<FindPwd />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/chat" element={<Chat />}></Route>
            <Route path="/favorite" element={<Favorite />}></Route>
            <Route path="/writePost" element={<WritePost />}></Route>
            <Route path="/search" element={<Search />}></Route>
            <Route path="/settings" element={<Settings />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/mypage" element={<Mypage />}></Route>
            <Route path="/buy" element={<Buy />}></Route>
            <Route path="/sell" element={<Sell />}></Route>
            <Route path="/post/:no" element={<PostDetail />}></Route>
            <Route path="/report/:no" element={<Report />}></Route>
            <Route path="/chatRoom/:chatRoomNo" element={<ChatRoom />}></Route>
            <Route path="/notifications" element={<Notifications />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
