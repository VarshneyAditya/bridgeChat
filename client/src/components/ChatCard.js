import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";

function ChatCard() {
  const navigate = useNavigate();
  const [cards, setCard] = useState([]);
  const [chats, setChats] = useState(false);

  useEffect(() => {
    const fetchChat = async () => {
      const response = await fetch(`http://localhost:3000/api/cards`, {
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
  }, [chats, navigate]);

  return (
    <>
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
            onClick={() => setChats(!chats)}
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
