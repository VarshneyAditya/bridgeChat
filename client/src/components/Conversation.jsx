import React, { useEffect, useState, useMemo } from "react";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useParams } from "react-router-dom";
import axios from "axios";

import MessageOthers from "./Messages/MessageOther";
import MessageSelf from "./Messages/MessageSelf";
import ThreeDotsButton from "./ThreeDots/ThreeDotsButton";
import "./myStyle.css";

const Conversation = () => {
  const {
    data: { token, _id: userId },
  } = JSON.parse(localStorage.getItem("userData"));
  const dyParams = useParams();

  const [chatId, chatUser] = dyParams._id.split("&");
  const [msgContent, setMsgContent] = useState("");
  const [messages, setAllMessages] = useState([]);

  const config = useMemo(() => ({
    headers: {
        Authorization: `Bearer ${token}`,
    },
}), [token]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/messages/${chatId}`,
          config
        );
        const { data } = response;
        setAllMessages(data);
        // setLoaded(true);
        // socket.emit("join chat", chatId);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages();
  }, [chatId, token, config]);

  const getAllMessages = (messages) => {
    return messages
      .slice(0)
      .reverse()
      .map(({ content, sender }) => {
        if (sender._id === userId) return <MessageSelf msg={content} />;
        else return <MessageOthers msg={content} name={sender.name} />;
      });
  };

  const sendMessage = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/messages`,
        {
          content: msgContent,
          chatId
        },
        config
      );
      const { data } = response;
      setAllMessages((prevMessages) => {
        // Check if the new message already exists in the array
        const isDuplicate = prevMessages.some(
          (message) => message._id === data._id
        );

        // Update the state only if it's not a duplicate
        if (!isDuplicate) {
          return [...prevMessages, data];
        }

        // If it's a duplicate, return the current state without modifications
        return prevMessages;
      });
      // setLoaded(true);
      // socket.emit("join chat", chatId);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  return (
    <>
      <div className="header">
        <div className={"chat-header"}>
          <div style={{display: "flex"}}>
            <p className={"con-icon"}>{chatUser[0]}</p>
            <h2 style={{ marginTop: "30px", fontFamily: "monospace" }}>
              {chatUser}{" "}
            </h2>
          </div>
          <ThreeDotsButton />
        </div>
      </div>
      <div className="messages-container">{getAllMessages(messages)}</div>
      <div className={"text-input-area"}>
        <input
          placeholder="Type a Message"
          className={"search-box"}
          value={msgContent}
          onChange={(e) => {
            setMsgContent(e.target.value);
          }}
          onKeyDown={(event) => {
            if (event.code === "Enter") {
              sendMessage();
              setMsgContent("");
            }
          }}
        />
        <IconButton
          className={"icon"}
          onClick={() => {
            sendMessage();
            setMsgContent("")
          }}
        >
          <SendIcon />
        </IconButton>
      </div>
    </>
  );
};

export default Conversation;
