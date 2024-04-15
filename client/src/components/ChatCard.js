import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import CreateIssueButton from "./CreateIssueButton/CreateIssueButton";

function ChatCard() {
  const navigate = useNavigate();
  const [cards, setCard] = useState([]);
  const [chats, setChats] = useState(false);
  const [orderId, setOrderId] = useState("");
  const userData = JSON.parse(localStorage.getItem("userData"));


  const [conversations, setConversations] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const user = userData?.data;
  const userId = user?._id;

  useEffect(() => {
    const fetchChat = async () => {
      const response = await fetch(`http://localhost:3000/api/cards/cards`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { chats = [] } = await response.json();
      setCard(chats);
    };

    fetchChat();

    const fetchConversations = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const response = await axios.get(
          "http://localhost:3000/api/chats/conversation",
          config
        );

        console.log("Data refresh in sidebar:", response);
        // setConversations(response.data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
        // Handle error as needed
      }
    };

    fetchConversations();
  }, []);

  useEffect(() => {
    if (chats) navigate(`/conversation/${orderId}`);
  }, [chats, navigate, orderId]);

  return (
    <>
    <CreateIssueButton />
      {cards &&
        cards.map(({ id = 32, last_message = "NA", order_id = "NA" }) => (
          <Card
            style={{
              marginTop: "40px",
              marginLeft: "30px",
              marginRight: "40px",
              borderRadius: "40px",
              cursor: "pointer",
            }}
            key={id}
            onClick={() => {
              setOrderId(order_id);
              setChats(!chats);
            }}
          >
            <CardContent>
              <ListItemText
                primary={`Order Id: ${order_id}`}
                secondary={`Message: ${last_message}`}
                style={{
                  marginTop: "40px",
                  marginLeft: "30px",
                }}
              />
            </CardContent>
          </Card>
        ))}
    </>
  );
}

export default ChatCard;
