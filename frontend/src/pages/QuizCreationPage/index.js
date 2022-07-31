import * as React from 'react';
import { Form, Button, Modal, Input, InputNumber, message } from 'antd';
import { Link, useHistory, useParams } from 'react-router-dom';
import cx from 'classnames';

import './index.css';
import { useGameStore } from '../../services/zustand/game';

const QuizCreationPage = ({ location }) => {
  const { game_id } = useParams();
  const history = useHistory();
  const { createNewQuiz } = useGameStore();
  const [form] = Form.useForm();
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);

  const handleOnClickSubmit = () => {
    setShowConfirmModal(true);
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
  };

  const handleOnClickModalOk = () => {
    form.submit();
    setShowConfirmModal(false);
  };

  const gameData = React.useMemo(
    () => location.state.gameData,
    [location.state.gameData]
  );

  const onFinish = async (values) => {
    const result = await createNewQuiz(
      game_id,
      gameData.no_of_quiz,
      gameData.no_of_qn_per_quiz,
      values
    );
    if (result && typeof result === 'string') {
      message.error(result);
    } else {
      message.success(
        'You have successfully created quizzes for game ' + gameData.game_name
      );
      history.push(`/game/${game_id}/${gameData.game_name}`);
    }
  };

  return (
    <div className='creation-page-container'>
      <div className='creation-page-header-container'>
        <h2 className='creation-page-heading'>
          {gameData.game_name.toUpperCase()}
        </h2>
      </div>
      <div className='info-container'>
        <Form
          name='basic'
          form={form}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 10,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete='off'
        >
          {[...Array(gameData.no_of_quiz)].map((_, index) => {
            const quizNumber = index + 1;
            return (
              <div key={index}>
                <h2 className='quiz-title'>Quiz {quizNumber}</h2>
                <h3 className='qntext'>Level of Difficulty: {quizNumber}</h3>
                <hr />
                <Form.Item
                  label='Quiz Description'
                  name={`quiz_${quizNumber}_description`}
                  rules={[
                    {
                      required: true,
                      message: 'Please input the quiz description!',
                    },
                    {
                      whitespace: true,
                      message: 'Quiz Description cannot be a whitespace',
                    },
                  ]}
                >
                  <Input placeholder='Enter Quiz Description' />
                </Form.Item>

                <Form.Item
                  label='Duration (In Minutes)'
                  name={`quiz_${quizNumber}_duration`}
                  rules={[
                    {
                      required: true,
                      message: 'Please input the quiz duration!',
                    },
                  ]}
                  initialValue={60}
                >
                  <InputNumber min={1} max={3600} />
                </Form.Item>
                {[...Array(gameData.no_of_qn_per_quiz)].map(
                  (_, questionIndex) => (
                    <div key={questionIndex}>
                      <h3 className='question-title'>
                        Question {questionIndex + 1}
                      </h3>
                      <Form.Item
                        label='Question'
                        name={`quiz_${quizNumber}_question_${
                          questionIndex + 1
                        }`}
                        rules={[
                          {
                            required: true,
                            message: 'Please input question!',
                          },
                        ]}
                      >
                        <Input placeholder='Enter Question' />
                      </Form.Item>

                      {[...Array(4)].map((_, optionIndex) => {
                        const optionNumber = optionIndex + 1;
                        return (
                          <Form.Item
                            key={optionIndex}
                            label={`Option ${optionNumber}`}
                            name={`quiz_${quizNumber}_question_${
                              questionIndex + 1
                            }_option_${optionNumber}`}
                            rules={[
                              {
                                required: true,
                                message: `Please input option ${optionNumber}!`,
                              },
                            ]}
                          >
                            <Input
                              placeholder={`Enter Option ${optionNumber}`}
                            />
                          </Form.Item>
                        );
                      })}
                      <Form.Item
                        label='Correct Answer'
                        name={`quiz_${quizNumber}_question_${
                          questionIndex + 1
                        }_correct_answer`}
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                        initialValue={1}
                      >
                        <InputNumber min={1} max={4} />
                      </Form.Item>
                      <Form.Item
                        label='Question Score'
                        name={`quiz_${quizNumber}_question_${
                          questionIndex + 1
                        }_score`}
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                        initialValue={1}
                      >
                        <InputNumber min={1} max={5} />
                      </Form.Item>
                    </div>
                  )
                )}
              </div>
            );
          })}

          <hr />
          <p className='qntext'>
            Please note that each quiz will only be unlocked after player has
            completed the previous quiz. The quizzes are required to increase
            sequentially in dificulty level.
          </p>
          <div className='creation-page-bottom-container'>
            <Button
              type='primary'
              htmlType='Back'
              className={cx('backBtn', 'creation-pagenav-buttons')}
            >
              <Link to={'/gamecreation'}>Back</Link>
            </Button>
            <Form.Item>
              <Button type='primary' onClick={handleOnClickSubmit}>
                Submit
              </Button>
              <Modal
                title='Submission Confirmation'
                visible={showConfirmModal}
                onOk={handleOnClickModalOk}
                onCancel={handleCancel}
              >
                Submit All Quizzes?
              </Modal>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default QuizCreationPage;
