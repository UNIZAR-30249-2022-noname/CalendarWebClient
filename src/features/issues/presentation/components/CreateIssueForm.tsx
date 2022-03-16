import React, { useEffect, useState } from "react";
import { Form, Input, Button } from 'antd';
import TextArea from "antd/lib/input/TextArea";


type Props ={
  slot?: string
}


const CreateIssueFrom = ({slot}:Props)=>{


  const onFinish = async (values: any) => {

     
  };

  const onFinishFailed = (errorInfo: any) => {
    
    console.log('Failed:', errorInfo);
  };
 
  return (
    
    <Form
      style={{marginTop :"50px", marginLeft:"60px"}}
      layout="horizontal"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      //labelCol={{ span: 4 }}
      //wrapperCol={{ span: 20 }}
    >
      <Form.Item label="Título" name="title" style={{width:"500px"}}
      >
        <Input placeholder="Lámapara rota, goteras, ..."></Input>
      </Form.Item>
      <Form.Item label="Descripción:" name="description" style={{height:"200px", width:"500px"}}>
      <TextArea rows={4} placeholder="Descripción" />
      </Form.Item>
      
      
    </Form>
  );
}

export default React.memo(CreateIssueFrom);