import React from "react";

import "./myStyle.css";
import MessageOthers from "./Messages/MessageOther";
import MessageSelf from "./Messages/MessageSelf";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ThreeDotsButton from "./ThreeDots/ThreeDotsButton";


const Conversation = () => {
  return (
    <>
      <div className="header">
        <div className={"chat-header"}>
          <h2 style={{ marginTop: '20px', fontFamily: 'monospace' }}>
            <span style={{fontFamily: 'serif', fontWeight: 'lighter'}}>Order Id:</span> #K1D8FA-J{" "}
          </h2>
          <ThreeDotsButton />
        </div>
      </div>
      {/* <span className="sender">
        <span className="messageBox">Hi</span>
        </span>
        <span className="receiver">
        <span className="messageBox">How are you</span>
      </span> */}
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
