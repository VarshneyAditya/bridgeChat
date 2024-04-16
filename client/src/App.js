import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";

import RBDashboard from "./components/RBDashboard";
import MYDashboard from "./components/MYDashboard";
import SKUDashboard from "./components/SKUDashboard";
import ChatCard from "./components/ChatCard";
import Conversation from "./components/Conversation";
import Login from "./components/Login/Login";
import { OrdersProvider } from "./context/OrdersContext";
import Sidebar from './components/SideBar/SideBar'

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
  const {data: { name: userName = ' '} = {}} = JSON.parse(localStorage.getItem("userData")) || {};
  const navigate = useNavigate();
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
        {!isLoginRoute && (
          <AppBar
            position="static"
            style={{
              backgroundColor: "rgb(112 52 132)",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Toolbar variant="dense">
              <Typography variant="h6" color="inherit">
                Welcome {userName}!
              </Typography>
            </Toolbar>
            <IconButton
              onClick={() => {
                localStorage.removeItem("userData");
                navigate("/login");
              }}
              style={{ color: "white" }}
            >
              <ExitToAppIcon style={{ fontSize: "48px" }} />
            </IconButton>
          </AppBar>
        )}
        <Routes>
          {/* Define routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/rb-dashboard" element={<RBDashboard />} />
          <Route path="/my-dashboard" element={<MYDashboard />} />
          <Route path="/sku-dashboard" element={<SKUDashboard />} />
          <Route path="/chats" element={<ChatCard />} />
          <Route path="/my-history" />
          <Route path="/conversation/:_id" element={<Conversation />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
