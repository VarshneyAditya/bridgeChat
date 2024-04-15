import React from "react";

import "./myStyle.css";
import MessageOthers from "./Messages/MessageOther";
import MessageSelf from "./Messages/MessageSelf";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ThreeDotsButton from "./ThreeDots/ThreeDotsButton";
import { useParams } from "react-router-dom";

const Conversation = () => {
  const { orderId } = useParams();  
  return (
    <>
      <div className="header">
        <div className={"chat-header"}>
          <h2 style={{ marginTop: "20px", fontFamily: "monospace" }}>
            <span style={{ fontFamily: "serif", fontWeight: "lighter" }}>
              Order Id:
            </span>{" "}
            {orderId}{" "}
          </h2>
          <ThreeDotsButton />
        </div>
      </div>
      <div className="messages-container">
        <MessageSelf msg={"Hello, testing testing "} />
        <MessageOthers msg={"Hey, How are you?"} />
        <MessageSelf msg={"Hello, testing testing "} />
        <MessageOthers msg={"Hey, How are you?"} />
        <MessageSelf msg={"Hello, testing testing "} />
        <MessageOthers msg={"Hey, How are you?"} />
        <MessageSelf msg={"Hello, testing testing "} />
        <MessageOthers msg={"Hey, How are you?"} />
        <MessageSelf msg={"Hello, testing testing "} />
        <MessageOthers msg={"Hey, How are you?"} />
        <MessageSelf msg={"Hello, testing testing "} />
        <MessageSelf msg={"Hello, testing testing "} />
        <MessageOthers msg={"Hey, How are you?"} />
        <MessageSelf msg={"Hello, testing testing "} />
        <MessageOthers msg={"Hey, How are you?"} />
        <MessageSelf msg={"Hello, testing testing "} />
        <MessageOthers msg={"Hey, How are you?"} />
        <MessageSelf msg={"Hello, testing testing "} />
        <MessageOthers msg={"Hey, How are you?"} />
        <MessageSelf msg={"Hello, testing testing "} />
        <MessageOthers msg={"Hey, How are you?"} />
        <MessageSelf msg={"Hello, testing testing "} />
      </div>
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
