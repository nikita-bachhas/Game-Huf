import * as React from "react";
import { GameplayDisplay } from "../../components/GameplayDisplay";
import { Row, message, Button } from "antd";
import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { useGameStore } from "../../services/zustand/game";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useAuthStore } from "../../services/zustand/auth";
import Timer from "../../components/Timer";
import "./index.css";

/*
  Page that includes components that allow user to play the quiz
*/

const GameplayPage = React.memo(() => {
  const { game_id, quiz_id, game_name } = useParams();
  const history = useHistory();
  const {
    currentGameQuizzes,
    isLoading,
    quizQuestions,
    fetchQuizQuestions,
    fetchGameQuiz,
  } = useGameStore();
  const { postUserScore } = useGameStore();
  const { userInfo } = useAuthStore();
  const [userAnswers, setUserAnswers] = useState({});
  const timeLapsed = useRef(0);

  // Error message if failed to fetch and show data
  useEffect(() => {
    const fetchData = async () => {
      const errorMessage = await fetchQuizQuestions(quiz_id);
      if (errorMessage) {
        message.error("Failed to fetch quiz. Contact Admin for support.");
        message.error(errorMessage);
      }
    };
    fetchData();
    fetchGameQuiz(game_id);
  }, [fetchGameQuiz, fetchQuizQuestions, game_id, quiz_id]);

  // get the quiz duration
  const duration = useMemo(() => {
    const quizData = currentGameQuizzes.find((quiz) => {
      return (
        quiz.game_id === Number(game_id) && quiz.quiz_id === Number(quiz_id)
      );
    });

    if (quizData) {
      return quizData.quiz_duration * 1000 * 60;
    }
    return null;
  }, [currentGameQuizzes, game_id, quiz_id]);

  // update the time taken to do the quiz
  const handleTimeChange = (newTime) => {
    if (
      (newTime % 1000).toFixed(0) < 100 &&
      ((duration - newTime) / 1000).toFixed(0) >
        (timeLapsed.current / 1000).toFixed(0)
    ) {
      timeLapsed.current = duration - newTime;
    }
  };

  /*
  When user finishes the quiz or time runs out, their score will be computed, 
  posted into database and they will be redirected to leaderboard page
  */

  const onFinish = useCallback(async () => {
    // function to compute users total score
    const computeScore = () => {
      var totalScore = 0;
      for (let i = 0; i < quizQuestions.length; i++) {
        if (quizQuestions[i].quiz_qn_id in userAnswers) {
          const userAnswer = Number(userAnswers[quizQuestions[i].quiz_qn_id]);
          if (quizQuestions[i].correct_ans === userAnswer) {
            totalScore += quizQuestions[i].score_per_qn;
          }
        }
      }
      // bonus
      if (totalScore > 0) {
        totalScore += (duration - timeLapsed.current) / duration;
      }

      return totalScore;
    };

    const userScore = computeScore();

    const quizResultData = {
      quiz_id: Number(quiz_id),
      user_id: userInfo.userid,
      score_earned: userScore.toFixed(0),
      duration_taken: timeLapsed.current,
    };
    const result = await postUserScore(quizResultData);

    if (typeof result !== "string") {
      message.success(`Completed.`);
      history.push(`/leaderboard/${game_id}/${game_name}/${quiz_id}`);
    } else {
      message.error("You have already completed this quiz.");
      message.info("Returning to the game page...");
      history.push(`/game/${game_id}/${game_name}`);
    }
  }, [
    duration,
    game_id,
    game_name,
    history,
    postUserScore,
    quizQuestions,
    quiz_id,
    userAnswers,
    userInfo.userid,
  ]);

  return (
    <div>
      <Button type="primary">
        <Link to={`/game/${game_id}/${game_name}`}>Back</Link>
      </Button>

      <div className="header-container">
        <h2 style={{ color: "orange" }}>
          {game_name} | Quiz {quiz_id}
        </h2>
        <div className="timer-con">
          {duration && (
            <Timer
              duration={duration}
              onTimeUp={onFinish}
              onTimeChange={handleTimeChange}
            />
          )}
        </div>
      </div>

      <Row>
        <div className="question-con">
          <GameplayDisplay
            isLoading={isLoading}
            quizQuestions={quizQuestions}
            currentAnswers={userAnswers}
            onAnswerQuestion={(newAnswers) => setUserAnswers(newAnswers)}
            onFinishQuiz={onFinish}
          />
        </div>
      </Row>
    </div>
  );
});

export default GameplayPage;
