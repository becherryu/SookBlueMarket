import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Avatar,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search,
  Notifications,
  AccountCircle,
  Settings,
  ExitToApp,
  Favorite,
  Receipt,
  LocalMall,
} from "@mui/icons-material";
import LogoutButton from "./logoutButton";
import { indigo } from "@mui/material/colors";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState({ nickname: "", img: "" });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user");
        setUser({
          nickname: response.data.nickname,
          img: response.data.img,
        });
      } catch (Error) {
        console.error("데이터를 가지고 오는데 실패했습니다.", Error);
      }
    };
    fetchUserData();
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: indigo[500],
        boxShadow:
          "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box
            sx={{
              width: 250,
              padding: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <Avatar
              src={user.img}
              alt={user.nickname}
              sx={{ width: 64, height: 64, marginBottom: 2 }}
            />
            <Typography variant="h6">{user.nickname}님</Typography>
            <List>
              <ListItem onClick={() => navigate("/profile")}>
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText primary="프로필" />
              </ListItem>
              <ListItem onClick={() => navigate("/favorite")}>
                <ListItemIcon>
                  <Favorite />
                </ListItemIcon>
                <ListItemText primary="찜 목록" />
              </ListItem>
              <ListItem onClick={() => navigate("/sell")}>
                <ListItemIcon>
                  <Receipt />
                </ListItemIcon>
                <ListItemText primary="판매 내역" />
              </ListItem>
              <ListItem onClick={() => navigate("/buy")}>
                <ListItemIcon>
                  <LocalMall />
                </ListItemIcon>
                <ListItemText primary="구매 내역" />
              </ListItem>
              <ListItem onClick={() => navigate("/settings")}>
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                <ListItemText primary="설정" />
              </ListItem>
              <ListItem sx={{ marginTop: "50%" }}>
                <LogoutButton />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <ExitToApp />
                </ListItemIcon>
              </ListItem>
            </List>
          </Box>
        </Drawer>
        <img
          src="logo_name.png"
          alt="logo_name"
          style={{ width: "120px", marginLeft: "16px" }}
        />
        <div style={{ marginLeft: "auto" }}>
          <IconButton color="inherit" onClick={() => navigate("/search")}>
            <Search />
          </IconButton>
          <IconButton
            color="inherit"
            onClick={() => navigate("/notifications")}
          >
            <Notifications />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
