import React from "react";

import "../myStyle.css";
function MessageSelf({ msg = "loading" }) {
  return (
    <div className="self-message-container">
      <p className="self-timeStamp">
        12:00am
      </p>
      <div className="messageBox">
        <p style={{ color: "black" }}>{msg}</p>
      </div>
    </div>
  );
}

export default MessageSelf;
