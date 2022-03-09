import { Form, Input, Button, Checkbox, Row } from 'antd';
import {session} from "../../domain/services/session.service"
export const LoggingForm = () =>{

  const onFinish = (values: any) => {
    console.log('Success:', values);
    session.login(values.username)
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

return (
     <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: false }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

    <Row align="top">
    <div style={{ width: "40px"}}></div>
      <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
        <Button   type="primary" danger>
          Cancel
        </Button>
      </Form.Item>
      <div style={{ width: "20px"}}></div>
      <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Login            
        </Button>
      </Form.Item>
      </Row>
    </Form>
  );
};


