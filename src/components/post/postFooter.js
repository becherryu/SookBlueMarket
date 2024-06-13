import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  BottomNavigation,
  Divider,
  Typography,
  Grid,
  IconButton,
  Toolbar,
} from "@mui/material";
import { ChatBubbleRounded, FavoriteRounded } from "@mui/icons-material";

//확인용 나중에 지우기
import Posts from "../../data";
import { jwtDecode } from "jwt-decode";

const PostFooter = ({ post }) => {
  //console.log("footer recived: ", postProp);
  const { post_no } = useParams(); //현재 페이지 URL에서 no 파라미터 추출
  //const [liked, setLiked] = useState(null);
  const [likeStatus, setLikeStatus] = useState(false);
  const [chatCount, setChatCount] = useState(0);
  const navigate = useNavigate();
  //const [post, setPost] = useState("");
  const [userToken, setUserToken] = useState(localStorage.getItem("userToken"));
  const user_no = jwtDecode(userToken).no;

  useEffect(() => {
    setLikeStatus(post.post_my_like);
  }, [post]);

  const handleChatClick = async () => {
    if (post.status === 2 || post.post_user_no === user_no) return; // 거래완료 시 채팅불가

    const chat_no = post.post_no * 100000 + post.post_user_no * 1000 + user_no;
    navigate(`/chat/chatRoom/${chat_no}`, { state: { post } }); // post 정보 같이 보내기 // state로 post 객체 전달
    setChatCount((prev) => prev + 1);
  };

  const handleLikeClick = async () => {
    try {
      if (likeStatus) {
        await axios.post(
          `http://localhost:5001/post/dislike_post/${post_no}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          },
        );
        setLikeStatus(false);
      } else {
        await axios.post(
          `http://localhost:5001/post/like_post/${post_no}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          },
        );
        setLikeStatus(true);
      }
    } catch (err) {
      console.log("좋아요 통신중 오류 발생", err);
    }
  };

  return (
    <footer>
      <Toolbar
        sx={{
          width: "100%",
          height: "12%",
          position: "fixed",
          bottom: 0,
          boxShadow:
            "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
        }}
      >
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid
            item
            sx={{ display: "flex", alignItems: "center", marginLeft: 2 }}
          >
            <IconButton
              onClick={handleLikeClick}
              disabled={post.post_status === 2}
            >
              <FavoriteRounded
                color={likeStatus ? "error" : "inherit"}
                style={{ fontSize: "30px" }}
              />
            </IconButton>
            <Divider
              orientation="vertical"
              flexItem
              variant="large"
              sx={{ mx: 1.5, opacity: 1 }}
            />
            <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
              {post.post_price}원
            </Typography>
          </Grid>
          {post.post_user_no === user_no ? (
            ""
          ) : (
            <Grid item sx={{ p: 3 }}>
              <Button
                startIcon={<ChatBubbleRounded color="secondary.light" />}
                onClick={handleChatClick}
                variant="contained"
                disabled={post.status === 2}
              >
                채팅하기
              </Button>
            </Grid>
          )}
        </Grid>
      </Toolbar>
    </footer>
  );
};

export default PostFooter;
