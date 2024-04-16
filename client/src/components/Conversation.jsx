import React, { useEffect, useState } from "react";
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

  const [messages, setAllMessages] = useState();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
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
  }, [chatId, token]);

  const getAllMessages = (messages) => {
    return messages?.map(({ content, sender }) => {
      if (sender._id === userId) return <MessageSelf msg={content} />;
      else return <MessageOthers msg={content} name={sender.name} />;
    });
  };

  return (
    <>
      <div className="header">
        <div className={"chat-header"}>
          <h2 style={{ marginTop: "20px", fontFamily: "monospace" }}>
            {chatUser}{" "}
          </h2>
          <ThreeDotsButton />
        </div>
      </div>
      <div className="messages-container">{getAllMessages(messages)}</div>
      <div className={"text-input-area"}>
        <input
          placeholder="Type a Message"
          className={"search-box"}
          // value={messageContent }
          // onChange={(e) => {
          //   setMessageContent(e.target.value);
          // }}
          // onKeyDown={(event) => {
          //   if (event.code == "Enter") {
          //     // console.log(event);
          //     sendMessage();
          //     setMessageContent("");
          //     setRefresh(!refresh);
          //   }
          // }}
        />
        <IconButton
          className={"icon"}
          // onClick={() => {
          //   sendMessage();
          //   setRefresh(!refresh);
          // }}
        >
          <SendIcon />
        </IconButton>
      </div>
    </>
  );
};

export default Conversation;
