import React from "react";
import { Button } from "antd";
import "./index.css";
import "antd/dist/antd.css";

/*
    Function that will create pop up message when the timer for the quiz has run out.
    User will be able to close the pop up with the close button.
*/
function TimedPopUp(props) {
  return props.trigger ? (
      <div className="timedpopup">
        <div className="timedpopup-inner">
          <h3>Times Up!</h3>
          <p>Score is being calculated!</p>
          <p>You will be directed to the leaderboard page.</p>

          <Button
            className="close-btn"
            type="primary"
            onClick={() => props.setTrigger(false)}
          >
            Close
          </Button>
          {props.children}
        </div>
      </div>
  ) : (
    ""
  );
}

export default TimedPopUp;
