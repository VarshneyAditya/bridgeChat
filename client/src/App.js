import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route, Routes, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import HomeIcon from "@mui/icons-material/Home";
import DescriptionIcon from "@mui/icons-material/Description";
import InventoryIcon from "@mui/icons-material/Inventory";
import ChatIcon from "@mui/icons-material/Chat";
import HistoryIcon from "@mui/icons-material/History";

import RBDashboard from "./components/RBDashboard";
import MYDashboard from "./components/MYDashboard";
import SKUDashboard from "./components/SKUDashboard";
import ChatCard from "./components/ChatCard";
import Conversation from "./components/Conversation";
import Login from "./components/Login/Login";
import { OrdersProvider } from "./context/OrdersContext";

function Sidebar() {
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

function App() {
  return (
    <OrdersProvider>
      <Router>
        <AppContent />
      </Router>
    </OrdersProvider>
  );
}

function AppContent() {
  const location = useLocation(); // Use useLocation() within the <Router> context
  const isLoginRoute = location.pathname === "/login";

  return (
    <div style={{ display: "flex" }}>
      {/* Conditionally render the Sidebar only if not on the login page */}
      {!isLoginRoute && <Sidebar />}
      <div
        style={{
          flexGrow: 1,
          padding: 3,
        }}
      >
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
        <Routes>
          {/* Define routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/rb-dashboard" element={<RBDashboard />} />
          <Route path="/my-dashboard" element={<MYDashboard />} />
          <Route path="/sku-dashboard" element={<SKUDashboard />} />
          <Route path="/chats" element={<ChatCard />} />
          <Route path="/my-history" />
          <Route path="/conversation/:orderId" element={<Conversation />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
