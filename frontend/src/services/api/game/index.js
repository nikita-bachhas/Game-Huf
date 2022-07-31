import yelp from '../../yelp';

export const fetchDashboard = async (game_id) => {
  try {
    const response = await yelp.post('/dashboardtopfive/', { game_id });
    console.log(response);
    return response;
  } catch (err) {
    return err.message;
  }
};

export const fetchGames = async () => {
  try {
    const response = await yelp.get('/hufgames', {});
    return response;
  } catch (err) {
    return err.message;
  }
};

export const fetchUserGames = async (username) => {
  try {
    const response = await yelp.get('/hufgames/', { params: { username } });
    return response;
  } catch (err) {
    return err.message;
  }
};

export const fetchQuizScore = async (user_id, quiz_id) => {
  try {
    const response = await yelp.get('/hufquizresult/', {
      params: { user_id, quiz_id },
    });
    return response;
  } catch (err) {
    return err.message;
  }
};

export const fetchQuizzes = async (game_id) => {
  try {
    const response = await yelp.get('/hufquiz', { params: { game_id } });
    return response;
  } catch (err) {
    return err.message;
  }
};

export const createGame = async (
  username,
  game_name,
  game_tag,
  no_of_quiz,
  game_description,
  total_no_qn
) => {
  try {
    const response = await yelp.post('/hufgames/', {
      username,
      game_name,
      game_tag,
      no_of_quiz,
      game_description,
      total_no_qn,
    });
    return response;
  } catch (err) {
    return err.message;
  }
};

export const createUserScore = async (
  quiz_id,
  user_id,
  score_earned,
  duration_taken
) => {
  try {
    const response = await yelp.post('/hufquizresult/', {
      quiz_id,
      user_id,
      score_earned,
      duration_taken,
    });
    return response;
  } catch (err) {
    return err.message;
  }
};

// api function to call 'https://cz3003-huf.herokuapp.com/hufquiz/'
export const fetchQuizQuestions = async (quiz_id) => {
  try {
    const response = await yelp.get('/hufquizqn', { params: { quiz_id } });
    return response;
  } catch (err) {
    return err.message;
  }
};

// api function to call 'https://cz3003-huf.herokuapp.com/hufquizresult/'
export const fetchQuizResult = async () => {
  try {
    const response = await yelp.get('/hufquizresult', {});
    return response;
  } catch (err) {
    return err.message;
  }
};

export const fetchQuizLeaderBoard = async (quiz_id) => {
  try {
    const response = await yelp.post('/quiztopfive/', { quiz_id });
    return response;
  } catch (err) {
    return err.message;
  }
};

export const createQuiz = async (
  game_id,
  quiz_duration,
  quiz_max_score,
  quiz_description,
  no_of_qn
) => {
  try {
    const response = await yelp.post('/hufquiz/', {
      game_id,
      quiz_duration,
      quiz_max_score,
      quiz_description,
      no_of_qn,
    });
    return response;
  } catch (err) {
    return err.message;
  }
};

export const createQuizQuestion = async (
  quiz_id,
  correct_ans,
  question_name,
  score_per_qn
) => {
  try {
    const response = await yelp.post('/hufquizqn/', {
      quiz_id,
      correct_ans,
      question_name,
      score_per_qn,
    });
    return response;
  } catch (err) {
    return err.message;
  }
};

export const createQuizQuestionOptions = async (
  quiz_qn_id,
  option_id,
  option_description
) => {
  try {
    const response = await yelp.post('/hufquizoptions/', {
      quiz_qn_id,
      option_id,
      option_description,
    });
    return response;
  } catch (err) {
    return err.message;
  }
};
