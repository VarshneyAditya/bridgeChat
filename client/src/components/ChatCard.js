import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {  Avatar, Typography } from '@mui/material';
import CreateIssueButton from "./CreateIssueButton/CreateIssueButton";

function ChatCard(props) {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));

  const [conversations, setConversations] = useState([]);

  const user = userData?.data;
  const userId = user?._id;

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data = [] } = await axios.get(
          "http://localhost:3000/api/chats/conversation",
          config
        );
        setConversations(data);
        // setConversations(response.data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
        // Handle error as needed
      }
    };

    fetchConversations();
  }, [user.token]);

  const getPrimaryName = (users, isGroupChat, chatName) => {
    const { name: user0Name, _id: user0Id } = users[0];
    const userName = user0Id !== userId ? user0Name : users[1].name;
    const name = isGroupChat ? chatName : userName;
    return name;
  };

  const getSecondaryMessage = (latestMessage) => {
    const { content = "" } = latestMessage || {};
    return content ? content : "No chat thread";
  };

  const getColor = (index) => {
    const colors = ['#f8bbd0', '#bbdefb', '#c8e6c9', '#ffccbc', '#d1c4e9'];
    return colors[index % colors.length];
  };

  return (
    <>
     <CreateIssueButton />
    {conversations && conversations.map(({ _id, users, latestMessage, isGroupChat, chatName }, index) => (
      <Card
        style={{
          margin: "20px 30px",
          borderRadius: "20px",
          boxShadow: "0 6px 10px rgba(0,0,0,0.1)",
          transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
          backgroundColor: getColor(index), // dynamic background color
          cursor: "pointer",
          display: 'flex',
          alignItems: 'center',
        }}
        key={_id}
        onClick={() => {
          setConversations(!conversations);
          navigate(`/conversation/${_id}&${getPrimaryName(users, isGroupChat, chatName)}`);
        }}
        onMouseOver={e => e.currentTarget.style.transform = "scale(1.05)"}
        onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
      >
        <Avatar style={{ marginLeft: 15, backgroundColor: '#fff', color: '#666' }}>
          {getPrimaryName(users, isGroupChat, chatName).charAt(0).toUpperCase()}
        </Avatar>
        <CardContent style={{ padding: "20px", flexGrow: 1 }}>
          <Typography variant="h6" style={{ fontWeight: 'bold', color: "#333" }}>
            {getPrimaryName(users, isGroupChat, chatName)}
          </Typography>
          <Typography variant="body2" style={{ color: "#555", fontStyle: 'italic', marginTop: '8px' }}>
            {getSecondaryMessage(latestMessage)}
          </Typography>
        </CardContent>
      </Card>
    ))}
  </>
);
}

export default ChatCard;




