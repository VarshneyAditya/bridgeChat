import React from "react";

import "../myStyle.css";

function MessageOthers({ msg, name, updatedAt }) {
  return (
    <div className={"other-message-container"}>
      <div className={"conversation-container"}>
        <p className={"con-icon"}>{name[0]}</p>
        <p className="self-timeStamp">12:00am</p>
        <div className={"other-text-content"}>
          <p className={"con-title"}>{name}</p>
          <p className={"con-lastMessage"}>{msg}</p>
        </div>
      </div>
    </div>
  );
}

export default MessageOthers;
