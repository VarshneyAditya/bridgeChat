import React from "react";

import "../myStyle.css";

function MessageOthers({ msg }) {
  return (
    <div className={"other-message-container"}>
      <div className={"conversation-container"}>
        <p className={"con-icon"}>
          {'A'}
        </p>
        <div className={"other-text-content"}>
          <p className={"con-title"}>
            {'Abhishek'}
          </p>
          <p className={"con-lastMessage"}>
            {msg}
          </p>
          {/* <p className="self-timeStamp">12:00am</p> */}
        </div>
      </div>
    </div>
  );
}

export default MessageOthers;
