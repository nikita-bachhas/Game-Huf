import * as React from 'react';
import { Form, Input, InputNumber} from "antd";
import "./index.css";
import { QuestionNumber } from "../../components/QuestionNumbers";


const Quizzes = props => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  console.log(props)
  return (
    <Form
    name="basic"
    labelCol={{
      span: 5,
    }}
    wrapperCol={{
      span: 16,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <p className="maintext">
        <span className="text-highlight">Quiz {props.quizno}</span>
      </p>
      <hr />

      <Form.Item
        label="Quiz Description"
        name="Quiz Description"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Enter Quiz Description" />
      </Form.Item>

      <Form.Item
        label="Duration (In Seconds)"
        name="Duration (In Seconds)"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber min={1} max={3600} defaultValue={1}/> 
      </Form.Item>

      <div>
      <QuestionNumber/>
      </div>

    </Form>
  )
}

export { Quizzes };
