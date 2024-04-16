import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

  return (
    <>
      <CreateIssueButton />
      {conversations &&
        conversations.map(
          ({
            _id = 0,
            users = 32,
            latestMessage = "NA",
            isGroupChat = false,
            chatName,
          }) => (
            <Card
              style={{
                marginTop: "40px",
                marginLeft: "30px",
                marginRight: "40px",
                borderRadius: "40px",
                cursor: "pointer",
              }}
              key={_id}
              onClick={() => {
                setConversations(!conversations);
                navigate(`/conversation/${_id}&${getPrimaryName(users, isGroupChat, chatName)}`);
              }}
            >
              <CardContent>
                <ListItemText
                  primary={getPrimaryName(users, isGroupChat, chatName)}
                  secondary={getSecondaryMessage(latestMessage)}
                  style={{
                    marginTop: "40px",
                    marginLeft: "30px",
                  }}
                  secondaryTypographyProps={{ style: { fontStyle: 'italic' } }}
                />
              </CardContent>
            </Card>
          )
        )}
    </>
  );
}

export default ChatCard;
