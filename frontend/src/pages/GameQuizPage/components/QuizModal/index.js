import React from 'react';
import { Modal, Button } from 'antd';

import { useHistory } from 'react-router-dom';

const QuizModal = ({
  visible,
  gameId,
  gameName,
  quizIndex,
  quizInfo,
  onCancel,
  onQuizStart,
}) => {
  const history = useHistory();
  const handleOnClickViewLeaderboard = () => {
    history.push(`/leaderboard/${gameId}/${gameName}/${quizInfo.quiz_id}`);
  };
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      footer={null}
      bodyStyle={{ borderRadius: 10 }}
    >
      {quizInfo && (
        <div>
          <h1>
            {gameName} - Quiz {quizIndex + 1}
          </h1>
          <h3>Description:</h3>
          <p>{quizInfo.quiz_description}</p>
          <p>Number of questions: {quizInfo.no_of_qn}</p>
          <p>Duration: {quizInfo.quiz_duration} minutes</p>
        </div>
      )}

      <Button type='primary' onClick={onQuizStart}>
        Start Quiz
      </Button>
      <Button type='outline' onClick={handleOnClickViewLeaderboard}>
        View Leaderboard
      </Button>
    </Modal>
  );
};

export default QuizModal;
