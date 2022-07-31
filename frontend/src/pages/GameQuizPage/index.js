import React from 'react';
import { message, List, Skeleton, Button } from 'antd';
import { useHistory, useParams, Link } from 'react-router-dom';

import { useGameStore } from '../../services/zustand/game';
import { useAuthStore } from '../../services/zustand/auth';
import QuizCard from './components/QuizCard';
import QuizModal from './components/QuizModal';

const GameQuizPage = () => {
  const history = useHistory();
  const { game_id, game_name } = useParams();
  const { userInfo } = useAuthStore();
  const { isLoading, fetchGameQuiz, currentGameQuizzes } = useGameStore();
  const [showQuizModal, setShowQuizModal] = React.useState(false);
  const [currentQuizInfo, setCurrentQuizInfo] = React.useState(null);
  const [currentQuizIndex, setCurrentQuizIndex] = React.useState(null);

  const handleOnClickQuizCard = (quizInfo, index) => {
    setCurrentQuizInfo(quizInfo);
    setCurrentQuizIndex(index);
    setShowQuizModal(true);
  };

  const handleOnCancelQuizCard = () => {
    setShowQuizModal(false);
  };

  const handleOnQuizStart = () => {
    history.push(`/game/${game_id}/${game_name}/${currentQuizInfo.quiz_id}`);
  };

  React.useEffect(() => {
    const fetchQuizData = async () => {
      const errorMessage = await fetchGameQuiz(game_id);
      if (errorMessage) {
        message.error(
          'Failed to fetch quizzes for this game. Check the URL or Contact Admin for support.'
        );
        message.error(errorMessage);
      }
    };
    fetchQuizData();
  }, [fetchGameQuiz, game_id]);

  return (
    <div className='game-page-container'>
      <div className='game-page-header-container'>
        <h2 className='game-page-heading'>
          {game_name ? game_name.toUpperCase() : '...'}
        </h2>
      </div>
      <div className='info-container'>
        <p className='text'>
          Hi <span className='text-highlight'>{userInfo.username},</span>
        </p>
        <p className='text'>
          Welcome to the game{' '}
          <span className='text-highlight'>{game_name}!</span>
        </p>
        {currentGameQuizzes.length < 1 && (
          <p className='text'>This game does not have any quizzes.</p>
        )}
        <div className='games-container'>
          <QuizModal
            gameId={game_id}
            gameName={game_name}
            visible={showQuizModal}
            quizInfo={currentQuizInfo}
            quizIndex={currentQuizIndex}
            onCancel={handleOnCancelQuizCard}
            onQuizStart={handleOnQuizStart}
          />
          <List
            loading={isLoading}
            grid={{
              gutter: [30, 16],
              column:
                currentGameQuizzes.length > 3 ? 3 : currentGameQuizzes.length,
            }}
            dataSource={currentGameQuizzes}
            renderItem={(item, index) => (
              <List.Item key={JSON.stringify(item) + index}>
                <Skeleton loading={isLoading} active>
                  <QuizCard
                    isAvailable
                    quizInfo={item}
                    quizIndex={index}
                    onClick={() => handleOnClickQuizCard(item, index)}
                  />
                </Skeleton>
              </List.Item>
            )}
          />
        </div>
        <Button type='primary' className='lb-back-btn'>
          <Link to='/games'>Back</Link>
        </Button>
      </div>
    </div>
  );
};

export default GameQuizPage;
