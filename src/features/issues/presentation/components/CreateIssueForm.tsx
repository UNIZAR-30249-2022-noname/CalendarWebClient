import React, { useEffect, useState } from "react";
import { Form, Input, Button, message } from 'antd';
import TextArea from "antd/lib/input/TextArea";
import IssuesTags from "./IssuesTags";
import { useHistory } from "react-router-dom";
import { IssueService } from "../../domain/service/Issues.services";
import { Issue, NewIssue } from "../../domain/models/Issue";


type Props ={
  slot?: string
}


const CreateIssueFrom = ({slot}:Props)=>{
  const tagsData = ['Urgente', 'Rotura', 'Peligo', 'Aviso'];//TODO get etqiquetas
  const [tags,setTags] = useState<string[]>([])
  const history = useHistory();

  const onFinish = async (values: any) => {
    console.log(values)
    console.log(tags)
    const params:Issue = {
      tags:tags,
      slot:values.slot,
      title: values.title,
      description:values.description,
      key:values.key,
      state:NewIssue
      
    }
    const res = await IssueService.create(params)
    if(res.isError)
      message.error("Error al obtener los espacios")
    else{
      message.info("Aviso creado correctamente")
      history.goBack()
    }
     

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
      <IssuesTags setTags={setTags} selectedTags={tags} allTags={tagsData}/>
      
      <Form.Item style={{marginTop:"15px", marginLeft:"200px"}}>
      <Button type="primary" htmlType="submit">Enviar reporte</Button>
      </Form.Item>
      
      
      
    </Form>

  );
}

export default React.memo(CreateIssueFrom);