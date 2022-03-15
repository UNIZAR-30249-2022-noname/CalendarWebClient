import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, Row, message, Select, InputNumber, Cascader, DatePicker, Switch, TreeSelect, Radio, TimePicker, ConfigProvider } from 'antd';
import { useHistory } from "react-router-dom";
import locale from 'antd/es/date-picker/locale/es_ES'


const SlotsFrom = ()=>{

  const history = useHistory();
  const [bookEnabled, setBookEnabled] = useState(false);

  const onFinish = async (values: any) => {
    console.log(values.date.toString())
    console.log(values.date.format("DD-mm-yyyy"))
   
    console.log({
      hour: values.hour.hours(),
      min: values.hour.minutes(),
    })
    
    //console.log(values.date._d)
     
  };

  const onFinishFailed = (errorInfo: any) => {
    
    console.log('Failed:', errorInfo);
  };
 
  return (
    
    <Form
      style={{margin:"50px", alignSelf:"self-start"}}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 8 }}
      layout="horizontal"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item label="Planta" name="floor">
        <Radio.Group>
          <Radio.Button value="zero">Baja</Radio.Button>
          <Radio.Button value="first">Primera</Radio.Button>
          <Radio.Button value="second">Segunda</Radio.Button>
          <Radio.Button value="third">Tercera</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Afóro mínimo" name="capacity">
        <InputNumber/>
      </Form.Item>
      
      <Form.Item label="Edificio" name ="building">
        <Select>
          <Select.Option value="Ada Byron">Ada Byron</Select.Option>
          <Select.Option value="El otro">El otro</Select.Option>
          <Select.Option value="TorresQuevedo">Torres Quevedo</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Solo disponibles" valuePropName="checked">
        <Switch onChange={(value)=>{setBookEnabled(value)}}/>
      </Form.Item>
      <Form.Item label="Fecha" name="date">
     
        <DatePicker locale={locale} disabled={!bookEnabled} />
   
      </Form.Item>
      <Form.Item label="Fecha" name="hour">
        <TimePicker
         format={"HH:mm"}
        disabled={!bookEnabled}
        name="hour"
        minuteStep={10}
        disabledHours={() => [0, 1, 2, 3, 4, 5, 6, 21, 22, 23]}
        hideDisabledOptions
        />
      </Form.Item>
      <Row>
        <div style={{width:"20%"}}></div>
      <Form.Item>
      <Button type="primary" htmlType="submit">Buscar</Button>
      </Form.Item>

      </Row>
      
    </Form>
  );
}

export default React.memo(SlotsFrom);