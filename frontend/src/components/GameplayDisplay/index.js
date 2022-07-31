import * as React from 'react';
import { Radio, Space, Row, Button, Form, Skeleton } from 'antd';
import 'antd/dist/antd.css';
import './index.css';

/*
function to display the questions in the quiz and return the marks gotten (currenty not done)
 */

const GameplayDisplay = ({
  isLoading,
  quizQuestions = [],
  currentAnswers = {},
  onAnswerQuestion,
  onFinishQuiz,
}) => {
  // sets user's answers to the new option they click
  const handleOnChangeQuestionAnswer = (questionId, answerValue) => {
    const newAnswers = { ...currentAnswers };
    newAnswers[questionId] = answerValue;
    onAnswerQuestion(newAnswers);
  };

  return (
    <div className='question-container'>
      {isLoading ? (
        <Skeleton />
      ) : (
        <Form
          name='answer-questions'
          onFinish={onFinishQuiz}
          autoComplete='off'
          initialValues={{
            remember: true,
          }}
        >
          {/*Maps through all the quiz_qn_id and returns the question and options*/}
          {quizQuestions.map((quiz_item, index) => {
            return (
              <Form.Item
                key={quiz_item.quiz_qn_id}
                name={`quiz_question_${quiz_item.quiz_qn_id}`}
                rules={[
                  {
                    required: true,
                    message: 'Please select an answer!',
                  },
                ]}
              >
                <div className='question-container'>
                  <Row>
                    <h1>
                      Question {index + 1}) {quiz_item.question_name}
                    </h1>
                  </Row>
                  <Radio.Group
                    name='radiogroup'
                    onChange={(e) => {
                      handleOnChangeQuestionAnswer(
                        quiz_item.quiz_qn_id,
                        e.target.value
                      );
                    }}
                  >
                    <Space direction='vertical'>
                      {quiz_item.options.map((option_item) => {
                        return (
                          <Radio
                            key={quiz_item.quiz_qn_id + option_item.option_id}
                            value={option_item.option_id}
                          >
                            {option_item.option_description}
                          </Radio>
                        );
                      })}
                    </Space>
                  </Radio.Group>
                </div>
              </Form.Item>
            );
          })}

          <Form.Item className='button-container'>
            <Button
              type='primary'
              htmlType='submit'
              style={{ background: 'orange', borderColor: 'orange' }}
            >
              Finish Quiz
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export { GameplayDisplay };
