import create from 'zustand';

import {
  fetchDashboard,
  fetchGames,
  fetchUserGames,
  fetchQuizScore,
  fetchQuizzes,
  createGame,
  fetchQuizQuestions,
  fetchQuizResult,
  fetchQuizLeaderBoard,
  createQuiz,
  createQuizQuestion,
  createQuizQuestionOptions,
  createUserScore,
} from '../../api/game';

const initialState = {
  isLoading: false,
  games: [],
  userGames: [],
  quizzes: [],
  score: [],
  currentGameQuizzes: [],
  quizQuestions: [],
  currentQuizLeaderBoardData: [],
  currentDashboardData: [],
};

export const useGameStore = create((set, get) => ({
  ...initialState,

  fetchGames: async () => {
    set({ isLoading: true });
    const result = await fetchGames();
    if (typeof result === 'string') {
      set({ isLoading: false });
      return result;
    } else {
      const games = result.data;
      set({ games: games });
    }
    set({ isLoading: false });
  },

  // get games created for each specific player
  fetchUserGames: async (username) => {
    set({ isLoading: true });
    const result = await fetchUserGames(username);
    if (typeof result === 'string') {
      set({ isLoading: false });
      return result;
    } else {
      const games = result.data;
      set({ userGames: games });
    }
    set({ isLoading: false });
  },

  fetchQuizScore: async (user_id, quiz_id) => {
    set({ isLoading: true });
    const result = await fetchQuizScore(user_id, quiz_id);
    if (typeof result === 'string') {
      set({ isLoading: false });
      return result;
    } else {
      const score = result.data;
      set({ score: score });
    }
    set({ isLoading: false });
  },

  fetchGameQuiz: async (gameId) => {
    set({ isLoading: true });
    const result = await fetchQuizzes(gameId);
    if (typeof result === 'string') {
      set({ isLoading: false });
      return result;
    } else {
      const quizzes = result.data;
      set({ currentGameQuizzes: quizzes });
    }
    set({ isLoading: false });
  },

  fetchQuizQuestions: async (quizId) => {
    set({ isLoading: true });
    const result = await fetchQuizQuestions(quizId);
    if (typeof result === 'string') {
      set({ isLoading: false });
      return result;
    } else {
      const questions = result.data;
      set({ quizQuestions: questions });
    }
    set({ isLoading: false });
  },

  fetchQuizResult: async (quizId) => {
    set({ isLoading: true });
    const result = await fetchQuizResult(quizId);
    if (typeof result === 'string') {
      return result;
    } else {
      const quizresults = result.data;
      set({ quizResults: quizresults });
    }
    set({ isLoading: false });
  },

  fetchQuizLeaderBoard: async (quizId) => {
    set({ isLoading: true });
    const result = await fetchQuizLeaderBoard(quizId);

    if (typeof result === 'string') {
      set({ isLoading: false });
      return result;
    } else {
      set({ currentQuizLeaderBoardData: result.data.topfive });
    }
    set({ isLoading: false });
  },

  fetchDashboard: async (gameId) => {
    set({ isLoading: true });
    const result = await fetchDashboard(gameId);
    console.log('result');
    console.log(result);
    if (typeof result === 'string') {
      set({ isLoading: false });
      return result;
    } else {
      set({
        currentDashboardData: result.data.result,
        isLoading: false,
      });
    }
  },

  createNewGame: async (gameData) => {
    set({ isLoading: true });
    const {
      username,
      game_name,
      game_tag,
      no_of_quiz,
      game_description,
      no_of_qn_per_quiz: total_no_qn,
    } = gameData;
    const result = await createGame(
      username,
      game_name,
      game_tag,
      no_of_quiz,
      game_description,
      total_no_qn
    );
    set({ isLoading: false });
    if (typeof result === 'string') {
      return result;
    } else if (result.status === 201) {
      return result.data;
    }
  },

  postUserScore: async (gameData) => {
    set({ isLoading: true });
    const { quiz_id, user_id, score_earned, duration_taken } = gameData;
    const result = await createUserScore(
      quiz_id,
      user_id,
      score_earned,
      duration_taken
    );
    set({ isLoading: false });
    if (typeof result === 'string') {
      return result;
    } else if (result.status === 201) {
      return result.data;
    }
  },

  createNewQuiz: async (gameId, num_of_quiz, num_of_qn_per_quiz, quizData) => {
    set({ isLoading: true });

    for (let quizNumber = 1; quizNumber <= num_of_quiz; quizNumber++) {
      const quiz_duration = quizData[`quiz_${quizNumber}_duration`];
      const quiz_max_score = Object.entries(quizData).reduce((acc, cur) => {
        if (cur[0].includes(`quiz_${quizNumber}`) && cur[0].includes('score')) {
          acc += cur[1];
          return acc;
        }
        return acc;
      }, 0);
      const quiz_description = quizData[`quiz_${quizNumber}_description`];
      const no_of_qn = num_of_qn_per_quiz;

      // create quiz
      const result = await createQuiz(
        gameId,
        quiz_duration,
        quiz_max_score,
        quiz_description,
        no_of_qn
      );
      if (typeof result === 'string') {
        set({ isLoading: false });
        return result;
      } else {
        const { quiz_id } = result.data;
        for (
          let questionNumber = 1;
          questionNumber <= no_of_qn;
          questionNumber++
        ) {
          const correct_ans =
            quizData[
              `quiz_${quizNumber}_question_${questionNumber}_correct_answer`
            ];
          const question_name =
            quizData[`quiz_${quizNumber}_question_${questionNumber}`];
          const question_score =
            quizData[`quiz_${quizNumber}_question_${questionNumber}_score`];

          // create quiz questions
          const createQuestionResult = await createQuizQuestion(
            quiz_id,
            correct_ans,
            question_name,
            question_score
          );
          if (typeof result === 'string') {
            set({ isLoading: false });
            return result;
          } else {
            const { quiz_qn_id } = createQuestionResult.data;

            // create 4 options for this questions
            for (let option_id = 1; option_id <= 4; option_id++) {
              const option_description =
                quizData[
                  `quiz_${quizNumber}_question_${questionNumber}_option_${option_id}`
                ];
              const createOptionResult = await createQuizQuestionOptions(
                quiz_qn_id,
                option_id,
                option_description
              );
              if (typeof result === 'string') {
                set({ isLoading: false });
                return createOptionResult;
              }
            }
          }
        }
      }
    }
    set({ isLoading: false });
  },
}));
