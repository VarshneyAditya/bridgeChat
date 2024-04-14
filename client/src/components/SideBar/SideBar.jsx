import React, { useState } from "react";
import Toolbar from "@mui/material/Toolbar";
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


const SideBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const sidebarItems = [
    { icon: <HomeIcon />, text: "My Dashboard", link: "/my-dashboard" },
    { icon: <DescriptionIcon />, text: "RB Dashboard", link: "/rb-dashboard" },
    { icon: <InventoryIcon />, text: "SKU Dashboard", link: "/sku-dashboard" },
    { icon: <ChatIcon />, text: "Chats", link: "/chats" },
    { icon: <HistoryIcon />, text: "My History", link: "/my-history" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
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
        sx={{ paddingLeft: 2, paddingRight: 2 }}
      />
      <List>
        {sidebarItems.map((item, index) => (
          <ListItem button key={index} component={Link} to={item.link}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default SideBar;
