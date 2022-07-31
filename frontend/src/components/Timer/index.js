import React from 'react';
import { Statistic } from 'antd';
import { useState, useRef } from 'react';
import TimedPopUp from '../TimedPopUp';
import 'antd/dist/antd.css';

/*
    Function that will create pop up message when the timer for the quiz has run out.
    User will be able to close the pop up with the close button.

    Timer will start countdown from the time set for the quiz by the creater.
    Once timer goes to 0, the pop up will appear.
*/
const Timer = ({ duration, onTimeUp = () => {}, onTimeChange = () => {} }) => {
  const { Countdown } = Statistic;
  const deadline = useRef(Date.now() + duration);
  const [timedPopUp, setTimedPopUp] = useState(false);

  // To Spawn pop up message and compute user score when the timer has run out of time
  const handleTimerOnFinish = () => {
    setTimedPopUp(true);
    onTimeUp();
  };

  const handleOnTimeChange = (value) => {
    onTimeChange(value);
  };

  return (
    <div>
      <Countdown
        title='Time Left:'
        value={deadline.current}
        onFinish={handleTimerOnFinish}
        onChange={handleOnTimeChange}
      />
      <TimedPopUp trigger={timedPopUp} setTrigger={setTimedPopUp} />
    </div>
  );
};

export default Timer;
