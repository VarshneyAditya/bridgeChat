import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ListItemText from "@mui/material/ListItemText";
import { useOrders } from "../context/OrdersContext";
import { useNavigate } from "react-router-dom";

function ChatCard() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { orders } = useOrders();
  // const chat = orders[orderId];
  const [chat, setChat] = useState({});
  const [chats, setChats] = useState(false);

  useEffect(() => {
    const fetchChat = async () => {
      const response = await fetch(`http://localhost:5000/Chats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId }),
      });
      const data = await response.json();
      setChat(data.chats);
    };

    fetchChat();
  }, [orderId]);

  useEffect(() => {
    if(chats) navigate("/conversation");
  }, [chats]);

  return (
    <>
      <Card
        style={{
          marginTop: "40px",
          marginLeft: "30px",
          marginRight: "40px",
          borderRadius: "40px",
        }}
      >
        <CardContent>
          <ListItemText
            // key={}
            primary={`Order Issue#${12345}`}
            secondary={`Message: ${"Hello"}`}
            style={{ marginTop: "40px", marginLeft: "30px", cursor: "pointer" }}
            onClick={() => setChats(!chats)}
          />
        </CardContent>
      </Card>
    </>
  );
}

export default ChatCard;
