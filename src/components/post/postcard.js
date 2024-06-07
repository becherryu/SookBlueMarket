import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  CardActionArea,
  Box,
} from "@mui/material";
import { Favorite, Chat, MoreVert } from "@mui/icons-material";
import { indigo } from "@mui/material/colors";
import blurBox from "../../css/blurBox";

const Postcard = ({ post }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleCardClick = () => {
    navigate(`/post/${post.post_no}`);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleReport = () => {
    navigate(`/report/${post.post_no}`);
  };

  return (
    <Card
      sx={{
        display: "flex",
        height: 140,
        position: "relative",
        "&:hover": {
          backgroundColor: indigo[50],
        },
      }}
    >
      <CardActionArea
        onClick={handleCardClick}
        sx={{ display: "flex", width: "100%" }}
      >
        <Box
          sx={{ position: "relative", width: 120, height: 120, margin: "3%" }}
        >
          <CardMedia
            component="img"
            sx={{ width: "100%", height: "100%", borderRadius: 2 }}
            image={post.post_img || "https://via.placeholder.com/140"}
            alt={post.post_title}
          />
          {post.post_status === 2 && (
            <Box sx={blurBox}>
              <Typography
                variant="subtitle1"
                component="div"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                거래완료
              </Typography>
            </Box>
          )}
        </Box>
        <CardContent sx={{ flexGrow: 1, overflow: "hidden", pr: 3 }}>
          <Typography variant="button" component="div" color="primary">
            {post.post_type === 0 ? "팔아요" : "구해요"}
          </Typography>
          <Typography variant="subtitle1" component="div">
            {post.post_title}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ fontWeight: "bold" }}
          >
            {post.post_price}원
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {new Date(post.post_sdd).toLocaleDateString()}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{
          position: "absolute",
          bottom: 0,
          right: 3,
          padding: 0,
          margin: 0,
        }}
      >
        <IconButton aria-label="찜" sx={{ padding: 0, margin: 0 }}>
          <Favorite sx={{ width: "30%" }} />
          <Typography variant="body2" sx={{ ml: 0.5 }}>
            {post.post_like_cnt}
          </Typography>
        </IconButton>
        <IconButton aria-label="채팅 수" sx={{ padding: 0, margin: 0 }}>
          <Chat sx={{ width: "35%" }} />
          <Typography variant="body2" sx={{ ml: 0.5 }}>
            {post.post_chat_cnt}
          </Typography>
        </IconButton>
      </CardActions>
      <IconButton
        aria-label="더보기"
        sx={{ position: "absolute", top: "-1%", right: "-1%" }}
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleMenuClick}
      >
        <MoreVert />
      </IconButton>
      <Menu
        id="long-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={handleReport}
          sx={{
            "&:hover": {
              backgroundColor: indigo[50],
            },
          }}
        >
          신고하기
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default Postcard;
