import { Form, Input, Button, Checkbox, Row, message } from 'antd';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../../../core/context/context';
import { userService } from '../../domain/services/user.service';
export const LoginForm = () =>{
  const contextUser = useContext(UserContext);
  const history = useHistory();

  const onFinish = async (values: any) => {
    const credentials = await userService.getCredentials(values.username)

    
    if (!credentials.isError){
      contextUser.actions.login(credentials.value) 
      history.goBack()
    }
    else
    {
      message.error("Error al iniciar sesión")
    }
     
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
        <Button   type="primary" danger onClick={()=> history.goBack() } >
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


