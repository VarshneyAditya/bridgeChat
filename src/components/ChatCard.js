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
  const [cards, setCard] = useState([]);
  const [chats, setChats] = useState(false);

  useEffect(() => {
    const fetchChat = async () => {
      const response = await fetch(`http://localhost:5000/Chats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { chats = [] } = await response.json();
      setCard(chats);
    };

    fetchChat();
  }, []);

  useEffect(() => {
    if (chats) navigate("/conversation");
  }, [chats]);

  return (
    <>
      {cards &&
        cards.map(({ id = 32, message = "NA", orderId = "NA" }) => (
          <Card
            style={{
              marginTop: "40px",
              marginLeft: "30px",
              marginRight: "40px",
              borderRadius: "40px",
              cursor: "pointer",
            }}
            key={id}
          >
            <CardContent>
              <ListItemText
                primary={`Order Issue#${orderId}`}
                secondary={`Message: ${message}`}
                style={{
                  marginTop: "40px",
                  marginLeft: "30px",
                }}
                onClick={() => setChats(!chats)}
              />
            </CardContent>
          </Card>
        ))}
    </>
  );
}

export default ChatCard;
