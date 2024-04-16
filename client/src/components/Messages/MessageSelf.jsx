import React from "react";

import '../myStyle.css'
function MessageSelf({ msg = 'loading' }) {
  return (
    <div className="self-message-container">
      <div className="messageBox">
        <p style={{ color: "black" }}>{msg}</p>
        <p className="self-timeStamp" style={{ color: "black" }}>
          12:00am
        </p>
      </div>
    </div>
  );
}

export default MessageSelf;
