import React from 'react';
import { Card } from 'antd';
import cx from 'classnames';

import './index.css';

const QuizCard = ({ isAvailable, isCompleted, quizIndex, onClick }) => {
  const availableClassName = React.useMemo(
    () => (isAvailable ? 'quiz-card-available' : 'quiz-card-unavailable'),
    [isAvailable]
  );
  return (
    <Card
      className={cx('quiz-card-container', availableClassName)}
      onClick={onClick}
    >
      <h2 className={cx('title', 'quiz-card-title')}>{`Quiz ${
        quizIndex + 1
      }`}</h2>
      {isCompleted && <h3 className='title'>Completed</h3>}
    </Card>
  );
};

export default QuizCard;
