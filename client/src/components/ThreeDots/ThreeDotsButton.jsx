import React from "react";

import "./threeDot.css";

const ThreeDotsButton = (props) => {
  return (
    <div id="container">
      <div id="menu-wrap">
        <input type="checkbox" class="toggler" />
        <div class="dots">
          <div></div>
        </div>
        <div class="menu">
          <div>
            <ul>
              <li>
                <a href="#" class="link">
                  Mark as DONE
                </a>
              </li>
              <li>
                <a href="#" class="link">
                  + Add people
                </a>
              </li>
              <li>
                <a href="#" class="link">
                  Create RB
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeDotsButton;
