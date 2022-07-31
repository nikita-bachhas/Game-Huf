import * as React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useAuthStore } from '../../services/zustand/auth';
import './index.css';

const ChangePasswordPage = () => {
  const [form] = Form.useForm();
  const { changePassword } = useAuthStore();

  const onFinish = async (values) => {
    form.resetFields();
    let email = values.email;

    const result = await changePassword(email);

    if (typeof result !== 'string') {
      message.success(`Success! ${result.message}`);
    } else {
      message.error(
        `Please ensure that you have entered a valid email address registered with HUF.`
      );
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='change-password-page-container'>
      <div className='change-password-page-header-container'>
        <h2 className='change-password-page-heading'>Change Password</h2>
      </div>
      <div className='reset-info-container'>
        <img src='/HUF-logo.png' alt='HUF Logo' className='reset-home-logo' />
        <h3>Forgot Password?</h3>
        <span>We’ll email you the instructions shortly.</span>

        <Form
          form={form}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item
            name='email'
            label='Email'
            rules={[
              { type: 'email' },
              {
                required: true,
                message: 'Please input your email address!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <div className='btn'>
              <Button type='primary' htmlType='submit'>
                Send Password Reset
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
