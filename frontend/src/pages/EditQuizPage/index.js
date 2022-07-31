import * as React from 'react';
import { Button, Input, InputNumber, Form } from 'antd';
import { Link } from 'react-router-dom';
import { Pop } from '../../components/Popup';
import './index.css';
import cx from 'classnames';

//function to include the components needed and display the information for edit quiz page
const EditQuizPage = () => {
  return (
    <div>
      <div className='editquiz-container'>
        <div className='editquiz-header-container'>
          <h1 className='editquiz-heading'>Edit Quiz</h1>
          {/* popup window component with its parameter information */}
          <Pop
            btnName='Delete Quiz'
            title='Delete Quiz Confirmation'
            desc='Are you sure you want to delete this quiz?'
            danger='true'
          />
        </div>
      </div>

      {/* 
      form to collect user input to update database when user edits the quiz 
      label: name of the data input field
      placeholder: text displayed inside input field to indicate what to input
      min{}: min value for input number field
      max{}: max value for input number field
      defaultValue{}: default value that is displayed for input number field
      */}
      <div className='info-container'>
        <Form
          name='basic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 10 }}
          initialValues={{ remember: true }}
        >
          <Form.Item
            label='QUIZ DESCRIPTION: '
            name='quiz_description'
            rules={[
              {
                required: true,
                message: 'Enter quiz description',
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
            label='QUIZ DURATION (MINS): '
            name='quiz_duration'
            rules={[
              {
                required: true,
                message: 'Please indicate the duration!',
              },
            ]}
            initialValue={1}
          >
            <InputNumber min={1} max={10} defaultValue={1} />
          </Form.Item>

          <Form.Item
            label='QUESTION 1: '
            name='q1'
            rules={[
              {
                required: true,
                message: 'Enter question',
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
            label='OPTION 1: '
            name='q1o1'
            rules={[
              {
                required: true,
                message: 'Enter first option',
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
            label='OPTION 2: '
            name='q1o2'
            rules={[
              {
                required: true,
                message: 'Enter second option',
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
            label='OPTION 3: '
            name='q1o3'
            rules={[
              {
                required: true,
                message: 'Enter third option',
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
            label='OPTION 4: '
            name='q1o4'
            rules={[
              {
                required: true,
                message: 'Enter fourth option',
              },
              {
                whitespace: true,
                message: 'Game Name cannot be a whitespace',
              },
            ]}
          >
            <Input placeholder='Enter name of the Game' />
          </Form.Item>

          <hr />

          <div className='button'>
            <Button
              type='primary'
              htmlType='Back'
              className={cx('backBtn', 'creation-pagenav-buttons')}
            >
              <Link to={'/dashboard'}>Back</Link>
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

export default EditQuizPage;
