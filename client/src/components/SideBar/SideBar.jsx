import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import HomeIcon from "@mui/icons-material/Home";
import DescriptionIcon from "@mui/icons-material/Description";
import InventoryIcon from "@mui/icons-material/Inventory";
import ChatIcon from "@mui/icons-material/Chat";
import HistoryIcon from "@mui/icons-material/History";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";


const SideBar = (props) => {
  const drawerWidth = 240;
  const sidebarItems = [
    { icon: <HomeIcon />, text: "My Dashboard", link: "/my-dashboard" },
    { icon: <DescriptionIcon />, text: "RB Dashboard", link: "/rb-dashboard" },
    { icon: <InventoryIcon />, text: "SKU Dashboard", link: "/sku-dashboard" },
    { icon: <ChatIcon />, text: "Chats", link: "/chats" },
    { icon: <HistoryIcon />, text: "My History", link: "/my-history" },
  ];

  const [searchQuery, setSearchQuery] = useState("");

  const SizeIcons = () => (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <TextField
        variant="outlined"
        placeholder="Search..."
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{
          paddingLeft: 2,
          paddingRight: 2,
        }}
      />
      <List>
        {sidebarItems.map((item, index) => (
          <ListItem button key={item.text} component={Link} to={item.link}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
  return (
    <div style={{ display: "flex" }}>
      <SizeIcons />
      <div style={{ flexGrow: 1, padding: 3 }}>
        <AppBar position="static" style={{ backgroundColor: "#8E1A86" }}>
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit">
              BugBridge Chatter
            </Typography>
            <IconButton aria-label="search">
              <SearchIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
};

export default SideBar;
