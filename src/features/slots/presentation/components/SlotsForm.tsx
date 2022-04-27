import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, Row, message, Select, InputNumber, Cascader, DatePicker, Switch, TreeSelect, Radio, TimePicker, ConfigProvider } from 'antd';
import { useHistory } from "react-router-dom";
import locale from 'antd/es/date-picker/locale/es_ES'
import { floor } from "cypress/types/lodash";
import { searchSlotsService } from "../../domain/services/SearchSlots.service";
import { SlotsFilterForm } from "../../domain/models/SlotsFilterForm";
import {dateFormat} from "../../../../core/config/constants"
import { Edifcio } from "../../domain/models/Slots";

const Edificios:Edifcio[] = [
  {
    name:"Ada Byron",
    floors:["Sótano","Baja","Primera","Segunda","Tercera","Cuarta","Quinta"]
  },
  {
    name:"Torres Quevedo",
    floors:["Sótano","Baja","Primera","Segunda","Tercera"]
  },
  {
    name:"Betancourt",
    floors:["Sótano","Baja","Primera","Segunda","Tercera"]
  },
]


type Props ={
  updateSlots: Function
  updateDate: Function
}


const SlotsFrom = ({updateSlots, updateDate}:Props)=>{

  const [bookEnabled, setBookEnabled] = useState(false);
  const [edificio, setEdificio] = useState<Edifcio>(Edificios[0]);

  const onFinish = async (values: any) => {
    const formDate = bookEnabled?values.date.format(dateFormat) : undefined
    const formHour = bookEnabled? {
      hour: values.hour.hours(),
      min: values.hour.minutes(),
    }: undefined
    const params:SlotsFilterForm = {
      day: formDate ,
      hour:formHour,
      floor: values.floor,
      capacity: values.capacity,
      building:values.building

    }
    const slots = await searchSlotsService.filterBy(params)
    if(slots.isError)
      message.error("Error al obtener los espacios")
    else
      updateSlots(slots.value)
     
  };

  const onFinishFailed = (errorInfo: any) => {
    
    console.log('Failed:', errorInfo);
  };
 
  return (
    
    <Form
      style={{marginTop :"50px", marginLeft:"60px"}}
      //labelCol={{ span: 4 }}
     //wrapperCol={{ span: 8 }}
      layout="horizontal"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >

<Form.Item label="Edificio" name ="building" style={{width:"500px"}}>
        <Select defaultValue={edificio.name} 
        onChange={(newEdificio)=>{
            const newState = Edificios.filter(function(e){
              return e.name==newEdificio
            })
            setEdificio(newState[0]);

        }}>
          {Edificios.map(edificio=>( 
          <Select.Option key={edificio.name} value={edificio.name}>{edificio.name}</Select.Option>))}

        </Select>
      </Form.Item>
      
      <Form.Item label="Planta" name="floor" style={{width:"500px"}}>
      <Select defaultValue={edificio.floors[0] }>
        {edificio.floors.map(floor=>(<Select.Option key={floor} value={floor}>{floor}</Select.Option>
          ))}
        </Select>


      </Form.Item>
      <Form.Item label="Afóro mínimo" name="capacity" style={{width:"500px"}}>
        <InputNumber/>
      </Form.Item>
      

      <Form.Item label="Solo disponibles" valuePropName="checked" style={{width:"500px"}}>
        <Switch onChange={(value)=>{setBookEnabled(value)}}/>
      </Form.Item>
      <Form.Item label="Fecha" name="date">
     
        <DatePicker  locale={locale} disabled={!bookEnabled} format={dateFormat} onChange={((d)=>updateDate(d?.format(dateFormat)))} />
   
      </Form.Item>
      <Form.Item label="Fecha" name="hour" style={{width:"500px"}}>
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