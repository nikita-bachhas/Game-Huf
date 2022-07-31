import React from 'react';
import cx from 'classnames';
import { Form, Input, Button, InputNumber, message } from 'antd';
import { Link, useHistory } from 'react-router-dom';

import { useGameStore } from '../../services/zustand/game';
import { useAuthStore } from '../../services/zustand/auth';
import './index.css';

const GameCreationPage = () => {
  const history = useHistory();
  const { userInfo } = useAuthStore();
  const { createNewGame } = useGameStore();

  const onFinish = async (values) => {
    const gameData = {
      username: userInfo.username,
      game_name: values.game_name,
      game_tag: values.game_tag,
      no_of_quiz: values.no_of_quiz,
      game_description: values.game_description,
      no_of_qn_per_quiz: values.no_of_qn_per_quiz,
    };
    const result = await createNewGame(gameData);
    if (typeof result !== 'string') {
      message.success(
        `You have successfully created a new game ${result.game_name}`
      );
      history.push({
        pathname: `/gamecreation/${result.game_id}/quizcreation`,
        state: { gameData },
      });
    } else {
      message.error(result);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='creation-page-container'>
      <div className='creation-page-header-container'>
        <h2 className='creation-page-heading'>Game Creation!</h2>
      </div>
      <div className='info-container'>
        <p className='text'>
          Hi <span className='text-highlight'>{userInfo.username}</span>,
        </p>
        <p className='text'>
          Please complete the following to proceed with the creation of your
          game.
        </p>
        <Form
          name='basic'
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
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item
            label='Game Name'
            name='game_name'
            rules={[
              {
                required: true,
                message: 'Please input the Game Name',
              },
              {
                whitespace: true,
                message: 'Game Name cannot be a whitespace',
              },
            ]}
          >
            <Input placeholder='Enter name of the Game' />
          </Form.Item>

          <Form.Item
            label='Game Description'
            name='game_description'
            rules={[
              {
                required: true,
                message: 'Please input the Game Description',
              },
              {
                whitespace: true,
                message: 'Game Name cannot be a whitespace',
              },
            ]}
          >
            <Input placeholder='Enter Game Description' />
          </Form.Item>

          <Form.Item
            label='Game Tag'
            name='game_tag'
            rules={[
              {
                required: true,
                message: 'Please input the Game Tag',
              },
              {
                max: 9,
                message: 'Tags can only have a maximum of 9 characters.',
              },
              {
                type: 'string',
                message:
                  'The tag must be a descriptive string and cannot contain whitespaces',
              },
            ]}
          >
            <Input placeholder='Enter Game Tag' />
          </Form.Item>

          <Form.Item
            label='Number of Quizzes: '
            name='no_of_quiz'
            rules={[
              {
                required: true,
                message: 'Please input the number of quizzes',
              },
            ]}
            initialValue={1}
          >
            <InputNumber min={1} max={5} />
          </Form.Item>

          <Form.Item
            label='Number of Questions per Quiz: '
            name='no_of_qn_per_quiz'
            rules={[
              {
                required: true,
                message: 'Please input the number of questions per quiz',
              },
            ]}
            initialValue={1}
          >
            <InputNumber min={1} max={10} />
          </Form.Item>

          <hr />

          <div className='button'>
            <Button
              type='primary'
              htmlType='Back'
              className={cx('backBtn', 'creation-pagenav-buttons')}
            >
              <Link to={'/'}>Back</Link>
            </Button>
            <Form.Item>
              <Button
                type='primary'
                htmlType='Submit'
                className={cx('nextBtn', 'creation-pagenav-buttons')}
              >
                Next
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default GameCreationPage;
